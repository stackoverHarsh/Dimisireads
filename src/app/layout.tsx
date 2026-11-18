import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DimisiReads — The Dreamy Editorial Digital Library',
  description:
    'A premier, 100% legally compliant digital library & e-book discovery sanctuary by DIMISI Technologies. Immerse yourself in fairy-lit shelves, vintage book spines, and cozy candlelit reading.',
  keywords: [
    'Digital Library',
    'E-books',
    'Public Domain Books',
    'Cozy Reading',
    'Editorial Library',
    'DIMISI Technologies',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen paper-grain selection:bg-burgundy-200 selection:text-burgundy-950">
        {children}
      </body>
    </html>
  );
}
