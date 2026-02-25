# Phase 3: Components - Research

**Researched:** 2026-02-25
**Domain:** React component architecture, scroll-triggered animations, pointer/accessibility gating, data-visualization without charting library
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**PAH Comparison Chart**
- Vertical bar chart comparing 4 values: Traditional (>500 mg/kg), EU 2025/660 limit (50 mg/kg), ECO STAR (<50 mg/kg), NATURA (0 mg/kg)
- Animation: bars grow from zero to full height while the mg/kg number counts up simultaneously (count-up + grow)
- Animation triggers on scroll-into-view via IntersectionObserver (not page load)
- Color scheme: semantic gradient using existing design tokens — Traditional = danger (red), EU limit = warning (amber), ECO STAR = success-muted (light green), NATURA = primary (brand green)
- EU regulation threshold: horizontal dashed line at 50 mg/kg with label "EU 2025/660 limite" — anchors the regulatory context visually
- When prefers-reduced-motion is enabled: bars render at full height immediately, no count-up animation

**Compliance Matrix**
- Table layout with status icons — rows = product lines, columns = compliance criteria
- 3 rows: NATURA, ECO STAR, "Platos tradicionales" (anonymous — no competitor names)
- 5 columns: PAH level (mg/kg value), EU 2025/660 compliant (yes/no), composition (resin type), ISSF approved (yes/no), biodegradable (yes/no)
- Cell status: icon + color + text — checkmark (success green) / cross (danger red) icon PLUS short text value (e.g., "0 mg/kg", ">500 mg/kg") — accessible without color vision
- Responsive: on mobile, consider horizontal scroll or card-based fallback

**Contact Section Layout**
- 50/50 split: left column = contact form, right column = contact information cards
- Right column: two stacked cards — top "Nacional" (Spanish phone/email), bottom "Internacional / Export" (export phone/email)
- Geo-routing highlight: the matching card (Nacional for Spain, Export for others) gets a subtle border/background highlight via x-vivaz-market header — both cards always visible, never hidden
- WhatsApp: floating action button (FAB) in bottom-right corner, always visible on the contact page — not tied to either card
- On mobile: columns stack (form first, then contact cards below)

**Motion & Interaction Rules**
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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PROD-04 | Product detail pages show `TechSpecGrid` with PAH level prominently displayed | TechSpecGrid is a new Server Component variant wrapping existing ProductDetail spec grid — no new library needed |
| SUST-01 | PAH comparison visualization — animated chart showing Traditional (>500) → EU limit (50) → ECO STAR (<50) → NATURA (0) | Pure CSS + requestAnimationFrame count-up + existing InView/IntersectionObserver pattern |
| SUST-05 | 1967 → 2001 → 2026 brand timeline showing innovation history | Horizontal/vertical timeline using existing InView + CSS — pattern already exists in RegulationContent |
| REG-04 | Compliance matrix showing NATURA / ECO STAR / Traditional compliance status | HTML table with Tailwind tokens, horizontal-scroll on mobile — no library needed |
| ABOUT-03 | Visual timeline of Vivaz's ecological leadership journey | Same TimelineSection component serves both SUST-05 and ABOUT-03 — one component, two use sites |
| PERF-05 | Animation budget enforced — `useReducedMotion()` on all motion components | framer-motion exports `useReducedMotion` hook; also `MotionConfig reducedMotion="user"` for blanket override |
| DESGN-03 | MagneticButton and SpotlightReveal gated behind `pointer: fine` media query | JS `window.matchMedia("(pointer: fine)")` with React `useState`/`useEffect`; CSS `@media (pointer: fine)` wrapper class |
</phase_requirements>

---

## Summary

Phase 3 is a component-building phase with no new library dependencies needed. All required functionality — scroll-triggered animation, count-up numbers, compliance tables, timelines, contact splits — can be built with the existing stack: framer-motion 12, Tailwind CSS v4, and the project's own InView/IntersectionObserver wrapper.

The two hardest problems are: (1) the PAH bar chart requiring coordinated bar-height and number count-up animation triggered by scroll, both respecting `prefers-reduced-motion`; and (2) the ContactSplit geo-routing highlight, which requires reading the `x-vivaz-market` response header inside a Next.js App Router Server Component via `next/headers`. Neither requires a new library.

MagneticButton and SpotlightReveal already exist in `src/components/ui/` but currently have no pointer-device guard. Retrofitting them with a `matchMedia("(pointer: fine)")` hook is the correct fix — it must happen in a `useEffect` to avoid SSR mismatch, since `window.matchMedia` is not available server-side.

**Primary recommendation:** Build all Phase 3 components with existing stack. No new npm installs required. Gate pointer effects and reduced-motion early — retrofit MagneticButton and SpotlightReveal first, then build new components conforming to the same pattern.

---

## Standard Stack

### Core (already installed — no new installs)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| framer-motion | 12.34.0 | Animation (MagneticButton spring, MotionImage morphs) | Already installed; `useReducedMotion` hook built-in |
| Tailwind CSS v4 | 4.x | Utility styles, design token classes | Already locked in Phase 1 — all tokens in globals.css |
| next-intl | 4.1.0 | i18n — `useTranslations()` in Client, `getTranslations()` in Server | Pattern established across existing components |
| React 19 | 19.2.3 | Component model | Project baseline |
| Next.js App Router | 16.1.6 | Server Components for data fetching, Client Components for interactivity | Established pattern |

### Supporting (already installed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next/headers` (built-in) | — | Read `x-vivaz-market` header in Server Components | ContactSplit geo-routing; **Server Component only** |
| CSS `@media (pointer: fine)` | — | Hide pointer-only effects from CSS layer | Decorative hover overlays that don't need JS |
| `window.matchMedia` (browser API) | — | JS-side pointer detection with `useEffect` | MagneticButton/SpotlightReveal — behavior must be disabled, not just hidden |

### No New Installs Needed

The WhatsApp FAB is a simple `<a href="https://wa.me/{number}">` anchor with `target="_blank"` — no library needed. External npm packages for WhatsApp buttons (react-floating-whatsapp etc.) carry unnecessary weight and dependency risk for a one-element use case.

---

## Architecture Patterns

### Recommended Component Structure

```
src/components/
├── ui/                          # Shared primitive components
│   ├── InView.tsx               # EXISTING — IntersectionObserver wrapper
│   ├── MagneticButton.tsx       # EXISTING — needs pointer-fine guard RETROFIT
│   ├── SpotlightReveal.tsx      # EXISTING — needs pointer-fine guard RETROFIT
│   ├── MotionImage.tsx          # EXISTING — fine as-is
│   ├── Badge.tsx                # EXISTING
│   ├── Button.tsx               # EXISTING
│   ├── SectionHeader.tsx        # EXISTING
│   └── Container.tsx            # EXISTING
├── technology/                  # NEW — tech/sustainability page components
│   ├── PAHComparisonChart.tsx   # NEW — bar chart with count-up (Client)
│   └── CertBadgeRow.tsx         # NEW — certification badge strip (Server)
├── regulation/                  # EXISTING directory
│   └── ComplianceMatrix.tsx     # NEW — reg compliance table (Server)
├── about/                       # NEW directory
│   ├── TimelineSection.tsx      # NEW — 1967/2001/2026 (Server)
│   └── StatCard.tsx             # NEW — stat primitive (Server)
├── product/                     # EXISTING directory
│   ├── TechSpecGrid.tsx         # NEW — replaces inline spec grid in ProductDetail (Server)
│   ├── ProductCard.tsx          # EXISTING — revision: add PAH badge prominence
│   ├── LogisticsTable.tsx       # EXISTING — keep as-is
│   └── DisciplineBadge.tsx      # EXISTING — keep as-is
├── contact/                     # EXISTING directory
│   ├── ContactForm.tsx          # EXISTING — no changes needed
│   └── ContactSplit.tsx         # NEW — 50/50 layout + geo cards + WhatsApp FAB (Server+Client)
└── blog/                        # NEW directory (currently inlined in page)
    ├── BlogCard.tsx             # NEW — replaces inline article in noticias/page.tsx
    ├── BlogHero.tsx             # NEW — blog post header (Server)
    └── BlogContent.tsx          # NEW — sanitized HTML blog body (Server)
```

### Pattern 1: Server Component with Translations as Props

The established pattern (from RegulationContent, PageHero) is to pass translations as props from the Server Component to avoid `useTranslations()` in Client Components.

```typescript
// Server Component (page.tsx) — fetches translations + data
export default async function TechnologyPage() {
  const t = await getTranslations("technology");
  const brand = await getBrandData();
  return (
    <PAHComparisonChart
      translations={{
        traditional: t("pahTraditional"),
        euLimit: t("pahEuLimit"),
        // ...
      }}
    />
  );
}

// Client Component — receives translations as props
"use client";
interface PAHComparisonChartProps {
  translations: { traditional: string; euLimit: string; ... };
}
export default function PAHComparisonChart({ translations }: PAHComparisonChartProps) {
  // Uses translations prop, NOT useTranslations()
}
```

**CRITICAL:** `useTranslations()` only works in Client Components during React 19 — always pass translations as props from Server → Client boundary.

### Pattern 2: useReducedMotion in framer-motion

framer-motion 12 exports `useReducedMotion` from the main package. Returns `boolean | null` (null during SSR).

```typescript
// Source: framer-motion package, confirmed via WebSearch
import { useReducedMotion } from "framer-motion";

export default function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();

  // For PAH chart: skip count-up, render at full height immediately
  const barHeight = shouldReduceMotion ? "100%" : undefined; // CSS class driven otherwise

  // For framer-motion animate: zero out transforms when reduced
  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  };

  // For spring animations: make instant
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 150, damping: 15 };
}
```

**Alternative — MotionConfig global blanket:** Wrapping the layout with `<MotionConfig reducedMotion="user">` automatically disables transform/layout animations while preserving opacity fades. This is useful as a layout-level default, but individual components that need fine control (like PAHComparisonChart) still need `useReducedMotion` directly.

```typescript
// Source: motion.dev docs (confirmed via WebSearch cross-reference)
// In src/app/[locale]/layout.tsx — already has providers
<MotionConfig reducedMotion="user">
  {children}
</MotionConfig>
```

### Pattern 3: Pointer Device Detection (JS-side)

Must use `useEffect` because `window.matchMedia` is not available during SSR.

```typescript
"use client";
import { useState, useEffect } from "react";

function useFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(false); // Default false: no pointer effects on SSR/mobile-first

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setHasFinePointer(mq.matches);
    const handler = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return hasFinePointer;
}

// In MagneticButton:
export default function MagneticButton({ children, ...props }) {
  const hasFinePointer = useFinePointer();
  if (!hasFinePointer) return <div {...}>{children}</div>; // Passthrough — no spring
  return <motion.div onMouseMove={...}>{children}</motion.div>;
}
```

**Note on SSR default:** Default `false` (no effects) is correct — it means touch users (and first SSR render) never see the effect. Fine-pointer users get it after hydration. There is no flash because the effect is additive (it attracts the button), not subtractive.

### Pattern 4: PAHComparisonChart — Scroll-triggered + Count-up

The chart must:
1. Observe scroll visibility via IntersectionObserver (existing `InView` component is `once: true` by default — reuse its pattern, but PAHComparisonChart needs direct control to start the count-up imperatively)
2. Animate bar height from 0 to target via CSS transition (triggered by adding a class)
3. Count up numbers using `requestAnimationFrame` with an easing function

The values to visualize:
- Traditional: >500 mg/kg → display as 500, color: `danger` (#ef4444)
- EU limit: 50 mg/kg → dashed horizontal line at this level (not a bar)
- ECO STAR: <50 mg/kg → display as 49, color: `success` (#0bb14e) at lower opacity
- NATURA: 0 mg/kg → display as 0, color: `primary` (#075627)

**Scale calculation:** Bars use percentage of max (500). Traditional = 100%, ECO STAR = ~10%, NATURA = 0%. The EU limit line sits at 50/500 = 10% from bottom.

```typescript
// Pseudocode pattern — count-up with requestAnimationFrame
function animateCount(
  from: number,
  to: number,
  duration: number,
  onUpdate: (val: number) => void,
  onComplete?: () => void
) {
  const start = performance.now();
  function frame(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    onUpdate(Math.round(from + (to - from) * eased));
    if (progress < 1) requestAnimationFrame(frame);
    else onComplete?.();
  }
  requestAnimationFrame(frame);
}
```

### Pattern 5: Reading x-vivaz-market Header in Server Component

```typescript
// In ContactSplit.tsx (Server Component)
import { headers } from "next/headers";

export default async function ContactSplit() {
  const headersList = await headers(); // Next.js 15+ async headers()
  const market = headersList.get("x-vivaz-market") ?? "export";
  // market is "national" | "export"
  // Pass to Client Component as prop or render conditionally
}
```

**IMPORTANT:** `headers()` became `async` in Next.js 15 — the codebase is Next.js 16.1.6, so `await headers()` is correct. This can only be called in Server Components.

### Pattern 6: ComplianceMatrix — Accessible Table

Table data is hardcoded (static spec data, not from CMS). Use semantic `<table>` with `scope` attributes for screen readers. Status cells use icon + text to be color-blind accessible.

```typescript
// Static data approach — no Directus fetch needed
const matrixData = [
  {
    row: "NATURA",
    pah: "0 mg/kg",
    euCompliant: true,
    composition: "100% Resina de Pino",
    issfApproved: true,
    biodegradable: true,
  },
  {
    row: "ECO STAR",
    pah: "< 50 mg/kg",
    euCompliant: true,
    composition: "Híbrido Ecológico",
    issfApproved: false,
    biodegradable: false,
  },
  {
    row: "Platos tradicionales",
    pah: "> 500 mg/kg",
    euCompliant: false,
    composition: "Petróleo/Alquitrán",
    issfApproved: true, // industry standard before regulation
    biodegradable: false,
  },
];
```

### Pattern 7: TimelineSection — Reusable from RegulationContent Pattern

RegulationContent already has a working horizontal/vertical timeline pattern (horizontal on md+, vertical on mobile). TimelineSection for 1967/2001/2026 uses the same structure but is extracted into a standalone reusable component (ABOUT-03 and SUST-05 both need it).

### Pattern 8: TechSpecGrid — Extracted from ProductDetail

The current `ProductDetail.tsx` has an inline spec grid (`grid grid-cols-2 gap-4 bg-cream`). TechSpecGrid extracts this into a standalone component with:
- PAH level displayed with color coding (green for 0, amber for <50)
- All fields: diameter, weight, material, PAH, color, height, resin_pct, issf_approved
- Disciplines as DisciplineBadge row below the grid

### Pattern 9: BlogCard / BlogContent

BlogCard replaces the inline `<article>` in `noticias/page.tsx`. BlogContent handles the sanitized HTML body. Both follow the Server Component + DOMPurify pattern established in ProductDetail.

### Anti-Patterns to Avoid

- **`useTranslations()` in Client Components:** Causes hydration errors in Next.js 16 App Router — always pass translations as props from Server Component boundary
- **Hardcoded bar heights:** The EU limit line position must be calculated relative to the scale maximum (500), not hardcoded — so changing the Traditional value scale stays correct
- **`window.matchMedia` without `useEffect`:** Causes SSR error ("window is not defined") — always wrap in `useEffect` with `useState` defaulting to `false`
- **`headers()` without `await`:** Next.js 16 requires `await headers()` — calling it synchronously throws at runtime
- **`motion.create(Image)`:** Known type conflict with next/image `onDrag` prop (documented in MEMORY.md) — always use `motion.div` wrapper containing `<Image>` instead
- **Animating non-transform/opacity properties:** Avoid animating `height` directly via framer-motion (layout thrash) — use CSS transitions on `height` driven by class toggle, or use `scaleY` transform instead
- **No `aria-label` on icon-only buttons:** WhatsApp FAB must have `aria-label="Contactar por WhatsApp"` — it renders only an icon

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Count-up animation | Custom requestAnimationFrame utility | Inline utility function per component or extract to `src/lib/animate.ts` | rAF with ease-out cubic is ~15 lines — no library needed at this scale |
| Pointer detection hook | Nothing bespoke | Inline `useFinePointer` hook (4 lines) or inline `useEffect` in component | Project pattern prefers colocated logic for single-use hooks |
| WhatsApp button | npm package | `<a href="https://wa.me/{number}" target="_blank">` with SVG icon | Libraries add 20KB+ for a single anchor tag |
| Compliance table | Charting library | `<table>` with Tailwind tokens | No charting needed — it's a matrix of icons + text |
| PAH bar chart | Recharts/Chart.js | Pure CSS bars with height transition | Recharts/D3 are 200-500KB — CSS bars are 0KB and allow full design control |

**Key insight:** All the "data visualization" in this phase is illustrative, not interactive — no tooltips, no data updates, no drill-down. CSS bars with CSS transitions and rAF count-up is the correct solution. Charting libraries solve interactive/dynamic data problems this phase doesn't have.

---

## Common Pitfalls

### Pitfall 1: SSR/hydration mismatch in pointer detection

**What goes wrong:** `window.matchMedia("(pointer: fine)")` runs during SSR and throws `ReferenceError: window is not defined`.
**Why it happens:** Next.js App Router renders Server and Client Components on the server. Even `"use client"` components render on the server for the initial HTML.
**How to avoid:** Always gate `window.matchMedia` inside `useEffect`. Default `useState` to `false` (no effects) — this is safe for both SSR output and the first client render before hydration.
**Warning signs:** `ReferenceError: window is not defined` in build or dev console; hydration mismatch warnings.

### Pitfall 2: Count-up starts before scroll-into-view

**What goes wrong:** The count-up animation plays on page load (when the chart is off-screen), so the user sees static numbers when they scroll to the section.
**Why it happens:** Starting the animation in a `useEffect` with no IntersectionObserver means it starts immediately.
**How to avoid:** Use IntersectionObserver (`ref` callback or the existing `InView` pattern) to set `isVisible: true`, then start the count-up animation in a `useEffect` that depends on `isVisible`.
**Warning signs:** Numbers are already at full value when the chart scrolls into view.

### Pitfall 3: Bar height animation via framer-motion causes layout thrash

**What goes wrong:** Animating `height` via framer-motion `animate={{ height: "X%" }}` triggers layout recalculation on every frame.
**Why it happens:** `height` is not a GPU-composited property. framer-motion's layout animations help but can't fully avoid reflow for `height` percentage animations.
**How to avoid:** Use CSS transitions on `transform: scaleY()` with `transform-origin: bottom` for bars, OR use CSS `transition: height 0.8s` driven by a class toggle (simpler, lower risk). CSS transitions bypass the framer-motion scheduler entirely for this use case.
**Warning signs:** Janky bar growth, high "Layout" time in browser Performance tab.

### Pitfall 4: `headers()` called in Client Component

**What goes wrong:** `import { headers } from "next/headers"` throws at runtime if called in a Client Component.
**Why it happens:** `next/headers` is a Server-only module.
**How to avoid:** ContactSplit must be a Server Component that reads the header and passes `market: "national" | "export"` as a prop to any Client Component children (e.g., an interactive highlight card).
**Warning signs:** Module not found or runtime error mentioning `next/headers` in client bundle.

### Pitfall 5: Compliance matrix loses column alignment on mobile

**What goes wrong:** The 5-column table overflows its container on narrow screens, causing horizontal scroll to cut off content or break layout.
**Why it happens:** Tables do not respect `overflow: hidden` naturally; they push the container.
**How to avoid:** Wrap table in `<div className="overflow-x-auto">` (pattern already used in `LogisticsTable.tsx`). Add `min-width` to the `<table>` to ensure column labels remain readable.
**Warning signs:** Table clips or overlaps other content on 375px viewport.

### Pitfall 6: `useReducedMotion` returns `null` on SSR

**What goes wrong:** `useReducedMotion()` returns `null` during SSR (before browser media query is available). If code checks `if (shouldReduceMotion)`, `null` is falsy and may cause unexpected behavior.
**Why it happens:** framer-motion explicitly returns `null` before hydration to avoid SSR/client mismatch.
**How to avoid:** Check `if (shouldReduceMotion === true)` or use `!!shouldReduceMotion`. Default to showing animations (null = unknown → animate normally is safe).
**Warning signs:** Animation flashes on first render even with reduced motion enabled.

---

## Code Examples

Verified patterns from existing codebase and official sources:

### Existing InView Pattern (reuse for PAHComparisonChart)

```typescript
// Source: src/components/ui/InView.tsx (existing)
// Reuse this exact threshold/once pattern for PAHComparisonChart's observer
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
      observer.unobserve(el); // once: true behavior
    }
  },
  { threshold: 0.15 }
);
```

### PAHComparisonChart Skeleton

```typescript
"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function PAHComparisonChart({ translations }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // IntersectionObserver — trigger once on scroll
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.unobserve(el); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Count-up for Traditional bar (target: 500)
  const [count, setCount] = useState(shouldReduceMotion ? 500 : 0);
  useEffect(() => {
    if (!started || shouldReduceMotion) return;
    // animateCount(0, 500, 1200, setCount) — rAF utility
  }, [started, shouldReduceMotion]);

  const bars = [
    { label: translations.traditional, value: 500, display: ">500", color: "bg-danger", heightPct: 100 },
    { label: "ECO STAR", value: 49, display: "<50", color: "bg-success/50", heightPct: 10 },
    { label: "NATURA", value: 0, display: "0", color: "bg-primary", heightPct: 0 },
  ];

  return (
    <div ref={ref} className="relative flex items-end gap-8 h-64">
      {/* EU limit dashed line — positioned at 10% from bottom = 50/500 */}
      <div className="absolute left-0 right-0 border-t-2 border-dashed border-warning"
           style={{ bottom: "10%" }} />
      {bars.map((bar) => (
        <div key={bar.label} className="flex flex-col items-center gap-2">
          <span>{bar.display} mg/kg</span>
          <div
            className={`w-16 ${bar.color} transition-all duration-1000 ease-out`}
            style={{ height: started || shouldReduceMotion ? `${bar.heightPct}%` : "0%" }}
          />
          <span>{bar.label}</span>
        </div>
      ))}
    </div>
  );
}
```

### MagneticButton with Pointer Gate

```typescript
"use client";
import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ children, className = "", strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setHasFinePointer(mq.matches);
    const handler = (e: MediaQueryListEvent) => setHasFinePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Passthrough on touch devices — no spring, no event handlers
  if (!hasFinePointer) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPosition({
          x: (e.clientX - rect.left - rect.width / 2) * strength,
          y: (e.clientY - rect.top - rect.height / 2) * strength,
        });
      }}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
```

### ContactSplit — Reading x-vivaz-market (Server Component)

```typescript
// Server Component — no "use client" directive
import { headers } from "next/headers";
import ContactForm from "./ContactForm";
import ContactCards from "./ContactCards"; // Client Component for highlight state

export default async function ContactSplit() {
  const headersList = await headers();
  const market = (headersList.get("x-vivaz-market") ?? "export") as "national" | "export";

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <ContactForm />
      <ContactCards highlightedMarket={market} />
    </div>
  );
}
```

### WhatsApp FAB

```typescript
// Simple anchor — no library needed
export function WhatsAppFAB({ number }: { number: string }) {
  const url = `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      {/* WhatsApp SVG icon inline */}
    </a>
  );
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| D3.js / Chart.js for bar charts | Pure CSS bars with rAF count-up | Ongoing in 2024-2025 | Eliminates 200-500KB bundle; simpler, fully controlled |
| `prefers-reduced-motion` in CSS only | `useReducedMotion()` hook + `MotionConfig` | framer-motion v5+ | Handles both CSS and JS animation gating in one place |
| `pointer: hover` media query | `pointer: fine` media query | Modern CSS Level 4 | More accurate — detects input device precision, not just hover capability |
| Synchronous `headers()` in Next.js | `await headers()` | Next.js 15 | Dynamic APIs became async; Next.js 16 inherits this |

**Deprecated/outdated:**
- `motion.create(Image)`: Do NOT use — documented type conflict with next/image `onDrag` prop. Always use `motion.div` wrapping `<Image>`. (Source: project MEMORY.md)
- `@studio-freight/react-lenis`: Do NOT use — incompatible with React 19. Use `lenis` directly. (Source: project MEMORY.md)

---

## Open Questions

1. **NATURA 0 mg/kg bar visual problem**
   - What we know: NATURA has literally 0 mg/kg PAH — the bar would have zero height
   - What's unclear: A zero-height bar is visually meaningless but factually correct. Options: render a minimal 2px baseline with a checkmark/label overlay; render it as a special "0" state with its own visual treatment
   - Recommendation: Render NATURA bar as a thin 4px accent line at the bottom with a "0 mg/kg - Sin PAH" label above it — makes the zero a visual statement rather than an absence

2. **ComplianceMatrix ISSF column for "Platos tradicionales"**
   - What we know: CONTEXT.md column says ISSF approved yes/no per row
   - What's unclear: Traditional plates historically had ISSF approval before the regulation — the research flag in STATE.md says ISSF status for NATURA must be confirmed. For the matrix, should Traditional show ISSF=yes?
   - Recommendation: Default to showing Traditional as ISSF-approved (they were the industry standard) but flag this for client confirmation before launch. Use a data constant that's easy to update.

3. **TimelineSection reuse between SUST-05 (tech page) and ABOUT-03 (about page)**
   - What we know: Both requirements call for a 1967/2001/2026 timeline
   - What's unclear: The content (text labels) may differ between the technology and about contexts
   - Recommendation: Build TimelineSection as a props-driven component accepting `events` array — same component, different copy per page

4. **MotionConfig at layout level for blanket reduced-motion**
   - What we know: `<MotionConfig reducedMotion="user">` in layout.tsx would globally enforce reduced motion
   - What's unclear: The existing `src/app/[locale]/layout.tsx` already has providers — where exactly does MotionConfig slot in?
   - Recommendation: Add MotionConfig as the outermost wrapper in the client providers (or add to PageTransition provider) as a Phase 3 setup step. Individual components still use `useReducedMotion()` for custom logic like the PAH count-up.

---

## Sources

### Primary (HIGH confidence)
- Codebase: `src/components/ui/InView.tsx` — IntersectionObserver pattern verified
- Codebase: `src/components/ui/MagneticButton.tsx` — existing implementation, needs pointer guard
- Codebase: `src/components/ui/SpotlightReveal.tsx` — existing implementation, needs pointer guard
- Codebase: `src/middleware.ts` — x-vivaz-market header set; `"national"` | `"export"` values
- Codebase: `src/app/globals.css` — design token manifest, animation keyframes
- Codebase: `src/lib/types.ts` — Product, BrandData type shapes for TechSpecGrid
- Codebase: `package.json` — framer-motion 12.34.0 confirmed installed

### Secondary (MEDIUM confidence)
- WebSearch: `framer-motion useReducedMotion` → confirmed hook exists, returns `boolean | null`, importable from `"framer-motion"` — [motion.dev docs](https://motion.dev/docs/react-use-reduced-motion)
- WebSearch: `MotionConfig reducedMotion="user"` → confirmed disables transform/layout, preserves opacity — [motion.dev accessibility guide](https://motion.dev/docs/react-accessibility)
- WebSearch: `window.matchMedia pointer fine` → confirmed pattern for JS-side pointer detection — [MDN pointer media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)
- WebSearch: IntersectionObserver + rAF count-up → confirmed idiomatic pattern, no library needed
- Next.js docs: `await headers()` required in Next.js 15+ (inherited by 16) for Server Components

### Tertiary (LOW confidence)
- None flagged — all critical patterns have HIGH or MEDIUM confidence from codebase verification

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — confirmed from package.json and existing component files
- Architecture: HIGH — patterns directly observed in existing codebase
- Pitfalls: HIGH — SSR/matchMedia and async headers pitfalls confirmed by Next.js docs; count-up timing confirmed by IntersectionObserver pattern analysis
- Animation patterns: MEDIUM — useReducedMotion API confirmed via WebSearch cross-reference; exact framer-motion 12 behavior verified against changelog

**Research date:** 2026-02-25
**Valid until:** 2026-05-25 (stable — Next.js 16 and framer-motion 12 are stable releases)
