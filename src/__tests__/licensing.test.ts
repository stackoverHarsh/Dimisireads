/**
 * Licensing guardrail integration tests
 * Tests: verifyDigitalAccess logic, licence category enforcement, download/read flags
 */

import { describe, it, expect } from 'vitest';
import { BOOKS_SEED } from '@/lib/dev-seed/books';

/* ── Simulate verifyDigitalAccess logic ──────────────────────────────────── */

type LicenceCategory =
  | 'PUBLIC_DOMAIN'
  | 'DIMISI_OWNED'
  | 'EXPLICIT_DISTRIBUTION_GRANTED'
  | 'OPEN_PERMISSIVE'
  | 'METADATA_ONLY';

const DISTRIBUTION_ALLOWED: LicenceCategory[] = [
  'PUBLIC_DOMAIN',
  'DIMISI_OWNED',
  'EXPLICIT_DISTRIBUTION_GRANTED',
  'OPEN_PERMISSIVE',
];

interface MockEbook {
  slug: string;
  isPublished: boolean;
  licenceCategory: LicenceCategory;
  licenceVerified: boolean;
  isDownloadAllowed: boolean;
  isOnlineReadAllowed: boolean;
}

function simulateVerifyDigitalAccess(
  ebook: MockEbook,
  requestType: 'download' | 'read'
): { allowed: boolean; reason: string } {
  if (!ebook.isPublished) return { allowed: false, reason: 'Book is not published' };
  if (!ebook.licenceVerified) return { allowed: false, reason: 'Licence not verified' };
  if (!DISTRIBUTION_ALLOWED.includes(ebook.licenceCategory)) {
    return { allowed: false, reason: `Licence category "${ebook.licenceCategory}" does not permit distribution` };
  }
  if (requestType === 'download' && !ebook.isDownloadAllowed) {
    return { allowed: false, reason: 'Download not permitted for this book' };
  }
  if (requestType === 'read' && !ebook.isOnlineReadAllowed) {
    return { allowed: false, reason: 'Online reading not permitted for this book' };
  }
  return { allowed: true, reason: 'Access granted' };
}

/* ── Tests ───────────────────────────────────────────────────────────────── */

describe('Licensing Guardrail — verifyDigitalAccess', () => {
  const publicDomainBook: MockEbook = {
    slug: 'pride-and-prejudice',
    isPublished: true,
    licenceCategory: 'PUBLIC_DOMAIN',
    licenceVerified: true,
    isDownloadAllowed: true,
    isOnlineReadAllowed: true,
  };

  it('allows download for a fully licensed PUBLIC_DOMAIN book', () => {
    const result = simulateVerifyDigitalAccess(publicDomainBook, 'download');
    expect(result.allowed).toBe(true);
  });

  it('allows online reading for a fully licensed PUBLIC_DOMAIN book', () => {
    const result = simulateVerifyDigitalAccess(publicDomainBook, 'read');
    expect(result.allowed).toBe(true);
  });

  it('blocks access for METADATA_ONLY books', () => {
    const metaOnlyBook: MockEbook = {
      ...publicDomainBook,
      licenceCategory: 'METADATA_ONLY',
      licenceVerified: true,
    };
    const result = simulateVerifyDigitalAccess(metaOnlyBook, 'download');
    expect(result.allowed).toBe(false);
    expect(result.reason).toMatch(/METADATA_ONLY/);
  });

  it('blocks access when licence is not verified', () => {
    const unverified: MockEbook = { ...publicDomainBook, licenceVerified: false };
    const result = simulateVerifyDigitalAccess(unverified, 'download');
    expect(result.allowed).toBe(false);
    expect(result.reason).toMatch(/not verified/);
  });

  it('blocks access for unpublished books', () => {
    const unpublished: MockEbook = { ...publicDomainBook, isPublished: false };
    const result = simulateVerifyDigitalAccess(unpublished, 'read');
    expect(result.allowed).toBe(false);
    expect(result.reason).toMatch(/not published/);
  });

  it('blocks download when isDownloadAllowed is false', () => {
    const noDownload: MockEbook = { ...publicDomainBook, isDownloadAllowed: false };
    const result = simulateVerifyDigitalAccess(noDownload, 'download');
    expect(result.allowed).toBe(false);
    expect(result.reason).toMatch(/Download not permitted/);
  });

  it('blocks online read when isOnlineReadAllowed is false', () => {
    const noRead: MockEbook = { ...publicDomainBook, isOnlineReadAllowed: false };
    const result = simulateVerifyDigitalAccess(noRead, 'read');
    expect(result.allowed).toBe(false);
    expect(result.reason).toMatch(/Online reading not permitted/);
  });

  it('every seed book with isDownloadAllowed=true has a distribution-compatible licence', () => {
    const downloadableBooks = BOOKS_SEED.filter((b) => b.isDownloadAllowed);
    for (const book of downloadableBooks) {
      const result = simulateVerifyDigitalAccess({
        slug: book.slug,
        isPublished: true,
        licenceCategory: book.licenceCategory as LicenceCategory,
        licenceVerified: true,
        isDownloadAllowed: book.isDownloadAllowed,
        isOnlineReadAllowed: book.isOnlineReadAllowed,
      }, 'download');
      expect(result.allowed, `Book "${book.slug}" allows download but has incompatible licence`).toBe(true);
    }
  });
});
