import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { TiltedBookCard } from '@/components/react-bits/TiltedBookCard';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { BOOKS_SEED } from '@/lib/dev-seed/books';
import {
  BookOpen,
  DownloadCloud,
  Bookmark,
  ShieldCheck,
  Star,
  Calendar,
  Layers,
  Globe,
  Building,
  Hash,
  ArrowLeft,
  AlertCircle,
  Share2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BOOKS_SEED.map((b) => ({
    slug: b.slug,
  }));
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { slug } = await params;
  const book = BOOKS_SEED.find((b) => b.slug === slug);

  if (!book) {
    notFound();
  }

  const similarBooks = BOOKS_SEED.filter(
    (b) => b.id !== book.id && (b.categorySlug === book.categorySlug || b.vibe === book.vibe)
  ).slice(0, 3);

  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={35} />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28">
        {/* Navigation Breadcrumb */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-warm-oak-700 dark:text-dusty-pink-300 hover:text-burgundy-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library Catalogue
        </Link>

        {/* Hero Section: 3D Cover + Metadata & Legal Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: 3D Book Cover Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="p-8 rounded-3xl wood-shelf shadow-2xl w-full max-w-sm flex items-center justify-center">
              <TiltedBookCard
                title={book.title}
                author={book.author}
                coverImageUrl={book.coverImageUrl}
                category={book.category}
                vibe={book.vibe}
                isAvailable={book.hasDigitalEdition}
                className="w-68 h-96"
              />
            </div>

            {/* Quick Share / Info Bar below cover */}
            <div className="mt-6 flex items-center gap-3 text-xs text-warm-oak-600 dark:text-cream-300">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-warm-oak-300/40 dark:border-candle-gold-500/20 hover:border-candle-gold-500 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-candle-gold-500" />
                Share Tome
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-warm-oak-300/40 dark:border-candle-gold-500/20 hover:border-candle-gold-500 transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5 text-candle-gold-500" />
                Save to Shelf
              </button>
            </div>
          </div>

          {/* Right Column: Title, Author, CTAs, Strict Legal Status */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wide bg-burgundy-900/10 dark:bg-espresso-800 text-burgundy-800 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20">
                  {book.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-serif italic bg-candle-gold-500/15 text-candle-gold-700 dark:text-candle-gold-300 border border-candle-gold-500/30">
                  &ldquo;{book.vibe}&rdquo;
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50 leading-tight">
                {book.title}
              </h1>

              {book.subtitle && (
                <p className="font-serif italic text-lg text-warm-oak-700 dark:text-dusty-pink-200 mt-1">
                  {book.subtitle}
                </p>
              )}

              <p className="mt-3 text-base text-warm-oak-900 dark:text-cream-200 font-sans">
                by <strong className="font-serif text-lg">{book.author}</strong>
              </p>
            </div>

            {/* Rating Summary */}
            <div className="flex items-center gap-3 py-2 border-y border-warm-oak-200/50 dark:border-espresso-800">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < Math.floor(book.averageRating)
                        ? 'fill-candle-gold-400 text-candle-gold-400'
                        : 'text-warm-oak-300 dark:text-espresso-700'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-bold font-mono text-espresso-950 dark:text-cream-100">
                {book.averageRating.toFixed(2)}
              </span>
              <span className="text-xs text-warm-oak-500 font-sans">
                ({book.ratingsCount.toLocaleString()} verified reader ratings)
              </span>
            </div>

            {/* ========================================================
                STRICT LEGAL ACTION BAR (Download / Read Online / Catalogue)
            ======================================================== */}
            <div className="p-6 rounded-2xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/50 dark:border-candle-gold-500/30 shadow-md">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-warm-oak-500 dark:text-dusty-pink-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-candle-gold-500" />
                  Legal Availability Status
                </span>
                <span
                  className={cn(
                    'px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase',
                    book.hasDigitalEdition
                      ? 'bg-candle-gold-500/20 text-candle-gold-700 dark:text-candle-gold-300 border border-candle-gold-500/40'
                      : 'bg-warm-oak-100 dark:bg-espresso-800 text-warm-oak-600 dark:text-cream-300'
                  )}
                >
                  {book.licenceCategory.replace('_', ' ')}
                </span>
              </div>

              {/* Action Buttons: strictly conditioned on digital edition rights */}
              {book.hasDigitalEdition ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button className="flex-1 min-w-[180px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-cream-50 font-sans font-semibold text-sm shadow-burgundy-glow transition-all active:scale-95 cursor-pointer">
                      <BookOpen className="w-4 h-4 text-candle-gold-300" />
                      Read in Candlelight Mode
                    </button>

                    {book.isDownloadAllowed && (
                      <button className="flex-1 min-w-[180px] flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-candle-gold-500 hover:bg-candle-gold-600 text-espresso-950 font-sans font-semibold text-sm shadow-candle-glow transition-all active:scale-95 cursor-pointer">
                        <DownloadCloud className="w-4 h-4 text-espresso-950" />
                        Download {book.fileFormat} ({(book.fileSizeBytes! / 1024 / 1024).toFixed(1)} MB)
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-warm-oak-700 dark:text-cream-300/80 font-reading italic">
                    {book.licenceNotice}
                  </p>
                </div>
              ) : (
                /* Non-downloadable Copyrighted Book (Metadata only) */
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-warm-oak-100/60 dark:bg-espresso-950/60 border border-warm-oak-300/40 dark:border-espresso-800">
                    <AlertCircle className="w-5 h-5 text-warm-oak-600 dark:text-candle-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-espresso-900 dark:text-cream-100">
                        Catalogue Reference Only
                      </h4>
                      <p className="text-xs text-warm-oak-700 dark:text-cream-300 font-reading mt-0.5">
                        This work is protected under active copyright and is not available for online reading or digital file download on DimisiReads.
                      </p>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-cream-200 dark:bg-espresso-800 hover:bg-cream-300 text-espresso-900 dark:text-cream-100 font-sans font-semibold text-sm transition-all cursor-pointer">
                    <Bookmark className="w-4 h-4 text-candle-gold-500" />
                    Save to My Reading Wishlist
                  </button>
                </div>
              )}
            </div>

            {/* Bibliographic Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-cream-50/80 dark:bg-espresso-900/60 border border-warm-oak-200/50 dark:border-espresso-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-warm-oak-500 dark:text-dusty-pink-300/80 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-candle-gold-500" /> Year
                </span>
                <p className="font-serif font-bold text-sm text-espresso-950 dark:text-cream-100 mt-1">
                  {book.publishedYear > 0 ? book.publishedYear : `${Math.abs(book.publishedYear)} BC`}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-cream-50/80 dark:bg-espresso-900/60 border border-warm-oak-200/50 dark:border-espresso-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-warm-oak-500 dark:text-dusty-pink-300/80 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-candle-gold-500" /> Extent
                </span>
                <p className="font-serif font-bold text-sm text-espresso-950 dark:text-cream-100 mt-1">
                  {book.pageCount} Pages
                </p>
              </div>

              <div className="p-3 rounded-xl bg-cream-50/80 dark:bg-espresso-900/60 border border-warm-oak-200/50 dark:border-espresso-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-warm-oak-500 dark:text-dusty-pink-300/80 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-candle-gold-500" /> Language
                </span>
                <p className="font-serif font-bold text-sm text-espresso-950 dark:text-cream-100 mt-1">
                  {book.language}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-cream-50/80 dark:bg-espresso-900/60 border border-warm-oak-200/50 dark:border-espresso-800 col-span-2 sm:col-span-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-warm-oak-500 dark:text-dusty-pink-300/80 flex items-center gap-1">
                  <Building className="w-3 h-3 text-candle-gold-500" /> Publisher
                </span>
                <p className="font-serif font-bold text-xs text-espresso-950 dark:text-cream-100 mt-1 truncate">
                  {book.publisher}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-cream-50/80 dark:bg-espresso-900/60 border border-warm-oak-200/50 dark:border-espresso-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-warm-oak-500 dark:text-dusty-pink-300/80 flex items-center gap-1">
                  <Hash className="w-3 h-3 text-candle-gold-500" /> ISBN-13
                </span>
                <p className="font-mono text-xs text-espresso-950 dark:text-cream-100 mt-1 truncate">
                  {book.isbn13}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Synopsis & Literary Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
              Synopsis & Archival Context
            </h2>
            <div className="prose dark:prose-invert font-reading text-base text-warm-oak-800 dark:text-cream-200 leading-relaxed space-y-4">
              <p>{book.synopsis}</p>
              <p>{book.description}</p>
            </div>

            {/* Tags */}
            <div className="pt-4 flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-cream-100 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-warm-oak-700 dark:text-cream-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Biography Box */}
          <div className="lg:col-span-4">
            <SpotlightCard className="p-6">
              <h3 className="font-serif text-lg font-bold text-burgundy-950 dark:text-cream-50 mb-2">
                About the Author
              </h3>
              <h4 className="font-serif text-xl font-bold text-candle-gold-600 dark:text-candle-gold-400 mb-2">
                {book.author}
              </h4>
              <p className="text-xs text-warm-oak-700 dark:text-cream-300 font-reading leading-relaxed">
                {book.authorBio}
              </p>
            </SpotlightCard>
          </div>
        </div>

        {/* Community Reviews & Ratings Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-warm-oak-200/50 dark:border-espresso-800">
            <div>
              <h2 className="font-serif text-2xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
                Scholarly Reviews ({book.reviews.length})
              </h2>
              <p className="text-xs text-warm-oak-600 dark:text-dusty-pink-200 mt-0.5">
                Authentic community reflections. Free of commercial review gating.
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-burgundy-700 text-cream-50 text-xs font-semibold shadow-burgundy-glow cursor-pointer">
              Write a Review
            </button>
          </div>

          {book.reviews.length === 0 ? (
            <div className="p-8 rounded-2xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-200/50 dark:border-espresso-800 text-center">
              <p className="font-serif text-base font-semibold">No reviews penned yet</p>
              <p className="text-xs text-warm-oak-600 dark:text-cream-300 mt-1">
                Be the first reader to illuminate this volume for the sanctuary.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {book.reviews.map((rev) => (
                <SpotlightCard key={rev.id} className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-sm text-burgundy-950 dark:text-cream-100">
                      {rev.userName}
                    </span>
                    <span className="text-[10px] font-mono text-warm-oak-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-3.5 h-3.5',
                          i < rev.rating
                            ? 'fill-candle-gold-400 text-candle-gold-400'
                            : 'text-warm-oak-300 dark:text-espresso-700'
                        )}
                      />
                    ))}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-espresso-950 dark:text-cream-100 mb-1">
                    &ldquo;{rev.headline}&rdquo;
                  </h4>
                  <p className="text-xs text-warm-oak-700 dark:text-cream-300/90 font-reading leading-relaxed">
                    {rev.content}
                  </p>
                </SpotlightCard>
              ))}
            </div>
          )}
        </div>

        {/* Similar Books in the Sanctuary */}
        {similarBooks.length > 0 && (
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50 mb-8">
              Similar Volumes in the Reserve
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {similarBooks.map((sim) => (
                <Link key={sim.id} href={`/books/${sim.slug}`} className="flex justify-center">
                  <TiltedBookCard
                    title={sim.title}
                    author={sim.author}
                    coverImageUrl={sim.coverImageUrl}
                    category={sim.category}
                    vibe={sim.vibe}
                    isAvailable={sim.hasDigitalEdition}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
