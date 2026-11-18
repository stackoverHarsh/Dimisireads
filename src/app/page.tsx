'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { FairyLightGarland } from '@/components/motion/FairyLightGarland';
import { BlurText } from '@/components/react-bits/BlurText';
import { SplitText } from '@/components/react-bits/SplitText';
import { ShinyText } from '@/components/react-bits/ShinyText';
import { TiltedBookCard } from '@/components/react-bits/TiltedBookCard';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { MagneticButton } from '@/components/react-bits/MagneticButton';
import { CountUpStat } from '@/components/react-bits/CountUpStat';
import { BOOKS_SEED } from '@/lib/dev-seed/books';
import { CATEGORIES_SEED } from '@/lib/dev-seed/categories';
import { COLLECTIONS_SEED } from '@/lib/dev-seed/collections';
import {
  Search,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Feather,
  Compass,
  ArrowRight,
  Flame,
  Award,
  DownloadCloud,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholderPrompts = [
    'Search by title, author, or ISBN... (e.g. Austen, Shelley, Sun Tzu)',
    'Search by vibe... (e.g. "Rainy Day in Oxford", "Candlelit Altar")',
    'Explore verified free e-books... (e.g. Frankenstein, Meditations)',
    'Browse architectural engineering guides... (e.g. Autonomous Engineer)',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderPrompts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholderPrompts.length]);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/explore?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  const featuredBooks = BOOKS_SEED.filter((b) => b.isFeatured);
  const freeBooks = BOOKS_SEED.filter((b) => b.isFree && b.hasDigitalEdition);

  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      {/* Background Sunlit Ambient Dust Particles */}
      <AmbientDustMotes particleCount={42} />

      {/* Global Navigation */}
      <Navbar />

      {/* ========================================================
          1. HERO SECTION & COZY WOODEN BOOKSHELF CENTERPIECE
      ======================================================== */}
      <section className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto pt-6 pb-10">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/30 mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-candle-gold-500" />
            <ShinyText text="The Enchanted Editorial Digital Library" speed={4} />
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50 leading-[1.08] mb-6">
            <SplitText text="Your Reading, Beautifully Shelved." />
          </h1>

          {/* Subtitle */}
          <p className="font-reading text-base sm:text-xl text-warm-oak-800 dark:text-cream-200/90 leading-relaxed max-w-2xl mx-auto mb-8">
            <BlurText text="Step into an authentic digital library where fairy-lit shelves, vintage book spines, and candlelit serenity meet 100% verified legal provenance." />
          </p>

          {/* Interactive Search Bar with Animated Rotating Placeholder */}
          <form
            onSubmit={handleHeroSearch}
            className="relative max-w-2xl mx-auto mb-10 group"
          >
            <div className="relative flex items-center rounded-2xl bg-cream-50/90 dark:bg-espresso-900/90 border border-warm-oak-400/40 dark:border-candle-gold-500/30 shadow-lg p-2 backdrop-blur-md transition-all duration-300 group-hover:border-candle-gold-500 group-hover:shadow-candle-glow">
              <Search className="w-5 h-5 text-warm-oak-500 dark:text-candle-gold-400 ml-3 shrink-0" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder={placeholderPrompts[placeholderIndex]}
                className="w-full bg-transparent px-3 py-2.5 font-sans text-sm sm:text-base text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400/80 dark:placeholder:text-cream-400/40 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-cream-50 text-xs sm:text-sm font-semibold tracking-wide shadow-burgundy-glow transition-all active:scale-95 cursor-pointer shrink-0"
              >
                Search Sanctuary
              </button>
            </div>
          </form>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-warm-oak-700 dark:text-dusty-pink-200/90 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-candle-gold-500" />
              100% Legal Public Domain & Original IP
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-candle-gold-500" />
              Candlelight Web Reader
            </span>
            <span className="flex items-center gap-1.5">
              <DownloadCloud className="w-4 h-4 text-candle-gold-500" />
              Zero-Ad, DRM-Free Reading
            </span>
          </div>
        </div>

        {/* Centerpiece: The Fairy-Lit Wooden Shelf Showcase */}
        <div className="relative pt-8 pb-12 px-6 rounded-3xl wood-shelf shadow-2xl mt-4">
          <FairyLightGarland bulbsCount={16} glowIntensity="radiant" className="-top-4 absolute left-0 right-0 z-20" />

          <div className="text-center mb-6">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-espresso-950/60 text-candle-gold-400 border border-candle-gold-500/20">
              Curator’s Hearth • Featured Masterworks
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
            {featuredBooks.slice(0, 3).map((book) => (
              <Link key={book.id} href={`/books/${book.slug}`}>
                <TiltedBookCard
                  title={book.title}
                  author={book.author}
                  coverImageUrl={book.coverImageUrl}
                  category={book.category}
                  vibe={book.vibe}
                  isAvailable={book.hasDigitalEdition}
                />
              </Link>
            ))}
          </div>

          {/* Heavy Base Shelf Edge */}
          <div className="w-full h-4 bg-gradient-to-r from-warm-oak-950 via-warm-oak-900 to-warm-oak-950 rounded-b-xl border-t border-warm-oak-800/80 mt-6 flex items-center justify-between px-6">
            <span className="text-[10px] font-mono text-candle-gold-400/60 uppercase tracking-widest">
              Oak Shelf Tier I • Dimisi Reserve
            </span>
            <Link
              href="/explore"
              className="text-[11px] font-sans font-semibold text-candle-gold-400 hover:text-candle-gold-200 transition-colors flex items-center gap-1"
            >
              Browse All Shelves <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. BROWSE BY VIBE & POPULAR CATEGORIES
      ======================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-candle-gold-600 dark:text-candle-gold-400">
              <Compass className="w-4 h-4" />
              Sensory Exploration
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
              Browse by Vibe & Discipline
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs font-semibold text-burgundy-800 dark:text-candle-gold-400 hover:underline flex items-center gap-1"
          >
            All 6 Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_SEED.map((cat) => (
            <Link key={cat.id} href={`/categories/${cat.slug}`}>
              <SpotlightCard className="h-full flex flex-col justify-between group cursor-pointer hover:border-candle-gold-500/40">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-burgundy-900/10 dark:bg-espresso-800 text-burgundy-800 dark:text-candle-gold-300 border border-burgundy-800/20 dark:border-candle-gold-500/20">
                      {cat.bookCount} Volumes
                    </span>
                    <Sparkles className="w-4 h-4 text-candle-gold-500 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50 group-hover:text-candle-gold-500 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="mt-1 text-xs font-serif italic text-candle-gold-600 dark:text-candle-gold-400/90">
                    &ldquo;{cat.vibe}&rdquo;
                  </p>

                  <p className="mt-3 text-xs text-warm-oak-700 dark:text-cream-300/80 font-reading leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-warm-oak-200/50 dark:border-espresso-800 flex items-center justify-between text-xs font-semibold text-burgundy-800 dark:text-candle-gold-300">
                  <span>Open Shelf</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================
          3. FEATURED & TRENDING MASTERWORKS
      ======================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-candle-gold-600 dark:text-candle-gold-400">
              <Award className="w-4 h-4" />
              Archival Highlights
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
              Trending in the Sanctum
            </h2>
          </div>
          <Link
            href="/explore"
            className="text-xs font-semibold text-burgundy-800 dark:text-candle-gold-400 hover:underline flex items-center gap-1"
          >
            View Full Catalogue <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BOOKS_SEED.slice(0, 4).map((book) => (
            <Link key={book.id} href={`/books/${book.slug}`} className="flex justify-center">
              <TiltedBookCard
                title={book.title}
                author={book.author}
                coverImageUrl={book.coverImageUrl}
                category={book.category}
                vibe={book.vibe}
                isAvailable={book.hasDigitalEdition}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================
          4. CURATED COLLECTIONS (EDITORIAL HIGHLIGHTS)
      ======================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-candle-gold-600 dark:text-candle-gold-400 bg-candle-gold-500/10 mb-3 border border-candle-gold-500/20">
            <Feather className="w-3.5 h-3.5" />
            Curated Anthologies
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            Hand-Crafted Reading Journeys
          </h2>
          <p className="mt-2 text-sm text-warm-oak-700 dark:text-cream-300 font-reading">
            Thematic suites compiled by DIMISI archivists, pairing timeless literature with cognitive mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTIONS_SEED.map((col) => (
            <Link key={col.id} href={`/collections/${col.slug}`}>
              <SpotlightCard className="h-full flex flex-col justify-between group overflow-hidden border-dusty-pink-300/40 dark:border-candle-gold-500/20">
                <div>
                  <div
                    className="w-full h-44 rounded-lg bg-cover bg-center mb-5 relative overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform duration-500"
                    style={{ backgroundImage: `url(${col.bannerImageUrl})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-candle-gold-300">
                      <span>{col.bookSlugs.length} Books</span>
                      <span className="italic">{col.vibe}</span>
                    </div>
                  </div>

                  <p className="text-[10px] uppercase tracking-wider text-warm-oak-500 dark:text-dusty-pink-300 font-sans">
                    Curated by {col.curatorName}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-burgundy-950 dark:text-cream-50 group-hover:text-candle-gold-400 transition-colors mt-1">
                    {col.title}
                  </h3>
                  <p className="mt-2 text-xs text-warm-oak-700 dark:text-cream-300/80 font-reading leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-warm-oak-200/50 dark:border-espresso-800 flex items-center justify-between text-xs font-semibold text-burgundy-800 dark:text-candle-gold-300">
                  <span>Enter Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. FREE LEGAL E-BOOKS SPOTLIGHT (100% COMPLIANT)
      ======================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-candle-gold-500/30 bg-gradient-to-br from-cream-100 via-cream-50 to-dusty-pink-100/30 dark:from-espresso-950 dark:via-espresso-900 dark:to-burgundy-950/60 shadow-xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-candle-gold-500/15 text-candle-gold-700 dark:text-candle-gold-300 border border-candle-gold-500/30 mb-4">
              <ShieldCheck className="w-4 h-4 text-candle-gold-500" />
              100% Legally Verified Free E-Books
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50 mb-4">
              Restoring the World’s Greatest Literature to the Public
            </h2>

            <p className="font-reading text-sm sm:text-base text-warm-oak-800 dark:text-cream-200 leading-relaxed mb-6">
              DimisiReads maintains an auditable legal inventory of historical masterworks in the Public Domain and proprietary DIMISI originals. Zero piracy, zero paywalls on public domain heritage. Download DRM-free EPUBs or read instantly in your browser.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/free-ebooks">
                <MagneticButton variant="burgundy">
                  <BookOpen className="w-4 h-4 text-candle-gold-300" />
                  Browse All {freeBooks.length}+ Free E-Books
                </MagneticButton>
              </Link>
              <Link href="/copyright-policy">
                <span className="text-xs font-semibold text-warm-oak-700 dark:text-dusty-pink-300 hover:underline">
                  Read Our Legal Clearance Policy →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. WHY DIMISIREADS & COMMUNITY METRICS
      ======================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            A Sanctuary Built for True Book Devotees
          </h2>
          <p className="mt-2 text-sm text-warm-oak-700 dark:text-cream-300 font-reading">
            Designed by DIMISI Technologies to elevate digital reading from an abrasive screen chore to an enchanted evening ritual.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <SpotlightCard className="p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-burgundy-700/10 dark:bg-burgundy-900/40 text-burgundy-700 dark:text-candle-gold-400 mx-auto flex items-center justify-center mb-4 border border-burgundy-700/20">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold mb-2">The Lantern Reader</h3>
            <p className="text-xs text-warm-oak-700 dark:text-cream-300/80 font-reading leading-relaxed">
              Experience Candlelight Mode with warm sepia glow, custom serif typesetting, and synced highlights that treat your eyes like paper.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-candle-gold-500/10 text-candle-gold-600 dark:text-candle-gold-400 mx-auto flex items-center justify-center mb-4 border border-candle-gold-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold mb-2">Uncompromising Legality</h3>
            <p className="text-xs text-warm-oak-700 dark:text-cream-300/80 font-reading leading-relaxed">
              Every downloadable title is verified under 4 clear legal categories. No shadow library distribution, no deceptive paywall traps.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-dusty-pink-300/15 text-burgundy-700 dark:text-dusty-pink-300 mx-auto flex items-center justify-center mb-4 border border-dusty-pink-300/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold mb-2">Sensory Vibe Matching</h3>
            <p className="text-xs text-warm-oak-700 dark:text-cream-300/80 font-reading leading-relaxed">
              Find books by atmospheric mood—from Rainy Oxford afternoons to Gilded Altars—guided by our scholarly AI Librarian.
            </p>
          </SpotlightCard>
        </div>

        {/* CountUp Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SpotlightCard className="text-center py-6">
            <CountUpStat value={1840} suffix="+" label="Verified Volumes" />
          </SpotlightCard>
          <SpotlightCard className="text-center py-6">
            <CountUpStat value={48200} label="Reading Hours" />
          </SpotlightCard>
          <SpotlightCard className="text-center py-6">
            <CountUpStat value={100} suffix="%" label="Legal Compliance" />
          </SpotlightCard>
          <SpotlightCard className="text-center py-6">
            <CountUpStat value={42} label="Day Top Streak" />
          </SpotlightCard>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
