# Shared Skill Catalog

This repo intentionally does not vendor upstream skill copies anymore.

Use the shared, globally installed skill catalog instead. The expected upstream skill set is pinned in [skills-lock.json](/srv/new/benson-home-solutions-web/skills-lock.json).

Project-specific behavior lives in:

- [commands.toml](/srv/new/benson-home-solutions-web/commands.toml)
- `.gemini/commands/`
- [ORCHESTRATION.md](/srv/new/benson-home-solutions-web/ORCHESTRATION.md)
- [TOOLS.md](/srv/new/benson-home-solutions-web/TOOLS.md)

If a workflow needs repo-specific guidance, prefer adding or updating a command instead of re-vendoring a generic upstream skill.
