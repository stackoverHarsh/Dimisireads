'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { BOOKS_SEED, BookSeed } from '@/lib/dev-seed/books';
import { cn } from '@/lib/utils';

interface CommandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandSearchModal: React.FC<CommandSearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BookSeed[]>([]);
  const [, startTransition] = useTransition();

  // Listen for Cmd+K / Ctrl+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live filter query
  useEffect(() => {
    startTransition(() => {
      if (!query.trim()) {
        setResults(BOOKS_SEED.slice(0, 5));
        return;
      }
      const q = query.toLowerCase();
      const filtered = BOOKS_SEED.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.vibe.toLowerCase().includes(q) ||
          b.isbn13.includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
      setResults(filtered);
    });
  }, [query]);

  const handleSelectBook = (slug: string) => {
    onClose();
    router.push(`/books/${slug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso-950/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-400/30 dark:border-candle-gold-500/30 shadow-2xl z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-5 py-4 border-b border-warm-oak-200/50 dark:border-espresso-800 bg-cream-100/50 dark:bg-espresso-950/50">
              <Search className="w-5 h-5 text-warm-oak-600 dark:text-candle-gold-400 mr-3 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search by title, author, vibe, or ISBN... (e.g. Austen, Stoic, 1818)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent font-sans text-sm sm:text-base text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 dark:placeholder:text-cream-400/50 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-warm-oak-400 hover:text-espresso-900 dark:hover:text-cream-100"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <span className="hidden sm:inline-flex ml-3 px-2 py-0.5 text-[10px] font-mono rounded bg-warm-oak-200/50 dark:bg-espresso-800 text-warm-oak-600 dark:text-cream-300">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-warm-oak-500 dark:text-dusty-pink-300/80 flex items-center justify-between">
                <span>{query ? `Results (${results.length})` : 'Recommended Volumes'}</span>
                <span className="flex items-center gap-1 text-[10px] text-candle-gold-600 dark:text-candle-gold-400">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Provenance
                </span>
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center text-warm-oak-600 dark:text-cream-300/70">
                  <p className="font-serif text-base font-semibold">No volumes found</p>
                  <p className="text-xs mt-1 font-sans">
                    Try searching for classic titles, authors, or literary vibes.
                  </p>
                </div>
              ) : (
                results.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => handleSelectBook(book.slug)}
                    className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 hover:bg-burgundy-900/5 dark:hover:bg-espresso-800/80 group cursor-pointer border border-transparent hover:border-candle-gold-500/20"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-14 rounded bg-gradient-to-br from-burgundy-900 to-espresso-950 flex items-center justify-center text-candle-gold-300 font-serif text-xs font-bold shadow-sm shrink-0 border border-candle-gold-500/20">
                        {book.title.slice(0, 1)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm font-bold text-burgundy-950 dark:text-cream-100 group-hover:text-candle-gold-500 transition-colors truncate">
                          {book.title}
                        </h4>
                        <p className="text-xs text-warm-oak-600 dark:text-dusty-pink-200 font-sans truncate">
                          {book.author} • <span className="italic">{book.vibe}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span
                        className={cn(
                          'hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase',
                          book.hasDigitalEdition
                            ? 'bg-candle-gold-500/15 text-candle-gold-600 dark:text-candle-gold-300 border border-candle-gold-500/30'
                            : 'bg-warm-oak-100 dark:bg-espresso-800 text-warm-oak-600 dark:text-cream-300'
                        )}
                      >
                        {book.hasDigitalEdition ? (
                          <>
                            <BookOpen className="w-2.5 h-2.5" />
                            Read Now
                          </>
                        ) : (
                          'Catalogue'
                        )}
                      </span>
                      <ArrowRight className="w-4 h-4 text-warm-oak-400 group-hover:text-candle-gold-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-warm-oak-200/50 dark:border-espresso-800 bg-cream-100/30 dark:bg-espresso-950/40 text-[11px] text-warm-oak-500 dark:text-cream-400/80 flex items-center justify-between font-sans">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-candle-gold-500" />
                Press <kbd className="font-mono font-bold">↵</kbd> to inspect tome
              </span>
              <span>100% Verified Legal Downloads</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandSearchModal;
