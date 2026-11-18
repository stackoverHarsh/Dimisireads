export type LicenceCategory =
  | 'PUBLIC_DOMAIN'
  | 'DIMISI_OWNED'
  | 'EXPLICIT_DISTRIBUTION_GRANTED'
  | 'OPEN_PERMISSIVE'
  | 'METADATA_ONLY';

export interface BookReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  headline: string;
  content: string;
}

export interface BookSeed {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  authorBio?: string;
  category: string;
  categorySlug: string;
  vibe: string;
  isbn13: string;
  publisher: string;
  publishedYear: number;
  pageCount: number;
  language: string;
  averageRating: number;
  ratingsCount: number;
  coverImageUrl?: string;
  description: string;
  synopsis: string;
  tags: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isFree?: boolean;

  // Strict Legal Licensing Fields
  licenceCategory: LicenceCategory;
  hasDigitalEdition: boolean;
  isDownloadAllowed: boolean;
  isOnlineReadAllowed: boolean;
  fileFormat?: 'EPUB' | 'PDF';
  fileSizeBytes?: number;
  licenceNotice: string;

  reviews: BookReview[];
}

export const BOOKS_SEED: BookSeed[] = [
  {
    id: 'book-pride-prejudice',
    slug: 'pride-and-prejudice',
    title: 'Pride and Prejudice',
    subtitle: 'A Masterwork of Wit, Society & Unspoken Longing',
    author: 'Jane Austen',
    authorBio: 'English novelist known for her realism, biting irony, and social commentary on the British landed gentry of the late 18th century.',
    category: 'Gothic & Classic Literature',
    categorySlug: 'gothic-classics',
    vibe: 'Lavender Tea & Gentle Wit',
    isbn13: '9780141439518',
    publisher: 'T. Egerton (Now Public Domain)',
    publishedYear: 1813,
    pageCount: 432,
    language: 'English',
    averageRating: 4.85,
    ratingsCount: 2840,
    coverImageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    description: 'Set in 19th-century England, this classic romantic comedy chronicles the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner.',
    synopsis: 'Few love stories in world literature possess the sparkling psychological acuity and delicious conversational sparring of Jane Austen’s masterwork. As Elizabeth Bennet navigates familial pressures and societal decorum in rural Hertfordshire, her preconceived disdain for the proud Mr. Darcy unravels into a revelation of true character, honour, and emotional depth.',
    tags: ['Classics', 'Regency Romance', 'Satire', 'Public Domain', 'British Literature'],
    isFeatured: true,
    isTrending: true,
    isFree: true,
    licenceCategory: 'PUBLIC_DOMAIN',
    hasDigitalEdition: true,
    isDownloadAllowed: true,
    isOnlineReadAllowed: true,
    fileFormat: 'EPUB',
    fileSizeBytes: 648000,
    licenceNotice: 'Verified Public Domain (Author passed 1817; pre-1929 publication). Worldwide distribution authorized under DIMISI clearance #PD-1813-001.',
    reviews: [
      {
        id: 'rev-1',
        userName: 'Eleanor Vance',
        rating: 5,
        date: '2 days ago',
        headline: 'A balm for the overstimulated modern soul',
        content: 'Reading this in Dimisi’s candlelight mode feels like sitting by a warm hearth in an English manor while rain lashes against leaded panes. Flawless typography.'
      },
      {
        id: 'rev-2',
        userName: 'Julian Croft',
        rating: 5,
        date: '1 week ago',
        headline: 'Timeless wit that cuts deeper than contemporary fiction',
        content: 'Austen’s dialogue remains unmatched. The ability to highlight favourite passages and export notes makes DimisiReads my permanent sanctuary.'
      }
    ]
  },
  {
    id: 'book-frankenstein',
    slug: 'frankenstein-modern-prometheus',
    title: 'Frankenstein',
    subtitle: 'The Modern Prometheus',
    author: 'Mary Shelley',
    authorBio: 'English novelist who birthed the science fiction genre at the tender age of nineteen during a stormy summer at Lake Geneva.',
    category: 'Gothic & Classic Literature',
    categorySlug: 'gothic-classics',
    vibe: 'Stormy Midnight & Candle Wax',
    isbn13: '9780141439471',
    publisher: 'Lackington, Hughes, Harding (Now Public Domain)',
    publishedYear: 1818,
    pageCount: 280,
    language: 'English',
    averageRating: 4.72,
    ratingsCount: 1950,
    coverImageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    description: 'Victor Frankenstein, a brilliant young scientist, creates a sapient creature in an unorthodox scientific experiment, only to abandon him in horror and spark an inevitable cycle of vengeance.',
    synopsis: 'Born from a midnight ghost-story competition among Lord Byron, Percy Bysshe Shelley, and Mary Wollstonecraft Shelley, Frankenstein explores the intoxicating perils of boundless scientific ambition and the catastrophic consequences of societal ostracization.',
    tags: ['Gothic', 'Science Fiction', 'Horror', 'Public Domain', 'Philosophy'],
    isFeatured: true,
    isTrending: true,
    isFree: true,
    licenceCategory: 'PUBLIC_DOMAIN',
    hasDigitalEdition: true,
    isDownloadAllowed: true,
    isOnlineReadAllowed: true,
    fileFormat: 'EPUB',
    fileSizeBytes: 512000,
    licenceNotice: 'Verified Public Domain (Author passed 1851). Unabridged 1818 edition cleared under DIMISI licence clearance #PD-1818-042.',
    reviews: [
      {
        id: 'rev-3',
        userName: 'Alistair Finch',
        rating: 5,
        date: '3 days ago',
        headline: 'Far more poetic and heartbreaking than any Hollywood adaptation',
        content: 'The creature’s speeches in the Swiss Alps are pure rhetorical brilliance. Deeply moving read.'
      }
    ]
  },
  {
    id: 'book-dorian-gray',
    slug: 'the-picture-of-dorian-gray',
    title: 'The Picture of Dorian Gray',
    subtitle: 'A Decadent Parable of Art, Vanity & Damnation',
    author: 'Oscar Wilde',
    authorBio: 'Irish poet, playwright, and philosopher of Aestheticism celebrated for his incandescent wit, flamboyant style, and piercing social critiques.',
    category: 'Gothic & Classic Literature',
    categorySlug: 'gothic-classics',
    vibe: 'Velvet Salon & Gilded Secrets',
    isbn13: '9780141439570',
    publisher: 'Ward, Lock and Company (Public Domain)',
    publishedYear: 1890,
    pageCount: 254,
    language: 'English',
    averageRating: 4.79,
    ratingsCount: 2120,
    coverImageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    description: 'Enthralled by his own youthful beauty depicted in an oil portrait, Dorian Gray makes a Faustian wish that the painting age in his place while he indulges in a decadent double life.',
    synopsis: 'Oscar Wilde’s only published novel is a sumptuous gothic masterpiece tracing the moral degradation of an angelic young aristocrat seduced by Lord Henry Wotton’s hedonistic philosophies. While Dorian remains untouched by time, the canvas hidden in his locked attic decays with every cruelty and sin.',
    tags: ['Aestheticism', 'Gothic', 'Faustian', 'Philosophy', 'Public Domain'],
    isFeatured: true,
    isTrending: false,
    isFree: true,
    licenceCategory: 'PUBLIC_DOMAIN',
    hasDigitalEdition: true,
    isDownloadAllowed: true,
    isOnlineReadAllowed: true,
    fileFormat: 'EPUB',
    fileSizeBytes: 440000,
    licenceNotice: 'Verified Public Domain (Author passed 1900). Full unabridged 1891 edition clearance #PD-1890-019.',
    reviews: [
      {
        id: 'rev-4',
        userName: 'Cassandra Thorne',
        rating: 5,
        date: '5 days ago',
        headline: 'Every single sentence is an epigram worth carving into stone',
        content: 'The aesthetic dark mode on this app is the exact mood Wilde would have composed this book in.'
      }
    ]
  },
  {
    id: 'book-meditations',
    slug: 'meditations-marcus-aurelius',
    title: 'Meditations',
    subtitle: 'Private Reflections of a Roman Emperor and Stoic',
    author: 'Marcus Aurelius',
    authorBio: 'Roman Emperor from 161 to 180 AD and a seminal Stoic philosopher who penned his private journal while on military campaign.',
    category: 'Philosophy & Ancient Wisdom',
    categorySlug: 'philosophy',
    vibe: 'Candlelit Scholar’s Altar',
    isbn13: '9780140449334',
    publisher: 'Historical Manuscript (Public Domain Translation)',
    publishedYear: 180,
    pageCount: 256,
    language: 'English',
    averageRating: 4.88,
    ratingsCount: 3410,
    coverImageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800',
    description: 'The intimate spiritual and philosophical diary of the ruler of the Roman Empire, grappling with duty, mortality, tranquility, and resilience.',
    synopsis: 'Never intended for public consumption, Meditations stands as one of history’s greatest roadmaps for emotional fortress-building and ethical clarity. Written in Greek during grueling winters along the Danube, Marcus Aurelius talks directly to himself, reminding his soul to act justly, accept the transient nature of mortal praise, and cultivate absolute interior peace.',
    tags: ['Stoicism', 'Philosophy', 'Ancient Rome', 'Mindfulness', 'Public Domain'],
    isFeatured: true,
    isTrending: true,
    isFree: true,
    licenceCategory: 'PUBLIC_DOMAIN',
    hasDigitalEdition: true,
    isDownloadAllowed: true,
    isOnlineReadAllowed: true,
    fileFormat: 'EPUB',
    fileSizeBytes: 380000,
    licenceNotice: 'Historical Public Domain Translation (George Long & Gregory Hays public texts). Verified clearance #PD-0180-STOIC.',
    reviews: [
      {
        id: 'rev-5',
        userName: 'Marcus K.',
        rating: 5,
        date: 'Yesterday',
        headline: 'My daily morning anchor',
        content: 'Reading five aphorisms every dawn before checking email fundamentally altered my anxiety levels.'
      }
    ]
  },
  {
    id: 'book-art-of-war',
    slug: 'the-art-of-war-sun-tzu',
    title: 'The Art of War',
    subtitle: 'The Definitive Military & Strategic Treatise',
    author: 'Sun Tzu',
    authorBio: 'Ancient Chinese military general, strategist, and philosopher from the Eastern Zhou period.',
    category: 'Strategy & Founder Lore',
    categorySlug: 'strategy-founders',
    vibe: 'Calculated Mastery',
    isbn13: '9780140455526',
    publisher: 'Ancient Text (Lionel Giles Public Translation)',
    publishedYear: -500,
    pageCount: 160,
    language: 'English',
    averageRating: 4.65,
    ratingsCount: 2400,
    coverImageUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&q=80&w=800',
    description: 'Thirteen chapters devoted to distinct facets of warfare, strategic positioning, deception, psychology, and triumph without physical confrontation.',
    synopsis: 'Composed over 2,500 years ago, Sun Tzu’s timeless treatise transcends physical battlefields, serving as an indispensable manual for founders, leaders, and diplomats. Its central doctrine—that supreme excellence consists in subduing the enemy without fighting—remains foundational.',
    tags: ['Strategy', 'Leadership', 'Military', 'Ancient Wisdom', 'Public Domain'],
    isFeatured: false,
    isTrending: true,
    isFree: true,
    licenceCategory: 'PUBLIC_DOMAIN',
    hasDigitalEdition: true,
    isDownloadAllowed: true,
    isOnlineReadAllowed: true,
    fileFormat: 'EPUB',
    fileSizeBytes: 290000,
    licenceNotice: 'Lionel Giles classic 1910 English translation in the Public Domain. Cleared under DIMISI #PD-0500-WAR.',
    reviews: []
  },
  {
    id: 'book-alice-wonderland',
    slug: 'alices-adventures-in-wonderland',
    title: 'Alice’s Adventures in Wonderland',
    subtitle: 'A Whimsical Journey Down the Rabbit Hole',
    author: 'Lewis Carroll',
    authorBio: 'English author, mathematician, logician, and Anglican deacon whose wordplay shaped literary nonsense.',
    category: 'Mythology & Fantasy Realms',
    categorySlug: 'fantasy-realms',
    vibe: 'Enchanted Tea Party & Paradox',
    isbn13: '9780141439761',
    publisher: 'Macmillan (Now Public Domain)',
    publishedYear: 1865,
    pageCount: 192,
    language: 'English',
    averageRating: 4.68,
    ratingsCount: 1840,
    coverImageUrl: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=800',
    description: 'A young girl named Alice falls through a rabbit hole into a subterranean fantasy world populated by peculiar, anthropomorphic creatures.',
    synopsis: 'Lewis Carroll’s delightful masterpiece plays with mathematical logic, linguistic absurdity, and Victorian childhood satire. Accompanied by the Cheshire Cat, the Mad Hatter, and the Queen of Hearts, Alice navigates a dreamscape that reveals the profound strangeness of adult rules.',
    tags: ['Fantasy', 'Nonsense Literature', 'Classics', 'Public Domain', 'Whimsical'],
    isFeatured: false,
    isTrending: false,
    isFree: true,
    licenceCategory: 'PUBLIC_DOMAIN',
    hasDigitalEdition: true,
    isDownloadAllowed: true,
    isOnlineReadAllowed: true,
    fileFormat: 'EPUB',
    fileSizeBytes: 420000,
    licenceNotice: 'Verified Public Domain (Author passed 1898). Unabridged 1865 text #PD-1865-ALICE.',
    reviews: []
  },
  {
    id: 'book-dimisi-ai-guide',
    slug: 'the-autonomous-engineer',
    title: 'The Autonomous Engineer',
    subtitle: 'Foundations of Agentic Systems, Tool Orchestration & Human Synergy',
    author: 'DIMISI Research Collective',
    authorBio: 'The engineering & research arm of DIMISI Technologies exploring symbiotic human-agent computing.',
    category: 'AI, Systems & Future Tech',
    categorySlug: 'ai-tech',
    vibe: 'Digital Renaissance & High Forge',
    isbn13: '9798991200001',
    publisher: 'DIMISI Press',
    publishedYear: 2026,
    pageCount: 310,
    language: 'English',
    averageRating: 4.96,
    ratingsCount: 480,
    coverImageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    description: 'An authoritative, production-grade guide to designing, architecting, and deploying autonomous AI agent swarms and multi-agent workflow systems.',
    synopsis: 'Authored directly by DIMISI Technologies researchers, this premier publication distills the architectural blueprints of modern autonomous software engineering. From sandbox isolation protocols to deterministic tool chaining and self-healing systems, this volume is required reading for engineers building the next era of computing.',
    tags: ['AI Agents', 'System Architecture', 'DIMISI Original', 'Software Engineering', 'Autonomous Workflows'],
    isFeatured: true,
    isTrending: true,
    isFree: true,
    licenceCategory: 'DIMISI_OWNED',
    hasDigitalEdition: true,
    isDownloadAllowed: true,
    isOnlineReadAllowed: true,
    fileFormat: 'PDF',
    fileSizeBytes: 2450000,
    licenceNotice: 'Proprietary publication owned by DIMISI Technologies. Granted for free digital reading and download under the DIMISI Community Educational Licence.',
    reviews: [
      {
        id: 'rev-6',
        userName: 'Dr. Sarah Lin',
        rating: 5,
        date: '4 days ago',
        headline: 'The most coherent manual on agentic architecture written to date',
        content: 'Clear diagrams, zero marketing fluff, and rigorous engineering principles.'
      }
    ]
  },
  {
    id: 'book-zero-to-one',
    slug: 'zero-to-one-peter-thiel',
    title: 'Zero to One',
    subtitle: 'Notes on Startups, or How to Build the Future',
    author: 'Peter Thiel & Blake Masters',
    authorBio: 'Venture capitalist, entrepreneur, and co-founder of PayPal and Palantir.',
    category: 'Strategy & Founder Lore',
    categorySlug: 'strategy-founders',
    vibe: 'Monopolies & Singular Futures',
    isbn13: '9780804139297',
    publisher: 'Crown Business',
    publishedYear: 2014,
    pageCount: 224,
    language: 'English',
    averageRating: 4.74,
    ratingsCount: 8900,
    coverImageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    description: 'The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create.',
    synopsis: 'If you want to build a better future, you must believe in secrets. Doing what someone else already knows how to do takes the world from 1 to n, adding more of something familiar. But when you do something new, you go from 0 to 1.',
    tags: ['Startups', 'Technology', 'Venture Capital', 'Business Strategy'],
    isFeatured: false,
    isTrending: true,
    isFree: false,
    licenceCategory: 'METADATA_ONLY',
    hasDigitalEdition: false,
    isDownloadAllowed: false,
    isOnlineReadAllowed: false,
    licenceNotice: 'Bibliographic Reference Only. Commercial copyrighted work. In accordance with copyright law, downloads and full-text reading are not available on DimisiReads. Please purchase from your preferred bookseller.',
    reviews: []
  },
  {
    id: 'book-clean-architecture',
    slug: 'clean-architecture-robert-martin',
    title: 'Clean Architecture',
    subtitle: 'A Craftsman’s Guide to Software Structure and Design',
    author: 'Robert C. Martin',
    authorBio: 'Software engineer and author famously known in the community as Uncle Bob.',
    category: 'AI, Systems & Future Tech',
    categorySlug: 'ai-tech',
    vibe: 'Purity of Systems & SOLID Seals',
    isbn13: '9780134494166',
    publisher: 'Prentice Hall',
    publishedYear: 2017,
    pageCount: 432,
    language: 'English',
    averageRating: 4.65,
    ratingsCount: 5200,
    coverImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    description: 'Practical software architecture solutions for high-leverage software systems and resilient domain boundaries.',
    synopsis: 'Uncle Bob showcases the universal rules of software architecture that remain steady irrespective of transient frameworks or operating systems.',
    tags: ['Software Engineering', 'Architecture', 'Clean Code', 'Craftsmanship'],
    isFeatured: false,
    isTrending: false,
    isFree: false,
    licenceCategory: 'METADATA_ONLY',
    hasDigitalEdition: false,
    isDownloadAllowed: false,
    isOnlineReadAllowed: false,
    licenceNotice: 'Bibliographic Reference Only. Protected under international copyright. Available in our catalogue for reviews, citations, and personal reading list tracking.',
    reviews: []
  }
];
