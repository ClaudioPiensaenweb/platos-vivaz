---
phase: 07-home-page-redesign
plan: 05
subsystem: home-page
tags: [video-reels, component, i18n, vertical-layout]
dependency_graph:
  requires: []
  provides: [VideoReels component, home.videos.viewAll translations]
  affects: [home page videos section]
tech_stack:
  added: []
  patterns: [9:16 aspect ratio reel cards, placeholder empty state, external link open]
key_files:
  created:
    - frontend/src/components/home/VideoReels.tsx
  modified:
    - frontend/src/messages/es.json
    - frontend/src/messages/en.json
    - frontend/src/messages/fr.json
    - frontend/src/messages/de.json
decisions:
  - "VideoReels renders placeholder cards when videos array is empty — allows layout preview before real content added to Directus"
  - "VER TODOS LOS VIDEOS links to Instagram profile (https://www.instagram.com/vivaz_claytargets/) as inline video is deferred"
  - "Used <img> tag (not next/image) per client component pattern established in VideoSection"
metrics:
  duration: 2min
  completed: 2026-02-27
---

# Phase 7 Plan 05: VideoReels Component Summary

**One-liner:** Vertical 9:16 reel-style video section with 4-column grid, play overlays, Instagram "view all" link, and graceful placeholder empty state.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create VideoReels component | 546f337 | frontend/src/components/home/VideoReels.tsx |
| 2 | Add viewAll translation keys | db00683 | es.json, en.json, fr.json, de.json |

## What Was Built

### VideoReels Component (`frontend/src/components/home/VideoReels.tsx`)

New client component replacing the 4:3 landscape VideoSection layout with vertical reel-style cards:

- **Section background:** Dark green gradient `linear-gradient(180deg, #1a3a2a 0%, #1f4433 100%)` + topographic contour pattern overlay (matches VideoSection)
- **Section header:** `VIVAZ CLAY TARGETS` subtitle with accent decorative lines, title + "VER TODOS LOS VIDEOS" link aligned right on desktop / stacked on mobile
- **VER TODOS LOS VIDEOS link:** External `<a>` to `https://www.instagram.com/vivaz_claytargets/`, styled `text-accent` with hover to `text-warm-white`, includes arrow icon
- **Grid:** `grid-cols-2 lg:grid-cols-4` with `gap-4 lg:gap-6`
- **ReelCard:** `aspect-[9/16]` thumbnail, `<img>` tag with `assetUrl`, dark overlay, centered play button (`h-14 w-14 rounded-full bg-accent/90`), hover scale animation, `aria-label` accessibility
- **PlaceholderReelCard:** Muted 9:16 card with dimmed play overlay for empty state (4 placeholders rendered when `videos.length === 0`)
- **PlayIcon + ArrowIcon:** SVG sub-components

### Translation Keys

Added `home.videos.viewAll` to all 4 locales:
- es: "Ver todos los videos"
- en: "View all videos"
- fr: "Voir toutes les videos"
- de: "Alle Videos ansehen"

Existing `title` and `watchVideo` keys preserved.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- [x] `frontend/src/components/home/VideoReels.tsx` — FOUND
- [x] Commit 546f337 — FOUND (`feat(07-05): create VideoReels component with 9:16 vertical thumbnails`)
- [x] Commit db00683 — FOUND (`feat(07-05): add home.videos.viewAll translation key to all 4 locales`)
- [x] ESLint passes with no errors
- [x] All 4 locale viewAll keys verified via node script
