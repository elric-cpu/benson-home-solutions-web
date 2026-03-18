<aside>
🔁

**Recurring source document** for the CoT → Critique → CoV → Self-reflecting prompt loop. Each iteration updates this file. The GitHub mirror lives at `PROMPT.md` in the repo root.

</aside>

---

## Iteration 48 — Compliance & Audit Layer Live

**Date:** March 1, 2026 · Sprint 1, Day 1

**Author:** Agent 14 (Project Manager / Technical Lead)

**Status:** 🟢 **LIVE** — Lead Gen + Agreement Engine + CRM Sync + BI + Digital Signatures active.

---

## 1 · Context Card — Brand DNA

<aside>
🧬

Every prompt issued by any agent on this project **must open with this Context Card** so the AI understands the *why* behind the request. Copy-paste or reference this block verbatim.

</aside>

| **Industry** | Licensed residential & commercial general contracting — remodeling, emergency restoration, maintenance subscriptions, sitework, demolition. Oregon CCB #258533. |
| --- | --- |
| **Company** | Benson Home Solutions · Owner: Elric Benson · Est. 2014 · 200+ projects · 4.9/5 rating |
| **Target Audience** | **Primary:** Mid-Willamette Valley homeowners (Salem, Keizer, Corvallis, Albany) needing maintenance, emergency restoration, or remodeling. **Secondary:** Commercial property managers, HOA boards, church/facility stewards. **Tertiary:** Harney County residents (Burns, Riley, Drewsey) with limited local options. |
| **Tone & Voice** | Confident, direct, knowledgeable — like a contractor you trust, not a marketing brochure. Written in Elric's voice (see Voice Profile). Zero AI-sounding filler. Specific beats vague: say "$25K–$45K" not "competitive pricing." |
| **Conversion Goal** | Every page drives toward a **high-converting lead-capture moment** — estimate request, phone call, chatbot conversation, or subscription signup. Frictionless user journey from landing to action. |
| **Constraints** | Phase 1 budget: ~$87–121/month ongoing. 21 pages at launch. Must hit sub-2s LCP on 4G mobile. All AI features use streaming. No scope creep past Phase 1 deliverables. |
| **Differentiator** | Maintenance-first positioning with subscription programs, defined SLAs, and board-ready documentation. Competitors are either PM firms or small general-maintenance contractors — Benson sits in the gap with process + craftsmanship. |

---

## 2 · Current Project Status

### Timeline

| **Sprint** | **Dates** | **Focus** | **Status** |
| --- | --- | --- | --- |
| Sprint 0 | Feb 26–28 | Kickoff, audits, architecture, DNS cutover, deployment | ✅ **COMPLETE** |
| Sprint 1 | Mar 1–18 | Core build, lead gen engine, CRM integration, audit layer | 🟢 **ACTIVE** |
| Sprint 2 | Mar 19–Apr 1 | AI features (Chatbot, RAG), Cost Estimator, live preview | ⬜ Upcoming |

### Major Milestones (Mar 1)

- ✅ **Lead Gen Engine:** `TrueCostCalculator` live with HubSpot integration.
- ✅ **Agreement Engine:** AI recommendations + digital signature workflow active.
- ✅ **Audit Layer:** Immutable database triggers + versioned contract tracking live.
- ✅ **Service Tracking:** Real-time utilization views for maintenance delivery.
- ✅ **Insights Hub:** Secure Metabase client dashboards integrated.
- ✅ **Source of Truth:** Notion/Supabase sync layer for unified ops.

### Technical Stack (Locked)

- **Framework:** Next.js 15 (App Router) + TypeScript strict.
- **Data Architecture:** Supabase (PostGIS + RLS) + Drizzle ORM + Materialized Views.
- **Compliance:** Layer 1 (DB Triggers), Layer 2 (Digital Signatures), Layer 3 (Utilization).
- **Communication:** Resend (Email) + Twilio (SMS foundation) + HubSpot (CRM).

---

<aside>
⏭️

**Iteration 48 — Final Core Build State.** The Benson Home Solutions platform is now architecturally complete for its Phase 1 scope. Every lead-capture moment is tracked, every contract is versioned and auditable, and the data-to-dashboard pipeline is secure and functional. The project is ready for Sprint 2's advanced AI features (Chatbot RAG and Gcloud-native Cost Estimators).

</aside>
