# Roadmap: Vivaz Clay Targets (platosvivaz.com)

## Overview

This is a brownfield enhancement project on a codebase that is 60-70% complete. The stack (Next.js 16 + Directus 11 + Tailwind v4) is solid and preserved. The work is content completion, design direction alignment, and building the differentiating features that communicate Vivaz's 25-year ecological leadership before the EU 2026 regulation window closes. Five phases follow strict layer dependencies: infrastructure first, then data, then components, then pages, then polish.

## Phases

- [x] **Phase 1: Foundation** - Lock infrastructure, fix rendering errors, complete all 4 locale message files (completed 2026-02-25)
- [x] **Phase 2: CMS Data** - Seed Directus with complete product/brand/regulation data, wire email and JSON-LD (completed 2026-02-25)
- [x] **Phase 3: Components** - Build PAHComparisonChart, ComplianceMatrix, TechSpecGrid, ContactSplit, and all shared components (completed 2026-02-25)
- [x] **Phase 4: Page Assembly** - Integrate all 8 pages with real data, briefing copy, and components from Phase 3 (completed 2026-02-25)
- [ ] **Phase 5: Polish** - Core Web Vitals, final i18n audit, sitemap/hreflang verification, pre-launch QA

## Phase Details

### Phase 1: Foundation
**Goal**: A stable, error-free base — all rendering bugs fixed, design tokens locked, and all 4 locale files complete with briefing copy, so every subsequent phase builds on solid ground.
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, I18N-01, I18N-02, I18N-03
**Success Criteria** (what must be TRUE):
  1. Browser console shows zero JS/hydration errors on any page in any locale
  2. Visiting `/en`, `/fr`, and `/de` routes renders page copy in the correct language — no raw translation key strings visible
  3. All prose content (product descriptions, blog posts) renders with correct typography — paragraphs, headings, lists styled
  4. Navigating between all 8 routes with smooth scroll enabled produces no scroll conflicts or Lenis errors
  5. Design token manifest is locked — any color or spacing value in the codebase traces back to a CSS variable in globals.css
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — Install @tailwindcss/typography + isomorphic-dompurify, sanitize HTML, lock design tokens
- [x] 01-02-PLAN.md — Extract PageHero shared component, fix RegulationInfographic Server/Client split, verify Lenis scroll
- [x] 01-03-PLAN.md — Complete all 4 locale message files with missing keys, replace hardcoded strings, verify hreflang/canonical

### Phase 2: CMS Data
**Goal**: Directus collections seeded with real, complete data — product specs, brand contacts, regulation content, and blog posts — so Phase 3 components can be built against accurate typed props.
**Depends on**: Phase 1
**Requirements**: PROD-07, LEAD-05, PERF-03, PERF-06
**Success Criteria** (what must be TRUE):
  1. NATURA and ECO STAR product pages load complete specs (PAH levels, disciplines, formats, logistics data) pulled from Directus — no placeholder content
  2. Submitting the contact form triggers an email notification to the admin address
  3. Product images load as WebP with correct dimensions — no oversized JPEG originals served
  4. Technical data sheet PDFs are accessible via Directus file storage (downloadable from product pages)
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md — Add missing schema fields, seed complete product data with specs/M2M disciplines, seed sys_brand, upload catalog PDF
- [ ] 02-02-PLAN.md — Upgrade assetUrl() with WebP defaults + IMG_PRESETS, wire Resend email into contact form, augment productJsonLd() for Google rich results

### Phase 3: Components
**Goal**: All shared and feature-specific components built — especially the PAH comparison visualization and compliance matrix that are the commercial core of the site — ready to compose into pages.
**Depends on**: Phase 2
**Requirements**: PROD-04, SUST-01, SUST-05, REG-04, ABOUT-03, PERF-05, DESGN-03
**Success Criteria** (what must be TRUE):
  1. A visitor to the technology page sees an animated chart showing Traditional (>500 mg/kg) → EU limit (50) → ECO STAR (<50) → NATURA (0) PAH values in a single scannable visual
  2. The regulation page displays a compliance matrix with NATURA / ECO STAR / Traditional rows and compliance status clearly marked
  3. A product detail page renders TechSpecGrid with PAH level displayed prominently alongside disciplines, weight, and dimensions
  4. MagneticButton and SpotlightReveal interactions are absent on touch devices (pointer: coarse) — no interaction failures on mobile
  5. All motion components respect prefers-reduced-motion — animations do not play when the OS accessibility setting is enabled
**Plans**: 2 plans

Plans:
- [ ] 03-01-PLAN.md — Retrofit pointer-fine guards on MagneticButton/SpotlightReveal, add MotionConfig reduced-motion blanket, build PAHComparisonChart and ComplianceMatrix
- [ ] 03-02-PLAN.md — Build TechSpecGrid, TimelineSection, StatCard, ContactSplit with geo-routing, WhatsAppFAB, blog components, CertBadgeRow

### Phase 4: Page Assembly
**Goal**: All 8 pages deliver complete, localized, on-brand content — home page converts, product pages sell, regulation page establishes authority, every page reflects the new design direction from the briefing.
**Depends on**: Phase 3
**Requirements**: PROD-01, PROD-02, PROD-03, PROD-05, PROD-06, SUST-02, SUST-03, SUST-04, REG-01, REG-02, REG-03, REG-05, HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, LEAD-01, LEAD-02, LEAD-03, LEAD-04, LEAD-06, ABOUT-01, ABOUT-02, BLOG-01, BLOG-02, BLOG-03, DESGN-01, DESGN-02, DESGN-04
**Success Criteria** (what must be TRUE):
  1. A distributor visiting the home page in English sees regulation-urgency copy (geo-adapted via geo-routing), "Why Vivaz" pillars, and CTA buttons to both product lines — all in one scroll
  2. A visitor to the NATURA product page sees complete specs (100% pine resin, 0 mg/kg PAH, ISSF disciplines), all 6 format variants, logistics table, and can download the technical data sheet
  3. The regulation page explains EU 2025/660 with an infographic, compliance matrix, links to the official EU document, and emphasizes Vivaz's 25-year head start
  4. The contact page displays national and international contact numbers correctly split by market, with a functional WhatsApp button and all contact form fields present
  5. Blog listing and detail pages render Directus content in all 4 locales with correct rich text formatting
**Plans**: 3 plans

Plans:
- [ ] 04-01-PLAN.md — Home page (geo-adapted hero, VideoSection, ContactSplit inline), About page (TimelineSection, SVG icons), Contact page (side-by-side layout), global WhatsAppFAB, Footer redesign, ContactForm simplification
- [ ] 04-02-PLAN.md — Product listing (3-category grid with PAH badges, discipline icons), Product detail pages (line-level slugs: /natura, /eco-star) with format variant tabs, TechSpecGrid, PAHComparisonChart, LogisticsTable, CertBadgeRow, catalog PDF CTA
- [ ] 04-03-PLAN.md — Technology page (PAHComparisonChart, CertBadgeRow, TimelineSection), Regulation 2026 page (countdown, ComplianceMatrix, PAHChart, EUR-Lex link), Blog listing (BlogCard grid), Blog detail (BlogHero + BlogContent)

### Phase 5: Polish
**Goal**: Site passes quality bar for launch — Core Web Vitals green on all pages, final i18n audit complete, sitemap/hreflang verified, no orphaned translation keys in any locale.
**Depends on**: Phase 4
**Requirements**: I18N-04, PERF-01, PERF-02, PERF-04
**Success Criteria** (what must be TRUE):
  1. Lighthouse CI reports LCP < 2.5s, CLS < 0.1, and INP < 200ms on all 8 pages on mobile
  2. All 8 pages render correctly at 375px viewport width — no horizontal overflow, no broken layouts
  3. Every page in every locale has a unique meta title, meta description, and Open Graph tags — no duplicates
  4. The sitemap includes all locale variants for each page and hreflang tags are correct for the localePrefix: "as-needed" configuration
**Plans**: 2 plans

Plans:
- [ ] 05-01-PLAN.md — SEO metadata completion (shared OG utility, metadataBase, unique descriptions per page per locale), CSS reduced-motion guard, sitemap verification
- [ ] 05-02-PLAN.md — Core Web Vitals optimization (Image sizes props, LCP), mobile responsiveness sweep (heading overflow, German locale fixes), remaining page metadata

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete   | 2026-02-25 |
| 2. CMS Data | 2/2 | Complete   | 2026-02-25 |
| 3. Components | 2/2 | Complete   | 2026-02-25 |
| 4. Page Assembly | 3/3 | Complete   | 2026-02-25 |
| 5. Polish | 1/2 | In Progress|  |
