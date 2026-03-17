# Agent instructions (scope: scripts)

## Scope
- Applies to: `scripts/` and all subdirectories
- Languages/tooling: TypeScript/Node scripts, tsx, ESLint, Prettier

## Architecture (high-level)
- Style: layered utility scripts
- Boundaries:
  - Scripts should be idempotent when possible and fail fast on missing env
  - Keep script logic independent from UI components
  - Prefer shared service helpers from `src/lib` over duplicated API clients

## Conventions
- Formatting: Prettier project defaults
- Linting: ESLint project rules
- Testing: run targeted script checks when available; run full suite before release changes
- Name scripts by action (`seed-*.ts`, `validate-*.ts`, `test-*.ts`)

## Commands
- Format: `pnpm --dir .. format -- {files}`
- Lint: `pnpm --dir .. lint -- scripts`
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
    "commands": ["pnpm --dir .. lint -- scripts"],
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
        "pattern": "rm\\s+-rf\\s+/",
        "message": "Never run destructive root-level delete commands in scripts."
      }
    ]
  }
}
```
