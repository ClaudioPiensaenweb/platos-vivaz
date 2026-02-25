# Project Research Summary

**Project:** Vivaz Clay Targets (platosvivaz.com)
**Domain:** Premium B2B corporate site — clay target manufacturer, brownfield enhancement
**Researched:** 2026-02-25
**Confidence:** HIGH (codebase directly inspected; all 4 research files drawn from live source code)

## Executive Summary

Vivaz is a 59-year-old Spanish clay target manufacturer with a commercially decisive advantage: both of its products (NATURA and ECO STAR) comply with the EU 2025/660 regulation that takes effect April 2026, banning petroleum-based clay targets above 50 mg/kg PAH. NATURA has 0 mg/kg PAH — an absolute best-in-class position that no European competitor can match. The website must communicate this advantage clearly and urgently to export buyers (90%+ of sales) across 4 languages before the regulation window closes. The codebase is already 60–70% built on a modern Next.js 16 + Directus 11 + Tailwind v4 stack with sophisticated infrastructure already in place (geo-routing middleware, i18n, design system, animations, smooth scroll). This is a content-completion and feature-hardening project, not a greenfield build.

The recommended approach is layered: lock the design token system and infrastructure first, then complete CMS data and translation content in parallel, then build the differentiating features (PAH comparison visualization, compliance matrix, sustainability narrative, technical documentation hub) on top of that stable foundation. The architecture research confirms a clear 5-layer build order with each layer unlocking the next — deviating from this order creates rework. The biggest single communication failure to fix is the sustainability narrative: Vivaz has the best product but communicates it worst. Eurotarget currently out-communicates Vivaz on sustainability despite having an inferior product.

The key risks are operational, not technical. The four critical pitfalls to mitigate from day one are: (1) translation gaps across 4 locales silently breaking production for export-market buyers, (2) Directus schema drift decoupling from TypeScript types and causing runtime errors in production, (3) framer-motion animation overuse degrading Core Web Vitals on the pages that need to impress distributors most, and (4) design token changes cascading through an inconsistent component tree if the token system is not locked before feature work begins. All four pitfalls are preventable through process controls established in Phase 1.

---

## Key Findings

### Recommended Stack

The existing stack is locked and sound — no framework changes. The research identified 2 critical gaps (missing packages already being used) plus 4 medium-priority additions. The `@tailwindcss/typography` plugin is the most urgent: `prose prose-sm` utility classes are already used in `ProductDetail.tsx` but the plugin is absent from `package.json`, meaning all product descriptions and blog content render as unstyled text in Tailwind v4. The `isomorphic-dompurify` package is the second critical gap: HTML from Directus is passed directly to `dangerouslySetInnerHTML` without sanitization, which is a security liability for a production site.

**Critical additions (fix active bugs):**
- `@tailwindcss/typography` — renders `prose` classes already in use; activate via `@plugin` directive in CSS (Tailwind v4 syntax differs from v3)
- `isomorphic-dompurify` — sanitize all Directus HTML before `dangerouslySetInnerHTML` in ProductDetail and blog post renderer

**Medium-priority additions:**
- `resend` — email notifications for contact form leads (currently a TODO in `api/contact/route.ts`)
- `vanilla-cookieconsent` — GDPR compliance for EU market targeting
- Structured data (JSON-LD) — no library needed; implement `productSchema()` utility in `src/lib/schema.ts`; convention already references `productJsonLd()` but implementation is missing
- `@react-pdf/renderer` — product technical data sheet generation (verify React 19 peer dep before installing)

**What not to add:** GSAP, component libraries (shadcn/Radix/MUI), state management libraries, ORMs, image CDNs, carousel libraries, or any i18n alternative. The existing stack covers all needs.

### Expected Features

Vivaz's competitors (Eurotarget, Laporte) are under-invested in digital communication. The bar for table stakes is technically low but the opportunity for differentiation via sustainability communication is high. The regulation inflection point (April 2026) creates a narrow, commercially urgent window.

**Must have (table stakes) — P0:**
- Error-free rendering (briefing notes existing JS errors and loading failures — must fix before all other work)
- Complete product information (NATURA and ECO STAR specs, PAH levels, disciplines, PDF data sheets)
- Contact channels for national (Spain) and export (international) markets with email notification on form submit
- EU 2026 Regulation page — the most commercially urgent content; buyers actively searching for compliant suppliers from April 2026
- Multilingual content completeness across all 4 locales (es, en, fr, de) with no visible fallback strings

**Must have (table stakes) — P1:**
- Mobile responsiveness (all 8 pages)
- Core Web Vitals passing (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- SEO foundations (unique titles/descriptions per page/locale, Open Graph, sitemap, hreflang)

**Should have (differentiators) — P1:**
- Sustainability narrative as primary brand architecture ("Since 2000" claim, 25-year proof point, specific chemistry)
- PAH comparison visual — single scannable chart showing traditional (>500 mg/kg) vs EU limit (50) vs ECO STAR (<50) vs NATURA (0)
- Geo-adapted hero — leverage the already-built geo-routing middleware to serve regulation-urgency copy to export visitors vs performance copy to national visitors

**Should have (differentiators) — P2:**
- Technology/pine resin chemistry explainer page
- Product logistics table (format x pack size x pallet data for distributor procurement)
- Technical documentation hub (data sheets, REACH certificates, ISSF approval — no registration required)
- ISSF credential signals on NATURA product page
- Video hero / atmospheric brand film

**Defer to v2+:**
- Distributor/shooting ground finder (requires complete distributor database and client maintenance commitment)
- Regular product line (pending client confirmation per PROJECT.md)

**Anti-features (never build):**
- E-commerce / shopping cart
- User accounts / login
- Live chat widget (use WhatsApp instead)
- Blog-as-content-marketing machine (3-4 annual high-value posts only)
- Greenwashing-style generic sustainability copy

### Architecture Approach

The codebase follows a clean Next.js App Router Server Component architecture with a clear hierarchy: locale layout (Server) wraps NextIntlClientProvider (Client boundary) which wraps SmoothScroll (Lenis) which wraps Navbar, page content, and Footer. Pages are Server Components that fetch from Directus internally and pass typed data to child components. Client Components are minimal and restricted to interactive concerns (countdown timers, contact forms, scroll detection). This pattern must be maintained — the primary architectural anti-pattern already present in the codebase is `RegulationInfographic` using `useTranslations()` which forces the entire component client-side unnecessarily.

**Major components to build/rework:**
1. `PageHero` (shared) — extract from 5 pages currently copy-pasting the same hero pattern
2. `PAHComparisonChart` (technology page) — the most commercially important visualization on the site
3. `ComplianceMatrix` (regulation page) — NATURA / ECO STAR / Traditional compliance grid
4. `ContactSplit` (contact page) — market-aware phone/CTA display using geo-routing header
5. `TechSpecGrid` + `CertBadgeRow` (product detail) — structured spec display with certification signals

**Data flow:** Directus (internal Docker URL, server-only) → Server Components → typed props → Client Components. Browsers never talk to Directus directly. All Directus HTML must go through `DOMPurify.sanitize()` before `dangerouslySetInnerHTML`. All Directus image UUIDs must go through `assetUrl(uuid, { width, format: 'webp' })` helper — never construct URLs manually or use `<img>` tags.

**Build order (from ARCHITECTURE.md):**
- Layer 1: Design system tokens + shared components (PageHero, StatCard) + all 4 message files
- Layer 2: Directus data seeding (products, brand data, regulation data, blog posts)
- Layer 3: Shared content components (ProductCard, TechSpecGrid, CertBadgeRow, PAHComparisonChart, ContactSplit)
- Layer 4: Page sections (Home, Products, Technology, About, Regulation, Contact, Blog)
- Layer 5: Polish (view transitions, Lenis verification, JSON-LD, final i18n audit)

### Critical Pitfalls

1. **Design direction whiplash** — Lock the design token manifest (`globals.css` CSS variables + a `tokens.ts` for motion constants) and get stakeholder sign-off on a style tile before any component work. A single token change in Tailwind v4's `@theme inline` system silently breaks every component using non-token inline values. Rule: no hardcoded colors or spacing in JSX — only Tailwind utility classes mapped to `@theme` tokens.

2. **i18n translation gaps** — With 4 locales and `localePrefix: "as-needed"`, development happens in Spanish (root `/`) and broken French/German routes are invisible locally. Every feature PR must update all 4 locale JSON files before merge. Add a CI script that diffs locale files against `es.json` and fails on missing keys. A German distributor seeing raw translation keys is an immediate trust failure.

3. **Directus schema drift** — The `@directus/sdk` has no compile-time enforcement between CMS schema and `src/lib/types.ts`. A field rename in the Directus UI breaks production pages silently. Treat `types.ts` as a schema contract — any Directus schema change requires a code PR. Consider generating types from the Directus OpenAPI spec to make drift a build-time error.

4. **Framer-motion Core Web Vitals degradation** — `layoutId` morph transitions are expensive on large DOM trees. More than 5 `motion.div` elements with entrance animations on a single viewport will sink mobile PageSpeed below 70. Establish an animation budget in Phase 1 and enforce via Lighthouse CI. Add `useReducedMotion()` handling to all animation components.

5. **Product image pipeline** — The `assetUrl()` helper must always pass `format: 'webp'` and explicit `width`. If it defaults to JPEG originals (5–15MB from marketing team uploads), LCP on hero product shots fails on first-impression pages. Audit the helper immediately and add transformation presets for "product hero" and "thumbnail" use cases.

---

## Implications for Roadmap

Based on the combined research, the architecture's 5-layer build order maps cleanly to 5 phases. The layer dependencies are strict — each phase unlocks the next. Do not parallelize across layers.

### Phase 1: Foundation and Infrastructure Hardening

**Rationale:** Multiple critical pitfalls (design whiplash, i18n gaps, geo-routing cache poisoning, Lenis scroll conflicts, hreflang confusion) must be mitigated before any feature work begins. Building features on an unstable foundation guarantees rework. The existing rendering errors mentioned in the briefing must be resolved before any visual work is meaningful.

**Delivers:**
- Locked design token manifest (CSS variables + motion constants) with stakeholder sign-off
- ESLint rule enforcing no hardcoded strings in JSX
- CI locale key diff check (all 4 locales must match `es.json` on every PR)
- `@tailwindcss/typography` installed and configured (fixes active rendering bug)
- `isomorphic-dompurify` installed and applied to all `dangerouslySetInnerHTML` usages
- Lenis + Next.js routing integration verified across all route types
- Geo-routing `Vary` headers verified for CDN cache safety
- Canonical URLs and hreflang tags verified for `localePrefix: "as-needed"` configuration
- All existing rendering/hydration errors resolved
- `PageHero` shared component extracted (eliminates 5 copies of the same code)
- All 4 message files updated with final briefing copy (unblocks every translation-dependent task)

**Addresses pitfalls:** Pitfall 1 (design whiplash), Pitfall 2 (i18n gaps), Pitfall 7 (Lenis conflicts), Pitfall 8 (geo-routing cache), Pitfall 11 (hardcoded strings), Pitfall 12 (hreflang/canonical)

**Features addressed:** Error-free rendering (P0 table stakes), SEO foundations (P1)

### Phase 2: CMS Data Architecture and Content Completion

**Rationale:** All differentiating features are data-dependent. The PAH comparison chart needs accurate PAH values. The product detail pages need complete specs, disciplines, and logistics data. The regulation page needs CMS-driven content with review dates. No visual component work is meaningful until the Directus collections are seeded with real data.

**Delivers:**
- Directus `pim_products` seeded with complete NATURA and ECO STAR data (all formats, specs, logistics, discipline M2M relations, certification file uploads)
- `sys_brand` seeded with real contact info, logos, phone numbers
- `web_regulation` seeded with correct April 2026 enforcement date, PAH limit, regulation name
- `blog_posts` seeded with initial content
- `assetUrl()` helper audited and confirmed to always request WebP with explicit dimensions
- Directus image transformation presets established ("product hero": 1920w/webp/85q, "thumbnail": 400w/webp/75q)
- `web_regulation` collection updated with "last reviewed" and "review by" date fields for regulatory content freshness
- `resend` installed and connected to contact form API route (clears existing TODO)
- JSON-LD `productSchema()` utility implemented in `src/lib/schema.ts`

**Addresses pitfalls:** Pitfall 3 (schema drift — establish types contract), Pitfall 5 (image pipeline), Pitfall 6 (stale regulatory content)

**Features addressed:** Complete product information (P0), contact email notifications, structured data SEO, technical data sheets (document upload fields)

### Phase 3: Component Library and Visual Design

**Rationale:** With data seeded and the design system locked, shared components can be built once and composed across all pages. This phase establishes the visual language for differentiating features before individual pages are assembled.

**Delivers:**
- `PAHComparisonChart` — the most commercially important visual on the site; animated on scroll; NATURA (0) vs ECO STAR (<50) vs EU limit (50) vs traditional (>500)
- `ComplianceMatrix` — regulation page compliance grid
- `TechSpecGrid` — structured product spec display with PAH level prominence
- `CertBadgeRow` — ISSF and REACH certification display
- `ContactSplit` — market-aware national/export contact display
- `TimelineSection` — 1967 → 2001 → 2026 brand timeline
- `StatCard` and `DataTable` shared primitives
- `BlogCard`, `BlogHero`, `BlogContent` components
- `ProductCard` reworked with better visual hierarchy
- Animation budget established; `useReducedMotion()` applied to all motion components
- MagneticButton and SpotlightReveal gated behind `pointer: fine` media query
- Lighthouse CI gate configured (fail if LCP > 2.5s or CLS > 0.1 on mobile)
- `vanilla-cookieconsent` installed and integrated

**Addresses pitfalls:** Pitfall 4 (animation CWV degradation), Pitfall 9 (touch device interaction failures)

**Features addressed:** PAH comparison visual (P1 differentiator), ISSF credential signals (P2), GDPR compliance, geo-adapted hero conditional rendering

### Phase 4: Page Assembly and Content Integration

**Rationale:** With components built and data ready, pages are assembled by composing Layer 3 components with Layer 2 data. This is primarily integration and content work — no new architectural decisions. Pages follow the established "stacking sections" rhythm documented in ARCHITECTURE.md.

**Delivers:**
- Home page: video/landscape hero with geo-adapted copy, WhyVivazGrid with briefing pillars, ProductShowcase (NATURA + ECO STAR), CommitmentBanner ("25 years ecological"), CTASection
- Products listing: range grouping with real data, ProductCard rework
- Product detail: PageHero + TechSpecGrid + DisciplineBadges + CertBadgeRow + ProductDescription (sanitized HTML) + LogisticsTable + ContactCTA + PDF data sheet download
- Technology page: pine resin section + SpotlightReveal + PAHComparisonChart + process timeline + REACH section
- About page: history + TimelineSection + factory + values grid with briefing copy
- Regulation 2026 page: fix Client/Server component split in RegulationInfographic, ComplianceMatrix, all strings translated, Directus-driven content
- Contact page: ContactSplit + market-aware form pre-selection + WhatsApp CTA
- Blog listing + detail: BlogCard grid + BlogContent rich text renderer

**Features addressed:** Sustainability narrative architecture (P1), geo-adapted hero (P1), technology/chemistry explainer (P2), product logistics table (P2), technical documentation hub (P2), video hero (P2), multilingual content completeness (P1), EU 2026 Regulation page (P0)

### Phase 5: Polish, Performance, and Pre-Launch

**Rationale:** The final phase validates that the site meets its quality bar before launch. Catches integration issues that only appear with real content volumes and real device/network conditions.

**Delivers:**
- `MotionImage` `layoutId` morphs verified between product listing and detail views
- Lenis smooth scroll verified on all 8 pages after content changes
- JSON-LD breadcrumb schema on all inner pages; Article schema on blog posts
- Final i18n audit (grep for hardcoded strings; verify all 4 locales render without fallback keys)
- Mobile responsiveness verified across all 8 pages (375px+)
- Core Web Vitals passing on all pages (Lighthouse CI gate)
- Hreflang and sitemap final verification
- Quablo font subsetting (Latin-only subset for es/en/fr/de character ranges)
- `@react-pdf/renderer` integration for on-demand data sheet generation (if React 19 peer dep confirmed)

**Addresses pitfalls:** Pitfall 4 (CWV final audit), Pitfall 10 (font subsetting)

### Phase Ordering Rationale

- **Phase 1 before everything:** Infrastructure pitfalls (geo-routing cache, Lenis conflicts, hreflang, i18n CI) must be resolved before any feature work. Building features on a broken foundation means rework.
- **Phase 2 before Phase 3:** Components cannot be built meaningfully until the data schema is finalized and seeded — component props are typed against Directus types, and building against incomplete data leads to type changes that cascade through component interfaces.
- **Phase 3 before Phase 4:** Page assembly is straightforward when components exist. Building page sections before components means building components inline in pages, which defeats the reuse architecture.
- **Phase 5 last:** Polish work and cross-page integration testing requires all pages to be in a near-final state.

### Research Flags

**Phases needing research before planning tasks:**
- **Phase 2 — PDF data sheets:** Verify `@react-pdf/renderer` React 19 peer dependency before committing to this approach. Alternative: static PDFs stored in Directus file storage (simpler, no peer dep risk). Run `npm info @react-pdf/renderer peerDependencies` at task planning time.
- **Phase 2 — Directus type generation:** Evaluate `openapi-typescript` against the Directus 11 OpenAPI endpoint for automated type generation. Could eliminate the schema drift pitfall entirely but requires verification of Directus 11 OpenAPI output quality.
- **Phase 3 — GDPR scope:** Confirm with client whether any analytics or marketing scripts will be deployed. If only essential cookies (no analytics), a simpler notice-only banner may be legally sufficient — `vanilla-cookieconsent` may be over-engineered. Legal determination affects Phase 3 scope.

**Phases with standard well-documented patterns (skip research-phase):**
- **Phase 1:** Next.js App Router fundamentals, Tailwind v4 CSS variables, next-intl configuration — all well-documented and directly verifiable in the existing codebase.
- **Phase 3:** framer-motion `useReducedMotion`, Lighthouse CI setup, `pointer: fine` media query — all standard, HIGH-confidence patterns.
- **Phase 4:** Page assembly follows the established component patterns from ARCHITECTURE.md. No novel integration challenges.
- **Phase 5:** Standard pre-launch QA — no novel research needed.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Codebase directly inspected; package.json read; gaps identified from live source files |
| Features | HIGH | Based on direct codebase audit + competitive gap analysis; project requirements from PROJECT.md |
| Architecture | HIGH | All 57 source files inspected; component hierarchy and data flow verified from live code |
| Pitfalls | HIGH | Critical pitfalls based on verified codebase patterns (e.g., `useTranslations` in RegulationInfographic confirmed); operational pitfalls from established Next.js/Directus/Tailwind v4 patterns |

**Overall confidence:** HIGH

### Gaps to Address

- **@react-pdf/renderer React 19 compatibility** (LOW confidence): Must verify peer dependency before Phase 2 task planning. Fallback plan ready (static PDFs in Directus storage). Run `npm info @react-pdf/renderer peerDependencies` before committing to approach.
- **@tailwindcss/typography Tailwind v4 `@plugin` syntax** (MEDIUM confidence): Training knowledge indicates the `@plugin` directive is correct for v4, but this should be verified against official Tailwind v4 docs before installation. The need for the plugin is HIGH confidence; the exact syntax is MEDIUM.
- **GDPR compliance scope** (MEDIUM confidence): Legal sufficiency of cookie consent depends on what analytics/tracking scripts are ultimately deployed. Confirm with client before building the full cookie consent UI.
- **Quablo font file size** (MEDIUM confidence): Font subsetting is recommended but the actual file size of the current Quablo woff2 file is unknown without file system inspection. May be already subset.
- **Video asset availability** (unknown): Video hero is a P2 differentiator, but depends on whether the client's Davide Carolis photography session produced video assets. Confirm with client before scoping Phase 4 hero work.
- **ISSF approval current status** (unknown): NATURA's ISSF approval must be confirmed current before displaying ISSF credential badges on product pages. Requires client confirmation and documentation.

---

## Sources

### Primary (HIGH confidence — direct codebase inspection)
- `frontend/package.json` — stack identification, gap analysis
- `frontend/src/**` (57 files) — architecture, component hierarchy, data flow, existing anti-patterns
- `.planning/PROJECT.md` — requirements, scope boundaries
- `.planning/codebase/STACK.md` — existing stack documentation
- `src/lib/types.ts` — Directus type definitions
- `src/app/api/contact/route.ts` — contact API (identified TODO for email notifications)
- `src/components/product/ProductDetail.tsx` — identified `prose` classes + unsanitized HTML

### Secondary (HIGH confidence — official documentation)
- Next.js 16 App Router documentation — Server/Client Component model, scroll restoration
- next-intl documentation — `localePrefix: "as-needed"` behavior, fallback locale handling
- Directus 11 documentation — `@directus/sdk` TypeScript generics, field management
- framer-motion documentation — `layoutId`, `useReducedMotion`, `will-change` guidance
- Core Web Vitals — Google Search Central documentation (LCP, CLS thresholds)
- MDN — `pointer: fine` media query specification

### Tertiary (MEDIUM confidence — requires verification)
- @tailwindcss/typography v4 `@plugin` directive syntax — training knowledge, verify before install
- @react-pdf/renderer React 19 peer dependency status — training knowledge cutoff Aug 2025; must verify current state
- GDPR/ePrivacy cookie consent legal requirements — well-established but legal sufficiency is jurisdiction-specific

---
*Research completed: 2026-02-25*
*Ready for roadmap: yes*
