import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { ShelfView } from '@/components/books/ShelfView';
import { CATEGORIES_SEED } from '@/lib/dev-seed/categories';
import { BOOKS_SEED } from '@/lib/dev-seed/books';
import { ArrowLeft, Compass } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES_SEED.map((cat) => ({
    slug: cat.slug,
  }));
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://dimisireads.com';

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES_SEED.find((c) => c.slug === slug);
  if (!category) return { title: 'Category Not Found — DimisiReads' };

  const title = `${category.name} Books — DimisiReads`;
  const description = category.description;
  const url = `${BASE_URL}/categories/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'DimisiReads', type: 'website' },
    twitter: { card: 'summary', title, description },
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES_SEED.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryBooks = BOOKS_SEED.filter((b) => b.categorySlug === slug);

  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        {/* Back Link */}
        <Link
          href="/categories"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-warm-oak-700 dark:text-dusty-pink-300 hover:text-burgundy-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Categories
        </Link>

        {/* Category Header */}
        <div className="mb-12 border-b border-warm-oak-200/50 dark:border-espresso-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-3">
            <Compass className="w-3.5 h-3.5 text-candle-gold-500" />
            Vibe: {category.vibe}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            {category.name}
          </h1>

          <p className="mt-3 text-base font-reading text-warm-oak-700 dark:text-cream-300 max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Bookshelf View of Category */}
        <ShelfView
          books={categoryBooks}
          shelfTitle={`Shelves of ${category.name}`}
          allowSpineToggle={true}
        />
      </main>

      <Footer />
    </div>
  );
}
