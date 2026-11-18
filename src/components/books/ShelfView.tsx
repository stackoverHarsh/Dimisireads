'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FairyLightGarland } from '@/components/motion/FairyLightGarland';
import { TiltedBookCard } from '@/components/react-bits/TiltedBookCard';
import { BookSeed } from '@/lib/dev-seed/books';
import { BookOpen, Sparkles, Eye, Columns } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShelfViewProps {
  books: BookSeed[];
  className?: string;
  shelfTitle?: string;
  allowSpineToggle?: boolean;
}

export const ShelfView: React.FC<ShelfViewProps> = ({
  books,
  className = '',
  shelfTitle = 'The Grand Archival Shelves',
  allowSpineToggle = true,
}) => {
  const [displayMode, setDisplayMode] = useState<'covers' | 'spines'>('covers');

  // Group books into shelves of up to 4 books per shelf
  const chunkSize = displayMode === 'covers' ? 3 : 8;
  const shelves: BookSeed[][] = [];
  for (let i = 0; i < books.length; i += chunkSize) {
    shelves.push(books.slice(i, i + chunkSize));
  }

  // Spine colors palette based on brand
  const spineGradients = [
    'from-burgundy-900 via-burgundy-950 to-espresso-950 border-burgundy-700/50',
    'from-warm-oak-900 via-warm-oak-950 to-espresso-950 border-warm-oak-700/50',
    'from-[#231B1E] via-[#1A1316] to-espresso-950 border-candle-gold-500/30',
    'from-burgundy-800 via-burgundy-900 to-espresso-950 border-dusty-pink-400/40',
    'from-warm-oak-800 via-warm-oak-900 to-espresso-950 border-candle-gold-400/30',
  ];

  return (
    <div className={cn('relative w-full space-y-16 py-6', className)}>
      {/* Shelf Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6">
        <div>
          <h3 className="font-serif text-2xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-candle-gold-500" />
            {shelfTitle}
          </h3>
          <p className="text-xs text-warm-oak-600 dark:text-dusty-pink-200 mt-0.5 font-sans">
            Fairy-lit oak shelves showcasing verified volumes & masterworks
          </p>
        </div>

        {allowSpineToggle && (
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
              Cover View
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
              Spine-to-Spine View
            </button>
          </div>
        )}
      </div>

      {/* Shelves List */}
      <div className="space-y-20">
        {shelves.map((shelfBooks, shelfIndex) => (
          <div
            key={`shelf-${shelfIndex}`}
            className="relative px-4 sm:px-8 pt-8 pb-3 rounded-2xl wood-shelf shadow-shelf"
          >
            {/* Fairy Light Garland Draped Along the Shelf Top */}
            <FairyLightGarland
              bulbsCount={displayMode === 'covers' ? 14 : 20}
              glowIntensity="radiant"
              className="-top-3.5 absolute left-0 right-0 z-20"
            />

            {/* Books Container */}
            {displayMode === 'covers' ? (
              /* Upright 3D Covers Mode */
              <div className="relative z-10 flex flex-wrap items-end justify-around gap-8 sm:gap-10 pt-4 pb-2">
                {shelfBooks.map((book) => (
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
            ) : (
              /* Realistic Spine-to-Spine Library View */
              <div className="relative z-10 flex items-end justify-center gap-2 sm:gap-3.5 pt-6 pb-2 overflow-x-auto px-2">
                {shelfBooks.map((book, idx) => {
                  const gradient = spineGradients[idx % spineGradients.length];
                  // Varying height for authentic old library shelf feel
                  const heights = ['h-64 sm:h-72', 'h-68 sm:h-76', 'h-60 sm:h-68', 'h-72 sm:h-80'];
                  const heightClass = heights[idx % heights.length];

                  return (
                    <motion.div
                      key={book.id}
                      whileHover={{ y: -18, scale: 1.04 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="shrink-0 cursor-pointer"
                    >
                      <Link href={`/books/${book.slug}`} className="group block">
                        <div
                          className={cn(
                            'relative w-12 sm:w-16 rounded-t-sm bg-gradient-to-r p-2 shadow-book-spine border-t border-x flex flex-col justify-between items-center transition-all duration-300 group-hover:shadow-candle-glow-lg',
                            heightClass,
                            gradient
                          )}
                        >
                          {/* Gold Foil Top Spine Band */}
                          <div className="w-full h-1 bg-candle-gold-400/50 rounded-xs mb-1" />

                          {/* Rotated Vertical Title */}
                          <div className="my-auto h-[70%] flex items-center justify-center">
                            <span
                              style={{ writingMode: 'vertical-rl' }}
                              className="rotate-180 font-serif text-[11px] sm:text-xs font-bold text-cream-100 group-hover:text-candle-gold-300 tracking-wider truncate max-h-48 drop-shadow-sm transition-colors"
                            >
                              {book.title}
                            </span>
                          </div>

                          {/* Bottom Author & Gold Foil Accent */}
                          <div className="w-full text-center">
                            <div className="w-full h-[1px] bg-candle-gold-400/30 mb-1" />
                            <span className="block text-[8px] font-sans text-dusty-pink-300/80 truncate">
                              {book.author.split(' ').pop()}
                            </span>
                            <div className="w-full h-1.5 bg-candle-gold-500/40 rounded-xs mt-1" />
                          </div>

                          {/* Digital Badge Indicator Pin */}
                          {book.hasDigitalEdition && (
                            <div
                              title="Verified Legal Digital Edition"
                              className="absolute -top-1.5 right-1 w-2.5 h-2.5 rounded-full bg-candle-gold-400 shadow-candle-glow border border-espresso-900"
                            />
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Heavy Oak Base Shelf Trim */}
            <div className="w-full h-4 bg-gradient-to-r from-warm-oak-950 via-warm-oak-900 to-warm-oak-950 rounded-b-lg border-t border-warm-oak-800/80 shadow-md mt-2 flex items-center justify-between px-6">
              <span className="text-[9px] font-mono text-candle-gold-400/60 uppercase tracking-widest">
                Tier {shelfIndex + 1} • Archival Reserve
              </span>
              <span className="flex items-center gap-1 text-[9px] font-mono text-dusty-pink-300/70">
                <BookOpen className="w-2.5 h-2.5" />
                Dimisi Vault
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShelfView;
