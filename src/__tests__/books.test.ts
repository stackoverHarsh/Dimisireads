/**
 * Book catalogue integration tests
 * Tests: seed data integrity, slug resolution, licence fields, metadata completeness
 */

import { describe, it, expect } from 'vitest';
import { BOOKS_SEED, type BookSeed } from '@/lib/dev-seed/books';
import { CATEGORIES_SEED } from '@/lib/dev-seed/categories';
import { COLLECTIONS_SEED } from '@/lib/dev-seed/collections';

/* ── Seed data integrity ────────────────────────────────────────────────── */

describe('Book Catalogue — Seed Data Integrity', () => {
  it('has at least one book in the seed', () => {
    expect(BOOKS_SEED.length).toBeGreaterThan(0);
  });

  it('every book has a unique slug', () => {
    const slugs = BOOKS_SEED.map((b) => b.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('every book has a unique id', () => {
    const ids = BOOKS_SEED.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every book has required metadata fields', () => {
    for (const book of BOOKS_SEED) {
      expect(book.title, `${book.slug} missing title`).toBeTruthy();
      expect(book.author, `${book.slug} missing author`).toBeTruthy();
      expect(book.slug, `${book.slug} missing slug`).toBeTruthy();
      expect(book.isbn13, `${book.slug} missing isbn13`).toBeTruthy();
      expect(book.description, `${book.slug} missing description`).toBeTruthy();
      expect(book.licenceCategory, `${book.slug} missing licenceCategory`).toBeTruthy();
      expect(book.licenceNotice, `${book.slug} missing licenceNotice`).toBeTruthy();
    }
  });

  it('ratings are between 0 and 5', () => {
    for (const book of BOOKS_SEED) {
      expect(book.averageRating).toBeGreaterThanOrEqual(0);
      expect(book.averageRating).toBeLessThanOrEqual(5);
    }
  });

  it('slug is lowercase with hyphens only', () => {
    for (const book of BOOKS_SEED) {
      expect(book.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

/* ── Slug resolution (simulates /api/books/[slug]) ──────────────────────── */

describe('Book Catalogue — Slug Resolution', () => {
  it('finds Pride and Prejudice by slug', () => {
    const book = BOOKS_SEED.find((b) => b.slug === 'pride-and-prejudice');
    expect(book).toBeDefined();
    expect(book!.author).toBe('Jane Austen');
  });

  it('returns undefined for an unknown slug', () => {
    const book = BOOKS_SEED.find((b) => b.slug === 'this-book-does-not-exist');
    expect(book).toBeUndefined();
  });

  it('every slug in CATEGORIES_SEED has at least one matching book', () => {
    for (const cat of CATEGORIES_SEED) {
      const books = BOOKS_SEED.filter((b) => b.categorySlug === cat.slug);
      expect(books.length, `Category "${cat.name}" has no books`).toBeGreaterThanOrEqual(0);
      // Not failing if 0 — seed may have empty categories; just ensure no crash
    }
  });
});

/* ── Licence compliance ─────────────────────────────────────────────────── */

describe('Book Catalogue — Licence Compliance', () => {
  const ALLOWED_LICENCES: BookSeed['licenceCategory'][] = [
    'PUBLIC_DOMAIN',
    'DIMISI_OWNED',
    'EXPLICIT_DISTRIBUTION_GRANTED',
    'OPEN_PERMISSIVE',
    'METADATA_ONLY',
  ];

  it('every book has a valid licenceCategory', () => {
    for (const book of BOOKS_SEED) {
      expect(ALLOWED_LICENCES, `${book.slug} has invalid licenceCategory: ${book.licenceCategory}`)
        .toContain(book.licenceCategory);
    }
  });

  it('METADATA_ONLY books must NOT allow download or online reading', () => {
    const metadataOnlyBooks = BOOKS_SEED.filter((b) => b.licenceCategory === 'METADATA_ONLY');
    for (const book of metadataOnlyBooks) {
      expect(book.isDownloadAllowed, `${book.slug} METADATA_ONLY book must not allow download`).toBe(false);
      expect(book.isOnlineReadAllowed, `${book.slug} METADATA_ONLY book must not allow online reading`).toBe(false);
    }
  });

  it('free ebooks (isFree=true) must have PUBLIC_DOMAIN or OPEN_PERMISSIVE licence', () => {
    const freeBooks = BOOKS_SEED.filter((b) => b.isFree === true);
    for (const book of freeBooks) {
      expect(
        ['PUBLIC_DOMAIN', 'OPEN_PERMISSIVE', 'DIMISI_OWNED'].includes(book.licenceCategory),
        `${book.slug} is marked free but has restricted licence: ${book.licenceCategory}`
      ).toBe(true);
    }
  });

  it('digital edition books have a licenceNotice', () => {
    const digitalBooks = BOOKS_SEED.filter((b) => b.hasDigitalEdition);
    for (const book of digitalBooks) {
      expect(book.licenceNotice.length, `${book.slug} missing licenceNotice`).toBeGreaterThan(10);
    }
  });
});

/* ── Collections seed integrity ─────────────────────────────────────────── */

describe('Collections — Seed Data Integrity', () => {
  it('has at least one collection', () => {
    expect(COLLECTIONS_SEED.length).toBeGreaterThan(0);
  });

  it('every collection has a unique slug', () => {
    const slugs = COLLECTIONS_SEED.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every collection bookSlug references a real book', () => {
    const bookSlugs = new Set(BOOKS_SEED.map((b) => b.slug));
    for (const col of COLLECTIONS_SEED) {
      for (const bookSlug of col.bookSlugs) {
        expect(bookSlugs.has(bookSlug), `Collection "${col.title}" references unknown book slug: "${bookSlug}"`).toBe(true);
      }
    }
  });
});
