# Analytics Tracking Plan v1 — GA4 + Sentry (Agent 13 Deliverable)

> [!NOTE]
> **Sprint 1 Deliverable** — Agent 13 (Analytics & CRO Specialist)

---

## 1 · Analytics Stack

---

## 2 · GA4 Event Taxonomy

### Automatically Collected Events (no config needed)

- `page_view`, `session_start`, `first_visit`, `scroll`, `click`, `file_download`
### Custom Events — Lead Generation

### Custom Events — Engagement

### Custom Events — E-commerce (Subscription)

---

## 3 · Conversion Funnel Definitions

### Primary Funnel: Service Lead

```javascript
page_view → cta_click → generate_lead OR phone_call_click
```

### Emergency Funnel

```javascript
page_view (emergency) → emergency_call_click OR sms_sent OR chat_started
```

### Subscription Funnel

```javascript
page_view (subscription) → subscription_interest → view_item → begin_checkout → purchase
```

### Calculator Lead Magnet Funnel

```javascript
page_view (calculator) → calculator_started → calculator_completed → generate_lead
```

---

## 4 · Custom Dimensions & User Properties

---

## 5 · Sentry Error Tracking Configuration

### Setup

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,  // 10% performance sampling
  replaysSessionSampleRate: 0.01,  // 1% session replay
  replaysOnErrorSampleRate: 1.0,  // 100% replay on error
  environment: process.env.VERCEL_ENV || 'development',
});
```

### Custom Error Contexts

- **Contact form failures:** Capture form data (sanitized) + error
- **Chatbot errors:** Capture conversation state + API failure
- **Stripe payment failures:** Capture error code (no PII)
- **Sanity CMS fetch failures:** Capture query + response status
- **Neon DB connection errors:** Capture query type + timeout info
### Alert Rules

---

## 6 · Dashboard Specifications

### Dashboard 1: Executive Overview (Weekly)

- Total sessions, unique users, bounce rate
- Conversion rate (leads / sessions)
- Top 5 pages by traffic
- Lead count by source (organic, direct, referral)
- Revenue from subscriptions (Stripe data)
### Dashboard 2: Lead Generation

- Leads by service type
- Leads by source page
- Phone calls vs. form fills vs. chat leads
- Time to first interaction
- Lead quality score (if chatbot captures urgency)
### Dashboard 3: Content Performance

- Page-level engagement (scroll depth, time on page)
- FAQ expansion rates
- Calculator completion rates
- Internal link click-through rates
- Exit pages analysis
### Dashboard 4: Technical Health

- Core Web Vitals (LCP, INP, CLS) trend
- Error rate by page
- API response times
- Uptime percentage
- Lighthouse score trend
---

## 7 · Implementation Checklist

### Phase 1: Foundation (Sprint 1-2)

- [ ] Install GA4 measurement snippet via `next/script`
- [ ] Configure Sentry SDK with correct DSN
- [ ] Set up base conversion events (`generate_lead`, `phone_call_click`)
- [ ] Create custom dimensions in GA4 admin
- [ ] Set up GA4 data stream for [bensonhomesolutions.com](http://bensonhomesolutions.com/)
- [ ] Configure cross-domain tracking (if needed for Stripe checkout)
### Phase 2: Enhanced Tracking (Sprint 3)

- [ ] Implement all custom events from Section 2
- [ ] Set up funnel visualizations in GA4 Explore
- [ ] Configure Sentry alert rules
- [ ] Build executive dashboard in GA4
- [ ] Set up Vercel Analytics
### Phase 3: Optimization (Sprint 4+)

- [ ] A/B testing framework setup
- [ ] Heatmap integration (if budget allows)
- [ ] CRO experiment tracking
- [ ] Automated weekly report generation
---

## 8 · Privacy & Compliance

- **Cookie consent:** Required for GA4 in Oregon — implement banner with opt-in/opt-out
- **Data retention:** Set GA4 retention to 14 months
- **IP anonymization:** Enabled by default in GA4
- **PII:** NEVER send PII (email, phone, name) to GA4. Use hashed user IDs only.
- **Sentry:** Scrub PII from error reports. No session replay of form inputs.
---

## 9 · Next Steps

- [ ] **Agent 08:** Implement GA4 and Sentry SDKs in Next.js
- [ ] **Agent 09:** Instrument chatbot events (`chat_started`, `chat_lead_captured`)
- [ ] **Agent 07:** Add `data-analytics` attributes to CTA buttons for easy event binding
- [ ] **Agent 12:** Validate event firing in CI with Playwright + network inspection
- [ ] **Elric:** Set `GA4_MEASUREMENT_ID` and `NEXT_PUBLIC_SENTRY_DSN` in Vercel env vars
