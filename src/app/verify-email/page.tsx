'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { CheckCircle2, AlertCircle, Loader2, BookOpen } from 'lucide-react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState<string>('Illuminating your verification credentials...');

  useEffect(() => {
    if (!token || !email) {
      setStatus('error');
      setMessage('Verification parameters are absent or invalid.');
      return;
    }

    const runVerification = async () => {
      try {
        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, email }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error?.message || 'Verification failed.');
        }

        setStatus('success');
        setMessage(data.data?.message || 'Your email has been verified.');
      } catch (err: unknown) {
        setStatus('error');
        if (err instanceof Error) {
          setMessage(err.message);
        } else {
          setMessage('An unexpected error occurred during verification.');
        }
      }
    };

    runVerification();
  }, [token, email]);

  return (
    <div className="py-8 text-center space-y-4">
      {status === 'verifying' && (
        <>
          <Loader2 className="w-12 h-12 text-candle-gold-500 animate-spin mx-auto" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
            Verifying Credentials
          </h3>
          <p className="text-xs text-warm-oak-700 dark:text-cream-300 font-reading">
            {message}
          </p>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircle2 className="w-12 h-12 text-candle-gold-500 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50">
            Sanctum Illuminated
          </h3>
          <p className="text-xs text-warm-oak-700 dark:text-cream-300 font-reading leading-relaxed">
            {message}
          </p>
          <div className="pt-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-cream-50 text-xs font-semibold shadow-burgundy-glow"
            >
              <BookOpen className="w-4 h-4 text-candle-gold-300" />
              Enter The Library
            </Link>
          </div>
        </>
      )}

      {status === 'error' && (
        <>
          <AlertCircle className="w-12 h-12 text-burgundy-700 dark:text-candle-gold-400 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-burgundy-950 dark:text-cream-50">
            Verification Stalled
          </h3>
          <p className="text-xs text-burgundy-900 dark:text-candle-gold-300/90 font-reading leading-relaxed">
            {message}
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-cream-200 dark:bg-espresso-800 text-xs font-semibold text-espresso-950 dark:text-cream-50"
            >
              Return to Login
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl border border-warm-oak-300/40 dark:border-candle-gold-500/30 text-xs font-semibold"
            >
              Contact Archivist
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <AuthSplitLayout
      title="Sanctum Verification"
      subtitle="Confirming your credentials in the grand register of readers."
      quote="The more that you read, the more things you will know. The more that you learn, the more places you’ll go."
      quoteAuthor="Dr. Seuss"
    >
      <Suspense fallback={<div className="py-12 text-center text-xs text-warm-oak-500">Checking verification token...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </AuthSplitLayout>
  );
}
