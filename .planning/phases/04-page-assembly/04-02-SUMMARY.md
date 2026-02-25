---
phase: 04-page-assembly
plan: 02
subsystem: product-pages
tags: [product-detail, product-listing, format-tabs, translations, phase3-integration]
dependency_graph:
  requires:
    - 03-01 (PAHComparisonChart, animateCount)
    - 03-02 (CertBadgeRow, LogisticsTable)
    - 02-01 (pim_products Directus schema)
    - 02-02 (assetUrl, getProducts, getBrandData)
  provides:
    - /productos listing with 3-category grid and enhanced ProductCards
    - /productos/natura product line detail page with format tabs
    - /productos/eco-star product line detail page with format tabs
    - FormatTabs client component
    - ProductLinePage client component
  affects:
    - ProductCard (added href, discipline badges, PAH badge)
    - LogisticsTable (converted to props-based translations)
    - ProductDetail (updated LogisticsTable call)
tech_stack:
  added: []
  patterns:
    - Line-level slugs (natura, eco-star) instead of per-SKU slugs
    - Props-based translations for Server/Client boundary crossing
    - FormatTabs + useState for client-side variant switching
key_files:
  created:
    - frontend/src/app/[locale]/productos/[slug]/page.tsx
    - frontend/src/components/product/ProductLinePage.tsx
    - frontend/src/components/product/FormatTabs.tsx
  modified:
    - frontend/src/app/[locale]/productos/page.tsx
    - frontend/src/components/product/ProductCard.tsx
    - frontend/src/components/product/LogisticsTable.tsx
    - frontend/src/components/product/ProductDetail.tsx
    - frontend/src/messages/es.json
    - frontend/src/messages/en.json
    - frontend/src/messages/fr.json
    - frontend/src/messages/de.json
decisions:
  - Line-level slugs [natura, eco-star] not per-SKU — one URL per product line, format variants switched client-side
  - LogisticsTable converted from useTranslations hook to props-based translations — required for use in client component that receives server-fetched translations
  - Catalog PDF URL built directly from DIRECTUS_PUBLIC_URL env var — assetUrl() enforces webp format which would corrupt PDF
  - ProductCard href prop optional — defaults to /productos/[slug] for backward compat, overridden at listing page to line slugs
metrics:
  duration: 9 minutes
  completed: 2026-02-25
  tasks_completed: 2
  files_modified: 8
---

# Phase 04 Plan 02: Product Pages Assembly Summary

**One-liner:** Product line detail pages (natura/eco-star) with client-side format variant tabs wired to TechSpecGrid, PAHComparisonChart, LogisticsTable, CertBadgeRow; enhanced listing page with PAH color badges and discipline icons.

## What Was Built

### Task 1: Product detail page with line-level slugs and format variant tabs

Revised the `[slug]/page.tsx` architecture from per-SKU to per-line:

- `generateStaticParams()` returns `[{slug: "natura"}, {slug: "eco-star"}]`
- Slug maps to `range_category` via `rangeMap` (natura → "Premium Natura", eco-star → "Eco Star Efficiency")
- Server Component fetches all variants for the line via `getProducts({ range })`
- Passes all translations as a flat props object to the Client Component boundary
- Catalog PDF URL built as direct Directus asset URL (bypasses assetUrl webp transform)
- `generateMetadata()` returns per-line title and per-locale SEO description

**FormatTabs** (`frontend/src/components/product/FormatTabs.tsx`):
- Client component rendering horizontally scrollable tab buttons
- Each tab shows variant name + diameter badge
- Active tab uses bg-primary (NATURA) or bg-accent (ECO STAR)
- Hidden when variants.length <= 1

**ProductLinePage** (`frontend/src/components/product/ProductLinePage.tsx`):
- Client component with `useState(0)` for active variant index
- Layout: hero image + info, FormatTabs, TechSpecGrid, PAHComparisonChart, CertBadgeRow, LogisticsTable
- All Phase 3 components wired in with props-based translations
- Catalog PDF download CTA styled as accent button with download icon

**LogisticsTable fix** (Rule 1 - Bug): `LogisticsTable` previously used `useTranslations` hook (which requires `"use client"` directive) but was not marked as such. Converted to accept `translations` prop instead. Updated `ProductDetail.tsx` to supply translations via its existing `useTranslations` call.

### Task 2: Product listing page with enhanced 3-category grid

Updated `productos/page.tsx`:
- `generateMetadata()` now provides per-locale description
- Page background changed from `bg-white` to `bg-cream` for visual layering
- Section headers show PAH level descriptor ("0 mg/kg PAH — ISSF Approved" for NATURA)
- Each product card now receives `href="/productos/natura"` or `"/productos/eco-star"` (line-level slug)

Updated `ProductCard`:
- Optional `href` prop (defaults to `/productos/${product.slug}` for backward compat)
- PAH badge always visible: green pill for "0 mg/kg - Free", amber pill for ECO STAR
- Discipline badges row: shows first 3 disciplines with "+N" overflow badge
- Changed to `flex flex-col` layout to push disciplines to card bottom consistently

**Translation keys added to all 4 locale files (es/en/fr/de):**
- `products.downloadCatalog`, `products.formats`, `products.selectFormat`
- `products.certifications`, `products.pahChartTitle`
- `products.pahBadge0`, `products.pahBadgeCompliant`
- `products.metaDescriptionNatura`, `products.metaDescriptionEcoStar`
- `products.pahLevel`, `products.diameter`, `products.weight`, `products.height`
- `products.material`, `products.color`, `products.resinContent`
- `products.issfApproved`, `products.yes`, `products.no`
- `products.pahChart.*` (7 keys), `products.logisticsTable.*` (4 keys)
- `products.viewLine`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] LogisticsTable used useTranslations hook without "use client" directive**
- **Found during:** Task 1 (creating ProductLinePage which imports LogisticsTable)
- **Issue:** LogisticsTable called `useTranslations("products")` — a React hook — making it a Client Component, but it lacked the `"use client"` directive. This would cause a hydration error when used inside ProductLinePage.
- **Fix:** Converted to props-based `translations: LogisticsTranslations` pattern. Updated ProductDetail.tsx to pass translations from its existing `useTranslations` call.
- **Files modified:** `frontend/src/components/product/LogisticsTable.tsx`, `frontend/src/components/product/ProductDetail.tsx`
- **Commits:** c607ec4

**2. [Rule 1 - Bug] assetUrl() would corrupt PDF catalog file**
- **Found during:** Task 1 (constructing catalog PDF URL)
- **Issue:** `assetUrl()` enforces `format=webp` by default (per 02-02 decision), which would transform the PDF binary into a corrupt file.
- **Fix:** Built catalog PDF URL directly from `NEXT_PUBLIC_DIRECTUS_URL` env var without image transforms.
- **Files modified:** `frontend/src/app/[locale]/productos/[slug]/page.tsx`
- **Commits:** c607ec4

## Commits

| Hash | Type | Description |
|------|------|-------------|
| c607ec4 | feat | Product line detail page with format tabs and Phase 3 components |
| 52e7c0f | feat | Add product page translation keys to de.json |
| bb87247 | feat | Enhance product listing page with 3-category grid and improved ProductCard |

## Self-Check: PASSED

- [x] FormatTabs.tsx created
- [x] ProductLinePage.tsx created
- [x] [slug]/page.tsx replaced with line-level implementation
- [x] productos/page.tsx enhanced with cream bg, line slugs, metadata
- [x] ProductCard updated with href prop, PAH badges, discipline icons
- [x] LogisticsTable converted to props-based translations
- [x] All 4 locale files have new product page translation keys
- [x] TypeScript check: 0 errors
- [x] All commits verified in git log
