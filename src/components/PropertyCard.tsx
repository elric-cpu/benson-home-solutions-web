'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

interface PropertyCardProps {
  address: string;
  initialDescription?: string;
}

export function PropertyCard({ address, initialDescription = '' }: PropertyCardProps) {
  const [description, setDescription] = useState(initialDescription);
  const [audit, setAudit] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      setAudit(data);
    } catch (err) {
      console.error('Audit failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="bg-maroon text-cream">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{address}</CardTitle>
            <p className="text-xs opacity-70 mt-1 uppercase tracking-tighter font-bold">Forensic Health Profile</p>
          </div>
          <Shield size={32} className="opacity-20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!audit ? (
          <div className="space-y-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the building envelope, HVAC age, and any visible moisture..."
              className="w-full h-32 bg-cream/30 border-2 border-maroon/10 rounded-2xl p-4 text-sm font-bold focus:border-maroon outline-none transition"
            />
            <Button onClick={runAudit} loading={loading} className="w-full">
              Analyze Building Integrity
            </Button>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-maroon/5">
              <div className="relative h-20 w-20 flex items-center justify-center">
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
                    strokeDashoffset={226 - (226 * audit.scorecard.overall_health) / 100}
                    className="text-maroon transition-all duration-1000"
                  />
                </svg>
                <span className="text-2xl font-black">{audit.scorecard.overall_health}</span>
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest opacity-40">Integrity Score</h4>
                <p className="text-xl font-bold uppercase">{audit.scorecard.overall_health > 70 ? 'Stable' : 'High Risk'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-cream/20 rounded-xl">
                <p className="text-[10px] font-black uppercase opacity-40 mb-1">Roof</p>
                <p className="font-bold text-sm">{audit.scorecard.roof_status}</p>
              </div>
              <div className="p-4 bg-cream/20 rounded-xl">
                <p className="text-[10px] font-black uppercase opacity-40 mb-1">HVAC</p>
                <p className="font-bold text-sm">{audit.scorecard.hvac_status}</p>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-2xl">
              <h4 className="text-xs font-black uppercase text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle size={14} /> Immediate Threats
              </h4>
              <ul className="space-y-2">
                {audit.risk_factors.map((rf: string, i: number) => (
                  <li key={i} className="text-sm font-bold text-red-800 flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-800 shrink-0" />
                    {rf}
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={() => setAudit(null)} variant="secondary" size="sm" className="w-full">
              Re-evaluate Property
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
