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

/**
 * Enhanced client with a 5-second fetch timeout
 */
const enhancedClient = new Proxy(baseClient, {
  get(target, prop, receiver) {
    if (prop === 'fetch') {
      const originalFetch = target.fetch.bind(target);
      return async <T = unknown>(
        ...args: Parameters<typeof originalFetch>
      ): Promise<T> => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        try {
          return (await Promise.race([
            originalFetch(...args),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('Sanity fetch timeout')), 5000),
            ),
          ])) as T;
        } finally {
          clearTimeout(timeoutId);
        }
      };
    }
    const value = Reflect.get(target, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(target);
    }
    return value;
  },
});

// If not configured, proxy the fetch method to return null immediately
export const client = isConfigured
  ? enhancedClient
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
