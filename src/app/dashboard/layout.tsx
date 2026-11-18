import React from 'react';
import { requireAuth } from '@/lib/auth/guards';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth('/dashboard');

  return (
    <div className="relative min-h-screen text-espresso-950 dark:text-cream-50 overflow-x-hidden flex flex-col justify-between">
      <AmbientDustMotes particleCount={25} />
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 lg:pb-0">
        <DashboardSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
