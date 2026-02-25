---
phase: 02-cms-data
plan: 02
subsystem: frontend-data
tags: [image-pipeline, webp, email, resend, json-ld, structured-data, typescript]
dependency_graph:
  requires: []
  provides:
    - assetUrl-webp-default
    - IMG_PRESETS-constants
    - resend-email-integration
    - product-json-ld-rich-results
  affects:
    - frontend/src/lib/directus.ts
    - frontend/src/lib/types.ts
    - frontend/src/lib/json-ld.ts
    - frontend/src/lib/email-templates.ts
    - frontend/src/app/api/contact/route.ts
    - frontend/src/components/product/ProductCard.tsx
    - frontend/src/components/product/ProductDetail.tsx
tech_stack:
  added:
    - resend@latest (transactional email)
  patterns:
    - WebP-by-default image pipeline via assetUrl() defaults
    - Graceful degradation (null-checked Resend client)
    - Non-blocking email (try/catch wrapping email calls)
    - Google rich results via Schema.org offers + additionalProperty
key_files:
  created:
    - frontend/src/lib/email-templates.ts
  modified:
    - frontend/src/lib/directus.ts
    - frontend/src/lib/types.ts
    - frontend/src/lib/json-ld.ts
    - frontend/src/app/api/contact/route.ts
    - frontend/src/components/product/ProductCard.tsx
    - frontend/src/components/product/ProductDetail.tsx
    - .env.example
decisions:
  - "assetUrl() enforces format=webp and quality=80 as ALWAYS-set defaults — callers override with explicit params"
  - "IMG_PRESETS uses 600 for card (not 400) — larger size for sharper display on retina screens"
  - "Resend client is null if RESEND_API_KEY missing — contact form degrades gracefully without email"
  - "Email errors caught in nested try/catch — form submission success is never blocked by email failure"
  - "onboarding@resend.dev used as default from address — works without DNS verification in dev/staging"
  - "productJsonLd locale prefix: Spanish uses empty string (as-needed pattern), other locales use /locale/ prefix"
metrics:
  duration_min: 3
  completed_date: "2026-02-25"
  tasks_completed: 3
  files_modified: 7
  files_created: 1
---

# Phase 02 Plan 02: Frontend Data Pipeline Summary

**One-liner:** WebP-by-default image pipeline via assetUrl() defaults, Resend dual-email contact form, and Google-rich-results-eligible productJsonLd() with offers + additionalProperty.

## What Was Built

### Task 1: assetUrl() Upgrade + IMG_PRESETS + Type Updates

Rewrote `assetUrl()` in `frontend/src/lib/directus.ts` to enforce `format=webp` and `quality=80` as always-set defaults using the nullish coalescing operator (`?? "webp"`, `?? 80`). Added a new `fit` parameter for cover/contain support.

Added `IMG_PRESETS` constant before the function:
```typescript
export const IMG_PRESETS = {
  thumbnail: 200,
  card: 600,
  hero: 1200,
} as const;
```

Updated callsites:
- `ProductCard.tsx`: `width: 400, format: "webp"` → `width: IMG_PRESETS.card`
- `ProductDetail.tsx`: `width: 600, format: "webp"` → `width: IMG_PRESETS.card`

Updated `types.ts`:
- `Product` interface: added `height_mm`, `resin_pct`, `issf_approved`, `disciplines` fields
- `BrandData` interface: added `catalog_pdf`, `founded_year`, `address` fields

### Task 2: Resend Email Integration

Installed `resend` package. Created `frontend/src/lib/email-templates.ts` with two exported functions returning inline-styled HTML:
- `generateAdminEmail()`: table layout showing all form fields with header/footer
- `generateUserEmail()`: confirmation email with contact info for national and export

Updated `frontend/src/app/api/contact/route.ts`:
- Imports `Resend` and template generators
- Module-level null-checked Resend client (graceful degradation)
- After successful `createItem()`, sends both emails via `Promise.all()`
- Email calls wrapped in nested try/catch — failures logged but never propagate
- Uses `onboarding@resend.dev` as default from address (works without domain verification)

Updated `.env.example` with `RESEND_API_KEY`, `ADMIN_EMAIL`, `RESEND_FROM_EMAIL`.

### Task 3: productJsonLd() Rich Results Augmentation

Rewrote `frontend/src/lib/json-ld.ts`:
- Removed hardcoded `DIRECTUS_URL` constant
- Imported `assetUrl` from `./directus` — image URL now gets WebP default automatically
- Fixed locale prefix: Spanish uses `""` (empty, as-needed pattern), others use `/locale/` prefix
- Added `offers` object (required for Google Product rich results eligibility)
- Added `manufacturer.url` to Organization reference
- Extended `additionalProperty` array with `weight_g`, `height_mm`, `resin_pct` in addition to existing `pah_level` and `diameter_mm`

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| `format` and `quality` are ALWAYS set (not conditional) | Ensures consistent WebP delivery regardless of caller intent |
| IMG_PRESETS.card = 600 (was 400 in ProductCard) | Retina screens need 2x pixels; 600px at 80% quality is still ~50KB |
| Resend null-check at module level | Avoids repeated env var checks; form works in environments without email config |
| Email in nested try/catch (not outer catch) | Outer catch returns `{ success: true, fallback: true }` — we want `{ success: true }` when lead saved successfully |
| `onboarding@resend.dev` default from address | Resend's test domain that works without SPF/DKIM setup; production switches to `noreply@platosvivaz.com` |
| Spanish locale prefix = empty string | Matches `localePrefix: "as-needed"` — Spanish URLs have no /es/ prefix |

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

### Files Exist
- [x] `frontend/src/lib/email-templates.ts` — created
- [x] `frontend/src/lib/directus.ts` — modified (IMG_PRESETS + assetUrl defaults)
- [x] `frontend/src/lib/types.ts` — modified (issf_approved, disciplines, catalog_pdf, etc.)
- [x] `frontend/src/lib/json-ld.ts` — modified (assetUrl import, offers, additionalProperty)
- [x] `frontend/src/app/api/contact/route.ts` — modified (Resend integration)
- [x] `frontend/src/components/product/ProductCard.tsx` — modified (IMG_PRESETS.card)
- [x] `frontend/src/components/product/ProductDetail.tsx` — modified (IMG_PRESETS.card)
- [x] `.env.example` — updated (RESEND_API_KEY, ADMIN_EMAIL, RESEND_FROM_EMAIL)

### Verification Results
- TypeScript: CLEAN (0 errors)
- format=webp default: SET at line 40 of directus.ts
- IMG_PRESETS exported: YES (lines 21-25 of directus.ts)
- No explicit format:webp in callsites: CLEAN
- Resend imported and null-checked: YES
- generateAdminEmail + generateUserEmail exported: YES
- assetUrl used in json-ld.ts: YES (not DIRECTUS_URL)
- offers in json-ld.ts: YES
- issf_approved in types.ts: YES
- catalog_pdf in types.ts: YES
- resend package installed: YES

## Self-Check: PASSED
