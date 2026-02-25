# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-25)

**Core value:** Position Vivaz as the undisputed #1 manufacturer in clay target quality and sustainability, leveraging EU 2026 regulation as the proof point of 25 years of ecological leadership.
**Current focus:** Phase 1 - Foundation

## Current Position

Phase: 1 of 5 (Foundation)
Plan: 1 of 3 in current phase
Status: In progress
Last activity: 2026-02-25 — Completed 01-01 (typography, sanitization, design tokens)

Progress: [█░░░░░░░░░] 7%

## Performance Metrics

**Velocity:**
- Total plans completed: 1
- Average duration: 5 min
- Total execution time: 0.1 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 1/3 | 5 min | 5 min |

**Recent Trend:**
- Last 5 plans: 5 min
- Trend: -

*Updated after each plan completion*
| Phase 01-foundation P02 | 5 | 2 tasks | 12 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: Brownfield revision — preserve existing Next.js 16 + Directus 11 + Tailwind v4 stack
- [Init]: NATURA as premium flagship (0 mg/kg PAH), ECO STAR as performance line (<50 mg/kg PAH)
- [Init]: No Regular product line in v1 — pending client confirmation
- [01-01]: Used isomorphic-dompurify (not bare dompurify) — SSR-safe for Next.js App Router server components
- [01-01]: DOMPurify allowlist excludes img tag — Directus images rendered via assetUrl() helper only
- [01-01]: danger-light token uses full hex (#fef2f2) for Tailwind opacity modifier composability

### Pending Todos

None yet.

### Blockers/Concerns

- [Research flag]: @react-pdf/renderer React 19 peer dependency unverified — run `npm info @react-pdf/renderer peerDependencies` before Phase 2 PDF work. Fallback: static PDFs in Directus storage.
- [Research flag]: GDPR/cookie consent scope depends on whether analytics scripts will be deployed — confirm with client before Phase 3 vanilla-cookieconsent work.
- [Research flag]: Video hero (Phase 4) depends on whether Davide Carolis session produced video assets — confirm with client.
- [Research flag]: ISSF approval current status for NATURA must be confirmed before displaying ISSF badges on product pages.

## Session Continuity

Last session: 2026-02-25
Stopped at: Completed 01-01-PLAN.md — typography plugin, sanitization, design token manifest
Resume file: None
