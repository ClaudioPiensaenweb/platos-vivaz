# Phase 4: Page Assembly - Context

**Gathered:** 2026-02-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Integrate all 8 pages with real Directus data, briefing copy, and Phase 3 components. Every page must deliver complete, localized, on-brand content. The home page converts, product pages sell, regulation page establishes authority. The existing page shells from the codebase are preserved and enhanced — not rebuilt from scratch.

</domain>

<decisions>
## Implementation Decisions

### Home Page
- Section order matches the design exactly: Hero → Product Range Strip → Why Vivaz (3 pillars) → NATURA showcase → ECO STAR showcase → Videos section → CTA banner → Contact section (inline) → Footer
- Hero keeps current design: forest background, "LÍDERES EN PLATOS ECOLÓGICOS", heritage tagline, "DESCUBRE NUESTRA GAMA" CTA
- Videos section: NEW component — 4 video cards with thumbnail images + video URLs managed in Directus (new collection `web_videos` or similar), always exactly 4, responsive grid, play button overlay, topographic background pattern
- Contact section appears inline on the home page (full Nacional/Internacional + form) AND also exists as standalone /contacto page — reuse the same ContactSplit component
- Footer: standard corporate — VIVAZ logo, navigation links (Productos, Tecnología, Sobre Vivaz, Contacto), contact info (address, phone, email), social links (Instagram), legal links (privacy, cookies), copyright. Dark rounded-corner card matching the design aesthetic

### Product Pages
- Product listing (/productos): keep the current 3-category grid (Premium Natura, Eco Star, Special Formats) — enhance each ProductCard with PAH badge, discipline icons, and Directus imagery
- Product detail: tab/toggle per format variant — one page per product line (NATURA, ECO STAR), user switches between diameter formats (Ø110, Ø105, etc.) inline
- PAHComparisonChart included on product detail pages below the TechSpecGrid specs section
- Catalog PDF download: prominent CTA button within the specs area linking to shared Catalog-min.pdf from Directus
- CertBadgeRow displayed on product detail pages for certification visual proof

### Regulation & Technology Pages
- Regulation page structure: countdown timer → ComplianceMatrix → PAH chart (three-layer proof)
- External link to official EUR-Lex document (EU 2025/660) with a plain-language summary section
- Technology page: replace the current text-based petroleum vs Vivaz comparison section with the animated PAHComparisonChart
- CertBadgeRow appears on BOTH Technology page (in the REACH section) AND Regulation page (below ComplianceMatrix)
- TimelineSection shared between Technology and About pages via props-driven events array

### About Page
- TimelineSection as the centerpiece narrative (1967 founded → 2001 pine resin pioneers → 2026 EU regulation)
- Replace emoji value cards (🎯💡🌿🤝) with proper icons — keep the 4-column grid layout but use SVG/design-system icons
- Keep existing factory section and heritage imagery

### Contact Page
- Follow the design layout: Nacional and Internacional side by side (NOT stacked cards) — adapt ContactSplit component to render side-by-side on desktop
- Geo-routing highlight (via x-vivaz-market header) on the matching section
- WhatsApp FAB persists on the contact page (and all pages)
- Contact form fields: Nombre, Apellidos, Email, Teléfono, market select (Nacional/Internacional), Mensaje, privacy checkbox, ENVIAR button — drop company and interest selects from current form
- Privacy checkbox text needs real legal copy (currently lorem ipsum in design)

### Blog Pages
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

</decisions>

<specifics>
## Specific Ideas

- The design has a strong visual identity: cream backgrounds, dark green (#1a3a2a) sections, accent coral/red (#e86c4a) CTAs, rounded corners on cards and images, corner bracket decorative elements
- Product Range Strip uses corner bracket decorators (┌ ┐ └ ┘) around product groups — distinctive visual motif
- Videos section has a subtle topographic/contour map pattern in the background
- The NATURA showcase has a large macro product photo (terracotta/coral colored clay target with embossed VIVAZ logo) — this is a real product photo, not a placeholder
- ECO STAR showcase mirrors the layout (image left, text right) with grass background product shot
- Contact section design shows the form with clean white input fields on a cream background, distinct from the left column which has green text headers
- The WhatsApp FAB (green circle, bottom-right) appears on every screenshot — it's a global persistent element

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-page-assembly*
*Context gathered: 2026-02-25*
