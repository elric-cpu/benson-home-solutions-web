# Remediation Board

Date: 2026-03-31
Decision mode: Executive board
Release stance: Blocked

## 1. Release Blockers

| ID | Item | Severity | Impact | Effort | Release impact |
|---|---|---|---|---|---|
| RB-01 | Rotate and remove committed service-account key | critical | security, trust, deployment hygiene | medium | block |
| RB-02 | Fix broken build in `src/lib/genkit-node.ts` | critical | deployability, verification, performance work | low | block |
| RB-03 | Remove production demo/stub behavior across APIs and integrations | critical | trust, correctness, ops reliability | medium | block |
| RB-04 | Remove invalid placeholder media files from active asset set | high | content integrity, media pipeline | low | block |

## 2. High-Leverage Authority Wins

| ID | Item | Severity | Impact | Effort | Release impact |
|---|---|---|---|---|---|
| HL-01 | Build out `/projects` from placeholder to proof-of-work authority page | high | GEO, trust, conversion | medium | review |
| HL-02 | Replace bathroom redirect with a real service asset or remove route | high | topical authority, UX clarity | medium | review |
| HL-03 | Complete media plan and wire generated assets to real pages | high | authority, trust, click-through | medium | review |
| HL-04 | Clean metadata and page-priority alignment around calculator and compare routes | medium | search clarity, funnel direction | low | review |

## 3. Structural Fixes

| ID | Item | Severity | Impact | Effort | Release impact |
|---|---|---|---|---|---|
| SF-01 | Consolidate duplicate calculator experience | high | IA clarity, authority consolidation | medium | review |
| SF-02 | Move global `AIChat` to dynamic or route-scoped loading | high | performance, hydration weight | medium | review |
| SF-03 | Split oversized client pages and reduce interactive surface | high | CWV, maintainability | medium | review |
| SF-04 | Remove orphaned components and unused assets | medium | maintainability, payload control | low | review |
| SF-05 | Normalize backend function artifacts and reduce workspace bloat | medium | ops hygiene, repo health | medium | review |

## 4. Buildout Backlog

| ID | Item | Severity | Impact | Effort | Release impact |
|---|---|---|---|---|---|
| BB-01 | Expand project proof, case-study, and visual evidence layer | medium | trust, local authority | medium | none |
| BB-02 | Deepen area and comparison coverage after structural cleanup | medium | GEO/AEO growth | medium | none |
| BB-03 | Add machine-driven experiment registry and stronger analytics outputs | medium | controlled iteration | medium | none |

## 5. Long-Tail Cleanup

| ID | Item | Severity | Impact | Effort | Release impact |
|---|---|---|---|---|---|
| LT-01 | Tighten ESLint/type noise not currently blocking release | low | developer signal quality | low | none |
| LT-02 | Prune legacy docs/artifacts after office migration stabilizes | low | repo hygiene | low | none |
