import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Books — DimisiReads',
  description:
    'Browse our full catalogue of legally verified public-domain classics, curated collections, and licensed e-books. Filter by category, vibe, and format.',
  openGraph: {
    title: 'Explore Books — DimisiReads',
    description: 'Browse thousands of legally verified books in a warm, editorial digital library.',
    siteName: 'DimisiReads',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Explore Books — DimisiReads', description: 'Browse our full catalogue of verified e-books.' },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
