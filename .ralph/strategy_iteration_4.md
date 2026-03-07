# Iteration 4: Technical SEO Audit & Quality Gates

## 1. Core Web Vitals (The Performance Gate)
Every page must pass the "Ralph Standard" for performance.
*   **LCP (Largest Contentful Paint):** < 1.2s.
*   **CLS (Cumulative Layout Shift):** < 0.1.
*   **FID (First Input Delay):** < 100ms.
*   **Optimization Checklist:**
    *   [ ] All hero images use `next/image` with `priority` and `sizes` attributes.
    *   [ ] Fonts are self-hosted (no external Google Font calls).
    *   [ ] CSS is minimized and unused styles are purged.
    *   [ ] No layout shifts from dynamic content (e.g., tool loading states).

## 2. Crawlability & Indexing
*   **Sitemap:**
    *   [ ] `next-sitemap` configured to include `/tools/*` and `/methodology/*`.
    *   [ ] Priority for `/services` set to 0.9.
    *   [ ] Priority for `/areas` set to 0.8.
*   **Robots.txt:**
    *   [ ] `/api/*` disallowed.
    *   [ ] `/studio/*` disallowed.
    *   [ ] `/dashboard/*` disallowed.
*   **Canonical Tags:**
    *   [ ] Every page must have a self-referencing `<link rel="canonical" href="..." />`.

## 3. Structured Data (Schema.org)
We don't just want a link; we want a **Knowledge Panel**.
*   **Organization:** CCB license, logo, and NAP info on Homepage.
*   **LocalBusiness:** Map coordinates and service area polygons.
*   **Service:** Unique schema for each maintenance subscription tier.
*   **FAQPage:** For all Tool landing pages.
*   **HowTo:** For Diagnostic guides.
*   **Product:** For appliance replacement services.

## 4. On-Page Technical
*   **Title Tags:** 50-60 chars. Format: `Primary Keyword | Secondary Keyword | Benson Home Solutions`.
*   **Meta Descriptions:** 150-160 chars. Must include CTA ("Get instant estimate").
*   **H-Tags:** One `H1` per page. `H2-H4` must follow logical order (no skipping levels).
*   **Images:** All images must have descriptive `alt` text (no "image1.jpg").

## 5. Security & Mobile
*   **HTTPS:** HSTS enabled via Vercel.
*   **Touch Targets:** Minimum 48x48px for all interactive elements.
*   **Viewport:** Ensure `user-scalable=yes` is avoided unless necessary.

---
**Status:** Technical Checklist Defined.
**Next Step:** Proceed to Iteration 5 (Keyword Refinement).
