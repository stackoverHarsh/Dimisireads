'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderTree,
  Plus,
  Trash2,
  CheckCircle,
  X,
} from 'lucide-react';
import { CATEGORIES_SEED, CategorySeed } from '@/lib/dev-seed/categories';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategorySeed[]>(CATEGORIES_SEED);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCat: CategorySeed = {
      id: `cat-${Date.now()}`,
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: name.trim(),
      vibe: 'Scholarly Curation',
      description: description.trim(),
      iconName: 'BookOpen',
      bookCount: 0,
    };

    setCategories([newCat, ...categories]);
    setIsModalOpen(false);
    setName('');
    setDescription('');
    setNotification(`Created category "${newCat.name}".`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDelete = (id: string, catName: string) => {
    if (confirm(`Delete category "${catName}"?`)) {
      setCategories(categories.filter((c) => c.id !== id));
      setNotification(`Deleted category "${catName}".`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <FolderTree className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Classification & Genres
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Genres & Curated Disciplines
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Structure the grand library shelves by historical periods, sensory vibes, and academic disciplines.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 font-serif text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
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

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <SpotlightCard
            key={cat.id}
            className="p-6 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-burgundy-900/10 dark:bg-candle-gold-500/15 text-burgundy-900 dark:text-candle-gold-300 uppercase tracking-wider">
                  /{cat.slug}
                </span>
                <span className="text-xs font-mono text-warm-oak-600 dark:text-cream-300/70 font-semibold">
                  {cat.bookCount} books
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50 mb-1">
                {cat.name}
              </h3>
              <p className="text-xs text-warm-oak-700 dark:text-cream-200/80 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="pt-4 border-t border-warm-oak-200/40 dark:border-espresso-800 mt-6 flex justify-end gap-2">
              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-1.5 rounded-lg text-warm-oak-400 hover:text-red-500 transition-colors"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Create Modal */}
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

              <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50 mb-4">
                Add New Genre / Category
              </h3>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Victorian Poetry & Sonnets"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                    Editorial Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the mood, era, or theme..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-warm-oak-700 dark:text-cream-200 hover:bg-cream-200/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 text-xs font-semibold shadow-md transition-all"
                  >
                    Create Category
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
