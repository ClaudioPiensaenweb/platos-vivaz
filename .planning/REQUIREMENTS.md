# Requirements: Vivaz Clay Targets

**Defined:** 2026-02-25
**Core Value:** Position Vivaz as the undisputed #1 manufacturer in clay target quality and sustainability, leveraging EU 2026 regulation as the proof point of 25 years of ecological leadership.

## v1 Requirements

### Foundation (FOUND)

- [ ] **FOUND-01**: All existing rendering and hydration errors resolved — zero JS errors in browser console
- [x] **FOUND-02**: `@tailwindcss/typography` installed — prose classes render correctly in product descriptions and blog content
- [x] **FOUND-03**: `isomorphic-dompurify` sanitizes all Directus HTML before `dangerouslySetInnerHTML`
- [x] **FOUND-04**: Design token manifest locked — all colors, spacing, and motion constants in CSS variables and `@theme inline`, no hardcoded values in JSX
- [x] **FOUND-05**: `PageHero` shared component extracted — replaces 5 duplicated hero patterns across pages
- [x] **FOUND-06**: `RegulationInfographic` refactored — translations passed as props from Server Component, not `useTranslations()` in Client Component
- [x] **FOUND-07**: Lenis smooth scroll verified across all route transitions without conflicts

### Internationalization (I18N)

- [x] **I18N-01**: All 4 locale message files (es, en, fr, de) complete with briefing copy — no raw translation key strings visible
- [x] **I18N-02**: Canonical URLs and hreflang tags correct for `localePrefix: "as-needed"` configuration
- [x] **I18N-03**: No hardcoded user-visible strings in any component — all strings from message files
- [x] **I18N-04**: Sitemap includes all locale variants for each page

### Products (PROD)

- [x] **PROD-01**: NATURA product page displays complete specs — 100% pine resin, 0 mg/kg PAH, ISSF disciplines, weight, dimensions
- [x] **PROD-02**: ECO STAR product page displays complete specs — <50 mg/kg PAH, Sporting disciplines, weight, dimensions
- [x] **PROD-03**: Product range displays all 6 formats: American Trap, Extra Rabbit, Rabbit, Battue, Midi 90, Mini 60
- [x] **PROD-04**: Product detail pages show `TechSpecGrid` with PAH level prominently displayed
- [x] **PROD-05**: Product listing page with visual distinction between NATURA (premium) and ECO STAR (performance)
- [x] **PROD-06**: Logistics table visible with format x pack size x pallet data for distributor procurement
- [x] **PROD-07**: Technical data sheets and certificates accessible (downloadable PDFs or linked documents)

### Sustainability & Technology (SUST)

- [x] **SUST-01**: PAH comparison visualization — animated chart showing Traditional (>500) → EU limit (50) → ECO STAR (<50) → NATURA (0)
- [x] **SUST-02**: Technology page explains pine resin chemistry with visual comparison vs traditional petroleum-based targets
- [x] **SUST-03**: Sustainability narrative positioned as primary brand architecture across site — not just a section
- [x] **SUST-04**: Carbon footprint data, REACH traceability, and regulatory compliance information accessible
- [x] **SUST-05**: 1967 → 2001 → 2026 brand timeline showing innovation history

### Regulation (REG)

- [x] **REG-01**: EU 2025/660 regulation explainer page — PAH limits, enforcement date (April 2026), scope
- [x] **REG-02**: Infographic showing what changes and why, in didactic format
- [x] **REG-03**: Link to official EU commission regulation document
- [x] **REG-04**: Compliance matrix showing NATURA / ECO STAR / Traditional compliance status
- [x] **REG-05**: Content emphasizes Vivaz's 25-year head start in ecological production

### Home Page (HOME)

- [x] **HOME-01**: Hero section with landscape/nature visual + Natura product visualization
- [x] **HOME-02**: "Why Vivaz" module with three pillars: Quality, Sustainability, Performance
- [x] **HOME-03**: CTA buttons: Discover Natura / Discover ECO STAR
- [x] **HOME-04**: Geo-adapted hero copy — regulation urgency for export visitors, performance focus for national
- [x] **HOME-05**: Brief ecological leadership message in hero area

### Contact & Leads (LEAD)

- [x] **LEAD-01**: Contact form functional with all fields (name, email, phone, company, market, interest, message)
- [x] **LEAD-02**: National contact displayed: +34-618-757-580, export@platosvivaz.com
- [x] **LEAD-03**: International contact displayed: +34-606-172-746, sales@vivazclaytargets.com
- [x] **LEAD-04**: WhatsApp button integrated for quick contact
- [x] **LEAD-05**: Email notification sent to admin on form submission (currently TODO)
- [x] **LEAD-06**: Contact split display — market-aware using geo-routing header

### About (ABOUT)

- [x] **ABOUT-01**: Company history since 1967 with innovation milestones
- [x] **ABOUT-02**: Factory, team, and values content from briefing
- [x] **ABOUT-03**: Visual timeline of Vivaz's ecological leadership journey

### Blog/News (BLOG)

- [x] **BLOG-01**: Blog listing page renders posts from Directus CMS
- [x] **BLOG-02**: Blog detail page renders rich text content (sanitized HTML from Directus)
- [x] **BLOG-03**: Blog posts support all 4 locales

### Performance & SEO (PERF)

- [ ] **PERF-01**: Core Web Vitals passing — LCP < 2.5s, CLS < 0.1, INP < 200ms on all pages
- [ ] **PERF-02**: Mobile responsive across all pages (375px+)
- [x] **PERF-03**: JSON-LD structured data on product pages (Product schema)
- [x] **PERF-04**: Unique meta title/description per page per locale with Open Graph tags
- [x] **PERF-05**: Animation budget enforced — `useReducedMotion()` on all motion components
- [x] **PERF-06**: Image pipeline optimized — `assetUrl()` always requests WebP with explicit dimensions

### Design (DESGN)

- [x] **DESGN-01**: Clean, precision-focused design that conveys premium quality — not overloaded
- [x] **DESGN-02**: Consistent visual language across all 8 pages
- [x] **DESGN-03**: MagneticButton and SpotlightReveal gated behind `pointer: fine` media query
- [x] **DESGN-04**: Briefing copy integrated across all pages (from `briefing/vivaz textos web.md`)

## v2 Requirements

### Extended Features

- **V2-01**: Regular product line added when client confirms
- **V2-02**: Distributor/shooting ground finder with map
- **V2-03**: `@react-pdf/renderer` on-demand PDF data sheet generation (if React 19 compatible)
- **V2-04**: GDPR cookie consent banner (scope depends on analytics/tracking decisions)
- **V2-05**: CI pipeline with locale key diff check and Lighthouse gate
- **V2-06**: Directus type generation from OpenAPI spec (eliminate schema drift)
- **V2-07**: Quablo font subsetting for Latin character ranges

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce / shopping cart | B2B manufacturer — sells through distributors |
| User accounts / login | Corporate site, no user-facing auth needed |
| Live chat widget | WhatsApp button covers quick contact |
| Blog content machine | 3-4 high-value annual posts, not content marketing |
| Greenwashing copy | Vivaz has real 25-year data — no generic sustainability fluff |
| Mobile app | Web-only for v1 |
| Machine/launcher products | Vivaz manufactures targets only |
| Regular product line | Pending client confirmation — deferred to v2 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| FOUND-07 | Phase 1 | Complete |
| I18N-01 | Phase 1 | Complete |
| I18N-02 | Phase 1 | Complete |
| I18N-03 | Phase 1 | Complete |
| I18N-04 | Phase 5 | Complete |
| PROD-01 | Phase 4 | Complete |
| PROD-02 | Phase 4 | Complete |
| PROD-03 | Phase 4 | Complete |
| PROD-04 | Phase 3 | Complete |
| PROD-05 | Phase 4 | Complete |
| PROD-06 | Phase 4 | Complete |
| PROD-07 | Phase 2 | Complete |
| SUST-01 | Phase 3 | Complete |
| SUST-02 | Phase 4 | Complete |
| SUST-03 | Phase 4 | Complete |
| SUST-04 | Phase 4 | Complete |
| SUST-05 | Phase 3 | Complete |
| REG-01 | Phase 4 | Complete |
| REG-02 | Phase 4 | Complete |
| REG-03 | Phase 4 | Complete |
| REG-04 | Phase 3 | Complete |
| REG-05 | Phase 4 | Complete |
| HOME-01 | Phase 4 | Complete |
| HOME-02 | Phase 4 | Complete |
| HOME-03 | Phase 4 | Complete |
| HOME-04 | Phase 4 | Complete |
| HOME-05 | Phase 4 | Complete |
| LEAD-01 | Phase 4 | Complete |
| LEAD-02 | Phase 4 | Complete |
| LEAD-03 | Phase 4 | Complete |
| LEAD-04 | Phase 4 | Complete |
| LEAD-05 | Phase 2 | Complete |
| LEAD-06 | Phase 4 | Complete |
| ABOUT-01 | Phase 4 | Complete |
| ABOUT-02 | Phase 4 | Complete |
| ABOUT-03 | Phase 3 | Complete |
| BLOG-01 | Phase 4 | Complete |
| BLOG-02 | Phase 4 | Complete |
| BLOG-03 | Phase 4 | Complete |
| PERF-01 | Phase 5 | Pending |
| PERF-02 | Phase 5 | Pending |
| PERF-03 | Phase 2 | Complete |
| PERF-04 | Phase 5 | Complete |
| PERF-05 | Phase 3 | Complete |
| PERF-06 | Phase 2 | Complete |
| DESGN-01 | Phase 4 | Complete |
| DESGN-02 | Phase 4 | Complete |
| DESGN-03 | Phase 3 | Complete |
| DESGN-04 | Phase 4 | Complete |

**Coverage:**
- v1 requirements: 53 total
- Mapped to phases: 53
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-25*
*Last updated: 2026-02-25 after initial definition*
