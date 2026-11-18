import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curated Collections — DimisiReads',
  description:
    'Handpicked anthology suites for every reading mood — The Startup Founder\'s Midnight Library, Gothic Autumn Archives, Cozy Rainy Day Reads, and more.',
  openGraph: {
    title: 'Curated Collections — DimisiReads',
    description: 'Handpicked anthology suites for every reading mood, curated by the DIMISI team.',
    siteName: 'DimisiReads',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Curated Collections — DimisiReads' },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
