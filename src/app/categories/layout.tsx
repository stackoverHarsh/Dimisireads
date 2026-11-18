import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Categories — DimisiReads',
  description:
    'Explore our editorial genre categories — from Gothic classics and philosophy to AI & future tech, fantasy, and contemporary fiction. Each curated with passion.',
  openGraph: {
    title: 'Book Categories — DimisiReads',
    description: 'Explore editorial genre categories in a cozy, legally compliant digital library.',
    siteName: 'DimisiReads',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Book Categories — DimisiReads' },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
