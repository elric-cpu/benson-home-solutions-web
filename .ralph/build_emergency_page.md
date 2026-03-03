# Objective
Build the Emergency Services page at `/emergency`. This page will provide immediate contact options for emergency situations and information about Benson Home Solutions' rapid response services.

# Key Files & Context
- `src/app/emergency/page.tsx`: This is the main page component where the content will be added.
- `src/lib/constants.ts`: Contains business contact information (`BUSINESS.afterhoursPhone`).
- `src/components/ui/Button.tsx`: Existing Button component to be used for CTAs, specifically `variant="emergency"`.
- `src/components/ui/Section.tsx`, `src/components/ui/Container.tsx`, `src/components/ui/Card.tsx`: Existing layout and styling components.
- `src/components/seo/json-ld.tsx`: For `LocalBusinessJsonLd` and `ServiceJsonLd`.
- `tests/emergency.spec.ts` (new file): Playwright smoke test for the new page.

# Implementation Steps
1. **Implement `/emergency/page.tsx`:**
    - Create a main section with a clear emergency headline and description.
    - Add a primary "Call Now" CTA using `Button variant="emergency"` with `tel:` link to `BUSINESS.afterhoursPhone`.
    - Add a secondary "Emergency SMS" CTA (placeholder for now, as Twilio setup is a P3 item). This will be a regular button for now, linking to a placeholder.
    - Include a section detailing the rapid response process and what clients can expect.
    - Embed `LocalBusinessJsonLd` and `ServiceJsonLd` for SEO.
    - Ensure mobile-first responsiveness.
    - Add a placeholder for an auto-opening chatbot (this is a future AI integration).

2. **Create Playwright Smoke Test:**
    - Create `tests/emergency.spec.ts`.
    - Verify the page loads successfully.
    - Check for the presence of the main headline.
    - Verify the "Call Now" button is present and has the correct `tel:` link.

3. **Verify Functionality:**
    - Run `npm run dev` and manually navigate to `/emergency`.
    - Check responsive layout on different screen sizes.
    - Click the "Call Now" link (should attempt to dial).
    - Ensure there are no console errors or accessibility violations (using browser dev tools).

# Verification & Testing
- Run `npm run build` to ensure no build errors.
- Run `npm test` to execute the Playwright smoke test for the emergency page.
- Manually inspect the `/emergency` page in development mode for visual correctness and functionality.
- Use Lighthouse (or similar tool) to check for LCP < 2s and accessibility (axe-core) compliance.
