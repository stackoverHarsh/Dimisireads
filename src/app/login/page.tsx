'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { MagneticButton } from '@/components/react-bits/MagneticButton';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || 'Failed to authenticate.');
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected authentication error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-burgundy-900/10 dark:bg-burgundy-950/60 border border-burgundy-700/30 text-burgundy-900 dark:text-candle-gold-300 text-xs font-sans">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-warm-oak-700 dark:text-cream-300 mb-1.5 font-sans">
          Email or Username
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-warm-oak-400 dark:text-candle-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            placeholder="e.g. scholar@dimisireads.com"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/50 dark:border-candle-gold-500/20 text-xs sm:text-sm text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-warm-oak-700 dark:text-cream-300 font-sans">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-candle-gold-600 dark:text-candle-gold-400 hover:underline"
          >
            Forgot Key?
          </Link>
        </div>
        <div className="relative">
          <Lock className="w-4 h-4 text-warm-oak-400 dark:text-candle-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            required
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/50 dark:border-candle-gold-500/20 text-xs sm:text-sm text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500 transition-colors"
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
              Illuminating Sanctum...
            </>
          ) : (
            <>
              Light the Candle & Enter
              <ArrowRight className="w-4 h-4 text-candle-gold-300" />
            </>
          )}
        </MagneticButton>
      </div>

      <div className="pt-4 text-center border-t border-warm-oak-200/50 dark:border-espresso-800 text-xs text-warm-oak-600 dark:text-cream-300">
        <span>New to DimisiReads? </span>
        <Link
          href="/register"
          className="font-bold text-burgundy-800 dark:text-candle-gold-400 hover:underline"
        >
          Inscribe your name
        </Link>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <AuthSplitLayout
      title="Enter Your Sanctum"
      subtitle="Welcome back, scholar. Illuminate your evening reading ritual."
      quote="A reader lives a thousand lives before he dies. The man who never reads lives only one."
      quoteAuthor="George R.R. Martin"
    >
      <Suspense fallback={<div className="py-12 text-center text-xs text-warm-oak-500">Preparing sanctum entrance...</div>}>
        <LoginForm />
      </Suspense>
    </AuthSplitLayout>
  );
}
