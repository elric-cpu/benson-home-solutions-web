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
    <div className={cn('relative min-h-[300px] bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden', className)}>
      <div 
        id={`hs-form-${formId}`} 
        ref={formRef} 
        className="relative z-10"
      />
      {/* Skeleton Pulse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-slate-200 to-transparent -translate-x-full animate-shimmer" />
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
