import { Suspense } from 'react';
import { ChatWidgetWrapper } from '@/components/ui/ChatWidgetWrapper';
import { GoogleAnalytics } from '@/components/analytics/DeferredAnalytics';

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
