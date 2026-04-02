# K.I.S.S. (Keep It Simple, Stupid) Policy & Codebase Audit

**Date**: March 31, 2026  
**Focus**: Simplifying the Benson Home Solutions monorepo by eliminating language fragmentation, redundant logic, and over-engineered abstractions.

---

## 🛑 Policy Statement

**"Complexity is a liability. If it can be done in TypeScript natively, do it in TypeScript. If it fails, let it fail loudly rather than hiding behind a fallback. Every file must serve exactly one obvious purpose in the production workflow."**

### Core Directives:
1. **One Ecosystem**: Default to Node.js/TypeScript (`tsx`) for all scripts, utilities, and backend functions. Stop switching context between Python, Bash, and PowerShell.
2. **Single Source of Truth**: Prompts, schemas, and AI generation logic must live in *one* place (the backend), never duplicated in the frontend "just in case."
3. **Fail Loudly**: Remove silent try-catch fallbacks that obscure network or deployment failures.
4. **Prune the Dead**: If a script or file is no longer actively used in the deployment or marketing pipeline, move it to `.archive/` or delete it.

---

## 🔍 Codebase Audit & Cleanup Targets

### 1. The "Language Soup" (Scripting Directory)
**Problem**: The `scripts/` directory is a mix of Python (`.py`), Bash (`.sh`), PowerShell (`.ps1`), and TypeScript (`.ts`). This forces developers and AI agents to constantly switch context, handle different package managers (pip vs. pnpm), and manage duplicate authentication methods (e.g., Python `google-genai` vs. Node `@genkit-ai`).

**Action Plan (Consolidate to `tsx`)**:
*   **Convert Python to TS**:
    *   `create_video.py` ➡️ Rewrite using Node.js `@google-cloud/vertexai` (Veo).
    *   `download_facebook_images.py` & `scrape_facebook.py` ➡️ Rewrite using `playwright` or `puppeteer` in TS.
    *   `expand_areas.py` ➡️ Rewrite in TS utilizing Node's `fs` and `String.replace()`.
    *   `remove_main_tags.py` ➡️ Standard TS string manipulation.
*   **Convert Bash/PS1 to TS**:
    *   `export-hostinger-env.sh` & `prepare-hostinger-nextjs.sh` ➡️ Move into a `deploy.ts` script using Node's `child_process.exec`.
    *   `run-tests.ps1` ➡️ Replace entirely with standard `npm run test` or a platform-agnostic `test.ts` wrapper.
*   **Remove Duplicates**:
    *   Delete `generate-facebook-content.py` (we just created the superior `generate-facebook-content-vertex.ts` which uses the native TS SDK).

### 2. The Genkit "Split-Brain" (AI Logic Duplication)
**Problem**: The project has Genkit flows defined in two places:
1.  **Frontend/Local**: `src/lib/genkit.ts`
2.  **Backend/Firebase**: `benson-genkit-backend/functions/src/flows/`

In `src/lib/genkit.ts`, functions like `generalChatFlow` and `costEstimationFlow` contain bloated `try/catch` blocks. They attempt to fetch from the Firebase backend, and if that fails, they *fall back* to running a local `ai.generate()` call containing massive hardcoded system prompts (e.g., Elric's CCB #258533 estimation logic). 

**Why this violates K.I.S.S.**:
*   **Security Risk**: You are shipping internal system prompts and estimation multipliers (like the "30% gross / <15% net" logic) to the Next.js client/server boundary unnecessarily.
*   **Maintenance Nightmare**: Updating a prompt requires changing it in both the Firebase backend AND the Next.js fallback.
*   **Hidden Failures**: If the backend goes down, the frontend silently uses local fallback, masking the infrastructure outage and potentially running up API costs from different environments.

**Action Plan (Centralize API)**:
*   **Backend ONLY**: Move *all* `ai.defineFlow` logic, prompts, and schemas exclusively to `benson-genkit-backend/functions/src/flows/`.
*   **Frontend as a Dumb Client**: Refactor `src/lib/genkit.ts` to be a simple API client wrapper. It should export functions that literally just `fetch(BACKEND_URL)` and return the JSON/Stream. If the fetch fails, throw a UI-friendly error boundary.

### 3. Next.js & React Component Bloat
**Problem**: Often in Next.js 15 apps, components become overloaded with logic that could be simplified using modern React Server Components (RSC) or simpler hooks.

**Action Plan (Audit UI)**:
*   **Server Components First**: Ensure heavy components (like `ResourcesSection.tsx` or `RichHero.tsx`) are Server Components unless they explicitly require `useState` or `onClick` handlers.
*   **Simplify Tailwind**: Audit `globals.css` and utility functions. If you find deep `clsx(twMerge(...))` chaining for components that never change dynamically, replace them with clean, static Tailwind strings or Vanilla CSS (as per `GEMINI.md`).

### 4. Database & Environment Configuration
**Problem**: Fragmented configuration files.
*   `.env`, `.env.local`, `.env.example`, `.env.hostinger.example`.
*   `firebase.json`, `vercel.json`, `drizzle.config.ts`, `next.config.ts`.

**Action Plan**:
*   **Unify Envs**: Determine the deployment target (Vercel vs. Hostinger). If deploying to Vercel, delete the Hostinger-specific shell scripts and env examples to reduce cognitive load. If Hostinger, remove Vercel artifacts.
*   **Schema Consolidation**: Ensure `drizzle/schema.ts` is the single source of truth for the DB, and `src/sanity/schemas/` strictly mirrors it where CMS overlaps occur. 

---

## 🛠️ Immediate Execution Checklist

1. [ ] Delete `.ps1` and `.py` scripts (post-conversion).
2. [ ] Strip fallback logic from `src/lib/genkit.ts`; make it a pure `fetch` client.
3. [ ] Verify `benson-genkit-backend/functions/` contains the latest Master Prompts.
4. [ ] Delete `generate-facebook-content.py` (retained `.ts` version only).
