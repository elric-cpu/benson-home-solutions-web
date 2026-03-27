# Benson Home Solutions - Complete Project Map

**Last Updated:** March 26, 2026  
**Project Status:** Clean (230 committed files after legacy cleanup)

---

## 📄 Pages & Routes (17 Total)

### Core Pages
| Route | Title | Purpose |
|-------|-------|---------|
| `/` | Homepage | Primary entry with hero, services overview, stats, features |
| `/about` | About Page | Founder story, business philosophy, values |
| `/contact` | Contact Form | Lead capture for service inquiries |
| `/privacy` | Privacy Policy | Legal compliance page |

### Service Pages
| Route | Title | Purpose |
|-------|-------|---------|
| `/plans` | Maintenance Plans | Subscription offerings (residential, commercial, church) |
| `/methodology` | How We Work | Service delivery methodology, diagnostic process |
| `/emergency` | Emergency Response | 24/7 urgent damage response line and protocols |

### Blog
| Route | Title | Purpose |
|-------|-------|---------|
| `/blog` | Blog Hub | Content resource and article listing |
| `/blog/[slug]` | Blog Article | Dynamic article pages (e.g., deferred maintenance costs) |

### Geographic/Service Routes
| Route | Title | Purpose |
|-------|-------|---------|
| `/areas` | Service Areas | Map of all service regions and cities |
| `/areas/[city]` | City Services | City-specific service information (e.g., /areas/salem) |
| `/areas/[city]/[service]` | Service Page | Service-specific landing (e.g., /areas/salem/inspection-repairs) |

### Interactive Tools
| Route | Tool | Purpose |
|-------|------|---------|
| `/tools/cost-calculator` | Dry Rot Cost Calculator | Estimate deferred maintenance costs in Oregon |
| `/tools/cost-estimator` | 10-Year Reserve Estimator | Building reserve planning and liability estimation |
| `/tools/project-builder` | Interactive Project Builder | Line-by-line project cost estimation (powered by 1build) |

---

## 🗺️ Service Areas (10 Cities, 2 Regions)

### Mid-Willamette Valley (6 Cities)
- Albany
- Salem
- Keizer
- Corvallis
- Lebanon
- Sweet Home

### Harney County (4 Cities)
- Burns
- Hines
- Riley
- Drewsey

---

## 🔧 Services (6 Categories)

### 1. Inspection Repairs
- **Slug:** `inspection-repairs`
- **Description:** FHA, VA, appraisal-required, and buyer-requested repairs
- **Key Work:** Clear scopes, documentation, contractor-grade follow-through
- **Keywords:** Post-inspection repairs, FHA repairs, VA lender repairs

### 2. Property Preservation
- **Slug:** `property-preservation`
- **Description:** Property security and maintenance during vacancy
- **Key Work:** Board-ups, lock changes, winterization, site checks
- **Keywords:** Vacant property maintenance, security, preservation

### 3. Water, Mold & Moisture
- **Slug:** `water-mold-moisture`
- **Description:** Water damage restoration and mold mitigation
- **Key Work:** Dry-out, mitigation, documentation, repair
- **Keywords:** Water damage restoration, mold mitigation, moisture control

### 4. Energy & Weatherization
- **Slug:** `energy-weatherization`
- **Description:** Building envelope improvements and efficiency work
- **Key Work:** Air sealing, attic insulation, weatherization
- **Keywords:** Air sealing, insulation, weatherization, energy efficiency

### 5. Windows, Doors & Site Repairs
- **Slug:** `windows-doors-site-repair`
- **Description:** Window/door replacements and exterior site work
- **Key Work:** Window replacement, door repair, drainage, demolition
- **Keywords:** Window replacement, door repair, site repairs

### 6. Emergency Response
- **Slug:** `emergency-response`
- **Description:** Rapid response to urgent damage and failures
- **Key Work:** Property securing, damage documentation, rapid repair
- **Keywords:** Emergency repair, board up, urgent water damage

---

## 🧩 React Components (18 Total)

### Layout Components (3)
- `Header.tsx` - Main navigation bar
- `Footer.tsx` - Site footer with links and info
- `MobileNav.tsx` - Mobile menu/hamburger navigation

### UI Primitive Components (6)
- `Badge.tsx` - Small label badges
- `Button.tsx` - CTA and action buttons
- `Card.tsx` - Content card container
- `Container.tsx` - Layout width constraint wrapper
- `Input.tsx` - Form input field
- `Section.tsx` - Page section wrapper with variant support

### Content Components (2)
- `FAQSection.tsx` - Frequently asked questions display
- `StatsSection.tsx` - Statistics and metrics showcase

### Domain-Specific Components (3)
- `AIChat.tsx` - Conversational AI chat interface
- `PropertyCard.tsx` - Property information display card
- `PlanBuilder.tsx` - Maintenance plan selection and configuration

### SEO Components (4)
- `BreadcrumbJsonLd.tsx` - Breadcrumb structured data
- `LocalBusinessJsonLd.tsx` - Local business schema markup
- `ServiceJsonLd.tsx` - Service offering schema
- `WebPageJsonLd.tsx` - Generic webpage schema

### Page-Specific Client Components (5)
- `PlansPageClient.tsx` - Plans page interactive UI
- `ContactPageClient.tsx` - Contact form logic and validation
- `RotRiskSimulator.tsx` - Dry rot cost calculator
- `AssetLifecyclePlanner.tsx` - 10-year reserve planner
- `ProjectBuilderClient.tsx` - Interactive project builder UI

---

## 🎨 Hero Sections (4 Main Pages)

### Homepage Hero
```
Badge: "Oregon CCB #258533"
Headline: "Post-inspection repairs in Oregon."
Subheadline: "Water, moisture, and maintenance handled right."
Body: "We handle FHA and VA repair lists, buyer punch lists, water damage, 
       mold mitigation, air sealing, attic insulation, and the maintenance 
       work that keeps Oregon properties from sliding into bigger problems."
Primary CTA: "Start a Repair Request" → /contact?service=Inspection%20Repairs
Secondary CTA: "See Maintenance Plans" → /plans
Trust Element: "Trusted by Oregon property owners and facilities teams" (star avatars)
Color Scheme: Cream background, oxblood (maroon) text
```

### About Page Hero
```
Badge: "A Note from Our Founder"
Headline: "I got tired of seeing small problems turn into rebuilds."
Subheadline: "small problems turn into rebuilds."
Body: "I started Benson Home Solutions to handle the work people actually need done: 
       post-inspection repairs, lender-required corrections, water and mold problems, 
       lock changes, board-ups, weatherization, and the maintenance that keeps 
       properties out of trouble."
Color Scheme: Cream background, oxblood text
Focus: Founder authenticity and philosophy
```

### Emergency Page Hero
```
Badge: "Urgent Response Team" (animated pulse)
Headline: "Stay Calm. We're on the way."
Subheadline: "We're on the way."
Body: "If there is active damage or the property needs to be secured, call now. 
       No form wall, no answering service, no waiting around for a callback."
Primary CTA: "Call Now: (541) 413-0480" (phone link, prominent)
Color Scheme: Dark maroon/oxblood background, cream text
Urgency Indicators: Pulsing badge, red/urgent styling
```

### Methodology Page Hero
```
Badge: "How We Work"
Headline: "We Don't Guess. We Measure."
Subheadline: "We Measure."
Body: "We are not selling inspections. We are using real measurements and 
       field documentation to scope repairs, protect properties, and keep 
       small failures from turning into expensive rebuilds."
Color Scheme: Dark oxblood background, cream text
Focus: Technical credibility and diagnostic rigor
```

### Homepage Mid-Page Hero (Social Proof)
```
Quote: "Send the list, send the photos, text me the address. We'll figure out 
        what failed, what it takes to fix it right, and what can wait."
Attribution: Elric Benson, Owner
Color Scheme: Cream background with oxblood quote and attribution
Icon: Quote mark icon
```

---

## 🔌 API Routes (9 Total)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/contact` | POST | Receive and process contact/lead forms |
| `/api/chat` | POST | AI chatbot conversation endpoint |
| `/api/services` | GET | List available services and categories |
| `/api/agreements/recommend` | POST | AI-powered agreement recommendations |
| `/api/enrich` | POST | Property data enrichment (address, property info) |
| `/api/ai/audit` | POST | AI-powered SEO and site audit |
| `/api/ai/marketing` | POST | AI marketing copy generation |
| `/api/ops/seo-watchdog` | GET | SEO monitoring and alerts |
| `/api/webhooks/notion` | POST | Notion database sync webhooks |

---

## 📚 Data & Resources

### Constants (`src/lib/constants.ts`)
- Business information (owner: Elric Benson, CCB #258533)
- Phone numbers (emergency and main)
- Service areas (midWillametteValley, harneyCounty)
- Services catalog with descriptions and keywords
- File upload limits (3.75 MB)

### Blog Data (`src/lib/blog-data.ts`)
**Published Articles:**
- "The True Cost of Deferred Maintenance in Oregon: A Data-Driven Analysis"
  - Author: Elric Benson
  - Date: 2026-03-25
  - Covers: Roof leaks, gutter failures, HVAC neglect
  - Includes: Cost escalation examples and proactive maintenance benefits

### Area Data (`src/lib/area-data.ts`)
- City-by-city service configuration
- Dynamic landing page content
- Service availability by region

### Pricing Data (`src/lib/maintenance-pricing.ts`)
- Residential maintenance plans
- Commercial facility plans
- Church/nonprofit plans
- Annual and monthly pricing tiers

### Services Data (`src/lib/services-data.ts`)
- Service category details
- Service-specific page content
- Keywords and SEO optimization

### Other Resources
- Genkit AI integration (`src/lib/genkit.ts`)
- Marketing orchestration (`src/lib/marketing-orchestrator.ts`)
- Google Cloud integration (address, auth, email, storage, logging)
- PandaDoc document generation
- Notion MCP server integration

---

## 🖼️ Static Assets (Public)

### Hero/Generated Images (7 Images)
- `hero-kitchen.png` - Kitchen repair/remodel
- `hero-bathroom.png` - Bathroom work
- `hero-exterior.png` - Exterior repairs
- `hero-water-damage-after.png` - Water remediation
- `hero-mobile-home.png` - Mobile home service
- `service-windows-doors.png` - Window/door service illustration
- `service-demolition.png` - Demolition work
- `service-mold-remediation.png` - Mold mitigation

### Project Gallery (4 Images, Before/During/After)
- `project-kitchen/before.png`
- `project-kitchen/during.png`
- `project-kitchen/after_01.png`
- `project-kitchen/after_02.png`

### Social Media Images (11 Images)
- `from_facebook/image_0.jpg` through `image_10.jpg`
- Sourced from Facebook/social channels

### Video Asset
- `background_video.mp4` - Site background/hero video

### Favicon
- `favicon.svg` - Site icon

---

## 🎯 Key UI Patterns & Styling

### Brand Colors
- **Oxblood (Maroon):** `#8B3A3A` - Primary brand color
- **Cream:** `#F5EFE7` - Light background and accents
- **Slate:** `#475569` - Body text
- **Red-600:** Emergency/urgent elements

### Typography
- **Headings:** Font weight 900, uppercase, tight tracking, large sizes (4xl-7xl)
- **Body Text:** Font weight 500 (medium), relaxed leading (1.6-1.8)
- **CTA/Links:** Uppercase, wide letter spacing (`tracking-widest`), font weight 900

### Interactive Elements
- Hover effects on service cards (animated bar expansion)
- Button scale transitions on active/click (`active:scale-95`)
- Border and opacity transitions on links
- Pulsing animations on urgent badges

### Responsive Breakpoints
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)

---

## 🏗️ Architecture Overview

### Framework & Tech Stack
- **Frontend:** Next.js 15 with App Router
- **UI Framework:** React with TypeScript
- **Styling:** Tailwind CSS
- **ORM:** Drizzle (TypeScript ORM)
- **Database:** Supabase (PostgreSQL)
- **AI:** Genkit (Google AI framework)
- **CMS/Backend:** Notion MCP integration

### File Organization
- `src/app/` - Next.js pages and layouts (17 routes)
- `src/components/` - React components (18 total)
- `src/lib/` - Utilities, data, business logic (23 files)
- `src/hooks/` - Custom React hooks
- `drizzle/` - Database migrations (6 SQL files)
- `supabase/` - Supabase migrations (9 SQL files)
- `tests/` - Playwright E2E tests (1 file)
- `public/` - Static assets and images
- `scripts/` - Admin and utility scripts (9 files)
- `docs/` - Documentation and operations manuals (23 files)

### Source Code Statistics
- **17 Pages/Routes**
- **18 React Components**
- **9 API Endpoints**
- **6 Service Categories**
- **10 Geographic Cities**
- **3 Interactive Tools**
- **81 TypeScript/React Files**
- **230 Total Committed Files**

---

## 📊 Content Structure

### Landing Pages (Task-Based)
1. **Homepage** - "What can we do for you?"
2. **Service Pages** - "Here's what we do in [City]"
3. **Tool Pages** - "Estimate your costs"
4. **About Page** - "Who we are and why we do this"
5. **Contact** - "Tell us what you need"

### Content Hierarchy
- **Hero/Answer Section** - First thing visible (search intent match)
- **Problem/Solution** - Why the visitor is here
- **Process/Methodology** - How we work
- **CTA/Next Step** - What to do now
- **Trust Elements** - Why trust Benson Home Solutions (credentials, philosophy)

---

## ✅ Map Verification Checklist

- [x] All 17 pages/routes mapped
- [x] All 6 services listed with details
- [x] All 10 cities documented
- [x] All 18 components documented with categories
- [x] All 4 hero sections with full copy and CTAs
- [x] All 9 API endpoints listed
- [x] All static assets catalogued
- [x] Brand colors and UI patterns documented
- [x] Architecture and tech stack documented
- [x] Data resources and files identified

---

**This map represents the complete, production-ready Benson Home Solutions website after legacy cleanup on March 26, 2026.**
