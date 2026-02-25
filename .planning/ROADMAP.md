# Roadmap: Vivaz Clay Targets (platosvivaz.com)

## Overview

This is a brownfield enhancement project on a codebase that is 60-70% complete. The stack (Next.js 16 + Directus 11 + Tailwind v4) is solid and preserved. The work is content completion, design direction alignment, and building the differentiating features that communicate Vivaz's 25-year ecological leadership before the EU 2026 regulation window closes. Five phases follow strict layer dependencies: infrastructure first, then data, then components, then pages, then polish.

## Phases

- [x] **Phase 1: Foundation** - Lock infrastructure, fix rendering errors, complete all 4 locale message files (completed 2026-02-25)
- [ ] **Phase 2: CMS Data** - Seed Directus with complete product/brand/regulation data, wire email and JSON-LD
- [ ] **Phase 3: Components** - Build PAHComparisonChart, ComplianceMatrix, TechSpecGrid, ContactSplit, and all shared components
- [ ] **Phase 4: Page Assembly** - Integrate all 8 pages with real data, briefing copy, and components from Phase 3
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
- [ ] 01-02-PLAN.md — Extract PageHero shared component, fix RegulationInfographic Server/Client split, verify Lenis scroll
- [ ] 01-03-PLAN.md — Complete all 4 locale message files with missing keys, replace hardcoded strings, verify hreflang/canonical

### Phase 2: CMS Data
**Goal**: Directus collections seeded with real, complete data — product specs, brand contacts, regulation content, and blog posts — so Phase 3 components can be built against accurate typed props.
**Depends on**: Phase 1
**Requirements**: PROD-07, LEAD-05, PERF-03, PERF-06
**Success Criteria** (what must be TRUE):
  1. NATURA and ECO STAR product pages load complete specs (PAH levels, disciplines, formats, logistics data) pulled from Directus — no placeholder content
  2. Submitting the contact form triggers an email notification to the admin address
  3. Product images load as WebP with correct dimensions — no oversized JPEG originals served
  4. Technical data sheet PDFs are accessible via Directus file storage (downloadable from product pages)
**Plans**: TBD

Plans:
- [ ] 02-01: Seed pim_products (NATURA + ECO STAR), sys_brand contacts, web_regulation content, blog_posts
- [ ] 02-02: Audit and fix assetUrl() helper (WebP + explicit dimensions), implement productSchema() JSON-LD utility, wire Resend to contact form API

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
**Plans**: TBD

Plans:
- [ ] 03-01: Build PAHComparisonChart, ComplianceMatrix, TechSpecGrid, CertBadgeRow, TimelineSection (1967→2001→2026)
- [ ] 03-02: Build ContactSplit, BlogCard/BlogHero/BlogContent, ProductCard revision, StatCard/DataTable primitives; gate pointer effects behind pointer:fine

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
**Plans**: TBD

Plans:
- [ ] 04-01: Home page, About page, Contact page (all sections with briefing copy and geo-adapted content)
- [ ] 04-02: Product listing + detail pages (NATURA, ECO STAR, all 6 formats, logistics table, data sheets)
- [ ] 04-03: Technology page, Regulation 2026 page, Blog listing + detail

### Phase 5: Polish
**Goal**: Site passes quality bar for launch — Core Web Vitals green on all pages, final i18n audit complete, sitemap/hreflang verified, no orphaned translation keys in any locale.
**Depends on**: Phase 4
**Requirements**: I18N-04, PERF-01, PERF-02, PERF-04
**Success Criteria** (what must be TRUE):
  1. Lighthouse CI reports LCP < 2.5s, CLS < 0.1, and INP < 200ms on all 8 pages on mobile
  2. All 8 pages render correctly at 375px viewport width — no horizontal overflow, no broken layouts
  3. Every page in every locale has a unique meta title, meta description, and Open Graph tags — no duplicates
  4. The sitemap includes all locale variants for each page and hreflang tags are correct for the localePrefix: "as-needed" configuration
**Plans**: TBD

Plans:
- [ ] 05-01: Final i18n audit (grep hardcoded strings, verify all 4 locales), sitemap locale variants, hreflang verification
- [ ] 05-02: Core Web Vitals audit and fixes, mobile responsiveness sweep all 8 pages, unique meta/OG tags per page per locale

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete   | 2026-02-25 |
| 2. CMS Data | 0/2 | Not started | - |
| 3. Components | 0/2 | Not started | - |
| 4. Page Assembly | 0/3 | Not started | - |
| 5. Polish | 0/2 | Not started | - |
