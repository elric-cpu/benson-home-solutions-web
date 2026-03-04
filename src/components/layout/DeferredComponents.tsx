'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ChatWidgetWrapper = dynamic(
  () => import('@/components/ui').then((mod) => mod.ChatWidgetWrapper),
  { ssr: false },
);

const GoogleAnalytics = dynamic(
  () =>
    import('@/components/analytics/google-analytics').then(
      (mod) => mod.GoogleAnalytics,
    ),
  { ssr: false },
);

export function DeferredComponents() {
  return (
    <>
      <Suspense fallback={null}>
        <ChatWidgetWrapper />
      </Suspense>
      <Suspense fallback={null}>
        <GoogleAnalytics />
      </Suspense>
    </>
  );
}
