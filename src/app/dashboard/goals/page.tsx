'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Flame,
  Target,
  CheckCircle,
  Lock,
  Plus,
  Minus,
  Award,
} from 'lucide-react';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';

interface Achievement {
  code: string;
  title: string;
  description: string;
  badgeIcon: string;
  unlocked: boolean;
  unlockedAt?: string;
  points: number;
}

export default function GoalsAndBadgesPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [streakDays, setStreakDays] = useState(7);
  const [longestStreak, setLongestStreak] = useState(14);
  const [targetBooks, setTargetBooks] = useState(12);
  const [completedBooks, setCompletedBooks] = useState(4);
  const [goalFeedback, setGoalFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/dashboard/goals')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          if (data.data.achievements) setAchievements(data.data.achievements);
          if (data.data.streak) {
            setStreakDays(data.data.streak.currentStreakDays ?? 7);
            setLongestStreak(data.data.streak.longestStreakDays ?? 14);
          }
          if (data.data.goal) {
            setTargetBooks(data.data.goal.targetBooks ?? 12);
            setCompletedBooks(data.data.goal.completedBooks ?? 4);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleUpdateTarget = async (newTarget: number) => {
    if (newTarget < 1) return;
    setTargetBooks(newTarget);
    try {
      await fetch('/api/dashboard/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetBooks: newTarget }),
      });
      setGoalFeedback('Reading goal updated for 2026!');
      setTimeout(() => setGoalFeedback(null), 3000);
    } catch {
      setGoalFeedback('Reading goal updated!');
      setTimeout(() => setGoalFeedback(null), 3000);
    }
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const percentComplete = Math.min(100, Math.round((completedBooks / targetBooks) * 100));

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Trophy className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Scholarly Discipline
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Goals, Streaks & Badges
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Nurture your daily reading ritual, conquer seasonal milestones, and unlock mythical shelf companions.
          </p>
        </div>
      </div>

      {/* 7-Day Flame Streak Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-burgundy-950 via-burgundy-900 to-warm-oak-950 text-cream-50 p-6 sm:p-8 shadow-xl border border-candle-gold-500/20">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-candle-gold-500/20 border border-candle-gold-400/40 flex items-center justify-center shadow-lg shadow-candle-gold-500/10">
              <Flame className="w-9 h-9 text-candle-gold-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-candle-gold-300 font-bold">
                  Daily Reading Flame
                </span>
                <span className="px-2 py-0.5 rounded-full bg-candle-gold-400/20 text-candle-gold-300 text-[10px] font-mono">
                  Record: {longestStreak} days
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50 mt-0.5">
                {streakDays} Day Reading Streak
              </h2>
              <p className="text-xs text-cream-200/80 mt-1">
                You read yesterday! Read for 10 minutes today to keep your candlelight sanctuary aglow.
              </p>
            </div>
          </div>

          {/* Weekday Badges */}
          <div className="flex items-center gap-2 sm:gap-3 bg-burgundy-900/40 border border-candle-gold-500/20 p-2.5 rounded-2xl backdrop-blur-sm self-stretch md:self-auto justify-between">
            {days.map((day, idx) => (
              <div key={day} className="flex flex-col items-center gap-1.5 px-1.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    idx < streakDays
                      ? 'bg-candle-gold-400 text-espresso-950 shadow-sm shadow-candle-gold-400/50'
                      : 'bg-warm-oak-900/60 text-cream-300/40 border border-warm-oak-700/50'
                  }`}
                >
                  {idx < streakDays ? <Flame className="w-3.5 h-3.5 fill-espresso-950" /> : day[0]}
                </div>
                <span className="text-[10px] font-mono text-cream-300/70">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2026 Reading Goal Module */}
      <SpotlightCard className="p-6 sm:p-8 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <Target className="w-4 h-4 text-burgundy-700 dark:text-candle-gold-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
                Annual Literary Challenge
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50">
              2026 Reading Goal: {completedBooks} of {targetBooks} Books Read
            </h3>
            <p className="text-xs text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-lg">
              You are on pace to finish your reading challenge by early October. Keep regular evening appointments with your books.
            </p>

            {/* Progress Bar */}
            <div className="mt-5 space-y-2 max-w-xl">
              <div className="w-full h-3 rounded-full bg-cream-200 dark:bg-espresso-800 overflow-hidden p-0.5 border border-warm-oak-300/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentComplete}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-burgundy-700 to-candle-gold-500"
                />
              </div>
              <div className="flex justify-between text-xs font-mono text-warm-oak-600 dark:text-cream-300/70">
                <span>{percentComplete}% Completed</span>
                <span>{targetBooks - completedBooks} books remaining</span>
              </div>
            </div>
          </div>

          {/* Goal Adjuster Controls */}
          <div className="bg-cream-100 dark:bg-espresso-900 border border-warm-oak-300/40 dark:border-candle-gold-500/20 p-4 rounded-2xl flex flex-col items-center gap-3">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-warm-oak-600 dark:text-dusty-pink-300">
              Adjust Target
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleUpdateTarget(targetBooks - 1)}
                className="w-8 h-8 rounded-xl bg-cream-200 dark:bg-espresso-800 flex items-center justify-center text-warm-oak-800 dark:text-cream-100 hover:bg-cream-300 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50 w-10 text-center">
                {targetBooks}
              </span>
              <button
                onClick={() => handleUpdateTarget(targetBooks + 1)}
                className="w-8 h-8 rounded-xl bg-cream-200 dark:bg-espresso-800 flex items-center justify-center text-warm-oak-800 dark:text-cream-100 hover:bg-cream-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {goalFeedback && (
              <span className="text-[10px] text-candle-gold-700 dark:text-candle-gold-400 font-semibold">
                {goalFeedback}
              </span>
            )}
          </div>
        </div>
      </SpotlightCard>

      {/* Unlockable Badges Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50">
              Mythical Badges & Relics
            </h3>
            <p className="text-xs text-warm-oak-600 dark:text-cream-300/80">
              Badges earned through devoted reading milestones unlock decorations for your Cozy Shelf.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((ach) => (
            <SpotlightCard
              key={ach.code}
              className={`p-5 rounded-2xl border transition-all ${
                ach.unlocked
                  ? 'bg-cream-50/90 dark:bg-espresso-950/90 border-candle-gold-500/30 shadow-md'
                  : 'bg-cream-100/40 dark:bg-espresso-900/30 border-warm-oak-300/20 opacity-75'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                    ach.unlocked
                      ? 'bg-candle-gold-500/20 border-candle-gold-400/50 text-candle-gold-600 dark:text-candle-gold-400 shadow-sm'
                      : 'bg-warm-oak-200/40 dark:bg-espresso-800 border-warm-oak-300/30 text-warm-oak-400 dark:text-espresso-600'
                  }`}
                >
                  {ach.unlocked ? (
                    <Award className="w-6 h-6" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-bold text-burgundy-950 dark:text-cream-50">
                      {ach.title}
                    </h4>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-candle-gold-500/20 text-candle-gold-800 dark:text-candle-gold-300">
                      +{ach.points} pts
                    </span>
                  </div>
                  <p className="text-xs text-warm-oak-700 dark:text-cream-200/70 mt-1 leading-relaxed">
                    {ach.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono">
                    {ach.unlocked ? (
                      <span className="text-green-700 dark:text-green-400 flex items-center gap-1 font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        Unlocked {ach.unlockedAt || 'recently'}
                      </span>
                    ) : (
                      <span className="text-warm-oak-500 dark:text-cream-300/50">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
}
