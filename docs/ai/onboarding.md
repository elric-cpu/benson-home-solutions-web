# Benson Home Solutions: Workspace Onboarding (AI Agent SOP)

This document provides a technical initialization guide for AI agents operating within the Benson Home Solutions repository.

## 1. Context Initialization
*   **Root Directory**: `/home/elricenson/benson-home-solutions-web/`
*   **System Mandates**:
    *   **Credential Protection**: Never log or commit secrets. Use `.env.example` as a template for environment variables.
    *   **Technical Integrity**: Maintain the architectural patterns and the Google-first platform mandate.
    *   **Google-First Platform Rule**: Use Google/Gemini-family models only for website AI, keep chatbot work in Google AI, and keep email/calendar/contacts/storage in Google Workspace and/or Google Cloud Storage.
    *   **Credential Authority**: Production AI and Google service access must use the sanctioned GCloud JSON service account and/or Google Workspace-managed access.
    *   **Project Context**: Refer to `GEMINI.md` and `.gemini/AGENTS.md` for role-specific mandates.

## 2. Dependency Graph
*   **Frontend**: Next.js, React, Lucide (icons), Framer Motion (animations).
*   **Data Layer**: Drizzle ORM, CMS client integrations, and Google Workspace/Google Cloud-connected services.
*   **AI Layer**: Google AI / Gemini-family runtimes and Google-authenticated backend services.
*   **SEO**: Custom JSON-LD components, `next-sitemap`.
*   **Validation**: Playwright (E2E), ESLint, Prettier.

## 3. Mandatory Development Cycle
1.  **Research**: Use `grep_search` and `glob` to map dependencies before making changes.
2.  **Strategy**: Propose structural changes for complex modifications.
3.  **Execution**: Apply targeted changes using `replace` or `write_file`. Follow the **6-resource-per-page** mandate for all page modifications.
4.  **Verification**: Run `npm run lint` and `npm test` after all changes.

## 4. Key References
*   **Content Schema Operations**: See `docs/ai/content-management.md`.
*   **Branding & Marketing Logic**: See `docs/ai/marketing-guidelines.md`.
*   **System Architecture SOP**: See `docs/ai/technical-sop.md`.

---
**Status**: Stable. Follow strictly for all workspace operations.
