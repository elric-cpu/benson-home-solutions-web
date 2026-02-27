// Sentry removed — @sentry/nextjs peer dep incompatible with Next.js 16
// TODO: Re-add Sentry in Sprint 2 when @sentry/nextjs ships Next 16 support
// See: https://github.com/getsentry/sentry-javascript/issues/18006

export async function register() {
  // No-op until Sentry is re-integrated
  // Original code dynamically imported @sentry/nextjs for nodejs + edge runtimes
}
