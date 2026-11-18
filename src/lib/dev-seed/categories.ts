export interface CategorySeed {
  id: string;
  name: string;
  slug: string;
  vibe: string;
  description: string;
  iconName: string;
  bookCount: number;
}

export const CATEGORIES_SEED: CategorySeed[] = [
  {
    id: 'cat-classics',
    name: 'Gothic & Classic Literature',
    slug: 'gothic-classics',
    vibe: 'Midnight in an Oxford Library',
    description: 'Timeless masterworks of romance, psychological intrigue, and atmospheric mystery.',
    iconName: 'Feather',
    bookCount: 42,
  },
  {
    id: 'cat-ai-tech',
    name: 'AI, Systems & Future Tech',
    slug: 'ai-tech',
    vibe: 'Digital Renaissance',
    description: 'Autonomous systems, cybernetics, computer architecture, and cognitive science.',
    iconName: 'Cpu',
    bookCount: 28,
  },
  {
    id: 'cat-philosophy',
    name: 'Philosophy & Ancient Wisdom',
    slug: 'philosophy',
    vibe: 'Candlelit Scholar’s Altar',
    description: 'Stoicism, existentialism, ethics, and contemplative inquiries into human nature.',
    iconName: 'Compass',
    bookCount: 35,
  },
  {
    id: 'cat-fantasy',
    name: 'Mythology & Fantasy Realms',
    slug: 'fantasy-realms',
    vibe: 'Enchanted Whispering Woods',
    description: 'Folklore, ancient epics, magical realism, and worldbuilding odysseys.',
    iconName: 'Sparkles',
    bookCount: 31,
  },
  {
    id: 'cat-founders',
    name: 'Strategy & Founder Lore',
    slug: 'strategy-founders',
    vibe: 'The Midnight Study',
    description: 'Strategy, game theory, leadership, and timeless principles of building empires.',
    iconName: 'Briefcase',
    bookCount: 24,
  },
  {
    id: 'cat-poetry',
    name: 'Poetry & Epistolary Prose',
    slug: 'poetry-prose',
    vibe: 'Rain on Stained Glass',
    description: 'Sonnets, lyrical reflections, letters between souls, and quiet contemplative verses.',
    iconName: 'Scroll',
    bookCount: 19,
  },
];
