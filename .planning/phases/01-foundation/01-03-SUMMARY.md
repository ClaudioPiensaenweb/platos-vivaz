---
phase: 01-foundation
plan: 03
subsystem: i18n
tags: [next-intl, translations, hreflang, sitemap, i18n]

# Dependency graph
requires:
  - phase: 01-foundation-plan-02
    provides: RegulationContent.tsx with 16 regulation keys already in all locale files

provides:
  - Complete locale files with identical key structures across all 4 languages
  - Zero hardcoded user-visible strings in any page component
  - Correct hreflang/canonical URLs for localePrefix as-needed configuration
  - Sitemap with proper no-prefix Spanish URLs and x-default alternates

affects: [SEO, hreflang, sitemap, contacto page, productos page, all locale routes]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "localePrefix as-needed canonical: Spanish pages get no locale prefix, en/fr/de get /locale/ prefix"
    - "x-default hreflang: always points to root Spanish URL (the default locale)"
    - "localeUrl() helper: centralizes locale-aware URL generation in sitemap"

key-files:
  created: []
  modified:
    - frontend/src/messages/es.json
    - frontend/src/messages/en.json
    - frontend/src/messages/fr.json
    - frontend/src/messages/de.json
    - frontend/src/app/[locale]/contacto/page.tsx
    - frontend/src/app/[locale]/productos/page.tsx
    - frontend/src/app/[locale]/layout.tsx
    - frontend/src/app/sitemap.ts

key-decisions:
  - "Added products.heroSubtitle key (brand name VIVAZ Clay Targets) to all 4 locales — keeps zero hardcoded strings rule consistent even for brand name literals"
  - "Sitemap uses single entry per page (canonical = Spanish no-prefix URL) with alternates for all 4 locales — matches Next.js sitemap API pattern"
  - "x-default hreflang added to both layout metadata and sitemap entries — points to root Spanish URL per Google i18n best practice"

# Metrics
duration: 8min
completed: 2026-02-25
---

# Phase 1 Plan 03: i18n Completion Summary

**Complete locale file parity across all 4 languages (es/en/fr/de); zero hardcoded user-visible strings in any page component; hreflang and canonical URLs corrected for localePrefix: "as-needed" configuration.**

## Performance

- **Duration:** 8 min
- **Started:** 2026-02-25T10:37:00Z
- **Completed:** 2026-02-25T10:45:13Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Added 10 missing `contact` namespace keys to all 4 locale files: `heroSubtitle`, `talkTitle`, `talkDesc`, `location`, `locationValue`, `statsYears`, `statsPioneer`, `statsPah`, `statsReach`
- Added `products.heroSubtitle` and `products.emptyState` keys to all 4 locale files
- Replaced 8 hardcoded Spanish strings in `contacto/page.tsx` with `t()` calls
- Replaced hardcoded subtitle and empty state string in `productos/page.tsx` with `t()` calls
- All 4 locale files now have identical key structures (verified by automated parity check: "ALL KEYS MATCH")
- Fixed `sitemap.ts`: Spanish URLs now correctly use no-prefix pattern (`/productos` not `/es/productos`); added `localeUrl()` helper; added `x-default` alternates to all entries
- Added `alternates` with correct `canonical` and `languages` (including `x-default`) to `layout.tsx` `generateMetadata`
- Build passes: all 34 static pages generated, zero TypeScript errors

## Task Commits

1. **Task 1: Add missing translation keys and replace all hardcoded strings** - `a959fcf` (feat)
2. **Task 2: Fix hreflang tags and canonical URLs for localePrefix as-needed** - `aead006` (feat)

## Files Created/Modified

- `frontend/src/messages/es.json` - Added 12 new keys (contact: heroSubtitle, talkTitle, talkDesc, location, locationValue, statsYears, statsPioneer, statsPah, statsReach; products: heroSubtitle, emptyState + existing regulation keys already present)
- `frontend/src/messages/en.json` - Same 12 new keys with English translations
- `frontend/src/messages/fr.json` - Same 12 new keys with French translations (including proper diacritics: résine, expérience, Emplacement, Espagne, etc.)
- `frontend/src/messages/de.json` - Same 12 new keys with German translations (including umlauts: Standort, Spanien, Erfahrung, REACH-konform, etc.)
- `frontend/src/app/[locale]/contacto/page.tsx` - 8 hardcoded strings replaced: subtitle → t("heroSubtitle"), "Hablemos" → t("talkTitle"), description → t("talkDesc"), "Ubicación" → t("location"), "España" → t("locationValue"), 4 stats labels → t() calls
- `frontend/src/app/[locale]/productos/page.tsx` - 2 hardcoded strings replaced: subtitle → t("heroSubtitle"), empty state → t("emptyState")
- `frontend/src/app/[locale]/layout.tsx` - Added `alternates` to `generateMetadata`: canonical URL (no prefix for es, /locale/ for others), hreflang languages for all 4 locales, x-default pointing to root Spanish URL
- `frontend/src/app/sitemap.ts` - Added `localeUrl()` helper; fixed Spanish URLs to use no-prefix pattern; added x-default to all entries (static pages, products, blog posts)

## Decisions Made

- **products.heroSubtitle added** — "VIVAZ Clay Targets" is a brand name used identically in all locales, but keeping zero hardcoded strings rule consistent is better than making an exception. The key is set to "VIVAZ Clay Targets" in all 4 locales.
- **Single sitemap entry per page** — One entry per page with the Spanish (no-prefix) URL as canonical, and all 4 locale alternates in the `alternates.languages` object. This is the Next.js Metadata API pattern.
- **x-default in both layout and sitemap** — Added to layout metadata and sitemap per Google's hreflang best practice guidance.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing functionality] Added products.heroSubtitle to locale files**
- **Found during:** Task 1 Part D
- **Issue:** `productos/page.tsx` had `subtitle="VIVAZ Clay Targets"` hardcoded — the plan only mentioned replacing the emptyState string but the subtitle was also hardcoded
- **Fix:** Added `products.heroSubtitle` key to all 4 locale files and updated the productos page to use `t("heroSubtitle")`
- **Files modified:** All 4 locale files, `productos/page.tsx`
- **Commit:** a959fcf

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All 4 locale files have identical key structures — Phase 2 CMS integration can add new namespaces following the same pattern
- Zero hardcoded strings in any page component — new content can be added exclusively through locale files
- Correct hreflang and canonical URLs — SEO is properly configured for multi-locale deployment

---
*Phase: 01-foundation*
*Completed: 2026-02-25*

## Self-Check: PASSED

- FOUND: `frontend/src/messages/es.json`
- FOUND: `frontend/src/messages/en.json`
- FOUND: `frontend/src/messages/fr.json`
- FOUND: `frontend/src/messages/de.json`
- FOUND: `frontend/src/app/[locale]/contacto/page.tsx`
- FOUND: `frontend/src/app/[locale]/productos/page.tsx`
- FOUND: `frontend/src/app/[locale]/layout.tsx`
- FOUND: `frontend/src/app/sitemap.ts`
- FOUND: `.planning/phases/01-foundation/01-03-SUMMARY.md`
- FOUND: commit `a959fcf` (Task 1: translation keys)
- FOUND: commit `aead006` (Task 2: hreflang/sitemap)
