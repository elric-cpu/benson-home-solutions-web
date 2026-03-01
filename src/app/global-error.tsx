'use client';

import { useEffect } from 'react';
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
  }, [error]);

  return (
    <html lang="en" className={sourceSans3.variable}>
      <body className="min-h-screen bg-cream flex items-center justify-center p-6 antialiased">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 text-6xl" aria-hidden="true">
            💥
          </div>
          <h1 className="text-3xl font-bold text-oxblood mb-4">
            Critical System Error
          </h1>
          <p className="text-slate mb-8 leading-relaxed">
            The application encountered a critical error and cannot recover automatically. 
            Our engineering team has been notified.
          </p>
          <div className="space-y-4">
            <Button onClick={() => reset()} size="lg" className="w-full">
              Reload Application
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Return to Homepage
            </Button>
          </div>
          <div className="mt-12 pt-8 border-t border-slate/10">
            <p className="text-xs text-slate/50 font-mono">
              Error Digest: {error.digest || 'Unknown'}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
