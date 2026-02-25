# Phase 4: Page Assembly - Research

**Researched:** 2026-02-25
**Domain:** Next.js 16 App Router page composition, Directus data integration, next-intl localization, Tailwind CSS v4 layout assembly
**Confidence:** HIGH — entire research is based on direct codebase inspection, no external library guessing needed

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Home Page**
- Section order: Hero → Product Range Strip → Why Vivaz (3 pillars) → NATURA showcase → ECO STAR showcase → Videos section → CTA banner → Contact section (inline) → Footer
- Hero keeps current design: forest background, "LÍDERES EN PLATOS ECOLÓGICOS", heritage tagline, "DESCUBRE NUESTRA GAMA" CTA
- Videos section: NEW component — 4 video cards with thumbnail images + video URLs managed in Directus (new collection `web_videos` or similar), always exactly 4, responsive grid, play button overlay, topographic background pattern
- Contact section appears inline on the home page (full Nacional/Internacional + form) AND also exists as standalone /contacto page — reuse the same ContactSplit component
- Footer: standard corporate — VIVAZ logo, navigation links, contact info, social links (Instagram), legal links, copyright. Dark rounded-corner card matching the design aesthetic

**Product Pages**
- Product listing (/productos): keep 3-category grid (Premium Natura, Eco Star, Special Formats) — enhance each ProductCard with PAH badge, discipline icons, and Directus imagery
- Product detail: tab/toggle per format variant — one page per product line (NATURA, ECO STAR), user switches between diameter formats inline
- PAHComparisonChart included on product detail pages below the TechSpecGrid specs section
- Catalog PDF download: prominent CTA button within the specs area linking to shared Catalog-min.pdf from Directus
- CertBadgeRow displayed on product detail pages for certification visual proof

**Regulation & Technology Pages**
- Regulation page structure: countdown timer → ComplianceMatrix → PAH chart (three-layer proof)
- External link to official EUR-Lex document (EU 2025/660) with a plain-language summary section
- Technology page: replace the current text-based petroleum vs Vivaz comparison section with the animated PAHComparisonChart
- CertBadgeRow appears on BOTH Technology page (in the REACH section) AND Regulation page (below ComplianceMatrix)
- TimelineSection shared between Technology and About pages via props-driven events array

**About Page**
- TimelineSection as the centerpiece narrative (1967 founded → 2001 pine resin pioneers → 2026 EU regulation)
- Replace emoji value cards (🎯💡🌿🤝) with proper icons — keep the 4-column grid layout but use SVG/design-system icons
- Keep existing factory section and heritage imagery

**Contact Page**
- Follow the design layout: Nacional and Internacional side by side (NOT stacked cards) — adapt ContactSplit component to render side-by-side on desktop
- Geo-routing highlight (via x-vivaz-market header) on the matching section
- WhatsApp FAB persists on the contact page (and all pages)
- Contact form fields: Nombre, Apellidos, Email, Teléfono, market select (Nacional/Internacional), Mensaje, privacy checkbox, ENVIAR button — drop company and interest selects from current form
- Privacy checkbox text needs real legal copy (currently lorem ipsum in design)

**Blog Pages**
- Listing: BlogCard component in 3-column responsive grid with image, date, title, excerpt
- Detail: BlogHero (full-width image + title + date) → BlogContent (prose-styled HTML via @tailwindcss/typography + sanitizeHtml)
- Content comes from Directus blog_posts collection with translations

### Claude's Discretion
- Exact responsive breakpoints for the videos grid (likely 1col mobile, 2col tablet, 4col desktop)
- Footer internal structure and column layout
- Blog card hover effects
- Format variant tab component design details
- EUR-Lex link styling and summary section layout
- Product listing card enhancement specifics (badge placement, icon sizing)
- Whether the topographic pattern on the videos section is CSS or an SVG background

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PROD-01 | NATURA product page displays complete specs — 100% pine resin, 0 mg/kg PAH, ISSF disciplines, weight, dimensions | TechSpecGrid component already built (Phase 3); ProductDetail page shell exists; data comes from Directus pim_products with seeded specs |
| PROD-02 | ECO STAR product page displays complete specs — <50 mg/kg PAH, Sporting disciplines, weight, dimensions | Same pattern as PROD-01; ProductDetail handles both range types |
| PROD-03 | Product range displays all 6 formats: American Trap, Extra Rabbit, Rabbit, Battue, Midi 90, Mini 60 | All 6 seeded in Directus; ProductCard grid on /productos page needs format-aware sections |
| PROD-05 | Product listing page with visual distinction between NATURA (premium) and ECO STAR (performance) | ProductCard already shows PAH badge; ProductCard enhancement adds discipline icons and stronger visual differentiation |
| PROD-06 | Logistics table visible with format x pack size x pallet data for distributor procurement | LogisticsTable component exists; ProductDetail already renders it when logistics_data present |
| SUST-02 | Technology page explains pine resin chemistry with visual comparison vs traditional petroleum-based targets | tecnologia/page.tsx exists with comparison section; replace text-based comparison with PAHComparisonChart |
| SUST-03 | Sustainability narrative positioned as primary brand architecture across site — not just a section | Achieved by ensuring every page hero, CTA, and copy references the ecological story; not a component task |
| SUST-04 | Carbon footprint data, REACH traceability, and regulatory compliance information accessible | Technology page REACH section + CertBadgeRow from Phase 3; supply certifications array to CertBadgeRow |
| REG-01 | EU 2025/660 regulation explainer page — PAH limits, enforcement date (April 2026), scope | regulacion-2026/page.tsx exists; RegulationContent component built in Phase 3; needs ComplianceMatrix + PAH chart wired in |
| REG-02 | Infographic showing what changes and why, in didactic format | ComplianceMatrix (Phase 3) serves as infographic; PAHComparisonChart adds visual layer; both need to be wired into the regulation page |
| REG-03 | Link to official EU commission regulation document | EUR-Lex URL: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R0660 — add external link with rel="noopener noreferrer" |
| REG-05 | Content emphasizes Vivaz's 25-year head start in ecological production | Timeline in RegulationContent already shows 2001 milestone; copy in translations already says "Vivaz has been compliant since 2001" |
| HOME-01 | Hero section with landscape/nature visual + Natura product visualization | HeroSection.tsx exists with hero-bg.png background; enhance with geo-adapted subtitle copy |
| HOME-02 | "Why Vivaz" module with three pillars: Quality, Sustainability, Performance | WhyVivazGrid.tsx exists and complete |
| HOME-03 | CTA buttons: Discover Natura / Discover ECO STAR | ProductShowcase.tsx has CTA buttons; home page composition already includes both showcases |
| HOME-04 | Geo-adapted hero copy — regulation urgency for export visitors, performance focus for national | HeroSection uses useTranslations("hero") — must read x-vivaz-market header; since HeroSection is Client Component, market hint must come from layout/server; add geo-aware prop from Server Component parent |
| HOME-05 | Brief ecological leadership message in hero area | Currently hero has description text; ensure briefing copy used ("Más de 50 años de fabricación y pioneros desde 2001...") |
| LEAD-01 | Contact form functional with all fields (name, email, phone, company, market, interest, message) | ContactForm.tsx exists; CONTEXT decision: simplify to name, apellidos, email, phone, market select, message, privacy checkbox — update form and API route |
| LEAD-02 | National contact displayed: +34-618-757-580, export@platosvivaz.com | ContactCards.tsx has these as defaults; ContactSplit wires BrandData from Directus sys_brand collection |
| LEAD-03 | International contact displayed: +34-606-172-746, sales@vivazclaytargets.com | Same as LEAD-02 — ContactCards defaults already correct |
| LEAD-04 | WhatsApp button integrated for quick contact | WhatsAppFAB component built (Phase 3); needs to be added to locale layout.tsx globally |
| LEAD-06 | Contact split display — market-aware using geo-routing header | ContactSplit.tsx already reads x-vivaz-market header via await headers(); needs to be integrated into both /contacto page and home page inline contact section |
| ABOUT-01 | Company history since 1967 with innovation milestones | sobre-vivaz/page.tsx exists with history sections; needs TimelineSection (Phase 3) wired in with 1967/2001/2026 events |
| ABOUT-02 | Factory, team, and values content from briefing | sobre-vivaz/page.tsx has factory section; replace emoji icon cards with SVG icons |
| BLOG-01 | Blog listing page renders posts from Directus CMS | noticias/page.tsx exists but uses basic article markup; replace with BlogCard component (Phase 3) |
| BLOG-02 | Blog detail page renders rich text content (sanitized HTML from Directus) | noticias/[slug]/page.tsx exists with sanitizeHtml; replace basic layout with BlogHero + BlogContent components |
| BLOG-03 | Blog posts support all 4 locales | BlogCard and BlogHero both accept locale prop and getLocalizedContent() helper; pages need to pass locale param |
| DESGN-01 | Clean, precision-focused design that conveys premium quality — not overloaded | Achieved through section composition; ensure cream/white/dark-green color blocks alternate correctly |
| DESGN-02 | Consistent visual language across all 8 pages | All pages must use PageHero, InView animations, Container widths, and established color tokens |
| DESGN-04 | Briefing copy integrated across all pages (from briefing/vivaz textos web.md) | Briefing copy is already in es.json / en.json; some pages still use generic CTA copy that needs to be updated |
</phase_requirements>

---

## Summary

Phase 4 is a page composition and integration phase, not a component-building phase. Phases 1-3 have produced a complete component library (TechSpecGrid, PAHComparisonChart, ComplianceMatrix, TimelineSection, ContactSplit, BlogCard, BlogHero, CertBadgeRow, WhatsAppFAB) and seeded Directus with real product data. Phase 4's job is to wire those components into 8 existing page shells that currently have placeholder layouts, incomplete sections, or missing integrations.

The most important finding from codebase inspection is that most page shells already exist and fetch data correctly — the work is primarily (a) restructuring section order, (b) replacing inline placeholder sections with the purpose-built Phase 3 components, (c) wiring the geo-routing market signal into page props, (d) adding the Videos section (new component + Directus collection), and (e) updating the contact form fields per the CONTEXT decisions. No new routing, data fetching infrastructure, or library installations are required.

The three-plan split (04-01: Home/About/Contact, 04-02: Products, 04-03: Technology/Regulation/Blog) aligns well with natural dependency clusters. Plans 04-01 and 04-03 can proceed in parallel since they share no dependencies. Plan 04-02 depends on having a clear product page URL/slug strategy, which is already established (per-slug dynamic route at /productos/[slug]).

**Primary recommendation:** Each plan should follow the pattern: identify gaps between current page shell and target layout, replace placeholder sections with Phase 3 components, pass geo-routing market signal from Server Component boundary, ensure all new keys are added to all 4 locale message files simultaneously.

---

## Standard Stack

### Core (already installed — no new installations needed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next-intl | current | All translations via `getTranslations()` (server) or `useTranslations()` (client) | Established in Phase 1; localePrefix "as-needed" |
| @tailwindcss/typography | current | `prose` classes for blog rich text | Installed in Phase 1 |
| isomorphic-dompurify / sanitizeHtml | current | Sanitize blog HTML from Directus | Installed in Phase 1 |
| framer-motion | current | InView animations, page transitions | Established in Phase 3 |
| @directus/sdk | current | readItems, readSingleton for all data | Established in Phase 2 |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/headers | next 16 | `await headers()` for x-vivaz-market | Any Server Component that needs geo-routing signal |
| next/image | next 16 | Optimized images with assetUrl() | All product images from Directus |
| next/navigation | next 16 | `usePathname()`, `notFound()` | Client locale detection, 404 handling |

### New Directus Collection Needed
The Videos section requires a new Directus collection. Based on CONTEXT decisions:
- Collection name: `web_videos`
- Fields: `id`, `title` (string), `thumbnail` (file UUID), `video_url` (string), `sort` (integer), `status`
- This collection must be created via Directus admin before the Videos component can be built
- Type definition: `WebVideo { id: number; title: string; thumbnail: string | null; video_url: string; sort: number; status: string; }`

**Installation:** None required — all dependencies are already installed.

---

## Architecture Patterns

### Recommended File Locations for New Work
```
frontend/src/
├── app/[locale]/
│   ├── page.tsx                    # Home — restructure with Videos + ContactSplit sections
│   ├── sobre-vivaz/page.tsx        # About — wire TimelineSection, replace emoji icons
│   ├── contacto/page.tsx           # Contact — replace inline cards with ContactSplit
│   ├── productos/page.tsx          # Products listing — enhance ProductCard, add discipline icons
│   ├── productos/[slug]/page.tsx   # Product detail — wire TechSpecGrid, PAHChart, CertBadgeRow
│   ├── regulacion-2026/page.tsx    # Regulation — wire ComplianceMatrix + PAHChart
│   ├── tecnologia/page.tsx         # Technology — replace comparison with PAHChart
│   └── noticias/
│       ├── page.tsx                # Blog listing — wire BlogCard grid
│       └── [slug]/page.tsx         # Blog detail — wire BlogHero + BlogContent
├── components/
│   ├── home/
│   │   └── VideoSection.tsx        # NEW — 4 video cards from Directus web_videos
│   └── contact/
│       └── ContactForm.tsx         # MODIFY — simplify fields per CONTEXT
└── lib/
    ├── directus.ts                 # ADD getVideos() function
    └── types.ts                    # ADD WebVideo interface
```

### Pattern 1: Server Component with Geo-Routing Signal
**What:** Server Component reads `x-vivaz-market` header via `await headers()` and passes market as prop to child components.
**When to use:** Any page that needs geo-adapted content (home page hero, contact page).
**Example:**
```typescript
// In a Server Component page or layout
import { headers } from "next/headers";

export default async function Page() {
  const headersList = await headers();
  const market = (headersList.get("x-vivaz-market") ?? "export") as "national" | "export";

  // Pass market to client components or use for conditional rendering
  return <ContactSplit market={market} />;
}
```
Note: HeroSection is currently a Client Component using `useTranslations`. To add geo-adaptation, the market signal must be passed as a prop from the page (Server Component) — do NOT use `await headers()` inside a Client Component.

### Pattern 2: Server Component with Directus Data + Translations
**What:** Standard page pattern — fetch data, get translations, pass both as props to display components.
**When to use:** All product and blog pages.
**Example:**
```typescript
export default async function Page({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  let product = null;
  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }

  const translations = {
    pahLevel: t("pahLevel"),
    // ... pass individual string values, not the t function
  };

  return <ProductDetail product={product} translations={translations} />;
}
```

### Pattern 3: Format Variant Tabs on Product Detail Page
**What:** Single product detail page at /productos/[slug] must show format variants (e.g., NATURA Standard Ø110, NATURA Rabbit Ø110) as switchable tabs — the slug routes to a product line, not a single SKU.
**The current situation:** Each product variant IS a separate Directus record with its own slug. The CONTEXT decision says "one page per product line, user switches between diameter formats inline."
**Implementation approach:** The /productos/[slug] page currently fetches one product by slug. To show multiple variants, two options exist:
1. Fetch all products in the same range_category and filter for the same base line (e.g., all "Premium Natura" products), then render a tab/toggle UI — the initial slug determines which line is shown.
2. Use a dedicated slug per line (e.g., "natura" and "eco-star") that fetches all variants for that line.

The CONTEXT says "one page per product line" — this suggests Option 2. The line-level slug (`natura`, `eco-star`) should fetch all products for that line via `getProducts({ range: "Premium Natura" })`. The current `getProductBySlug` won't work for this — need a new `getProductsByLine()` or use `getProducts({ range })`.

**Decision for planner:** The product detail page architecture needs to be revised. Instead of slug = individual SKU, slug = product line (`natura`, `eco-star`), and the page fetches all variants for that line and renders a tab UI.

### Pattern 4: BlogCard + BlogHero Locale Pass-Through
**What:** Blog components accept `locale` prop for date formatting and content localization.
**When to use:** noticias/page.tsx and noticias/[slug]/page.tsx — both must pass `locale` from params.
**Example:**
```typescript
export default async function NoticiasPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  const posts = await getBlogPosts();

  return (
    <div>
      {posts.map(post => (
        <BlogCard key={post.id} post={post} locale={locale} readMoreLabel={t("readMore")} />
      ))}
    </div>
  );
}
```

### Pattern 5: WhatsAppFAB Global Placement
**What:** WhatsAppFAB must appear on ALL pages (it's fixed positioned). It should be in the locale layout, not repeated in each page.
**Where:** `src/app/[locale]/layout.tsx` — add WhatsAppFAB inside the SmoothScroll provider, after Footer.
**Data source:** WhatsApp number from `getBrandData()` → `brand.whatsapp`. Since layout.tsx is a Server Component, it can fetch this directly.
**Example:**
```typescript
// In layout.tsx
import WhatsAppFAB from "@/components/contact/WhatsAppFAB";

// In the JSX, after <Footer />:
<WhatsAppFAB number={brand?.whatsapp ?? "+34618757580"} />
```

### Pattern 6: Adding Translation Keys (critical process)
**What:** ANY new translation key must be added to ALL 4 locale files simultaneously — es.json, en.json, fr.json, de.json.
**When:** Every new component that calls `t("newKey")` or receives a translations prop with a new key.
**Risk:** Missing a key in one locale causes runtime errors in production. The current codebase has complete parity across all 4 locales.

### Anti-Patterns to Avoid
- **Reading headers() in Client Components:** `await headers()` only works in Server Components. Pass market as prop.
- **Hardcoding contact numbers:** Use BrandData from Directus — contact numbers live in `sys_brand`. ContactCards already defaults to the correct numbers but ideally reads from props passed from the page via `getBrandData()`.
- **Using useTranslations in Server Components:** Server Components use `getTranslations()` (async); only Client Components use `useTranslations()` (synchronous hook).
- **Forgetting to pass locale to blog components:** BlogCard date formatting depends on locale. Without it, dates render in the server's default locale.
- **Creating a new FormatTab component that fetches data:** The tab UI should receive pre-fetched variants array from the page Server Component, not fetch independently.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| HTML sanitization for blog content | Custom sanitizer | `sanitizeHtml()` from `@/lib/sanitize` | Already uses isomorphic-dompurify with allowlist; SSR-safe |
| PAH comparison visualization | Custom chart | `PAHComparisonChart` from Phase 3 | IntersectionObserver + animateCount + reduced-motion — all edge cases handled |
| Compliance table | Custom table | `ComplianceMatrix` from Phase 3 | Accessible table with check/cross icons; translations-props pattern |
| Contact info display | New component | `ContactSplit` + `ContactCards` from Phase 3 | Geo-routing via headers() already wired; market highlight state |
| Blog card | Custom article | `BlogCard` from Phase 3 | Localized dates, DirectusImage, category badge, hover transitions |
| Blog hero | Custom hero | `BlogHero` from Phase 3 | Full-width DirectusImage, gradient overlay, locale-aware title |
| Cert display | Badge list | `CertBadgeRow` from Phase 3 | Accepts string[] certifications array; consistent styling |
| Timeline display | Custom | `TimelineSection` from Phase 3 | Desktop horizontal / mobile vertical layout; events array prop |
| Product specs grid | Custom | `TechSpecGrid` from Phase 3 | PAH color coding, discipline badges, optional fields |
| Product images | Raw next/image | `DirectusImage` or `assetUrl()` | Enforces WebP + quality=80 defaults via assetUrl(); consistent preset widths |
| Smooth scroll to top | Custom | Existing `ScrollToTop` in SmoothScroll provider | Already uses useLenis() + usePathname() effect |

**Key insight:** All domain-specific components were built in Phase 3 precisely so Phase 4 is composition-only. Building any custom version of these components would duplicate logic and miss edge cases (reduced motion, SSR-safe pointer detection, geo-routing, locale-aware dates).

---

## Common Pitfalls

### Pitfall 1: Product Detail Page Architecture Mismatch
**What goes wrong:** The current `/productos/[slug]` page calls `getProductBySlug(slug)` expecting slug = individual SKU (e.g., "natura-standard"). But the CONTEXT decision says one page per product LINE with format variant tabs. If slug = SKU, there's no natural way to show all variants of the NATURA line on a single page.
**Why it happens:** The existing page was built before the "tab per format" UX decision.
**How to avoid:** Redesign the slug convention: `/productos/natura` fetches all Premium Natura products; `/productos/eco-star` fetches all Eco Star Efficiency products. The page then renders format tabs. Update `generateStaticParams` to return `[{ slug: "natura" }, { slug: "eco-star" }]` as the two line-level slugs, not individual product slugs.
**Warning signs:** If there are 6+ static params (one per variant), the architecture is wrong.

### Pitfall 2: HeroSection Geo-Adaptation Requires Server-Side Signal
**What goes wrong:** HeroSection is a Client Component (`useTranslations`). To add geo-adapted copy (regulation urgency for export, performance for national), someone might try `await headers()` inside HeroSection — this throws at runtime.
**Why it happens:** The geo-routing signal lives in headers, which only Server Components can read.
**How to avoid:** The Home page (`app/[locale]/page.tsx`) reads `headers()` and passes `market` as a prop to HeroSection. HeroSection needs to accept a `market?: "national" | "export"` prop and select appropriate translation keys. Alternatively, use two translation keys in `hero.titleExport` and `hero.titleNational` and select based on prop.

### Pitfall 3: Missing Translation Keys Across 4 Locales
**What goes wrong:** A new component (e.g., VideoSection) is built with `t("videos.title")` — the key is added to es.json but forgotten in fr.json and de.json. The French/German site throws or shows key strings.
**Why it happens:** Manual process with 4 files to update.
**How to avoid:** Every task that adds a translation key must update ALL 4 locale files in the same commit. The planner should make this explicit in task actions.

### Pitfall 4: ContactForm Fields Mismatch with API Route
**What goes wrong:** The CONTEXT decision removes `company` and `interest` selects from ContactForm, but the `/api/contact` route still expects them for the CrmLead type. The Directus `crm_leads` collection schema may also have these fields as required.
**Why it happens:** ContactForm.tsx, the API route, the CrmLead type, and the Directus schema are all coupled.
**How to avoid:** When updating ContactForm, also update: (1) the CrmLead interface in types.ts (make company/interest optional), (2) the API route validation, (3) add `apellidos` field to the type and form state.

### Pitfall 5: Videos Section Requires New Directus Collection
**What goes wrong:** VideoSection component is built against a `web_videos` Directus collection that doesn't exist yet. The build succeeds but the component renders empty or throws at runtime.
**Why it happens:** New collection setup must happen before the component can be used.
**How to avoid:** Plan 04-01 (or 04-03, whichever owns VideoSection) must include a task to create the `web_videos` collection in Directus admin AND seed it with 4 test videos before building the component. A seed script pattern exists from Phase 2.

### Pitfall 6: ContactSplit Layout Change for /contacto Page
**What goes wrong:** The CONTEXT decision says Nacional and Internacional must be side-by-side (NOT stacked) on desktop for the /contacto page. But ContactSplit currently renders `<div className="grid gap-12 lg:grid-cols-2">` with form on left, cards on right — the cards are STACKED vertically inside the right column.
**Why it happens:** The current ContactSplit was designed for inline home page usage (form | stacked cards), but the standalone contact page needs form | [Nacional card | Internacional card] in a true side-by-side layout.
**How to avoid:** ContactSplit needs a `layout` prop: `"inline"` (current home page behavior: form | stacked cards) vs `"standalone"` (contact page: form is removed or placed above, Nacional | Internacional are side-by-side columns). Or the /contacto page can use ContactCards directly with a custom layout wrapper and display the form separately above.

### Pitfall 7: Regulation Page Missing Components
**What goes wrong:** The current `regulacion-2026/page.tsx` uses `RegulationContent` which contains: countdown timer, timeline, info cards, and a CTA. It does NOT yet include ComplianceMatrix or PAHComparisonChart — these were built in Phase 3 but not yet wired into the regulation page.
**Why it happens:** Phase 3 built the components; Phase 4 must wire them in.
**How to avoid:** The regulation page task must explicitly add ComplianceMatrix and PAHComparisonChart between the timeline/info cards section and the CTA. Both components require translations props — add new keys to all 4 locale files.

---

## Code Examples

### Get Brand Data in Layout for WhatsAppFAB
```typescript
// Source: directus.ts getBrandData() + layout.tsx pattern
// In src/app/[locale]/layout.tsx

import WhatsAppFAB from "@/components/contact/WhatsAppFAB";
import { getBrandData } from "@/lib/directus";

export default async function LocaleLayout({ children, params }) {
  // ... existing locale/messages setup ...

  let brand: BrandData | null = null;
  try {
    brand = await getBrandData();
  } catch {
    // Use fallback number
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll>
            <Navbar />
            <main style={{ viewTransitionName: "page-content" }}>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <WhatsAppFAB
              number={brand?.whatsapp ?? "+34618757580"}
              ariaLabel="Contactar por WhatsApp"
            />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Product Line Page with Format Variant Tabs
```typescript
// Source: app/[locale]/productos/[slug]/page.tsx — revised architecture
// slug = "natura" | "eco-star" (line-level, not SKU-level)

export async function generateStaticParams() {
  return [{ slug: "natura" }, { slug: "eco-star" }];
}

export default async function ProductoLinePage({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  const rangeMap = {
    "natura": "Premium Natura",
    "eco-star": "Eco Star Efficiency",
  } as const;

  const range = rangeMap[slug as keyof typeof rangeMap];
  if (!range) notFound();

  const variants = await getProducts({ range });
  if (!variants.length) notFound();

  return <ProductLinePage variants={variants} translations={...} />;
}
```

### Wiring PAHComparisonChart into a Page (Server Component pattern)
```typescript
// Source: PAHComparisonChart requires translations prop (Client Component)
// Called from any Server Component page

import PAHComparisonChart from "@/components/technology/PAHComparisonChart";

// In a Server Component:
const pahTranslations = {
  traditional: t("pahChart.traditional"),
  euLimit: t("pahChart.euLimit"),
  ecoStar: t("pahChart.ecoStar"),
  natura: t("pahChart.natura"),
  euLimitLabel: t("pahChart.euLimitLabel"),
  noPatLabel: t("pahChart.noPatLabel"),
  unit: t("pahChart.unit"),
};

return <PAHComparisonChart translations={pahTranslations} />;
```
Note: These `pahChart.*` keys must be added to all 4 locale files.

### Regulation Page EU Link Pattern
```typescript
// EUR-Lex official URL for EU 2025/660
const eurLexUrl = "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R0660";

// Render as accessible external link
<a
  href={eurLexUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 text-accent hover:text-accent-hover underline"
>
  {t("regulation.euDocLink")}
  <ExternalLinkIcon />
</a>
```

### TimelineSection with 1967/2001/2026 Events
```typescript
// Source: TimelineSection accepts events array prop
// Used on both About page and Technology page

const timelineEvents = [
  { year: 1967, title: t("timeline.founded"), description: t("timeline.foundedDesc") },
  { year: 2001, title: t("timeline.pioneers"), description: t("timeline.pioneersDesc") },
  { year: 2026, title: t("timeline.regulation"), description: t("timeline.regulationDesc") },
];

return <TimelineSection events={timelineEvents} />;
```

### New `getVideos` Function in directus.ts
```typescript
// To support the new VideoSection component
export async function getVideos() {
  const items = await client.request(
    readItems("web_videos", {
      filter: { status: { _eq: "published" } },
      sort: ["sort"],
      limit: 4, // Always exactly 4 per CONTEXT decision
      fields: ["*"],
    })
  );
  return items as unknown as WebVideo[];
}
```

### ContactForm Simplified Fields (per CONTEXT)
```typescript
// Drop: company, interest selects
// Add: apellidos (last name), privacy checkbox
// Keep: name, email, phone, market select, message

const [formData, setFormData] = useState({
  name: "",
  apellidos: "",
  email: "",
  phone: "",
  market: "Nacional" as "Nacional" | "Internacional",
  message: "",
  privacyAccepted: false,
});
```

---

## State of the Art

| Old Approach (Current Page Shell) | Phase 4 Target | Impact |
|----------------------------------|----------------|--------|
| Blog listing: basic `<article>` markup | BlogCard component in 3-col grid | Brand-consistent cards with DirectusImage, category badge |
| Blog detail: bare `<div>` with prose classes | BlogHero + BlogContent components | Full-width hero image + proper prose layout |
| Contact page: custom inline cards with placeholder phone numbers | ContactSplit with real BrandData from Directus | Geo-routing highlight, real contact numbers, WhatsApp |
| Technology comparison: text-based two-column table | PAHComparisonChart (animated) | Visual impact for the key differentiator claim |
| Regulation page: countdown + timeline only | + ComplianceMatrix + PAHChart + EUR-Lex link | Three-layer proof of authority |
| About page: emoji icon cards | SVG icon cards | Design professionalism, no emoji fallback risk |
| Home page: no inline contact section | ContactSplit inline after video section | Distributor can contact without navigating away |
| Product detail: single SKU view | Tab-based format variant selector | Full product line visible in one page |

---

## Open Questions

1. **Product line slug naming**
   - What we know: CONTEXT says "one page per product line" with format tabs; current slugs are per-SKU (e.g., "natura-standard", "natura-rabbit")
   - What's unclear: Should the line-level slugs be "natura" / "eco-star", and should the old per-SKU slugs redirect? Or should the per-SKU slugs remain with a tab UI selecting among them?
   - Recommendation: Use "natura" and "eco-star" as line-level slugs. The old per-SKU URLs can 404 gracefully since they haven't been linked externally yet. `generateStaticParams` returns the two line slugs only.

2. **Videos section: Directus collection creation process**
   - What we know: Directus admin is accessible; seed scripts pattern exists from Phase 2
   - What's unclear: Can collection creation be scripted (via Directus collections API), or must it be done manually in the UI?
   - Recommendation: Create the `web_videos` collection manually in Directus admin at the start of the plan that owns VideoSection. Seed 4 placeholder video records (thumbnail UUID from existing images, YouTube/Vimeo URL). The component renders gracefully if 0 records exist (empty section with fallback).

3. **ContactForm fields: CrmLead schema update**
   - What we know: CrmLead interface has `company` and `interest` as required fields; removing them from the form requires updating the type + API route + Directus schema
   - What's unclear: Is `apellidos` (last name) a new field that needs to be added to the Directus `crm_leads` collection?
   - Recommendation: Make `company` and `interest` optional in CrmLead type (`company?: string`); add `apellidos?: string` as an optional field. The Directus collection may need a migration. Treat this as a data schema concern within the 04-01 plan.

4. **SVG icons for About page values**
   - What we know: The 4 values (Quality, Innovation, Sustainability, Service) currently use emoji icons (🎯💡🌿🤝); CONTEXT says replace with proper icons
   - What's unclear: Which SVG icon library or source? The project has inline SVGs in components (no icon library installed).
   - Recommendation: Create 4 small inline SVG icons directly in the about page (target/crosshair for quality, lightbulb for innovation, leaf for sustainability, handshake for service). No new library needed — follow the pattern of inline SVGs in existing components.

5. **Privacy checkbox legal copy**
   - What we know: CONTEXT says "Privacy checkbox text needs real legal copy (currently lorem ipsum)"
   - What's unclear: The actual legal text for Spain GDPR compliance
   - Recommendation: Use a standard Spanish GDPR consent phrase: "He leído y acepto la Política de Privacidad" linked to the privacy policy page (even if that page is a placeholder). This is sufficient for a pre-launch site. Flag to client that full legal copy is needed before public launch.

---

## Validation Architecture

Note: `.planning/config.json` has `"workflow": { "research": true, "plan_check": true, "verifier": true }` but no `nyquist_validation` key — this section is omitted per instructions.

---

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection of all 8 page files under `frontend/src/app/[locale]/`
- Direct inspection of all Phase 3 components: PAHComparisonChart, ComplianceMatrix, TechSpecGrid, TimelineSection, ContactSplit, ContactCards, WhatsAppFAB, BlogCard, BlogHero, CertBadgeRow
- `frontend/src/lib/directus.ts` — verified all existing data fetching functions
- `frontend/src/lib/types.ts` — verified all TypeScript types
- `frontend/src/messages/es.json` and `en.json` — verified all existing translation keys
- `frontend/src/app/[locale]/layout.tsx` — verified global layout structure (WhatsAppFAB placement)
- `frontend/src/middleware.ts` — verified geo-routing implementation
- `.planning/phases/04-page-assembly/04-CONTEXT.md` — user decisions
- `.planning/codebase/CONVENTIONS.md` — confirmed coding conventions

### Secondary (MEDIUM confidence)
- EUR-Lex URL for EU 2025/660: `https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R0660` — standard EUR-Lex URL pattern; verified format is correct for this regulation reference

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries inspected in actual package.json and import statements
- Architecture patterns: HIGH — derived from reading 20+ existing files in the codebase, not external documentation
- Pitfalls: HIGH — identified by comparing current page shells against CONTEXT decisions and finding specific mismatches
- Open questions: MEDIUM — require planner/executor decisions, not researchable facts

**Research date:** 2026-02-25
**Valid until:** This is a brownfield project with stable dependencies — findings are valid indefinitely until next code change.
