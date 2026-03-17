# Benson Home Solutions Web Platform

A production-grade Next.js application for Benson Home Solutions, a general contractor specializing in maintenance-first subscription programs in the Mid-Willamette Valley and Harney County, Oregon.

## 🚀 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS
- **CMS:** [Sanity.io](https://www.sanity.io/)
- **Database:** Supabase (PostgreSQL) + Drizzle ORM
- **AI/RAG:** Vercel AI SDK (Claude 3.5 Sonnet) + Pinecone Vector DB
- **Lead Capture:** HubSpot CRM Integration
- **Email:** Resend

## 🏗️ Architecture

### 1. Component System (`src/components`)
- `ui`: Atomic, reusable UI elements (Buttons, Cards, Inputs).
- `layout`: Structural components (Header, Footer, Navigation).
- `content`: Feature-specific components (Homepage sections, Portable Text renderers).

### 2. Logic Layer (`src/lib`)
- `ai`: Vector retrieval, embedding generation, and dynamic prompt configuration.
- `crm`: Lead synchronization with HubSpot.
- `db`: Database schema definitions and Drizzle client.
- `email`: Transactional and notification email utilities.
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

### Core Scripts
- `pnpm build`: Production build with type checking and linting.
- `pnpm lint`: ESLint code quality audit.
- `pnpm test`: Playwright E2E and accessibility testing.
- `pnpm seed:pinecone`: Index the Notion knowledge base into Pinecone.

## ⚖️ Compliance & Standards
- CCB License: #258533
- ADA/WCAG 2.1 AA compliant.
- GDPR/TCPA lead capture protocols.
