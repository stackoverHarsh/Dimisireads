'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  Flame,
  Award,
  BookOpen,
  ThumbsUp,
  CheckCircle2,
  CheckCheck,
  ArrowRight,
} from 'lucide-react';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  actionUrl?: string | null;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/notifications')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.notifications) {
          setNotifications(data.data.notifications);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const filtered = notifications.filter((n) => (filter === 'unread' ? !n.isRead : true));

  const getIcon = (type: string) => {
    switch (type) {
      case 'STREAK_REMINDER':
        return <Flame className="w-4 h-4 text-candle-gold-500" />;
      case 'ACHIEVEMENT_UNLOCKED':
        return <Award className="w-4 h-4 text-candle-gold-500" />;
      case 'NEW_BOOK_RELEASE':
        return <BookOpen className="w-4 h-4 text-burgundy-700 dark:text-dusty-pink-300" />;
      case 'REVIEW_REACTION':
        return <ThumbsUp className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-warm-oak-500" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Bell className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Dispatch & Whispers
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Sanctum Notifications
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Reminders for daily reading flames, unlocked scholarly badges, and announcements from the curators.
          </p>
        </div>

        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200/70 hover:bg-cream-200 dark:bg-espresso-800 dark:hover:bg-espresso-700 text-burgundy-950 dark:text-cream-100 font-serif text-xs font-semibold tracking-wide border border-warm-oak-300/40 transition-all cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-warm-oak-200/40 dark:border-espresso-800 pb-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            filter === 'all'
              ? 'bg-burgundy-900 text-cream-50 dark:bg-candle-gold-500 dark:text-espresso-950'
              : 'text-warm-oak-600 dark:text-cream-300/70 hover:bg-cream-200/50'
          }`}
        >
          All Dispatches ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            filter === 'unread'
              ? 'bg-burgundy-900 text-cream-50 dark:bg-candle-gold-500 dark:text-espresso-950'
              : 'text-warm-oak-600 dark:text-cream-300/70 hover:bg-cream-200/50'
          }`}
        >
          Unread ({notifications.filter((n) => !n.isRead).length})
        </button>
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 rounded-2xl bg-cream-200/50 dark:bg-espresso-900/50 animate-pulse border border-warm-oak-200/40"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 px-4 bg-cream-100/60 dark:bg-espresso-900/40 rounded-3xl border border-dashed border-warm-oak-300/40 dark:border-candle-gold-500/20 max-w-md mx-auto">
          <CheckCircle2 className="w-12 h-12 text-warm-oak-400 dark:text-dusty-pink-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50 mb-2">
            All Quiet in the Sanctuary
          </h3>
          <p className="text-xs text-warm-oak-700 dark:text-cream-200/70">
            You are fully up to date with your reading streaks, folios, and badges.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <SpotlightCard
              key={item.id}
              className={`flex items-start justify-between gap-4 p-4 rounded-2xl border transition-all ${
                item.isRead
                  ? 'bg-cream-50/70 dark:bg-espresso-950/60 border-warm-oak-300/20 opacity-85'
                  : 'bg-cream-50 dark:bg-espresso-950 border-candle-gold-500/30 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-cream-200/80 dark:bg-espresso-800 flex items-center justify-center shrink-0 border border-warm-oak-300/30">
                  {getIcon(item.type)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-sm font-bold text-burgundy-950 dark:text-cream-50">
                      {item.title}
                    </h4>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-candle-gold-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-warm-oak-700 dark:text-cream-200/80 mt-0.5 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] font-mono text-warm-oak-500 dark:text-dusty-pink-300/70 mt-1.5 block">
                    {item.createdAt}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.actionUrl && (
                  <Link
                    href={item.actionUrl}
                    className="flex items-center gap-1 text-xs font-semibold text-burgundy-800 dark:text-candle-gold-400 hover:gap-1.5 transition-all"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                <button
                  onClick={() => handleToggleRead(item.id)}
                  className="text-[10px] font-mono text-warm-oak-500 hover:text-burgundy-900 dark:hover:text-cream-100 p-1 rounded"
                >
                  {item.isRead ? 'Mark Unread' : 'Mark Read'}
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </div>
  );
}
