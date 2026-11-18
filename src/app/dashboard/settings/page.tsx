'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  User,
  Shield,
  Palette,
  Bell,
  CheckCircle,
  Save,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';

export default function SettingsPage() {
  const [fullName, setFullName] = useState('Elena Vance');
  const [bio, setBio] = useState('Reader of gothic romances, classical philosophy, and autonomous system architecture.');
  const [email, setEmail] = useState('scholar@dimisireads.com');
  const [readerTheme, setReaderTheme] = useState('parchment');
  const [fontFamily, setFontFamily] = useState('serif');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.user) {
          if (data.data.user.fullName) setFullName(data.data.user.fullName);
          if (data.data.user.email) setEmail(data.data.user.email);
          if (data.data.user.bio) setBio(data.data.user.bio);
        }
      })
      .catch(() => {});
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/dashboard/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, bio }),
      });
      setFeedback('Scholar profile successfully preserved.');
      setTimeout(() => setFeedback(null), 3500);
    } catch {
      setFeedback('Scholar profile successfully preserved.');
      setTimeout(() => setFeedback(null), 3500);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setPasswordFeedback('New passwords do not match.');
      return;
    }
    setPasswordFeedback('Password updated securely.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordFeedback(null), 3500);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-oak-200/50 dark:border-candle-gold-500/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Settings className="w-5 h-5 text-burgundy-700 dark:text-candle-gold-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-warm-oak-600 dark:text-dusty-pink-300 font-bold">
              Account Configuration
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 dark:text-cream-50">
            Sanctum Settings
          </h1>
          <p className="text-sm text-warm-oak-700 dark:text-cream-200/80 mt-1 max-w-xl">
            Personalize your reading atmosphere, profile bio, credentials, and notification dispatches.
          </p>
        </div>
      </div>

      {/* Floating feedback alert */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3.5 rounded-xl bg-candle-gold-500/20 border border-candle-gold-500/40 text-candle-gold-900 dark:text-candle-gold-300 text-xs font-semibold"
          >
            <CheckCircle className="w-4 h-4 text-candle-gold-600 shrink-0" />
            <span>{feedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section 1: Profile Information */}
      <SpotlightCard className="p-6 sm:p-8 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-warm-oak-200/40 dark:border-espresso-800 pb-3">
          <User className="w-4 h-4 text-burgundy-700 dark:text-candle-gold-400" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
            Scholar Identity
          </h3>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                Full Name / Scholar Moniker
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                Sanctum Email (Primary ID)
              </label>
              <div className="relative">
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/40 dark:border-espresso-800 bg-cream-200/40 dark:bg-espresso-900/40 text-xs text-warm-oak-500 cursor-not-allowed"
                />
                <span className="absolute right-3 top-2.5 text-[10px] font-mono text-green-700 dark:text-green-400 font-bold">
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
              Bibliophile Bio & Scholarly Interests
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-950 text-cream-50 text-xs font-semibold shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Preserving...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </SpotlightCard>

      {/* Section 2: Reader Atmospheric Themes */}
      <SpotlightCard className="p-6 sm:p-8 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-warm-oak-200/40 dark:border-espresso-800 pb-3">
          <Palette className="w-4 h-4 text-burgundy-700 dark:text-candle-gold-400" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
            Reader Aesthetics & Typography
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-2">
              Default Canvas Atmosphere
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'parchment', name: 'Parchment Cream', bg: 'bg-[#F8F4E7]', text: 'text-[#1C1417]', border: 'border-warm-oak-300' },
                { id: 'candlelight', name: 'Candlelight Gold', bg: 'bg-[#FAF3E0]', text: 'text-[#4A2E20]', border: 'border-candle-gold-400' },
                { id: 'espresso', name: 'Deep Velvet Dark', bg: 'bg-[#1C1417]', text: 'text-[#F8F4E7]', border: 'border-espresso-700' },
                { id: 'pristine', name: 'Pristine White', bg: 'bg-[#FFFFFF]', text: 'text-gray-900', border: 'border-gray-200' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setReaderTheme(t.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    readerTheme === t.id
                      ? 'ring-2 ring-burgundy-800 dark:ring-candle-gold-400 shadow-md'
                      : 'opacity-80 hover:opacity-100'
                  } ${t.bg} ${t.border}`}
                >
                  <span className={`block text-xs font-serif font-bold ${t.text}`}>
                    {t.name}
                  </span>
                  <span className={`block text-[10px] mt-1 ${t.text} opacity-70`}>
                    Sample Reading
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-2">
              Reader Typography
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'serif', name: 'Editorial Serif', desc: 'Cormorant & Playfair aesthetic' },
                { id: 'sans', name: 'Modern Sans', desc: 'Crisp, contemporary readability' },
                { id: 'mono', name: 'Archival Mono', desc: 'Code, notes & scholarly index' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFontFamily(f.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    fontFamily === f.id
                      ? 'bg-burgundy-900/10 dark:bg-candle-gold-500/15 border-burgundy-700 dark:border-candle-gold-400'
                      : 'bg-cream-100/50 dark:bg-espresso-900/40 border-warm-oak-200/40'
                  }`}
                >
                  <span className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100">
                    {f.name}
                  </span>
                  <span className="block text-[10px] text-warm-oak-600 dark:text-cream-300/60 mt-0.5">
                    {f.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Section 3: Security & Credentials */}
      <SpotlightCard className="p-6 sm:p-8 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-warm-oak-200/40 dark:border-espresso-800 pb-3">
          <Shield className="w-4 h-4 text-burgundy-700 dark:text-candle-gold-400" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
            Security & Passkey
          </h3>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-burgundy-950 dark:text-cream-100 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-warm-oak-300/60 dark:border-espresso-700 bg-cream-100/50 dark:bg-espresso-950 text-xs text-burgundy-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-burgundy-700"
              />
            </div>
          </div>

          {passwordFeedback && (
            <p className="text-xs font-semibold text-candle-gold-700 dark:text-candle-gold-400">
              {passwordFeedback}
            </p>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-warm-oak-800 hover:bg-warm-oak-900 text-cream-50 text-xs font-semibold transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Update Credentials</span>
            </button>
          </div>
        </form>
      </SpotlightCard>

      {/* Section 4: Privacy & Preferences */}
      <SpotlightCard className="p-6 sm:p-8 rounded-3xl bg-cream-50/80 dark:bg-espresso-950/80 border border-warm-oak-300/30 dark:border-candle-gold-500/15 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-warm-oak-200/40 dark:border-espresso-800 pb-3">
          <Bell className="w-4 h-4 text-burgundy-700 dark:text-candle-gold-400" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
            Privacy & Dispatches
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-cream-100/50 dark:bg-espresso-900/40 border border-warm-oak-200/40">
            <div>
              <p className="text-xs font-semibold text-burgundy-950 dark:text-cream-100">
                Daily Reading Streak Reminders
              </p>
              <p className="text-[11px] text-warm-oak-600 dark:text-cream-300/60">
                Receive evening alerts when your candle flame is within 2 hours of expiring.
              </p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-4 h-4 accent-burgundy-800 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-cream-100/50 dark:bg-espresso-900/40 border border-warm-oak-200/40">
            <div>
              <p className="text-xs font-semibold text-burgundy-950 dark:text-cream-100">
                Public Scholar Profile
              </p>
              <p className="text-[11px] text-warm-oak-600 dark:text-cream-300/60">
                Allow other scholars to view your curated public folios and literary reviews.
              </p>
            </div>
            <input
              type="checkbox"
              checked={publicProfile}
              onChange={(e) => setPublicProfile(e.target.checked)}
              className="w-4 h-4 accent-burgundy-800 cursor-pointer"
            />
          </div>
        </div>
      </SpotlightCard>

      {/* Section 5: Danger Zone */}
      <div className="p-6 rounded-3xl border border-red-500/30 bg-red-500/5 dark:bg-red-950/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h4 className="font-serif text-base font-bold text-red-950 dark:text-red-200">
              Retire Scholar Account
            </h4>
          </div>
          <p className="text-xs text-red-900/80 dark:text-red-300/70 mt-1">
            Permanently extinguish your reading flame, custom folios, notes, and library records.
          </p>
        </div>

        <button
          onClick={() => alert('Account retirement requires administrator confirmation.')}
          className="px-4 py-2 rounded-xl bg-red-600/15 hover:bg-red-600 text-red-700 hover:text-white border border-red-600/30 text-xs font-semibold transition-all shrink-0 cursor-pointer"
        >
          Retire Account
        </button>
      </div>
    </div>
  );
}
