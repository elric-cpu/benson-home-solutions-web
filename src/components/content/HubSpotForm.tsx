'use client';

import { useEffect, useRef } from 'react';

interface HubSpotFormProps {
  region?: string;
  portalId: string;
  formId: string;
  onFormSubmitted?: () => void;
  className?: string;
}

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
          onFormSubmitted?: () => void;
        }) => void;
      };
    };
  }
}

export function HubSpotForm({
  region = 'na1',
  portalId,
  formId,
  onFormSubmitted,
  className,
}: HubSpotFormProps) {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region,
          portalId,
          formId,
          target: `#hs-form-${formId}`,
          onFormSubmitted: () => {
            if (onFormSubmitted) onFormSubmitted();
          },
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [region, portalId, formId, onFormSubmitted]);

  return (
    <div
      className={cn(
        'relative min-h-[300px] overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50',
        className,
      )}
    >
      <div id={`hs-form-${formId}`} ref={formRef} className="relative z-10" />
      {/* Skeleton Pulse */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <div className="animate-shimmer h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
