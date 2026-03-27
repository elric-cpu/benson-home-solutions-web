'use client';

import { useState } from 'react';
import { AlertTriangle, Shield } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

interface PropertyCardProps {
  address: string;
  initialDescription?: string;
}

export function PropertyCard({
  address,
  initialDescription = '',
}: PropertyCardProps) {
  const [description, setDescription] = useState(initialDescription);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runAssessment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      setAssessment(data);
    } catch {
      console.error('Assessment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader className="bg-maroon text-cream">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{address}</CardTitle>
            <p className="mt-1 text-xs font-bold tracking-tighter uppercase opacity-70">
              Property Repair Profile
            </p>
          </div>
          <Shield size={32} className="opacity-20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!assessment ? (
          <div className="space-y-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the damage, known repair issues, system age, and any visible moisture..."
              className="border-maroon/10 bg-cream/30 focus:border-maroon h-32 w-full rounded-2xl border-2 p-4 text-sm font-bold transition outline-none"
            />
            <Button
              onClick={runAssessment}
              loading={loading}
              className="w-full"
            >
              Analyze Repair Risk
            </Button>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 space-y-6 duration-500">
            <div className="border-maroon/5 flex items-center gap-6 border-b pb-6">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <svg className="absolute inset-0 h-full w-full -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-maroon/10"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={226}
                    strokeDashoffset={
                      226 - (226 * assessment.scorecard.overall_health) / 100
                    }
                    className="text-maroon transition-all duration-1000"
                  />
                </svg>
                <span className="text-2xl font-black">
                  {assessment.scorecard.overall_health}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-black tracking-widest uppercase opacity-40">
                  Repair Risk Score
                </h4>
                <p className="text-xl font-bold uppercase">
                  {assessment.scorecard.overall_health > 70
                    ? 'Stable'
                    : 'High Risk'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-cream/20 rounded-xl p-4">
                <p className="mb-1 text-[10px] font-black uppercase opacity-40">
                  Roof
                </p>
                <p className="text-sm font-bold">
                  {assessment.scorecard.roof_status}
                </p>
              </div>
              <div className="bg-cream/20 rounded-xl p-4">
                <p className="mb-1 text-[10px] font-black uppercase opacity-40">
                  HVAC
                </p>
                <p className="text-sm font-bold">
                  {assessment.scorecard.hvac_status}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-red-50 p-6">
              <h4 className="mb-3 flex items-center gap-2 text-xs font-black text-red-900 uppercase">
                <AlertTriangle size={14} /> Immediate Repair Risks
              </h4>
              <ul className="space-y-2">
                {assessment.risk_factors.map((rf: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm font-bold text-red-800"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-800" />
                    {rf}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => setAssessment(null)}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              Re-evaluate Property
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
