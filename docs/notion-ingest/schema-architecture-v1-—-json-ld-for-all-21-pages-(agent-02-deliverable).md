# Schema Architecture v1 — JSON-LD for All 21 Pages (Agent 02 Deliverable)

> [!NOTE]
> **Sprint 1 Deliverable** — Agent 02 (Schema Markup & Structured Data Engineer)

---

## 1 · Schema Strategy Overview

**Approach:** Entity-first structured data using JSON-LD (Google's preferred format). Every page gets a tailored schema stack that maximizes rich result eligibility.

**Core entity:** `HomeAndConstructionBusiness` (subtype of `LocalBusiness`) — this is Benson Home Solutions' primary entity across all pages.

**Implementation:** JSON-LD injected via Next.js `<script type="application/ld+json">` in each page's `metadata` export or layout component.

---

## 2 · Global Schema (All Pages)

Every page includes these baseline schemas:

### 2a · Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
  "@id": "https://bensonhomesolutions.com/#organization",
  "name": "Benson Home Solutions",
  "url": "https://bensonhomesolutions.com",
  "logo": "https://bensonhomesolutions.com/logo.png",
  "image": "https://bensonhomesolutions.com/og-image.jpg",
  "telephone": "+1-541-321-5115",
  "email": "elric@bensonhomesolutions.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Salem",
    "addressRegion": "OR",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 44.9429,
    "longitude": -123.0351
  },
  "areaServed": [
    { "@type": "City", "name": "Salem", "addressRegion": "OR" },
    { "@type": "City", "name": "Keizer", "addressRegion": "OR" },
    { "@type": "City", "name": "Corvallis", "addressRegion": "OR" },
    { "@type": "City", "name": "Albany", "addressRegion": "OR" },
    { "@type": "City", "name": "Lebanon", "addressRegion": "OR" },
    { "@type": "City", "name": "Sweet Home", "addressRegion": "OR" },
    { "@type": "City", "name": "Burns", "addressRegion": "OR" }
  ],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "license",
    "name": "Oregon CCB License #258533"
  },
  "sameAs": [],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "07:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$"
}
```

### 2b · BreadcrumbList (dynamic per page)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bensonhomesolutions.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://bensonhomesolutions.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Water Damage Restoration" }
  ]
}
```

### 2c · WebSite with SearchAction (Homepage only)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://bensonhomesolutions.com/#website",
  "url": "https://bensonhomesolutions.com",
  "name": "Benson Home Solutions",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://bensonhomesolutions.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

## 3 · Per-Page Schema Map

---

## 4 · Key Schema Templates

### Emergency Service Schema

```json
{
  "@context": "https://schema.org",
  "@type": "EmergencyService",
  "name": "Benson Home Solutions — 24/7 Emergency Repair",
  "description": "24/7 emergency home repair, water damage mitigation, and restoration in Salem, Oregon and Mid-Willamette Valley.",
  "provider": { "@id": "https://bensonhomesolutions.com/#organization" },
  "serviceType": "Emergency Home Repair",
  "areaServed": { "@id": "https://bensonhomesolutions.com/#organization" },
  "availableChannel": [
    {
      "@type": "ServiceChannel",
      "servicePhone": "+1-541-321-5115",
      "serviceType": "Phone",
      "availableLanguage": "English"
    },
    {
      "@type": "ServiceChannel",
      "serviceUrl": "https://bensonhomesolutions.com/emergency",
      "serviceType": "Online Chat"
    }
  ],
  "hoursAvailable": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
}
```

### Service Page Schema (Water Damage Example)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Water Damage Restoration",
  "description": "Professional water damage restoration, flood cleanup, and water mitigation services in Salem, Oregon and Mid-Willamette Valley.",
  "provider": { "@id": "https://bensonhomesolutions.com/#organization" },
  "serviceType": "Water Damage Restoration",
  "areaServed": { "@id": "https://bensonhomesolutions.com/#organization" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Water Damage Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Emergency Water Extraction" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Structural Drying" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flood Cleanup" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Burst Pipe Repair" } }
    ]
  }
}
```

### HowTo Schema (Restoration Process)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Water Damage Restoration Process",
  "description": "Step-by-step water damage restoration process used by Benson Home Solutions.",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Emergency Contact", "text": "Call (541) 321-5115 for immediate response. Available 24/7." },
    { "@type": "HowToStep", "position": 2, "name": "Inspection & Assessment", "text": "Certified technicians assess damage severity using moisture mapping equipment." },
    { "@type": "HowToStep", "position": 3, "name": "Water Extraction", "text": "Industrial-grade extraction equipment removes standing water." },
    { "@type": "HowToStep", "position": 4, "name": "Drying & Dehumidification", "text": "Strategic placement of air movers and dehumidifiers for complete structural drying." },
    { "@type": "HowToStep", "position": 5, "name": "Cleaning & Sanitizing", "text": "Antimicrobial treatment and sanitization of affected areas." },
    { "@type": "HowToStep", "position": 6, "name": "Restoration", "text": "Repair and rebuild damaged structures to pre-loss condition." }
  ]
}
```

### FAQPage Schema Template

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does water damage restoration cost in Salem Oregon?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Water damage restoration in Salem typically costs between $2,500 and $15,000 depending on severity. Category 1 (clean water) starts around $2,500, while Category 3 (contaminated water) can exceed $15,000. Benson Home Solutions provides free estimates and works directly with your insurance."
      }
    }
  ]
}
```

### Area Page Schema (Salem Example)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://bensonhomesolutions.com/areas/salem/#localbusiness",
  "name": "Benson Home Solutions — Salem, Oregon",
  "description": "Licensed maintenance, restoration, and mitigation contractor serving Salem, Oregon. CCB #258533.",
  "parentOrganization": { "@id": "https://bensonhomesolutions.com/#organization" },
  "areaServed": {
    "@type": "City",
    "name": "Salem",
    "addressRegion": "OR",
    "geo": { "@type": "GeoCoordinates", "latitude": 44.9429, "longitude": -123.0351 }
  }
}
```

---

## 5 · Implementation Guide for Agent 07 / Agent 08

### Recommended Architecture

```typescript
// lib/schema/organization.ts
export function getOrganizationSchema() { /* global org schema */ }

// lib/schema/breadcrumb.ts  
export function getBreadcrumbSchema(items: BreadcrumbItem[]) { /* dynamic breadcrumbs */ }

// lib/schema/service.ts
export function getServiceSchema(service: ServiceData) { /* per-service schema */ }

// lib/schema/faq.ts
export function getFAQSchema(questions: FAQItem[]) { /* FAQ rich results */ }

// lib/schema/emergency.ts
export function getEmergencyServiceSchema() { /* emergency page */ }

// lib/schema/area.ts
export function getAreaSchema(city: CityData) { /* area pages */ }
```

**Injection point:** Use Next.js `generateMetadata()` or a `<JsonLd>` component in each page's layout.

**Validation:** Agent 12 must include schema validation in CI using Google's Rich Results Test API or `schema-dts` TypeScript types.

---

## 6 · Next Steps

- [ ] **Agent 03:** Build entity checklists per page using schema types above
- [ ] **Agent 07/08:** Implement schema utility functions in codebase
- [ ] **Agent 12:** Add JSON-LD validation to CI pipeline
- [ ] **Agent 02 (self):** Expand with Offer/PriceSpecification schemas once Agent 10 finalizes pricing copy
- [ ] **Agent 02 (self):** Add Review/AggregateRating schema once testimonials are collected
