'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { MagneticButton } from '@/components/react-bits/MagneticButton';
import { Mail, Lock, User, AtSign, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match. Please verify your keys.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters with at least one letter and number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || 'Failed to create account.');
      }

      setSuccess('Your reader account has been created. A verification link has been dispatched to your email.');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected registration error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout
      title="Inscribe Your Name"
      subtitle="Join an enchanted sanctuary of readers, scholars, and thinkers."
      quote="That is part of the beauty of all literature. You discover that your longings are universal longings, that you’re not lonely and isolated from anyone. You belong."
      quoteAuthor="F. Scott Fitzgerald"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-burgundy-900/10 dark:bg-burgundy-950/60 border border-burgundy-700/30 text-burgundy-900 dark:text-candle-gold-300 text-xs font-sans">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-candle-gold-500/15 border border-candle-gold-500/40 text-candle-gold-800 dark:text-candle-gold-300 text-xs font-sans">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-oak-700 dark:text-cream-300 mb-1 font-sans">
            Full Scholarly Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-warm-oak-400 dark:text-candle-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. Mary Shelley"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/50 dark:border-candle-gold-500/20 text-xs text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-oak-700 dark:text-cream-300 mb-1 font-sans">
            Unique Username
          </label>
          <div className="relative">
            <AtSign className="w-4 h-4 text-warm-oak-400 dark:text-candle-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. mshelley_1818"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/50 dark:border-candle-gold-500/20 text-xs text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-oak-700 dark:text-cream-300 mb-1 font-sans">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-warm-oak-400 dark:text-candle-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="e.g. author@geneva.ch"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/50 dark:border-candle-gold-500/20 text-xs text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-oak-700 dark:text-cream-300 mb-1 font-sans">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-warm-oak-400 dark:text-candle-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Min 8 chars"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/50 dark:border-candle-gold-500/20 text-xs text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-oak-700 dark:text-cream-300 mb-1 font-sans">
              Confirm Key
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-warm-oak-400 dark:text-candle-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Re-enter key"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/50 dark:border-candle-gold-500/20 text-xs text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500"
              />
            </div>
          </div>
        </div>

        <div className="pt-3">
          <MagneticButton
            variant="burgundy"
            className="w-full justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-candle-gold-300" />
                Inscribing into Registry...
              </>
            ) : (
              <>
                Join The Sanctuary
                <ArrowRight className="w-4 h-4 text-candle-gold-300" />
              </>
            )}
          </MagneticButton>
        </div>

        <div className="pt-3 text-center border-t border-warm-oak-200/50 dark:border-espresso-800 text-xs text-warm-oak-600 dark:text-cream-300">
          <span>Already inscribed in the register? </span>
          <Link
            href="/login"
            className="font-bold text-burgundy-800 dark:text-candle-gold-400 hover:underline"
          >
            Enter your sanctum
          </Link>
        </div>
      </form>
    </AuthSplitLayout>
  );
}
