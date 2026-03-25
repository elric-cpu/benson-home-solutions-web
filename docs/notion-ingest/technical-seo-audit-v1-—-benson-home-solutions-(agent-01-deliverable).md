# Technical SEO Audit v1 — Benson Home Solutions (Agent 01 Deliverable)

> [!NOTE]
> **Sprint 1 Deliverable** — Agent 01 (Technical SEO & Site Audit Specialist)

---

## 1 · Current State Assessment

> [!NOTE]
> **CRITICAL FINDING:** [bensonhomesolutions.com](http://bensonhomesolutions.com/) is currently returning **HTTP 404** on all pages. The site is either down, misconfigured at the DNS/hosting level, or the Vercel deployment is not connected. This is the **#1 blocker** for any crawl-based audit.

### What We Know

- **Domain:** [bensonhomesolutions.com](http://bensonhomesolutions.com/)
- **Registrar/DNS:** Unknown (needs Elric to confirm)
- **Hosting target:** Vercel Pro (planned)
- **Current status:** 404 — no content served
- **Google Search Console:** Access requested from Elric (pending)
- **Existing indexed pages:** Unknown until GSC access granted
### Immediate Actions Required (Elric)

- [ ] Confirm domain registrar and DNS configuration
- [ ] Verify Vercel project is linked to the domain
- [ ] Grant Google Search Console access to Agent 14
- [ ] Provide any historical analytics data (if available from previous site version)
---

## 2 · Technical SEO Audit Framework

Once the site is live, the following audit will be executed across **7 pillars:**

### Pillar 1: Crawlability & Indexation

### Pillar 2: Site Architecture & URL Structure

**Planned URL structure (21 pages):**

```javascript
/                           → Homepage
/emergency                  → Emergency Services
/services/water-damage      → Water Damage Restoration
/services/kitchen-remodel   → Kitchen Remodel
/services/bathroom-remodel  → Bathroom Remodel
/services/mold-remediation  → Mold Remediation
/services/windows           → Window Replacement
/services/demolition        → Demolition
/services/sitework          → Sitework
/services/tenant-improvements → Tenant Improvements
/maintenance                → Maintenance Subscription
/maintenance/methodology    → Methodology Hub
/tools/true-cost-calculator → True Cost Calculator
/tools/cost-estimator       → Cost Estimator
/about                      → About
/contact                    → Contact
/areas/salem                → Salem
/areas/keizer               → Keizer
/areas/corvallis            → Corvallis
/areas/albany               → Albany
/areas/burns                → Burns
```

**Architecture principles:**

- Maximum **3 clicks** from homepage to any page
- Flat hierarchy — services under `/services/`, areas under `/areas/`
- Maintenance gets its own top-level `/maintenance` route (brand differentiator)
- Tools get `/tools/` prefix to separate from service pages
- All URLs lowercase, hyphenated, no trailing slashes
- No date-based or parameter-based URLs
### Pillar 3: Core Web Vitals Targets

### Pillar 4: Mobile-First Optimization

- **Viewport:** Responsive meta tag required
- **Tap targets:** Minimum 48×48px (especially phone numbers and CTAs)
- **Font sizes:** Minimum 16px base
- **Emergency page:** Must load in < 2s on 3G — users may be in crisis on mobile
- **Click-to-call:** `tel:+15413215115` on all phone number instances
- **Touch-friendly:** No hover-only interactions
### Pillar 5: Page Speed Optimization Strategy

**Next.js 15 specific optimizations:**

- Server Components by default (minimize client JS)
- Streaming SSR for long pages
- `next/image` with `sizes` attribute for responsive images
- `next/font` for zero-CLS font loading
- Route-based code splitting (automatic)
- ISR (Incremental Static Regeneration) for service pages (revalidate: 3600)
- Edge runtime for emergency page (lowest latency)
**Asset optimization:**

- Images: WebP with AVIF fallback, `srcset` for responsive
- CSS: Tailwind CSS v4 with purging, no unused styles
- JS: Tree-shaking, dynamic imports for below-fold components
- Fonts: Self-hosted, `font-display: swap`, preload critical weights
### Pillar 6: Security & HTTPS

- **SSL:** Vercel auto-provisions via Let's Encrypt
- **HSTS:** Enable `Strict-Transport-Security` header
- **Mixed content:** Zero tolerance — all assets must be HTTPS
- **CSP headers:** Content Security Policy for XSS prevention
- **X-Frame-Options:** DENY (prevent clickjacking)
### Pillar 7: International & Language

- **Language:** `lang="en"` on HTML tag
- **hreflang:** Not needed (single-language, US-only site)
- **Charset:** UTF-8
---

## 3 · Redirect Strategy

> [!NOTE]
> **Critical:** If there was a previous version of the site with indexed pages, we MUST implement 301 redirects from old URLs to new URLs. Failure to do this will lose all existing domain authority.

**Action required from Elric:**

- Provide a list of all URLs from the previous site version (or confirm there was no previous site)
- Share any Google Analytics history showing which pages had traffic
**Redirect implementation plan:**

- Use `next.config.ts` `redirects()` for permanent 301s
- Map every old URL to the closest new equivalent
- Set up a custom 404 page with search + popular links
- Monitor 404s in GSC after launch
---

## 4 · Sitemap Strategy

**Auto-generated sitemap via Next.js:**

```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bensonhomesolutions.com';
  
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/emergency`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/water-damage`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    // ... all 21 pages
  ];
  
  return staticPages;
}
```

**Sitemap rules:**

- Maximum 1 sitemap (under 50K URLs, well under limit)
- Submit to GSC immediately after deploy
- `changeFrequency` reflects actual update cadence
- Priority: Homepage 1.0, Emergency/P0 0.9, P1 0.8, P2 0.7, P3/Area 0.6
---

## 5 · Technical SEO Checklist for Build Phase

### Per-Page Requirements (All 21 Pages)

- [ ] Unique `<title>` tag (50-60 chars, primary keyword + brand)
- [ ] Unique `<meta name="description">` (150-160 chars, includes CTA)
- [ ] Canonical URL (`<link rel="canonical">`)
- [ ] Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags
- [ ] Structured data (JSON-LD per Agent 02 schema)
- [ ] H1 tag (one per page, includes primary keyword)
- [ ] Internal links to related pages (per keyword map clusters)
- [ ] Image alt text (descriptive, includes keyword where natural)
- [ ] Breadcrumb navigation (matches BreadcrumbJsonLd)
### Site-Wide Requirements

- [ ] robots.txt allowing all crawlers, pointing to sitemap
- [ ] XML sitemap at /sitemap.xml
- [ ] Custom 404 page with search + navigation
- [ ] 301 redirects from old URLs (if applicable)
- [ ] SSL / HTTPS on all pages
- [ ] Mobile responsive (all breakpoints tested)
- [ ] Core Web Vitals passing (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1)
- [ ] Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices, SEO
- [ ] No mixed content warnings
- [ ] Clean console (no JS errors)
---

## 6 · SEO Monitoring Plan (Post-Launch)

---

## 7 · Dependencies & Blockers

---

## 8 · Next Steps

- [ ] **Elric:** Resolve 404 → Agent 01 runs full crawl audit
- [ ] **Elric:** Grant GSC access → Agent 01 pulls index coverage + historical data
- [ ] **Agent 07:** Implement URL structure from Section 2 in Next.js App Router
- [ ] **Agent 08:** Configure `next.config.ts` with redirects, headers, sitemap
- [ ] **Agent 12:** Add Lighthouse CI to GitHub Actions with budgets from Section 3
- [ ] **Agent 01 (self):** Run full crawl audit once site is live → produce v2 with findings
