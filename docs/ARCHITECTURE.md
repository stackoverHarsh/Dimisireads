# DimisiReads: Master Architectural Blueprint & Technical Implementation Plan
**Platform:** DimisiReads (A DIMISI Technologies Venture)  
**Document Version:** 1.0.0-PROD-BLUEPRINT  
**Status:** Approved for Implementation  
**Target Stack:** Next.js 15+ (App Router), TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL, Redis, Private S3-Compatible Object Storage, GSAP, Framer Motion, React Bits.

---

## 1. Product Requirements Document (PRD)

### 1.1 Executive Summary & Core Philosophy
**DimisiReads** is a premier, legally compliant digital library, e-book discovery, and reading ecosystem engineered by **DIMISI Technologies**. The platform merges the architectural integrity of a world-class digital repository with the aesthetic charm of a dreamy, cozy, editorial-fantasy library—evoking feelings of candlelit mahogany archives, fairy-lit wooden bookshelves, and gilded leaf pages.

Crucially, DimisiReads enforces **100% legal, verifiable compliance**:
- It is **never** a pirated file distribution engine or shadow library.
- It operates with a **strict architectural decoupling** between **Bibliographic Discovery Metadata** (cataloguing the universe of books) and **Licensed Digital Inventory** (downloadable or readable digital assets).
- Downloads and in-browser reading are solely granted to digital assets with authenticated and auditable provenance across **four verified legal licence categories**.

---

### 1.2 Visual, Motion & Spatial Design Language

#### 1.2.1 Color Palette System
The visual identity reflects high-end literary romance, scholarly luxury, and enchanting twilight warmth:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ DIMISIREADS COZY EDITORIAL FANTASY COLOR PALETTE                             │
├───────────────────┬──────────────┬─────────────┬─────────────────────────────┤
│ Color Name        │ Hex Code     │ Tailwind    │ Role / Application          │
├───────────────────┼──────────────┼─────────────┼─────────────────────────────┤
│ Deep Espresso Ink │ #1C1417      │ ink-950     │ Primary dark canvas & text  │
│ Warm Oak Mahogany │ #4A2E20      │ oak-900     │ Bookshelves, spines, trims  │
│ Imperial Burgundy │ #722F37      │ burgundy-700│ Hero accents, brand primary │
│ Dusty Antique Rose│ #D7A7B1      │ rose-300    │ Soft glow, subtle borders   │
│ Candlelight Gold  │ #D9A760      │ gold-400    │ Fairy lights, stars, active │
│ Parchment Cream   │ #F8F4E7      │ cream-50    │ Reading paper, light canvas │
└───────────────────┴──────────────┴─────────────┴─────────────────────────────┘
```

#### 1.2.2 Motion & Tactile Spatial Experience
- **Interactive Wooden Bookshelf (GSAP + Three.js / React Three Fiber / CSS 3D):**
  - **Spine View:** Books presented vertically edge-to-edge on rich grained oak shelves with subtle leather, cloth, and gold foil spine embossing. Hovering causes a book to gently glide forward with a soft candlelight drop-shadow.
  - **Cover Carousel (React Bits / Framer Motion):** Smooth spring-damped 3D perspective tilt reacting to cursor coordinates, revealing gold-leaf edge reflections.
  - **Fairy Light Ambient Shader:** Interactive point lights that track subtle cursor velocity or ambient audio/ambient mode toggle, bathing the shelf in a cozy golden flicker.
- **"Browse by Vibe" Sensory Filters:**
  - Filtering by emotional resonance rather than merely dry Dewey Decimal categories:
    * *"Rainy Day in an Oxford Library"* (Cosy Mysteries, Classics, Dark Academia)
    * *"Midnight in an Enchanted Forest"* (Folklore, High Fantasy, Mythological Retellings)
    * *"Café Under the Lavender Mist"* (Poetry, Slow Living, Epistolary Romance)
    * *"Candlelit Scholar’s Altar"* (Philosophy, Astronomy, Ancient History)

---

### 1.3 Core Product Modules & Feature Specifications

#### Module A: Public Discovery Web Experience
1. **Hero & Dynamic Shelf Showcase:** Interactive 3D/GSAP shelf highlighting curated public domain masterworks and DIMISI original titles.
2. **Unified Search & Smart Filter Engine:**
   - Multi-facet search across title, author, ISBN, category, language, vibe, and legal availability status.
   - Filter switch: *"Available to Read Immediately"* vs *"Catalogue Reference Only"*.
3. **Book Detail Page (The Editorial Tome):**
   - High-resolution dynamic cover presentation with realistic paper drop-shadows and deckle-edge simulation.
   - Bibliographic summary, author biography, publication details, and editions.
   - **Legal Availability Indicator Pill**:
     * 🟢 *Available to Read & Download (Verified Public Domain / DIMISI Licensed)*
     * 🟡 *Read Online Only (Restricted Permissive Licence)*
     * ⚪ *Reference Catalogue (Purchase links to author/publisher or borrow from local library)*
4. **Community Reviews & Ratings:**
   - User-written reviews with spoiler tags and sentiment tags.
   - *Strict Compliance Rule:* No review incentive/bribe mechanisms (no "Leave a review to unlock this download").

#### Module B: Authenticated User Dashboard ("My Study & Sanctum")
1. **My Personal Library (Shelves & Collections):**
   - Default shelves: *Want to Read*, *Currently Reading*, *Completed*, *Did Not Finish (DNF)*.
   - Custom user shelves (e.g., "Gothic Autumn 2026", "Dimisi Favorites").
2. **Gamified Reading Streaks & Goals:**
   - Daily reading streak calendar with golden candle icons lit for consecutive reading days.
   - Annual reading challenge tracker (% completed, books read vs target).
   - Milestone badges: *The Midnight Scholar*, *Parchment Devotee*, *Polymath*.
3. **Annotations & Highlights Vault:**
   - Centralized searchable repository of all reader highlights, notes, and bookmarks exportable to Markdown or PDF.

#### Module C: Cozy Online E-Book Reader ("The Lantern Sanctuary")
1. **Engine Architecture:**
   - Web-based EPUB and PDF rendering engine built on modern web-standard virtualization (`epubjs` / `foliate-js` hybrid runtime).
2. **Aesthetic Lighting Modes:**
   - **Candlelight/Lantern Mode:** Warm sepia-amber tone (`#F5E6C8` background, `#2B1D0C` text) with a subtle radial lantern-glow vignette.
   - **Parchment Mode:** Classic cream paper texture (`#F8F4E7` background, `#1C1417` text).
   - **Midnight Archive Mode:** Deep espresso ink (`#140E10` background, `#D8C7B8` text).
3. **Typographic & Reading Controls:**
   - Curated serif typography (Cinzel, Playfair Display, EB Garamond, Literata, Atkinson Hyperlegible).
   - Margins, line-height, letter-spacing, and font-size scaling.
   - Two-column editorial spread on desktop; fluid single-column pagination on mobile.
4. **Interactive Features:**
   - Text selection with 4-color highlighter palette (Amber Gold, Rose Quartz, Sage Linen, Lavender Mist).
   - Sticky margin notes, chapter-level progress scrubber, remaining chapter time estimate.
   - Auto-sync progress to database every 10 seconds or on page turn via optimistic debounce.

#### Module D: AI Discovery Assistant ("The Dimisi Librarian")
1. **Conversational Recommendation Engine:**
   - Conversational assistant persona of a well-read, polite Victorian scholar.
   - Natural language comprehension: *"Find me a bittersweet 19th-century epistolary novel set during a stormy winter in Scotland."*
2. **Semantic Book Matching:**
   - Synthesizes user's reading history, current mood/vibe selection, and semantic vector embeddings over plot summaries and thematic metadata.
3. **Direct Legal Linkage:**
   - Automatically prioritizes or highlights books in the Dimisi digital inventory that can be opened in the reader immediately.

#### Module E: Admin & Governance Backoffice ("The Grand Archivist Portal")
1. **Book Catalogue Manager:**
   - Search, ingest, and curate bibliographic data from Google Books API and Open Library API.
   - Manual overrides for cover art, curated synopsis, and editorial vibe classification.
2. **Digital Inventory & Licence Clearance Pipeline:**
   - Multi-step manual file upload for EPUB and PDF files.
   - Obligatory licence questionnaire: Category selection, proof document upload (e.g., copyright registration, author contract, public domain jurisdiction verification), expiry date, and licensor identity.
   - Verification status state machine: `DRAFT` -> `UNDER_LEGAL_REVIEW` -> `VERIFIED_ACTIVE` -> `REVOKED` / `EXPIRED`.
3. **Asset Vault & Secure Delivery:**
   - Uploads straight to private S3-compatible bucket via pre-signed multipart uploads.
   - No direct public URLs. Delivery strictly handled by signed time-limited URLs with authorization check.
4. **Audit Logs & DMCA Compliance Desk:**
   - Complete immutable audit trails for every file uploaded, licence verified, or asset modified.
   - DMCA takedown workflow with single-click instant asset de-listing and audit archiving.

---

## 2. System Architecture & Modular Service Layer

The platform is designed as a unified, modern Next.js 15+ (App Router) full-stack system. There is no split repository or microservice overhead at this stage; instead, we enforce strict domain separation through a clean, typed modular service layer.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DIMISIREADS ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [ CLIENT LAYER ]                                                           │
│  Next.js 15 App Router | React Server Components | React 19 Client Tree     │
│  GSAP 3D Bookshelves | Tailwind CSS | Framer Motion | Foliate/EPUB Reader    │
│                                    │                                        │
│                                    ▼                                        │
│  [ EDGE / ROUTING & GUARDS ]                                                │
│  Next.js Middleware: Session Validation, CSRF Protection, RBAC Gatekeeper   │
│  Redis Distributed Token Bucket Rate Limiter (Downloads / AI / Auth)        │
│                                    │                                        │
│                                    ▼                                        │
│  [ DOMAIN SERVICE LAYER (Server-Only Modules in /src/services) ]           │
│  ┌─────────────────────────┐  ┌─────────────────────────┐                   │
│  │ Auth & RBAC Service     │  │ Book Catalogue Service  │                   │
│  │ (Argon2id, Session/JWT) │  │ (Google Books/OL Sync)  │                   │
│  └─────────────────────────┘  └─────────────────────────┘                   │
│  ┌─────────────────────────┐  ┌─────────────────────────┐                   │
│  │ Digital Inventory Serv. │  │ Licensing & Legal Serv. │                   │
│  │ (EPUB/PDF Processing)   │  │ (Audit & Clearance)     │                   │
│  └─────────────────────────┘  └─────────────────────────┘                   │
│  ┌─────────────────────────┐  ┌─────────────────────────┐                   │
│  │ Secure Storage Service  │  │ Reader State Service    │                   │
│  │ (S3 Signed URL / HMAC)  │  │ (Sync Progress/Notes)   │                   │
│  └─────────────────────────┘  └─────────────────────────┘                   │
│  ┌─────────────────────────┐  ┌─────────────────────────┐                   │
│  │ AI Librarian Service    │  │ Gamification Service    │                   │
│  │ (Embeddings / Gemini)   │  │ (Streaks, Goals, Badges)│                   │
│  └─────────────────────────┘  └─────────────────────────┘                   │
│                                    │                                        │
│                                    ▼                                        │
│  [ DATA & PERSISTENCE LAYER ]                                               │
│  ┌────────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐ │
│  │ PostgreSQL 16 (Prisma) │  │ Redis (Upstash/Local) │  │ Private S3 / R2 │ │
│  │ Normalized Schema      │  │ Rate Limit, Cache     │  │ Encrypted Assets│ │
│  └────────────────────────┘  └───────────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Service Layer Directory Layout
All business logic is isolated from HTTP handlers and UI components:
```
src/
├── app/                      # Next.js App Router (Pages, Layouts, API Route Handlers)
│   ├── (public)/             # Marketing, Explore, Book Pages, Catalog
│   ├── (auth)/               # Login, Register, Forgot Password
│   ├── (dashboard)/          # User Library, Streaks, Goal Tracking
│   ├── (reader)/             # Fullscreen distraction-free reader
│   ├── (admin)/              # Archival Backoffice & Legal Pipeline
│   └── api/                  # RESTful endpoints & Webhooks
├── components/
│   ├── books/                # 3D Shelves, Spine View, Book Cards
│   ├── reader/               # EPUB/PDF Virtualizer, Lantern Controls
│   ├── ai/                   # Dimisi Librarian Chat Window
│   └── ui/                   # React Bits, Tailwind Base, Modals, Forms
├── lib/                      # Base singletons (prisma.ts, redis.ts, s3.ts, env.ts)
└── services/                 # Pure TypeScript Domain Services
    ├── auth.service.ts
    ├── book-catalog.service.ts
    ├── digital-inventory.service.ts
    ├── licensing.service.ts
    ├── storage.service.ts
    ├── reader.service.ts
    ├── ai-librarian.service.ts
    ├── community.service.ts
    └── gamification.service.ts
```

---

## 3. Complete Normalized Prisma Schema Design

Below is the complete, production-grade Prisma schema. It enforces referential integrity, compound indexes for fast lookups, and clear isolation between public book metadata and licensed digital assets.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ==========================================
// 1. ENUMS
// ==========================================

enum UserRoleType {
  SUPER_ADMIN
  CONTENT_MANAGER
  MODERATOR
  SUPPORT_ADMIN
  USER
}

enum LicenceCategory {
  PUBLIC_DOMAIN                  // Life + 70 years / verified historical works
  DIMISI_OWNED                   // Proprietary publications / originals
  EXPLICIT_DISTRIBUTION_GRANTED  // Formal contract with rights holder
  OPEN_PERMISSIVE                // Creative Commons, CC0, Project Gutenberg, etc.
}

enum LicenceVerificationStatus {
  DRAFT
  UNDER_LEGAL_REVIEW
  VERIFIED_ACTIVE
  REJECTED
  REVOKED
  EXPIRED
}

enum EbookFormat {
  EPUB
  PDF
  MOBI
  AUDIO_MP3
}

enum ReadingStatus {
  WANT_TO_READ
  CURRENTLY_READING
  COMPLETED
  ON_HOLD
  DROPPED
}

enum HighlightColor {
  AMBER_GOLD
  ROSE_QUARTZ
  SAGE_LINEN
  LAVENDER_MIST
}

enum ReviewStatus {
  PENDING_MODERATION
  PUBLISHED
  FLAGGED
  REMOVED
}

enum ReportReason {
  SPOILER_UNMARKED
  OFFENSIVE_LANGUAGE
  HARASSMENT
  SPAM_OR_ADVERTISING
  COPYRIGHT_CONCERN
  OTHER
}

enum GoalFrequency {
  DAILY
  WEEKLY
  MONTHLY
  YEARLY
}

enum NotificationType {
  STREAK_REMINDER
  ACHIEVEMENT_UNLOCKED
  GOAL_COMPLETED
  NEW_BOOK_RELEASE
  REVIEW_REACTION
  LEGAL_NOTICE
  SYSTEM_ANNOUNCEMENT
}

// ==========================================
// 2. AUTHENTICATION & ACCESS CONTROL
// ==========================================

model User {
  id                   String           @id @default(uuid())
  email                String           @unique
  passwordHash         String?
  fullName             String
  username             String           @unique
  avatarUrl            String?
  bio                  String?          @db.Text
  isEmailVerified      Boolean          @default(false)
  emailVerifiedAt      DateTime?
  isActive             Boolean          @default(true)
  createdAt            DateTime         @default(now())
  updatedAt            DateTime         @updatedAt
  lastLoginAt          DateTime?

  // RBAC Relations
  roles                UserRole[]
  sessions             Session[]
  accounts             Account[]

  // Library & Reading Relations
  savedBooks           SavedBook[]
  readingLists         ReadingList[]
  readingProgress      ReadingProgress[]
  bookmarks            Bookmark[]
  highlights           Highlight[]
  notes                Note[]

  // Community
  reviews              Review[]
  reviewReportsFiled   ReviewReport[]   @relation("UserReportsFiled")
  downloadRecords      DownloadRecord[]

  // Engagement & Gamification
  readingGoals         ReadingGoal[]
  userAchievements     UserAchievement[]
  readingStreak        ReadingStreak?
  notifications        Notification[]

  // Referrals
  referralsMade        Referral[]       @relation("ReferrerUser")
  referralsReceived    Referral[]       @relation("ReferredUser")
  referralRewards      ReferralReward[]

  // Admin Logs
  adminActivities      AdminActivityLog[]
  licenceAudits        EbookLicence[]   @relation("LicenceAuditor")

  @@index([email])
  @@index([username])
}

model Account {
  id                 String    @id @default(uuid())
  userId             String
  provider           String    // "credentials", "google", "github"
  providerAccountId  String
  refreshToken       String?   @db.Text
  accessToken        String?   @db.Text
  expiresAt          Int?
  tokenType          String?
  scope              String?
  idToken            String?   @db.Text
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt

  user               User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String    @id @default(uuid())
  userId       String
  sessionToken String    @unique
  ipAddress    String?
  userAgent    String?   @db.Text
  expiresAt    DateTime
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([sessionToken])
}

model Role {
  id          String           @id @default(uuid())
  name        UserRoleType     @unique
  description String?
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt

  permissions RolePermission[]
  users       UserRole[]
}

model Permission {
  id          String           @id @default(uuid())
  slug        String           @unique // e.g. "ebook:download", "catalogue:edit", "licence:verify"
  description String?
  createdAt   DateTime         @default(now())

  roles       RolePermission[]
}

model RolePermission {
  roleId       String
  permissionId String

  role         Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
  permission   Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)

  @@id([roleId, permissionId])
}

model UserRole {
  userId     String
  roleId     String
  assignedAt DateTime @default(now())

  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  role       Role     @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@id([userId, roleId])
}

// ==========================================
// 3. BIBLIOGRAPHIC CATALOGUE (METADATA ONLY)
// ==========================================

model Book {
  id                 String           @id @default(uuid())
  slug               String           @unique
  title              String
  subtitle           String?
  originalTitle      String?
  isbn10             String?          @unique
  isbn13             String?          @unique
  googleBooksId      String?          @unique
  openLibraryId      String?          @unique
  description        String?          @db.Text
  coverImageUrl      String?
  thumbnailUrl       String?
  publisher          String?
  publishedYear      Int?
  publishedDate      String?
  pageCount          Int?
  language           String           @default("en")
  averageRating      Decimal          @default(0.00) @db.Decimal(3, 2)
  ratingsCount       Int              @default(0)
  vibeScoreData      Json?            // Visual & emotional tags: {"cozy": 92, "scholarly": 88}
  isFeatured         Boolean          @default(false)
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @updatedAt

  // Bibliographic relations
  authors            BookAuthor[]
  categories         BookCategory[]
  tags               BookTag[]

  // Separation of Concerns: Digital Inventory
  ebook              Ebook?

  // Personal Library & Social
  savedBy            SavedBook[]
  readingListEntries ReadingListBook[]
  readingProgress    ReadingProgress[]
  bookmarks          Bookmark[]
  highlights         Highlight[]
  notes              Note[]
  reviews            Review[]
  collectionEntries  CollectionBook[]

  @@index([slug])
  @@index([title])
  @@index([isbn13])
  @@index([isFeatured])
}

model Author {
  id             String       @id @default(uuid())
  slug           String       @unique
  name           String
  birthYear      Int?
  deathYear      Int?         // Crucial for Public Domain verification (Life + 70)
  biography      String?      @db.Text
  photoUrl       String?
  nationality    String?
  openLibraryKey String?      @unique
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  books          BookAuthor[]

  @@index([name])
}

model BookAuthor {
  bookId    String
  authorId  String
  role      String?   @default("Author") // "Author", "Translator", "Illustrator", "Editor"
  order     Int       @default(0)

  book      Book      @relation(fields: [bookId], references: [id], onDelete: Cascade)
  author    Author    @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@id([bookId, authorId])
}

model Category {
  id          String         @id @default(uuid())
  name        String         @unique
  slug        String         @unique
  description String?
  icon        String?
  createdAt   DateTime       @default(now())

  books       BookCategory[]

  @@index([slug])
}

model BookCategory {
  bookId     String
  categoryId String

  book       Book     @relation(fields: [bookId], references: [id], onDelete: Cascade)
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@id([bookId, categoryId])
}

model Tag {
  id        String    @id @default(uuid())
  name      String    @unique // e.g. "Gothic Romance", "Rainy Day", "Dark Academia"
  slug      String    @unique
  createdAt DateTime  @default(now())

  books     BookTag[]

  @@index([slug])
}

model BookTag {
  bookId String
  tagId  String

  book   Book @relation(fields: [bookId], references: [id], onDelete: Cascade)
  tag    Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([bookId, tagId])
}

// ==========================================
// 4. LICENSED DIGITAL INVENTORY & ASSETS
// ==========================================

model Ebook {
  id                 String           @id @default(uuid())
  bookId             String           @unique
  format             EbookFormat      @default(EPUB)
  s3StorageKey       String           // Private object key in S3/R2 (never public)
  fileSizeBytes      BigInt
  fileSha256Checksum String           @unique // Cryptographic hash for tamper detection
  drmFreeNotice      String?          @db.Text
  isDownloadAllowed  Boolean          @default(true)
  isOnlineReadAllowed Boolean         @default(true)
  downloadCount      Int              @default(0)
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @updatedAt

  book               Book             @relation(fields: [bookId], references: [id], onDelete: Restrict)
  licence            EbookLicence?
  downloadRecords    DownloadRecord[]

  @@index([bookId])
}

model EbookLicence {
  id                    String                    @id @default(uuid())
  ebookId               String                    @unique
  category              LicenceCategory
  verificationStatus    LicenceVerificationStatus @default(DRAFT)
  licenceDocumentUrl    String?                   // S3 key to signed proof or public domain evidence
  licensorName          String?                   // e.g. "Project Gutenberg", "Author Estate", "DIMISI Tech"
  licensorContactEmail  String?
  licenceAgreementRef   String?                   // Contract number or legal reference
  territorialRights     String                    @default("WORLDWIDE") // ISO Country codes or WORLDWIDE
  validFrom             DateTime                  @default(now())
  validUntil            DateTime?                 // Nullable for perpetual/public domain
  legalNotes            String?                   @db.Text
  verifiedAt            DateTime?
  verifiedByUserId      String?
  createdAt             DateTime                  @default(now())
  updatedAt             DateTime                  @updatedAt

  ebook                 Ebook                     @relation(fields: [ebookId], references: [id], onDelete: Cascade)
  verifiedByUser        User?                     @relation("LicenceAuditor", fields: [verifiedByUserId], references: [id], onDelete: SetNull)

  @@index([verificationStatus])
  @@index([category])
}

model DownloadRecord {
  id           String    @id @default(uuid())
  ebookId      String
  userId       String
  ipAddress    String?
  userAgent    String?   @db.Text
  downloadedAt DateTime  @default(now())

  ebook        Ebook     @relation(fields: [ebookId], references: [id], onDelete: Cascade)
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([ebookId])
  @@index([userId])
}

// ==========================================
// 5. COMMUNITY & REVIEWS
// ==========================================

model Review {
  id              String         @id @default(uuid())
  bookId          String
  userId          String
  rating          Int            // 1 to 5 stars
  headline        String?
  content         String         @db.Text
  containsSpoiler Boolean        @default(false)
  status          ReviewStatus   @default(PUBLISHED)
  upvotesCount    Int            @default(0)
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  book            Book           @relation(fields: [bookId], references: [id], onDelete: Cascade)
  user            User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  reports         ReviewReport[]

  @@unique([bookId, userId]) // 1 review per book per user
  @@index([bookId])
  @@index([userId])
  @@index([status])
}

model ReviewReport {
  id          String       @id @default(uuid())
  reviewId    String
  reporterId  String
  reason      ReportReason
  details     String?      @db.Text
  isResolved  Boolean      @default(false)
  resolvedAt  DateTime?
  createdAt   DateTime     @default(now())

  review      Review       @relation(fields: [reviewId], references: [id], onDelete: Cascade)
  reporter    User         @relation("UserReportsFiled", fields: [reporterId], references: [id], onDelete: Cascade)

  @@index([reviewId])
  @@index([isResolved])
}

// ==========================================
// 6. PERSONAL LIBRARY, PROGRESS & READER
// ==========================================

model SavedBook {
  id        String        @id @default(uuid())
  userId    String
  bookId    String
  status    ReadingStatus @default(WANT_TO_READ)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt

  user      User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  book      Book          @relation(fields: [bookId], references: [id], onDelete: Cascade)

  @@unique([userId, bookId])
  @@index([userId, status])
}

model ReadingList {
  id          String            @id @default(uuid())
  userId      String
  name        String
  description String?
  isPublic    Boolean           @default(false)
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt

  user        User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  books       ReadingListBook[]

  @@index([userId])
}

model ReadingListBook {
  readingListId String
  bookId        String
  order         Int         @default(0)
  addedAt       DateTime    @default(now())

  readingList   ReadingList @relation(fields: [readingListId], references: [id], onDelete: Cascade)
  book          Book        @relation(fields: [bookId], references: [id], onDelete: Cascade)

  @@id([readingListId, bookId])
}

model ReadingProgress {
  id                  String    @id @default(uuid())
  userId              String
  bookId              String
  progressPercentage  Decimal   @default(0.00) @db.Decimal(5, 2) // e.g. 45.50%
  cfiLocation         String?   // EPUB Canonical Fragment Identifier
  currentChapterTitle String?
  currentPage         Int?
  totalPages          Int?
  secondsSpentReading Int       @default(0)
  lastReadAt          DateTime  @default(now())
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt

  user                User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  book                Book      @relation(fields: [bookId], references: [id], onDelete: Cascade)

  @@unique([userId, bookId])
  @@index([userId])
}

model Bookmark {
  id          String   @id @default(uuid())
  userId      String
  bookId      String
  cfiLocation String   // EPUB CFI locator
  label       String?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  book        Book     @relation(fields: [bookId], references: [id], onDelete: Cascade)

  @@index([userId, bookId])
}

model Highlight {
  id           String         @id @default(uuid())
  userId       String
  bookId       String
  cfiRange     String         // EPUB CFI range expression
  selectedText String         @db.Text
  color        HighlightColor @default(AMBER_GOLD)
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt

  user         User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  book         Book           @relation(fields: [bookId], references: [id], onDelete: Cascade)
  notes        Note[]

  @@index([userId, bookId])
}

model Note {
  id          String     @id @default(uuid())
  userId      String
  bookId      String
  highlightId String?
  content     String     @db.Text
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  book        Book       @relation(fields: [bookId], references: [id], onDelete: Cascade)
  highlight   Highlight? @relation(fields: [highlightId], references: [id], onDelete: Cascade)

  @@index([userId, bookId])
}

// ==========================================
// 7. CURATED EDITORIAL COLLECTIONS
// ==========================================

model Collection {
  id             String           @id @default(uuid())
  title          String
  slug           String           @unique
  description    String?          @db.Text
  bannerImageUrl String?
  curatorName    String           @default("The Dimisi Curators")
  isFeatured     Boolean          @default(false)
  createdAt      DateTime         @default(now())
  updatedAt      DateTime         @updatedAt

  books          CollectionBook[]

  @@index([slug])
  @@index([isFeatured])
}

model CollectionBook {
  collectionId String
  bookId       String
  curatorNote  String?  @db.Text
  order        Int      @default(0)

  collection   Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)
  book         Book       @relation(fields: [bookId], references: [id], onDelete: Cascade)

  @@id([collectionId, bookId])
}

// ==========================================
// 8. ENGAGEMENT & GAMIFICATION
// ==========================================

model ReadingGoal {
  id             String        @id @default(uuid())
  userId         String
  year           Int
  frequency      GoalFrequency @default(YEARLY)
  targetBooks    Int           @default(12)
  completedBooks Int           @default(0)
  isCompleted    Boolean       @default(false)
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  user           User          @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, year, frequency])
  @@index([userId])
}

model Achievement {
  id          String            @id @default(uuid())
  code        String            @unique // e.g. "MIDNIGHT_SCHOLAR", "CENTURY_CLUB"
  title       String
  description String
  badgeIcon   String            // Icon or asset key
  secret      Boolean           @default(false)
  points      Int               @default(10)
  createdAt   DateTime          @default(now())

  users       UserAchievement[]

  @@index([code])
}

model UserAchievement {
  userId        String
  achievementId String
  unlockedAt    DateTime    @default(now())

  user          User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  achievement   Achievement @relation(fields: [achievementId], references: [id], onDelete: Cascade)

  @@id([userId, achievementId])
}

model ReadingStreak {
  id               String    @id @default(uuid())
  userId           String    @unique
  currentStreakDays Int      @default(0)
  longestStreakDays Int      @default(0)
  lastReadingDate  DateTime? @db.Date
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  user             User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model Notification {
  id        String           @id @default(uuid())
  userId    String
  type      NotificationType
  title     String
  message   String           @db.Text
  actionUrl String?
  isRead    Boolean          @default(false)
  createdAt DateTime         @default(now())

  user      User             @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, isRead])
}

// ==========================================
// 9. MARKETING & REFERRALS (COMPLIANT)
// ==========================================

model NewsletterSubscriber {
  id           String    @id @default(uuid())
  email        String    @unique
  isSubscribed Boolean   @default(true)
  source       String?   @default("homepage")
  subscribedAt DateTime  @default(now())
  unsubscribedAt DateTime?

  @@index([email])
}

model Referral {
  id             String    @id @default(uuid())
  referrerUserId String
  referredUserId String    @unique
  referralCode   String
  isQualified    Boolean   @default(false) // Triggered after reading first legitimate book
  createdAt      DateTime  @default(now())

  referrerUser   User      @relation("ReferrerUser", fields: [referrerUserId], references: [id], onDelete: Cascade)
  referredUser   User      @relation("ReferredUser", fields: [referredUserId], references: [id], onDelete: Cascade)

  @@index([referrerUserId])
  @@index([referralCode])
}

model ReferralReward {
  id        String   @id @default(uuid())
  userId    String
  points    Int      @default(50)
  reason    String   // "Successful referral of new reader"
  claimedAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model Campaign {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  bannerText  String?
  targetVibe  String?
  startDate   DateTime
  endDate     DateTime
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  @@index([slug])
  @@index([isActive])
}

// ==========================================
// 10. AUDIT & ADMINISTRATION
// ==========================================

model AdminActivityLog {
  id         String   @id @default(uuid())
  adminId    String
  action     String   // e.g. "LICENCE_VERIFIED", "BOOK_METADATA_UPDATED", "EBOOK_REVOKED"
  entityType String   // "EbookLicence", "Book", "User"
  entityId   String
  metadata   Json?    // Detailed diff or snapshot
  ipAddress  String?
  createdAt  DateTime @default(now())

  admin      User     @relation(fields: [adminId], references: [id], onDelete: Cascade)

  @@index([adminId])
  @@index([action])
  @@index([entityType, entityId])
}
```

---

## 4. API Route Map & Role-Based Access Control (RBAC)

### 4.1 RBAC Permission Matrix

```
┌─────────────────────────────────┬─────────────┬─────────────┬───────────┬─────────────┬───────┬───────────┐
│ Capability / Route Action       │ SUPER_ADMIN │ CONTENT_MGR │ MODERATOR │ SUPPORT_ADM │ USER  │ ANONYMOUS │
├─────────────────────────────────┼─────────────┼─────────────┼───────────┼─────────────┼───────┼───────────┤
│ View Public Catalog & Vibes     │     ✅      │     ✅      │    ✅     │     ✅      │  ✅   │    ✅     │
│ Read / Stream Licensed E-Book   │     ✅      │     ✅      │    ✅     │     ✅      │  ✅   │    ❌     │
│ Download Licensed E-Book        │     ✅      │     ✅      │    ✅     │     ✅      │  ✅   │    ❌     │
│ Save Book / Update Progress     │     ✅      │     ✅      │    ✅     │     ✅      │  ✅   │    ❌     │
│ Write Book Review               │     ✅      │     ✅      │    ✅     │     ✅      │  ✅   │    ❌     │
│ Report Inappropriate Content    │     ✅      │     ✅      │    ✅     │     ✅      │  ✅   │    ❌     │
│ Moderate Reviews / Triage Report│     ✅      │     ❌      │    ✅     │     ❌      │  ❌   │    ❌     │
│ Ingest / Edit Catalogue Books   │     ✅      │     ✅      │    ❌     │     ❌      │  ❌   │    ❌     │
│ Upload Digital E-Book Binaries  │     ✅      │     ✅      │    ❌     │     ❌      │  ❌   │    ❌     │
│ Verify & Authorize Licences     │     ✅      │     ✅      │    ❌     │     ❌      │  ❌   │    ❌     │
│ Issue DMCA Revocation / Freeze  │     ✅      │     ✅      │    ❌     │     ❌      │  ❌   │    ❌     │
│ Manage User Accounts / Roles    │     ✅      │     ❌      │    ❌     │     ✅(View)│  ❌   │    ❌     │
│ View Global Audit Activity Logs │     ✅      │     ❌      │    ❌     │     ❌      │  ❌   │    ❌     │
└─────────────────────────────────┴─────────────┴─────────────┴───────────┴─────────────┴───────┴───────────┘
```

### 4.2 Comprehensive API Route Map (Next.js App Router)

| Method | Endpoint | Description | Auth / RBAC Required | Rate Limit Tier |
| :--- | :--- | :--- | :--- | :--- |
| **AUTH MODULE** | | | | |
| `POST` | `/api/auth/register` | Create standard user account | Public | 5 req / min |
| `POST` | `/api/auth/login` | Email/password login with secure session cookie | Public | 5 req / min |
| `POST` | `/api/auth/logout` | Invalidate session | Authenticated | 20 req / min |
| `GET` | `/api/auth/me` | Fetch active user profile and roles | Authenticated | 60 req / min |
| **CATALOGUE MODULE** | | | | |
| `GET` | `/api/books` | Search, filter by vibe, author, genre, availability | Public | 120 req / min |
| `GET` | `/api/books/[slug]` | Full bibliographic profile & availability status | Public | 120 req / min |
| `POST` | `/api/admin/books/sync-isbn`| Fetch & normalize metadata from Google Books/OL | `CONTENT_MANAGER`+ | 30 req / min |
| `POST` | `/api/admin/books` | Manually create or modify catalogue entry | `CONTENT_MANAGER`+ | 30 req / min |
| **DIGITAL INVENTORY & LICENSING** | | | | |
| `POST` | `/api/admin/inventory/upload-url`| Request pre-signed S3 upload URL for EPUB/PDF | `CONTENT_MANAGER`+ | 10 req / min |
| `POST` | `/api/admin/inventory/register`| Register uploaded file with sha256 & metadata | `CONTENT_MANAGER`+ | 10 req / min |
| `POST` | `/api/admin/licences/verify` | Submit formal legal verification review | `CONTENT_MANAGER`+ | 20 req / min |
| `POST` | `/api/admin/licences/[id]/revoke`| Instant legal freeze / DMCA revocation | `CONTENT_MANAGER`+ | 20 req / min |
| **READER & DOWNLOAD ACCESS** | | | | |
| `POST` | `/api/reader/[bookId]/token`| Issue signed, short-lived reader access token | Authenticated `USER` | 30 req / min |
| `GET` | `/api/reader/[bookId]/manifest`| Retrieve authorized EPUB package manifest | Authenticated `USER` | 60 req / min |
| `GET` | `/api/reader/[bookId]/stream` | Stream range-requested e-book chunk via proxy | Authenticated `USER` | 240 req / min |
| `POST` | `/api/downloads/[bookId]` | Generate 5-minute single-use signed download URL | Authenticated `USER` | 10 req / day |
| **PERSONAL LIBRARY & READER STATE** | | | | |
| `GET` | `/api/library` | Get user saved books, shelves, and reading lists | Authenticated `USER` | 60 req / min |
| `POST` | `/api/library/save` | Add book to shelf (WANT_TO_READ, etc.) | Authenticated `USER` | 60 req / min |
| `PUT` | `/api/reader/progress` | Sync reading progress (CFI, %, chapter) | Authenticated `USER` | 120 req / min |
| `GET` | `/api/reader/[bookId]/annotations`| Fetch bookmarks, highlights, and notes | Authenticated `USER` | 60 req / min |
| `POST` | `/api/reader/highlights` | Create highlight with color selection | Authenticated `USER` | 60 req / min |
| **AI LIBRARIAN & DISCOVERY** | | | | |
| `POST` | `/api/ai/librarian/chat` | Conversational book query & vibe matching | Authenticated `USER` | 15 req / min |
| `GET` | `/api/recommendations/vibe` | Algorithmic sensory recommendations | Public | 60 req / min |
| **COMMUNITY & REVIEWS** | | | | |
| `POST` | `/api/reviews` | Submit book review & star rating | Authenticated `USER` | 10 req / min |
| `POST` | `/api/reviews/[id]/report`| Report review for moderation | Authenticated `USER` | 10 req / min |
| `GET` | `/api/admin/moderation/queue`| Fetch pending/reported reviews | `MODERATOR`+ | 60 req / min |
| `POST` | `/api/admin/moderation/resolve`| Publish, flag, or remove reported review | `MODERATOR`+ | 60 req / min |

---

## 5. Digital Licensing & Signed-URL Access Workflow

### 5.1 The 4-Tier Verified Licence Taxonomy

To guarantee strict compliance with copyright laws globally, DimisiReads enforces a formal qualification pipeline before any digital asset is marked readable or downloadable:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    THE 4 VERIFIED LICENCE CATEGORIES                        │
├───────────────────────────────┬─────────────────────────────────────────────┤
│ 1. Public Domain              │ Life of author + 70 years verified, or      │
│    (Jurisdiction-audited)     │ publication before 1929 (US) / local laws.   │
│                               │ Example: Jane Austen, Bram Stoker.          │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ 2. DIMISI-Owned               │ Direct corporate copyright owned by DIMISI  │
│    (Proprietary Publications) │ Technologies. Commissioned works & guides.  │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ 3. Explicit Distribution      │ Direct bilateral contractual licence signed │
│    Permission                 │ with author/estate/publisher with valid     │
│                               │ date range, territory, and rights schedule. │
├───────────────────────────────┼─────────────────────────────────────────────┤
│ 4. Open / Permissive Licence  │ Permissive copyright: CC0, CC-BY, CC-BY-SA, │
│                               │ Project Gutenberg licence terms adhered to. │
└───────────────────────────────┴─────────────────────────────────────────────┘
```

### 5.2 Secure Delivery Workflow: Signed URL & Streaming Proxy

Under no circumstances is an S3 bucket made public or file URLs permanently exposed. The sequence below details how authorized readers and downloaders obtain access:

```
[ User Browser ]      [ Next.js API / Edge ]       [ Redis Cache ]     [ PostgreSQL ]      [ Private S3 / R2 ]
       │                        │                         │                  │                     │
       │─── 1. Request Download ─>
       │    POST /api/downloads/:bookId
       │                        │
       │                        ├── 2. Check Rate Limit ──>
       │                        │   (10 downloads/day)    │
       │                        │<── Limit OK ────────────│
       │                        │
       │                        ├── 3. Verify Active Session & User Role ────>
       │                        │                                            │
       │                        ├── 4. Query Book, Ebook & EbookLicence ─────>
       │                        │<── Return Licence Status & S3 Key ─────────│
       │                        │
       │                        ├─- 5. COMPLIANCE CHECK:
       │                        │   Is licence.verificationStatus == 'VERIFIED_ACTIVE'?
       │                        │   Is licence.validUntil null OR > now()?
       │                        │   Is ebook.isDownloadAllowed == true?
       │                        │   (If NO -> 403 Forbidden with legal explanation)
       │                        │
       │                        ├── 6. Record in DownloadRecord (audit log) ─>
       │                        │
       │                        ├── 7. Generate Signed AWS S3 / Cloudflare R2 URL
       │                        │   - Expiration: 300 seconds (5 minutes)
       │                        │   - Content-Disposition: attachment; filename="..."
       │                        │   - Cryptographic signature attached
       │                        │
       │<── 8. Return JSON ─────│
       │    { downloadUrl: "https://vault.dimisireads.com/...?X-Amz-Signature=..." }
       │
       │─── 9. Direct Temporary Fetch from S3 ─────────────────────────────────────────────────────>
       │<── 10. Binary Stream of EPUB/PDF (Browser saves file) ────────────────────────────────────│
```

---

## 6. Missing Decisions & Technical Risks (Pre-Phase 1 Confirmation)

Before writing the application code in Phase 1, the following architectural choices and technical risks must be evaluated:

| Category | Issue / Risk | Options & Recommendations | Impact on Phase 1 |
| :--- | :--- | :--- | :--- |
| **Storage & Bandwidth** | High egress costs on large PDF/EPUB downloads via standard AWS S3. | **Option A:** AWS S3 Private Bucket + CloudFront.<br>**Option B (Recommended):** Cloudflare R2 (zero egress fees) with private pre-signed S3 API access. | Configure Cloudflare R2 credentials in environment matrix. |
| **Web Reader Engine** | Rendering fidelity across EPUB 3, reflowable layouts, fixed layouts, and PDFs. | **Option A:** `epub.js` (mature, standard React integrations).<br>**Option B (Recommended):** Modern Folio/Foliate-js web components + PDF.js for crisp multi-device rendering. | Build modular adapter abstraction `ReaderEngineAdapter`. |
| **Dynamic Watermarking** | Protection of licensed author works against unauthorized off-platform distribution. | Should licensed non-public-domain downloads be dynamically watermarked with buyer/user metadata? **Recommendation:** For Category 3 (Explicit Permission), stamp first/last page with user download ID. | Add EPUB/PDF post-processing pipeline in Phase 2. |
| **Public Domain Border Nuances** | Discrepancies between US copyright (pre-1929) and Commonwealth/EU (author death + 70 years). | Store `territorialRights` in `EbookLicence`. Use IP geolocation at download request to enforce geo-blocking if a title is public domain in the US but under copyright in the UK. | Implement IP geo-lookup service in licensing module. |
| **External API Quotas** | Google Books API has daily rate limits (1,000 queries/day without billable quota). | Use Redis caching with 7-day TTL for raw search responses and prefer Open Library API for bulk bibliographic dumps. | Ensure Redis metadata cache wrapper is implemented first. |
| **Mobile 3D Performance** | GSAP 3D Bookshelves and Three.js fairy lights might cause frame drops on low-end mobile devices. | Implement graceful degradation: Render pure 2D CSS-transforms with static candle glow on mobile viewport `< 768px`; enable interactive 3D WebGL on desktop. | Include responsive viewport detect in UI components. |

---

## 7. Implementation Roadmap: Phases 1 to 5

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PROJECT ROADMAP OVERVIEW                           │
├─────────────┬───────────────────────────────────────────────────────────────┤
│ Phase 1     │ Foundation, Database, Auth & UI Design System                 │
│ (Immediate) │ - Next.js 15 App Router scaffold, Tailwind, Custom Theme      │
│             │ - Prisma migration, PostgreSQL setup, Redis integration       │
│             │ - Cookie-based Auth & RBAC Middleware                         │
│             │ - Cozy Editorial component library (React Bits, GSAP hooks)   │
├─────────────┼───────────────────────────────────────────────────────────────┤
│ Phase 2     │ Bibliographic Engine & Catalog Discovery                      │
│             │ - Google Books / Open Library API ingestion pipeline          │
│             │ - Multi-facet search, "Browse by Vibe" sensory filters        │
│             │ - Interactive 3D Fairy-lit Bookshelf & Spine-to-Spine View   │
│             │ - Book Detail Page with dynamic legal availability pill       │
├─────────────┼───────────────────────────────────────────────────────────────┤
│ Phase 3     │ The Lantern Sanctuary (E-Book Reader) & Secure Storage        │
│             │ - Cloudflare R2 / S3 pre-signed URL secure delivery workflow  │
│             │ - Foliate / EPUB.js Web Reader with Candlelight/Lantern mode  │
│             │ - Annotation vault: Highlighting, sticky notes, progress sync │
├─────────────┼───────────────────────────────────────────────────────────────┤
│ Phase 4     │ User Sanctum, Streaks, Gamification & AI Librarian            │
│             │ - User Dashboard, custom reading lists, goals & achievements  │
│             │ - Reading streak tracking with candle-lit calendar            │
│             │ - "The Dimisi Librarian" conversational AI recommender        │
├─────────────┼───────────────────────────────────────────────────────────────┤
│ Phase 5     │ Grand Archivist Portal (Admin) & Legal Compliance Desk        │
│             │ - Digital inventory & licence verification audit pipeline    │
│             │ - DMCA instant takedown workflow & tamper audit logs          │
│             │ - Community moderation desk & production readiness audit      │
└─────────────┴───────────────────────────────────────────────────────────────┘
```
