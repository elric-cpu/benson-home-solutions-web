# Unresolved Issues

## Genkit/Firebase Integration

The Genkit flows are not being called from the Next.js API routes. The flows are defined in a separate Firebase Functions project, and the Next.js app is not correctly calling the Firebase Function URLs.

**Attempts to fix:**
- I tried to manually construct the Firebase Function URLs, but the tests still failed.
- I tried to deploy the Firebase Functions, but I was unable to do so because I am in a non-interactive environment and cannot authenticate.

**Next steps:**
- The user needs to manually deploy the Firebase Functions.
- The user needs to verify that the Firebase Function URLs are correct and that the Next.js app is correctly calling them.
