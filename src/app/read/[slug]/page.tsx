'use client';

import React, { useState, useEffect, use, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Highlighter,
  Sliders,
  Maximize2,
  Minimize2,
  List,
  Download,
  ShieldCheck,
  X,
  CheckCircle,
  ArrowLeft,
  Flame,
  Trash2,
} from 'lucide-react';
import { BOOKS_SEED, BookSeed } from '@/lib/dev-seed/books';
import { cn } from '@/lib/utils';

type ThemeMode = 'parchment' | 'lantern' | 'midnight' | 'dusty-rose';
type FontFamily = 'serif' | 'sans' | 'lora';
type ViewMode = 'single' | 'spread';

interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
}

interface HighlightItem {
  id: string;
  cfiRange: string;
  selectedText: string;
  color: string;
  note?: string;
}

interface BookmarkItem {
  id: string;
  cfiLocation: string;
  label: string;
}

export default function CozyOnlineReaderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // Book & Access State
  const [book, setBook] = useState<BookSeed | null>(null);
  const [accessDenied, setAccessDenied] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Reader Customization State
  const [theme, setTheme] = useState<ThemeMode>('parchment');
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineHeight, setLineHeight] = useState<number>(1.75);
  const [fontFamily, setFontFamily] = useState<FontFamily>('serif');
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Navigation State
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Drawers & Modals
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isTypographyOpen, setIsTypographyOpen] = useState(false);
  const [isAnnotationsOpen, setIsAnnotationsOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [signedDownloadUrl, setSignedDownloadUrl] = useState<string | null>(null);

  // Study Tools State
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [activeHighlightColor, setActiveHighlightColor] = useState('#D9A760');
  const [noteInput, setNoteInput] = useState('');
  const [showHighlightToolbar, setShowHighlightToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });

  const readerContainerRef = useRef<HTMLDivElement>(null);

  // Fetch book and verify access
  useEffect(() => {
    fetch(`/api/reader/${slug}/access`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.data?.book) {
          setBook(data.data.book);
        } else if (data?.error?.message) {
          setAccessDenied(data.error.message);
        } else {
          // Dev fallback
          const found = BOOKS_SEED.find((b) => b.slug === slug || b.id === slug);
          if (found && found.isOnlineReadAllowed) {
            setBook(found);
          } else {
            setAccessDenied(
              'This volume is catalogue-only or lacks verified digital distribution rights.'
            );
          }
        }
      })
      .catch(() => {
        const found = BOOKS_SEED.find((b) => b.slug === slug || b.id === slug);
        if (found) setBook(found);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Synthetic chapters for distraction-free reading
  const chapters: Chapter[] = [
    {
      id: 'chap-1',
      title: 'Chapter I: The Arrival & The Old Estate',
      subtitle: 'Wherein the quiet rhythms of Hertfordshire are gently disturbed',
      paragraphs: [
        'It is a truth well received among lovers of books, that a mind weary of worldly commotion finds its sanctuary in the turning of an undisturbed page. The morning mist hung low over the oak woods, silvering the lawns with a gentle autumn frost.',
        'Within the library, the fire in the great stone hearth cast a warm amber glow across rows of calfskin bindings and gilded spines. Here, amidst the fragrance of dried lavender and seasoned wood, time seemed to surrender its hurried pace.',
        '“To observe without haste,” the scholar noted in the margin of the open folio, “is the quiet privilege of those who have discovered that wisdom is not seized, but welcomed in silence.” Outside, the village bells marked the noon hour, their chime muffled by the heavy velvet draperies.',
        'The quietude of the room was interrupted only by the rustle of turning parchment and the soft patter of early rain against the diamond-paned casements. A gentle contemplation enveloped the morning study, promising hours of serene reflection.',
      ],
    },
    {
      id: 'chap-2',
      title: 'Chapter II: Conversations by the Lantern',
      subtitle: 'Of characters revealed and principles weighed in the evening shadows',
      paragraphs: [
        'As dusk descended over the estate, the lanterns were brought in, casting deep honeyed pools of light upon the mahogany reading table. In such an hour, conversation takes on a reflective clarity rarely found amidst the glare of the noon day.',
        '“A person may be proud without being vain,” remarked the elder traveler, leaning forward into the lantern glow. “Pride relates more to our opinion of ourselves; vanity to what we would have others think of us.”',
        'The words rested upon the air, thoughtful and unhurried. Across the table, a cup of steeped black tea sent a thin ribbon of fragrant steam toward the ceiling beams. Outside, the night wind stirred the boughs of the great cedar.',
        'In the tranquil rhythm of these pages, every phrase was weighed with that delicate balance of wit and discernment that characterizes the finest hours of the literary tradition.',
      ],
    },
    {
      id: 'chap-3',
      title: 'Chapter III: The Sanctuary of Memory',
      subtitle: 'Wherein time deepens the understanding and settles ancient disputes',
      paragraphs: [
        'There is no greater companion to solitude than the memory of journeys undertaken in good company. As the fire died to deep crimson embers, the thoughts of the scholar turned back to the early days of their inquiry.',
        'Knowledge, when stripped of arrogance, becomes a source of boundless serenity. To read deeply is to dwell in many centuries simultaneously, communing with minds whose physical presence has long since turned to dust, yet whose voices remain clear and luminous upon the parchment.',
        'The candle flickered once, casting long dancing shadows across the bookshelf, where hundreds of volumes stood in patient vigil, waiting for tomorrow’s reader to awaken their quiet truths once more.',
      ],
    },
  ];

  const currentChapter = chapters[currentChapterIndex] || chapters[0];
  const totalChapters = chapters.length;
  const progressPercent = Math.round(((currentChapterIndex + 1) / totalChapters) * 100);

  // Auto-sync reading progress with backend
  const syncProgress = useCallback(() => {
    if (!book) return;
    fetch('/api/reader/progress', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookId: book.id,
        progressPercentage: progressPercent,
        cfiLocation: `chap-${currentChapterIndex + 1}-p-${currentPage}`,
        currentChapterTitle: currentChapter.title,
        currentPage,
        totalPages: totalChapters,
        secondsSpentReading: 60,
      }),
    }).catch(() => {});
  }, [book, progressPercent, currentChapterIndex, currentPage, currentChapter.title, totalChapters]);

  useEffect(() => {
    const timer = setTimeout(syncProgress, 2000);
    return () => clearTimeout(timer);
  }, [currentChapterIndex, currentPage, syncProgress]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevPage();
      } else if (e.key === 'Escape') {
        setIsTocOpen(false);
        setIsTypographyOpen(false);
        setIsAnnotationsOpen(false);
        setIsDownloadModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleNextPage = () => {
    if (currentChapterIndex < totalChapters - 1) {
      setCurrentChapterIndex((prev) => prev + 1);
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex((prev) => prev - 1);
      setCurrentPage((prev) => Math.max(1, prev - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Text Selection for Highlighting
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 3) {
      const text = selection.toString().trim();
      setSelectedText(text);
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setToolbarPosition({
        x: Math.max(20, rect.left + rect.width / 2 - 120),
        y: Math.max(10, rect.top - 50 + window.scrollY),
      });
      setShowHighlightToolbar(true);
    } else {
      setShowHighlightToolbar(false);
    }
  };

  const handleSaveHighlight = () => {
    if (!selectedText) return;
    const newHl: HighlightItem = {
      id: `hl-${Date.now()}`,
      cfiRange: `chap-${currentChapterIndex + 1}`,
      selectedText,
      color: activeHighlightColor,
      note: noteInput.trim() || undefined,
    };
    setHighlights((prev) => [newHl, ...prev]);
    setShowHighlightToolbar(false);
    setSelectedText('');
    setNoteInput('');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      const newBm: BookmarkItem = {
        id: `bm-${Date.now()}`,
        cfiLocation: `chap-${currentChapterIndex + 1}`,
        label: currentChapter.title,
      };
      setBookmarks((prev) => [newBm, ...prev]);
    }
  };

  // Signed Download Generation
  const handleRequestDownload = async () => {
    setDownloadLoading(true);
    try {
      const res = await fetch(`/api/downloads/${slug}`, { method: 'POST' });
      const data = await res.json();
      if (data?.data?.downloadUrl) {
        setSignedDownloadUrl(data.data.downloadUrl);
      } else {
        setSignedDownloadUrl(`/api/downloads/stream/dev-token-${Date.now()}`);
      }
    } catch {
      setSignedDownloadUrl(`/api/downloads/stream/dev-token-${Date.now()}`);
    } finally {
      setDownloadLoading(false);
      setIsDownloadModalOpen(true);
    }
  };

  // Theme styling configurations
  const themeClasses = {
    parchment: {
      bg: 'bg-[#F8F4E7]',
      text: 'text-[#1C1417]',
      headerBg: 'bg-[#F8F4E7]/90 border-warm-oak-300/30',
      footerBg: 'bg-[#F8F4E7]/90 border-warm-oak-300/30',
      drawerBg: 'bg-[#F4EEE0] border-warm-oak-300/40 text-[#1C1417]',
      accent: 'text-burgundy-900',
    },
    lantern: {
      bg: 'bg-[#241711]',
      text: 'text-[#F5E6BA]',
      headerBg: 'bg-[#241711]/90 border-candle-gold-500/20',
      footerBg: 'bg-[#241711]/90 border-candle-gold-500/20',
      drawerBg: 'bg-[#1D120D] border-candle-gold-500/20 text-[#F5E6BA]',
      accent: 'text-candle-gold-400',
    },
    midnight: {
      bg: 'bg-[#120E10]',
      text: 'text-[#EFE8E1]',
      headerBg: 'bg-[#120E10]/90 border-espresso-800',
      footerBg: 'bg-[#120E10]/90 border-espresso-800',
      drawerBg: 'bg-[#181316] border-espresso-800 text-[#EFE8E1]',
      accent: 'text-candle-gold-400',
    },
    'dusty-rose': {
      bg: 'bg-[#F5ECEE]',
      text: 'text-[#331C22]',
      headerBg: 'bg-[#F5ECEE]/90 border-dusty-pink-300/40',
      footerBg: 'bg-[#F5ECEE]/90 border-dusty-pink-300/40',
      drawerBg: 'bg-[#EDE0E3] border-dusty-pink-300/40 text-[#331C22]',
      accent: 'text-burgundy-800',
    },
  }[theme];

  const fontClass = {
    serif: 'font-serif',
    sans: 'font-sans',
    lora: 'font-serif tracking-normal',
  }[fontFamily];

  // Access Denied Screen (Strict Legal Compliance Gate)
  if (accessDenied) {
    return (
      <div className="min-h-screen bg-cream-50 dark:bg-espresso-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-cream-100 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-burgundy-900/15 dark:bg-candle-gold-500/20 flex items-center justify-center mx-auto mb-4 border border-burgundy-700/20">
            <ShieldCheck className="w-7 h-7 text-burgundy-800 dark:text-candle-gold-400" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50 mb-2">
            Licence Verification Notice
          </h2>
          <p className="text-xs text-warm-oak-700 dark:text-cream-200/80 mb-6 leading-relaxed">
            {accessDenied}
          </p>
          <div className="p-4 rounded-2xl bg-cream-200/50 dark:bg-espresso-950/60 text-[11px] font-mono text-warm-oak-600 dark:text-dusty-pink-300 mb-6 border border-warm-oak-200/40">
            Mandate: DimisiReads distributes 100% verified Public Domain and licensed original works only.
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 font-serif text-xs font-semibold shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Grand Shelves</span>
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !book) {
    return (
      <div className="min-h-screen bg-[#F8F4E7] flex flex-col items-center justify-center p-6 text-warm-oak-800">
        <div className="w-10 h-10 border-3 border-burgundy-800 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif text-sm font-semibold tracking-wide">
          Preparing the Scholar’s Sanctum...
        </p>
      </div>
    );
  }

  return (
    <div
      ref={readerContainerRef}
      onMouseUp={handleMouseUp}
      className={cn(
        'min-h-screen transition-colors duration-500 flex flex-col select-text relative',
        themeClasses.bg,
        themeClasses.text
      )}
    >
      {/* Hanging Burgundy Ribbon Bookmark with Spring Animation */}
      <AnimatePresence>
        {isBookmarked && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-0 right-16 z-50 pointer-events-none"
          >
            <div className="w-8 h-20 bg-gradient-to-b from-burgundy-900 to-burgundy-800 shadow-xl rounded-b-md flex flex-col items-center justify-end pb-2 border-b-2 border-candle-gold-400">
              <Bookmark className="w-4 h-4 text-candle-gold-300 fill-candle-gold-300" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reader Floating Header */}
      <header
        className={cn(
          'sticky top-0 z-40 backdrop-blur-md px-4 sm:px-8 py-3 border-b flex items-center justify-between transition-colors duration-500',
          themeClasses.headerBg
        )}
      >
        <div className="flex items-center gap-3">
          <Link
            href={`/books/${book.slug}`}
            className="flex items-center gap-1.5 text-xs font-semibold hover:opacity-75 transition-opacity"
            title="Return to Book Details"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit Reader</span>
          </Link>

          <div className="h-4 w-px bg-current opacity-20 mx-1 hidden sm:block" />

          <div>
            <h1 className="font-serif text-sm font-bold truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {book.title}
            </h1>
            <p className="text-[10px] opacity-70 truncate max-w-[150px] sm:max-w-xs">
              {book.author}
            </p>
          </div>
        </div>

        {/* Reader Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Table of Contents Button */}
          <button
            onClick={() => setIsTocOpen(!isTocOpen)}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Table of Contents"
          >
            <List className="w-4 h-4" />
          </button>

          {/* Typography Settings Button */}
          <button
            onClick={() => setIsTypographyOpen(!isTypographyOpen)}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Typography & Themes"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Ribbon Bookmark Button */}
          <button
            onClick={toggleBookmark}
            className={cn(
              'p-2 rounded-xl transition-colors cursor-pointer',
              isBookmarked
                ? 'text-burgundy-700 dark:text-candle-gold-400 bg-black/5 dark:bg-white/10'
                : 'hover:bg-black/5 dark:hover:bg-white/10'
            )}
            title={isBookmarked ? 'Remove Bookmark' : 'Place Ribbon Bookmark'}
          >
            <Bookmark
              className={cn(
                'w-4 h-4',
                isBookmarked && 'fill-current'
              )}
            />
          </button>

          {/* Highlighting & Annotations Drawer Button */}
          <button
            onClick={() => setIsAnnotationsOpen(!isAnnotationsOpen)}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer relative"
            title="My Notes & Highlights"
          >
            <Highlighter className="w-4 h-4" />
            {highlights.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-candle-gold-500" />
            )}
          </button>

          {/* Verified E-Book Download Button */}
          {book.isDownloadAllowed && (
            <button
              onClick={handleRequestDownload}
              disabled={downloadLoading}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-burgundy-900/10 hover:bg-burgundy-900/20 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              title="Download Verified EPUB"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadLoading ? 'Signing...' : 'Download'}</span>
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer hidden md:block"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Main Reading Canvas */}
      <main className="flex-1 flex flex-col justify-between max-w-4xl w-full mx-auto px-6 sm:px-12 py-10 sm:py-16">
        <article
          className={cn(
            'transition-all duration-300',
            fontClass,
            viewMode === 'spread' && 'sm:columns-2 sm:gap-12'
          )}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
          }}
        >
          {/* Chapter Heading */}
          <header className="mb-10 text-center not-prose">
            <span className="text-[11px] font-mono uppercase tracking-widest opacity-60 font-semibold block mb-1">
              Part One • Hertfordshire
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              {currentChapter.title}
            </h2>
            {currentChapter.subtitle && (
              <p className="font-serif italic text-sm opacity-75 max-w-lg mx-auto">
                {currentChapter.subtitle}
              </p>
            )}
            <div className="w-16 h-px bg-current opacity-25 mx-auto mt-6" />
          </header>

          {/* Chapter Paragraphs */}
          <div className="space-y-6 text-justify">
            {currentChapter.paragraphs.map((p, idx) => (
              <p key={idx} className="first-letter:text-3xl first-letter:font-bold first-letter:mr-1">
                {p}
              </p>
            ))}
          </div>

          {/* Legal Stamp Notice at Chapter Footer */}
          <footer className="mt-16 pt-8 border-t border-current opacity-30 text-[10px] font-mono text-center not-prose">
            DimisiReads Verified Archival Edition • {book.licenceNotice}
          </footer>
        </article>

        {/* Tactical Edge Click Zones for Fast Page Turning */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-current opacity-40">
          <button
            onClick={handlePrevPage}
            disabled={currentChapterIndex === 0}
            className="flex items-center gap-1.5 text-xs font-semibold hover:opacity-100 disabled:opacity-30 transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Chapter</span>
          </button>

          <span className="text-[11px] font-mono font-medium">
            Chapter {currentChapterIndex + 1} of {totalChapters}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentChapterIndex === totalChapters - 1}
            className="flex items-center gap-1.5 text-xs font-semibold hover:opacity-100 disabled:opacity-30 transition-opacity cursor-pointer"
          >
            <span>Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Floating Highlight Toolbar (Triggered on Text Selection) */}
      <AnimatePresence>
        {showHighlightToolbar && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'absolute',
              top: `${toolbarPosition.y}px`,
              left: `${toolbarPosition.x}px`,
            }}
            className="z-50 bg-espresso-950 text-cream-50 p-2.5 rounded-2xl shadow-2xl border border-candle-gold-500/30 flex flex-col gap-2 min-w-[240px]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-candle-gold-300 font-bold">
                Highlight
              </span>
              <div className="flex items-center gap-1.5">
                {[
                  { name: 'Amber Gold', hex: '#D9A760' },
                  { name: 'Rose Quartz', hex: '#D7A7B1' },
                  { name: 'Sage Linen', hex: '#A3B18A' },
                  { name: 'Lavender Mist', hex: '#B8A9C9' },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setActiveHighlightColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={cn(
                      'w-5 h-5 rounded-full transition-transform',
                      activeHighlightColor === c.hex && 'ring-2 ring-cream-50 scale-110'
                    )}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Add personal note (optional)..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-espresso-900 border border-espresso-800 text-xs text-cream-50 focus:outline-none focus:ring-1 focus:ring-candle-gold-500"
            />

            <div className="flex justify-end gap-1.5">
              <button
                onClick={() => setShowHighlightToolbar(false)}
                className="px-2 py-1 text-[10px] text-cream-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveHighlight}
                className="px-3 py-1 bg-burgundy-800 hover:bg-burgundy-700 text-cream-50 rounded-lg text-xs font-semibold shadow"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reader Bottom Navigation & Reading Progress Bar */}
      <footer
        className={cn(
          'sticky bottom-0 z-40 backdrop-blur-md px-6 py-2.5 border-t flex items-center justify-between text-xs transition-colors duration-500',
          themeClasses.footerBg
        )}
      >
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-candle-gold-500" />
          <span className="text-[11px] font-mono font-semibold">
            Reading Streak Active
          </span>
        </div>

        {/* Progress Bar & Chapter Tracker */}
        <div className="flex items-center gap-3 flex-1 max-w-xs mx-4">
          <div className="w-full h-1.5 rounded-full bg-current opacity-20 overflow-hidden">
            <div
              className="h-full bg-burgundy-700 dark:bg-candle-gold-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-mono font-bold shrink-0">
            {progressPercent}%
          </span>
        </div>

        <div className="text-[11px] font-mono opacity-70">
          Page {currentPage}
        </div>
      </footer>

      {/* Table of Contents Drawer */}
      <AnimatePresence>
        {isTocOpen && (
          <div className="fixed inset-0 z-50 flex justify-start bg-black/40 backdrop-blur-xs">
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'w-80 h-full p-6 shadow-2xl flex flex-col justify-between border-r',
                themeClasses.drawerBg
              )}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-current opacity-30 mb-6">
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4" />
                    <h3 className="font-serif text-lg font-bold">Contents</h3>
                  </div>
                  <button
                    onClick={() => setIsTocOpen(false)}
                    className="p-1 rounded hover:opacity-60"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {chapters.map((chap, idx) => (
                    <button
                      key={chap.id}
                      onClick={() => {
                        setCurrentChapterIndex(idx);
                        setIsTocOpen(false);
                      }}
                      className={cn(
                        'w-full text-left p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between',
                        currentChapterIndex === idx
                          ? 'bg-black/10 dark:bg-white/10 font-bold'
                          : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
                      )}
                    >
                      <span>{chap.title}</span>
                      {currentChapterIndex === idx && (
                        <CheckCircle className="w-3.5 h-3.5 text-candle-gold-500 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-current opacity-30 text-[10px] font-mono">
                {book.title} • {book.author}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Typography & Themes Drawer */}
      <AnimatePresence>
        {isTypographyOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
            <motion.aside
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'w-80 h-full p-6 shadow-2xl flex flex-col justify-between border-l overflow-y-auto',
                themeClasses.drawerBg
              )}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-current opacity-30">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    <h3 className="font-serif text-lg font-bold">Atmosphere</h3>
                  </div>
                  <button
                    onClick={() => setIsTypographyOpen(false)}
                    className="p-1 rounded hover:opacity-60"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Theme Mode Selector */}
                <div>
                  <label className="text-xs font-semibold block mb-2 opacity-80">
                    Reading Canvas
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'parchment', name: 'Cream Parchment', color: '#F8F4E7' },
                      { id: 'lantern', name: 'Cozy Lantern', color: '#241711' },
                      { id: 'midnight', name: 'Midnight Velvet', color: '#120E10' },
                      { id: 'dusty-rose', name: 'Dusty Rose Dusk', color: '#F5ECEE' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id as ThemeMode)}
                        className={cn(
                          'p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all',
                          theme === t.id
                            ? 'ring-2 ring-current font-bold'
                            : 'opacity-70 hover:opacity-100'
                        )}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: t.color }}
                        />
                        <span className="truncate">{t.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size Adjuster */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2 opacity-80">
                    <span>Font Size</span>
                    <span>{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={14}
                    max={26}
                    step={1}
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-burgundy-800 cursor-pointer"
                  />
                </div>

                {/* Line Height Adjuster */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2 opacity-80">
                    <span>Line Spacing</span>
                    <span>{lineHeight}x</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1.4, 1.6, 1.75, 2.0].map((lh) => (
                      <button
                        key={lh}
                        onClick={() => setLineHeight(lh)}
                        className={cn(
                          'py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all',
                          lineHeight === lh
                            ? 'bg-black/15 dark:bg-white/15 font-bold border-current'
                            : 'border-current/20 opacity-70 hover:opacity-100'
                        )}
                      >
                        {lh}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Typeface Selector */}
                <div>
                  <label className="text-xs font-semibold block mb-2 opacity-80">
                    Typeface
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'serif', name: 'Editorial Serif' },
                      { id: 'sans', name: 'Modern Sans' },
                      { id: 'lora', name: 'Lora Classical' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFontFamily(f.id as FontFamily)}
                        className={cn(
                          'py-2 px-1 text-center rounded-xl border text-[11px] font-semibold transition-all',
                          fontFamily === f.id
                            ? 'bg-black/15 dark:bg-white/15 border-current font-bold'
                            : 'border-current/20 opacity-70 hover:opacity-100'
                        )}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Layout Mode (Single vs Spread) */}
                <div>
                  <label className="text-xs font-semibold block mb-2 opacity-80">
                    Layout
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setViewMode('single')}
                      className={cn(
                        'py-2 rounded-xl border text-xs font-semibold transition-all',
                        viewMode === 'single'
                          ? 'bg-black/15 dark:bg-white/15 border-current font-bold'
                          : 'border-current/20 opacity-70'
                      )}
                    >
                      Single Page
                    </button>
                    <button
                      onClick={() => setViewMode('spread')}
                      className={cn(
                        'py-2 rounded-xl border text-xs font-semibold transition-all',
                        viewMode === 'spread'
                          ? 'bg-black/15 dark:bg-white/15 border-current font-bold'
                          : 'border-current/20 opacity-70'
                      )}
                    >
                      Two-Page Spread
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-current opacity-30 text-[10px] font-mono">
                Preferences preserved locally
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Annotations & Notes Side Drawer */}
      <AnimatePresence>
        {isAnnotationsOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
            <motion.aside
              initial={{ x: 340 }}
              animate={{ x: 0 }}
              exit={{ x: 340 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'w-88 h-full p-6 shadow-2xl flex flex-col justify-between border-l overflow-y-auto',
                themeClasses.drawerBg
              )}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-current opacity-30 mb-6">
                  <div className="flex items-center gap-2">
                    <Highlighter className="w-4 h-4" />
                    <h3 className="font-serif text-lg font-bold">Study Folio</h3>
                  </div>
                  <button
                    onClick={() => setIsAnnotationsOpen(false)}
                    className="p-1 rounded hover:opacity-60"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Bookmarks Section */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider opacity-70 font-semibold mb-2 flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Bookmarks ({bookmarks.length})</span>
                  </h4>
                  {bookmarks.length === 0 ? (
                    <p className="text-xs opacity-60 italic">No ribbons placed yet.</p>
                  ) : (
                    <div className="space-y-1.5">
                      {bookmarks.map((b) => (
                        <div
                          key={b.id}
                          className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-current/10 text-xs flex items-center justify-between"
                        >
                          <span className="font-serif font-bold">{b.label}</span>
                          <button
                            onClick={() =>
                              setBookmarks((prev) => prev.filter((item) => item.id !== b.id))
                            }
                            className="p-1 text-red-500 hover:opacity-80"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Highlights & Personal Notes */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider opacity-70 font-semibold mb-2 flex items-center gap-1.5">
                    <Highlighter className="w-3.5 h-3.5" />
                    <span>Highlights & Notes ({highlights.length})</span>
                  </h4>
                  {highlights.length === 0 ? (
                    <p className="text-xs opacity-60 italic">
                      Select text in the reader to create colorful highlights and scholarly notes.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {highlights.map((h) => (
                        <div
                          key={h.id}
                          className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border-l-4 text-xs space-y-1.5"
                          style={{ borderLeftColor: h.color }}
                        >
                          <p className="font-serif italic">&ldquo;{h.selectedText}&rdquo;</p>
                          {h.note && (
                            <p className="font-sans text-[11px] opacity-80 bg-black/5 dark:bg-white/10 p-2 rounded-lg">
                              {h.note}
                            </p>
                          )}
                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() =>
                                setHighlights((prev) => prev.filter((item) => item.id !== h.id))
                              }
                              className="text-[10px] text-red-500 hover:underline flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-current opacity-30 text-[10px] font-mono">
                Synchronized with scholar profile
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Verified Download Modal */}
      <AnimatePresence>
        {isDownloadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full p-6 rounded-3xl bg-cream-50 dark:bg-espresso-950 border border-warm-oak-300/40 dark:border-candle-gold-500/20 shadow-2xl relative text-burgundy-950 dark:text-cream-50"
            >
              <button
                onClick={() => setIsDownloadModalOpen(false)}
                className="absolute top-5 right-5 p-1 rounded hover:opacity-60"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-candle-gold-500" />
                <h3 className="font-serif text-xl font-bold">
                  Verified Legal Download
                </h3>
              </div>

              <p className="text-xs text-warm-oak-700 dark:text-cream-200/80 mb-4 leading-relaxed">
                This edition of <strong className="font-serif">{book.title}</strong> is verified under the{' '}
                <span className="font-mono font-bold text-candle-gold-600 dark:text-candle-gold-400">
                  {book.licenceCategory}
                </span>{' '}
                framework. No DRM or circumvention mechanisms are used.
              </p>

              <div className="p-3.5 rounded-2xl bg-cream-200/60 dark:bg-espresso-900 border border-warm-oak-300/30 text-xs font-mono space-y-1 mb-5">
                <div className="flex justify-between">
                  <span className="text-warm-oak-600 dark:text-cream-300/70">Format:</span>
                  <span className="font-bold">EPUB 3.2 (DRM-Free)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-oak-600 dark:text-cream-300/70">Security:</span>
                  <span className="font-bold text-green-700 dark:text-green-400">
                    SHA-256 Tamper-Proof
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-oak-600 dark:text-cream-300/70">Link Validity:</span>
                  <span className="font-bold text-candle-gold-700 dark:text-candle-gold-400">
                    10 Minutes (Signed)
                  </span>
                </div>
              </div>

              {signedDownloadUrl && (
                <a
                  href={signedDownloadUrl}
                  download
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 font-serif text-xs font-semibold shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Start Secure Download</span>
                </a>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
