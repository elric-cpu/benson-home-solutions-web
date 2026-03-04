'use client';

import dynamic from 'next/dynamic';

const GoogleAnalyticsImpl = dynamic(
  () =>
    import('@/components/analytics/google-analytics').then(
      (mod) => mod.GoogleAnalytics,
    ),
  { ssr: false },
);

export function GoogleAnalytics() {
  return <GoogleAnalyticsImpl />;
}
