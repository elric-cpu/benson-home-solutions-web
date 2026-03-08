'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { GuidedChat } from '@/components/ui';
import { GoogleAnalytics } from '@/components/analytics/DeferredAnalytics';

export function DeferredComponents() {
  const pathname = usePathname();
  const isEmergencyPage = pathname === '/emergency';

  return (
    <>
      <Suspense fallback={null}>
        <GuidedChat
          key={isEmergencyPage ? 'emergency' : 'start'}
          autoOpen={isEmergencyPage}
          initialNode={isEmergencyPage ? 'emergency' : 'start'}
        />
      </Suspense>
      <Suspense fallback={null}>
        <GoogleAnalytics />
      </Suspense>
    </>
  );
}
