import React from 'react';
import { requireAdmin } from '@/lib/auth/guards';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { ShieldCheck, Database, FileCheck, Users, Activity } from 'lucide-react';

export default async function AdminPage() {
  const admin = await requireAdmin('/admin');

  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={30} />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28">
        <div className="mb-10 p-8 rounded-3xl bg-gradient-to-r from-espresso-950 via-burgundy-950 to-espresso-950 text-cream-50 shadow-2xl border border-candle-gold-500/30">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-burgundy-900/60 text-candle-gold-300 border border-candle-gold-500/30 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-candle-gold-400" />
            Grand Archivist Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Archival Administration & Legal Compliance Desk
          </h1>
          <p className="mt-2 text-sm text-dusty-pink-200 font-reading">
            Signed in as <strong>{admin.fullName}</strong> ({admin.roles.join(', ')})
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <SpotlightCard className="p-6">
            <FileCheck className="w-6 h-6 text-candle-gold-500 mb-2" />
            <h3 className="font-serif text-lg font-bold">Licence Verification</h3>
            <p className="text-xs text-warm-oak-600 dark:text-cream-300 mt-1">
              0 pending legal audits in queue
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <Database className="w-6 h-6 text-candle-gold-500 mb-2" />
            <h3 className="font-serif text-lg font-bold">Catalogue Index</h3>
            <p className="text-xs text-warm-oak-600 dark:text-cream-300 mt-1">
              9 volumes loaded in dev registry
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <Users className="w-6 h-6 text-candle-gold-500 mb-2" />
            <h3 className="font-serif text-lg font-bold">Reader Registry</h3>
            <p className="text-xs text-warm-oak-600 dark:text-cream-300 mt-1">
              RBAC roles & access tokens active
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <Activity className="w-6 h-6 text-candle-gold-500 mb-2" />
            <h3 className="font-serif text-lg font-bold">Audit Activity Logs</h3>
            <p className="text-xs text-warm-oak-600 dark:text-cream-300 mt-1">
              Immutable provenance tracking
            </p>
          </SpotlightCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
