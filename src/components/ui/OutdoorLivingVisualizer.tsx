'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { calculateRemodelEstimate } from '@/lib/estimating-engine';

type Grade = 'economy' | 'standard' | 'premium' | 'luxury';

export function OutdoorLivingVisualizer() {
  const [grade, setGrade] = useState<Grade>('standard');
  const [sqft, setSqft] = useState<number>(300);
  const [zip, setZip] = useState('');
  const [features, setSelectedFeatures] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    low: number;
    high: number;
    formula: string;
  } | null>(null);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature],
    );
  };

  const handleCalculate = async () => {
    if (!email) {
      alert('Please enter your email to receive the estimate.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Basic calculation using the estimating engine
      const res = calculateRemodelEstimate('OUTDOOR_LIVING', {
        zip,
        materialGrade: grade,
        sqft,
      });

      // Add extra for specific features (ballpark)
      const featureAddons = features.reduce((acc, f) => {
        if (f === 'kitchen') return acc + 12000;
        if (f === 'roof') return acc + 8000;
        if (f === 'fire') return acc + 4500;
        return acc;
      }, 0);

      const finalLow = res.low + featureAddons;
      const finalHigh = res.high + featureAddons;

      // Capture Lead
      await fetch('/api/calculator/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          propertyType: 'residential',
          address: { postcode: zip, formatted: `Zip: ${zip}` },
          costs: { outdoor_living: { annual: finalLow, confidence: 'medium' } },
          total: finalLow,
          source: 'outdoor-living-estimator',
        }),
      });

      setResult({
        low: finalLow,
        high: finalHigh,
        formula: res.formula + ' + Feature Add-ons',
      });
    } catch (error) {
      console.error('Lead capture failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-oxblood/10 shadow-elevated">
        <CardContent className="p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-slate mb-2 block text-sm font-bold tracking-widest uppercase">
                    Layout Size (Sq Ft)
                  </label>
                  <input
                    type="number"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="border-slate/20 focus:border-oxblood w-full rounded-lg border p-3 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate mb-2 block text-sm font-bold tracking-widest uppercase">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    value={zip}
                    placeholder="97321"
                    onChange={(e) => setZip(e.target.value)}
                    className="border-slate/20 focus:border-oxblood w-full rounded-lg border p-3 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate mb-2 block text-sm font-bold tracking-widest uppercase">
                  Material Quality
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as Grade)}
                  className="border-slate/20 focus:border-oxblood w-full rounded-lg border p-3 outline-none"
                >
                  <option value="economy">Economy (Pressure Treated)</option>
                  <option value="standard">Standard (Cedar/Composite)</option>
                  <option value="premium">Premium (High-End Composite)</option>
                  <option value="luxury">Luxury (Ipe / Full Custom)</option>
                </select>
              </div>

              <div>
                <label className="text-slate mb-4 block text-sm font-bold tracking-widest uppercase">
                  Additional Features
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'kitchen', label: 'Outdoor Kitchen' },
                    { id: 'roof', label: 'Covered Structure' },
                    { id: 'fire', label: 'Built-in Fire Pit' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                        features.includes(f.id)
                          ? 'bg-oxblood text-cream shadow-md'
                          : 'bg-slate/5 text-slate hover:bg-slate/10'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <label className="text-slate mb-2 block text-sm font-bold tracking-widest uppercase">
                  Email for Delivery
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-slate/20 focus:border-oxblood w-full rounded-lg border p-3 outline-none"
                />
              </div>
            </div>

            <div className="bg-slate/5 border-slate/20 relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 md:p-12">
              {/* Dynamic Deck SVG */}
              <div className="relative z-10 w-full max-w-[300px]">
                <svg viewBox="0 0 200 200" className="h-auto w-full">
                  {/* Grass/Background */}
                  <rect x="0" y="0" width="200" height="200" fill="#f1f5f9" />

                  {/* Deck Surface */}
                  <rect
                    x="20"
                    y="40"
                    width="160"
                    height="120"
                    fill={grade === 'luxury' ? '#4C0C14' : '#92400e'}
                    rx="2"
                  />

                  {/* Deck Planks */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line
                      key={i}
                      x1={20 + i * 13.3}
                      y1="40"
                      x2={20 + i * 13.3}
                      y2="160"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Kitchen Feature */}
                  {features.includes('kitchen') && (
                    <g>
                      <rect
                        x="140"
                        y="50"
                        width="30"
                        height="60"
                        fill="#475569"
                      />
                      <rect
                        x="145"
                        y="55"
                        width="20"
                        height="15"
                        fill="#1e293b"
                      />
                    </g>
                  )}

                  {/* Roof Feature */}
                  {features.includes('roof') && (
                    <path
                      d="M 15 40 L 100 10 L 185 40"
                      fill="none"
                      stroke="#4C0C14"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Fire Pit Feature */}
                  {features.includes('fire') && (
                    <circle
                      cx="100"
                      cy="100"
                      r="15"
                      fill="#334155"
                      stroke="#f97316"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                  )}
                </svg>
              </div>

              <div className="mt-6 text-center">
                <p className="text-slate/60 text-xs font-bold tracking-widest uppercase">
                  Design Preview
                </p>
                <p className="text-slate/40 mt-1 text-[10px]">
                  {sqft} SQFT • {grade.toUpperCase()} • {features.length}{' '}
                  ADD-ONS
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            size="lg"
            className="mt-10 w-full"
            loading={isSubmitting}
          >
            Generate Outdoor Living Estimate
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-oxblood text-cream border-none shadow-xl">
          <CardContent className="p-8 text-center">
            <Badge
              variant="secondary"
              className="bg-cream/10 border-cream/20 text-cream mb-4 uppercase"
            >
              Projected Investment Range
            </Badge>
            <div className="text-5xl font-black tabular-nums md:text-7xl">
              ${result.low.toLocaleString()} - ${result.high.toLocaleString()}
            </div>
            <p className="mt-4 text-xl opacity-80">
              Estimated total for a {sqft} sqft custom outdoor space.
            </p>
            <p className="mx-auto mt-8 max-w-lg text-xs italic opacity-50">
              *Estimates include regional labor multipliers and material
              scarcity index for Q1 2026. Final pricing requires physical site
              grading assessment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
