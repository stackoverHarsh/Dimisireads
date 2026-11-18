'use client';

import React from 'react';
import Link from 'next/link';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { FairyLightGarland } from '@/components/motion/FairyLightGarland';
import { BlurText } from '@/components/react-bits/BlurText';
import { Library, Sparkles, ShieldCheck } from 'lucide-react';

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  quote?: string;
  quoteAuthor?: string;
  title: string;
  subtitle: string;
}

export const AuthSplitLayout: React.FC<AuthSplitLayoutProps> = ({
  children,
  quote = 'There is no friend as loyal as a book.',
  quoteAuthor = 'Ernest Hemingway',
  title,
  subtitle,
}) => {
  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row text-espresso-950 dark:text-cream-50">
      {/* Left Panel: The Dreamy Reading Sanctuary (45% width on desktop) */}
      <div className="relative lg:w-[48%] bg-gradient-to-br from-espresso-950 via-burgundy-950 to-[#100B0D] p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-candle-gold-500/20 text-cream-50 min-h-[380px] lg:min-h-screen">
        <AmbientDustMotes particleCount={30} />
        <FairyLightGarland bulbsCount={14} glowIntensity="radiant" className="-top-3 absolute left-0 right-0 z-20" />

        {/* Brand Header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="p-2.5 rounded-xl bg-burgundy-700 text-candle-gold-300 shadow-burgundy-glow group-hover:scale-105 transition-transform">
              <Library className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-cream-50">
                DIMISI<span className="text-candle-gold-400">READS</span>
              </span>
              <p className="text-[10px] uppercase tracking-widest text-dusty-pink-300 font-sans">
                Digital Library Sanctuary
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Glowing Literary Quotation */}
        <div className="relative z-10 my-auto py-12 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-espresso-900/80 text-candle-gold-300 border border-candle-gold-500/30 mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-candle-gold-400" />
            Words for the Scholar
          </div>

          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-cream-100 italic leading-snug">
            &ldquo;<BlurText text={quote} />&rdquo;
          </blockquote>

          <div className="w-12 h-[1px] bg-candle-gold-400/40 my-6" />

          <p className="font-sans text-xs uppercase tracking-widest text-candle-gold-400/90 font-semibold">
            — {quoteAuthor}
          </p>
        </div>

        {/* Bottom Security Assurance */}
        <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-dusty-pink-300/80">
          <ShieldCheck className="w-4 h-4 text-candle-gold-400" />
          <span>100% Legal Public Domain & Original IP Sanctuary</span>
        </div>
      </div>

      {/* Right Panel: Clean Editorial Auth Form Surface */}
      <div className="flex-1 bg-cream-50 dark:bg-espresso-900 p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center relative overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center sm:text-left">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
              {title}
            </h1>
            <p className="mt-2 text-sm text-warm-oak-700 dark:text-cream-300/80 font-reading">
              {subtitle}
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8 rounded-3xl bg-cream-100/70 dark:bg-espresso-950/70 border border-warm-oak-300/40 dark:border-candle-gold-500/20 shadow-xl backdrop-blur-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSplitLayout;
