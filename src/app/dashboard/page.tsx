import React from 'react';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/guards';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { BookOpen, Flame, Bookmark, Clock } from 'lucide-react';

export default async function DashboardPage() {
  const user = await requireAuth('/dashboard');

  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28">
        {/* User Welcome Banner */}
        <div className="mb-10 p-8 rounded-3xl wood-shelf text-cream-50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-burgundy-700 border-2 border-candle-gold-400 flex items-center justify-center text-candle-gold-300 font-serif font-bold text-2xl shadow-burgundy-glow">
              {user.fullName.slice(0, 1)}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-candle-gold-400">
                Personal Sanctum & Study
              </span>
              <h1 className="font-serif text-3xl font-bold tracking-tight">
                Welcome, {user.fullName}
              </h1>
              <p className="text-xs text-dusty-pink-300 font-sans mt-0.5">
                @{user.username} • Roles: {user.roles.join(', ')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/explore"
              className="px-5 py-2.5 rounded-xl bg-candle-gold-500 hover:bg-candle-gold-600 text-espresso-950 text-xs font-semibold shadow-candle-glow transition-all"
            >
              Browse Library Shelves
            </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <SpotlightCard className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-warm-oak-500 dark:text-dusty-pink-300">
                Currently Reading
              </span>
              <BookOpen className="w-4 h-4 text-candle-gold-500" />
            </div>
            <p className="font-serif text-3xl font-bold">1</p>
            <p className="text-xs text-warm-oak-600 dark:text-cream-300/80 mt-1">
              Frankenstein • 48% progress
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-warm-oak-500 dark:text-dusty-pink-300">
                Candle Streak
              </span>
              <Flame className="w-4 h-4 text-candle-gold-500" />
            </div>
            <p className="font-serif text-3xl font-bold text-candle-gold-500">7 Days</p>
            <p className="text-xs text-warm-oak-600 dark:text-cream-300/80 mt-1">
              Next milestone: 10-day flame
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-warm-oak-500 dark:text-dusty-pink-300">
                Saved to Shelf
              </span>
              <Bookmark className="w-4 h-4 text-candle-gold-500" />
            </div>
            <p className="font-serif text-3xl font-bold">4</p>
            <p className="text-xs text-warm-oak-600 dark:text-cream-300/80 mt-1">
              In your personal reading list
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-warm-oak-500 dark:text-dusty-pink-300">
                Hours Immersed
              </span>
              <Clock className="w-4 h-4 text-candle-gold-500" />
            </div>
            <p className="font-serif text-3xl font-bold">12.4</p>
            <p className="text-xs text-warm-oak-600 dark:text-cream-300/80 mt-1">
              This month in the sanctuary
            </p>
          </SpotlightCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
