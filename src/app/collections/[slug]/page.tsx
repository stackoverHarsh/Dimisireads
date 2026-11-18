import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { ShelfView } from '@/components/books/ShelfView';
import { COLLECTIONS_SEED } from '@/lib/dev-seed/collections';
import { BOOKS_SEED } from '@/lib/dev-seed/books';
import { ArrowLeft, Feather } from 'lucide-react';

interface CollectionDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return COLLECTIONS_SEED.map((col) => ({
    slug: col.slug,
  }));
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://dimisireads.com';

export async function generateMetadata({ params }: CollectionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const col = COLLECTIONS_SEED.find((c) => c.slug === slug);
  if (!col) return { title: 'Collection Not Found — DimisiReads' };

  const title = `${col.title} — Curated by ${col.curatorName} | DimisiReads`;
  const description = col.description;
  const url = `${BASE_URL}/collections/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'DimisiReads',
      type: 'website',
      images: col.bannerImageUrl ? [{ url: col.bannerImageUrl }] : [],
    },
    twitter: { card: 'summary_large_image', title, description, images: col.bannerImageUrl ? [col.bannerImageUrl] : [] },
  };
}

export default async function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const { slug } = await params;
  const collection = COLLECTIONS_SEED.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  // Find all books belonging to this collection
  const collectionBooks = BOOKS_SEED.filter((b) => collection.bookSlugs.includes(b.slug));

  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <Link
          href="/collections"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-warm-oak-700 dark:text-dusty-pink-300 hover:text-burgundy-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Collections
        </Link>

        {/* Collection Hero Header */}
        <div className="relative rounded-3xl overflow-hidden mb-16 p-8 sm:p-12 border border-candle-gold-500/30 bg-gradient-to-br from-espresso-950 via-burgundy-950 to-espresso-950 text-cream-50 shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{ backgroundImage: `url(${collection.bannerImageUrl})` }}
          />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-espresso-900/80 text-candle-gold-300 border border-candle-gold-500/30 mb-4">
              <Feather className="w-3.5 h-3.5 text-candle-gold-400" />
              Curated by {collection.curatorName}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream-50 mb-4">
              {collection.title}
            </h1>

            <p className="font-reading text-base text-cream-200/90 leading-relaxed mb-6">
              {collection.description}
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-candle-gold-400">
              <span>{collectionBooks.length} Selected Volumes</span>
              <span>•</span>
              <span className="italic">{collection.vibe}</span>
            </div>
          </div>
        </div>

        {/* Bookshelf View of the Collection */}
        <ShelfView
          books={collectionBooks}
          shelfTitle={collection.title}
          allowSpineToggle={true}
        />
      </main>

      <Footer />
    </div>
  );
}
