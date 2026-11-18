'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { CATEGORIES_SEED } from '@/lib/dev-seed/categories';
import { BOOKS_SEED } from '@/lib/dev-seed/books';
import { Compass, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-3">
            <Compass className="w-3.5 h-3.5 text-candle-gold-500" />
            Curated Taxonomy
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            Browse by Literary Discipline & Vibe
          </h1>
          <p className="mt-3 text-base font-reading text-warm-oak-700 dark:text-cream-300">
            Choose your emotional landscape—from gothic rainswept manors and stoic meditations to agentic systems engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES_SEED.map((cat) => {
            const catBooks = BOOKS_SEED.filter((b) => b.categorySlug === cat.slug);
            return (
              <Link key={cat.id} href={`/categories/${cat.slug}`}>
                <SpotlightCard className="h-full flex flex-col justify-between group p-8 cursor-pointer hover:border-candle-gold-500/50">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-burgundy-900/10 dark:bg-espresso-800 text-burgundy-800 dark:text-candle-gold-300 border border-burgundy-800/20 dark:border-candle-gold-500/20">
                        {catBooks.length} Curated Volumes
                      </span>
                      <Sparkles className="w-4 h-4 text-candle-gold-500 group-hover:rotate-12 transition-transform" />
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50 group-hover:text-candle-gold-500 transition-colors">
                      {cat.name}
                    </h2>

                    <p className="mt-1 font-serif italic text-sm text-candle-gold-600 dark:text-candle-gold-400">
                      &ldquo;{cat.vibe}&rdquo;
                    </p>

                    <p className="mt-3 text-xs text-warm-oak-700 dark:text-cream-300 font-reading leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Book Previews in this category */}
                    <div className="mt-6 pt-4 border-t border-warm-oak-200/40 dark:border-espresso-800 space-y-1.5">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-warm-oak-500 dark:text-dusty-pink-300">
                        Featured in this discipline:
                      </p>
                      {catBooks.slice(0, 2).map((b) => (
                        <p key={b.id} className="text-xs font-serif text-burgundy-900 dark:text-cream-200 truncate flex items-center gap-1.5">
                          <BookOpen className="w-3 h-3 text-candle-gold-500 shrink-0" />
                          {b.title} <span className="text-[10px] text-warm-oak-500">by {b.author}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-warm-oak-200/40 dark:border-espresso-800 flex items-center justify-between text-xs font-semibold text-burgundy-800 dark:text-candle-gold-300">
                    <span>Enter Sanctum</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </SpotlightCard>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
