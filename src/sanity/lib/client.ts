import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const isConfigured =
  !!projectId &&
  projectId !== 'PLACEHOLDER' &&
  projectId !== 'production' &&
  projectId !== '';

if (!isConfigured && process.env.NODE_ENV === 'production') {
  console.warn(
    `[Sanity Client] CMS is not configured (Project ID: ${projectId || 'MISSING'}). Falling back to static content.`,
  );
}

const baseClient = createClient({
  projectId: isConfigured ? (projectId as string) : 'placeholder',
  dataset,
  apiVersion: '2026-02-26',
  useCdn: process.env.NODE_ENV === 'production' && isConfigured,
});

// If not configured, proxy the fetch method to return null immediately
export const client = isConfigured
  ? baseClient
  : new Proxy(baseClient, {
      get(target, prop, receiver) {
        if (prop === 'fetch') {
          return () => Promise.resolve(null);
        }
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
          return value.bind(target);
        }
        return value;
      },
    });
