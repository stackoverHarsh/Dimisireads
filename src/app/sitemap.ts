import type { MetadataRoute } from 'next';
import { BOOKS_SEED } from '@/lib/dev-seed/books';
import { CATEGORIES_SEED } from '@/lib/dev-seed/categories';
import { COLLECTIONS_SEED } from '@/lib/dev-seed/collections';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://dimisireads.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* ── Static pages ─────────────────────────────────────────── */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/explore`,             lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/categories`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/collections`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/free-ebooks`,         lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/about`,               lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`,             lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/faq`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`,             lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms`,               lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/copyright-policy`,    lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/community-guidelines`,lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  /* ── Books ────────────────────────────────────────────────── */
  const bookRoutes: MetadataRoute.Sitemap = BOOKS_SEED.map((book) => ({
    url: `${BASE_URL}/books/${book.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  /* ── Categories ───────────────────────────────────────────── */
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES_SEED.map((cat) => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  /* ── Collections ──────────────────────────────────────────── */
  const collectionRoutes: MetadataRoute.Sitemap = COLLECTIONS_SEED.map((col) => ({
    url: `${BASE_URL}/collections/${col.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...bookRoutes,
    ...categoryRoutes,
    ...collectionRoutes,
  ];
}
