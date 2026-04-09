# External Integrations

**Analysis Date:** 2026-02-25

## APIs & External Services

**Directus CMS:**
- Service: Directus 11.14.1 (self-hosted)
- Purpose: Headless CMS for products, blog, brand configuration, leads management
- SDK/Client: @directus/sdk 18.0.0
- Integration points:
  - Frontend: `src/lib/directus.ts` - Data fetching with staticToken auth
  - Backend: Schema setup (`backend/setup-schema.js`), seed data (`backend/seed-data.js`)
  - Image serving: Asset URL generation via `src/lib/directus-image-loader.ts`
  - Auth: Static admin token via `DIRECTUS_ADMIN_TOKEN` environment variable
- Collections accessed:
  - Product data: `pim_products`, `pim_disciplines`
  - Blog: `blog_posts`, `blog_categories`
  - Configuration: `sys_brand`, `sys_skills`, `sys_menus`, `web_regulation`
  - Leads: `crm_leads` (contact form submissions)

**Google Fonts:**
- Service: Google Fonts API
- Purpose: Host Manrope font family
- Implementation: Via `next/font/google` in `src/app/[locale]/layout.tsx`
- No manual configuration required (Next.js handles CDN)

## Data Storage

**Databases:**
- PostgreSQL 16-alpine
  - Connection: `postgres://vivaz:password@db:5432/vivaz` (docker-compose networking)
  - Environment vars: `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
  - ORM/Client: Directus handles abstraction (backend uses Directus SDK)
  - Hosted as service in `docker-compose.yml` with persistent volume `db_data`

**File Storage:**
- Directus file management system
  - Images stored in `/directus/uploads` volume (managed by Directus)
  - Asset serving: HTTP requests to `/assets/{uuid}` with optional params (width, format, quality)
  - Image loader: `src/lib/directus-image-loader.ts` for Next.js image optimization
  - Public URL: `NEXT_PUBLIC_DIRECTUS_URL` (browser-accessible)
  - Internal URL: `DIRECTUS_INTERNAL_URL` (server-side, Docker network)

**Caching:**
- Not explicitly configured - Relies on Next.js built-in caching and browser cache

## Authentication & Identity

**Auth Provider:**
- Custom Directus admin token authentication
- Implementation: Static token via `ADMIN_TOKEN` environment variable
- Backend:
  - `backend/docker-init.js` - Sets up static admin token on Directus initialization
  - Static token verified and stored in Directus user model
- Frontend:
  - Token passed to Directus SDK via `staticToken()` middleware
  - Server-side only: `DIRECTUS_ADMIN_TOKEN` not exposed to browser
- No end-user login system currently implemented (CMS is admin-only)

## Monitoring & Observability

**Error Tracking:**
- Not detected - No error tracking service (Sentry, etc.) configured
- Local logging only: `console.error()` in contact API (`src/app/api/contact/route.ts`)
- Fallback mechanism: Contact form still returns success if Directus token not available

**Logs:**
- Docker container logs: Standard output from Directus and Next.js services
- Backend setup logs: Console output from `docker-init.js`, `setup-schema.js`, `seed-data.js`
- Frontend: Browser console and Next.js dev server output
- Access logs: Nginx reverse proxy (not visible in provided files)

## CI/CD & Deployment

**Hosting:**
- Docker Compose stack with external Nginx proxy
- Deployment target: Production behind nginx-proxy with Let's Encrypt SSL
- Services orchestrated in `docker-compose.yml`:
  - PostgreSQL (db)
  - Directus (directus)
  - Initialization container (init)
  - Frontend Next.js (frontend with profile: ["frontend"])

**CI Pipeline:**
- Not detected - No GitHub Actions, GitLab CI, or other CI config files present
- Manual Docker Compose deployment process

## Environment Configuration

**Required env vars (from `.env.example`):**
- PostgreSQL: `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
- Directus credentials: `DIRECTUS_KEY`, `DIRECTUS_SECRET`, `DIRECTUS_ADMIN_EMAIL`, `DIRECTUS_ADMIN_PASSWORD`
- Admin token: `ADMIN_TOKEN` (generated during `docker-init.js`)
- Public URLs: `DIRECTUS_HOST`, `DIRECTUS_PUBLIC_URL`, `FRONTEND_HOST`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DIRECTUS_URL`
- CORS: `CORS_ORIGIN` (defaults to localhost:3030, production: https://platosvivaz.com)

**Secrets location:**
- `.env` file (Git-ignored)
- Reference provided in `.env.example` for setup
- Docker Compose passes as environment variables to containers

## Webhooks & Callbacks

**Incoming:**
- Contact form API endpoint: `POST /api/contact` (`src/app/api/contact/route.ts`)
  - Accepts: name, email, phone, company, market, interest, message, source_page
  - Response: `{ success: true }` or error with fallback
  - Stores leads in Directus `crm_leads` collection
- llms.txt SEO endpoint: `GET /llms.txt` (`src/app/llms.txt/route.ts`)
  - AI-readable site metadata (not detailed in provided files)

**Outgoing:**
- Not detected - No webhooks to external services
- Email notifications: Not configured (contact form includes "set up an alert/email to admin" TODO comment)

## Additional API Routes

**Public Routes:**
- `GET /robots.ts` - SEO robots.txt generation
- `GET /sitemap.ts` - Dynamic sitemap generation
- `GET /llms.txt` - AI metadata endpoint

**Server-side Functions:**
- Product queries: `getProducts()`, `getProductBySlug()` - Fetch from `pim_products`
- Discipline queries: `getDisciplines()` - Fetch from `pim_disciplines`
- Blog queries: `getBlogPosts()`, `getBlogPostBySlug()` - Fetch from `blog_posts`
- Configuration queries: `getRegulationData()`, `getBrandData()` - Fetch singletons
- All queries use Directus SDK with static token authentication (server-side only)

---

*Integration audit: 2026-02-25*
