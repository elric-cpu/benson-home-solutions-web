'use client';

import { Suspense } from 'react';
import CalculatorPage from './client';

export default function CalculatorPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalculatorPage />
    </Suspense>
  );
}
