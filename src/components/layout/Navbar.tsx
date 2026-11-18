'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Library,
  Search,
  BookOpen,
  Sparkles,
  Menu,
  X,
  Compass,
  BookmarkCheck,
  Feather,
  User,
  LogOut,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { CommandSearchModal } from '@/components/books/CommandSearchModal';
import { cn } from '@/lib/utils';

interface CurrentUser {
  id: string;
  email: string;
  fullName: string;
  username: string;
  roles: string[];
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Fetch session status
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data?.user) {
            setCurrentUser(data.data.user);
          }
        }
      } catch {
        // Not authenticated
      }
    };

    fetchUser();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setCurrentUser(null);
      setUserDropdownOpen(false);
      router.push('/');
      router.refresh();
    } catch {
      // Ignore
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore', icon: Compass },
    { name: 'Categories', href: '/categories' },
    { name: 'Collections', href: '/collections', icon: Sparkles },
    { name: 'Free E-Books', href: '/free-ebooks', icon: BookmarkCheck, badge: 'Verified' },
    { name: 'About', href: '/about' },
  ];

  const isAdmin = currentUser?.roles.some((r) => r === 'SUPER_ADMIN' || r === 'CONTENT_MANAGER');

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          isScrolled
            ? 'py-2.5 bg-cream-100/85 dark:bg-espresso-950/90 backdrop-blur-md shadow-sm border-b border-burgundy-900/10 dark:border-candle-gold-500/20'
            : 'py-4 bg-cream-100/60 dark:bg-espresso-950/60 backdrop-blur-sm border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-burgundy-700 text-candle-gold-300 shadow-burgundy-glow group-hover:scale-105 transition-transform duration-200">
              <Library className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
                DIMISI<span className="text-candle-gold-600 dark:text-candle-gold-400">READS</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-sans font-semibold -mt-0.5">
                Digital Library Sanctuary
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-1.5 rounded-lg text-xs font-sans font-semibold tracking-wide transition-colors flex items-center gap-1.5',
                    isActive
                      ? 'text-burgundy-900 dark:text-candle-gold-300 bg-burgundy-900/5 dark:bg-espresso-800'
                      : 'text-warm-oak-800 dark:text-cream-200 hover:text-burgundy-900 dark:hover:text-candle-gold-300 hover:bg-cream-200/50 dark:hover:bg-espresso-900/60'
                  )}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-candle-gold-500" />}
                  {link.name}
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-candle-gold-500/20 text-candle-gold-700 dark:text-candle-gold-300 border border-candle-gold-500/30">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-burgundy-700 dark:bg-candle-gold-400 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Search Trigger */}
          <div className="flex items-center gap-3">
            {/* Quick Search Button (Cmd+K) */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-warm-oak-300/40 dark:border-candle-gold-500/20 bg-cream-50/80 dark:bg-espresso-900/80 text-xs text-warm-oak-700 dark:text-cream-300 hover:border-candle-gold-500 transition-colors shadow-sm cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-candle-gold-500" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-mono rounded bg-warm-oak-200/50 dark:bg-espresso-800 text-warm-oak-600 dark:text-cream-300">
                ⌘K
              </kbd>
            </button>

            {/* Authenticated User Menu OR Login / Start Reading Buttons */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-warm-oak-300/40 dark:border-candle-gold-500/30 bg-cream-100 dark:bg-espresso-900 text-xs font-semibold cursor-pointer shadow-sm hover:border-candle-gold-500 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-burgundy-700 text-cream-50 flex items-center justify-center font-serif text-xs font-bold shadow-xs">
                    {currentUser.fullName.slice(0, 1)}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate text-warm-oak-900 dark:text-cream-100">
                    {currentUser.fullName}
                  </span>
                  <ChevronDown className="w-3 h-3 text-warm-oak-500" />
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 5 }}
                      className="absolute right-0 mt-2 w-52 rounded-2xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/30 shadow-2xl p-2 z-50 text-xs"
                    >
                      <div className="px-3 py-2 border-b border-warm-oak-200/50 dark:border-espresso-800">
                        <p className="font-bold text-burgundy-950 dark:text-cream-50 truncate">
                          {currentUser.fullName}
                        </p>
                        <p className="text-[10px] text-warm-oak-500 dark:text-dusty-pink-300 truncate">
                          @{currentUser.username}
                        </p>
                      </div>

                      <div className="py-1 space-y-0.5">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cream-200/50 dark:hover:bg-espresso-800 text-warm-oak-800 dark:text-cream-200 font-semibold"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-candle-gold-500" />
                          My Study / Dashboard
                        </Link>

                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cream-200/50 dark:hover:bg-espresso-800 text-candle-gold-700 dark:text-candle-gold-300 font-semibold"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-candle-gold-500" />
                            Archivist Admin
                          </Link>
                        )}
                      </div>

                      <div className="pt-1 border-t border-warm-oak-200/50 dark:border-espresso-800">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-burgundy-900/10 text-burgundy-800 dark:text-dusty-pink-300 font-semibold cursor-pointer text-left"
                        >
                          <LogOut className="w-3.5 h-3.5 text-burgundy-700 dark:text-dusty-pink-300" />
                          Sign Out of Sanctum
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold text-warm-oak-800 dark:text-cream-200 hover:text-burgundy-900 transition-colors"
                >
                  Log In
                </Link>
                <Link href="/register" className="hidden sm:inline-flex">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-burgundy-700 hover:bg-burgundy-800 text-cream-50 font-sans text-xs font-semibold tracking-wide shadow-burgundy-glow transition-all active:scale-95 cursor-pointer">
                    <BookOpen className="w-3.5 h-3.5 text-candle-gold-300" />
                    Start Reading
                  </span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-warm-oak-800 dark:text-cream-100 hover:bg-cream-200/60 dark:hover:bg-espresso-800 transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Staggered Links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed top-[65px] left-0 right-0 z-30 bg-cream-100/95 dark:bg-espresso-950/95 backdrop-blur-xl border-b border-warm-oak-300/30 dark:border-candle-gold-500/20 px-6 py-6 shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-sm font-serif font-bold text-burgundy-950 dark:text-cream-50 border-b border-warm-oak-200/40 dark:border-espresso-800"
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-candle-gold-500/20 text-candle-gold-700 dark:text-candle-gold-300">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4 flex flex-col gap-2.5">
                {currentUser ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-burgundy-700 text-cream-50 text-xs font-semibold shadow-burgundy-glow"
                    >
                      <BookOpen className="w-4 h-4 text-candle-gold-300" />
                      My Study / Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-warm-oak-400/40 text-xs font-semibold text-burgundy-800 dark:text-dusty-pink-300"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-burgundy-700 text-cream-50 text-xs font-semibold shadow-burgundy-glow"
                    >
                      <User className="w-4 h-4 text-candle-gold-300" />
                      Log In to Sanctum
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-warm-oak-400/40 dark:border-candle-gold-500/30 text-xs font-semibold text-warm-oak-800 dark:text-cream-200"
                    >
                      <Feather className="w-3.5 h-3.5 text-candle-gold-500" />
                      Register New Account
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Cmd+K Search Modal */}
      <CommandSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
};

export default Navbar;
