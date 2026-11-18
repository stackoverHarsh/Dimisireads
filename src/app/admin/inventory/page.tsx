'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  X,
} from 'lucide-react';

type LicenceCategoryType =
  | 'PUBLIC_DOMAIN'
  | 'DIMISI_OWNED'
  | 'EXPLICIT_DISTRIBUTION_GRANTED'
  | 'OPEN_PERMISSIVE';

interface InventoryItem {
  id: string;
  bookId: string;
  title: string;
  author: string;
  isbn13: string;
  format: string;
  fileSizeBytes: number;
  licenceCategory: string;
  verificationStatus: string;
  licensorName: string;
  territorialRights: string;
  licenceAgreementRef: string;
  isDownloadAllowed: boolean;
  isOnlineReadAllowed: boolean;
  downloadCount: number;
  sha256Checksum: string;
}

export default function AdminInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  // Form State
  const [category, setCategory] = useState<LicenceCategoryType>('PUBLIC_DOMAIN');
  const [licensorName, setLicensorName] = useState('');
  const [licensorContactEmail, setLicensorContactEmail] = useState('');
  const [agreementRef, setAgreementRef] = useState('');
  const [territorialRights, setTerritorialRights] = useState('WORLDWIDE');
  const [isDownloadAllowed, setIsDownloadAllowed] = useState(true);
  const [isOnlineReadAllowed, setIsOnlineReadAllowed] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/inventory')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.inventory) {
          setItems(data.data.inventory);
        }
      })
      .catch(() => {});
  }, []);

  const openVerifyModal = (item: InventoryItem) => {
    setSelectedItem(item);
    setCategory(
      (item.licenceCategory as LicenceCategoryType) || 'PUBLIC_DOMAIN'
    );
    setLicensorName(item.licensorName || '');
    setAgreementRef(item.licenceAgreementRef || `DIMISI-LIC-${Date.now()}`);
    setIsDownloadAllowed(item.isDownloadAllowed);
    setIsOnlineReadAllowed(item.isOnlineReadAllowed);
    setIsVerifyModalOpen(true);
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/inventory/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: selectedItem.bookId,
          category,
          licensorName: licensorName.trim(),
          licensorContactEmail: licensorContactEmail.trim() || undefined,
          licenceAgreementRef: agreementRef.trim() || undefined,
          territorialRights,
          isDownloadAllowed,
          isOnlineReadAllowed,
        }),
      });

      const data = await res.json();
      if (data?.success) {
        setItems((prev) =>
          prev.map((i) =>
            i.bookId === selectedItem.bookId
              ? {
                  ...i,
                  verificationStatus: 'VERIFIED_ACTIVE',
                  licenceCategory: category,
                  licensorName,
                  isDownloadAllowed,
                  isOnlineReadAllowed,
                }
              : i
          )
        );
        setIsVerifyModalOpen(false);
        setNotification(`Licence for "${selectedItem.title}" verified and published under strict compliance.`);
        setTimeout(() => setNotification(null), 4000);
      } else {
        alert(data?.error?.message || 'Licence verification failed.');
      }
    } catch {
      alert('Network error verifying licence.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="w-5 h-5 text-candle-gold-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-candle-gold-700 dark:text-candle-gold-300 font-bold">
              Critical Compliance Module
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Digital Inventory & Licensing Hub
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Strict separation between catalogue metadata and verified digital inventory. Downloads and online reading are blocked unless legal provenance is confirmed.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-candle-gold-500/15 border border-candle-gold-500/30 text-xs font-mono font-semibold text-candle-gold-900 dark:text-candle-gold-300">
          Server-Side Guardrail: ACTIVE
        </div>
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

      {/* Inventory Table */}
      <div className="rounded-3xl border border-warm-oak-300/30 dark:border-candle-gold-500/15 bg-cream-50/80 dark:bg-espresso-950/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-warm-oak-200/50 dark:border-espresso-800 bg-cream-100/60 dark:bg-espresso-900/60 text-warm-oak-700 dark:text-cream-200 font-mono text-[11px] uppercase tracking-wider">
                <th className="p-4">Volume</th>
                <th className="p-4">Format & Checksum</th>
                <th className="p-4">Licence Type</th>
                <th className="p-4">Provenance Status</th>
                <th className="p-4">Downloads</th>
                <th className="p-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-oak-200/40 dark:divide-espresso-800">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-cream-100/40 dark:hover:bg-espresso-900/30 transition-colors"
                >
                  <td className="p-4">
                    <span className="font-serif font-bold text-burgundy-950 dark:text-cream-50 block">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-warm-oak-600 dark:text-cream-300/70">
                      by {item.author} • Ref: {item.licenceAgreementRef}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px]">
                    <span className="font-bold text-burgundy-900 dark:text-candle-gold-300 block">
                      {item.format} • {(item.fileSizeBytes / 1000000).toFixed(1)} MB
                    </span>
                    <span className="text-[10px] text-warm-oak-500 dark:text-cream-300/50 truncate max-w-[120px] block" title={item.sha256Checksum}>
                      SHA: {item.sha256Checksum.slice(0, 12)}...
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-candle-gold-500/15 text-candle-gold-800 dark:text-candle-gold-300 font-mono text-[10px] font-bold">
                      {item.licenceCategory}
                    </span>
                  </td>
                  <td className="p-4">
                    {item.verificationStatus === 'VERIFIED_ACTIVE' ? (
                      <span className="flex items-center gap-1.5 text-green-700 dark:text-green-400 font-semibold font-mono text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>VERIFIED ACTIVE</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold font-mono text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>PENDING AUDIT</span>
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-mono font-bold text-burgundy-900 dark:text-candle-gold-300">
                    {item.downloadCount}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => openVerifyModal(item)}
                      className="px-3.5 py-1.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      Audit & Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mandatory Rights Verification Modal */}
      <AnimatePresence>
        {isVerifyModalOpen && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-cream-50 dark:bg-espresso-900 rounded-3xl border border-warm-oak-300/40 dark:border-candle-gold-500/20 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsVerifyModalOpen(false)}
                className="absolute top-5 right-5 p-1 rounded-full text-warm-oak-500 hover:text-burgundy-950 dark:hover:text-cream-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5 text-candle-gold-500" />
                <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
                  Legal Rights Audit & Authorization
                </h3>
              </div>
              <p className="text-xs text-warm-oak-700 dark:text-cream-200/80 mb-6">
                Mandatory compliance verification for <strong className="font-serif">{selectedItem.title}</strong>. This form executes server-side validation and records an immutable log in <code className="font-mono text-candle-gold-700">AdminActivityLog</code>.
              </p>

              <form onSubmit={handleVerifySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                    Verified Licence Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as LicenceCategoryType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
                  >
                    <option value="PUBLIC_DOMAIN">PUBLIC_DOMAIN (Life + 70 yrs / Historical)</option>
                    <option value="DIMISI_OWNED">DIMISI_OWNED (Proprietary Publication)</option>
                    <option value="EXPLICIT_DISTRIBUTION_GRANTED">EXPLICIT_DISTRIBUTION_GRANTED (Formal Contract)</option>
                    <option value="OPEN_PERMISSIVE">OPEN_PERMISSIVE (CC-BY, CC0, Project Gutenberg)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                    Licensor Entity / Provenance Source *
                  </label>
                  <input
                    type="text"
                    required
                    value={licensorName}
                    onChange={(e) => setLicensorName(e.target.value)}
                    placeholder="e.g. Project Gutenberg Literary Archive Foundation"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                    Licensor Contact Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={licensorContactEmail}
                    onChange={(e) => setLicensorContactEmail(e.target.value)}
                    placeholder="rights-desk@archive.org"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                      Licence Reference Code
                    </label>
                    <input
                      type="text"
                      value={agreementRef}
                      onChange={(e) => setAgreementRef(e.target.value)}
                      placeholder="DIMISI-LIC-2026-X"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                      Territorial Rights
                    </label>
                    <input
                      type="text"
                      value={territorialRights}
                      onChange={(e) => setTerritorialRights(e.target.value)}
                      placeholder="WORLDWIDE"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700 font-mono"
                    />
                  </div>
                </div>

                {/* Flags */}
                <div className="p-3.5 rounded-2xl bg-cream-100/60 dark:bg-espresso-950/60 border border-warm-oak-300/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-burgundy-950 dark:text-cream-100">
                      Enable Online Streaming Reader
                    </span>
                    <input
                      type="checkbox"
                      checked={isOnlineReadAllowed}
                      onChange={(e) => setIsOnlineReadAllowed(e.target.checked)}
                      className="w-4 h-4 accent-burgundy-800 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-burgundy-950 dark:text-cream-100">
                      Enable Signed Time-Limited Downloads
                    </span>
                    <input
                      type="checkbox"
                      checked={isDownloadAllowed}
                      onChange={(e) => setIsDownloadAllowed(e.target.checked)}
                      className="w-4 h-4 accent-burgundy-800 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsVerifyModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-warm-oak-700 dark:text-cream-200 hover:bg-cream-200/50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 font-semibold shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? 'Auditing & Publishing...' : 'Authorize & Publish Digital Asset'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
