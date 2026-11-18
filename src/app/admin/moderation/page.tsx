'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Star,
  CheckCircle,
  EyeOff,
  Trash2,
} from 'lucide-react';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';

interface ModerationItem {
  id: string;
  reviewId: string;
  bookTitle: string;
  authorName: string;
  reviewerName: string;
  rating: number;
  content: string;
  reportReason: string;
  reportedBy: string;
  reportedAt: string;
  status: string;
}

export default function AdminModerationPage() {
  const [queue, setQueue] = useState<ModerationItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/moderation')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.queue) {
          setQueue(data.data.queue);
        }
      })
      .catch(() => {});
  }, []);

  const handleAction = async (
    item: ModerationItem,
    action: 'APPROVE' | 'HIDE' | 'DELETE'
  ) => {
    const confirmPrompt =
      action === 'DELETE'
        ? `Permanently purge review from ${item.reviewerName}?`
        : action === 'HIDE'
        ? `Hide review from public view?`
        : `Approve and retain review?`;

    if (confirm(confirmPrompt)) {
      try {
        await fetch('/api/admin/moderation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reviewId: item.reviewId,
            action,
            notes: `Moderated via Archival Desk: ${action}`,
          }),
        });

        setQueue((prev) => prev.filter((q) => q.id !== item.id));
        setNotification(`Review by ${item.reviewerName} successfully marked as ${action}.`);
        setTimeout(() => setNotification(null), 3500);
      } catch {
        alert('Failed to execute moderation action.');
      }
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldAlert className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Community Integrity
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Review Moderation Queue
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Triage user-reported reviews, filter spam, and maintain scholarly decorum across DimisiReads.
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-burgundy-900/15 dark:bg-candle-gold-500/20 text-burgundy-950 dark:text-candle-gold-300 border border-burgundy-700/20">
          Pending Audits: {queue.length}
        </div>
      </div>

      {/* Floating feedback alert */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3.5 rounded-xl bg-candle-gold-500/20 border border-candle-gold-500/40 text-candle-gold-900 dark:text-candle-gold-300 text-xs font-semibold"
          >
            <CheckCircle className="w-4 h-4 text-candle-gold-600 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Moderation Queue */}
      {queue.length === 0 ? (
        <div className="text-center py-16 px-4 bg-cream-100/60 dark:bg-espresso-900/40 rounded-3xl border border-dashed border-warm-oak-300/40 max-w-md mx-auto">
          <CheckCircle className="w-12 h-12 text-warm-oak-400 dark:text-dusty-pink-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50 mb-2">
            Moderation Queue is Clean
          </h3>
          <p className="text-xs text-warm-oak-700 dark:text-cream-200/70">
            No pending community reports or flagged critiques require attention.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {queue.map((item) => (
            <SpotlightCard
              key={item.id}
              className="p-6 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-serif font-bold text-base text-burgundy-950 dark:text-cream-50">
                      {item.bookTitle}
                    </span>
                    <span className="text-xs text-warm-oak-600 dark:text-cream-300/70">
                      by {item.authorName}
                    </span>
                    {item.reportReason !== 'NONE' && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-700 dark:text-red-400 text-[10px] font-mono font-bold">
                        Reported: {item.reportReason}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= item.rating
                              ? 'text-candle-gold-500 fill-candle-gold-500'
                              : 'text-warm-oak-300 dark:text-espresso-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-burgundy-900 dark:text-candle-gold-300">
                      by {item.reviewerName}
                    </span>
                    <span className="text-[10px] font-mono text-warm-oak-500 dark:text-dusty-pink-300">
                      • {item.reportedAt}
                    </span>
                  </div>

                  <p className="text-xs text-warm-oak-800 dark:text-cream-200/90 bg-cream-100/50 dark:bg-espresso-900/50 p-3.5 rounded-2xl border border-warm-oak-200/40 leading-relaxed max-w-3xl">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                {/* Moderation Actions */}
                <div className="flex items-center sm:flex-col gap-2 shrink-0 self-end sm:self-start">
                  <button
                    onClick={() => handleAction(item, 'APPROVE')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-600/15 hover:bg-green-600 text-green-800 dark:text-green-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => handleAction(item, 'HIDE')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-600 text-amber-800 dark:text-amber-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide</span>
                  </button>

                  <button
                    onClick={() => handleAction(item, 'DELETE')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/15 hover:bg-red-600 text-red-700 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Purge Spam</span>
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
