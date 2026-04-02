# Benson Home Solutions Web Platform

A production-grade Next.js application for Benson Home Solutions, a general contractor specializing in maintenance-first subscription programs in the Mid-Willamette Valley and Harney County, Oregon.

## 🚀 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS
- **Platform Mandate:** Google-first architecture for AI, communications, and operational storage
- **AI:** Google AI / Gemini-family models only for website AI, chatbot, and media generation
- **Auth for AI / Google Services:** GCloud JSON service account and/or Google Workspace-managed access
- **Communications & Storage:** Google Workspace + Google Cloud Storage buckets
- **Database:** Drizzle ORM-backed application data layer
- **Lead Capture:** HubSpot CRM Integration
- **Email / Calendar / Contacts:** Google Workspace

## 🏗️ Architecture

### 1. Component System (`src/components`)
- `ui`: Atomic, reusable UI elements (Buttons, Cards, Inputs).
- `layout`: Structural components (Header, Footer, Navigation).
- `content`: Feature-specific components (Homepage sections, Portable Text renderers).

### 2. Logic Layer (`src/lib`)
- `ai`: Google AI-powered prompt execution, retrieval, and application intelligence.
- `gcloud`: Google auth, storage, logging, and platform integrations.
- `crm`: Lead synchronization with HubSpot.
- `db`: Database schema definitions and Drizzle client.
- `email`: Google Workspace-aligned transactional and notification utilities.
- `notion`: Bidirectional sync between Notion internal SOPs and production database.

### 3. Tool Suite (`src/app/tools`)
- **True Cost Calculator:** Address-based homeownership cost projection.
- **Maintenance Configurator:** Personalized service package builder.

## 🛠️ Development

### Setup
1. Clone the repository.
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env.local` and fill in required keys.
4. Run development server: `pnpm dev`

### AI Runtime Flags
- `ENABLE_MULTI_AGENT=true`: Enables office-style multi-agent routing for server-side chat handling. This repo now defaults to enabled unless explicitly set to `false`.
- `NEXT_PUBLIC_ENABLE_MULTI_AGENT=true`: Mirrors the multi-agent state into the client so the chat UI can label and request office mode. This repo now defaults to enabled unless explicitly set to `false`.

### Core Scripts
- `pnpm build`: Production build with type checking and linting.
- `pnpm lint`: ESLint code quality audit.
- `pnpm test`: Playwright E2E and accessibility testing.
- `pnpm seed:pinecone`: Index the Notion knowledge base into Pinecone.

## ⚖️ Compliance & Standards
- CCB License: #258533
- ADA/WCAG 2.1 AA compliant.
- GDPR/TCPA lead capture protocols.
- Non-Google primary AI, chatbot, email, calendar, contacts, or storage architecture is out of policy unless the office contract files are explicitly revised.
