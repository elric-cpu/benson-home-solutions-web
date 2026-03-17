'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { AIChat } from '@/components/ui';
import { GoogleAnalytics } from '@/components/analytics/DeferredAnalytics';

export function DeferredComponents() {
  const pathname = usePathname();
  const isEmergencyPage = pathname === '/emergency';

  return (
    <>
      <Suspense fallback={null}>
        <AIChat
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
