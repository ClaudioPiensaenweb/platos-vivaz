# Phase 3: Components - Context

**Gathered:** 2026-02-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Build PAHComparisonChart, ComplianceMatrix, TechSpecGrid, ContactSplit, CertBadgeRow, TimelineSection, and all shared components. Gate pointer-tracking effects (MagneticButton, SpotlightReveal) behind pointer:fine media query. All motion components must respect prefers-reduced-motion. Components are built against Directus data types from Phase 2.

</domain>

<decisions>
## Implementation Decisions

### PAH Comparison Chart
- Vertical bar chart comparing 4 values: Traditional (>500 mg/kg), EU 2025/660 limit (50 mg/kg), ECO STAR (<50 mg/kg), NATURA (0 mg/kg)
- Animation: bars grow from zero to full height while the mg/kg number counts up simultaneously (count-up + grow)
- Animation triggers on scroll-into-view via IntersectionObserver (not page load)
- Color scheme: semantic gradient using existing design tokens — Traditional = danger (red), EU limit = warning (amber), ECO STAR = success-muted (light green), NATURA = primary (brand green)
- EU regulation threshold: horizontal dashed line at 50 mg/kg with label "EU 2025/660 limite" — anchors the regulatory context visually
- When prefers-reduced-motion is enabled: bars render at full height immediately, no count-up animation

### Compliance Matrix
- Table layout with status icons — rows = product lines, columns = compliance criteria
- 3 rows: NATURA, ECO STAR, "Platos tradicionales" (anonymous — no competitor names)
- 5 columns: PAH level (mg/kg value), EU 2025/660 compliant (yes/no), composition (resin type), ISSF approved (yes/no), biodegradable (yes/no)
- Cell status: icon + color + text — checkmark (success green) / cross (danger red) icon PLUS short text value (e.g., "0 mg/kg", ">500 mg/kg") — accessible without color vision
- Responsive: on mobile, consider horizontal scroll or card-based fallback

### Contact Section Layout
- 50/50 split: left column = contact form, right column = contact information cards
- Right column: two stacked cards — top "Nacional" (Spanish phone/email), bottom "Internacional / Export" (export phone/email)
- Geo-routing highlight: the matching card (Nacional for Spain, Export for others) gets a subtle border/background highlight via x-vivaz-market header — both cards remain visible
- WhatsApp: floating action button (FAB) in bottom-right corner, always visible on the contact page — not tied to either card
- On mobile: columns stack (form first, then contact cards below)

### Motion & Interaction Rules
- MagneticButton: fully disabled on touch devices (pointer: coarse) — renders as standard button with no attraction effect
- SpotlightReveal: fully disabled on touch devices — no torch effect, content shows normally
- Pointer detection: use CSS media query `@media (pointer: fine)` or JS matchMedia to gate effects
- prefers-reduced-motion: global `useReducedMotion()` hook shared by ALL framer-motion components — when enabled: zero duration, no spring physics, opacity fades only (instant state changes)
- Section entrance animations: fade-up (translate 20-30px upward + opacity) via IntersectionObserver — consistent with existing InView component pattern
- PAH chart animation: scroll-triggered, not page load — user always sees the full animation play

### Claude's Discretion
- TechSpecGrid column count and responsive breakpoints
- CertBadgeRow badge sizing and spacing
- TimelineSection (1967-2001-2026) visual style and layout
- BlogCard/BlogHero/BlogContent component structure
- ProductCard revision scope
- StatCard/DataTable primitives design
- Exact animation timing/easing curves (spring stiffness, damping)
- WhatsApp FAB icon design and hover behavior
- Mobile card-fallback breakpoint for ComplianceMatrix

</decisions>

<specifics>
## Specific Ideas

- The PAH chart is the commercial centerpiece — it must make the scale difference between Traditional (>500) and NATURA (0) viscerally obvious at a glance
- The dashed EU threshold line at 50 mg/kg is critical — it's the regulatory proof point that makes Vivaz's 25-year head start tangible
- Compliance Matrix uses "Platos tradicionales" not any competitor brand — the whole industry is the baseline, not a specific company
- Contact card geo-highlight should be subtle (border or background tint) — both cards always visible, never hidden
- The WhatsApp FAB is a floating button, not embedded in either contact card — it serves all visitors
- Existing components to build on: InView (IntersectionObserver wrapper), MagneticButton, SpotlightReveal, MotionImage — all in src/components/ui/

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-components*
*Context gathered: 2026-02-25*
