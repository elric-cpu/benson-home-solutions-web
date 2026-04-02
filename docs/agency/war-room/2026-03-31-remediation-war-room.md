# Remediation War Room

Date: 2026-03-31
Execution mode: Single approved wave
Ordering model: Business impact first

## Work Items

### RB-01

- Title: Rotate and remove committed service-account key
- Workstream owner: `platform_engineering`
- Supporting agents: `Cal Rowan`, `Nadia Kade`, `Gideon Pike`
- Asset targets:
  - `benson-genkit-31726-f661784b7733.json`
  - git history and secret references
- Problem statement: live private key material is committed in the repo
- Evidence: file contains `private_key` and full service account blob
- Proposed fix: rotate key, remove file from tracked state, scrub from history, replace with env-driven credential loading
- Dependency IDs: []
- Risk if delayed: immediate credential abuse risk
- Release gate: `blocked_engineering`, `blocked_qa`
- Machine queue target: `queues/engineering-fixes.json`

### RB-02

- Title: Repair broken production build
- Workstream owner: `platform_engineering`
- Supporting agents: `Nadia Kade`, `Dax Flint`, `Gideon Pike`
- Asset targets:
  - `src/lib/genkit-node.ts`
- Problem statement: `next build` fails on invalid `configureGenkit` import from `@genkit-ai/core`
- Evidence: verified by `pnpm run build`
- Proposed fix: align Genkit bootstrap with installed API surface or remove dead module if unused
- Dependency IDs: []
- Risk if delayed: no trustworthy production verification path
- Release gate: `blocked_engineering`, `blocked_qa`
- Machine queue target: `queues/engineering-fixes.json`

### RB-03

- Title: Remove production demo and stub behavior
- Workstream owner: `platform_engineering`
- Supporting agents: `Mara Voss`, `Nadia Kade`, `Gideon Pike`, `Tess Armitage`
- Asset targets:
  - `src/app/api/chat/route.ts`
  - `src/app/api/estimator/route.ts`
  - `src/app/api/agreements/recommend/route.ts`
  - `src/lib/agreements/signatures.ts`
  - `benson-genkit-backend/functions/src/gscTool.ts`
  - `benson-genkit-backend/functions/src/flows/marketingContentFlow.ts`
- Problem statement: missing credentials silently degrade to fake success paths
- Evidence: explicit `demo-mode`, `mock-`, and placeholder video URL verified in source
- Proposed fix: replace silent fallbacks with explicit degraded-state handling, observability, and proper integration readiness rules
- Dependency IDs: []
- Risk if delayed: false confidence, corrupted QA, bad customer experience
- Release gate: `blocked_engineering`, `blocked_qa`
- Machine queue target: `queues/engineering-fixes.json`

### RB-04

- Title: Remove invalid placeholder media from active inventory
- Workstream owner: `content_production`
- Supporting agents: `Rook Mercer`, `Brooke Halstead` 
- Asset targets:
  - `public/images/from_facebook/*.jpg`
  - `docs/MEDIA_PLAN.json`
- Problem statement: fake image files and incomplete media planning pollute the content pipeline
- Evidence: files are 12-byte ASCII text, not valid JPEGs; media plan includes `No description found.`
- Proposed fix: purge invalid assets, regenerate requests, and replace with valid media or remove references
- Dependency IDs: []
- Risk if delayed: broken trust and media workflow contamination
- Release gate: `blocked_growth`, `blocked_qa`
- Machine queue target: `queues/media-requests.json`

### HL-01

- Title: Replace placeholder projects page with real authority asset
- Workstream owner: `content_production`
- Supporting agents: `Mara Voss`, `Rook Mercer`, `Vale Mercer`
- Asset targets:
  - `src/app/projects/page.tsx`
- Problem statement: route exists but signals incompleteness instead of proof
- Evidence: “Gallery Under Restoration” live placeholder
- Proposed fix: convert into case-study and documented project proof page with image and outcome structure
- Dependency IDs: [RB-04]
- Risk if delayed: weak trust and poor conversion support
- Release gate: `approved_growth`
- Machine queue target: `queues/publish-candidates.json`

### HL-02

- Title: Replace bathroom redirect-only route with a real decision
- Workstream owner: `search_dominance`
- Supporting agents: `Silas Wren`, `Rook Mercer`, `Nadia Kade`
- Asset targets:
  - `src/app/services/bathroom-remodeling/page.tsx`
- Problem statement: existing route has no standalone value and leaks topical ambiguity
- Evidence: route only redirects to kitchen remodeling
- Proposed fix: either create a proper bathroom service page or fold the route out of the IA
- Dependency IDs: []
- Risk if delayed: diluted authority and confusing search signal
- Release gate: `approved_growth`, `approved_engineering`
- Machine queue target: `queues/content-opportunities.json`

### SF-01

- Title: Consolidate calculator surfaces
- Workstream owner: `platform_engineering`
- Supporting agents: `Silas Wren`, `Tess Armitage`, `Dax Flint`
- Asset targets:
  - `/calculator`
  - `/tools/cost-calculator`
  - links from compare pages and footer
- Problem statement: duplicate calculator experiences split intent, links, and maintenance
- Evidence: both routes exist and are linked from different entry points
- Proposed fix: choose one canonical experience and redirect or reposition the other
- Dependency IDs: [RB-02]
- Risk if delayed: diluted search and funnel performance
- Release gate: `approved_growth`, `approved_engineering`
- Machine queue target: `queues/engineering-fixes.json`

### SF-02

- Title: Remove site-wide chat hydration tax
- Workstream owner: `platform_engineering`
- Supporting agents: `Dax Flint`, `Gideon Pike`
- Asset targets:
  - `src/app/layout.tsx`
  - `src/components/AIChat.tsx`
- Problem statement: optional chat is mounted globally
- Evidence: `AIChat` imported and rendered directly in root layout
- Proposed fix: route-scope or dynamically load chat behind user intent
- Dependency IDs: [RB-02]
- Risk if delayed: unnecessary performance overhead on all routes
- Release gate: `approved_engineering`, `approved_qa`
- Machine queue target: `queues/engineering-fixes.json`

### SF-03

- Title: Reduce oversized client page complexity
- Workstream owner: `platform_engineering`
- Supporting agents: `Nadia Kade`, `Dax Flint`, `Petra North`
- Asset targets:
  - `src/app/contact/page.tsx`
  - `src/app/tools/cost-calculator/page.tsx`
  - `src/app/tools/cost-estimator/page.tsx`
  - `src/app/calculator/page.tsx`
- Problem statement: large client components concentrate risk and hydration cost
- Evidence: files range from 119 to 342 lines and combine UI, state, and flow logic
- Proposed fix: split into smaller sections, isolate client-only logic, and simplify rendered payload
- Dependency IDs: [RB-02]
- Risk if delayed: slower iteration and poorer runtime performance
- Release gate: `approved_engineering`, `approved_qa`
- Machine queue target: `queues/engineering-fixes.json`

### SF-04

- Title: Prune orphaned components and unused assets
- Workstream owner: `platform_engineering`
- Supporting agents: `Nadia Kade`, `Rook Mercer`
- Asset targets:
  - `src/components/PropertyCard.tsx`
  - large unused `public/images/generated/*`
- Problem statement: unused surfaces create maintenance debt and asset waste
- Evidence: `PropertyCard` has no imports; many large images are not referenced in route code
- Proposed fix: remove, repurpose, or explicitly wire assets to a destination
- Dependency IDs: [RB-04]
- Risk if delayed: dead weight and operator confusion
- Release gate: `approved_engineering`
- Machine queue target: `queues/engineering-fixes.json`

### SF-05

- Title: Normalize backend function artifact strategy
- Workstream owner: `platform_engineering`
- Supporting agents: `Cal Rowan`, `Soren Beck`
- Asset targets:
  - `benson-genkit-backend/functions/lib`
  - `benson-genkit-backend/functions/lib/src`
  - `benson-genkit-backend/functions/node_modules`
- Problem statement: oversized backend workspace and duplicate compiled output trees
- Evidence: `functions` directory is ~1.1G and includes duplicate artifact structures
- Proposed fix: standardize build output, trim committed artifacts, and re-scope what belongs in the repo
- Dependency IDs: [RB-02]
- Risk if delayed: repo bloat, slower audits, harder deploy hygiene
- Release gate: `approved_engineering`
- Machine queue target: `queues/engineering-fixes.json`
