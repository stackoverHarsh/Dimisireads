'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  History,
  Clock,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';

interface HistoryItem {
  id: string;
  book: {
    id: string;
    slug: string;
    title: string;
    author: string;
    coverImage: string;
  };
  progressPercentage: number;
  lastReadAt: string;
  secondsSpentReading: number;
  currentChapter: string;
}

export default function ReadingHistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/history')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.history) {
          setHistory(data.data.history);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatHoursMinutes = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <History className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Scholarly Chronicles
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Reading History
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            A chronological ledger of every chapter explored, milestone attained, and hour spent in contemplative study.
          </p>
        </div>

        <Link
          href="/dashboard/library"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 font-serif text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>My Cozy Shelf</span>
        </Link>
      </div>

      {/* History Timeline */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-cream-200/50 dark:bg-espresso-900/50 animate-pulse border border-warm-oak-200/40"
            />
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-16 px-4 bg-cream-100/60 dark:bg-espresso-900/40 rounded-3xl border border-dashed border-warm-oak-300/40 dark:border-candle-gold-500/20 max-w-md mx-auto">
          <History className="w-12 h-12 text-warm-oak-400 dark:text-dusty-pink-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50 mb-2">
            No Reading Activity Yet
          </h3>
          <p className="text-xs text-warm-oak-700 dark:text-cream-200/70 mb-6">
            Open any book in the reader to start tracking your reading journey and statistics.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-burgundy-900 text-cream-50 text-xs font-semibold"
          >
            <span>Explore Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <SpotlightCard
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-20 shrink-0 rounded-lg overflow-hidden shadow-sm border border-warm-oak-300/40">
                  <Image
                    src={item.book.coverImage}
                    alt={item.book.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-burgundy-900/10 dark:bg-candle-gold-500/15 text-burgundy-900 dark:text-candle-gold-300">
                      {item.lastReadAt}
                    </span>
                    {item.progressPercentage >= 100 && (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-green-500/15 text-green-700 dark:text-green-300">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                  </div>

                  <Link href={`/books/${item.book.slug}`}>
                    <h3 className="font-serif text-lg font-bold text-burgundy-950 dark:text-cream-50 hover:text-burgundy-800 dark:hover:text-candle-gold-400 transition-colors">
                      {item.book.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-warm-oak-600 dark:text-cream-300/70">
                    by {item.book.author}
                  </p>
                  <p className="text-[11px] font-mono text-warm-oak-500 dark:text-dusty-pink-300/70 mt-1">
                    {item.currentChapter}
                  </p>
                </div>
              </div>

              {/* Stats & Action */}
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-warm-oak-200/40 dark:border-espresso-800">
                <div className="text-left sm:text-right">
                  <div className="flex items-center sm:justify-end gap-1 text-xs text-warm-oak-600 dark:text-cream-300/80">
                    <Clock className="w-3.5 h-3.5 text-candle-gold-500" />
                    <span>{formatHoursMinutes(item.secondsSpentReading)} read</span>
                  </div>
                  <div className="mt-1 flex items-center sm:justify-end gap-2">
                    <div className="w-24 h-1.5 rounded-full bg-cream-200 dark:bg-espresso-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-burgundy-700 dark:bg-candle-gold-400"
                        style={{ width: `${item.progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-burgundy-950 dark:text-cream-100">
                      {item.progressPercentage}%
                    </span>
                  </div>
                </div>

                <Link
                  href="/dashboard/reading"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-burgundy-900/15 hover:bg-burgundy-900 text-burgundy-950 hover:text-cream-50 dark:bg-candle-gold-500/20 dark:text-candle-gold-300 dark:hover:bg-candle-gold-500 dark:hover:text-espresso-950 text-xs font-semibold transition-all shrink-0 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </div>
  );
}
