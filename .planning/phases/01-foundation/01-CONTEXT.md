# Phase 1: Foundation - Context

**Gathered:** 2026-02-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Fix rendering bugs, install missing packages, lock design tokens, extract shared components, complete all 4 locale files. Infrastructure hardening that all subsequent phases build upon.

</domain>

<decisions>
## Implementation Decisions

### Typography & Headings
- All H1/H2/H3 headings must render in UPPERCASE (`uppercase` Tailwind class)
- Headings must use `text-wrap: balance` by default for better visual rhythm
- Follow correct Spanish grammar in all text content (tildes, special characters)
- Font: Quablo for headings, Manrope for body (already configured)

### Design Token Additions (Phase 1 scope)
- Add `uppercase` and `text-wrap: balance` as default heading utilities in globals.css
- These apply globally — every heading component must respect this pattern

### PageHero Component
- The hero is full-viewport-height with a nature/forest background photograph
- Text centered (not left-aligned as in some current pages)
- Structure: subtitle (small, tracking-wide) → H1 (large, bold, uppercase) → description line → CTA button
- Reference: See updated hero design — "VIVAZ CLAY TARGETS" subtitle, "LÍDERES EN PLATOS ECOLÓGICOS" as H1
- PageHero must be flexible enough to support both the home hero (with CTA button) and inner page heroes (simpler, with just title + subtitle)

### Translation Copy Updates
- Hero title (es): "LÍDERES EN PLATOS ECOLÓGICOS"
- Hero subtitle: "VIVAZ CLAY TARGETS"
- Hero description (es): "Más de 50 años de fabricación y pioneros desde 2001 en resinas naturales."
- Hero CTA (es): "DESCUBRE NUESTRA GAMA"
- These keys need translating to en/fr/de in locale files

### Claude's Discretion
- Exact CSS implementation of text-wrap balance (may need polyfill check)
- How to handle uppercase in different locales (German has specific capitalization rules)
- Lenis scroll configuration values (lerp, duration)

</decisions>

<specifics>
## Specific Ideas

### Home Page Restructure (Phase 3-4 scope — captured for downstream)
- **REMOVE**: Product slide/carousel section ("ProductRangeStrip" component)
- **REMOVE**: "El Compromiso de Vivaz" section ("CommitmentBanner" component)
- **ADD**: Videos section — grid of 4 vertical video thumbnails (Instagram Reels / YouTube Shorts style)
  - Customizable from Directus (new collection needed: `web_videos` with fields: title, thumbnail, video_url, platform, sort_order)
  - Layout: 4 rounded-corner vertical cards with play button overlay
  - Header: play icon + "VÍDEOS" title + "VER TODOS LOS VÍDEOS" link
  - Light background with subtle organic pattern
- **ADD**: Contact CTA section before footer
  - Split layout: left side "¿NECESITAS AYUDA?" + company address + Nacional/Internacional contact split; right side: contact form (Nombre, Apellidos, Email, Teléfono, Mensaje, checkbox GDPR, ENVIAR button)
  - Warm cream/beige background (bg-cream)
  - Must be reusable across pages

### Updated Home Hero Design
- Full-screen forest/nature photograph as background
- Centered crosshair/target decorative marks (subtle, brand element)
- WhatsApp floating button (bottom right, green circle)
- Instagram icon in navbar
- CTA button: coral/salmon color (existing accent color)

### Sustainability Page (Phase 4 scope)
- Restructure for SEO with proper heading hierarchy
- Maintain ALL technical information strictly:
  - Innovation in raw materials (pine resin since 2001)
  - Responsible production (water-based paint, emission filters, solar energy, waste management)
- Expand content depth while keeping technical accuracy

### Regulation 2026 Page (Phase 4 scope)
- Expand to be more explanatory for target audience
- Cover: What changes (EU 2025/660), PAH limits, Why it applies, Vivaz advantage
- More didactic format with infographics

### Navbar Changes
- Combined "Noticias / Regulación 2026" as single nav item
- "Tecnología y sostenibilidad" as nav label (not separate items)

### Global Typography Rules
- All headings: uppercase + text-wrap: balance
- Correct Spanish accentuation throughout (á, é, í, ó, ú, ñ, ¿, ¡)

### Product Disciplines
- Confirmed 6 formats: American Trap, Extra Rabbit, Rabbit, Battue, Midi 90, Mini 60
- These must appear in product range display

</specifics>

<deferred>
## Deferred Ideas

- New Directus `web_videos` collection (Phase 2: CMS Data)
- VideoGallery component (Phase 3: Components)
- ContactCTA reusable section component (Phase 3: Components)
- Home page restructure with new sections (Phase 4: Page Assembly)
- Sustainability page SEO restructure (Phase 4: Page Assembly)
- Regulation page expansion (Phase 4: Page Assembly)
- Navbar menu restructure (Phase 4: Page Assembly)
- Review PDF catalog for product info accuracy (before Phase 2 data seeding)

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-02-25*
