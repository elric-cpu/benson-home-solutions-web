# Agent instructions (scope: tests)

## Scope
- Applies to: `tests/` and all subdirectories
- Languages/tooling: TypeScript, Playwright, axe-core

## Architecture (high-level)
- Style: layered test design
- Boundaries:
  - Treat tests as black-box user flows; avoid importing app internals
  - Prefer stable selectors (`role`, `label`, `placeholder`, `testid`) over brittle CSS
  - Mock external network dependencies in test setup when determinism is required

## Conventions
- Formatting: Prettier project defaults
- Linting: ESLint project rules
- Tests: Playwright (`chromium` + `@a11y` checks where relevant)
- Name specs by feature/flow (`feature-name.spec.ts`)

## Commands
- Format: `pnpm --dir .. format -- {files}`
- Lint: `pnpm --dir .. lint`
- Test: `pnpm --dir .. test -- tests`

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
    "commands": ["pnpm --dir .. test -- tests"],
    "optional": false,
    "windows": [],
    "posix": []
  },
  "rules": {
    "forbid_globs": [],
    "forbid_regex": [
      {
        "pattern": "test\\.only\\(|describe\\.only\\(",
        "message": "Do not commit focused tests."
      }
    ]
  }
}
```
