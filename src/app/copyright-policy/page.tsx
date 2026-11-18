import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { ShieldCheck } from 'lucide-react';

export default function CopyrightPolicyPage() {
  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-candle-gold-500/15 text-candle-gold-700 dark:text-candle-gold-300 border border-candle-gold-500/30 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-candle-gold-500" />
            Legal Compliance Mandate
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            Copyright & Content Policy
          </h1>
          <p className="mt-3 text-base font-reading text-warm-oak-700 dark:text-cream-300">
            Our formal commitment to 100% legal, auditable digital library operations.
          </p>
        </div>

        <div className="prose dark:prose-invert font-reading text-base text-warm-oak-800 dark:text-cream-200 leading-relaxed space-y-6 mb-16">
          <section>
            <h2 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50">
              1. Fundamental Principles
            </h2>
            <p>
              DimisiReads, operated by DIMISI Technologies, is a legitimate digital library and literary discovery sanctuary. Under no circumstances does DimisiReads engage in unauthorized distribution of copyrighted material, hidden torrent/cyberlocker triggers, circumvention of technological protection measures, or shadow library distribution.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50">
              2. Decoupling of Catalogue Metadata vs. Digital Inventory
            </h2>
            <p>
              DimisiReads maintains a strict architectural decoupling between two distinct systems:
            </p>
            <ul>
              <li>
                <strong>The Bibliographic Catalogue:</strong> A descriptive index of books across history. Bibliographic metadata (titles, authors, ISBNs, summaries, cover thumbnails) is sourced from standard public bibliographic records (including Google Books API and Open Library) purely for review, educational, and discovery purposes. The inclusion of a book’s metadata in our catalogue <em>never</em> implies the availability of a downloadable digital file.
              </li>
              <li>
                <strong>The Licensed Digital Inventory:</strong> Digital e-book files (EPUB, PDF) stored in our private encrypted vault. Download or online reading access is restricted exclusively to assets that possess a verified, audited legal licence.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50">
              3. The 4 Verified Legal Licence Categories
            </h2>
            <p>
              Every file accessible for reading or download on DimisiReads must belong to one of four verified legal categories:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
              <SpotlightCard className="p-4">
                <h4 className="font-serif font-bold text-sm text-candle-gold-600 dark:text-candle-gold-400 mb-1">
                  1. Public Domain
                </h4>
                <p className="text-xs text-warm-oak-700 dark:text-cream-300 font-reading">
                  Works where copyright has formally expired (author life + 70 years, or published prior to 1929 in the US). Verified against international copyright rules.
                </p>
              </SpotlightCard>

              <SpotlightCard className="p-4">
                <h4 className="font-serif font-bold text-sm text-candle-gold-600 dark:text-candle-gold-400 mb-1">
                  2. DIMISI-Owned Originals
                </h4>
                <p className="text-xs text-warm-oak-700 dark:text-cream-300 font-reading">
                  Proprietary publications, technical guides, and architectural works authored and directly owned by DIMISI Technologies.
                </p>
              </SpotlightCard>

              <SpotlightCard className="p-4">
                <h4 className="font-serif font-bold text-sm text-candle-gold-600 dark:text-candle-gold-400 mb-1">
                  3. Explicit Distribution Permission
                </h4>
                <p className="text-xs text-warm-oak-700 dark:text-cream-300 font-reading">
                  Works distributed under formal bilateral written agreements with authors, copyright estates, or authorized publishers.
                </p>
              </SpotlightCard>

              <SpotlightCard className="p-4">
                <h4 className="font-serif font-bold text-sm text-candle-gold-600 dark:text-candle-gold-400 mb-1">
                  4. Open / Permissive Licences
                </h4>
                <p className="text-xs text-warm-oak-700 dark:text-cream-300 font-reading">
                  Works made freely available under open licences such as Creative Commons (CC0, CC-BY, CC-BY-SA) or standard Project Gutenberg terms.
                </p>
              </SpotlightCard>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50">
              4. DMCA Notice and Takedown Procedure
            </h2>
            <p>
              If you believe any content on DimisiReads infringes upon your copyright, please submit an expedited notification to our designated copyright officer at:
            </p>
            <div className="p-4 rounded-xl bg-cream-100 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-xs font-mono space-y-1 not-prose my-4">
              <p><strong>Designated DMCA Agent:</strong> Legal Counsel, DIMISI Technologies</p>
              <p><strong>Email:</strong> legal@dimisireads.com / copyright@dimisireads.com</p>
              <p><strong>Subject:</strong> Notice of Claimed Copyright Infringement</p>
            </div>
            <p>
              Upon receipt of a valid notice complying with 17 U.S.C. § 512(c)(3), our systems allow instant single-click revocation and freezing of the contested digital asset within our private S3 vault.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50">
              5. Review & Rating Policy
            </h2>
            <p>
              In accordance with ethical platform guidelines and Google Reviews Policies, DimisiReads <strong>never</strong> gates, unlocks, or incentivizes e-book downloads, reading privileges, or monetary rewards behind public user reviews.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
