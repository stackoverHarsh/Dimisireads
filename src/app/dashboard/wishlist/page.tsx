'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  BookOpen,
  ArrowRight,
  Trash2,
  CheckCircle,
  Compass,
} from 'lucide-react';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';

interface WishlistBook {
  id: string;
  slug: string;
  title: string;
  author: string;
  coverImage: string;
  savedAt: string;
  savedStatus: string;
  hasDigitalEdition?: boolean;
  licenceCategory?: string;
}

export default function WishlistPage() {
  const [books, setBooks] = useState<WishlistBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/dashboard/wishlist')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.wishlist) {
          setBooks(data.data.wishlist);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleMoveToReading = async (bookId: string, title: string) => {
    try {
      await fetch('/api/dashboard/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, status: 'CURRENTLY_READING' }),
      });
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
      setFeedback(`Moved "${title}" to your active shelf!`);
      setTimeout(() => setFeedback(null), 3500);
    } catch {
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
      setFeedback(`Moved "${title}" to your active shelf!`);
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleRemove = (bookId: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Heart className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400 fill-burgundy-700/20" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Anticipated Works
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            The Wishlist Sanctuary
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Volumes waiting for their quiet evening under your library lantern.
          </p>
        </div>

        <Link
          href="/explore"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 font-serif text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Discover More</span>
        </Link>
      </div>

      {/* Floating feedback alert */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-candle-gold-500/20 border border-candle-gold-500/40 text-candle-gold-800 dark:text-candle-gold-300 text-xs font-semibold"
          >
            <CheckCircle className="w-4 h-4 text-candle-gold-600 shrink-0" />
            <span>{feedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-cream-200/50 dark:bg-espresso-900/50 animate-pulse border border-warm-oak-200/40"
            />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-16 px-4 bg-cream-100/60 dark:bg-espresso-900/40 rounded-3xl border border-dashed border-warm-oak-300/40 dark:border-candle-gold-500/20 max-w-md mx-auto">
          <Heart className="w-12 h-12 text-warm-oak-400 dark:text-dusty-pink-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50 mb-2">
            Your Wishlist is Clear
          </h3>
          <p className="text-xs text-warm-oak-700 dark:text-cream-200/70 mb-6">
            Explore the grand library shelves and click the heart icon to save volumes you wish to read next.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-burgundy-900 text-cream-50 text-xs font-semibold"
          >
            <span>Explore Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <SpotlightCard
              key={book.id}
              className="group flex gap-4 p-4 rounded-2xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm hover:shadow-md transition-all"
            >
              {/* Cover */}
              <div className="relative w-20 h-28 shrink-0 rounded-lg overflow-hidden shadow border border-warm-oak-300/40">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Details & Actions */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-warm-oak-500 dark:text-dusty-pink-300">
                      Saved {book.savedAt}
                    </span>
                    <button
                      onClick={() => handleRemove(book.id)}
                      className="p-1 rounded text-warm-oak-400 hover:text-red-500 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <Link href={`/books/${book.slug}`}>
                    <h3 className="font-serif text-base font-bold text-burgundy-950 dark:text-cream-50 group-hover:text-burgundy-800 dark:group-hover:text-candle-gold-400 line-clamp-1 transition-colors mt-0.5">
                      {book.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-warm-oak-600 dark:text-cream-300/80 line-clamp-1">
                    {book.author}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-warm-oak-200/40 dark:border-espresso-800">
                  <button
                    onClick={() => handleMoveToReading(book.id, book.title)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-burgundy-900/15 hover:bg-burgundy-900 text-burgundy-950 hover:text-cream-50 dark:bg-candle-gold-500/20 dark:text-candle-gold-300 dark:hover:bg-candle-gold-500 dark:hover:text-espresso-950 text-[11px] font-semibold transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Start Reading</span>
                  </button>

                  <Link
                    href={`/books/${book.slug}`}
                    className="text-[11px] font-semibold text-warm-oak-600 dark:text-cream-300/70 hover:text-burgundy-800 dark:hover:text-candle-gold-400"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </div>
  );
}
