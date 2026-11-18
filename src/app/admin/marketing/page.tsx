'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone,
  Mail,
  Download,
  CheckCircle,
} from 'lucide-react';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';

interface Subscriber {
  email: string;
  source: string;
  subscribedAt: string;
}

interface Campaign {
  id: string;
  name: string;
  targetVibe: string;
  status: string;
  bannerHeadline: string;
}

export default function AdminMarketingPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [referrals, setReferrals] = useState({
    totalReferrals: 86,
    qualifiedReaders: 54,
    pointsAwarded: 2700,
  });
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/marketing')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.marketing) {
          setSubscribers(data.data.marketing.subscribers);
          setCampaigns(data.data.marketing.campaigns);
          setReferrals(data.data.marketing.referrals);
        }
      })
      .catch(() => {});
  }, []);

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Email,Source,SubscribedAt']
        .concat(subscribers.map((s) => `${s.email},${s.source},${s.subscribedAt}`))
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dimisireads_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setNotification('Exported subscriber ledger to CSV.');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Megaphone className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Audience & Growth
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Marketing & Reader Campaigns
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Oversee newsletter dispatches, homepage hero exhibitions, and compliant reader referral rewards.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 font-serif text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Subscribers (CSV)</span>
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

      {/* Referrals Metric Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <SpotlightCard className="p-6 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
          <span className="text-xs font-mono uppercase tracking-wider text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
            Total Reader Referrals
          </span>
          <div className="font-serif text-3xl font-bold text-burgundy-950 dark:text-cream-50 mt-1">
            {referrals.totalReferrals}
          </div>
          <p className="text-[11px] text-warm-oak-600 dark:text-cream-300/60 mt-1">
            Compliant invite links shared
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-6 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
          <span className="text-xs font-mono uppercase tracking-wider text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
            Qualified Readers
          </span>
          <div className="font-serif text-3xl font-bold text-candle-gold-700 dark:text-candle-gold-400 mt-1">
            {referrals.qualifiedReaders}
          </div>
          <p className="text-[11px] text-warm-oak-600 dark:text-cream-300/60 mt-1">
            Completed their first verified public book
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-6 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
          <span className="text-xs font-mono uppercase tracking-wider text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
            Sanctum Reward Points
          </span>
          <div className="font-serif text-3xl font-bold text-burgundy-950 dark:text-cream-50 mt-1">
            {referrals.pointsAwarded} pts
          </div>
          <p className="text-[11px] text-warm-oak-600 dark:text-cream-300/60 mt-1">
            No Google Reviews gating (strict policy compliance)
          </p>
        </SpotlightCard>
      </div>

      {/* Active Promotional Exhibitions */}
      {campaigns.length > 0 && (
        <SpotlightCard className="p-6 sm:p-8 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="w-4 h-4 text-candle-gold-500" />
            <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
              Active Campaigns & Exhibitions ({campaigns.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-cream-100/50 dark:bg-espresso-900/40 border border-warm-oak-200/40 text-xs"
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-serif font-bold text-sm text-burgundy-950 dark:text-cream-50">
                    {c.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/15 text-green-700 dark:text-green-400 font-mono text-[10px] font-bold">
                    {c.status}
                  </span>
                </div>
                <p className="text-[11px] text-warm-oak-600 dark:text-cream-300/70">
                  Target Vibe: {c.targetVibe}
                </p>
                <p className="text-xs text-warm-oak-800 dark:text-cream-200/90 mt-2 italic">
                  &ldquo;{c.bannerHeadline}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </SpotlightCard>
      )}

      {/* Subscribers Table */}
      <SpotlightCard className="p-6 sm:p-8 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-candle-gold-500" />
            <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
              Newsletter Dispatches ({subscribers.length})
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-warm-oak-200/50 dark:border-espresso-800 text-warm-oak-600 dark:text-cream-300 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-2.5">Email Address</th>
                <th className="py-2.5">Acquisition Source</th>
                <th className="py-2.5 text-right">Subscription Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-oak-200/40 dark:divide-espresso-800">
              {subscribers.map((s) => (
                <tr key={s.email} className="hover:bg-cream-100/40 dark:hover:bg-espresso-900/40">
                  <td className="py-2.5 font-mono text-burgundy-950 dark:text-cream-50">
                    {s.email}
                  </td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[10px]">
                      {s.source}
                    </span>
                  </td>
                  <td className="py-2.5 text-right font-mono text-warm-oak-500 dark:text-dusty-pink-300">
                    {s.subscribedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SpotlightCard>
    </div>
  );
}
