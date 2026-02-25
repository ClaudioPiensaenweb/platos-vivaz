# Architecture Patterns

**Domain:** Premium corporate website — clay target manufacturer
**Project:** Vivaz Clay Targets (platosvivaz.com)
**Researched:** 2026-02-25
**Confidence:** HIGH — based on direct codebase inspection

---

## Existing Architecture (Verified State)

The codebase is a brownfield Next.js 16 App Router project. The core structure is sound and must be preserved. This document maps what exists, what is incomplete, and how new work should slot in.

### Route Map

```
src/app/
├── layout.tsx                    # Root layout (font vars only)
├── globals.css                   # Design tokens, animations, view transitions
├── robots.ts                     # SEO
├── sitemap.ts                    # SEO
├── llms.txt/route.ts             # AI SEO
│
├── api/
│   └── contact/route.ts          # CRM lead submission → Directus
│
└── [locale]/                     # i18n wrapper (es, en, fr, de)
    ├── layout.tsx                 # Locale layout: fonts, Navbar, Footer, SmoothScroll, PageTransition
    ├── page.tsx                   # Home
    ├── productos/
    │   ├── page.tsx               # Product listing (grouped by range)
    │   └── [slug]/page.tsx        # Product detail
    ├── tecnologia/page.tsx        # Technology & Sustainability
    ├── sobre-vivaz/page.tsx       # About Vivaz
    ├── noticias/
    │   ├── page.tsx               # Blog listing
    │   └── [slug]/page.tsx        # Blog post detail
    ├── contacto/page.tsx          # Contact form
    ├── regulacion-2026/page.tsx   # EU Regulation explainer
    └── not-found.tsx
```

### Directus Collections

```
sys_brand          (singleton) → BrandData: colors, fonts, contacts, social
web_regulation     (singleton) → RegulationData: date, limits, toggle
pim_products       (collection) → Product: specs, logistics, translations, disciplines M2M
pim_disciplines    (collection) → Discipline: name, icon, translations
blog_posts         (collection) → BlogPost: content, category, translations
crm_leads          (collection) → CrmLead: contact form submissions
```

---

## Recommended Architecture for Enhancement Work

### Component Boundary Map

The enhancement touches all 8 routes. Components should be organized by their domain of concern:

```
src/
├── components/
│   ├── layout/           # Global chrome — unchanged, minor updates
│   │   ├── Navbar.tsx
│   │   ├── NavbarClient.tsx
│   │   ├── NavLink.tsx
│   │   └── Footer.tsx
│   │
│   ├── providers/        # Global runtime — unchanged
│   │   ├── SmoothScroll.tsx
│   │   └── PageTransition.tsx
│   │
│   ├── ui/               # Design system primitives — extend, do not break
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Container.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── DirectusImage.tsx
│   │   ├── InView.tsx
│   │   ├── MotionImage.tsx
│   │   ├── SpotlightReveal.tsx
│   │   └── MagneticButton.tsx
│   │   └── [new] PageHero.tsx    ← NEEDED: shared hero pattern
│   │   └── [new] StatCard.tsx    ← NEEDED: for metrics/data callouts
│   │   └── [new] DataTable.tsx   ← NEEDED: logistics/spec tables
│   │
│   ├── home/             # Home page sections — full rework
│   │   ├── HeroSection.tsx       ← rework: video + Natura visualization
│   │   ├── WhyVivazGrid.tsx      ← rework: Quality/Sustainability/Performance pillars
│   │   ├── ProductShowcase.tsx   ← rework: NATURA vs ECO STAR split CTA
│   │   ├── ProductRangeStrip.tsx ← rework: full format range display
│   │   ├── CommitmentBanner.tsx  ← rework: 25-year sustainability proof
│   │   ├── CTASection.tsx        ← keep pattern, update copy
│   │   └── ColorStrip.tsx        ← keep
│   │
│   ├── product/          # Product pages — extend existing
│   │   ├── ProductCard.tsx       ← rework: better visual hierarchy
│   │   ├── ProductDetail.tsx     ← rework: disciplines, certifications, downloads
│   │   ├── DisciplineBadge.tsx   ← keep
│   │   ├── LogisticsTable.tsx    ← keep, style polish
│   │   └── [new] TechSpecGrid.tsx ← NEEDED: PAH/material/diameter visual grid
│   │   └── [new] CertBadgeRow.tsx ← NEEDED: ISSF/REACH cert display
│   │
│   ├── technology/       # Tecnologia page — full new structure
│   │   └── [new] PAHComparisonChart.tsx  ← NEEDED: visual PAH limit comparison
│   │   └── [new] ProcessTimeline.tsx     ← NEEDED: pine resin manufacturing steps
│   │   └── [new] SustainabilityMetric.tsx ← NEEDED: carbon footprint data display
│   │
│   ├── regulation/       # Regulation page — significant enhancement
│   │   ├── RegulationInfographic.tsx  ← rework: driven by Directus data
│   │   ├── CountdownTimer.tsx         ← keep
│   │   └── [new] PAHLimitExplainer.tsx ← NEEDED: visual 0.005% limit display
│   │   └── [new] ComplianceMatrix.tsx  ← NEEDED: product × regulation grid
│   │
│   ├── about/            # About page — minor enhancement
│   │   └── [new] TimelineSection.tsx   ← NEEDED: 1967→2001→2026 visual timeline
│   │
│   ├── contact/          # Contact — market-aware enhancement
│   │   ├── ContactForm.tsx  ← rework: market split (national/export)
│   │   └── [new] ContactSplit.tsx ← NEEDED: Spain vs International contact display
│   │
│   └── blog/             # Blog — new components
│       └── [new] BlogCard.tsx     ← NEEDED: article card
│       └── [new] BlogHero.tsx     ← NEEDED: post hero with image
│       └── [new] BlogContent.tsx  ← NEEDED: rich text renderer
```

---

## Data Flow

### Pattern 1: Server → Client (Standard RSC)

The dominant pattern. Pages are Server Components that fetch from Directus at request time, pass plain data objects as props to Server or Client child components.

```
[locale]/productos/[slug]/page.tsx   (Server Component)
  │
  ├── getProductBySlug(slug)  →  Directus REST API (server network)
  │                              uses DIRECTUS_INTERNAL_URL (Docker-internal)
  │
  └── <ProductDetail product={product} />  (Server Component, receives typed Product)
        ├── <MotionImage />  (Client, layoutId morph)
        ├── <TechSpecGrid specs={product} />  (Server)
        ├── <LogisticsTable data={product.logistics_data} />  (Server)
        └── <CertBadgeRow certs={product.certifications} />  (Server)
```

```
[locale]/regulacion-2026/page.tsx   (Server Component)
  │
  ├── getRegulationData()  →  Directus singleton
  │
  └── <RegulationInfographic limitDate={...} regulationName={...} />
        ├── <CountdownTimer targetDate={limitDate} />  (Client — uses Date)
        ├── <PAHLimitExplainer limit={0.005} />        (Server)
        └── <ComplianceMatrix />                        (Server)
```

### Pattern 2: Translation (next-intl)

All user-facing text flows through next-intl. Server Components use `getTranslations()`, Client Components use `useTranslations()`. Never hardcode text in JSX — this is a 4-locale site.

```
Server Component:
  const t = await getTranslations({ locale, namespace: "products" });
  <h1>{t("title")}</h1>

Client Component:
  const t = useTranslations("products");
  <button>{t("contactUs")}</button>
```

Translation namespaces to maintain:
```
src/messages/{locale}.json
├── metadata       → page titles, descriptions
├── nav            → menu labels
├── hero           → home hero copy
├── whyVivaz       → Quality/Sustainability/Performance pillars
├── products       → products listing and detail labels
├── technology     → tecnologia page
├── about          → sobre-vivaz page
├── regulation     → regulacion-2026 page
├── blog           → news listing and post
└── contact        → form labels, placeholders, success messages
```

### Pattern 3: Asset Flow (Directus Images)

```
Directus stores UUID → assetUrl(uuid, { width, format })
  → http://localhost:8055/assets/{uuid}?width=800&format=webp
  → next/image with custom loader (directus-image-loader.ts)
  → served via Nginx proxy in production
```

Browser never talks directly to Directus internal network. The `DIRECTUS_INTERNAL_URL` (Docker container hostname) is server-only. The `NEXT_PUBLIC_DIRECTUS_URL` is what browsers use.

### Pattern 4: Geo-Routing (Contact market split)

```
middleware.ts
  → reads x-vercel-ip-country or cf-ipcountry header
  → sets x-vivaz-market: "national" | "export"
  → response header available to Server Components

ContactPage (Server Component)
  → reads headers() for x-vivaz-market
  → passes market prop to ContactSplit and ContactForm
  → pre-selects correct phone number and CTA
```

### Pattern 5: Form Submission (Contact → CRM)

```
ContactForm.tsx  (Client Component — "use client")
  → user submits
  → POST /api/contact
  → api/contact/route.ts (Route Handler)
  → createDirectus().request(createItem("crm_leads", data))
  → returns 200 or error
```

---

## Component Hierarchy (Visual)

```
LocaleLayout (Server)
├── <html lang={locale}>
├── NextIntlClientProvider (Client boundary — passes messages)
│   ├── SmoothScroll (Client — Lenis)
│   │   ├── Navbar (Server)
│   │   │   └── NavbarClient (Client — scroll detection, mobile menu)
│   │   ├── <main viewTransitionName="page-content">
│   │   │   └── PageTransition (Client — framer-motion AnimatePresence)
│   │   │       └── {children}  ← page-specific tree
│   │   └── Footer (Server)
└── <script> JSON-LD (injected server-side)
```

---

## Design System Boundaries

### What Must Not Change

These primitives underpin every page. Breaking them breaks everything.

| Token / Component | What it Does | Rule |
|---|---|---|
| `--color-primary: #075627` | Vivaz forest green | Never override directly |
| `--color-accent: #f45b38` | CTAs, highlights | Never override directly |
| `--color-cream: #f5f0e2` | Page background | Never override directly |
| `--font-quablo` | All headings (h1–h6) | Do not use on body text |
| `--font-manrope` | All body/label text | Do not use font-family class on headings |
| `Container` | Max-width + horizontal padding | Always wrap section content |
| `InView` | Scroll-reveal animation | Always wrap new sections |
| `Button` | Styled CTA (primary/secondary variants) | Extend variants, do not fork |

### What Can Be Extended

| Component | Extension Pattern |
|---|---|
| `Badge` | Add new `variant` props for new badge types |
| `InView` | New animation values in the `animation` union type |
| `SpotlightReveal` | Props already generic — reuse for new comparisons |
| `SectionHeader` | Already accepts subtitle + title — use consistently |

### New Shared Component Needed: `PageHero`

Every inner page (not home) uses the same hero pattern: dark bg, bg image at opacity, gradient overlay, `InView` fade-in-up for eyebrow + h1. This is copy-pasted across 5 pages currently. Extract it.

```typescript
// Proposed interface
interface PageHeroProps {
  eyebrow: string;          // small uppercase label above title
  title: string;            // h1 text
  backgroundImage: string;  // /img path
  backgroundOpacity?: number; // default 0.25
  minHeight?: string;       // default "60vh"
  children?: ReactNode;     // slot for countdown, sub-content
}
```

---

## Patterns to Follow

### Pattern: Section-per-Concern on Inner Pages

Each major content block on an inner page is a `<section>` with:
- Explicit background color (`bg-white`, `bg-cream`, `bg-cream-light`, `bg-primary-dark`)
- `py-20 lg:py-28` vertical spacing
- `<Container>` wrapper
- `<InView>` on each animated sub-element

This creates the "stacking sections" feel with consistent rhythm. Do not deviate from this rhythm on new pages.

### Pattern: Two-Column Content + Image

Standard content layout on technology/about pages:

```tsx
<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
  <InView animation="slide-in-left">
    <Image ... />
  </InView>
  <InView animation="slide-in-right">
    <h2>...</h2>
    <p>...</p>
  </InView>
</div>
```

Alternate left/right on consecutive sections. The `order-2 lg:order-1` pattern handles mobile reordering.

### Pattern: Data Cards (3-up Grid)

For regulation info cards, why-vivaz pillars, feature callouts:

```tsx
<div className="grid gap-6 md:grid-cols-3">
  {items.map((item, i) => (
    <InView key={item.id} animation="scale-in" delay={i * 150}>
      <div className="rounded-[24px] bg-white p-8 shadow-sm ...">
        {/* icon + title + body */}
      </div>
    </InView>
  ))}
</div>
```

### Pattern: Dark Accent Section

Use `bg-primary-dark` sections to punctuate page flow. Place at least one per long page. These sections use `text-warm-white` and can house SpotlightReveal, large stats, or bold CTAs.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Client Components at the Wrong Level

**What goes wrong:** Adding `"use client"` to a page-level component because one child needs interactivity (e.g., a countdown timer). This makes the entire data fetch happen client-side, breaking SSR and requiring loading states.

**Why it happens:** Mixing server data fetching and client-side interactivity without splitting concerns.

**Prevention:** Keep pages as Server Components. Extract only the interactive child into a Client Component and pass primitive data as props. The `RegulationInfographic` component currently has this problem — it uses `useTranslations()` (Client hook) but wraps server-rendered countdown timers. Fix by splitting the translation logic.

```tsx
// WRONG: entire component becomes client because of useTranslations
"use client";
export default function RegulationInfographic({ limitDate }: Props) {
  const t = useTranslations("regulation"); // forces client
  return <CountdownTimer targetDate={limitDate} />;
}

// CORRECT: page stays server, only interactive part is client
// page.tsx (Server)
export default async function Page() {
  const t = await getTranslations("regulation");  // server
  const data = await getRegulationData();          // server
  return <RegulationLayout title={t("title")} limitDate={data.limit_date} />;
}
// RegulationLayout.tsx — can stay Server
// CountdownTimer.tsx — "use client" only for this piece
```

### Anti-Pattern 2: Hardcoding Locale-Specific Content

**What goes wrong:** Copy pasted directly in JSX (e.g., `"Regulation Enforced"` in RegulationInfographic line 101, `"First pine resin clay targets in Europe"` line 74). These strings cannot be translated.

**Prevention:** Every user-visible string must be a `t("key")` call with entries in all four message files.

### Anti-Pattern 3: Stacking Providers Unnecessarily

**What goes wrong:** Adding more Client Component wrappers to the locale layout (e.g., a Redux provider, a theme provider) when the existing NextIntlClientProvider + SmoothScroll is already handling context propagation.

**Prevention:** Pass data through props or use `next-intl` for all i18n needs. Keep the provider tree minimal.

### Anti-Pattern 4: Image Handling Bypassing the Directus Helper

**What goes wrong:** Constructing Directus image URLs manually in components instead of using `assetUrl()`. Creates inconsistency when the Directus URL changes between environments.

**Prevention:** Always use `assetUrl(uuid, params)` from `@/lib/directus`. It handles both internal (server) and public (browser) URL selection.

### Anti-Pattern 5: Collapsing the Section Rhythm

**What goes wrong:** Combining multiple content concerns into one oversized section to "save scroll". Premium sites earn the scroll — density reads as cheap.

**Prevention:** Each discrete narrative beat gets its own section with its own background color. The alternating bg-white / bg-cream / bg-cream-light pattern creates visual breathing room.

---

## Page-Level Architecture: Enhancement Targets

### Home Page

**Current state:** 7 sections wired up, no Directus data, placeholder images.

**Target state:** Dynamic hero, Directus-fed product showcase, real copy.

```
HeroSection          → video background (or high-quality landscape photo)
ProductRangeStrip    → all 6+ target formats from pim_products
WhyVivazGrid         → Quality / Sustainability / Performance (briefing pillars)
ProductShowcase(natura)   → NATURA range, full-bleed premium treatment
ProductShowcase(ecostar)  → ECO STAR range
CommitmentBanner     → "25 years ahead" stat-driven banner
CTASection           → dual CTA: Natura + Contact
ColorStrip           → decorative brand element
```

**Data dependencies:** `getProducts({ featured: true })`, `getBrandData()`

### Product Pages

**Current state:** Listing groups by range, detail shows basic specs.

**Target state:** Rich discipline filtering, certifications, tech data download, related products.

```
ProductosPage (Server)
├── getProducts() → grouped by range_category
├── Section: NATURA range (premium layout, flagship treatment)
├── Section: ECO STAR range
└── Section: Sustainability CTA linking to /tecnologia

ProductoPage (Server)
├── getProductBySlug(slug) + getDisciplines()
├── ProductDetail
│   ├── PageHero: product name + range badge + image morph (layoutId)
│   ├── TechSpecGrid: diameter, weight, material, PAH level, color
│   ├── DisciplineBadge row: which shooting disciplines use this target
│   ├── CertBadgeRow: ISSF / REACH certifications
│   ├── ProductDescription: HTML from Directus (rich text)
│   ├── LogisticsTable: box/pallet/container data
│   └── ContactCTA: "Request samples / pricing"
```

### Technology Page

**Current state:** Static section layout, good structure, SpotlightReveal implemented.

**Target state:** Updated copy from briefing, real images, data visualization for PAH levels.

```
TecnologiaPage (Server)
├── PageHero: "Fabricación 100% Ecológica"
├── Section: Pine resin origin + composition (2-col image+text)
├── Section: SpotlightReveal (macro petroleum vs NATURA visual)
├── Section: PAHComparisonChart (0 mg/kg vs <50 mg/kg vs 400+ mg/kg industry)
├── Section: Manufacturing process timeline (pine harvesting → pressing → QA)
├── Section: REACH certification + traceability
├── Section: Environmental comparison (Vivaz vs petroleum — existing component, update)
└── CTA → Contact
```

**Note:** The `TecnologiaPage` currently duplicates the briefing's text via `t()` calls but uses placeholder images. The SpotlightReveal at line 144 incorrectly reuses `pineResinTitle` for its section header. These are copy bugs to fix during content work.

### Regulation 2026 Page

**Current state:** CountdownTimer + timeline + 3 info cards. Solid structure. Issues: hardcoded English strings, `RegulationInfographic` uses `useTranslations` making it a Client Component.

**Target state:** Fully translated, Directus-driven, compliance matrix added.

```
RegulacionPage (Server)
├── getRegulationData() → limit_date, regulation_name, pah_limit_mg
├── PageHero: regulation name + countdown (CountdownTimer Client)
├── Section: What the regulation means (3-card grid)
├── Section: Timeline 2001 → 2025 → 2026 (visual horizontal)
├── Section: PAHLimitExplainer (0.005% = 50 mg/kg visualized)
├── Section: ComplianceMatrix — NATURA (✓ 0 mg/kg) vs ECO STAR (✓ <50 mg/kg) vs Traditional (✗)
└── CTA → Contact / Products
```

**Fix required:** Extract `useTranslations` out of `RegulationInfographic` → move to Server Component `page.tsx`, pass strings as props.

### About Vivaz

**Current state:** History + pioneers + factory + values sections. Copy placeholders.

**Target state:** Real briefing copy, timeline visual, real factory images.

```
SobreVivazPage (Server)
├── PageHero: "Desde 1967, Pioneros en Calidad"
├── Section: History 1967 (2-col: factory image + text)
├── Section: TimelineSection (1967 founded → 2001 pine resin → 2026 regulation)
├── Section: Pioneers 2001 (2-col: inverted)
├── Section: Factory full-bleed (existing structure — update image)
├── Section: Values 4-up grid (Quality / Innovation / Sustainability / Service)
└── CTA → Products or Contact
```

### Contact Page

**Current state:** ContactForm exists.

**Target state:** Market-aware split (Spain number vs International number), WhatsApp CTA.

```
ContactoPage (Server)
├── getBrandData() → phone_national, phone_export, whatsapp
├── reads headers() for x-vivaz-market
├── ContactSplit: shows correct phone by market
├── ContactForm: pre-selects market field, interest dropdown
└── WhatsApp floating CTA
```

### Blog

**Current state:** Page and slug routes exist, components partially built.

**Target state:** Working list + detail with Directus content.

```
NoticiasPage (Server)
├── getBlogPosts({ limit: 12 })
├── PageHero: "Noticias"
└── BlogCard grid (3 columns)

NoticiasSlugPage (Server)
├── getBlogPostBySlug(slug)
├── BlogHero: featured image + title + date
└── BlogContent: HTML renderer with typography styles
```

---

## Scalability Considerations

This is a low-traffic corporate site. Scalability concerns are operational, not technical.

| Concern | Current Approach | Recommendation |
|---------|-----------------|----------------|
| Image delivery | Directus /assets with transform params | Add `next/image` `sizes` attribute to all DirectusImage usages |
| Static generation | All routes are dynamic (SSR) | Consider `export const revalidate = 3600` on product/blog pages — ISR cuts Directus load |
| 4-locale messages | All 4 JSONs loaded on every request | Current approach fine for 8 pages; use `getMessages({ locale })` scope if messages grow beyond 200 keys |
| CMS availability | Try/catch on all Directus calls | Good defensive pattern — maintain on all new Directus calls |
| Docker restart sequence | Directus must be up before Next.js | `depends_on: directus` in docker-compose; already in place |

---

## Build Order for Enhancement Work

Dependencies flow downward. Build in this order:

### Layer 1: Design System (no dependencies)

1. Extract `PageHero` component — used by all inner pages
2. Add `StatCard` component — used by Home, Technology, Regulation
3. Update `globals.css` if any new keyframes are needed
4. Update all 4 message files with final briefing copy

These have no upstream dependencies and unlock every subsequent phase.

### Layer 2: Data Layer (depends on Directus being seeded)

5. Seed Directus collections with real product data (pim_products, pim_disciplines)
6. Seed sys_brand with real contact info, logos
7. Seed web_regulation with correct date and limit
8. Seed blog_posts with initial news content

### Layer 3: Shared Content Components (depends on Layer 1)

9. Rework `ProductCard` — used on listing and home
10. Build `TechSpecGrid` — used on product detail
11. Build `CertBadgeRow` — used on product detail
12. Build `ContactSplit` — used on contact page
13. Build `PAHComparisonChart` — used on technology page
14. Build `TimelineSection` — used on about page

### Layer 4: Page Sections (depends on Layers 1–3)

15. Home page: `HeroSection` rework, `WhyVivazGrid` copy update, `ProductShowcase` rework
16. Products listing page: range grouping already works, needs real data + card rework
17. Product detail page: assemble from Layer 3 components
18. Technology page: sections + SpotlightReveal images + copy
19. About page: history + timeline + values copy
20. Regulation page: fix Client/Server split, add ComplianceMatrix, all strings translated
21. Contact page: ContactSplit, form market-awareness
22. Blog listing + detail: BlogCard, BlogContent

### Layer 5: Polish (depends on Layer 4)

23. View transitions: ensure MotionImage `layoutId` matches between list and detail
24. Lenis: verify smooth scroll works on all pages after content changes
25. JSON-LD: add breadcrumb schema to inner pages, Article schema to blog posts
26. Final i18n audit: grep for hardcoded strings

---

## Component Dependency Graph (simplified)

```
globals.css ──────────────────────────────────────────────────
                                                              │ all components depend on design tokens
ui/Container ←── all section components
ui/InView    ←── all animating sections
ui/Button    ←── all CTAs
ui/PageHero  ←── tecnologia, sobre-vivaz, regulacion, productos, noticias
                                                              │
lib/directus ←── all page.tsx files (Server Components only)
lib/types    ←── all components that receive Directus data
                                                              │
product/TechSpecGrid ──────── ProductDetail
product/CertBadgeRow ──────── ProductDetail
product/LogisticsTable ─────── ProductDetail
product/ProductCard ───────── ProductosPage, HomeProductShowcase
                                                              │
regulation/CountdownTimer ─── RegulationInfographic (Client boundary)
regulation/ComplianceMatrix ── RegulationInfographic (Server)
                                                              │
contact/ContactSplit ─────── ContactPage
contact/ContactForm ─────── ContactPage
```

---

## Sources

- Direct codebase inspection: `frontend/src/**` (all 57 source files)
- Next.js 16 App Router docs (Server/Client Component model) — HIGH confidence
- next-intl patterns for Server vs Client translation — HIGH confidence
- Directus SDK `readItems` / `readSingleton` patterns — verified in existing `lib/directus.ts`
- framer-motion `layoutId` morph pattern — verified in `MotionImage.tsx` and `ProductDetail.tsx`
- Lenis/React smooth scroll — verified in `SmoothScroll.tsx` (lenis/react, not @studio-freight)
