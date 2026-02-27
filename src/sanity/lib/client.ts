import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'PLACEHOLDER',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-26',
  // Disable CDN when project ID is not yet provisioned
  useCdn:
    process.env.NODE_ENV === 'production' &&
    !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
});
