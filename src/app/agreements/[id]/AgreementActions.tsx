'use client';

import { useState } from 'react';
import { Button, Card, CardContent } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

interface Props {
  agreementId: string;
  status: string;
  latestVersionUrl?: string | null;
}

export function AgreementActions({ agreementId, status, latestVersionUrl }: Props) {
  const [loading, setLoading] = useState(false);

  const initiateSign = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/agreements/${agreementId}/sign`, { method: 'POST' });
      const data = await res.json();
      if (data.signingUrl) {
        window.location.href = data.signingUrl;
      }
    } catch (error) {
      console.error('Signing initiation failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="sticky top-24 border-oxblood/10 shadow-elevated">
      <CardContent className="p-8">
        <h3 className="text-xl font-bold mb-4">Agreement Status</h3>
        <div className="flex items-center gap-2 mb-8">
          <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
          <span className={`text-sm font-bold uppercase tracking-widest ${status === 'active' ? 'text-green-700' : 'text-amber-700'}`}>
            {status === 'active' ? 'Fully Executed' : 'Pending Signature'}
          </span>
        </div>
        
        <div className="space-y-4">
          {status !== 'active' && (
            <Button 
              className="w-full" 
              size="lg" 
              onClick={initiateSign} 
              loading={loading}
            >
              Sign Digitally
            </Button>
          )}
          
          {latestVersionUrl && (
            <a href={latestVersionUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="outline" className="w-full">
                View Signature Link
              </Button>
            </a>
          )}

          <Button variant="ghost" className="w-full" onClick={() => window.print()}>
            Download PDF
          </Button>
        </div>
        <hr className="my-6 border-slate/10" />
        <p className="text-xs text-slate text-center leading-relaxed">
          Questions? Call our office at <strong>{BUSINESS.phone}</strong> or 
          email <strong>{BUSINESS.email}</strong>.
        </p>
      </CardContent>
    </Card>
  );
}
