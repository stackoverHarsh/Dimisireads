# DimisiReads — Production Deployment & Infrastructure Guide

This document provides step-by-step production deployment instructions, cloud infrastructure architecture, environment configurations, and operational playbooks for **DimisiReads** under **DIMISI Technologies**.

---

## 1. System Architecture Overview

```
                      +-----------------------------+
                      |   Cloudflare Edge Network   |
                      |  (DNS, SSL/TLS, DDoS, WAF)  |
                      +--------------+--------------+
                                     |
                                     v
                      +-----------------------------+
                      |      Vercel App Router      |
                      |   (Next.js 15, SSR, ISR,    |
                      |    Edge/Node API Routes)    |
                      +-------+-------------+-------+
                              |             |
           +------------------+             +------------------+
           |                                                   |
           v                                                   v
+---------------------+                             +---------------------+
| Managed PostgreSQL  |                             | Cloudflare R2 / S3  |
|  (Neon / Supabase / |                             |  (Private Encrypted |
|      RDS Aurora)    |                             |   Digital Vault)    |
+----------+----------+                             +---------------------+
           |
           v
+---------------------+
| Upstash Redis Cache |
|  (Sessions, Rate    |
|   Limiting, Scache) |
+---------------------+
```

---

## 2. Environment Variables & Secrets Matrix

Configure these environment variables in your deployment environment (e.g., Vercel Project Settings > Environment Variables).

> [!CAUTION]
> Never commit `.env` or production secrets into source control. All production secrets must have minimum 32 characters of high-entropy cryptographic randomness.

| Variable | Description | Required | Example |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | Application environment mode | Yes | `production` |
| `NEXT_PUBLIC_APP_URL` | Public canonical base URL | Yes | `https://dimisireads.com` |
| `NEXT_PUBLIC_APP_NAME`| Platform branding name | Yes | `DimisiReads` |
| `DATABASE_URL` | Pooled connection string to PostgreSQL | Yes | `postgresql://user:pass@ep-cool-pooler.region.neon.tech/dimisireads?sslmode=require` |
| `DIRECT_URL` | Direct unpooled connection string (for migrations) | Yes | `postgresql://user:pass@ep-cool.region.neon.tech/dimisireads?sslmode=require` |
| `SESSION_SECRET` | HMAC secret for session authentication (min 32 chars) | Yes | `crypto.randomBytes(32).toString('hex')` |
| `JWT_SECRET` | JWT token signing key (min 32 chars) | Yes | `crypto.randomBytes(32).toString('hex')` |
| `COOKIE_DOMAIN` | Domain for Secure HTTP-only cookies | Yes | `.dimisireads.com` (or `dimisireads.com`) |
| `REDIS_URL` | Redis instance connection URL | Yes | `rediss://default:xxxx@region.upstash.io:6379` |
| `S3_ENDPOINT` | Private object storage S3 endpoint | Yes | `https://<account_id>.r2.cloudflarestorage.com` |
| `S3_REGION` | S3 region identifier (`auto` for Cloudflare R2) | Yes | `auto` (or `us-east-1`) |
| `S3_ACCESS_KEY_ID` | Storage IAM / Access Key ID | Yes | `0123456789abcdef` |
| `S3_SECRET_ACCESS_KEY`| Storage Secret Access Key | Yes | `abcdef0123456789...` |
| `S3_BUCKET_NAME` | Private vault bucket name | Yes | `dimisireads-licensed-vault` |
| `S3_FORCE_PATH_STYLE` | Path style addressing (`false` for AWS, `true` for R2) | Yes | `true` |
| `GOOGLE_BOOKS_API_KEY`| Google Books API key for bibliographic ingestion | Optional | `AIzaSy...` |
| `OPEN_LIBRARY_API_BASE`| Open Library API base endpoint | Optional | `https://openlibrary.org` |
| `GEMINI_API_KEY` | Google Gemini API key for smart book categorization | Optional | `AIzaSy...` |

---

## 3. Database Migration & Provisioning (PostgreSQL)

DimisiReads requires PostgreSQL 15+ with standard relational integrity and JSONB support.

### 3.1 Provisioning (Neon / Supabase / AWS RDS)
1. Create a production PostgreSQL cluster in the primary region matching your Vercel deployment (e.g., `us-east-1`).
2. Ensure connection pooling is enabled (PgBouncer or Neon connection pooler).
3. Set statement timeouts to `15s` for OLTP routes and `60s` for analytics queries.

### 3.2 Running Migrations
During CI/CD or before deploying the updated web application, execute:
```bash
# Apply all pending migrations safely to production DB
npx prisma migrate deploy

# Verify schema validation state
npx prisma validate
```

### 3.3 Backup Strategy
- **Point-in-Time Recovery (PITR):** Enable continuous WAL archiving with 7-day minimum retention window.
- **Daily Logical Snapshot:** Automated `pg_dump` snapshot scheduled every midnight UTC, encrypted and archived to separate object storage with 30-day retention.

---

## 4. Secure Private Digital Vault (Cloudflare R2 / AWS S3)

DimisiReads strictly enforces copyright compliance. All e-book source files (EPUB, PDF) reside in private, non-public storage buckets and are accessed only via short-lived HMAC time-limited signed URLs.

### 4.1 Bucket Security Policy
- Block all public read/write access.
- Enable Server-Side Encryption with AES-256 (`SSE-S3`) or KMS (`SSE-KMS`).
- Lifecycle policies: Retain deleted objects for 30 days via Object Versioning.

### 4.2 CORS Configuration for Direct Secure Streaming
Apply the following CORS rule to your storage bucket:
```json
[
  {
    "AllowedOrigins": [
      "https://dimisireads.com",
      "https://*.dimisireads.com"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["Range", "Authorization", "Content-Type"],
    "ExposeHeaders": ["Content-Range", "Content-Length", "ETag", "Accept-Ranges"],
    "MaxAgeSeconds": 3600
  }
]
```

---

## 5. Vercel Production Deployment

### 5.1 Project Setup
1. Link your repository (`stackoverHarsh/Dimisireads`) to Vercel.
2. Select **Next.js** framework preset.
3. Node.js Version: **20.x or 22.x**.
4. Configure Build & Development Settings:
   - **Build Command:** `npm run build` (or `pnpm build`)
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install` (or `npm install`)

### 5.2 Build Command & Prisma Client Generation
Verify that `prisma generate` runs as part of build or postinstall. In `package.json`:
```json
"scripts": {
  "postinstall": "prisma generate",
  "build": "next build"
}
```

### 5.3 Edge Middleware & Caching Headers
Next.js App Router headers are configured for caching:
- Static assets (images, fonts, scripts): `Cache-Control: public, max-age=31536000, immutable`
- Public metadata / sitemap: `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`
- Private routes (`/dashboard/*`, `/admin/*`, `/api/*`): `Cache-Control: private, no-cache, no-store, must-revalidate`

---

## 6. Redis Setup (Upstash)

1. Create a serverless Redis database on [Upstash](https://upstash.com) in the same cloud region.
2. Copy the REST URL or standard Redis URI (`rediss://...`) into `REDIS_URL`.
3. Used for:
   - Token blacklist and immediate session revocation.
   - Reader rate-limiting (preventing token scraping or mass downloads).
   - Reading streak cache.

---

## 7. Security Hardening & Pre-Flight Verification

Ensure the following security controls are active before go-live:
1. **Strict Content Security Policy (CSP):** Prevent XSS by restricting script and frame sources.
2. **Zero Leaked Secrets:** In production (`NODE_ENV=production`), `handleApiError` suppresses raw stack traces and internal query errors.
3. **HTTP-only Cookies:** Session cookies configured with `HttpOnly`, `Secure`, `SameSite=Lax`, and bounded expiration.
4. **RBAC Guardrails:**
   - `/admin/*` routes strictly require `MODERATOR`, `CONTENT_MANAGER`, `SUPPORT_ADMIN`, or `SUPER_ADMIN`.
   - `/api/admin/users` strictly restricts role elevation to `SUPER_ADMIN`.
   - `/api/downloads/*` and `/api/reader/*` strictly check verified distribution licensing (`PUBLIC_DOMAIN`, `DIMISI_OWNED`, `EXPLICIT_DISTRIBUTION_GRANTED`, `OPEN_PERMISSIVE`).
5. **SEO & Crawlers:**
   - Public pages indexed via dynamic `/sitemap.xml`.
   - Private routes blocked via `/robots.txt` (`/admin`, `/dashboard`, `/api`, `/read`).

---

## 8. Rollback & Incident Response Plan

In the event of an outage or degraded performance:
1. **Instant Rollback on Vercel:** Go to Vercel Deployments > Previous Stable Deployment > **Instant Rollback**.
2. **Database Schema Rollbacks:** Avoid breaking migrations. Always make backward-compatible changes (expand and contract pattern).
3. **Emergency E-Book Access Killswitch:** Admin can set `isDownloadAllowed=false` or `isOnlineReadAllowed=false` in `/admin/inventory` to instantly revoke access to any book without redeployment.
