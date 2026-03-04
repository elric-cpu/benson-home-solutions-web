import * as Sentry from '@sentry/nextjs';

export async function register() {
  // Sentry is automatically initialized via withSentryConfig in next.config.ts
}

export const onRequestError = Sentry.captureRequestError;
