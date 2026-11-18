import React from 'react';
import { requireAdmin } from '@/lib/auth/guards';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientDustMotes } from '@/components/react-bits/AmbientDustMotes';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin('/admin');

  return (
    <div className="relative min-h-screen bg-cream-50 dark:bg-espresso-950 text-espresso-950 dark:text-cream-50 overflow-x-hidden">
      <AmbientDustMotes particleCount={25} />
      <Navbar />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
