# Phase 2 Strategy Audit: The iGUIDE Roundtable
## Date: Friday, March 13, 2026
## Objective: Critical Review of the iGUIDE & Spatial Data Integration Plan

---

### **The Participants**

**Elias Mercer (PM):** "The board is open. We’re moving from 'Lead-Gen' to 'Digital Twin' with Phase 2. The plan is to ingest iGUIDE spatial data and map it to our maintenance logic. Dima, you were the loudest about the VA security layer—does this plan solve it?"

**Dima Volkov (Backend):** *(Tapping a pen on a schematic)* "It’s a start, Elias. Moving iGUIDE tokens to `process.env` (Server-only) is the bare minimum. But the RLS (Row-Level Security) needs to be airtight. If a VA from the Philippines is doing data entry for a property in Sweet Home, they only need `SELECT` access to the `property_rooms` for *that* specific project. I want a 'Project-Locked' session token for any external contractor. No universal access. If the token isn't tied to a specific project ID, the API should return a 403. Otherwise, we’re just building a target for data scrapers."

**Mari Vega (UX):** "I agree with Dima on the lock-down, but let’s talk about the 'Teleport' feature. Silas, if a user clicks 'View Forensic Proof,' they shouldn't just jump into a 3D bubble. They need a 'Contextual Overlay.' We should show the 'Maintenance Risk' level as a HUD (Heads-Up Display) *inside* the iGUIDE iframe. Can we inject CSS or HTML into their viewer, or are we stuck with their default UI?"

**Silas Crowley (AEO):** "The iGUIDE Viewer API allows for 'Custom HUD' elements if we wrap the iframe correctly. But Mari, don't over-design it. The 'Authority' comes from the *raw data*. My concern is the `Dataset` schema. If we ingest 50 rooms for one property, are we bloating the `LocalBusiness` JSON-LD? I suggest we only promote 'P0 Rooms' (Kitchen, Attic, Basement) to the search engine. We don't need Google indexing the client's guest bathroom closet."

**Cole Brennan (Frontend):** "Thank you, Silas. Bloat is the enemy. Every iGUIDE iframe we embed adds about 2.2MB to the initial page weight. We need 'Lazy-Loading' for the 3D viewer. It shouldn't initialize until the user scrolls to the 'Forensic Proof' section or clicks an 'Activate 3D' button. If we load the full 3D engine on page-load, our Lighthouse score will drop from 95 to 60. I won't allow it."

**Earl “Sawhorse” Dalton:** *(Leaning in)* "Let's talk about the 'Math.' Cole and Jae, you’re using 'mm' from the API. That’s fine for the database, but a homeowner in Linn County doesn't know what a 'millimeter' is. And more importantly—ANSI standards. iGUIDE measures to the *exterior* wall. If we're quoting paint or flooring based on that, we're overcharging them by 10%. We need a 'Net-to-Gross' calculation that subtracts the wall footprint before the math hits the `TrueCostCalculator`."

**Jae Park (AI Engineer):** "Earl's right. The 'Wall Footprint' is about 6-8% of the total area. I’ll add a 'Construction Buffer' coefficient to the AI normalization logic. It’ll detect the `measurement_standard` from the API and adjust accordingly. If it’s ANSI Z765, we apply a 0.92 multiplier to get 'Paintable Surface Area.' That keeps the quotes honest."

**Vince Calder (Backlinks):** "Wait—the 'Teleport' links. Can we make them shareable? If Elric sends a 'Forensic Proof' link to a lender or an insurance adjuster, does it work for them too? That’s the real 'Authority' play. We aren't just showing a tour; we’re providing a 'Lender-Ready' documentation asset."

**Dima Volkov:** "Only if the lender has a 'Guest Token,' Vince. Again—security. We can't have public links to the inside of a client's home. I'll implement a 'Timed Guest Access' feature. Elric generates a link, it's valid for 72 hours, and it's logged. Audit trails for everything."

**Elias Mercer (PM):** "Final verdict, Elric? We have the security lock-down (Dima), the performance lazy-load (Cole), the 'Construction Math' adjustment (Earl/Jae), and the 'Timed Guest Access' for lenders (Vince)."

**Elric Benson:** "The 'Lender-Ready' part is key. If I can send a link to a bank and they see the exact repair with a time-stamp, the check gets cut faster. Do it. But Cole... keep it fast. If it takes 10 seconds to load a 3D room on a job site in Burns, it's useless to me."

---
**STATUS: PHASE 2 PLAN AUDITED & IMPROVED**
**REVISIONS:** 
1. Add **Lazy-Loading** to `InteractiveViewer.tsx`.
2. Implement **'Net-to-Gross' Construction Multiplier** (0.92x) for material quotes.
3. Build **'Timed Guest Access'** tokens for lenders/adjusters.
4. **Project-Locked VA Tokens** for RLS.
