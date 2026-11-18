import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth/guards';
import { apiSuccess, apiUnauthorized } from '@/lib/api/response';
import { handleApiError } from '@/lib/api/errors';
import { validateBody } from '@/lib/api/validation';
import { DigitalInventoryService } from '@/services/digital-inventory.service';

const progressSchema = z.object({
  bookId: z.string().min(1, 'Book ID is required'),
  progressPercentage: z.number().min(0).max(100),
  cfiLocation: z.string().optional(),
  currentChapterTitle: z.string().optional(),
  currentPage: z.number().optional(),
  totalPages: z.number().optional(),
  secondsSpentReading: z.number().optional(),
});

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiUnauthorized();

    const body = await validateBody(req, progressSchema);
    const result = await DigitalInventoryService.updateReadingProgress(
      user.id,
      body.bookId,
      {
        progressPercentage: body.progressPercentage,
        cfiLocation: body.cfiLocation,
        currentChapterTitle: body.currentChapterTitle,
        currentPage: body.currentPage,
        totalPages: body.totalPages,
        secondsSpentReading: body.secondsSpentReading || 60,
      }
    );

    return apiSuccess({
      ...result,
      message: 'Reading progress synchronized and streak maintained.',
    });
  } catch (error) {
    return handleApiError(error);
  }
}
