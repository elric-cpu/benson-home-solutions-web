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
    <Section variant="cream" className="flex min-h-[70vh] items-center">
      <Container size="narrow" className="text-center">
        <div className="mb-6 text-6xl" aria-hidden="true">
          ⚠️
        </div>
        <h1 className="text-oxblood mb-4 text-3xl font-bold md:text-4xl">
          Something went wrong
        </h1>
        <p className="text-slate mb-8 text-lg leading-relaxed">
          We encountered a technical issue while loading this page. This could
          be due to a temporary database connection error or a network
          interruption.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button onClick={() => reset()} size="lg">
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = '/')}
          >
            Return Home
          </Button>
        </div>
        <p className="text-muted mt-12 text-sm">
          If the problem persists, please contact us at (541) 321-5115.
        </p>
      </Container>
    </Section>
  );
}
