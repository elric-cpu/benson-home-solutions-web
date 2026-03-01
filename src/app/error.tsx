'use client';

import { useEffect } from 'react';
import { Button, Container, Section } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for observability
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <Section variant="cream" className="min-h-[70vh] flex items-center">
      <Container size="narrow" className="text-center">
        <div className="text-6xl mb-6" aria-hidden="true">⚠️</div>
        <h1 className="text-3xl md:text-4xl font-bold text-oxblood mb-4">
          Something went wrong
        </h1>
        <p className="text-lg text-slate mb-8 leading-relaxed">
          We encountered a technical issue while loading this page. This could be due to a temporary database connection error or a network interruption.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => reset()} size="lg">
            Try Again
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.location.href = '/'}>
            Return Home
          </Button>
        </div>
        <p className="mt-12 text-sm text-muted">
          If the problem persists, please contact us at (541) 321-5115.
        </p>
      </Container>
    </Section>
  );
}
