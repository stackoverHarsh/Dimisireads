'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { MagneticButton } from '@/components/react-bits/MagneticButton';
import { Mail, ArrowLeft, CheckCircle2, Loader2, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout
      title="Recover Your Key"
      subtitle="Enter your email to receive an archival password illumination link."
      quote="It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife."
      quoteAuthor="Jane Austen"
    >
      {submitted ? (
        <div className="py-6 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-candle-gold-500 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
            Missive Dispatched
          </h3>
          <p className="text-xs text-warm-oak-700 dark:text-cream-300 font-reading leading-relaxed">
            If your email is registered with DimisiReads, an illumination link has been sent. Check your inbox (or dev server console).
          </p>
          <div className="pt-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy-800 dark:text-candle-gold-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Sanctum Gate
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-warm-oak-700 dark:text-cream-300 mb-1.5 font-sans">
              Account Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-warm-oak-400 dark:text-candle-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="e.g. reader@dimisireads.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-50 dark:bg-espresso-900 border border-warm-oak-300/50 dark:border-candle-gold-500/20 text-xs sm:text-sm text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500"
              />
            </div>
          </div>

          <MagneticButton
            variant="burgundy"
            className="w-full justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-candle-gold-300" />
                Dispatching Missive...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-candle-gold-300" />
                Send Recovery Key
              </>
            )}
          </MagneticButton>

          <div className="pt-4 text-center border-t border-warm-oak-200/50 dark:border-espresso-800 text-xs text-warm-oak-600 dark:text-cream-300">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 font-semibold text-warm-oak-700 dark:text-dusty-pink-300 hover:text-burgundy-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </AuthSplitLayout>
  );
}
