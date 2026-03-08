import { Suspense } from 'react';
import { GuidedChat } from '@/components/ui';
import { GoogleAnalytics } from '@/components/analytics/DeferredAnalytics';

export function DeferredComponents() {
  return (
    <>
      <Suspense fallback={null}>
        <GuidedChat />
      </Suspense>
      <Suspense fallback={null}>
        <GoogleAnalytics />
      </Suspense>
    </>
  );
}
