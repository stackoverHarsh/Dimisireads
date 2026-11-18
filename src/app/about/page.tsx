import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { ShieldCheck, Sparkles, Compass, Flame } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-candle-gold-500" />
            DIMISI Technologies Venture
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            About DimisiReads
          </h1>
          <p className="mt-3 text-lg font-reading text-warm-oak-700 dark:text-cream-300">
            Where antique library romance meets modern software architecture.
          </p>
        </div>

        <div className="prose dark:prose-invert font-reading text-base text-warm-oak-800 dark:text-cream-200 leading-relaxed space-y-6 mb-16">
          <p>
            <strong>DimisiReads</strong> was created by <strong>DIMISI Technologies</strong> to address a glaring deficiency in modern digital reading: contemporary reading software has become sterile, transactional, and plagued by intrusive advertising or copyright ambiguity.
          </p>
          <p>
            We envisioned a digital sanctum that feels like walking into an old European archive at dusk—mahogany bookshelves illuminated by twinkling fairy lights, the comforting scent of deckle-edge paper, and quiet rooms where reading is an immersive sanctuary rather than an algorithmic feed.
          </p>
          <p>
            Above all, DimisiReads is founded on <strong>uncompromising legal integrity</strong>. We do not participate in unauthorized file distribution or shadow libraries. Every downloadable volume is verified across four strict legal categories: Public Domain, DIMISI-Owned Originals, Explicit Permission, or Open/Permissive Licences.
          </p>
        </div>

        {/* 3 Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <SpotlightCard className="p-6 text-center">
            <ShieldCheck className="w-8 h-8 text-candle-gold-500 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold mb-1">100% Legal</h3>
            <p className="text-xs text-warm-oak-700 dark:text-cream-300/80 font-reading">
              Auditable provenance on every byte. Zero piracy or grey-area file hosting.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 text-center">
            <Flame className="w-8 h-8 text-candle-gold-500 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold mb-1">Cozy Reading</h3>
            <p className="text-xs text-warm-oak-700 dark:text-cream-300/80 font-reading">
              Candlelight Mode, sepia warmth, and typography optimized for contemplative minds.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 text-center">
            <Compass className="w-8 h-8 text-candle-gold-500 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold mb-1">Vibe Discovery</h3>
            <p className="text-xs text-warm-oak-700 dark:text-cream-300/80 font-reading">
              Finding literature through emotional resonance rather than cold metadata filters.
            </p>
          </SpotlightCard>
        </div>

        <div className="text-center p-8 rounded-2xl bg-cream-100/60 dark:bg-espresso-900/60 border border-warm-oak-300/40 dark:border-candle-gold-500/20">
          <h3 className="font-serif text-xl font-bold mb-2">Ready to explore the sanctum?</h3>
          <p className="text-xs text-warm-oak-700 dark:text-cream-300 mb-6 font-reading">
            Browse through our verified masterworks and light your first candle.
          </p>
          <Link
            href="/explore"
            className="px-6 py-3 rounded-xl bg-burgundy-700 text-cream-50 text-xs font-semibold shadow-burgundy-glow inline-block"
          >
            Enter The Library
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
