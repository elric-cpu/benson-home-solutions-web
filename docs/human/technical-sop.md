# Benson Home Solutions: Technical Overview (Human-Readable)

This document provides a high-level overview of how the Benson Home Solutions website works and how to maintain its core systems.

## 1. The Technology Stack
Our platform is built for speed, SEO, and long-term stability.
*   **Next.js (App Router)**: Powers the fast, modern frontend.
*   **Sanity CMS**: Our content management system. This is where we update text, images, and videos.
*   **Supabase (PostgreSQL)**: The database for our tools like the Home Cost Calculator.
*   **Tailwind CSS**: Used for all styling.

## 2. Maintaining the Content System (Sanity)
The website is dynamic, meaning what you change in Sanity updates on the site instantly.
*   **Page Schema Updates**: We have specialized layouts for Homepage, Service Pages, Areas, and Methodology.
*   **Resource Objects**: These are shared across all pages to ensure consistent authority.

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
