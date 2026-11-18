'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark,
  Plus,
  Lock,
  Globe,
  Share2,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';

interface ReadingList {
  id: string;
  name: string;
  description?: string | null;
  isPublic: boolean;
  books: Array<{
    book: {
      id: string;
      slug: string;
      title: string;
      author: string;
      coverImage: string;
    };
  }>;
}

export default function ReadingListsPage() {
  const [lists, setLists] = useState<ReadingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIsPublic, setNewIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/dashboard/lists')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.lists) {
          setLists(data.data.lists);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/dashboard/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTitle.trim(),
          description: newDescription.trim() || undefined,
          isPublic: newIsPublic,
        }),
      });
      const data = await res.json();
      if (data?.data?.list) {
        setLists((prev) => [data.data.list, ...prev]);
        setIsModalOpen(false);
        setNewTitle('');
        setNewDescription('');
      }
    } catch {
      // Mock creation fallback
      const mockList: ReadingList = {
        id: `list-${Date.now()}`,
        name: newTitle.trim(),
        description: newDescription.trim() || 'A curated folio of chosen works.',
        isPublic: newIsPublic,
        books: [],
      };
      setLists((prev) => [mockList, ...prev]);
      setIsModalOpen(false);
      setNewTitle('');
      setNewDescription('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Bookmark className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Personal Folios
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Curated Reading Lists
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Organize your chosen volumes into thematic folios, seasonal collections, or research companions.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 font-serif text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Folio</span>
        </button>
      </div>

      {/* Lists Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-cream-200/50 dark:bg-espresso-900/50 animate-pulse border border-warm-oak-200/40"
            />
          ))}
        </div>
      ) : lists.length === 0 ? (
        <div className="text-center py-16 px-4 bg-cream-100/60 dark:bg-espresso-900/40 rounded-3xl border border-dashed border-warm-oak-300/40 dark:border-candle-gold-500/20 max-w-md mx-auto">
          <Bookmark className="w-12 h-12 text-warm-oak-400 dark:text-dusty-pink-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50 mb-2">
            No Folios Yet
          </h3>
          <p className="text-xs text-warm-oak-700 dark:text-cream-200/70 mb-6">
            Create your first custom reading list to group volumes by mood, topic, or season.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-burgundy-900 text-cream-50 text-xs font-semibold"
          >
            Create Folio
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((list) => (
            <SpotlightCard
              key={list.id}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-warm-oak-600 dark:text-dusty-pink-300">
                    {list.isPublic ? (
                      <>
                        <Globe className="w-3.5 h-3.5 text-candle-gold-500" />
                        <span>Public Folio</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-warm-oak-400" />
                        <span>Private Archive</span>
                      </>
                    )}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-burgundy-900/10 dark:bg-candle-gold-500/15 text-burgundy-900 dark:text-candle-gold-300 font-semibold">
                    {list.books?.length || 0} books
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50 group-hover:text-burgundy-800 dark:group-hover:text-candle-gold-400 transition-colors">
                  {list.name}
                </h3>
                {list.description && (
                  <p className="text-xs text-warm-oak-700 dark:text-cream-200/70 mt-2 line-clamp-2">
                    {list.description}
                  </p>
                )}

                {/* Overlapping Book Spine Previews */}
                <div className="mt-5 flex items-center gap-2">
                  {list.books && list.books.length > 0 ? (
                    <div className="flex -space-x-3 overflow-hidden py-1">
                      {list.books.slice(0, 4).map((b, idx) => (
                        <div
                          key={b.book?.id || idx}
                          className="relative w-10 h-14 rounded shadow-sm border border-warm-oak-300/40 overflow-hidden transform hover:-translate-y-1 transition-transform"
                        >
                          <Image
                            src={b.book?.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80'}
                            alt={b.book?.title || 'Book cover'}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[11px] italic text-warm-oak-500 dark:text-cream-300/50">
                      Empty folio. Add books from explore.
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-warm-oak-200/40 dark:border-espresso-800 flex items-center justify-between">
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy-800 dark:text-candle-gold-400 hover:gap-2 transition-all"
                >
                  <span>Browse & Add</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <div className="flex items-center gap-1">
                  <button
                    className="p-1.5 rounded-lg text-warm-oak-400 hover:text-burgundy-800 dark:hover:text-cream-100 transition-colors"
                    title="Share Folio"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Create List Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-cream-50 dark:bg-espresso-900 rounded-3xl border border-warm-oak-300/40 dark:border-candle-gold-500/20 p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-1 rounded-full text-warm-oak-500 hover:text-burgundy-950 dark:hover:text-cream-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-candle-gold-500" />
                <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
                  New Reading Folio
                </h3>
              </div>
              <p className="text-xs text-warm-oak-700 dark:text-cream-200/70 mb-5">
                Curate a distinctive reading trail for your study or to share with fellow bibliophiles.
              </p>

              <form onSubmit={handleCreateList} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                    Folio Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Autumn Rain & Gothic Echoes"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                    Curator’s Note / Description (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="What connects the volumes in this folio?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-cream-200/40 dark:bg-espresso-800/50 border border-warm-oak-200/50">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-candle-gold-500" />
                    <div>
                      <p className="text-xs font-semibold text-burgundy-950 dark:text-cream-100">
                        Public Folio
                      </p>
                      <p className="text-[10px] text-warm-oak-600 dark:text-cream-300/60">
                        Visible on community discovery
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={newIsPublic}
                    onChange={(e) => setNewIsPublic(e.target.checked)}
                    className="w-4 h-4 accent-burgundy-800 cursor-pointer"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-warm-oak-700 dark:text-cream-200 hover:bg-cream-200/60 dark:hover:bg-espresso-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 text-xs font-semibold shadow-md transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Creating...' : 'Create Folio'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
