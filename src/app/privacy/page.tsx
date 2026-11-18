import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-candle-gold-500" />
            Data Protection
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            Privacy Policy
          </h1>
          <p className="mt-3 text-base font-reading text-warm-oak-700 dark:text-cream-300">
            Our unwavering respect for reader confidentiality and data sovereignty.
          </p>
        </div>

        <div className="prose dark:prose-invert font-reading text-base text-warm-oak-800 dark:text-cream-200 leading-relaxed space-y-6">
          <section>
            <h2 className="font-serif text-xl font-bold">1. Reading Privacy as a Sacred Right</h2>
            <p>
              At DIMISI Technologies, we believe what you read in the quiet of midnight is deeply personal. DimisiReads does not sell reading habits, highlight history, or personal data to third-party ad networks or data brokers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold">2. Information We Collect</h2>
            <p>
              We collect minimal information necessary to deliver a serene reading experience: account credentials (email and hashed passwords), reading progress CFIs to synchronize across devices, and optional user-created annotations.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold">3. Security & Storage</h2>
            <p>
              Your passwords are cryptographically salted and hashed using modern algorithms (Argon2id/bcrypt). Digital inventory downloads are streamed via time-limited, signed URLs generated dynamically upon authorization.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold">4. Contacting Data Protection</h2>
            <p>
              For data erasure or privacy inquiries, contact our privacy desk at <code>privacy@dimisireads.com</code>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
