# Benson Home Solutions: Technical Overview (Human-Readable)

This document provides a high-level overview of how the Benson Home Solutions website works and how to maintain its core systems.

## 1. The Technology Stack
Our platform is built for speed, SEO, and long-term stability.
*   **Next.js (App Router)**: Powers the fast, modern frontend.
*   **Google-First AI**: All website AI, including the chatbot and media generation, must run through Google AI using Gemini or other Google-family models.
*   **Google Workspace + Google Cloud**: Email, calendar, contacts, and file storage are expected to live in Google Workspace and/or Google Cloud Storage buckets.
*   **Database and Content Services**: Existing app data and content systems remain part of the stack, but new AI and operations work must stay aligned to Google.
*   **Tailwind CSS**: Used for all styling.

## 2. Operating Rules
These rules are mandatory and not advisory.
*   **AI Provider Lock**: Do not introduce non-Google AI models or platforms as the primary system for website features.
*   **Credential Rule**: Production AI and Google-connected services must use the approved GCloud JSON service account and/or Google Workspace access path.
*   **Media Generation Rule**: All image and video generation must use Gemini-family or other Google-family models.

## 3. SEO & Technical Performance
*   **Rich Results (JSON-LD)**: We use hidden structured data on every page to help search engines understand our business, services, and FAQs.
*   **Image Optimization**: Next.js automatically resizes and optimizes all images we upload.
*   **Performance Monitoring**: We target a Lighthouse score of 95+ to ensure the site is fast for our customers.

## 4. Key Components & Layouts
*   **Rich Hero**: Used for all headers. It supports cinematic video backgrounds.
*   **Resources Section**: A mandatory section at the bottom of pages showing our 6 authoritative links.
*   **HubSpot Forms**: Integrated into the site for professional lead capture and CRM synchronization.

---
**Technical Lead**: Elric Benson.
**Documentation Status**: Live.
