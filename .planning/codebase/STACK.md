# Technology Stack

**Analysis Date:** 2026-02-25

## Languages

**Primary:**
- TypeScript 5.x - Used in frontend (`frontend/tsconfig.json`) with strict mode enabled
- JavaScript (ES modules) - Backend scripts use `.js` files with Node.js ES module syntax (`backend/package.json` type: "module")
- HTML/CSS - Standard web markup and styling

**Secondary:**
- JSON - Configuration and data exchange (Directus schema, translations)

## Runtime

**Environment:**
- Node.js 22-alpine - Specified in Docker Compose for backend initialization container (`docker-compose.yml` line 64)
- Next.js 16.1.6 runtime - Powers frontend (React Server Components, App Router)

**Package Manager:**
- npm - Used in both frontend and backend
- Lockfile: Present (`frontend/package-lock.json`, `backend/package-lock.json`)

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework with App Router, SSR, static generation
- React 19.2.3 - UI library with latest features
- Directus 11.14.1 (CMS backend) - Headless CMS running in Docker container

**Internationalization:**
- next-intl 4.1.0 - i18n solution for multi-language support (es, en, fr, de)
- Uses localePrefix "as-needed" strategy in routing

**Styling:**
- Tailwind CSS v4 (NOT v3) - Using new PostCSS plugin format
- PostCSS 4.x via @tailwindcss/postcss plugin - Configured in `frontend/postcss.config.mjs`
- CSS variables - Brand colors mapped via `@theme inline` in globals.css

**Animation & Interactivity:**
- framer-motion 12.34.0 - Advanced animation library for React components
- Lenis 1.3.17 - Smooth scrolling library (NOT @studio-freight/react-lenis due to React 19 incompatibility)
- CSS keyframes - Direct CSS animations alongside framer-motion
- IntersectionObserver - Native scroll detection for triggers

**Typography:**
- Quablo font (local, multi-weight: 100-700) - Heading font
- Manrope (Google Fonts) - Body text font
- Font loading via `next/font` (local + google)

**Testing & Development:**
- ESLint 9.x - Linting with Next.js config integration
- TypeScript strict mode - Strict type checking enabled

## Key Dependencies

**Critical:**
- @directus/sdk 18.0.0 - Official SDK for both frontend and backend
  - Frontend: Data fetching, asset URLs, server-side queries
  - Backend: Schema setup, collection/field/relation creation, seed data
- next-intl 4.1.0 - Translation and locale routing (required for multi-language)
- framer-motion 12.34.0 - Motion library (production critical for animations)
- tailwind-merge 3.4.0 - Utility for merging Tailwind class names

**Infrastructure:**
- clsx 2.1.1 - Conditional className utility
- dotenv 16.4.0 - Environment variable loading in backend scripts

## Configuration

**Environment:**
- `.env` file present - Contains configuration (reference: `.env.example`)
- Key env vars (from `.env.example`):
  - PostgreSQL: `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
  - Directus: `DIRECTUS_KEY`, `DIRECTUS_SECRET`, `DIRECTUS_ADMIN_EMAIL`, `DIRECTUS_ADMIN_PASSWORD`, `ADMIN_TOKEN`
  - URLs: `DIRECTUS_HOST`, `DIRECTUS_PUBLIC_URL`, `DIRECTUS_INTERNAL_URL`, `FRONTEND_HOST`, `NEXT_PUBLIC_SITE_URL`
  - CORS: `CORS_ORIGIN`
  - Frontend client vars: `NEXT_PUBLIC_DIRECTUS_URL`, `NEXT_PUBLIC_SITE_URL`

**Build:**
- `frontend/next.config.ts` - Configured with:
  - next-intl plugin integration
  - Remote image patterns (HTTPS, localhost, Docker directus)
  - Experimental view transitions enabled
  - Content-Security-Policy and X-Frame-Options headers
  - SVG handling enabled
- `frontend/tsconfig.json` - Strict TypeScript, React JSX, path aliases (@/*)
- `frontend/eslint.config.mjs` - ESLint 9 flat config with Next.js and TypeScript presets
- `frontend/postcss.config.mjs` - Tailwind v4 PostCSS plugin configuration

## Platform Requirements

**Development:**
- Node.js 22+ (Alpine)
- Docker & Docker Compose (for full stack: PostgreSQL + Directus + Next.js)
- npm package manager

**Production:**
- Docker Compose orchestration
- PostgreSQL 16-alpine database
- Directus 11.14.1 service
- Next.js 16.1.6 frontend service
- Nginx reverse proxy (referenced as `proxy_net` external network in docker-compose)
- Let's Encrypt SSL support (via LETSENCRYPT_HOST environment variables)

---

*Stack analysis: 2026-02-25*
