import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { Scale } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-3">
            <Scale className="w-3.5 h-3.5 text-candle-gold-500" />
            Terms of Use
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            Terms of Service
          </h1>
          <p className="mt-3 text-base font-reading text-warm-oak-700 dark:text-cream-300">
            Rules governing participation within the DimisiReads library ecosystem.
          </p>
        </div>

        <div className="prose dark:prose-invert font-reading text-base text-warm-oak-800 dark:text-cream-200 leading-relaxed space-y-6">
          <section>
            <h2 className="font-serif text-xl font-bold">1. Agreement to Terms</h2>
            <p>
              By accessing or using DimisiReads, you agree to be bound by these Terms of Service and our Copyright Policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold">2. Permitted Use</h2>
            <p>
              You may read, download, and store authorized digital files made available to you under our four legal licence tiers for personal, non-commercial reading or educational study.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold">3. Prohibited Conduct</h2>
            <p>
              Users may not attempt to reverse engineer signed URL tokens, scrape our private S3 vault, upload malicious binaries, or distribute copyrighted works without explicit authorization.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold">4. Governance</h2>
            <p>
              These terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
