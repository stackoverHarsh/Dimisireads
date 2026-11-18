import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free E-Books — Public Domain Library | DimisiReads',
  description:
    'Download and read verified public-domain e-books for free — Pride and Prejudice, Frankenstein, Meditations, and more. 100% legal, beautifully formatted.',
  openGraph: {
    title: 'Free E-Books — Public Domain Library | DimisiReads',
    description: 'Download verified public-domain e-books for free. Legal, curated, and beautifully formatted.',
    siteName: 'DimisiReads',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Free E-Books — DimisiReads', description: 'Free, legal public domain e-books.' },
};

export default function FreeEbooksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
