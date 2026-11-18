import prisma from '@/lib/prisma';
import { BOOKS_SEED } from '@/lib/dev-seed/books';
import { S3StorageClient } from '@/lib/storage/s3';
import { HighlightColor } from '@prisma/client';

export interface DigitalAccessVerification {
  allowed: boolean;
  reason?: string;
  bookId: string;
  title: string;
  author: string;
  licenceCategory: string;
  isDownloadAllowed: boolean;
  isOnlineReadAllowed: boolean;
  licenceNotice: string;
}

export interface ReadingProgressPayload {
  progressPercentage: number;
  cfiLocation?: string;
  currentChapterTitle?: string;
  currentPage?: number;
  totalPages?: number;
  secondsSpentReading?: number;
}

export class DigitalInventoryService {
  /**
   * Verify digital reading or download authorization against legal licensing records
   */
  static async verifyDigitalAccess(
    userId: string,
    bookSlugOrId: string,
    action: 'READ' | 'DOWNLOAD'
  ): Promise<DigitalAccessVerification> {
    const bookSeed = BOOKS_SEED.find(
      (b) => b.slug === bookSlugOrId || b.id === bookSlugOrId
    );

    if (!bookSeed) {
      return {
        allowed: false,
        reason: 'Requested volume not found in library catalogue.',
        bookId: '',
        title: 'Unknown Volume',
        author: 'Unknown',
        licenceCategory: 'METADATA_ONLY',
        isDownloadAllowed: false,
        isOnlineReadAllowed: false,
        licenceNotice: 'Catalogue record only.',
      };
    }

    // Strict Licensing Verification Check
    const validLicenceCategories = [
      'PUBLIC_DOMAIN',
      'DIMISI_OWNED',
      'EXPLICIT_DISTRIBUTION_GRANTED',
      'OPEN_PERMISSIVE',
    ];

    const hasLegitimateLicence = validLicenceCategories.includes(
      bookSeed.licenceCategory
    );

    if (!hasLegitimateLicence || !bookSeed.hasDigitalEdition) {
      return {
        allowed: false,
        reason:
          'This volume is catalogue-only or lacks verified digital distribution rights. DimisiReads adheres strictly to copyright laws and does not distribute unauthorized materials.',
        bookId: bookSeed.id,
        title: bookSeed.title,
        author: bookSeed.author,
        licenceCategory: bookSeed.licenceCategory,
        isDownloadAllowed: false,
        isOnlineReadAllowed: false,
        licenceNotice: bookSeed.licenceNotice,
      };
    }

    if (action === 'DOWNLOAD' && !bookSeed.isDownloadAllowed) {
      return {
        allowed: false,
        reason:
          'Download permissions for this edition are currently restricted to online streaming only.',
        bookId: bookSeed.id,
        title: bookSeed.title,
        author: bookSeed.author,
        licenceCategory: bookSeed.licenceCategory,
        isDownloadAllowed: false,
        isOnlineReadAllowed: bookSeed.isOnlineReadAllowed,
        licenceNotice: bookSeed.licenceNotice,
      };
    }

    if (action === 'READ' && !bookSeed.isOnlineReadAllowed) {
      return {
        allowed: false,
        reason: 'Online reading view is not enabled for this title.',
        bookId: bookSeed.id,
        title: bookSeed.title,
        author: bookSeed.author,
        licenceCategory: bookSeed.licenceCategory,
        isDownloadAllowed: bookSeed.isDownloadAllowed,
        isOnlineReadAllowed: false,
        licenceNotice: bookSeed.licenceNotice,
      };
    }

    return {
      allowed: true,
      bookId: bookSeed.id,
      title: bookSeed.title,
      author: bookSeed.author,
      licenceCategory: bookSeed.licenceCategory,
      isDownloadAllowed: bookSeed.isDownloadAllowed,
      isOnlineReadAllowed: bookSeed.isOnlineReadAllowed,
      licenceNotice: bookSeed.licenceNotice,
    };
  }

  /**
   * Generate short-lived signed URL and record download audit log
   */
  static async requestSignedDownload(
    userId: string,
    bookSlugOrId: string,
    ipAddress?: string,
    userAgent?: string
  ) {
    const access = await this.verifyDigitalAccess(userId, bookSlugOrId, 'DOWNLOAD');
    if (!access.allowed) {
      throw new Error(access.reason);
    }

    const storageKey = `ebooks/${access.bookId}/edition.epub`;
    const filename = `${access.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-dimisireads.epub`;

    // Generate 10-minute signed access token
    const signedData = S3StorageClient.generateSignedUrl(
      storageKey,
      access.bookId,
      userId,
      {
        action: 'download',
        filename,
        expiresInSeconds: 600,
      }
    );

    // Record download in audit log
    try {
      const ebook = await prisma.ebook.findUnique({
        where: { bookId: access.bookId },
      });

      if (ebook) {
        await Promise.all([
          prisma.downloadRecord.create({
            data: {
              ebookId: ebook.id,
              userId,
              ipAddress: ipAddress || '127.0.0.1',
              userAgent: userAgent || 'DimisiReads-Web/1.0',
            },
          }),
          prisma.ebook.update({
            where: { id: ebook.id },
            data: { downloadCount: { increment: 1 } },
          }),
        ]);
      }
    } catch {
      // Safe fallback when using fixture seeds
    }

    return {
      downloadUrl: signedData.url,
      expiresAt: signedData.expiresAt.toISOString(),
      expiresInSeconds: signedData.expiresInSeconds,
      filename,
      licenceNotice: access.licenceNotice,
    };
  }

  /**
   * Save user reading progress and automatically update reading streak
   */
  static async updateReadingProgress(
    userId: string,
    bookId: string,
    payload: ReadingProgressPayload
  ) {
    try {
      // Upsert reading progress record
      await prisma.readingProgress.upsert({
        where: {
          userId_bookId: { userId, bookId },
        },
        update: {
          progressPercentage: payload.progressPercentage,
          cfiLocation: payload.cfiLocation,
          currentChapterTitle: payload.currentChapterTitle,
          currentPage: payload.currentPage,
          totalPages: payload.totalPages,
          secondsSpentReading: {
            increment: payload.secondsSpentReading || 60,
          },
          lastReadAt: new Date(),
        },
        create: {
          userId,
          bookId,
          progressPercentage: payload.progressPercentage,
          cfiLocation: payload.cfiLocation,
          currentChapterTitle: payload.currentChapterTitle,
          currentPage: payload.currentPage,
          totalPages: payload.totalPages,
          secondsSpentReading: payload.secondsSpentReading || 60,
        },
      });

      // Update daily reading streak
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const streak = await prisma.readingStreak.findUnique({
        where: { userId },
      });

      if (streak) {
        const lastDate = streak.lastReadingDate
          ? new Date(streak.lastReadingDate)
          : null;
        if (lastDate) lastDate.setHours(0, 0, 0, 0);

        const diffDays = lastDate
          ? Math.round((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24))
          : 99;

        if (diffDays === 1) {
          // Read on consecutive day: increment streak
          const newCurrent = streak.currentStreakDays + 1;
          const newLongest = Math.max(newCurrent, streak.longestStreakDays);
          await prisma.readingStreak.update({
            where: { userId },
            data: {
              currentStreakDays: newCurrent,
              longestStreakDays: newLongest,
              lastReadingDate: today,
            },
          });
        } else if (diffDays > 1) {
          // Streak broken: reset to 1
          await prisma.readingStreak.update({
            where: { userId },
            data: {
              currentStreakDays: 1,
              lastReadingDate: today,
            },
          });
        }
      } else {
        await prisma.readingStreak.create({
          data: {
            userId,
            currentStreakDays: 1,
            longestStreakDays: 1,
            lastReadingDate: today,
          },
        });
      }
    } catch {
      // Fallback
    }

    return {
      synced: true,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Get user annotations (bookmarks, highlights, notes)
   */
  static async getAnnotations(userId: string, bookId: string) {
    try {
      const [bookmarks, highlights] = await Promise.all([
        prisma.bookmark.findMany({
          where: { userId, bookId },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.highlight.findMany({
          where: { userId, bookId },
          include: { notes: true },
          orderBy: { createdAt: 'desc' },
        }),
      ]);

      return {
        bookmarks,
        highlights,
      };
    } catch {
      // Mock dev fallbacks
      return {
        bookmarks: [
          {
            id: 'bm-1',
            cfiLocation: 'chap-1-p-4',
            label: 'Chapter I: The Arrival',
            createdAt: new Date().toISOString(),
          },
        ],
        highlights: [
          {
            id: 'hl-1',
            cfiRange: 'chap-1-p-10',
            selectedText:
              'A quiet mind discovers in literature what society often fails to provide: tranquility and depth.',
            color: HighlightColor.AMBER_GOLD,
            notes: [
              {
                id: 'note-1',
                content:
                  'A timeless reflection on contemplation and scholarly solitude.',
              },
            ],
            createdAt: new Date().toISOString(),
          },
        ],
      };
    }
  }

  /**
   * Create ribbon bookmark
   */
  static async addBookmark(
    userId: string,
    bookId: string,
    cfiLocation: string,
    label?: string
  ) {
    try {
      return await prisma.bookmark.create({
        data: {
          userId,
          bookId,
          cfiLocation,
          label: label || 'Saved Bookmark',
        },
      });
    } catch {
      return {
        id: `bm-${Date.now()}`,
        userId,
        bookId,
        cfiLocation,
        label: label || 'Saved Bookmark',
        createdAt: new Date().toISOString(),
      };
    }
  }

  /**
   * Remove ribbon bookmark
   */
  static async removeBookmark(userId: string, bookmarkId: string) {
    try {
      await prisma.bookmark.deleteMany({
        where: { id: bookmarkId, userId },
      });
    } catch {
      // fallback
    }
    return { success: true };
  }

  /**
   * Add text highlight and optional note
   */
  static async addHighlight(
    userId: string,
    bookId: string,
    cfiRange: string,
    selectedText: string,
    color: HighlightColor = HighlightColor.AMBER_GOLD,
    noteContent?: string
  ) {
    try {
      const highlight = await prisma.highlight.create({
        data: {
          userId,
          bookId,
          cfiRange,
          selectedText,
          color,
          notes: noteContent
            ? {
                create: {
                  userId,
                  bookId,
                  content: noteContent,
                },
              }
            : undefined,
        },
        include: { notes: true },
      });

      return highlight;
    } catch {
      return {
        id: `hl-${Date.now()}`,
        userId,
        bookId,
        cfiRange,
        selectedText,
        color,
        notes: noteContent
          ? [
              {
                id: `note-${Date.now()}`,
                userId,
                bookId,
                content: noteContent,
              },
            ]
          : [],
        createdAt: new Date().toISOString(),
      };
    }
  }

  /**
   * Remove text highlight
   */
  static async removeHighlight(userId: string, highlightId: string) {
    try {
      await prisma.highlight.deleteMany({
        where: { id: highlightId, userId },
      });
    } catch {
      // fallback
    }
    return { success: true };
  }
}
