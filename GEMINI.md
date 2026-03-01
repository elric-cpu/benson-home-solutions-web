# Benson Home Solutions - Gemini Project Context

## Gemini Added Memories
- **Agent Team Definitions:** Detailed personas and mandates for the 14-specialist team are defined in `.gemini/AGENTS.md`. Refer to this file when assuming specific roles for tasks.
- Each prompt below is a **self-contained implementation brief** designed to be handed directly to a developer or AI coding assistant.

## Project Structure
- **Root:** `/home/elricenson/benson-home-solutions-web`
- **Framework:** Next.js (App Router)
- **Database:** Supabase (PostgreSQL) + Drizzle ORM
- **CMS:** Sanity (Schema in `src/sanity/schemas`)
- **Styling:** Tailwind CSS (Vanilla CSS preferred for new components)

## Key Directives
- **Security:** Never log or commit secrets. Protect `.env` files.
- **Tone:** Professional, direct, authoritative (Owner: Elric Benson).
- **Validation:** Always verify changes with tests and linting.
