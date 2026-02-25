# Technology Stack — Enhancement Research

**Project:** Vivaz Clay Targets (platosvivaz.com)
**Research Type:** Brownfield enhancement — existing stack is locked
**Researched:** 2026-02-25
**Overall Confidence:** MEDIUM-HIGH (codebase directly inspected; external docs not reachable in this session)

---

## Existing Stack (DO NOT CHANGE)

The following is already installed and working. Every recommendation below adds to this, not replaces it.

| Technology | Version | Role |
|------------|---------|------|
| Next.js | 16.1.6 | Framework (App Router, SSR, static gen) |
| React | 19.2.3 | UI library |
| TypeScript | ^5 | Type safety (strict mode) |
| Tailwind CSS | ^4 (PostCSS) | Styling (CSS-first, `@theme inline` pattern) |
| framer-motion | ^12.34.0 | Animation (fully covers scroll, morph, spring) |
| lenis | ^1.3.17 | Smooth scroll |
| next-intl | ^4.1.0 | i18n (es/en/fr/de, localePrefix as-needed) |
| @directus/sdk | ^18.0.0 | CMS client (server-side static token) |
| clsx | ^2.1.1 | Conditional classNames |
| tailwind-merge | ^3.4.0 | Tailwind class merging |

---

## Gap Analysis

Codebase inspection identified these capability gaps against project requirements:

| Gap | Requirement Source | Current State | Priority |
|-----|-------------------|---------------|----------|
| HTML content sanitization | Product descriptions from Directus use `dangerouslySetInnerHTML` | No sanitizer installed | HIGH — security |
| Typography plugin | `prose prose-sm` classes used in ProductDetail but `@tailwindcss/typography` absent from package.json | Classes silently fail in v4 | HIGH — rendering |
| PDF data sheets | "Product technical data sheets and certificates accessible" | No PDF generation | MEDIUM |
| Structured data / JSON-LD | `productJsonLd()` referenced in conventions but not found in codebase | Missing implementation | MEDIUM — SEO |
| Cookie consent (GDPR) | EU site targeting European shooting clubs, federations, distributors | Nothing detected | MEDIUM — legal |
| Contact email notifications | TODO comment in contact API: "set up alert/email to admin" | No email service | MEDIUM |
| Analytics | No tracking service detected | Nothing configured | LOW |
| Hero video support | "hero video/landscape" in active requirements | Static image only | LOW (can use native `<video>`) |

---

## Recommended Additions

### 1. @tailwindcss/typography — CRITICAL (Missing, Already Used)

**Purpose:** Renders the `prose` utility classes used in `ProductDetail.tsx` for Directus HTML content (product descriptions, blog post body).

**Why:** `ProductDetail.tsx` line 95 applies `prose prose-sm` classes to `dangerouslySetInnerHTML` output. In Tailwind v4, these classes produce no styles without the plugin — blog posts and product descriptions render as unstyled text.

**Tailwind v4 compatibility:** The `@tailwindcss/typography` plugin was updated for v4. Installation uses `@plugin "@tailwindcss/typography"` directive in CSS rather than `plugins: []` in config. This is the breaking change from v3. (MEDIUM confidence — verified via training knowledge of Tailwind v4 plugin system; recommend confirming with official docs before install.)

```bash
npm install @tailwindcss/typography
```

```css
/* In globals.css — add after @import "tailwindcss" */
@plugin "@tailwindcss/typography";
```

**Customization needed:** The project's dark-on-cream aesthetic means default `prose` colors (gray scale) conflict with the brand palette. Override:

```css
@layer base {
  .prose {
    --tw-prose-body: var(--color-muted);
    --tw-prose-headings: var(--color-primary);
    --tw-prose-links: var(--color-accent);
    --tw-prose-bold: var(--color-foreground);
  }
}
```

**Confidence:** HIGH that plugin is needed; MEDIUM that v4 `@plugin` syntax is correct (verify before using).

---

### 2. isomorphic-dompurify — HIGH PRIORITY (Security)

**Purpose:** Sanitize HTML strings from Directus before `dangerouslySetInnerHTML`. Prevents XSS if CMS admin credentials are ever compromised or if a content editor inadvertently pastes malicious markup.

**Why this library vs alternatives:**
- `dompurify` alone works only in browser (window-dependent)
- `isomorphic-dompurify` wraps dompurify with a jsdom fallback for Node.js (SSR / RSC contexts)
- Works correctly in Next.js App Router where product detail pages render server-side

**Alternative considered:** `sanitize-html` — more configurable but heavier (~15KB vs ~5KB). isomorphic-dompurify is sufficient for standard HTML from a CMS.

```bash
npm install isomorphic-dompurify
```

**Usage pattern (replaces bare `dangerouslySetInnerHTML`):**

```typescript
import DOMPurify from "isomorphic-dompurify";

// In ProductDetail.tsx and blog post renderer:
<div
  className="prose prose-sm max-w-none font-body text-muted"
  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
/>
```

**Confidence:** HIGH — well-established pattern for Next.js SSR + Directus stacks.

---

### 3. @react-pdf/renderer — MEDIUM PRIORITY (Product Data Sheets)

**Purpose:** Generate downloadable PDF technical data sheets for NATURA and ECO STAR products (weight, diameter, PAH levels, logistics data, certifications, REACH compliance statement).

**Why:** PROJECT.md requirement: "Product technical data sheets and certificates accessible." PDFs are the standard format for B2B product documentation in the shooting sports industry. Distributors and club procurement officers expect PDF datasheets.

**Why @react-pdf/renderer vs alternatives:**
- `puppeteer` / `playwright` PDF — requires headless browser in Docker, adds ~300MB to image; overkill for static documents
- `jsPDF` — imperative canvas API, poor for layout-heavy documents with tables
- `@react-pdf/renderer` — React component model, handles tables/columns naturally, server-side compatible, produces clean PDFs

**Architecture:** Generate PDFs at build time (or on-demand) as a Next.js API route returning `application/pdf`. Products with stable data → static generation. Products with Directus-driven data → dynamic API route with cache headers.

**React 19 compatibility note:** As of my knowledge cutoff (Aug 2025), @react-pdf/renderer v3.x has documented React 18 peerDependency. React 19 compatibility requires validation — check the package's GitHub issues or npm changelog before installing. If React 19 peer conflict exists, use `--legacy-peer-deps` with caution and test rendering. (LOW-MEDIUM confidence on React 19 compatibility.)

```bash
npm install @react-pdf/renderer
```

**Pattern:**

```typescript
// src/app/api/products/[slug]/datasheet/route.ts
import { renderToStream } from "@react-pdf/renderer";
import ProductDataSheet from "@/components/pdf/ProductDataSheet";

export async function GET(req: Request, { params }) {
  const product = await getProductBySlug(params.slug);
  const stream = await renderToStream(<ProductDataSheet product={product} />);
  return new Response(stream as ReadableStream, {
    headers: { "Content-Type": "application/pdf" }
  });
}
```

**Confidence:** MEDIUM — library is well-established but React 19 peer dependency must be verified before committing to this approach. Alternative: generate PDFs at build time and store as static files in `/public/datasheets/`.

---

### 4. Structured Data (JSON-LD) — MEDIUM PRIORITY (SEO)

**Purpose:** Emit `Product`, `Organization`, and `BreadcrumbList` schema.org structured data for search engine rich results. Critical for a manufacturing company targeting B2B buyers who search for "clay targets EU 2026 compliant" or "ISSF clay targets supplier."

**Why no library needed:** Next.js 16 App Router supports JSON-LD via `<script type="application/ld+json">` in page components or in `generateMetadata`. No additional library required — this is pure JSON injection.

**Convention reference:** The codebase conventions mention `productJsonLd()` as an existing pattern but the implementation is not present in the codebase. It needs to be created, not installed.

**Implementation pattern:**

```typescript
// src/lib/schema.ts — add to existing lib structure
export function productSchema(product: Product, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description_short ?? "",
    "brand": { "@type": "Brand", "name": "Vivaz Clay Targets" },
    "manufacturer": {
      "@type": "Organization",
      "name": "Jesús y Vicente Vázquez S.L.",
      "url": "https://platosvivaz.com"
    },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "PAH Level", "value": product.pah_level },
      { "@type": "PropertyValue", "name": "Material", "value": product.material },
      ...(product.diameter_mm ? [{ "@type": "PropertyValue", "name": "Diameter", "value": `${product.diameter_mm} mm` }] : [])
    ]
  };
}

// In product page:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(product, locale)) }}
/>
```

**Confidence:** HIGH — Next.js pattern is well-documented and no React 19 compatibility issues.

---

### 5. Resend (or Nodemailer + SMTP) — MEDIUM PRIORITY (Contact Notifications)

**Purpose:** Send email notifications to admin when a contact form lead is submitted. Currently the contact API stores leads in Directus but has a TODO comment about email alerts — admin must manually check the CMS dashboard.

**Why Resend over Nodemailer:**
- Resend has a native Next.js / App Router SDK (`resend` npm package)
- Generous free tier (3,000 emails/month) — sufficient for a B2B contact form with low volume
- No SMTP server configuration needed in Docker stack
- Reliable deliverability (important for sales leads)

**Why not Nodemailer:**
- Requires SMTP credentials and configuration
- Deliverability issues without a transactional email service behind it
- More operational complexity in Docker environment

**Alternative:** If client already has a Google Workspace or Office 365 account, Nodemailer + SMTP is a valid lower-cost option but requires more setup.

```bash
npm install resend
```

**Pattern:**

```typescript
// src/app/api/contact/route.ts — add after Directus lead storage
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "leads@platosvivaz.com",
  to: "admin@platosvivaz.com",
  subject: `New lead: ${body.name} (${body.market})`,
  text: `Name: ${body.name}\nEmail: ${body.email}\nCompany: ${body.company}...`
});
```

**Confidence:** HIGH — Resend is stable, well-documented, and the pattern is straightforward.

---

### 6. Cookie Consent — MEDIUM PRIORITY (GDPR Compliance)

**Purpose:** EU law (GDPR + ePrivacy Directive) requires explicit cookie consent before setting non-essential cookies. Vivaz's target market is European shooting clubs and federations — GDPR compliance is expected by business customers.

**Recommendation:** `vanilla-cookieconsent` v3 with a thin React wrapper.

**Why vanilla-cookieconsent over alternatives:**
- `react-cookie-consent` — minimal, no granular categories, not GDPR-sufficient
- Cookiebot, OneTrust — paid SaaS, external script, adds 50-100ms to LCP
- `vanilla-cookieconsent` v3 — zero dependencies, ~6KB gzipped, supports granular categories (necessary/analytics/marketing), fully customizable CSS to match brand, active maintenance

**Note:** If no analytics or marketing cookies are used (no Google Analytics, no Meta Pixel), a simple banner informing users about essential-only cookies (no opt-in required) may be legally sufficient. Confirm with client whether analytics will be added.

```bash
npm install vanilla-cookieconsent
```

**Wrapper pattern:**

```typescript
// src/components/providers/CookieConsent.tsx
"use client";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import { useEffect } from "react";

export default function CookieConsentProvider() {
  useEffect(() => {
    CookieConsent.run({
      categories: { necessary: { enabled: true, readOnly: true } },
      language: { default: "en", translations: { en: { ... } } }
    });
  }, []);
  return null;
}
```

**Confidence:** MEDIUM — library choice is solid; legal sufficiency of implementation depends on what cookies the final site actually sets.

---

### 7. Plausible Analytics (Optional) — LOW PRIORITY

**Purpose:** Traffic analytics to understand which product pages, markets, and languages drive engagement. Useful for content optimization and measuring EU 2026 regulation page effectiveness.

**Recommendation:** Plausible Analytics over Google Analytics.

**Why Plausible:**
- GDPR-compliant by design — no cookies, no personal data collection, no consent banner required for analytics
- Script is ~1KB vs GA4's ~45KB
- Can be self-hosted on existing Docker infrastructure
- Simple dashboard sufficient for a corporate manufacturing site

**Why not Google Analytics 4:**
- Requires cookie consent (triggers GDPR banner complexity)
- Heavy client-side script impacts LCP
- Overkill for a B2B corporate site with limited page count

**Integration:** Single `<script>` tag in layout, or via `@next/third-parties` package (Next.js official integration helpers).

```bash
# Self-hosted Plausible: add to docker-compose.yml
# Or use cloud: add script tag to layout.tsx
```

**Confidence:** MEDIUM — Plausible's GDPR-compliance claims are well-established; self-hosting feasibility in existing Docker stack is HIGH.

---

## What NOT to Add

| Category | What to Avoid | Why |
|----------|--------------|-----|
| Animation | GSAP, anime.js, AOS | framer-motion 12.34 already covers all animation needs including scroll triggers, spring physics, layout morphs. Two animation libraries create conflicts and bloat. |
| Component library | shadcn/ui, Radix UI, MUI, Mantine | The project has a bespoke design system built from scratch with Tailwind v4. Adding a component library would fight the existing design and cause Tailwind config conflicts. |
| State management | Zustand, Redux, Jotai | This is a server-rendered corporate site. No complex client state. React `useState` is sufficient for form state and UI toggles. |
| ORM / database client | Prisma, Drizzle | Directus manages the database entirely. Direct DB access from Next.js would bypass CMS security and break the architecture. |
| Image slider | Swiper, Embla Carousel | Product range has only 2 product lines (NATURA, ECO STAR). A carousel would hide content and hurt conversion. Use grid layout with scroll instead. |
| i18n alternative | react-i18next, LinguiJS | next-intl is already installed and deeply integrated. Switching is a rewrite, not an enhancement. |
| Image CDN | Cloudinary, imgix | Directus image transformation (`assetUrl()` with width/format params) handles optimization server-side. The existing `directus-image-loader.ts` custom loader integrates with Next.js Image correctly. |
| Headless UI | Headless UI, Radix Primitives | The project builds all interactive components (navbar, forms, modals) from scratch with excellent TypeScript types. Introducing primitives now would require a migration. |
| Rich text editor | TipTap, Quill, Slate | Content editing happens in Directus CMS, not the frontend. The frontend only renders output. |

---

## Recommended Final Package.json Additions

```bash
# HIGH priority — fix active rendering bug
npm install @tailwindcss/typography

# HIGH priority — security
npm install isomorphic-dompurify
npm install --save-dev @types/dompurify

# MEDIUM priority — data sheets
npm install @react-pdf/renderer  # verify React 19 peer dep first

# MEDIUM priority — contact notifications
npm install resend

# MEDIUM priority — GDPR compliance
npm install vanilla-cookieconsent

# LOW priority — analytics (optional)
# Use Plausible cloud or self-hosted — no npm package needed
```

---

## Confidence Assessment

| Area | Confidence | Reason |
|------|------------|--------|
| Existing stack identification | HIGH | Directly read package.json and all source files |
| Gap analysis | HIGH | Codebase inspection — bugs and gaps are visible in source |
| @tailwindcss/typography need | HIGH | `prose` classes present in source, plugin absent from package.json |
| isomorphic-dompurify | HIGH | Standard Next.js SSR + CMS sanitization pattern |
| @tailwindcss/typography v4 syntax | MEDIUM | v4 plugin format changed to `@plugin` directive; verify before using |
| @react-pdf/renderer React 19 compat | LOW-MEDIUM | React 19 is recent; peer deps may flag conflict — must verify |
| Resend | HIGH | Stable, well-documented, Next.js native |
| Cookie consent legal sufficiency | MEDIUM | Depends on what cookies/scripts are ultimately deployed |
| Plausible GDPR claim | MEDIUM | Well-established but verify current EU DPA guidance |

---

## Sources

- Directly inspected: `frontend/package.json`, `frontend/src/**/*.tsx`, `frontend/src/app/globals.css`, `.planning/PROJECT.md`, `.planning/codebase/STACK.md`
- Training knowledge (cutoff Aug 2025): Tailwind v4 plugin system, Next.js App Router JSON-LD patterns, @react-pdf/renderer architecture, Resend API, GDPR cookie consent requirements
- Cannot verify: npm current versions, @react-pdf/renderer React 19 peer compatibility — recommend `npm info @react-pdf/renderer peerDependencies` before installing
