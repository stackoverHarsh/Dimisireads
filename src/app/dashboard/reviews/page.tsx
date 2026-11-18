'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  ThumbsUp,
  Trash2,
  BookOpen,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';

interface UserReview {
  id: string;
  book: {
    id: string;
    slug: string;
    title: string;
    author: string;
    coverImage: string;
  };
  rating: number;
  headline?: string | null;
  content: string;
  containsSpoiler: boolean;
  upvotesCount: number;
  createdAt: string;
}

export default function UserReviewsPage() {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.reviews) {
          setReviews(data.data.reviews);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Star className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400 fill-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Scholarly Reflections
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            My Reviews & Notes
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Literary critiques and reflections penned across your journey through world literature.
          </p>
        </div>

        <Link
          href="/dashboard/library"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 font-serif text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Review Next Book</span>
        </Link>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-cream-200/50 dark:bg-espresso-900/50 animate-pulse border border-warm-oak-200/40"
            />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 px-4 bg-cream-100/60 dark:bg-espresso-900/40 rounded-3xl border border-dashed border-warm-oak-300/40 dark:border-candle-gold-500/20 max-w-md mx-auto">
          <MessageSquare className="w-12 h-12 text-warm-oak-400 dark:text-dusty-pink-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50 mb-2">
            No Reviews Penned Yet
          </h3>
          <p className="text-xs text-warm-oak-700 dark:text-cream-200/70 mb-6">
            Finish a book or visit your library shelf to share your literary insights with the Dimisi community.
          </p>
          <Link
            href="/dashboard/library"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-burgundy-900 text-cream-50 text-xs font-semibold"
          >
            <span>Visit Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((rev) => (
            <SpotlightCard
              key={rev.id}
              className="p-6 rounded-2xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-24 shrink-0 rounded-lg overflow-hidden shadow-sm border border-warm-oak-300/40">
                    <Image
                      src={rev.book.coverImage}
                      alt={rev.book.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= rev.rating
                                ? 'text-candle-gold-500 fill-candle-gold-500'
                                : 'text-warm-oak-300 dark:text-espresso-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-warm-oak-500 dark:text-dusty-pink-300">
                        {rev.createdAt}
                      </span>
                    </div>

                    <Link href={`/books/${rev.book.slug}`}>
                      <h3 className="font-serif text-base font-bold text-burgundy-950 dark:text-cream-50 hover:text-burgundy-800 dark:hover:text-candle-gold-400 transition-colors">
                        {rev.book.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-warm-oak-600 dark:text-cream-300/70 mb-2">
                      by {rev.book.author}
                    </p>

                    {rev.headline && (
                      <h4 className="font-serif text-sm font-semibold text-burgundy-900 dark:text-candle-gold-300 italic mb-1">
                        &ldquo;{rev.headline}&rdquo;
                      </h4>
                    )}
                    <p className="text-xs text-warm-oak-800 dark:text-cream-200/90 leading-relaxed max-w-2xl">
                      {rev.content}
                    </p>
                  </div>
                </div>

                {/* Upvotes & Delete */}
                <div className="flex items-center sm:flex-col items-end gap-3 self-end sm:self-start">
                  <div className="flex items-center gap-1.5 text-xs text-warm-oak-600 dark:text-dusty-pink-300 font-mono">
                    <ThumbsUp className="w-3.5 h-3.5 text-candle-gold-500" />
                    <span>{rev.upvotesCount} upvotes</span>
                  </div>
                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1.5 rounded-lg text-warm-oak-400 hover:text-red-500 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </div>
  );
}
