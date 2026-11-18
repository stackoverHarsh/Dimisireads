import React from 'react';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/guards';
import { AdminService } from '@/services/admin.service';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { CountUpStat } from '@/components/react-bits/CountUpStat';
import {
  BookOpen,
  Users,
  Star,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Download,
  FileCheck,
  Activity,
  Plus,
} from 'lucide-react';

export default async function AdminOverviewPage() {
  const admin = await requireAdmin('/admin');
  const [kpis, analytics, recentLogs] = await Promise.all([
    AdminService.getOverviewKPIs(),
    AdminService.getAnalyticsData(),
    AdminService.getActivityLogs(5),
  ]);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Archival Backoffice
            </span>
            <span className="px-2 py-0.5 rounded-full bg-candle-gold-500/20 text-candle-gold-800 dark:text-candle-gold-300 text-[10px] font-mono font-bold">
              {admin.roles.join(' • ')}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Overview & Operational Health
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Welcome back, {admin.fullName}. Real-time monitoring across digital licensing, user clearance, and catalogue assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/books"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 font-serif text-xs font-semibold shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add / Import Book</span>
          </Link>
          <Link
            href="/admin/inventory"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-candle-gold-500/20 hover:bg-candle-gold-500/30 text-candle-gold-900 dark:text-candle-gold-200 border border-candle-gold-500/40 text-xs font-semibold transition-all"
          >
            <FileCheck className="w-4 h-4 text-candle-gold-600 dark:text-candle-gold-400" />
            <span>Verify Licence</span>
          </Link>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <SpotlightCard className="p-6 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Total Books
            </span>
            <div className="w-8 h-8 rounded-xl bg-burgundy-900/10 dark:bg-candle-gold-500/15 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-burgundy-800 dark:text-candle-gold-400" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-burgundy-950 dark:text-cream-50">
            <CountUpStat value={kpis.totalBooks} />
          </div>
          <p className="text-[11px] text-warm-oak-600 dark:text-cream-300/60 mt-1">
            {kpis.licencesVerified} verified legal digital assets
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-6 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Registered Users
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-burgundy-950 dark:text-cream-50">
            <CountUpStat value={kpis.registeredUsers} />
          </div>
          <p className="text-[11px] text-warm-oak-600 dark:text-cream-300/60 mt-1">
            +18 new readers this month
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-6 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Total Reviews
            </span>
            <div className="w-8 h-8 rounded-xl bg-candle-gold-500/20 flex items-center justify-center">
              <Star className="w-4 h-4 text-candle-gold-600 dark:text-candle-gold-400 fill-candle-gold-400" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-burgundy-950 dark:text-cream-50">
            <CountUpStat value={kpis.totalReviews} />
          </div>
          <p className="text-[11px] text-warm-oak-600 dark:text-cream-300/60 mt-1">
            94% 4 & 5-star scholarly critiques
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-6 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Reported Reviews
            </span>
            <div className="w-8 h-8 rounded-xl bg-red-500/15 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-red-700 dark:text-red-400">
            <CountUpStat value={kpis.reportedReviews} />
          </div>
          <Link
            href="/admin/moderation"
            className="text-[11px] text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 mt-1 font-semibold"
          >
            <span>Review moderation queue</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </SpotlightCard>
      </div>

      {/* Analytics Charts & Trends Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Downloads Trend (SVG Chart) */}
        <SpotlightCard className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-candle-gold-500" />
                <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
                  Total Downloads & Reading Sessions
                </h3>
              </div>
              <p className="text-xs text-warm-oak-600 dark:text-cream-300/70 mt-1">
                Authorized downloads and reader streaming activity (last 6 months)
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-candle-gold-700 dark:text-candle-gold-300 bg-candle-gold-500/15 px-2.5 py-1 rounded-full">
              +28% Growth
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-4 pt-4 border-b border-warm-oak-200/50 dark:border-espresso-800">
            {analytics.monthlyDownloads.map((item) => {
              const maxDownloads = 1800;
              const heightPercent = Math.round((item.downloads / maxDownloads) * 100);
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    {item.downloads}
                  </span>
                  <div className="w-full bg-cream-200 dark:bg-espresso-900 rounded-t-xl overflow-hidden h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-burgundy-900 via-burgundy-800 to-candle-gold-500 rounded-t-xl transition-all duration-500"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-warm-oak-700 dark:text-cream-300">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </SpotlightCard>

        {/* Popular Categories Distribution */}
        <SpotlightCard className="p-6 sm:p-8 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50 mb-1">
              Category Popularity
            </h3>
            <p className="text-xs text-warm-oak-600 dark:text-cream-300/70 mb-5">
              Breakdown by active user reading folios
            </p>

            <div className="space-y-4">
              {analytics.categoryDistribution.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-burgundy-950 dark:text-cream-100 truncate">
                      {cat.name}
                    </span>
                    <span className="font-mono text-candle-gold-700 dark:text-candle-gold-400">
                      {cat.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-cream-200 dark:bg-espresso-900 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-burgundy-700 dark:bg-candle-gold-500"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-warm-oak-200/40 dark:border-espresso-800 mt-6 flex justify-between items-center text-xs">
            <span className="text-warm-oak-600 dark:text-cream-300/70">
              Total Categories: 4
            </span>
            <Link
              href="/admin/categories"
              className="text-burgundy-800 dark:text-candle-gold-400 hover:underline font-semibold"
            >
              Manage
            </Link>
          </div>
        </SpotlightCard>
      </div>

      {/* Bottom Grid: Most Downloaded Volumes & Recent Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Downloaded Volumes */}
        <SpotlightCard className="p-6 sm:p-8 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
              Top Downloaded Editions
            </h3>
            <Link
              href="/admin/inventory"
              className="text-xs font-semibold text-burgundy-800 dark:text-candle-gold-400 hover:underline"
            >
              Full Inventory
            </Link>
          </div>

          <div className="divide-y divide-warm-oak-200/40 dark:divide-espresso-800">
            {analytics.topDownloadedBooks.map((b) => (
              <div key={b.id} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-burgundy-950 dark:text-cream-50">
                    {b.title}
                  </h4>
                  <p className="text-xs text-warm-oak-600 dark:text-cream-300/70">
                    by {b.author}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-xs font-mono font-bold text-burgundy-900 dark:text-candle-gold-300">
                    <Download className="w-3.5 h-3.5 text-candle-gold-500" />
                    <span>{b.downloads}</span>
                  </div>
                  <span className="text-[10px] text-warm-oak-500 dark:text-cream-300/50">
                    Rating: {b.rating} ★
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Immutable Audit Activity Log Stream */}
        <SpotlightCard className="p-6 sm:p-8 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-candle-gold-500" />
              <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
                Recent Audit Trail
              </h3>
            </div>
            <Link
              href="/admin/logs"
              className="text-xs font-semibold text-burgundy-800 dark:text-candle-gold-400 hover:underline"
            >
              All Logs
            </Link>
          </div>

          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-2xl bg-cream-100/50 dark:bg-espresso-900/40 border border-warm-oak-200/40 text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <span className="text-burgundy-950 dark:text-cream-50">
                      {log.adminName}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10">
                      {log.adminRole}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-warm-oak-500 dark:text-dusty-pink-300">
                    {log.timestamp}
                  </span>
                </div>
                <p className="text-warm-oak-700 dark:text-cream-200/80 font-mono text-[11px]">
                  {log.action} • {log.details}
                </p>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
