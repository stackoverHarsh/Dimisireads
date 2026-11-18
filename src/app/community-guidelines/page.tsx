import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { Feather } from 'lucide-react';

export default function CommunityGuidelinesPage() {
  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-3">
            <Feather className="w-3.5 h-3.5 text-candle-gold-500" />
            Scholarly Decorum
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            Community Guidelines
          </h1>
          <p className="mt-3 text-base font-reading text-warm-oak-700 dark:text-cream-300">
            Preserving a quiet, respectful sanctuary for literary contemplation.
          </p>
        </div>

        <div className="prose dark:prose-invert font-reading text-base text-warm-oak-800 dark:text-cream-200 leading-relaxed space-y-6">
          <section>
            <h2 className="font-serif text-xl font-bold">1. The Spirit of the Library</h2>
            <p>
              DimisiReads is modeled after an ancient, tranquil reading room. We treat fellow readers and divergent literary opinions with dignity, intellectual generosity, and scholarly decorum.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold">2. Thoughtful, Constructive Reviews</h2>
            <p>
              When penning reviews or annotations, offer thoughtful critique rather than personal harassment or inflammatory rhetoric. Mark spoilers clearly to protect the discovery journey of fellow readers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold">3. Zero Tolerance for Piracy Promotion</h2>
            <p>
              Posting links to torrents, unauthorized PDF distributions, cyberlockers, or methods of circumvention will result in immediate and permanent account termination.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold">4. Reporting Uncivil Behavior</h2>
            <p>
              Use the &ldquo;Report&rdquo; flag on any review that violates these community standards. Our moderation staff reviews all flags within 24 hours.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
