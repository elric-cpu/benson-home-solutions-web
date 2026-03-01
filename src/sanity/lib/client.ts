import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const isConfigured = !!projectId && projectId !== 'PLACEHOLDER';

const baseClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion: '2026-02-26',
  useCdn: process.env.NODE_ENV === 'production' && isConfigured,
});

// If not configured, proxy the fetch method to return null immediately
export const client = isConfigured
  ? baseClient
  : new Proxy(baseClient, {
      get(target, prop) {
        if (prop === 'fetch') {
          return () => Promise.resolve(null);
        }
        return Reflect.get(target, prop);
      },
    });

