import React from 'react';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/guards';
import { DashboardService } from '@/services/dashboard.service';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { CountUpStat } from '@/components/react-bits/CountUpStat';
import { SplitText } from '@/components/react-bits/SplitText';
import { TiltedBookCard } from '@/components/react-bits/TiltedBookCard';
import { BOOKS_SEED } from '@/lib/dev-seed/books';
import {
  Flame,
  BookOpen,
  ArrowRight,
  Sparkles,
  Trophy,
  Compass,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function DashboardOverviewPage() {
  const user = await requireAuth('/dashboard');
  const stats = await DashboardService.getOverviewStats(user.id);
  const currentlyReading = BOOKS_SEED.slice(0, 2);
  const recommendations = BOOKS_SEED.slice(2, 5);

  // Time-aware greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const daysOfWeek = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: true },
    { day: 'Sun', completed: false, today: true },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Warm Greeting & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-warm-oak-200/50 dark:border-espresso-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-2">
            <Sparkles className="w-3 h-3 text-candle-gold-500" />
            Sanctum Quarters Active
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            <SplitText text={`${greeting}, ${user.fullName}`} />
          </h1>
          <p className="mt-1 text-xs text-warm-oak-600 dark:text-dusty-pink-200 font-reading">
            The candles are trimmed, the fairy lights are soft, and your reading place is preserved.
          </p>
        </div>

        <Link
          href="/dashboard/library"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-cream-50 text-xs font-semibold shadow-burgundy-glow self-start sm:self-auto"
        >
          <BookOpen className="w-3.5 h-3.5 text-candle-gold-300" />
          Open Cozy Bookshelf
        </Link>
      </div>

      {/* 2. Daily Reading Streak Banner (Centerpiece) */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-burgundy-900 via-burgundy-950 to-espresso-950 text-cream-50 shadow-2xl border border-candle-gold-500/30 overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-candle-gold-500/20 text-candle-gold-400 border border-candle-gold-500/40 flex items-center justify-center shadow-candle-glow shrink-0">
              <Flame className="w-8 h-8 fill-candle-gold-400 text-candle-gold-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-bold tracking-tight">
                  {stats.currentStreakDays}-Day Flame Lit
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-candle-gold-500 text-espresso-950 uppercase">
                  Active
                </span>
              </div>
              <p className="text-xs text-dusty-pink-200 font-reading mt-0.5">
                Read 15 minutes today to preserve your consecutive reading streak.
              </p>
            </div>
          </div>

          {/* Monday-Sunday Streak Tracker Checkmarks */}
          <div className="flex items-center gap-2 sm:gap-3 bg-espresso-950/60 p-2.5 rounded-2xl border border-candle-gold-500/20 backdrop-blur-sm self-stretch md:self-auto justify-between sm:justify-start">
            {daysOfWeek.map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-1">
                <span className="text-[9px] font-mono uppercase text-dusty-pink-300">
                  {d.day}
                </span>
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    d.completed
                      ? 'bg-candle-gold-500 text-espresso-950 shadow-candle-glow'
                      : d.today
                      ? 'bg-burgundy-800 text-candle-gold-300 border border-dashed border-candle-gold-400 animate-pulse'
                      : 'bg-espresso-900 text-warm-oak-600 border border-espresso-800'
                  )}
                >
                  {d.completed ? '✓' : d.today ? '•' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Key Metrics CountUp Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SpotlightCard className="p-5 text-center">
          <CountUpStat value={stats.booksSaved} label="Volumes Shelved" />
        </SpotlightCard>
        <SpotlightCard className="p-5 text-center">
          <CountUpStat value={stats.currentlyReading} label="Currently Reading" />
        </SpotlightCard>
        <SpotlightCard className="p-5 text-center">
          <CountUpStat value={stats.completed} label="Volumes Finished" />
        </SpotlightCard>
        <SpotlightCard className="p-5 text-center">
          <CountUpStat value={stats.totalReadingHours} decimals={1} suffix="h" label="Time Immersed" />
        </SpotlightCard>
      </div>

      {/* 4. Annual Reading Goal & Progress */}
      <SpotlightCard className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-candle-gold-500" />
            <h3 className="font-serif text-base font-bold text-burgundy-950 dark:text-cream-50">
              {new Date().getFullYear()} Scholar’s Reading Challenge
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-candle-gold-600 dark:text-candle-gold-400">
            {stats.yearlyCompletedBooks} of {stats.yearlyTargetBooks} Books ({Math.round((stats.yearlyCompletedBooks / stats.yearlyTargetBooks) * 100)}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-cream-200 dark:bg-espresso-950 overflow-hidden p-0.5 border border-warm-oak-200/50 dark:border-espresso-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-burgundy-700 via-candle-gold-500 to-candle-gold-400 shadow-candle-glow transition-all duration-1000"
            style={{ width: `${(stats.yearlyCompletedBooks / stats.yearlyTargetBooks) * 100}%` }}
          />
        </div>
        <p className="text-[11px] text-warm-oak-600 dark:text-cream-300/80 font-reading mt-2">
          You are 1 book ahead of schedule for your annual reading target. Keep going!
        </p>
      </SpotlightCard>

      {/* 5. Continue Reading Carousel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-candle-gold-500" />
            Continue Reading
          </h2>
          <Link
            href="/dashboard/reading"
            className="text-xs font-semibold text-burgundy-800 dark:text-candle-gold-400 hover:underline"
          >
            All In-Progress →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentlyReading.map((book, idx) => (
            <div
              key={book.id}
              className="p-4 rounded-2xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 flex items-center gap-4 shadow-sm"
            >
              <div className="w-16 h-22 rounded bg-gradient-to-br from-burgundy-900 to-espresso-950 flex items-center justify-center text-candle-gold-300 font-serif font-bold text-xs shrink-0 border border-candle-gold-500/20">
                {book.title.slice(0, 1)}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono text-candle-gold-600 dark:text-candle-gold-400 italic">
                  &ldquo;{book.vibe}&rdquo;
                </span>
                <h4 className="font-serif text-sm font-bold text-burgundy-950 dark:text-cream-50 truncate">
                  {book.title}
                </h4>
                <p className="text-xs text-warm-oak-600 dark:text-dusty-pink-200">
                  by {book.author}
                </p>

                {/* Progress Mini Bar */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-cream-200 dark:bg-espresso-950 overflow-hidden">
                    <div
                      className="h-full bg-candle-gold-500 rounded-full"
                      style={{ width: idx === 0 ? '48%' : '22%' }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-warm-oak-600 dark:text-cream-300">
                    {idx === 0 ? '48%' : '22%'}
                  </span>
                </div>

                <div className="mt-2.5">
                  <Link
                    href={`/books/${book.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-burgundy-800 dark:text-candle-gold-400 hover:underline"
                  >
                    Resume Reading <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Personalized Recommendations Strip */}
      <div className="space-y-4 pt-4 border-t border-warm-oak-200/50 dark:border-espresso-800">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50 flex items-center gap-2">
            <Compass className="w-4 h-4 text-candle-gold-500" />
            Recommended for Your Sanctum
          </h2>
          <Link
            href="/explore"
            className="text-xs font-semibold text-burgundy-800 dark:text-candle-gold-400 hover:underline"
          >
            Explore All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recommendations.map((b) => (
            <Link key={b.id} href={`/books/${b.slug}`} className="flex justify-center">
              <TiltedBookCard
                title={b.title}
                author={b.author}
                coverImageUrl={b.coverImageUrl}
                category={b.category}
                vibe={b.vibe}
                isAvailable={b.hasDigitalEdition}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
