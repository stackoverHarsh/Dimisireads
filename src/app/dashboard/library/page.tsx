'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FairyLightGarland } from '@/components/motion/FairyLightGarland';
import { TiltedBookCard } from '@/components/react-bits/TiltedBookCard';
import { BOOKS_SEED, BookSeed } from '@/lib/dev-seed/books';
import {
  Columns,
  Eye,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ShelfFilter = 'ALL' | 'READING' | 'TBR' | 'COMPLETED';

export default function MyCozyShelfPage() {
  const [activeTab, setActiveTab] = useState<ShelfFilter>('ALL');
  const [displayMode, setDisplayMode] = useState<'covers' | 'spines'>('covers');
  const [selectedBook, setSelectedBook] = useState<BookSeed | null>(null);

  // Decor unlocked milestones:
  // e.g. Potted Ivy (unlocked), Warm Brass Lantern (unlocked), Sleeping Cat (unlocked with streak >= 7)
  const decors = [
    { name: 'Potted English Ivy', icon: '🌿', unlocked: true, level: 'Default Decor' },
    { name: 'Warm Brass Lantern', icon: '🏮', unlocked: true, level: '5 Books Read' },
    { name: 'Sleeping Library Cat', icon: '🐱', unlocked: true, level: '7-Day Streak' },
  ];

  const filterTabs = [
    { id: 'ALL', label: 'All Shelved' },
    { id: 'READING', label: 'Currently Reading' },
    { id: 'TBR', label: 'Want to Read' },
    { id: 'COMPLETED', label: 'Finished' },
  ];

  const books = BOOKS_SEED;

  // Split books into shelves of 3
  const shelves: BookSeed[][] = [];
  for (let i = 0; i < books.length; i += 3) {
    shelves.push(books.slice(i, i + 3));
  }

  const spineGradients = [
    'from-burgundy-900 via-burgundy-950 to-espresso-950 border-burgundy-700/50',
    'from-warm-oak-900 via-warm-oak-950 to-espresso-950 border-warm-oak-700/50',
    'from-[#231B1E] via-[#1A1316] to-espresso-950 border-candle-gold-500/30',
    'from-burgundy-800 via-burgundy-900 to-espresso-950 border-dusty-pink-400/40',
  ];

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-warm-oak-200/50 dark:border-espresso-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-2">
            <Sparkles className="w-3 h-3 text-candle-gold-500" />
            Personal Library
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            My Cozy Shelf
          </h1>
          <p className="mt-1 text-xs text-warm-oak-600 dark:text-dusty-pink-200 font-reading">
            Your private oak bookshelves illuminated by warm fairy lights and literary charms.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="inline-flex items-center p-1 rounded-xl bg-cream-200/60 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setDisplayMode('covers')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer',
              displayMode === 'covers'
                ? 'bg-burgundy-700 text-cream-50 shadow-sm'
                : 'text-warm-oak-800 dark:text-cream-300 hover:text-burgundy-900'
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            Cozy Cover View
          </button>
          <button
            onClick={() => setDisplayMode('spines')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer',
              displayMode === 'spines'
                ? 'bg-burgundy-700 text-cream-50 shadow-sm'
                : 'text-warm-oak-800 dark:text-cream-300 hover:text-burgundy-900'
            )}
          >
            <Columns className="w-3.5 h-3.5" />
            Spine-to-Spine
          </button>
        </div>
      </div>

      {/* Filter Tabs with Framer Motion layoutId */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-cream-200/50 dark:bg-espresso-900/60 border border-warm-oak-300/30 dark:border-candle-gold-500/20 text-xs font-semibold">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ShelfFilter)}
                className={cn(
                  'relative px-4 py-2 rounded-xl transition-colors cursor-pointer z-10',
                  isActive
                    ? 'text-cream-50'
                    : 'text-warm-oak-700 dark:text-cream-300 hover:text-burgundy-900'
                )}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeLibraryTab"
                    className="absolute inset-0 rounded-xl bg-burgundy-700 shadow-burgundy-glow -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Shelf Decor Ornaments Unlocked */}
        <div className="flex items-center gap-2">
          {decors.map((decor) => (
            <div
              key={decor.name}
              title={`${decor.name} (${decor.level})`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cream-100 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-xs shadow-xs"
            >
              <span className="text-sm">{decor.icon}</span>
              <span className="hidden md:inline text-[11px] font-mono text-warm-oak-700 dark:text-cream-300">
                {decor.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Bookshelves Display */}
      <div className="space-y-16 pt-4">
        {shelves.map((shelf, shelfIdx) => (
          <div
            key={`shelf-${shelfIdx}`}
            className="relative px-6 pt-10 pb-4 rounded-3xl wood-shelf shadow-2xl"
          >
            {/* Fairy Light Garland Draped Along the Plank Top */}
            <FairyLightGarland
              bulbsCount={16}
              glowIntensity="radiant"
              className="-top-4 absolute left-0 right-0 z-20"
            />

            {/* Cozy Decor Placed in the Corner of Shelf 1 */}
            {shelfIdx === 0 && (
              <div className="absolute right-6 -top-5 z-20 flex items-center gap-2">
                <span className="text-2xl drop-shadow-md" title="Sleeping Cat Unlocked">
                  🐱
                </span>
                <span className="text-xl drop-shadow-md" title="Warm Brass Lantern">
                  🏮
                </span>
              </div>
            )}

            {/* Books Container */}
            {displayMode === 'covers' ? (
              <div className="flex flex-wrap items-end justify-around gap-8 sm:gap-10 pt-4 pb-2">
                {shelf.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => setSelectedBook(book)}
                    className="cursor-pointer group"
                  >
                    <TiltedBookCard
                      title={book.title}
                      author={book.author}
                      coverImageUrl={book.coverImageUrl}
                      category={book.category}
                      vibe={book.vibe}
                      isAvailable={book.hasDigitalEdition}
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Spine-to-Spine View */
              <div className="flex items-end justify-center gap-3 sm:gap-4 pt-6 pb-2 overflow-x-auto px-2">
                {shelf.map((book, idx) => {
                  const gradient = spineGradients[idx % spineGradients.length];
                  return (
                    <motion.div
                      key={book.id}
                      whileHover={{ y: -16, scale: 1.05 }}
                      onClick={() => setSelectedBook(book)}
                      className="shrink-0 cursor-pointer"
                    >
                      <div
                        className={cn(
                          'relative w-14 sm:w-16 h-72 rounded-t-sm bg-gradient-to-r p-2 shadow-book-spine border-t border-x flex flex-col justify-between items-center transition-all group-hover:shadow-candle-glow-lg',
                          gradient
                        )}
                      >
                        <div className="w-full h-1 bg-candle-gold-400/50 rounded-xs" />
                        <div className="my-auto h-[70%] flex items-center justify-center">
                          <span
                            style={{ writingMode: 'vertical-rl' }}
                            className="rotate-180 font-serif text-xs font-bold text-cream-100 tracking-wider truncate max-h-48 drop-shadow-sm"
                          >
                            {book.title}
                          </span>
                        </div>
                        <div className="w-full text-center">
                          <span className="block text-[8px] font-sans text-dusty-pink-300">
                            {book.author.split(' ').pop()}
                          </span>
                          <div className="w-full h-1.5 bg-candle-gold-500/40 rounded-xs mt-1" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Base Oak Plank Trim */}
            <div className="w-full h-4 bg-gradient-to-r from-warm-oak-950 via-warm-oak-900 to-warm-oak-950 rounded-b-xl border-t border-warm-oak-800 mt-4 flex items-center justify-between px-6 text-[10px] font-mono text-candle-gold-400/70 uppercase">
              <span>Plank Tier {shelfIdx + 1}</span>
              <span>Sanctum Reserve</span>
            </div>
          </div>
        ))}
      </div>

      {/* Book Quick Actions Slide-Out Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBook(null)}
              className="fixed inset-0 bg-espresso-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className="relative w-full max-w-lg rounded-3xl bg-cream-50 dark:bg-espresso-900 border border-candle-gold-500/40 p-6 sm:p-8 shadow-2xl z-10 text-espresso-950 dark:text-cream-50"
            >
              <button
                onClick={() => setSelectedBook(null)}
                className="absolute right-5 top-5 p-1.5 rounded-full text-warm-oak-400 hover:text-espresso-950 dark:hover:text-cream-100"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-5">
                <div className="w-20 h-28 rounded bg-gradient-to-br from-burgundy-900 to-espresso-950 flex items-center justify-center text-candle-gold-300 font-serif font-bold text-lg shrink-0 border border-candle-gold-500/30">
                  {selectedBook.title.slice(0, 1)}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-candle-gold-600 dark:text-candle-gold-400">
                    {selectedBook.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold truncate mt-0.5">
                    {selectedBook.title}
                  </h3>
                  <p className="text-xs text-warm-oak-600 dark:text-dusty-pink-200">
                    by {selectedBook.author}
                  </p>
                  <p className="text-xs text-warm-oak-700 dark:text-cream-300/80 font-reading line-clamp-2 mt-2">
                    {selectedBook.description}
                  </p>
                </div>
              </div>

              {/* Quick Actions Buttons */}
              <div className="mt-6 pt-5 border-t border-warm-oak-200/50 dark:border-espresso-800 flex flex-col gap-2.5">
                <Link
                  href={`/books/${selectedBook.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-cream-50 text-xs font-semibold shadow-burgundy-glow"
                >
                  <BookOpen className="w-4 h-4 text-candle-gold-300" />
                  Read Volume
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      alert(`Moved ${selectedBook.title} to Completed shelf!`);
                      setSelectedBook(null);
                    }}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-cream-200/80 dark:bg-espresso-800 text-xs font-semibold hover:border-candle-gold-500 border border-transparent transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-candle-gold-500" />
                    Mark Finished
                  </button>

                  <Link
                    href={`/books/${selectedBook.slug}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-xs font-semibold hover:border-candle-gold-500 transition-colors"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
