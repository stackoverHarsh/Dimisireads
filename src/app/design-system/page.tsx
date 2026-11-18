'use client';

import React, { useState } from 'react';
import { BlurText } from '@/components/react-bits/BlurText';
import { SplitText } from '@/components/react-bits/SplitText';
import { ShinyText } from '@/components/react-bits/ShinyText';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { TiltedBookCard } from '@/components/react-bits/TiltedBookCard';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { MagneticButton } from '@/components/react-bits/MagneticButton';
import { CountUpStat } from '@/components/react-bits/CountUpStat';
import { FairyLightGarland } from '@/components/motion/FairyLightGarland';
import { PageTransitionWrapper } from '@/components/motion/PageTransitionWrapper';
import {
  BookOpen,
  Sparkles,
  Flame,
  Feather,
  ShieldCheck,
  Moon,
  Sun,
  Library,
  Compass,
} from 'lucide-react';

export default function DesignSystemPage() {
  const [theme, setTheme] = useState<'cream' | 'espresso'>('espresso');

  const toggleTheme = () => {
    const next = theme === 'cream' ? 'espresso' : 'cream';
    setTheme(next);
    if (typeof document !== 'undefined') {
      if (next === 'espresso') {
        document.documentElement.setAttribute('data-theme', 'espresso');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  };

  const colorTokens = [
    { name: 'Imperial Burgundy', hex: '#722F37', class: 'bg-burgundy-700', text: 'text-cream-50', role: 'Brand Primary & Velvet Accents' },
    { name: 'Deep Espresso Ink', hex: '#1C1417', class: 'bg-espresso-900', text: 'text-cream-50', role: 'Archival Dark Canvas & Inks' },
    { name: 'Warm Oak Mahogany', hex: '#4A2E20', class: 'bg-warm-oak-800', text: 'text-cream-50', role: 'Wooden Bookshelves & Spines' },
    { name: 'Candlelight Gold', hex: '#D9A760', class: 'bg-candle-gold-400', text: 'text-espresso-950', role: 'Fairy Lights, Streaks & Stars' },
    { name: 'Dusty Antique Rose', hex: '#D7A7B1', class: 'bg-dusty-pink-300', text: 'text-espresso-950', role: 'Atmospheric Glows & Filigree' },
    { name: 'Parchment Cream', hex: '#F8F4E7', class: 'bg-cream-100', text: 'text-espresso-950', role: 'Primary Reading Paper Surface' },
  ];

  return (
    <PageTransitionWrapper>
      <div className="relative min-h-screen text-espresso-900 dark:text-cream-50 transition-colors duration-500 pb-28">
        {/* Ambient Sunlit Library Dust Motes */}
        <AmbientDustMotes particleCount={38} />

        {/* Top Navigation & Mode Switcher */}
        <header className="sticky top-0 z-50 border-b border-warm-oak-900/20 bg-cream-100/80 dark:bg-espresso-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-burgundy-700 text-candle-gold-300 shadow-burgundy-glow">
              <Library className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-burgundy-900 dark:text-cream-50">
                DIMISI<span className="text-candle-gold-500">READS</span>
              </span>
              <p className="text-[10px] uppercase tracking-widest text-warm-oak-500 dark:text-dusty-pink-300 font-sans">
                Design System & Motion Showcase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-warm-oak-600/30 dark:border-candle-gold-500/30 bg-cream-50 dark:bg-espresso-900 text-xs font-medium cursor-pointer shadow-sm hover:border-candle-gold-500 transition-colors"
            >
              {theme === 'espresso' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-candle-gold-400" />
                  <span>Parchment Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-burgundy-700" />
                  <span>Espresso Mode</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Hero Section with Fairy Light Garland */}
        <section className="relative pt-12 pb-16 px-6 max-w-6xl mx-auto text-center">
          <FairyLightGarland bulbsCount={16} glowIntensity="radiant" className="-mt-6 mb-8" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-widest bg-burgundy-950/40 text-candle-gold-400 border border-candle-gold-500/30 mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-candle-gold-400" />
            <ShinyText text="DIMISI Technologies • Editorial Fantasy Engine" speed={3.5} />
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-burgundy-900 dark:text-cream-50">
            <SplitText text="The Enchanted Sanctuary" />
          </h1>

          <p className="max-w-2xl mx-auto font-reading text-base sm:text-lg text-warm-oak-700 dark:text-cream-200/90 leading-relaxed mb-8">
            <BlurText text="A 100% legally compliant digital library where antique mahogany archives meet modern motion engineering. Every book is verified; every reading moment is illuminated." />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton variant="burgundy">
              <BookOpen className="w-4 h-4 text-candle-gold-300" />
              Explore The Tomes
            </MagneticButton>
            <MagneticButton variant="gold">
              <Flame className="w-4 h-4" />
              Light a Candle
            </MagneticButton>
            <MagneticButton variant="outline">
              <Compass className="w-4 h-4" />
              Browse by Vibe
            </MagneticButton>
          </div>
        </section>

        {/* Section 1: Color Palette System */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 mb-2">
            <Feather className="w-4 h-4 text-candle-gold-500" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">Curated Color Tokens</h2>
          </div>
          <p className="text-sm text-warm-oak-600 dark:text-dusty-pink-200 mb-8 font-sans">
            Meticulously tuned for cozy midnight reading, deckle edges, and warm candlelight.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {colorTokens.map((token) => (
              <SpotlightCard key={token.name} className="flex flex-col justify-between">
                <div>
                  <div className={`w-full h-20 rounded-lg ${token.class} shadow-inner mb-4 flex items-end p-3`}>
                    <span className={`text-xs font-mono font-semibold ${token.text}`}>
                      {token.hex}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold">{token.name}</h3>
                  <p className="text-xs text-warm-oak-600 dark:text-dusty-pink-200/80 mt-1 font-sans">
                    {token.role}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Section 2: Interactive 3D Tactile Book Covers */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-candle-gold-500" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">
              Tactile 3D Book Cards (React Bits + Springs)
            </h2>
          </div>
          <p className="text-sm text-warm-oak-600 dark:text-dusty-pink-200 mb-8 font-sans">
            Hover cursor across books to experience smooth spring-damped perspective tilt, leather spine depth, and dynamic candlelight sheen.
          </p>

          <div className="relative pt-6 pb-12 px-6 rounded-2xl wood-shelf">
            <FairyLightGarland bulbsCount={12} className="-top-3 absolute left-0 right-0" />
            <div className="flex flex-wrap items-center justify-center gap-10 mt-6">
              <TiltedBookCard
                title="Pride and Prejudice"
                author="Jane Austen"
                category="Classic Romance"
                vibe="Lavender Tea & Wit"
                isAvailable={true}
              />
              <TiltedBookCard
                title="Frankenstein"
                author="Mary Shelley"
                category="Gothic Horror"
                vibe="Stormy Midnight"
                isAvailable={true}
              />
              <TiltedBookCard
                title="The Picture of Dorian Gray"
                author="Oscar Wilde"
                category="Decadent Gothic"
                vibe="Candlelit Altar"
                isAvailable={true}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Gamification & CountUp Stats */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-candle-gold-500" />
            <h2 className="font-serif text-2xl font-bold tracking-tight">Gamified Reading Metrics</h2>
          </div>
          <p className="text-sm text-warm-oak-600 dark:text-dusty-pink-200 mb-8 font-sans">
            Animated numbers celebrating reader streaks, verified public domain volumes, and active scholars.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SpotlightCard className="text-center py-8">
              <CountUpStat value={1840} suffix="+" label="Verified E-Books" />
            </SpotlightCard>
            <SpotlightCard className="text-center py-8">
              <CountUpStat value={42} label="Daily Candle Streak" />
            </SpotlightCard>
            <SpotlightCard className="text-center py-8">
              <CountUpStat value={98.8} decimals={1} suffix="%" label="Legal Clearance Score" />
            </SpotlightCard>
            <SpotlightCard className="text-center py-8">
              <CountUpStat value={15420} label="Reading Hours" />
            </SpotlightCard>
          </div>
        </section>

        {/* Section 4: Legal & Architecture Verification */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <SpotlightCard className="p-8 border-candle-gold-500/30 bg-burgundy-950/20 dark:bg-espresso-950/60">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-candle-gold-500/20 text-candle-gold-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-candle-gold-300">
                  Legal Compliance Mandate Verified
                </h3>
                <p className="mt-2 text-sm text-cream-200/80 font-reading leading-relaxed">
                  Every book readable or downloadable in DimisiReads is strictly verified under one of four approved legal categories: <em>Public Domain (Life+70/Pre-1929)</em>, <em>DIMISI-Owned Originals</em>, <em>Explicit Distribution Permission</em>, or <em>Open/Permissive Licence (CC0/CC-BY/Project Gutenberg)</em>. Direct storage access is protected behind cryptographic signed URLs with zero public S3 bucket exposure.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-dusty-pink-300">
                  <span className="px-2.5 py-1 rounded bg-espresso-900 border border-espresso-800">
                    Prisma Schema: 10 Modules Normalised
                  </span>
                  <span className="px-2.5 py-1 rounded bg-espresso-900 border border-espresso-800">
                    RBAC: 5 Distinct Roles Enforced
                  </span>
                  <span className="px-2.5 py-1 rounded bg-espresso-900 border border-espresso-800">
                    Motion: prefers-reduced-motion Honoured
                  </span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </section>
      </div>
    </PageTransitionWrapper>
  );
}
