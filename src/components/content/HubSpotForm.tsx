'use client';

import { useEffect, useRef } from 'react';

interface HubSpotFormProps {
  region?: string;
  portalId: string;
  formId: string;
  onFormSubmitted?: () => void;
  className?: string;
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
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
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
    <div className={className}>
      <div id={`hs-form-${formId}`} ref={formRef} />
    </div>
  );
}
