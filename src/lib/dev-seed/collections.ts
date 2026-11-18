export interface CollectionSeed {
  id: string;
  title: string;
  slug: string;
  curatorName: string;
  description: string;
  bannerImageUrl: string;
  bookSlugs: string[];
  vibe: string;
  isFeatured: boolean;
}

export const COLLECTIONS_SEED: CollectionSeed[] = [
  {
    id: 'col-startup-founder',
    title: "The Startup Founder’s Midnight Library",
    slug: 'startup-founders-library',
    curatorName: 'DIMISI Venture Guild',
    description: 'Foundational strategy, high-leverage decision architectures, and timeless wisdom for builders defying consensus.',
    bannerImageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
    bookSlugs: ['zero-to-one-peter-thiel', 'the-art-of-war-sun-tzu', 'the-autonomous-engineer', 'meditations-marcus-aurelius'],
    vibe: 'Calculated Mastery & High Ambition',
    isFeatured: true,
  },
  {
    id: 'col-gothic-autumn',
    title: 'Gothic Autumn & Midnight Archives',
    slug: 'gothic-autumn-archives',
    curatorName: 'The Dimisi Archivists',
    description: 'Whispering manor houses, candlelit confessions, and psychological masterworks born under stormy European skies.',
    bannerImageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1200',
    bookSlugs: ['frankenstein-modern-prometheus', 'the-picture-of-dorian-gray', 'pride-and-prejudice', 'alices-adventures-in-wonderland'],
    vibe: 'Stormy Winds & Heavy Velvet',
    isFeatured: true,
  },
  {
    id: 'col-ai-systems',
    title: 'Autonomous Systems & Digital Minds',
    slug: 'autonomous-systems-digital-minds',
    curatorName: 'DIMISI Research Collective',
    description: 'From Turing and cybernetics to modern agent orchestrators and clean domain boundaries.',
    bannerImageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    bookSlugs: ['the-autonomous-engineer', 'clean-architecture-robert-martin'],
    vibe: 'Synthetic Clarity & Cybernetic Grace',
    isFeatured: true,
  },
];
