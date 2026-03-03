# PRD: Live Deployment & Verification

## Overview
Ensure that all new features (True Cost Calculator, RAG Chatbot, Methodology Hub) are correctly deployed and functional on the production domain: `bensonhomesolutions.com`. This loop focuses on eliminating build/lint errors and verifying live behavior.

## Requirements
- **Build Integrity:** Zero errors in `npm run build`.
- **Code Quality:** Zero errors in `npm run lint`.
- **Type Safety:** Zero errors in `npx tsc`.
- **Live Functionality:**
    - Calculator: Input, Processing, and Result steps work.
    - Chatbot: Retrieval from Pinecone and streaming responses from Claude 3.5.
    - SSR Pages: Report pages at `/tools/cost-calculator/report/[hash]` load correctly.
    - Assets: OG Images generate and display.
- **Environment:** All production secrets (Notion, Pinecone, Anthropic, HubSpot, Resend) are active in Vercel.

## Acceptance Criteria
- [ ] `bensonhomesolutions.com` loads all new routes without 404s.
- [ ] Chatbot responds in Elric's voice using Operations Manual context.
- [ ] Calculator generates a report hash and redirects to a valid report page.
- [ ] Lighthouse mobile score on production > 90.
