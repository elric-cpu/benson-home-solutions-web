# Design Doc: Service Catalog

- **Date**: 2026-03-23
- **Status**: Approved

## 1. Overview

This document outlines the design for the Service Catalog feature for the Benson Home Solutions website. The primary goal is to guide users with a specific home maintenance problem to the correct service and convert them into a lead. A secondary goal is to allow users to browse the full range of available services.

## 2. Core User Experience: Calculator-First

The feature will be built around a "Calculator-First" or "Diagnostic-First" approach. The primary user interface on the `/services` page will be a diagnostic tool that asks the user a series of questions to identify their problem.

## 3. Key Components

The feature will be composed of three main React components.

### 3.1. `<ServiceDiagnostic />`

-   **Description**: A multi-step questionnaire that serves as the entry point for users.
-   **Location**: The primary element on the `/services` page.
-   **UI/UX**:
    -   Presents one question at a time to minimize user friction.
    -   Includes a progress bar.
    -   Uses simple, non-technical language.
-   **Data/Logic**:
    -   The question-and-answer logic will be defined in a static JSON structure for the initial implementation.
    -   The final output will be a set of tags (e.g., `['roof', 'leak', 'chimney']`) used to identify matching services.
-   **Future Enhancements**: The logic could be upgraded to a Genkit flow for more dynamic, AI-driven conversations.

### 3.2. `<ServiceResults />`

-   **Description**: Displays the recommended services after the user completes the diagnostic.
-   **UI/UX**:
    -   Renders a short, ranked list of 2-3 service recommendations.
    -   Each recommendation will be a "card" containing the service name, a brief description, and a confidence score (e.g., "Top Recommendation", "Also Consider").
    -   Each card will have a primary Call-to-Action: a "Get a Quote" button.
-   **Data/Logic**:
    -   Accepts the tags from the `<ServiceDiagnostic />` component as a prop.
    -   Queries the `catalog_items` table in the database to find services matching the tags.
    -   The "Get a Quote" button will link to `/contact` with the service name passed as a URL parameter.

### 3.3. `<ServiceBrowser />` (Fallback)

-   **Description**: Provides a traditional search and filter interface for users who wish to bypass the diagnostic tool.
-   **Location**: Accessible via a simple link below the main diagnostic tool (e.g., "Or, browse all services"). This might be a separate page or a section on the same page.
-   **UI/UX**:
    -   A prominent search bar for keyword queries.
    -   A sidebar for filtering services by category (`category1`, `category2`).
    -   A paginated list or grid displaying service results.
-   **Data/Logic**:
    -   Queries the `catalog_items` table with optional search and filter parameters.

## 4. Page Structure (`/services`)

The main services page will be structured to guide the user through the diagnostic flow.

1.  The `<ServiceDiagnostic />` component will be displayed by default.
2.  Upon completion of the diagnostic, the `<ServiceDiagnostic />` will be hidden or replaced by the `<ServiceResults />` component.
3.  A subtle link will be present to allow users to access the `<ServiceBrowser />`.

This design prioritizes the conversion-focused diagnostic tool while ensuring the full catalog remains accessible.
