'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { calculateRemodelEstimate } from '@/lib/estimating-engine';

type Grade = 'economy' | 'standard' | 'premium' | 'luxury';

export function HomeTheaterVisualizer() {
  const [grade, setGrade] = useState<Grade>('standard');
  const [sqft, setSqft] = useState<number>(200);
  const [zip, setZip] = useState('');
  const [seats, setSeats] = useState(4);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    low: number;
    high: number;
    formula: string;
  } | null>(null);

  const handleCalculate = async () => {
    if (!email) {
      alert('Please enter your email to receive the estimate.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = calculateRemodelEstimate('HOME_THEATER', {
        zip,
        materialGrade: grade,
        sqft,
      });

      // Add extra for seating
      const seatCost = seats * 1200;
      const finalLow = res.low + seatCost;
      const finalHigh = res.high + seatCost;

      // Capture Lead
      await fetch('/api/calculator/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          propertyType: 'residential',
          address: { postcode: zip, formatted: `Zip: ${zip}` },
          costs: { home_theater: { annual: finalLow, confidence: 'medium' } },
          total: finalLow,
          source: 'home-theater-estimator',
        }),
      });

      setResult({
        low: finalLow,
        high: finalHigh,
        formula: res.formula + ' + Seating Component',
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
                    Room Size (Sq Ft)
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
                  Acoustic & Tech Grade
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as Grade)}
                  className="border-slate/20 focus:border-oxblood w-full rounded-lg border p-3 outline-none"
                >
                  <option value="economy">Economy (Basic Panels + TV)</option>
                  <option value="standard">Standard (Acoustic + Riser)</option>
                  <option value="premium">
                    Premium (4K Projector + Atmos)
                  </option>
                  <option value="luxury">
                    Luxury (Full Forensic Acoustic)
                  </option>
                </select>
              </div>

              <div>
                <label className="text-slate mb-2 block text-sm font-bold tracking-widest uppercase">
                  Number of Seats
                </label>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-oxblood mt-1 text-center text-sm font-bold">
                  {seats} Cinema Recliners
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

            <div className="bg-charcoal/95 relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 p-6 md:p-12">
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
              </div>

              {/* Dynamic Room SVG */}
              <div className="relative z-10 w-full max-w-[300px]">
                <svg
                  viewBox="0 0 200 200"
                  className="h-auto w-full transition-all duration-500"
                >
                  {/* Room Shell */}
                  <rect
                    x="10"
                    y="10"
                    width="180"
                    height="180"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                  />

                  {/* Screen */}
                  <rect
                    x="50"
                    y="15"
                    width="100"
                    height="5"
                    fill={grade === 'luxury' ? '#4C0C14' : '#fff'}
                    className="animate-pulse"
                  />
                  <text
                    x="100"
                    y="35"
                    textAnchor="middle"
                    className="fill-white/40 text-[8px] font-bold uppercase"
                  >
                    {grade === 'luxury'
                      ? '150" Micro-Perf'
                      : 'Reference Screen'}
                  </text>

                  {/* Seating */}
                  {Array.from({ length: Math.min(seats, 6) }).map((_, i) => (
                    <rect
                      key={i}
                      x={40 + i * 25}
                      y="140"
                      width="20"
                      height="20"
                      rx="4"
                      fill="rgba(255,255,255,0.1)"
                      stroke="rgba(255,255,255,0.3)"
                    />
                  ))}
                  {seats > 6 &&
                    Array.from({ length: seats - 6 }).map((_, i) => (
                      <rect
                        key={i + 6}
                        x={50 + i * 25}
                        y="110"
                        width="20"
                        height="20"
                        rx="4"
                        fill="rgba(255,255,255,0.05)"
                        stroke="rgba(255,255,255,0.2)"
                      />
                    ))}

                  {/* Acoustics */}
                  <rect x="12" y="50" width="4" height="40" fill="#4C0C14" />
                  <rect x="184" y="50" width="4" height="40" fill="#4C0C14" />
                </svg>
              </div>

              <div className="relative z-10 mt-6 text-center">
                <p className="text-xs font-bold tracking-widest text-white/60 uppercase">
                  Live Layout Preview
                </p>
                <p className="mt-1 text-[10px] text-white/30">
                  {sqft} SQFT • {grade.toUpperCase()} GRADE • {seats} SEATS
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
            Generate Media Room Estimate
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
              2026 Theater Investment
            </Badge>
            <div className="text-5xl font-black tabular-nums md:text-7xl">
              ${result.low.toLocaleString()} - ${result.high.toLocaleString()}
            </div>
            <p className="mt-4 text-xl opacity-80">
              Estimated total for a {sqft} sqft dedicated {grade} theater.
            </p>
            <p className="mx-auto mt-8 max-w-lg text-xs italic opacity-50">
              *Calculated using March 2026 trade rates. Includes riser
              construction, specialized acoustic remediation, and professional
              calibration.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
