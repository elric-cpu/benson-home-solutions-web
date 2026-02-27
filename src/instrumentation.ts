export async function register() {
  // Sentry is loaded conditionally so the app boots cleanly even
  // when NEXT_PUBLIC_SENTRY_DSN is not yet configured.
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
    });
  }
}
