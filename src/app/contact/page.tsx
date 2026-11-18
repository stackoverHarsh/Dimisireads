'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { Mail, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-28">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-burgundy-900/10 dark:bg-burgundy-950/60 text-burgundy-900 dark:text-candle-gold-300 border border-burgundy-700/20 dark:border-candle-gold-500/20 mb-3">
            <Mail className="w-3.5 h-3.5 text-candle-gold-500" />
            The Archival Desk
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-burgundy-950 dark:text-cream-50">
            Contact the Archivists
          </h1>
          <p className="mt-3 text-base font-reading text-warm-oak-700 dark:text-cream-300">
            Have an inquiry regarding bibliographic restoration, licensing, or library features? Send us a dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Form */}
          <div className="md:col-span-7">
            <SpotlightCard className="p-8">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-candle-gold-500 mx-auto" />
                  <h3 className="font-serif text-2xl font-bold text-burgundy-950 dark:text-cream-50">
                    Dispatch Received
                  </h3>
                  <p className="text-xs text-warm-oak-700 dark:text-cream-300 font-reading">
                    Our curators will review your missive and respond within 24–48 archival hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-burgundy-700 text-cream-50 text-xs font-semibold"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-warm-oak-800 dark:text-cream-200">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Elizabeth Bennet"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 dark:bg-espresso-950 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-xs text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-warm-oak-800 dark:text-cream-200">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. elizabeth@longbourn.org"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 dark:bg-espresso-950 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-xs text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-warm-oak-800 dark:text-cream-200">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. Licensing Inquiry / Recommendation"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 dark:bg-espresso-950 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-xs text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-warm-oak-800 dark:text-cream-200">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Pen your message here..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 dark:bg-espresso-950 border border-warm-oak-300/40 dark:border-candle-gold-500/20 text-xs text-espresso-950 dark:text-cream-50 placeholder:text-warm-oak-400 focus:outline-none focus:border-candle-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-cream-50 text-xs font-semibold shadow-burgundy-glow cursor-pointer transition-all"
                  >
                    <Send className="w-3.5 h-3.5 text-candle-gold-300" />
                    Transmit Dispatch
                  </button>
                </form>
              )}
            </SpotlightCard>
          </div>

          {/* Info Card */}
          <div className="md:col-span-5 space-y-6">
            <SpotlightCard className="p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-burgundy-950 dark:text-cream-50">
                Direct Channels
              </h3>
              <div className="space-y-3 text-xs text-warm-oak-800 dark:text-cream-200 font-sans">
                <p>
                  <strong>General Inquiries:</strong><br />
                  <span className="font-mono text-candle-gold-600 dark:text-candle-gold-400">archivist@dimisireads.com</span>
                </p>
                <p>
                  <strong>Legal & Licensing:</strong><br />
                  <span className="font-mono text-candle-gold-600 dark:text-candle-gold-400">legal@dimisireads.com</span>
                </p>
                <p>
                  <strong>DIMISI Technologies HQ:</strong><br />
                  <span>San Francisco, CA & Global Engineering Guild</span>
                </p>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6">
              <div className="flex items-center gap-2 text-xs font-bold text-candle-gold-600 dark:text-candle-gold-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                Verified Response Guarantee
              </div>
              <p className="text-xs text-warm-oak-700 dark:text-cream-300 font-reading leading-relaxed">
                All copyright clearance or licensing questions receive top priority from our legal team.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
