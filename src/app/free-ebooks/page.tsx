'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { ShelfView } from '@/components/books/ShelfView';
import { BOOKS_SEED } from '@/lib/dev-seed/books';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function FreeEbooksPage() {
  const freeBooks = BOOKS_SEED.filter((b) => b.isFree && b.hasDigitalEdition);

  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        {/* Header */}
        <div className="mb-12 border-b border-warm-oak-200/50 dark:border-espresso-800 pb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-candle-gold-500/15 text-candle-gold-700 dark:text-candle-gold-300 border border-candle-gold-500/30 mb-3">
            <ShieldCheck className="w-4 h-4 text-candle-gold-500" />
            100% Legally Verified Free E-Books
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            Free Public Domain & Original E-Books
          </h1>

          <p className="mt-3 text-base font-reading text-warm-oak-700 dark:text-cream-300 max-w-3xl leading-relaxed">
            All volumes showcased here are 100% free, legal, and DRM-free. Cleared under verified Public Domain status (Life + 70 years / Pre-1929 publication) or proprietary DIMISI Technologies distribution licences. Read in your browser with our warm Candlelight Reader or download the EPUB.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-warm-oak-600 dark:text-dusty-pink-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-candle-gold-500" />
              DRM-Free Standard EPUB / PDF
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-candle-gold-500" />
              Zero Popups, Tracking or Hidden Ads
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-candle-gold-500" />
              Browser-Based Lantern Reader
            </span>
          </div>
        </div>

        {/* Shelf View of Free Books */}
        <ShelfView
          books={freeBooks}
          shelfTitle="Free Archival Reserve"
          allowSpineToggle={true}
        />
      </main>

      <Footer />
    </div>
  );
}
