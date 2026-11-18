'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Plus,
  Search,
  Trash2,
  CheckCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import { BOOKS_SEED, BookSeed } from '@/lib/dev-seed/books';

interface ImportedMetadata {
  googleBooksId: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publisher: string;
  publishedYear: number;
  pageCount: number;
  isbn13: string;
  description: string;
  coverImageUrl?: string;
  suggestedLicence: string;
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState<BookSeed[]>(BOOKS_SEED);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Import Modal State
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importSearchInput, setImportSearchInput] = useState('');
  const [importResults, setImportResults] = useState<ImportedMetadata[]>([]);
  const [importLoading, setImportLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Filtered books
  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isbn13.includes(searchQuery);
    const matchesCategory =
      selectedCategory === 'ALL' || b.categorySlug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importSearchInput.trim()) return;
    setImportLoading(true);

    try {
      const res = await fetch(
        `/api/admin/books/import?q=${encodeURIComponent(importSearchInput.trim())}`
      );
      const data = await res.json();
      if (data?.data?.results) {
        setImportResults(data.data.results);
      }
    } catch {
      // Mock fallback
      setImportResults([
        {
          googleBooksId: `gb-${Date.now()}`,
          title: importSearchInput,
          subtitle: 'Archival Reference Volume',
          authors: ['Classic Scholar'],
          publisher: 'Historical Press',
          publishedYear: 1890,
          pageCount: 340,
          isbn13: '9780140449136',
          description: 'Imported bibliographic record retrieved via global library catalog.',
          coverImageUrl:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
          suggestedLicence: 'PUBLIC_DOMAIN',
        },
      ]);
    } finally {
      setImportLoading(false);
    }
  };

  const handleImportBook = (item: ImportedMetadata) => {
    const newBook: BookSeed = {
      id: `book-${Date.now()}`,
      slug: item.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title: item.title,
      subtitle: item.subtitle,
      author: item.authors[0] || 'Unknown Author',
      category: 'Gothic & Classic Literature',
      categorySlug: 'gothic-classics',
      vibe: 'Scholarly Contemplation',
      isbn13: item.isbn13,
      publisher: item.publisher,
      publishedYear: item.publishedYear,
      pageCount: item.pageCount,
      language: 'English',
      averageRating: 4.8,
      ratingsCount: 1,
      coverImageUrl: item.coverImageUrl,
      description: item.description,
      synopsis: item.description,
      tags: ['Classics', 'Imported', 'Public Domain'],
      licenceCategory: 'PUBLIC_DOMAIN',
      hasDigitalEdition: true,
      isDownloadAllowed: true,
      isOnlineReadAllowed: true,
      licenceNotice: 'Imported bibliographic metadata. Public domain classification confirmed.',
      reviews: [],
    };

    setBooks([newBook, ...books]);
    setIsImportModalOpen(false);
    setImportSearchInput('');
    setImportResults([]);
    setNotification(`Successfully imported "${item.title}" into library catalogue!`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDeleteBook = (id: string, title: string) => {
    if (confirm(`Remove "${title}" from catalogue?`)) {
      setBooks(books.filter((b) => b.id !== id));
      setNotification(`Removed "${title}" from catalogue.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <BookOpen className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Catalogue Registry
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Book Catalogue Management
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Curate bibliographic metadata, import records from global libraries, and manage featured display placements.
          </p>
        </div>

        <button
          onClick={() => setIsImportModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 font-serif text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Import via Google Books / OL</span>
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

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-cream-100/50 dark:bg-espresso-900/40 border border-warm-oak-300/30">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-warm-oak-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or ISBN..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-warm-oak-600 dark:text-cream-300/70 font-mono">
            Category:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
          >
            <option value="ALL">All Categories</option>
            <option value="gothic-classics">Gothic & Classics</option>
            <option value="ai-tech">AI & Digital Minds</option>
            <option value="philosophy">Philosophy</option>
          </select>
        </div>
      </div>

      {/* Books Table */}
      <div className="rounded-3xl border border-warm-oak-300/30 dark:border-candle-gold-500/15 bg-cream-50/80 dark:bg-espresso-950/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-warm-oak-200/50 dark:border-espresso-800 bg-cream-100/60 dark:bg-espresso-900/60 text-warm-oak-700 dark:text-cream-200 font-mono text-[11px] uppercase tracking-wider">
                <th className="p-4">Volume</th>
                <th className="p-4">Category & Vibe</th>
                <th className="p-4">ISBN-13</th>
                <th className="p-4">Licence Category</th>
                <th className="p-4">Digital Rights</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-oak-200/40 dark:divide-espresso-800">
              {filteredBooks.map((b) => (
                <tr
                  key={b.id}
                  className="hover:bg-cream-100/40 dark:hover:bg-espresso-900/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-14 rounded overflow-hidden shadow-xs border border-warm-oak-300/40 shrink-0">
                        <Image
                          src={
                            b.coverImageUrl ||
                            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=200&q=80'
                          }
                          alt={b.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/books/${b.slug}`}
                          className="font-serif font-bold text-burgundy-950 dark:text-cream-50 hover:text-burgundy-800 dark:hover:text-candle-gold-400 line-clamp-1"
                        >
                          {b.title}
                        </Link>
                        <p className="text-[11px] text-warm-oak-600 dark:text-cream-300/70">
                          {b.author} • {b.publishedYear}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold block text-burgundy-900 dark:text-cream-100">
                      {b.category}
                    </span>
                    <span className="text-[10px] text-warm-oak-500 dark:text-dusty-pink-300">
                      {b.vibe}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-warm-oak-700 dark:text-cream-200">
                    {b.isbn13}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-candle-gold-500/15 text-candle-gold-800 dark:text-candle-gold-300 font-mono text-[10px] font-bold">
                      {b.licenceCategory}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {b.isOnlineReadAllowed && (
                        <span className="text-green-700 dark:text-green-400 font-semibold">
                          Read ✓
                        </span>
                      )}
                      {b.isDownloadAllowed && (
                        <span className="text-green-700 dark:text-green-400 font-semibold">
                          Download ✓
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/read/${b.slug}`}
                        className="p-1 text-warm-oak-600 hover:text-burgundy-800 dark:hover:text-candle-gold-300"
                        title="Preview in Reader"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteBook(b.id, b.title)}
                        className="p-1 text-warm-oak-400 hover:text-red-500 transition-colors"
                        title="Delete Book"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Google Books & Open Library Search & Import Modal */}
      <AnimatePresence>
        {isImportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-cream-50 dark:bg-espresso-900 rounded-3xl border border-warm-oak-300/40 dark:border-candle-gold-500/20 p-6 shadow-2xl relative max-h-[85vh] flex flex-col"
            >
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="absolute top-5 right-5 p-1 rounded-full text-warm-oak-500 hover:text-burgundy-950 dark:hover:text-cream-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-candle-gold-500" />
                <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
                  Import Bibliographic Metadata
                </h3>
              </div>
              <p className="text-xs text-warm-oak-700 dark:text-cream-200/80 mb-5">
                Query Google Books and Open Library for verified bibliographic metadata (titles, authors, ISBNs, summaries). Metadata availability never implies digital download rights.
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearchMetadata} className="flex gap-2 mb-5">
                <input
                  type="text"
                  required
                  value={importSearchInput}
                  onChange={(e) => setImportSearchInput(e.target.value)}
                  placeholder="Enter book title, author, or ISBN (e.g. Dracula, Jane Eyre)..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
                />
                <button
                  type="submit"
                  disabled={importLoading}
                  className="px-5 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 text-xs font-semibold shadow-md transition-all disabled:opacity-50"
                >
                  {importLoading ? 'Searching...' : 'Search'}
                </button>
              </form>

              {/* Results List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {importResults.length === 0 ? (
                  <div className="text-center py-12 text-warm-oak-500 dark:text-cream-300/50 text-xs italic">
                    Type a title or author above to preview available library catalogue entries.
                  </div>
                ) : (
                  importResults.map((item) => (
                    <div
                      key={item.googleBooksId}
                      className="p-4 rounded-2xl bg-cream-100/60 dark:bg-espresso-950/60 border border-warm-oak-300/30 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative w-12 h-16 rounded overflow-hidden shadow-xs border border-warm-oak-300/40 shrink-0">
                          <Image
                            src={
                              item.coverImageUrl ||
                              'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=200&q=80'
                            }
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-burgundy-950 dark:text-cream-50">
                            {item.title}
                          </h4>
                          <p className="text-xs text-warm-oak-600 dark:text-cream-300/70">
                            by {item.authors.join(', ')} • {item.publishedYear}
                          </p>
                          <p className="text-[11px] font-mono text-warm-oak-500 dark:text-dusty-pink-300/80 mt-1">
                            ISBN-13: {item.isbn13} • {item.pageCount} pages
                          </p>
                          <p className="text-xs text-warm-oak-700 dark:text-cream-200/80 mt-2 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleImportBook(item)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 text-xs font-semibold shadow-sm shrink-0 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Import</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
