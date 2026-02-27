import { NextResponse } from 'next/server';

/**
 * Health check endpoint for uptime monitoring.
 * Returns 200 with basic service status.
 */
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local',
    environment: process.env.VERCEL_ENV || 'development',
    services: {
      database: !!process.env.DATABASE_URL,
      email: !!process.env.RESEND_API_KEY,
      sanity: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      analytics: !!process.env.GA4_MEASUREMENT_ID,
      sentry: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
    },
  };

  return NextResponse.json(health, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
