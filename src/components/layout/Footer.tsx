'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Library,
  ShieldCheck,
  Send,
  Heart,
  Feather,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-espresso-950 via-[#160E11] to-[#0E090B] text-cream-100 border-t border-candle-gold-500/20 overflow-hidden">
      {/* Decorative Top Candlelight Filament */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-candle-gold-400/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-warm-oak-900/40">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-burgundy-700 text-candle-gold-300 shadow-burgundy-glow">
                <Library className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-cream-50">
                DIMISI<span className="text-candle-gold-400">READS</span>
              </span>
            </Link>

            <p className="font-reading text-sm text-cream-200/80 leading-relaxed max-w-sm">
              An enchanting digital library sanctuary curated by <strong>DIMISI Technologies</strong>. Bridging classical literature, verified public-domain treasures, and modern systems architecture in a cozy, fairy-lit sanctuary.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-candle-gold-300/90 font-mono">
              <ShieldCheck className="w-4 h-4 text-candle-gold-400" />
              <span>100% Verified Legal Provenance</span>
            </div>
          </div>

          {/* Column 2: Sanctum Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-candle-gold-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Sanctuary
            </h4>
            <ul className="space-y-2 text-xs font-sans text-cream-300/80">
              <li>
                <Link href="/explore" className="hover:text-candle-gold-300 transition-colors">
                  Explore Catalogue
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-candle-gold-300 transition-colors">
                  Browse by Genre & Vibe
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-candle-gold-300 transition-colors">
                  Curated Collections
                </Link>
              </li>
              <li>
                <Link href="/free-ebooks" className="hover:text-candle-gold-300 transition-colors">
                  Free Legal E-Books
                </Link>
              </li>
              <li>
                <Link href="/design-system" className="hover:text-candle-gold-300 transition-colors">
                  Design System Showcase
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Governance */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-candle-gold-300 flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5" />
              Governance
            </h4>
            <ul className="space-y-2 text-xs font-sans text-cream-300/80">
              <li>
                <Link href="/copyright-policy" className="hover:text-candle-gold-300 transition-colors">
                  Copyright & DMCA Policy
                </Link>
              </li>
              <li>
                <Link href="/community-guidelines" className="hover:text-candle-gold-300 transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-candle-gold-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-candle-gold-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-candle-gold-300 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / The Dimisi Gazette */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-candle-gold-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              The Gazette
            </h4>
            <p className="text-xs text-cream-300/70 font-reading">
              Receive quiet monthly dispatches of newly restored public domain masterworks and curated literary vibes.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-burgundy-900/60 border border-candle-gold-500/40 text-xs text-candle-gold-300 font-serif">
                ✨ Your wax seal has been placed. Welcome to our reading circle.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your scholarly email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-espresso-900 border border-warm-oak-700/60 text-xs text-cream-100 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 rounded-md bg-burgundy-700 hover:bg-burgundy-600 text-candle-gold-200 transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Subscribe to newsletter"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="block text-[10px] text-warm-oak-400">
                  Zero spam. Never monetized. Strictly editorial.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-oak-400 font-sans">
          <p>
            © {new Date().getFullYear()} <strong>DIMISI Technologies</strong>. All rights reserved. DimisiReads is a compliant digital library ecosystem.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/about" className="hover:text-cream-200 transition-colors">
              About DIMISI
            </Link>
            <span className="text-warm-oak-700">•</span>
            <Link href="/contact" className="hover:text-cream-200 transition-colors">
              Contact Archivists
            </Link>
            <span className="text-warm-oak-700">•</span>
            <span className="flex items-center gap-1 text-candle-gold-400/80">
              Crafted with <Heart className="w-3 h-3 text-burgundy-400 fill-burgundy-400" /> for book lovers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
