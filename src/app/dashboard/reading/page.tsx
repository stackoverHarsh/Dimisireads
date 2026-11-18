'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BOOKS_SEED } from '@/lib/dev-seed/books';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { BookOpen, CheckCircle2, Sparkles } from 'lucide-react';

export default function CurrentlyReadingPage() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const readingBooks = [
    { ...BOOKS_SEED[0], progress: 68, currentChapter: 'Chapter XIV: The Ball at Netherfield', lastRead: '2 hours ago' },
    { ...BOOKS_SEED[1], progress: 42, currentChapter: 'Volume II, Chapter IV: The Creature Speaks', lastRead: 'Yesterday' },
  ];

  const handleComplete = (id: string) => {
    setCompletedIds((prev) => [...prev, id]);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-warm-oak-200/50 dark:border-espresso-800 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-2">
          <BookOpen className="w-3 h-3 text-candle-gold-500" />
          Active In-Progress
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
          Currently Reading
        </h1>
        <p className="mt-1 text-xs text-warm-oak-600 dark:text-dusty-pink-200 font-reading">
          Volumes actively opened on your desktop and mobile reading lamps.
        </p>
      </div>

      <div className="space-y-6">
        {readingBooks.map((book) => {
          const isFinished = completedIds.includes(book.id);

          return (
            <SpotlightCard key={book.id} className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-18 h-26 rounded bg-gradient-to-br from-burgundy-900 to-espresso-950 flex items-center justify-center text-candle-gold-300 font-serif font-bold text-lg shrink-0 border border-candle-gold-500/30">
                    {book.title.slice(0, 1)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-candle-gold-600 dark:text-candle-gold-400 italic">
                      &ldquo;{book.vibe}&rdquo;
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50">
                      {book.title}
                    </h3>
                    <p className="text-xs text-warm-oak-600 dark:text-dusty-pink-200">
                      by {book.author}
                    </p>
                    <p className="text-xs text-warm-oak-800 dark:text-cream-300 font-sans mt-2">
                      <strong>Current Position:</strong> {book.currentChapter}
                    </p>
                    <p className="text-[11px] text-warm-oak-500 dark:text-cream-400/80 mt-0.5">
                      Last read {book.lastRead}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-3 flex items-center gap-3 max-w-md">
                      <div className="flex-1 h-2 rounded-full bg-cream-200 dark:bg-espresso-950 overflow-hidden border border-warm-oak-200/50 dark:border-espresso-800">
                        <div
                          className="h-full bg-gradient-to-r from-burgundy-700 to-candle-gold-400 rounded-full transition-all duration-700"
                          style={{ width: `${isFinished ? 100 : book.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-bold text-candle-gold-600 dark:text-candle-gold-400">
                        {isFinished ? '100%' : `${book.progress}%`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2.5 w-full sm:w-auto">
                  <Link
                    href={`/books/${book.slug}`}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-cream-50 text-xs font-semibold shadow-burgundy-glow"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-candle-gold-300" />
                    Resume Reading
                  </Link>

                  {!isFinished ? (
                    <button
                      onClick={() => handleComplete(book.id)}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-xs font-semibold hover:border-candle-gold-500 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-candle-gold-500" />
                      Mark Completed
                    </button>
                  ) : (
                    <div className="px-3 py-1.5 rounded-xl bg-candle-gold-500/20 text-candle-gold-700 dark:text-candle-gold-300 text-xs font-semibold font-mono flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Celebrated in Archives!
                    </div>
                  )}
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
