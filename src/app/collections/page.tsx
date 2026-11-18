'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { COLLECTIONS_SEED } from '@/lib/dev-seed/collections';
import { Feather, ArrowRight } from 'lucide-react';

export default function CollectionsPage() {
  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-3">
            <Feather className="w-3.5 h-3.5 text-candle-gold-500" />
            Anthology Suites
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            Curated Collections
          </h1>
          <p className="mt-3 text-base font-reading text-warm-oak-700 dark:text-cream-300">
            Carefully orchestrated reading journeys assembled by DIMISI curators, uniting timeless literature with modern intellect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS_SEED.map((col) => (
            <Link key={col.id} href={`/collections/${col.slug}`}>
              <SpotlightCard className="h-full flex flex-col justify-between group overflow-hidden border-dusty-pink-300/40 dark:border-candle-gold-500/20 p-6">
                <div>
                  <div
                    className="w-full h-48 rounded-xl bg-cover bg-center mb-5 relative overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform duration-500"
                    style={{ backgroundImage: `url(${col.bannerImageUrl})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-candle-gold-300">
                      <span>{col.bookSlugs.length} Books</span>
                      <span className="italic">{col.vibe}</span>
                    </div>
                  </div>

                  <p className="text-[10px] uppercase tracking-wider text-warm-oak-500 dark:text-dusty-pink-300 font-sans">
                    Curated by {col.curatorName}
                  </p>
                  <h2 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50 group-hover:text-candle-gold-400 transition-colors mt-1">
                    {col.title}
                  </h2>
                  <p className="mt-2 text-xs text-warm-oak-700 dark:text-cream-300/80 font-reading leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-warm-oak-200/50 dark:border-espresso-800 flex items-center justify-between text-xs font-semibold text-burgundy-800 dark:text-candle-gold-300">
                  <span>Explore Anthology</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
