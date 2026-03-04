# Objective
Resolve the Vercel deployment failure for `bensonhomesolutions.com` by correcting the `pnpm` lockfile configuration mismatch and ensuring compatibility with Next.js 16 Canary and Sentry.

# Key Files & Context
- `pnpm-lock.yaml`: Current source of `settings.injectWorkspacePackages` mismatch.
- `pnpm-workspace.yaml`: Potential cause of the workspace injection setting.
- `vercel.json`: Defines the `installCommand`.
- `next.config.ts`: Handles Next.js 16 features and Sentry integration.
- `.github/workflows/ci.yml`: CI pipeline using pnpm.

# Implementation Steps (15-Loop Iteration)
1. **Loop 1: Deep Diagnostics.** Analyze Vercel build logs vs. local `pnpm` configuration. Identify why `injectWorkspacePackages` is triggered.
2. **Loop 2: Workspace Audit.** Check if `pnpm-workspace.yaml` is required. If the repo is a single-package project, the workspace config is "fluff" causing the mismatch.
3. **Loop 3: Lockfile Alignment.** Regenerate `pnpm-lock.yaml` without `injectWorkspacePackages` if appropriate.
4. **Loop 4: Vercel Settings Sync.** Use `get_project` to verify Vercel's Node and Framework settings match local environment.
5. **Loop 5: Environment Variable Verification.** Ensure all secrets required for the build (Sentry, Sanity, Pinecone) are accessible to the Vercel builder.
6. **Loop 6: Sentry + Canary Harmonization.** Verify that `sentry.client.config.ts`, `sentry.server.config.ts`, and `sentry.edge.config.ts` are not using APIs deprecated in Next.js 16.
7. **Loop 7: Build Script Optimization.** Refine `package.json` build scripts to ensure `next build` is called correctly without Turbopack conflicts.
8. **Loop 8: vercel.json Hardening.** Set a deterministic `installCommand` that handles the pnpm 10 transition gracefully.
9. **Loop 9: CI/CD Consistency.** Ensure `.github/workflows/ci.yml` uses the exact same install flags as Vercel to catch mismatches early.
10. **Loop 10: Logic Regression Check.** Run the `agreement-engine` and `calculator` logic locally to ensure refactors didn't break during dependency upgrades.
11. **Loop 11: CMS Connectivity Check.** Verify Sanity fallback logic works if CMS tokens are restricted during build time.
12. **Loop 12: Middleware/Proxy Audit.** Confirm all "fluff" files are indeed removed and don't cause import errors in the build trace.
13. **Loop 13: Local Build Simulation.** Run `pnpm build` with the exact Vercel `installCommand` locally.
14. **Loop 14: Git Integrity.** Ensure no dirty state or untracked files are missing from the commit.
15. **Loop 15: Production Push.** Final commit and push to `main`.

# Verification & Testing
- `pnpm exec tsc --noEmit`: Ensure zero type errors.
- `pnpm lint`: Ensure zero linting violations.
- `pnpm build`: Successful local production build.
- Vercel Dashboard: `READY` state for the latest deployment on `bensonhomesolutions.com`.
