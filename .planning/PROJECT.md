# Vivaz Clay Targets — platosvivaz.com

## What This Is

Corporate website for Vivaz Clay Targets (Platos Vivaz), a Spanish manufacturer of ecological clay targets for shooting sports founded in 1967. The site positions Vivaz as the European leader in quality and sustainability with instant geo-adapted messaging, animated PAH data visualization, and EU 2025/660 regulation compliance proof. Two product lines: NATURA (premium, 0 mg/kg PAH) and ECO STAR (high performance, <50 mg/kg PAH). Serves 4 languages (es/en/fr/de) across 8 pages with Directus CMS backend.

## Core Value

Position Vivaz as the undisputed #1 manufacturer in clay target quality and sustainability, leveraging the EU 2026 regulation (EU 2025/660) as the proof point that Vivaz has been ahead of the industry for 25 years.

## Current Milestone: v2.0 Design Overhaul & Content Expansion

**Goal:** Redesign the home page to match the updated brand direction, expand content pages (Sostenibilidad, Regulación), add VIVAZ RANGE product line, and enforce consistent typography across the site — page by page with sub-phases per block.

**Target features:**
- Home page restructure: new hero, updated ProductRangeStrip (3 lines), redesigned WhyVivaz cards, new side-by-side product features (NATURA/ECO STAR), vertical video reels section, contact CTA banner + contact form section
- Navbar updates: "Tecnología y sostenibilidad" rename, "Noticias / Regulación 2026" combined link, Instagram icon
- Tecnología y sostenibilidad page: expanded sustainability narrative (raw materials, production, energy, waste), SEO-oriented structure
- Regulación 2026 page: expanded explanatory content for shooters and clubs
- VIVAZ RANGE (Regular) product line: new product page at /productos/vivaz-range
- Product pages: 6 shooting disciplines info (American Trap, Extra Rabbit, Rabbit, Battue, Midi 90, Mini 60)
- Global typography: uppercase H tags, text-wrap: balance, correct Spanish grammar

## Requirements

### Validated

- ✓ Full 8-page multilingual site with Next.js 16 + Directus CMS — v1.0
- ✓ Geo-routing middleware adapts hero copy and contact for national vs export — v1.0
- ✓ Animated PAH comparison chart + compliance matrix (EU regulation proof) — v1.0
- ✓ Product line pages with FormatTabs, TechSpecGrid, logistics data — v1.0
- ✓ SEO-complete: unique meta/OG per page per locale, hreflang sitemap, JSON-LD — v1.0
- ✓ Core Web Vitals optimized: CLS=0, TBT<200ms, responsive 375px+ — v1.0
- ✓ Agency-grade UI: SpotlightReveal, MagneticButton, pointer-fine guards — v1.0
- ✓ Contact form with CRM leads + WhatsApp FAB + email notifications — v1.0
- ✓ 1967-2001-2026 brand timeline on About and Technology pages — v1.0
- ✓ Prefers-reduced-motion CSS guard + framer-motion useReducedMotion — v1.0

### Active

- [ ] Home page design overhaul (hero, products, videos, contact CTA)
- [ ] Navbar restructure (renamed links, Instagram icon)
- [ ] VIVAZ RANGE product line page
- [ ] Product pages with 6 disciplines
- [ ] Tecnología y sostenibilidad page expansion
- [ ] Regulación 2026 page expansion
- [ ] Global uppercase headings + text-wrap balance + Spanish grammar
- [ ] Vertical video reels section (Directus-managed)

### Deferred (v2.1+)

- Distributor/shooting ground finder with map (V2-02)
- On-demand PDF data sheet generation (V2-03)
- GDPR cookie consent banner (V2-04)
- CI pipeline with locale key diff + Lighthouse gate (V2-05)
- Directus type generation from OpenAPI spec (V2-06)
- Quablo font subsetting for Latin ranges (V2-07)

### Out of Scope

- E-commerce / direct sales — Vivaz sells B2B through distributors
- User accounts / login — corporate site, no user-facing auth
- Live chat widget — WhatsApp FAB covers quick contact
- Mobile app — web-only
- Machine/launcher products — Vivaz manufactures targets only
- Blog content machine — 3-4 high-value annual posts only

## Context

### Current State (v1.0 shipped 2026-02-25)
- 6,431 LOC TypeScript across frontend/src (54 files)
- Tech stack: Next.js 16.1.6, React 19.2, Tailwind CSS v4, framer-motion, Directus 11.14.1
- Docker Compose: PostgreSQL 16 + Directus + Next.js + Nginx
- 4 locales: es (default, no prefix), en, fr, de
- Lighthouse: CLS=0.000, TBT<200ms on all key pages

### Market Position
- 4 European manufacturers cover 95% of world demand (excl. USA)
- Vivaz has the best quality and supply consistency
- EU 2025/660 (April 2026): clay targets cannot contain >0.005% PAH
- Vivaz uniquely positioned: 25 years of ecological production experience

## Constraints

- **Tech Stack**: Next.js 16 + React 19 + Directus 11 + Tailwind v4
- **Languages**: es, en, fr, de via next-intl (localePrefix: "as-needed")
- **Products**: Only NATURA and ECO STAR in v1 (Regular deferred to v2)
- **Hosting**: Docker Compose behind Nginx with Let's Encrypt SSL
- **Domain**: platosvivaz.com

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Brownfield revision (not rebuild) | Solid tech foundation, changing direction not stack | ✓ Good — 54 files modified, zero rewrites |
| NATURA as premium flagship | 0 mg/kg PAH, best product per expert feedback | ✓ Good — flagship positioning throughout site |
| ECO STAR as performance line | <50 mg/kg PAH, Sporting disciplines, value positioning | ✓ Good — clear differentiation from NATURA |
| No Regular product in v1 | Pending client confirmation | — Deferred to v2 |
| Sustainability as core narrative | EU 2026 regulation validates Vivaz's 25-year strategy | ✓ Good — PAH chart + compliance matrix prove it |
| Bilingual contact split | National vs International with different numbers | ✓ Good — geo-routing auto-highlights relevant card |
| Per-line product slugs | /natura and /eco-star with FormatTabs vs per-SKU | ✓ Good — cleaner URLs, tabs for format switching |
| Floating WhatsApp FAB | User preference over in-card CTA | ✓ Good — always accessible |
| Shared OG image (not per-page) | Simpler, consistent brand presence on social | ✓ Good — one 1200x630 brand image |

---
*Last updated: 2026-02-27 after v2.0 milestone start*
