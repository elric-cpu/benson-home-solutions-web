# Hooks

This document provides an overview of the event-driven automation and hooks used in this project.

## 1. GitHub Actions Workflows

The `.github/workflows` directory contains a number of GitHub Actions workflows that automate various aspects of the development process. These workflows are triggered by events such as pushes, pull requests, and scheduled events.

Some of the key workflows include:

- **`ci.yml`:** This workflow runs the continuous integration (CI) pipeline, which includes linting, testing, and building the project.

- **`gemini-invoke.yml`:** This workflow allows the "gemini" agent to be invoked from a GitHub issue comment. This is the primary way to interact with the agent.

- **`gemini-dispatch.yml`:** This workflow is used to dispatch the "gemini" agent to perform a specific task.

- **`gemini-plan-execute.yml`:** This workflow is used to execute an implementation plan that has been created by the "gemini" agent.

## 2. The `self-improving-agent` Hook

The `self-improving-agent` skill defines a hook that allows the "gemini" agent to learn from its actions and improve its performance over time.

This hook is triggered after the agent completes a task, and it records the outcome of the task in a persistent memory. This memory is then used to inform the agent's future decisions.

The `self-improving-agent` hook is a powerful mechanism for creating an agent that can adapt and evolve over time.
