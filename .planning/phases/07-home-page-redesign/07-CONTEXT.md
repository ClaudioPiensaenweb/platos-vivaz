# Phase 7 Context: Home Page Redesign

**Created:** 2026-02-27
**Phase goal:** Visitors land on a home page that immediately communicates Vivaz brand identity through a forest hero, three product lines, redesigned WhyVivaz cards, product feature sections, vertical video reels, and a contact CTA + form

## Available Assets

All v2 design assets are in `briefing/v2/`:
- `foto-cabecera.jpg` — Forest background for hero (dark pine forest, moody lighting)
- `target-hero.svg` — White crosshair SVG (39x40px, two perpendicular white lines) for hero overlay
- `target-oscuro.svg` — Dark crosshair SVG (22x23px, black strokes) for light backgrounds
- `marca-esquina.svg` — Green corner mark SVG (20x20px, #075627) for brand decoration
- `vivaz-range 1.png` — VIVAZ RANGE product image (6 orange clay targets in a row, different sizes/formats)
- `vivaz-clay.jpg` — Close-up clay target with "SUPER VIVAZ COMPETICIÓN" branding

Additional images in `briefing/IMG/`:
- `vivaz-clay-targets-sustainability.jpg` — Two clay targets on green shooting range (for Contact CTA banner)
- `vivaz-plato-natura.jpg` — NATURA product photo
- Various `vivaz-clay-*.png` files — Individual clay target cutouts

**Action for executors:** Copy needed assets to `frontend/public/img/` during implementation.

## Decisions

### 1. Hero Visual Treatment

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Background image | Static file from `briefing/v2/foto-cabecera.jpg` → copy to `/public/img/hero-forest.jpg` | User has the image ready, no CMS dependency |
| Crosshair elements | Use provided SVG assets (`target-hero.svg` for hero, `marca-esquina.svg` for decorations) | User has specific crosshair assets — not auto-generated |
| Hero text source | Translation files (`messages/{locale}.json`) | Hardcoded per locale, not CMS-managed. Key strings: "VIVAZ CLAY TARGETS", "LÍDERES EN PLATOS ECOLÓGICOS", subtitle, CTA label |
| Mobile adaptation | Claude decides best responsive approach | Stack vertically likely: text centered, crosshairs hidden or simplified on small screens, forest bg covers full viewport |

**Hero layout from reference:** Full-viewport forest background with dark overlay. Crosshair decorations positioned at corners/edges. "VIVAZ CLAY TARGETS" as large heading, "LÍDERES EN PLATOS ECOLÓGICOS" below, a subtitle paragraph, and a CTA button linking to products.

### 2. Video Reels Section

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Playback behavior | Thumbnail + play overlay → opens external link (Instagram/YouTube) in new tab | Simpler, no embed complexity, keeps users coming back |
| Mobile layout | Claude decides | Options: horizontal scroll, 2x2 grid, or single column stack |
| Directus schema | Reuse existing `WebVideo` type (title, url, thumbnail) | Current schema is sufficient — no new collections needed |
| Video content | Placeholders for now | Build layout with placeholder thumbnails, real videos added later |

**Section layout from reference:** 4 vertical columns at 9:16 aspect ratio. Each shows a poster/thumbnail with a centered play button overlay. Section header includes "VER TODOS LOS VÍDEOS" link button. Dark/muted aesthetic.

### 3. Contact Section

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Component approach | New `ContactCTABanner` component + adapt existing `ContactSplit` internals for form/address | CTA banner is entirely new, form logic already exists |
| Contact data source | Directus CMS | Nacional/Internacional phone numbers and addresses managed in CMS for easy updates |
| Form logic | Reuse existing form submission (Resend API + CRM) | Same backend API route, just restyle the 5 fields |
| Form fields | Nombre, Apellidos, Email, Teléfono, Mensaje | Match reference exactly |
| CTA banner image | `briefing/IMG/vivaz-clay-targets-sustainability.jpg` → copy to `/public/img/` | Two clay targets on green range — reinforces sustainability narrative |

**CTA banner layout from reference:** Dark green gradient background. Product/sustainability photo on left side. Heading + CTA button on right side. Full-width section.

**Contact form layout from reference:** Two-column: left has address block with Nacional/Internacional data (phone, email, address); right has the 5-field contact form with submit button.

### 4. Product Feature Sections (NATURA + ECO STAR)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Product images | Directus `product_lines` collection | Reuses existing seeded data, CMS-managed |
| Badge component | Create reusable `<ProductBadge>` | Takes text + icon, used across both NATURA and ECO STAR sections |
| CTA destination | Link to respective product pages (`/productos/natura`, `/productos/eco-star`) | Direct path to detailed product info |
| Description copy | Directus CMS | Product descriptions pulled from CMS for marketing flexibility |
| Layout direction | Alternating: NATURA (image left / text right), ECO STAR (text left / image right) | Standard alternating pattern for visual variety |

**Section layout from reference:** Side-by-side layout. One side has a large product close-up image (Directus). Other side has: ProductBadge (eco-friendly leaf icon + text), heading, description paragraph, CTA button. Sections alternate direction.

## Current Home Page Structure (v1.0)

```tsx
// frontend/src/app/[locale]/page.tsx
<HeroSection market={market} />
<ProductRangeStrip />
<WhyVivazGrid />
<ProductShowcase variant="natura" />
<ProductShowcase variant="ecostar" />
<VideoSection videos={videos} translations={videoTranslations} />
<CommitmentBanner />      // ← REMOVE (replaced by video reels + contact CTA)
<ContactSplit />          // ← ADAPT (new layout with CTA banner above)
```

## Target Home Page Structure (v2.0)

```tsx
<HeroSection />                          // 07-01: Redesigned with forest bg + crosshairs
<ProductRangeStrip />                    // 07-02: Updated to 3 lines (NATURA, ECO STAR, VIVAZ RANGE)
<WhyVivazGrid />                         // 07-03: Redesigned cards (Calidad, Sostenibilidad, Experiencia)
<ProductFeature variant="natura" />      // 07-04: New side-by-side with badge, CTA, Directus image
<ProductFeature variant="ecostar" />     // 07-04: Alternating layout direction
<VideoReels />                           // 07-05: New vertical reels (9:16, thumbnails + external links)
<ContactCTABanner />                     // 07-06: New dark green gradient CTA
<ContactFormSection />                   // 07-06: Address data + 5-field form (adapted from ContactSplit)
```

## Deferred Ideas

- CMS-managed hero text (could migrate from translation files to Directus in future milestone)
- Inline video playback / self-hosted videos (current: thumbnail + external link)
- Separate Directus "reels" collection (current: reuse WebVideo)
