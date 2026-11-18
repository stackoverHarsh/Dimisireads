'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { MagneticButton } from '@/components/react-bits/MagneticButton';
import { Lock, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters with at least one letter and number.');
      return;
    }

    if (!token) {
      setError('Reset token is missing or malformed.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'Failed to reset password.');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while resetting your password.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="py-6 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-candle-gold-500 mx-auto" />
        <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
          Key Restored
        </h3>
        <p className="text-xs text-warm-oak-700 dark:text-cream-300 font-reading">
          Your password has been successfully forged. Redirecting you to login...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-burgundy-900/10 dark:bg-burgundy-950/60 border border-burgundy-700/30 text-burgundy-900 dark:text-candle-gold-300 text-xs font-sans">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-warm-oak-700 dark:text-cream-300 mb-1.5 font-sans">
          New Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-warm-oak-400 dark:text-candle-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            required
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/50 dark:border-candle-gold-500/20 text-xs sm:text-sm text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-warm-oak-700 dark:text-cream-300 mb-1.5 font-sans">
          Confirm New Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-warm-oak-400 dark:text-candle-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            required
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/50 dark:border-candle-gold-500/20 text-xs sm:text-sm text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500"
          />
        </div>
      </div>

      <div className="pt-2">
        <MagneticButton
          variant="burgundy"
          className="w-full justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-candle-gold-300" />
              Forging New Key...
            </>
          ) : (
            <>
              Update Password Key
              <ArrowRight className="w-4 h-4 text-candle-gold-300" />
            </>
          )}
        </MagneticButton>
      </div>

      <div className="pt-4 text-center border-t border-warm-oak-200/50 dark:border-espresso-800 text-xs text-warm-oak-600 dark:text-cream-300">
        <Link
          href="/login"
          className="font-semibold text-warm-oak-700 dark:text-dusty-pink-300 hover:text-burgundy-900"
        >
          Cancel and Return to Login
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthSplitLayout
      title="Forge New Key"
      subtitle="Craft a new cryptographic password for your sanctum vault."
      quote="The mind is not a vessel to be filled, but a fire to be kindled."
      quoteAuthor="Plutarch"
    >
      <Suspense fallback={<div className="py-12 text-center text-xs text-warm-oak-500">Retrieving reset key...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthSplitLayout>
  );
}
