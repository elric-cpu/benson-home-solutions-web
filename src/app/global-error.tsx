'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { sourceSans3 } from '@/lib/fonts';
import { Button } from '@/components/ui';
import './globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Application Error:', error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" className={sourceSans3.variable}>
      <body className="bg-cream flex min-h-screen items-center justify-center p-6 antialiased">
        <div className="w-full max-w-md text-center">
          <div className="mb-8 text-6xl" aria-hidden="true">
            💥
          </div>
          <h1 className="text-oxblood mb-4 text-3xl font-bold">
            Critical System Error
          </h1>
          <p className="text-slate mb-8 leading-relaxed">
            The application encountered a critical error and cannot recover
            automatically. Our engineering team has been notified.
          </p>
          <div className="space-y-4">
            <Button onClick={() => reset()} size="lg" className="w-full">
              Reload Application
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/')}
              className="w-full"
            >
              Return to Homepage
            </Button>
          </div>
          <div className="border-slate/10 mt-12 border-t pt-8">
            <p className="text-slate/50 font-mono text-xs">
              Error Digest: {error.digest || 'Unknown'}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
