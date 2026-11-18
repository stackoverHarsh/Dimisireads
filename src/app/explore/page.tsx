'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { TiltedBookCard } from '@/components/react-bits/TiltedBookCard';
import { ShelfView } from '@/components/books/ShelfView';
import { BOOKS_SEED } from '@/lib/dev-seed/books';
import { CATEGORIES_SEED } from '@/lib/dev-seed/categories';
import {
  Search,
  Grid,
  List,
  Columns,
  Sparkles,
  ShieldCheck,
  Star,
  X,
  ArrowUpDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'shelf'>('shelf');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [onlyDigitalEditions, setOnlyDigitalEditions] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');

  // Filter and sort logic
  const filteredBooks = useMemo(() => {
    return BOOKS_SEED.filter((book) => {
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.vibe.toLowerCase().includes(q) ||
        book.isbn13.includes(q);

      // Category match
      const matchesCategory =
        selectedCategory === 'ALL' || book.categorySlug === selectedCategory;

      // Digital edition match
      const matchesDigital = !onlyDigitalEditions || book.hasDigitalEdition;

      return matchesSearch && matchesCategory && matchesDigital;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.averageRating - a.averageRating;
      if (sortBy === 'year') return b.publishedYear - a.publishedYear;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [searchQuery, selectedCategory, onlyDigitalEditions, sortBy]);

  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left border-b border-warm-oak-200/50 dark:border-espresso-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-candle-gold-500" />
            The Living Catalogue
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            Explore the Sanctum
          </h1>
          <p className="mt-2 text-sm sm:text-base font-reading text-warm-oak-700 dark:text-cream-300 max-w-2xl">
            Browse through classical literature, philosophy, and proprietary DIMISI engineering tomes. Switch to <strong>Shelf View</strong> to experience our fairy-lit wooden bookshelves.
          </p>
        </div>

        {/* Controls Bar: Search, View Switcher, Sort */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-warm-oak-500 dark:text-candle-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, author, vibe, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-xs sm:text-sm text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-oak-400 hover:text-espresso-900"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-cream-200/60 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-xs font-semibold">
              <button
                onClick={() => setViewMode('shelf')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer',
                  viewMode === 'shelf'
                    ? 'bg-burgundy-700 text-cream-50 shadow-sm'
                    : 'text-warm-oak-800 dark:text-cream-300 hover:text-burgundy-900'
                )}
                title="Cozy Wooden Bookshelf View"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Shelf View</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer',
                  viewMode === 'grid'
                    ? 'bg-burgundy-700 text-cream-50 shadow-sm'
                    : 'text-warm-oak-800 dark:text-cream-300 hover:text-burgundy-900'
                )}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer',
                  viewMode === 'list'
                    ? 'bg-burgundy-700 text-cream-50 shadow-sm'
                    : 'text-warm-oak-800 dark:text-cream-300 hover:text-burgundy-900'
                )}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>

            {/* Sort Selector */}
            <div className="relative flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'year' | 'title')}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-xs font-semibold text-espresso-950 dark:text-cream-50 focus:outline-none focus:border-candle-gold-500 shadow-sm cursor-pointer"
              >
                <option value="rating">Highest Rated</option>
                <option value="year">Publication Year</option>
                <option value="title">Title (A–Z)</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-warm-oak-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Category Pills & Legal Filter Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 pb-6 border-b border-warm-oak-200/40 dark:border-espresso-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer',
                selectedCategory === 'ALL'
                  ? 'bg-burgundy-700 text-cream-50 shadow-burgundy-glow'
                  : 'bg-cream-100 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-warm-oak-800 dark:text-cream-300 hover:border-candle-gold-500'
              )}
            >
              All Genres ({BOOKS_SEED.length})
            </button>
            {CATEGORIES_SEED.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer',
                  selectedCategory === cat.slug
                    ? 'bg-burgundy-700 text-cream-50 shadow-burgundy-glow'
                    : 'bg-cream-100 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-warm-oak-800 dark:text-cream-300 hover:border-candle-gold-500'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Legal Authorized Edition Toggle */}
          <label className="flex items-center gap-2 text-xs font-semibold text-warm-oak-800 dark:text-candle-gold-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyDigitalEditions}
              onChange={(e) => setOnlyDigitalEditions(e.target.checked)}
              className="w-4 h-4 rounded text-burgundy-700 focus:ring-burgundy-500"
            />
            <ShieldCheck className="w-3.5 h-3.5 text-candle-gold-500" />
            Verified Free E-Books Only
          </label>
        </div>

        {/* Results Count Banner */}
        <div className="mb-6 flex items-center justify-between text-xs text-warm-oak-600 dark:text-dusty-pink-300/80 font-mono">
          <span>Showing {filteredBooks.length} volumes in the catalogue</span>
          {onlyDigitalEditions && (
            <span className="text-candle-gold-600 dark:text-candle-gold-400 font-semibold">
              Filter: Digital Editions Only
            </span>
          )}
        </div>

        {/* ========================================================
            VIEW MODE RENDERING (Shelf vs Grid vs List)
        ======================================================== */}
        {filteredBooks.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-100">
              No volumes matched your filters
            </p>
            <p className="text-sm mt-2 text-warm-oak-600 dark:text-cream-300 font-reading">
              Try adjusting your query or resetting genre filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setOnlyDigitalEditions(false);
              }}
              className="mt-6 px-4 py-2 rounded-xl bg-burgundy-700 text-cream-50 text-xs font-semibold shadow-burgundy-glow cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'shelf' ? (
          /* Shelf View (Warm Oak Shelves + Fairy Lights + Spine/Cover toggle) */
          <ShelfView books={filteredBooks} shelfTitle="The Grand Archival Shelves" />
        ) : viewMode === 'grid' ? (
          /* Editorial Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
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
        ) : (
          /* Detailed List View */
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.slug}`}
                className="block p-5 rounded-2xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 hover:border-candle-gold-500 transition-all shadow-sm hover:shadow-candle-glow group"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-16 rounded bg-gradient-to-br from-burgundy-900 to-espresso-950 flex items-center justify-center text-candle-gold-300 font-serif font-bold text-sm shrink-0 border border-candle-gold-500/20">
                      {book.title.slice(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded-full bg-espresso-100 dark:bg-espresso-800 text-warm-oak-700 dark:text-cream-300">
                          {book.category}
                        </span>
                        <span className="text-[10px] font-mono text-candle-gold-600 dark:text-candle-gold-400 italic">
                          &ldquo;{book.vibe}&rdquo;
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-burgundy-950 dark:text-cream-50 group-hover:text-candle-gold-500 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-warm-oak-700 dark:text-dusty-pink-200 font-sans mt-0.5">
                        by <span className="font-semibold">{book.author}</span> • {book.publishedYear} • {book.pageCount} pages
                      </p>
                      <p className="mt-2 text-xs text-warm-oak-800 dark:text-cream-300/80 font-reading line-clamp-2 max-w-2xl">
                        {book.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0">
                    <div className="flex items-center gap-1 text-xs font-semibold text-candle-gold-600 dark:text-candle-gold-400">
                      <Star className="w-3.5 h-3.5 fill-candle-gold-400 text-candle-gold-400" />
                      <span>{book.averageRating.toFixed(2)}</span>
                      <span className="text-[10px] text-warm-oak-400">({book.ratingsCount})</span>
                    </div>

                    <span
                      className={cn(
                        'px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider',
                        book.hasDigitalEdition
                          ? 'bg-candle-gold-500/20 text-candle-gold-700 dark:text-candle-gold-300 border border-candle-gold-500/40'
                          : 'bg-warm-oak-100 dark:bg-espresso-800 text-warm-oak-600 dark:text-cream-300'
                      )}
                    >
                      {book.hasDigitalEdition ? 'Read & Download' : 'Catalogue Reference'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
