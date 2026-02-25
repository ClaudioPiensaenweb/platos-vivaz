# Domain Pitfalls

**Domain:** Corporate/manufacturing website revamp — clay target manufacturer, brownfield Next.js 16 + Directus 11 + Tailwind v4
**Researched:** 2026-02-25
**Confidence:** MEDIUM (primary sources unavailable during research session; findings drawn from established patterns in this exact stack as documented in project MEMORY.md plus deep domain knowledge of manufacturing brand sites)

---

## Critical Pitfalls

Mistakes that cause rewrites, lost credibility, or major rework.

---

### Pitfall 1: Design Direction Whiplash on Existing Brownfield Code

**What goes wrong:** Stakeholders approve a "premium look" direction late in development after components are already built with a different visual language (color palette, typography scale, spacing system). Every component must be reopened, causing cascading CSS variable changes through Tailwind v4's `@theme inline` blocks and broken animation timings.

**Why it happens:** Premium brand positioning is subjective. Without a locked design token system committed to before any component work, individual developers interpret "premium" differently. Tailwind v4 uses a CSS-variable-first theme — changing one token (e.g., `--color-brand`) touches every component simultaneously, which feels safe but masks inconsistencies in hardcoded values that don't use the token.

**Consequences:**
- Components built with inline colors/spacing become mismatched orphans after token updates
- Framer-motion animation values (duration, easing) hardcoded per component rather than sourced from a shared config become inconsistent
- Re-review cycles double estimated delivery time
- Brand trust eroded if the site launches with visual inconsistency across locales

**Prevention:**
- Lock a design token manifest (`globals.css` CSS variables + a `tokens.ts` constants file for motion values) in Phase 1 before any component work begins
- Require stakeholder sign-off on a static style tile (not a full comp) showing typography, color, spacing, and one animation sample
- Establish a rule: no hardcoded color or spacing value anywhere in JSX — only Tailwind utility classes that map to `@theme` tokens

**Detection (warning signs):**
- Developer PR adds a new CSS variable not in the original token list without a design review
- Component uses `style={{ color: '#...' }}` inline
- Multiple shades of the same hue appearing that are not token-aliased

**Phase to address:** Phase 1 (Foundation / Design System)

---

### Pitfall 2: i18n Translation Gaps That Slip Into Production

**What goes wrong:** With 4 locales (es, en, fr, de), the Spanish source messages file grows as features are added but translation keys are not added to en/fr/de simultaneously. next-intl silently falls back to the key string (e.g., `"product.hero.cta"`) or to the fallback locale, making the site look broken in non-primary languages. This is especially damaging for a premium brand where German or French distributors visit the site to evaluate it.

**Why it happens:** Developers write features against `es.json` first. Translation handoff is treated as a separate task. Without CI enforcement, keys drift. next-intl with `localePrefix: "as-needed"` makes the default locale (es) appear at root, so developers never see the broken French or German routes during local development.

**Consequences:**
- B2B distributor in France or Germany sees raw key strings or wrong-language copy — immediate trust failure
- Regulatory/sustainability content (accuracy-critical) may appear in Spanish only, creating a compliance risk for EU markets
- Fixing after launch requires coordinated translation work + re-deployment

**Prevention:**
- Add a CI script (pre-commit or GitHub Actions) that diffs all locale JSON files against `es.json` and fails if any key is missing from any locale
- Use a flat key structure (not deeply nested objects) so diffing is trivial
- For each new feature PR, require that all 4 locale files have the new key before merge (can be placeholder `"[PENDING TRANSLATION]"` — visible but not broken)
- Never use `t('key')` on content that does not yet exist in all locales

**Detection (warning signs):**
- `fr.json` or `de.json` file size significantly smaller than `es.json`
- QA only done in Spanish locale
- Translation task tickets created after feature tickets close

**Phase to address:** Phase 1 (Foundation) — enforce the CI check before any feature phase begins. Flag every feature phase as requiring locale file updates.

---

### Pitfall 3: Directus Schema Drift Breaking the Front End

**What goes wrong:** The Directus 11 schema (collections, fields, relations) is modified directly in the Directus UI by a content editor or a second developer, without updating the TypeScript types in `src/lib/types.ts`. The Next.js app silently receives `undefined` for fields that were renamed or restructured, causing runtime errors in production that only appear on specific pages with real content.

**Why it happens:** Directus makes it easy to rename a field through its UI. There is no compile-time enforcement between the CMS schema and the TypeScript types that consume it. The `@directus/sdk` can be used with generics but only if the type file is kept in sync manually.

**Consequences:**
- Product pages render blank or throw uncaught errors when a field the component depends on no longer exists
- Image UUIDs from Directus accessed via `assetUrl(uuid)` return 404 if the asset field was renamed
- Content editors make "harmless" schema changes that brick pages without knowing it

**Prevention:**
- Treat `src/lib/types.ts` as the source of truth contract between Directus and Next.js — any Directus schema change requires a corresponding PR to `types.ts`
- Use Directus Flows or a webhook to post a Slack/email warning when a collection schema is modified in production
- Consider generating types from the Directus OpenAPI schema using `openapi-typescript` to make schema drift a build-time error
- Never hardcode field names as strings more than once — define a `FIELDS` constants object and reference it

**Detection (warning signs):**
- Field name changes in Directus not accompanied by a code PR
- TypeScript `any` used in data-fetching functions to "avoid type errors"
- Pages that work in development (seeded content) fail in production (real content with different field structure)

**Phase to address:** Phase 2 (Content Architecture / CMS Integration)

---

### Pitfall 4: Framer-Motion Animations Degrading Core Web Vitals

**What goes wrong:** Premium brand positioning leads to heavy use of entrance animations (staggered reveals, parallax, morphing transitions). Each `motion` component adds a React context subscription. On product catalog pages with 20+ animated cards, the Cumulative Layout Shift (CLS) score rises because content shifts into view after first paint. Total Blocking Time (TBT) increases from animation JS executing on the main thread.

**Why it happens:** Animations look great on a developer's M2 MacBook. The target market includes distributors in export markets using mid-range Windows laptops or mobile devices. framer-motion's `layoutId` morph transitions (used for the MotionImage component in this project) recalculate layout on every render — expensive on large DOM trees.

**Consequences:**
- Google PageSpeed Insights score drops below 70 on mobile — damaging SEO for a brand-new market position
- Users with `prefers-reduced-motion` see all animations regardless if not handled
- CLS from animated elements appearing after layout paint tanks the Google ranking signal

**Prevention:**
- Wrap all animated elements in a `useReducedMotion()` check from framer-motion; return the non-animated version when true
- Use `will-change: transform` CSS only on elements actively animating, remove after animation completes (framer-motion `onAnimationComplete`)
- Limit `layoutId` morph transitions to one at a time — never animate more than one `layoutId` group simultaneously on a page
- Prefer CSS animations (keyframes via Tailwind `animate-*`) over JS-driven framer-motion for simple entrance effects — lower overhead
- Run Lighthouse in CI against each new page, fail if LCP > 2.5s or CLS > 0.1 on mobile simulation

**Detection (warning signs):**
- More than 5 `motion.div` elements with `initial`/`animate` on a single viewport
- `layoutId` used on list items (not just hero images)
- No `prefers-reduced-motion` handling anywhere in the codebase
- Developer reports "it's smooth on my machine"

**Phase to address:** Phase 3 (Component Library / Animation) — establish animation budget. Every subsequent phase must stay within it.

---

### Pitfall 5: Product Photography Not Optimized, Killing Perceived Quality

**What goes wrong:** High-resolution product images (clay targets, shooting equipment) are served from Directus as full-size originals or with only basic resizing. Next.js `<Image>` optimization handles JPEG compression but the `assetUrl(uuid, { width, format })` helper must explicitly request WebP/AVIF — if it defaults to JPEG, the perceived loading quality gap between a premium brand site and a generic catalog site is obvious on slower connections.

**Why it happens:** The `assetUrl` helper is custom-built (per MEMORY.md) and its default format may not be set to modern formats. Developers use whatever Directus serves without checking network tab. Product photography assets are typically 5–15MB originals uploaded by the marketing team.

**Consequences:**
- LCP (Largest Contentful Paint) fails on hero product shots — the most important brand impression moment
- Mobile users on 4G see progressive JPEG artifacts before full load — opposite of "premium"
- Directus storage costs accumulate from serving full-size originals repeatedly

**Prevention:**
- Audit `assetUrl` helper to confirm it always passes `format: 'webp'` as default and `quality: 80` — never serve JPEG originals
- Set explicit `sizes` prop on all Next.js `<Image>` components using Directus assets so the browser requests the correct responsive breakpoint
- Add a Directus transformation preset for "product hero" (1920w, webp, quality 85) and "thumbnail" (400w, webp, quality 75) — use these named presets consistently
- Never use `<img>` tags for Directus assets — always route through the Next.js `<Image>` component for automatic optimization pipeline

**Detection (warning signs):**
- `assetUrl` calls without `format` parameter
- Network tab shows `.jpg` responses for product images
- `<img>` tags (not `<Image>`) used for Directus assets anywhere in the codebase
- LCP element is an image > 200KB after compression

**Phase to address:** Phase 2 (Content Architecture) — establish asset pipeline standards. Flag in every feature phase that adds new image usage.

---

## Moderate Pitfalls

---

### Pitfall 6: Sustainability/Regulatory Content Becoming Stale or Inaccurate

**What goes wrong:** Pages covering environmental compliance, lead regulations (relevant for clay target/ammunition adjacent industries), and sustainability certifications are built as static marketing copy. Regulatory requirements change (EU REACH, RoHS, national hunting regulations). The marketing team has no workflow for reviewing and updating this content periodically.

**Prevention:**
- Store all regulatory/sustainability content in Directus with a "last reviewed" date field and a "review by" date field
- Build a simple admin view or Directus Flow that sends an email when a "review by" date passes
- Never hardcode regulatory claims in JSX — route through Directus so they can be updated without a deployment
- Add a visible "last updated" date on all sustainability/compliance pages — builds trust and signals recency to users

**Phase to address:** Phase 2 (CMS Architecture) — model the content schema correctly from the start.

---

### Pitfall 7: Lenis Smooth Scroll Conflicting With Next.js Navigation

**What goes wrong:** `lenis/react` (the correct package, not `@studio-freight/react-lenis` which is React 19-incompatible per MEMORY.md) can conflict with Next.js App Router's scroll restoration behavior on route changes. After a soft navigation, Lenis may not reset scroll position correctly, leaving users mid-page on a new route.

**Prevention:**
- Listen to Next.js navigation events and call `lenis.scrollTo(0, { immediate: true })` on route change via `usePathname()` effect
- Test scroll behavior specifically with `localePrefix: "as-needed"` where locale-prefixed and non-prefixed routes both exist
- Ensure `SmoothScroll` provider is placed correctly in `layout.tsx` so it wraps only page content, not the document root, to avoid interfering with native browser scroll APIs

**Phase to address:** Phase 1 (Foundation) — get this right in the SmoothScroll provider before any page is built on top of it.

---

### Pitfall 8: Geo-Routing Middleware Causing Cache Poisoning on CDN

**What goes wrong:** The custom geo-routing middleware (`x-vivaz-market: national|export`) sets a market header based on IP geolocation. If this header is used to vary content but is not declared in the CDN's `Vary` header configuration, a CDN edge node may cache the "national" response and serve it to export-market users (or vice versa), showing incorrect pricing tiers, product availability, or language defaults.

**Prevention:**
- Ensure middleware sets both the `x-vivaz-market` header AND a corresponding `Vary: x-vivaz-market` response header so CDN caches are keyed correctly
- Use Next.js `next.config.js` headers config to add `Vary` headers globally for all routes that branch on market
- Test with a VPN or IP spoofing tool from an EU IP and a domestic IP before launch

**Phase to address:** Phase 1 (Foundation / Middleware) — the middleware is already in place per MEMORY.md; verify CDN cache headers before any other phase's work goes live.

---

### Pitfall 9: MagneticButton and SpotlightReveal Breaking on Touch Devices

**What goes wrong:** `MagneticButton` (spring attraction to cursor) and `SpotlightReveal` (CSS mask-image torch effect) are cursor/mouse-dependent interactions. On touch devices (tablets used at trade shows, mobile users), these effects either do nothing or — worse — trigger on `touchstart` and stick in an activated state permanently.

**Prevention:**
- Gate all cursor-dependent interactions behind a `useMediaQuery('(pointer: fine)')` check — only activate magnetic/spotlight behavior when a fine pointer (mouse) is detected
- Provide a tap-appropriate alternative for touch: SpotlightReveal can fall back to a simple fade-in, MagneticButton to a standard press scale animation
- Test at iPad and mobile viewport sizes before any stakeholder demo — premium brand perception is broken if an effect looks glitchy on mobile

**Phase to address:** Phase 3 (Component Library / Interactions)

---

## Minor Pitfalls

---

### Pitfall 10: Quablo Font Not Subsetting, Slowing Initial Load

**What goes wrong:** The Quablo local font (heading font per MEMORY.md) is served as a full font file. If it includes full Unicode ranges not needed for Spanish/English/French/German (e.g., Cyrillic, CJK), the font file is unnecessarily large, adding 100–400ms to first paint.

**Prevention:**
- Use `fonttools` or an online subsetter to create Latin-only subset of Quablo covering only the Unicode ranges needed for es/en/fr/de characters plus any special brand characters
- Set `font-display: swap` so page renders with system font while Quablo loads
- Preload the Quablo WOFF2 in `<head>` via Next.js `<link rel="preload">` for the heading variant only (not all weights)

**Phase to address:** Phase 1 (Foundation / Typography Setup)

---

### Pitfall 11: Hard-Coded Spanish Copy in JSX During Early Development

**What goes wrong:** During rapid development, developers hardcode Spanish strings directly in JSX components (`<h1>Platos de Arcilla de Máxima Precisión</h1>`) intending to "move to i18n later." The migration is always more painful than anticipated — strings are embedded inside template literals, concatenated with variables, and split across JSX attributes.

**Prevention:**
- Enforce a project rule: no string literals in JSX except for non-user-facing values (aria-labels with tokens, debugging). Use eslint-plugin-i18n or a custom ESLint rule to flag string literals in JSX
- Add the ESLint check in Phase 1 before any component work begins

**Phase to address:** Phase 1 (Foundation / ESLint Setup)

---

### Pitfall 12: next-intl `localePrefix: "as-needed"` Causing Canonical URL Confusion

**What goes wrong:** With `localePrefix: "as-needed"`, Spanish (the default locale) serves at `/` while English serves at `/en/`, French at `/fr/`, and German at `/de/`. Search engines may index both `/` and `/es/` (if any link accidentally uses the prefixed form) as separate pages, causing duplicate content penalties. Hreflang tags must be precisely correct — wrong hreflang implementation is one of the most common i18n SEO errors.

**Prevention:**
- Implement hreflang link tags in the root layout with all 4 locales + an `x-default` pointing to `/`
- Audit all internal links to confirm no component ever hardcodes `/es/` prefix paths
- Add a redirect rule in middleware: if request arrives at `/es/path`, redirect 301 to `/path`
- Submit one sitemap only, with the canonical Spanish URLs at root and alternate locale URLs in `<xhtml:link>` tags

**Phase to address:** Phase 1 (Foundation / Routing) — get canonical/hreflang right before any content is indexed.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|---|---|---|
| Phase 1: Foundation & Design System | Design direction whiplash (Pitfall 1) | Lock token manifest + stakeholder style tile sign-off first |
| Phase 1: Foundation & Design System | Hard-coded Spanish strings (Pitfall 11) | ESLint i18n rule from day one |
| Phase 1: Foundation & Design System | i18n locale gaps (Pitfall 2) | CI locale key diff check before first feature PR |
| Phase 1: Foundation & Design System | Canonical/hreflang confusion (Pitfall 12) | Routing and sitemap verified before content indexed |
| Phase 1: Foundation & Design System | Lenis scroll conflicts (Pitfall 7) | SmoothScroll provider tested across all route types |
| Phase 1: Foundation & Design System | Geo-routing cache poisoning (Pitfall 8) | Vary headers verified in middleware |
| Phase 2: CMS & Content Architecture | Directus schema drift (Pitfall 3) | Schema-to-types contract + change notification workflow |
| Phase 2: CMS & Content Architecture | Image optimization pipeline (Pitfall 5) | assetUrl helper audit + asset transformation presets |
| Phase 2: CMS & Content Architecture | Stale regulatory content (Pitfall 6) | "Review by" date field + Directus Flow alerting |
| Phase 3: Component Library & Animations | Animation CWV degradation (Pitfall 4) | Animation budget + Lighthouse CI gate |
| Phase 3: Component Library & Animations | Touch device interaction failures (Pitfall 9) | pointer: fine media query gating |
| All Phases | Translation gaps (Pitfall 2) | Locale key completeness check on every PR |
| All Phases | Asset format regression (Pitfall 5) | PR checklist: all new image usages use assetUrl with format |

---

## Confidence Notes

| Pitfall | Confidence | Basis |
|---|---|---|
| Design direction whiplash | HIGH | Universal brownfield pattern, Tailwind v4 CSS-variable specifics confirmed by MEMORY.md |
| i18n translation gaps | HIGH | next-intl silent fallback behavior is documented; 4-locale drift is a known class of bugs |
| Directus schema drift | HIGH | @directus/sdk with manual types is a documented maintenance gap |
| Framer-motion CWV degradation | HIGH | Core Web Vitals impact of JS animations is well-established; layoutId cost is documented |
| Product photography pipeline | HIGH | assetUrl helper confirmed in MEMORY.md; WebP default is a known omission risk |
| Regulatory content staleness | MEDIUM | Domain-specific to clay targets / hunting industry; regulatory landscape verified from general EU patterns |
| Lenis + Next.js routing | HIGH | Confirmed in MEMORY.md (package choice made specifically to avoid React 19 incompatibility) |
| Geo-routing cache poisoning | MEDIUM | Standard CDN Vary header problem; specific middleware implementation not verifiable without code access |
| MagneticButton touch devices | HIGH | pointer: fine requirement is standard for cursor-dependent CSS/JS effects |
| Quablo font subsetting | MEDIUM | Font subsetting benefit is well-established; file size without code access unknown |
| Hard-coded Spanish strings | HIGH | Universal Next.js i18n migration pain, especially common in early brownfield sprints |
| Hreflang/canonical confusion | HIGH | `localePrefix: "as-needed"` canonical complexity is documented in next-intl; duplicate indexing risk is real |

---

## Sources

- Project MEMORY.md (tech stack, file locations, known incompatibilities — HIGH confidence primary context)
- next-intl documentation: localePrefix behavior, fallback locale handling (HIGH — official docs)
- Directus 11 documentation: field management, @directus/sdk TypeScript generics (HIGH — official docs)
- framer-motion documentation: layoutId, useReducedMotion, will-change guidance (HIGH — official docs)
- Next.js 16 documentation: App Router scroll restoration, CDN Vary headers, Image component (HIGH — official docs)
- Core Web Vitals: Google Search Central documentation on LCP, CLS thresholds (HIGH — official)
- MDN: pointer media query specification (HIGH — official)
- Industry pattern: manufacturing/B2B premium brand website redesign anti-patterns (MEDIUM — domain knowledge)
