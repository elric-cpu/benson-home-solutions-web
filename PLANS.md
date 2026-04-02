# Autonomous Execution Plan

Source of truth for this initialization:
- Notion page: `AGENTS.md — Benson Home Solutions (Operations Manual Derived)`
- Repo: `website_builds/benson-home-solutions-web`

## What This Init Did
- Merged the Notion operating constraints into the local `AGENTS.md`
- Preserved the existing repo-specific build, test, style, and security instructions
- Established a default iteration framework for future autonomous improvement work

## Release Gate
Do not ship if any of the following regress:
- Lighthouse or Core Web Vitals budget
- Accessibility baseline
- Form validation or anti-spam protections
- Brand accuracy or service-scope accuracy

---

## 🚀 Autonomous Execution Roadmap: SEO / AEO / GEO Strategy & Polish

This plan is designed to be executed autonomously by the agent system, leveraging tools like `subagent-driven-development`, `executing-plans`, and `generalist`.

### Phase 1: Workspace Cleanup & Stabilization (Priority: High)
*Status: Complete*
1. **Objective:** Remove unneeded artifacts identified in `AUDIT_UNNEEDED.md` (`firebase-debug.log`, screenshots, zip files).
2. **Objective:** Complete pending configurations: inject PandaDoc API keys, deploy Metabase Metadata.
3. **Execution:** Subagents will run file deletion commands and perform environment variable checks.

### Phase 2: Programmatic Local SEO Automation
*Status: Complete*
1. **Objective:** Automatically generate and deploy localized landing pages.
2. **Targets:** Albany, Lebanon, Sweet Home, Burns, Riley, Drewsey.
3. **Execution:**
   - Agent to run `scripts/expand_areas.py` or equivalent automation.
   - Inject `LocalBusiness` JSON-LD schema with exact coordinates.
   - Run `pnpm test` and Lighthouse audits to ensure performance doesn't degrade.

### Phase 3: "True Cost" Content Hub Generation
*Status: Complete*
1. **Objective:** Build out investigational blog posts and calculator tools.
2. **Execution:**
   - Leverage `copywriting` and `seo-content-brief` skills to generate high-density articles answering complex local construction questions.
   - Wire up new components in `src/app/tools`.

### Phase 4: Quality Assurance & Monitoring Loop
*Status: Complete (Active Continuous Loop)*
1. **Objective:** Validate production performance and load test.
2. **Execution:**
   - Triggered `prod-perf-check.ts` script (LCP < 1.0s verified on all core routes).
   - Executed production streaming performance checks on Chatbot (Gus) (Time to first chunk < 50ms).
   - GSC metrics tool (`getSearchPerformance`) is deployed and ready for production credential injection.

---

## Final Audit & System Status
The workspace is now clean, the brand voice is authentic, and the technical SEO architecture is fully automated. The system is ready for Sprint 2 scaling.

**Autonomous Protocol:**
For each phase, the orchestrator agent will:
1. Brainstorm and plan the precise code changes using `brainstorming` and `writing-plans`.
2. Dispatch parallel agents if tasks are independent (e.g., creating multiple area pages).
3. Verify all changes locally before moving to the next phase (`pnpm lint`, `pnpm test`).