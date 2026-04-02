# 2026-04-01 Roundtable Debrief

## Mara Voss — Growth Director
- Authority expansion is premature while calculator intent is split and project proof is weak.
- Do not add more pages before the proof surface and canonical calculator path are fixed.
- Decision: `defer`

## Cal Rowan — Engineering Director
- The build passing does not matter enough. The backend still carries a live credential and broken contract assumptions.
- The current AI/contact stack is not structurally safe to ship.
- Decision: `block`

## Iris Vale — QA Director
- Demo-mode in production paths is a release disqualifier.
- Contact submissions that can fail on missing optional infrastructure are a release disqualifier.
- Decision: `block`

## Silas Wren — Search Dominance Lead
- `/calculator` and `/tools/cost-calculator` compete for the same intent and split internal equity.
- The projects page advertises proof but delivers a holding page.
- Decision: `test`

## Rook Mercer — Content Production Lead
- Content capacity is not the bottleneck. Proof assets are.
- Draft only two assets next: a project proof batch and calculator consolidation copy.
- Decision: `accept`

## Nadia Kade — Platform Engineering Lead
- Fix the AI and contact path before any growth work.
- Global AIChat should not hydrate the whole site by default.
- Decision: `block`

## Gideon Pike — Verification and Release Lead
- Four blockers are enough to hold the line: secret exposure, contract drift, demo paths, contact-path failure risk.
- Nothing ships until all four are cleared with evidence.
- Decision: `block`

## Tess Armitage — Analytics and Experimentation Lead
- Analytics is not strong enough to auto-rank work yet.
- Use the manual simulation board for this wave and tighten instrumentation after the blockers are gone.
- Decision: `defer`

## Agreed Plan
1. Execute the blocker wave first: `SIM-01` through `SIM-04`.
2. Run build plus targeted API verification again.
3. Then address IA/proof/performance items: `SIM-05` through `SIM-08`.
4. Only after that reopen content expansion and experiment work.
