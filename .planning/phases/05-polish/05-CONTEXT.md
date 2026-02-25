# Phase 5: Polish - Context

**Gathered:** 2026-02-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Site passes quality bar for launch — Core Web Vitals green on all pages, final i18n audit complete, sitemap/hreflang verified, no orphaned translation keys in any locale. This is a QA/optimization phase — no new features, only hardening what Phases 1-4 built.

</domain>

<decisions>
## Implementation Decisions

### Performance Budget
- Keep all framer-motion animations — they are the brand differentiator. Optimize around them: defer non-critical animations, use will-change hints, ensure they don't block LCP
- Image strategy: mark hero/above-fold images as `priority={true}`, all below-fold images as `loading="lazy"`. Add explicit width/height to prevent CLS
- Audit approach: run `next build` to check bundle sizes, then manual Lighthouse audit on 5 key pages (home, NATURA product, regulation, technology, contact) in Spanish locale
- Other locales share the same components/layout — locale-specific issues unlikely given shared rendering paths

### Meta & SEO Strategy
- Meta titles via template pattern in locale files: `[Page Topic] | Vivaz Clay Targets` — each page gets a unique translated key (e.g., `meta.home.title`, `meta.products.natura.title`) in all 4 locales
- Meta descriptions: unique per page per locale, stored in locale message files alongside titles
- Open Graph: one shared brand OG image (1200x630, Vivaz logo + product shot) for all pages — simple, consistent, professional
- Sitemap: use next-intl's built-in sitemap generation with getPathnames() to auto-generate correct hreflang alternates — handles `localePrefix: "as-needed"` natively (es = no prefix, en/fr/de get prefix)
- Structured data: keep current scope (product JSON-LD already done in Phase 2) — no additional schemas

### Mobile QA Scope
- Test at two breakpoints: 375px (iPhone SE) and 768px (iPad) — desktop is already the primary design target
- ComplianceMatrix: keep existing overflow-x-auto horizontal scroll on mobile
- PAH chart: bars reduce width or stack vertically on narrow viewports — minimal changes from Phase 3 implementation
- Contact form: verify inputs are full-width on mobile, touch targets 44px+, Nacional/Internacional cards stack cleanly
- Typography: audit Quablo headings on hero sections and page titles at 375px — fix with responsive text classes (`text-3xl md:text-5xl` pattern) if any overflow or disproportion found
- FormatTabs: verify horizontal scroll works cleanly on mobile without clipping

### Claude's Discretion
- Exact Lighthouse optimization techniques (font-display, preconnect hints, etc.)
- Whether to add `fetchpriority="high"` or rely on Next.js `priority` prop
- Specific responsive text size values for heading adjustments
- Sitemap generation implementation details (route vs app directory approach)
- Bundle analysis tool choice (built-in Next.js analyzer vs @next/bundle-analyzer)

</decisions>

<specifics>
## Specific Ideas

- The 5 key audit pages (home, NATURA product, regulation, technology, contact) cover all component types — hero images, data viz, forms, rich text, animations
- German locale may have longer words that break layouts — worth a quick check on headings
- The PAH chart animation is scroll-triggered (IntersectionObserver) so it shouldn't impact initial LCP
- Current assetUrl() already requests WebP with dimensions — the priority/lazy audit is about the Next.js `<Image>` component props, not the Directus pipeline

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-polish*
*Context gathered: 2026-02-25*
