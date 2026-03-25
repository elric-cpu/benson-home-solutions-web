# Audit Report: Codebase vs. Operations Manual

- **Date**: 2026-03-23
- **Status**: Complete

## 1. Overview

This report details the discrepancies between the current state of the application codebase and the specifications outlined in the `benson-home-solutions-–-operations-manual.md` and its associated documents.

While the application is functional, several core features deviate significantly from the original design, mission, and data requirements.

---

## 2. Critical Discrepancies

### 2.1. Lead Enrichment Pipeline (Not Implemented)

-   **Spec**: `Section 6` requires a "smart intake" and "webhook-triggered enrichment pipeline" that uses multiple free federal data APIs (USPS, Census, FEMA, HUD, DOE, EIA) to automatically profile a property based on its address (e.g., geocoding, flood zone lookup).
-   **Current State**: The system uses only the Google Address Validation API to standardize and validate an address. No other data sources are queried, and no further enrichment (flood zone, etc.) is performed.
-   **Gap**: The entire multi-source data enrichment pipeline is missing. This is a critical failure to meet the "smart intake" specification.

### 2.2. AI Chatbot Capabilities (Incomplete)

-   **Spec**: `Section 6` specifies the AI chatbot must be capable of "custom plan building" for the tiered maintenance subscriptions (Residential, Commercial, Church).
-   **Current State**: The AI chatbot ("Gus") can answer general questions and create a generic lead via a tool. It has no knowledge of, or ability to construct, a maintenance subscription plan.
-   **Gap**: The core "custom plan building" functionality is completely absent. The chatbot is currently a simple Q&A and lead capture agent, not a plan configuration tool as required.

### 2.3. Service Catalog vs. Cost Calculator (Incorrect Implementation)

-   **Spec**: The manual specifies a "True Cost of Homeownership Calculator" and a "Maintenance Subscription Tool Suite." It also lists specific core service categories in `Section 2`.
-   **Current State**: I have implemented a generic "Service Catalog" with a simple symptom-based "Diagnostic Tool." The tool's logic (`diagnostic-tree.json`) and categories (`Roofing`, `Plumbing`) are placeholders and do not align with the services defined in the manual.
-   **Gap**: The feature that has been built is not the feature that was specified. The "diagnostic tool" is not a "cost calculator," and its underlying data and logic do not reflect the business's actual service offerings.

---

## 3. Major & Minor Discrepancies

### 3.1. Brand Voice Compliance (Needs Verification)

-   **Spec**: A detailed voice profile exists at `elric-benson-—-voice-profile-(agent-10-handoff).md`. All copy, especially the AI Chatbot's personality, must adhere to this.
-   **Current State**: The AI chatbot's system prompt in `genkit.ts` contains a personality definition.
-   **Gap**: A line-by-line review is required to ensure the implemented personality perfectly matches the detailed spec.

### 3.2. SEO & Schema Implementation (Needs Verification)

-   **Spec**: Detailed plans for keywords, schema, and technical SEO exist as separate agent deliverables linked in the manual.
-   **Current State**: Basic metadata and schema have been applied.
-   **Gap**: A full audit is needed to compare the current on-page SEO, technical SEO (`robots.txt`, sitemaps), and JSON-LD schema against the detailed specifications to identify gaps.
