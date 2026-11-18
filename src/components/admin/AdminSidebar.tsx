'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  FileCheck,
  Users,
  ShieldAlert,
  FolderTree,
  Library,
  Megaphone,
  History,
  Compass,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const adminNavItems = [
  { name: 'Admin Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Books Catalogue', href: '/admin/books', icon: BookOpen },
  {
    name: 'Licensing & Inventory',
    href: '/admin/inventory',
    icon: FileCheck,
    badge: 'Legal',
  },
  { name: 'User Management', href: '/admin/users', icon: Users },
  {
    name: 'Review Moderation',
    href: '/admin/moderation',
    icon: ShieldAlert,
    badge: 'Queue',
  },
  { name: 'Genres & Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Curated Collections', href: '/admin/collections', icon: Library },
  { name: 'Marketing & Subscriptions', href: '/admin/marketing', icon: Megaphone },
  { name: 'Audit Activity Logs', href: '/admin/logs', icon: History },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Admin Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-espresso-950/95 text-cream-50 border-r border-candle-gold-500/20 backdrop-blur-xl p-4 min-h-[calc(100vh-73px)] sticky top-[73px]">
        <div className="px-3 py-3 mb-4 border-b border-espresso-800">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-candle-gold-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-candle-gold-300 font-bold">
              Grand Archival Desk
            </span>
          </div>
          <p className="font-serif text-base font-bold text-cream-50">
            DimisiReads Backoffice
          </p>
        </div>

        <nav className="space-y-1 flex-1">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors group cursor-pointer',
                  isActive
                    ? 'text-cream-50 bg-burgundy-900/60 border-l-2 border-candle-gold-400'
                    : 'text-cream-200/70 hover:text-cream-50 hover:bg-espresso-900/60'
                )}
              >
                <div className="flex items-center gap-2.5 z-10">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      isActive
                        ? 'text-candle-gold-400'
                        : 'text-dusty-pink-300/70 group-hover:text-candle-gold-400'
                    )}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      'z-10 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider',
                      item.badge === 'Legal'
                        ? 'bg-candle-gold-500/20 text-candle-gold-300 border border-candle-gold-500/40'
                        : 'bg-burgundy-900/40 text-dusty-pink-200 border border-burgundy-700/40'
                    )}
                  >
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <motion.div
                    layoutId="activeAdminNav"
                    className="absolute inset-0 rounded-xl bg-burgundy-900/50"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Utility Links */}
        <div className="pt-4 border-t border-espresso-800 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-cream-300/70 hover:text-candle-gold-300 transition-colors"
          >
            <Compass className="w-4 h-4 text-candle-gold-500" />
            <span>Scholar Dashboard</span>
          </Link>
          <Link
            href="/explore"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-cream-300/70 hover:text-cream-100 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-warm-oak-400" />
            <span>Public Library</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Top Navigation Scrollable Bar */}
      <div className="lg:hidden sticky top-[73px] z-30 bg-espresso-950/95 border-b border-candle-gold-500/20 px-3 py-2 overflow-x-auto flex gap-2">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors',
                isActive
                  ? 'bg-burgundy-900 text-cream-50 border border-candle-gold-400/40'
                  : 'bg-espresso-900/80 text-cream-200/80 hover:bg-espresso-850'
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default AdminSidebar;
