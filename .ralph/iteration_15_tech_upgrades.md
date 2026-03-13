# Iteration 15: Senior Principal Tech Upgrades (2026 Standard)

This plan integrates the "Hammer & Grind" 2026 Tech Stack standards into the Benson Home Solutions (BHS) platform. It elevates BHS from a "maintenance-first contractor" to a "data-driven property oversight firm."

## 1. Phase 1: Precision Surveys (3D & Spatial Data)
**Objective:** Replace placeholder "Coming Soon" visualizers with actual spatial data integration.
*   **Action:** Integrate the **iGUIDE API** (or Matterport SDK) into the `ToolsPage`.
*   **Requirement:** When a site assessment is scheduled, a 3D scan is automatically linked to the client's `Property Card`.
*   **UI Update:** Update `src/app/tools/page.tsx` to include "Launch Virtual Assessment" for active projects.
*   **Senior Principal Signal:** "We don't just measure; we create a 1mm-accurate digital twin of your building envelope."

## 2. Phase 2: Authority Assets (Video-First Methodology)
**Objective:** Replace text-heavy explainers with high-authority video conversions.
*   **Action:** Implement **Mux** or **Cloudinary Video** for hosting "Methodology Briefs."
*   **Implementation:**
    *   Short (60s) authoritative videos for each `/methodology/*` page.
    *   Gated video content in the `SubscriptionRecommender` results.
*   **Strategy:** Elric Benson (Owner) explains the *Why* behind the *How*. (Ref: EP261 Client Conversion).

## 3. Phase 3: Forensic Verification (Automated Documentation)
**Objective:** Create an immutable "Audit Trail" for every maintenance job.
*   **Action:** Integrate **CompanyCam API** or a custom **Sanity Field Service** hook.
*   **Requirement:** Every photo taken in the field is timestamped, GPS-tagged, and synced to the client's "Subscription Dashboard."
*   **Code Change:** Create `src/lib/services/forensic-docs.ts` to handle secure uploads and metadata verification.

## 4. Phase 4: Operational Framework (The Hammer & Grind Layer)
**Objective:** Institutionalize the productivity and leadership models from the Episode Guide.
*   **Action:** Update `docs/operations-manual.md` with:
    *   **After-Action Reviews (AARs):** Required 15-minute debrief after every job completion.
    *   **Decision Windows:** Admin tasks and pricing calls restricted to 8:00 AM – 10:30 AM.
    *   **VA Integration:** Hire an international Virtual Assistant ($10/hr) to manage the "CompanyCam to Sanity" data sync and lead follow-ups.

## 5. Success Metrics
*   **Conversion Rate:** Increase tool-to-lead conversion by 25% via Video Gates.
*   **Trust Signal:** 100% of high-value projects include a 3D digital twin.
*   **Efficiency:** Reduce "Decision Fatigue" for Elric by delegating 40% of admin tasks to the VA layer.

---
**Status:** Plan Drafted (Senior Principal Standard).
**Next Step:** User Approval for implementation of Phase 1 (iGUIDE/Matterport Research & UI).
