# Agent instructions (scope: src)

## Scope
- Applies to: `src/` and all subdirectories
- Languages/tooling: TypeScript, React, Next.js App Router, ESLint, Prettier, Playwright

## Architecture (high-level)
- Style: layered
- Boundaries:
  - Route handlers/pages in `src/app` orchestrate; keep business logic in `src/lib`
  - Reusable UI belongs in `src/components`; avoid data-fetching side effects in presentational UI
  - Database/third-party integrations stay in `src/lib` service modules, not inside components
  - Validate external input at route boundaries (prefer `zod`)

## Conventions
- Formatting: Prettier (`single quotes`, `no semicolons`)
- Linting: ESLint (errors must be zero)
- Tests: Playwright for end-to-end and a11y coverage
- Keep files under 400 lines where practical; split large modules

## Commands
- Format: `pnpm --dir .. format -- {files}`
- Lint: `pnpm --dir .. lint`
- Test: `pnpm --dir .. test`

## Verifiable config (used by `coding-guidelines-verify`)
```codex-guidelines
{
  "version": 1,
  "format": {
    "autofix": true,
    "commands": ["pnpm --dir .. format -- {files}"],
    "windows": [],
    "posix": []
  },
  "lint": {
    "commands": ["pnpm --dir .. lint"],
    "windows": [],
    "posix": []
  },
  "test": {
    "commands": ["pnpm --dir .. test"],
    "optional": true,
    "windows": [],
    "posix": []
  },
  "rules": {
    "forbid_globs": [],
    "forbid_regex": [
      {
        "pattern": "console\\.log\\(",
        "message": "Use structured logging or remove debug logs before merge."
      }
    ]
  }
}
```
