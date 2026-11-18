'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Columns,
  Bookmark,
  History,
  Star,
  Trophy,
  Bell,
  Settings,
  LayoutDashboard,
  Compass,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const dashboardNavItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Cozy Shelf', href: '/dashboard/library', icon: Columns, badge: 'Shelf' },
  { name: 'Currently Reading', href: '/dashboard/reading', icon: BookOpen },
  { name: 'Reading Lists', href: '/dashboard/lists', icon: Bookmark },
  { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
  { name: 'Reading History', href: '/dashboard/history', icon: History },
  { name: 'My Reviews', href: '/dashboard/reviews', icon: Star },
  { name: 'Goals & Badges', href: '/dashboard/goals', icon: Trophy, badge: 'Flame' },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile, visible lg+) */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-cream-100/90 dark:bg-espresso-950/90 border-r border-warm-oak-300/30 dark:border-candle-gold-500/20 backdrop-blur-md p-4 min-h-[calc(100vh-73px)] sticky top-[73px]">
        <div className="px-3 py-2 mb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-warm-oak-500 dark:text-dusty-pink-300 font-bold">
            The Personal Sanctum
          </span>
          <p className="font-serif text-base font-bold text-burgundy-950 dark:text-cream-50">
            Scholar’s Study
          </p>
        </div>

        <nav className="space-y-1 flex-1">
          {dashboardNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors group cursor-pointer',
                  isActive
                    ? 'text-burgundy-950 dark:text-cream-50 bg-burgundy-900/10 dark:bg-espresso-800'
                    : 'text-warm-oak-700 dark:text-cream-300/80 hover:text-burgundy-950 dark:hover:text-cream-100 hover:bg-cream-200/50 dark:hover:bg-espresso-900/50'
                )}
              >
                <div className="flex items-center gap-2.5 z-10">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      isActive
                        ? 'text-burgundy-700 dark:text-candle-gold-400'
                        : 'text-warm-oak-400 dark:text-dusty-pink-300/70 group-hover:text-candle-gold-500'
                    )}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      'z-10 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider',
                      item.badge === 'Flame'
                        ? 'bg-candle-gold-500/20 text-candle-gold-700 dark:text-candle-gold-300 border border-candle-gold-500/30'
                        : 'bg-burgundy-900/15 text-burgundy-800 dark:text-cream-200'
                    )}
                  >
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <motion.div
                    layoutId="activeDashboardNav"
                    className="absolute inset-0 rounded-xl bg-burgundy-900/10 dark:bg-espresso-800 border-l-3 border-burgundy-700 dark:border-candle-gold-400"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Library Return Card */}
        <div className="pt-4 border-t border-warm-oak-200/50 dark:border-espresso-800">
          <Link
            href="/explore"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-warm-oak-700 dark:text-dusty-pink-300 hover:text-burgundy-900 dark:hover:text-candle-gold-300 transition-colors"
          >
            <Compass className="w-4 h-4 text-candle-gold-500" />
            <span>Public Grand Shelves</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Dock (visible on mobile / tablet < lg) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream-100/95 dark:bg-espresso-950/95 backdrop-blur-xl border-t border-warm-oak-300/30 dark:border-candle-gold-500/20 px-3 py-2 shadow-2xl flex items-center justify-around">
        {dashboardNavItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors',
                isActive
                  ? 'text-burgundy-800 dark:text-candle-gold-400'
                  : 'text-warm-oak-600 dark:text-cream-300/70'
              )}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="truncate max-w-[50px]">{item.name.split(' ')[0]}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-burgundy-700 dark:bg-candle-gold-400 mt-0.5" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default DashboardSidebar;
