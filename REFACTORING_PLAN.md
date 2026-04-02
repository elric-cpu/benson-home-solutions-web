# Comprehensive Refactoring and Integration Plan

This document outlines a plan to refactor and integrate the existing skills, agents, tools, and hooks into a cohesive and usable system.

## 1. Executive Summary

The current system has a powerful but disorganized collection of skills, agents, and automation. There are two separately defined agents ("claude" and "gemini"), a large set of overlapping skills, and a mix of custom tools and hooks. This plan aims to unify these components, clarify their purposes, and establish clear workflows.

The key proposals are:
- Consolidate to a single, well-defined "gemini" agent.
- Refactor the 25 existing skills to improve clarity, remove redundancy, and establish a clear hierarchy.
- Document all custom tools and hooks.
- Formalize the concept of "sub-agents".

## 2. Agent Consolidation

**Problem:** There are two agents defined: "claude" in `agents.toml` and "gemini" in the GitHub Actions workflows. This is confusing and redundant.

**Plan:**
1.  **Consolidate to a single agent named "gemini".** This name is more prevalent in the automation and CI/CD pipelines.
2.  **Create a new `agents.toml` file** that defines the "gemini" agent and its configuration. This file will be the single source of truth for agent definitions.
3.  **Update `AGENTS.md`** to be a clear documentation of the "gemini" agent and its capabilities. The current content of `AGENTS.md` should be moved to a more appropriate location, such as a `CONTRIBUTING.md` or a new `WORKFLOW_GUIDELINES.md`.

## 3. Skills Refactoring

**Problem:** The 25 existing skills have some overlapping responsibilities and the intended workflow is not always clear.

**Plan:**

1.  **Establish a Clear Execution Flow:**
    *   The primary development workflow should be: `brainstorming` -> `writing-plans` -> `subagent-driven-development` -> `finishing-a-development-branch`.
    *   Update the `executing-plans` skill to recommend `subagent-driven-development` as the primary method for executing implementation plans, and position itself as a simpler alternative for sequential, non-parallelizable tasks.
    *   Create a new `ORCHESTRATION.md` document to visually and textually describe this and other key workflows.

2.  **Review and Refine All Skills:**
    *   Review each of the 25 skills for clarity, conciseness, and accuracy.
    *   Update descriptions to remove ambiguity and clearly state when each skill should be used.
    *   Ensure consistent formatting and style across all `SKILL.md` files.
    *   Verify that all tools, links, and commands mentioned in the skills are up-to-date.

3.  **Categorize Skills:**
    *   Organize the skills into the following categories in a new `SKILLS_OVERVIEW.md` file:
        *   **SEO & Auditing:** `audit-website`, `seo-audit`, `seo-geo`, `programmatic-seo`, `schema-markup`
        *   **Marketing & CRO:** `analytics-tracking`, `competitor-alternatives`, `copywriting`, `form-cro`, `free-tool-strategy`, `marketing-ideas`, `marketing-psychology`, `page-cro`, `referral-program`
        *   **Hostinger Deployment:** `hostinger-deploy-and-test`, `hostinger-domain-dns`, `hostinger-go-live`, `hostinger-mcp-setup`, `hostinger-website-deploy`
        *   **Development Process:** `brainstorming`, `executing-plans`, `subagent-driven-development`, `self-improving-agent`
        *   **Utilities:** `elevenlabs-tts`
        *   **Knowledge Bases:** `next-best-practices`

## 4. Tool and Hook Integration

**Problem:** Custom tools and hooks are defined in multiple places (`commands.toml`, GitHub Actions) and are not centrally documented.

**Plan:**

1.  **Create `TOOLS.md`:** A new document that lists all available custom tools. This will include:
    *   The `audit` and `geo-fix` commands from `commands.toml`.
    *   The shell commands and GitHub-specific tools exposed to the "gemini" agent in `gemini-invoke.yml`.

2.  **Create `HOOKS.md`:** A new document that explains the event-driven automation in the system. This will cover:
    *   The GitHub Actions workflows in `.github/workflows`, explaining what triggers them and what they do.
    *   The in-agent hooking mechanism defined in the `self-improving-agent` skill.

## 5. Sub-agent Definition

**Problem:** The term "sub-agent" is used in skills, but there is no formal definition or convention for how to create or use them.

**Plan:**
1.  **Document the Existing Pattern:** For now, the concept of sub-agents will be documented as a pattern of invoking an agent from within another agent or skill, with a specific, isolated context. This will be explained in the updated `AGENTS.md`.
2.  **Propose a Convention:** I will propose a more formal convention for defining sub-agents in the future, potentially in `agents.toml`. This will provide a roadmap for future development.

## 6. Implementation Steps

1.  Create `REFACTORING_PLAN.md` (this file).
2.  Create the new `agents.toml` with the consolidated "gemini" agent definition.
3.  Update `AGENTS.md` with the new agent documentation and move the existing content to `WORKFLOW_GUIDELINES.md`.
4.  Update the `executing-plans` SKILL.md to recommend `subagent-driven-development`.
5.  Create `ORCHESTRATION.md` to document the primary workflows.
6.  Create `SKILLS_OVERVIEW.md` with the categorized list of skills.
7.  Create `TOOLS.md` and `HOOKS.md`.
8.  Perform a review and refinement pass on all 25 `SKILL.md` files.

This plan will create a more organized, understandable, and maintainable system for the agent and its skills.
