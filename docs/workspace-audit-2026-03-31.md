# Workspace Audit - 2026-03-31

## Scope
Recursive inventory of the workspace focused on:
- Pages and routes
- Components
- API routes and backend flows
- Core libraries and data modules
- Scripts/automation
- Media/resources
- Stub/placeholder/incomplete work
- Performance and structure improvement targets

## Workspace footprint
- Total tracked project files (`rg --files`): 310
- Dominant disk usage:
  - `node_modules`: ~3.9G
  - `benson-genkit-backend`: ~1.1G (mostly `functions/node_modules`)
  - `.next`: ~719M
  - `.git`: ~94M
  - `public`: ~30M

## Route map (App Router)
| Route | File | Mode | Metadata | Status |
|---|---|---|---|---|
| `/` | `src/app/page.tsx` | server | no | complete, needs optimization |
| `/about` | `src/app/about/page.tsx` | server | yes | complete |
| `/areas` | `src/app/areas/page.tsx` | server | yes | complete |
| `/areas/[slug]` | `src/app/areas/[slug]/page.tsx` | server | yes | complete |
| `/blog` | `src/app/blog/page.tsx` | server | yes | complete |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | server | yes | complete, static-content-backed |
| `/calculator` | `src/app/calculator/page.tsx` | client | no | in-progress (simulated output) |
| `/compare/homesmiles` | `src/app/compare/homesmiles/page.tsx` | server | yes | complete |
| `/compare/kaufmans-home-maintenance` | `src/app/compare/kaufmans-home-maintenance/page.tsx` | server | yes | complete |
| `/contact` | `src/app/contact/page.tsx` | client | no | complete, heavy client page |
| `/emergency` | `src/app/emergency/page.tsx` | server | yes | complete |
| `/methodology` | `src/app/methodology/page.tsx` | server | yes | complete |
| `/privacy` | `src/app/privacy/page.tsx` | server | yes | complete |
| `/projects` | `src/app/projects/page.tsx` | server | yes | placeholder/in-progress |
| `/services` | `src/app/services/page.tsx` | server | yes | complete |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx` | server | yes | complete, CMS-driven |
| `/services/bathroom-remodeling` | `src/app/services/bathroom-remodeling/page.tsx` | server | no | redirect-only, incomplete content |
| `/services/demolition` | `src/app/services/demolition/page.tsx` | server | yes | complete |
| `/services/kitchen-remodeling` | `src/app/services/kitchen-remodeling/page.tsx` | server | yes | complete |
| `/services/maintenance-subscriptions` | `src/app/services/maintenance-subscriptions/page.tsx` | server | yes | complete, large file |
| `/services/mold-remediation` | `src/app/services/mold-remediation/page.tsx` | server | yes | complete |
| `/services/roof-maintenance` | `src/app/services/roof-maintenance/page.tsx` | server | yes | complete, large file |
| `/services/sitework` | `src/app/services/sitework/page.tsx` | server | yes | complete |
| `/services/tenant-services` | `src/app/services/tenant-services/page.tsx` | server | yes | complete |
| `/services/water-damage` | `src/app/services/water-damage/page.tsx` | server | yes | complete |
| `/services/windows-doors` | `src/app/services/windows-doors/page.tsx` | server | yes | complete |
| `/tools` | `src/app/tools/page.tsx` | server | yes | complete |
| `/tools/cost-calculator` | `src/app/tools/cost-calculator/page.tsx` | client | no | complete, heavy client page |
| `/tools/cost-estimator` | `src/app/tools/cost-estimator/page.tsx` | client | no | complete, heavy client page |

## API route map
| Route | File | Status |
|---|---|---|
| `/api/agreements/recommend` | `src/app/api/agreements/recommend/route.ts` | demo fallback if key missing |
| `/api/ai/audit` | `src/app/api/ai/audit/route.ts` | active |
| `/api/ai/marketing` | `src/app/api/ai/marketing/route.ts` | active, cron-secured path |
| `/api/chat` | `src/app/api/chat/route.ts` | demo fallback if key missing |
| `/api/contact` | `src/app/api/contact/route.ts` | active, rate-limited |
| `/api/draft-mode/disable` | `src/app/api/draft-mode/disable/route.ts` | active |
| `/api/draft-mode/enable` | `src/app/api/draft-mode/enable/route.ts` | active |
| `/api/estimator` | `src/app/api/estimator/route.ts` | demo fallback if key missing |

## Component map
### Layout components
- `src/components/layout/Header.tsx` (client)
- `src/components/layout/MobileNav.tsx` (client)
- `src/components/layout/Footer.tsx` (server)

### Content components
- `src/components/content/FAQSection.tsx` (server, Sanity-backed with fallback FAQs)
- `src/components/content/StatsSection.tsx` (server)
- `src/components/content/PortableText.tsx` (client renderer)

### Interactive/components
- `src/components/AIChat.tsx` (client, mounted globally in root layout)
- `src/components/forms/Captcha.tsx` (client)
- `src/components/PropertyCard.tsx` (client, currently unused/orphaned)

### UI primitives
- `src/components/ui/Badge.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Container.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Section.tsx`

## Core library and data map
### AI and orchestration
- `src/lib/genkit.ts` - backend flow execution wrapper
- `src/lib/genkit-node.ts` - Genkit bootstrap (currently causes build failure)
- `src/lib/ai/vector-service.ts` - Pinecone upsert/query

### Content and locality
- `src/lib/areas.ts` - large static area dataset (major content surface)
- `src/lib/blog.ts` - hardcoded blog post corpus
- `src/sanity/lib/client.ts` - Sanity client with placeholder-safe fallback
- `src/sanity/lib/queries.ts` - GROQ query definitions

### Business logic and integrations
- `src/lib/agreements/signatures.ts` - PandaDoc integration with mock fallback
- `src/lib/resend.ts` - Resend client
- `src/lib/ratelimit.ts` - Upstash rate limiting
- `src/lib/db/index.ts`, `src/lib/db/schema.ts` - DB layer
- `src/lib/gcloud/*` - auth/address/storage/logging wrappers

## Backend functions map (`benson-genkit-backend/functions/src`)
- Flows:
  - `flows/address.ts`
  - `flows/chat.ts`
  - `flows/departments.ts`
  - `flows/estimator.ts`
  - `flows/marketingContentFlow.ts` (video placeholder URL currently used)
  - `flows/seo.ts`
  - `flows/setup.ts`
  - `flows/support.ts`
- Tools/config:
  - `addressTool.ts`
  - `gscTool.ts` (returns mock data when creds are missing)
  - `tools.ts`
  - `schemas.ts`
  - `genkit-config.ts`
  - `index.ts`

## Automation and script map (`scripts/`)
### Content/media automation
- `generate-media-plan.ts`
- `generate-media-requests.ts`
- `generate-media-prompts.ts`
- `generate-media.ts`
- `manual-media-generation.ts`
- `generate-facebook-content-vertex.ts`
- `process-facebook-content.ts`
- `generate-facebook-content.py`
- `download_facebook_images.py`
- `scrape_facebook.py`

### Infra/ops/testing
- `validate-env.ts`
- `validate-lines.ts`
- `setup-database.ts`
- `db-seed.ts`
- `test-all-gcloud.ts`
- `test-genkit-intelligence.ts`
- `test-rag.ts`
- `test-deployment.ts`
- `prod-performance-check.ts`
- `take-screenshot.ts`
- `prepare-hostinger-nextjs.sh`
- `export_hostinger_env.ts`

### Orchestration
- `agent-router.ts`
- `autonomous-marketing-loop.ts`
- `run-campaign.ts`
- `generate-deep-plan.ts`

## Resources/media map
### High-size assets (priority optimization)
- `public/videos/background_video.mp4` (~6.0 MB)
- `public/images/generated/*.png` (many files ~1.4-2.6 MB each)
- `public/images/fb-post-1.png`, `fb-post-2.png`, `fb-post-3.png` (~1.4-1.8 MB)

### Invalid/broken media files
- `public/images/from_facebook/image_*.jpg` are 12-byte ASCII placeholders, not valid JPEG binaries.

### Referenced local media in app code
- Explicit OG image in `src/app/layout.tsx` (`/images/generated/hero-exterior.png`)
- Most generated local assets are not currently referenced in route components.

## Code blocks and implementation status map
### Production-ready patterns
- Contact ingestion + DB insert + optional email: `src/app/api/contact/route.ts`
- Dynamic services from Sanity: `src/app/services/[slug]/page.tsx`
- FAQ schema injection: `src/components/content/FAQSection.tsx`

### Demo/stub/fallback patterns still present
- Chat demo response: `src/app/api/chat/route.ts`
- Estimator demo response: `src/app/api/estimator/route.ts`
- Agreement recommendation demo response: `src/app/api/agreements/recommend/route.ts`
- PandaDoc mock signing links: `src/lib/agreements/signatures.ts`
- GSC mock return path: `benson-genkit-backend/functions/src/gscTool.ts`
- Video placeholder URL: `benson-genkit-backend/functions/src/flows/marketingContentFlow.ts`

### Incomplete/started-not-finished surfaces
- Projects gallery placeholder: `src/app/projects/page.tsx`
- Bathroom page is only a redirect: `src/app/services/bathroom-remodeling/page.tsx`
- Legacy calculator route is simulated UI: `src/app/calculator/page.tsx`
- Media planning docs are partially generated but mostly empty prompt arrays:
  - `docs/MEDIA_PLAN.json`
  - `docs/MEDIA_REQUESTS.json`

## Structural cleanup candidates
- Remove or integrate unused `src/components/PropertyCard.tsx`.
- Consolidate duplicate calculator experiences:
  - `/calculator`
  - `/tools/cost-calculator`
- Decompose oversized client pages (`contact`, `tools/cost-*`, `calculator`) into smaller lazy-loaded sections.
- Move global `AIChat` to dynamic import/intent-based mount.
- Normalize backend build outputs (`functions/lib` vs `functions/lib/src`) to one artifact strategy.
- Exclude transient logs/artifacts from repo (`firebase-debug.log`, generated debug files).

## Performance improvement candidates
- Convert large PNGs to modern formats (WebP/AVIF) and right-size dimensions.
- Remove/replace unused heavy media from `public/`.
- Avoid global hydration for optional widgets (chat).
- Re-run build after fixing Genkit import and capture route-level JS budget.

## Security and reliability notes
- Critical: remove committed service account key material and rotate credentials immediately.
- Build blocker: `src/lib/genkit-node.ts` import from `@genkit-ai/core` currently fails type check.

## Immediate action backlog
1. Rotate exposed credentials and purge key material from git history.
2. Fix `src/lib/genkit-node.ts` build error and recover production build output.
3. Remove demo-mode API responses and enforce explicit configuration errors + observability.
4. Complete or remove placeholder/redirect-only user-facing routes.
5. Finalize media generation plan and replace invalid placeholder image files.
6. Execute performance pass on heavy client pages and global chat mount.

