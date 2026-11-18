'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Library,
  Star,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { COLLECTIONS_SEED, CollectionSeed } from '@/lib/dev-seed/collections';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<CollectionSeed[]>(COLLECTIONS_SEED);
  const [notification, setNotification] = useState<string | null>(null);

  const toggleFeatured = (id: string) => {
    setCollections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFeatured: !c.isFeatured } : c))
    );
    setNotification('Updated featured status on homepage.');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Library className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Editorial Exhibitions
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Curated Collections Management
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Curate and feature themed reading paths, seasonal exhibitions, and philosophical companions.
          </p>
        </div>

        <Link
          href="/collections"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 font-serif text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Public Exhibitions</span>
        </Link>
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

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((col) => (
          <SpotlightCard
            key={col.id}
            className="p-6 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full h-36 rounded-2xl overflow-hidden shadow-inner border border-warm-oak-300/40 mb-4">
                <Image
                  src={col.bannerImageUrl}
                  alt={col.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent flex items-end p-4">
                  <span className="font-serif text-lg font-bold text-cream-50">
                    {col.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-warm-oak-600 dark:text-dusty-pink-300 font-semibold">
                  Curator: {col.curatorName}
                </span>
                <span className="font-mono px-2 py-0.5 rounded-full bg-candle-gold-500/20 text-candle-gold-800 dark:text-candle-gold-300 text-[10px] font-bold">
                  {col.bookSlugs?.length || 0} volumes
                </span>
              </div>

              <p className="text-xs text-warm-oak-700 dark:text-cream-200/80 leading-relaxed line-clamp-2">
                {col.description}
              </p>
            </div>

            <div className="pt-4 border-t border-warm-oak-200/40 dark:border-espresso-800 mt-5 flex items-center justify-between">
              <button
                onClick={() => toggleFeatured(col.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  col.isFeatured
                    ? 'bg-candle-gold-500 text-espresso-950 font-bold'
                    : 'bg-cream-200/60 dark:bg-espresso-900 text-warm-oak-700 dark:text-cream-200 hover:bg-cream-200'
                }`}
              >
                <Star className="w-3.5 h-3.5" />
                <span>{col.isFeatured ? 'Featured on Home' : 'Set as Featured'}</span>
              </button>

              <Link
                href={`/collections/${col.slug}`}
                className="text-xs font-semibold text-burgundy-800 dark:text-candle-gold-400 hover:underline"
              >
                Inspect Public Shelf
              </Link>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
