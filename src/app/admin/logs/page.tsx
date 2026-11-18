'use client';

import React, { useState, useEffect } from 'react';
import {
  History,
  Search,
} from 'lucide-react';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';

interface ActivityLogItem {
  id: string;
  adminName: string;
  adminRole: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  timestamp: string;
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/logs')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.logs) {
          setLogs(data.data.logs);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.adminName.toLowerCase().includes(search.toLowerCase()) ||
      l.entityId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <History className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Provenance & Accountability
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Audit Activity Logs
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Immutable system audit records tracking digital rights verifications, metadata imports, role elevations, and moderation actions.
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-candle-gold-500/15 border border-candle-gold-500/30 text-candle-gold-900 dark:text-candle-gold-300">
          Append-Only Ledger: ACTIVE
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-2xl bg-cream-100/50 dark:bg-espresso-900/40 border border-warm-oak-300/30">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-warm-oak-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by action, administrator, or entity..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
          />
        </div>
      </div>

      {/* Activity Logs Table */}
      <SpotlightCard className="p-6 sm:p-8 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-warm-oak-200/50 dark:border-espresso-800 text-warm-oak-600 dark:text-cream-300 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3">Timestamp</th>
                <th className="py-3">Administrator</th>
                <th className="py-3">Action Type</th>
                <th className="py-3">Target Entity</th>
                <th className="py-3">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-oak-200/40 dark:divide-espresso-800 font-mono">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-cream-100/40 dark:hover:bg-espresso-900/30">
                  <td className="py-3.5 text-warm-oak-500 dark:text-dusty-pink-300 text-[11px]">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5">
                    <span className="font-bold text-burgundy-950 dark:text-cream-50 block">
                      {log.adminName}
                    </span>
                    <span className="text-[10px] text-candle-gold-700 dark:text-candle-gold-400">
                      {log.adminRole}
                    </span>
                  </td>
                  <td className="py-3.5 font-bold text-burgundy-900 dark:text-candle-gold-300 text-[11px]">
                    {log.action}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[10px]">
                      {log.entityType} ({log.entityId})
                    </span>
                  </td>
                  <td className="py-3.5 text-warm-oak-700 dark:text-cream-200 text-[11px] font-sans">
                    {log.details}
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
