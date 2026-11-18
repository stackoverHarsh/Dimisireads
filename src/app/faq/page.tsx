'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is DimisiReads 100% legal?',
      a: 'Yes, absolutely. DimisiReads is engineered to be a strictly compliant digital library. We never distribute pirated or unauthorized files. Every readable or downloadable volume is rigorously audited under one of four verified legal categories: Public Domain, DIMISI-Owned Originals, Explicit Permission, or Open/Permissive Licences (CC0/CC-BY).'
    },
    {
      q: 'Why are some books available to read/download while others are "Catalogue Reference"?',
      a: 'DimisiReads decouples our general bibliographic discovery catalogue from our licensed digital inventory. Books under active commercial copyright appear in our catalogue solely for bibliographic metadata, personal wishlist tracking, and scholarly reviews—they cannot be downloaded or read online.'
    },
    {
      q: 'What is Candlelight Mode?',
      a: 'Candlelight Mode is our custom reading mode crafted to eliminate aggressive blue light. It applies warm sepia paper tones, subtle candlelight vignettes, and classical editorial typography (EB Garamond, Playfair Display) so long reading sessions remain restful and cozy.'
    },
    {
      q: 'Are downloads DRM-free?',
      a: 'Yes. All legally authorized Public Domain masterworks and DIMISI publications are delivered in standard, unencumbered EPUB or PDF formats that you can load onto any e-reader or mobile device.'
    },
    {
      q: 'Do you require user reviews to unlock book downloads?',
      a: 'Never. In compliance with ethical digital standards and Google Reviews Policies, DimisiReads never gates, locks, or bribes downloads behind reviews or star ratings.'
    },
    {
      q: 'How does the "Browse by Vibe" feature work?',
      a: 'Browse by Vibe organizes literature according to emotional atmosphere and psychological resonance—such as "Rainy Day in Oxford", "Candlelit Altar", or "Midnight Manor"—allowing readers to find books that suit their present mood.'
    }
  ];

  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-candle-gold-500" />
            Knowledge Base
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-base font-reading text-warm-oak-700 dark:text-cream-300">
            Answers regarding our legal architecture, reading experience, and library curation.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <SpotlightCard key={index} className="p-0 overflow-hidden cursor-pointer">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-lg font-bold text-burgundy-950 dark:text-cream-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-candle-gold-500 shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 font-reading text-sm text-warm-oak-800 dark:text-cream-200/90 leading-relaxed border-t border-warm-oak-200/30 dark:border-espresso-800 mt-2">
                    {faq.a}
                  </div>
                )}
              </SpotlightCard>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
