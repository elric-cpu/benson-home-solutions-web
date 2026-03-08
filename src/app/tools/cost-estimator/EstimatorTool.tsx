'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { AddressAutocomplete } from '@/components/ui/AddressAutocomplete';
import { calculateRemodelEstimate } from '@/lib/estimating-engine';

type RemodelType = 'KITCHEN' | 'BATH';
type Grade = 'economy' | 'standard' | 'premium' | 'luxury';

export function EstimatorTool() {
  const [type, setType] = useState<RemodelType>('KITCHEN');
  const [grade, setGrade] = useState<Grade>('standard');
  const [sqft, setSqft] = useState<number>(150);
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<{
    low: number;
    high: number;
    formula: string;
  } | null>(null);

  const handleCalculate = () => {
    const res = calculateRemodelEstimate(type, {
      zip,
      materialGrade: grade,
      sqft,
    });
    setResult(res);
  };

  return (
    <div className="space-y-8">
      <Card className="border-oxblood/10 shadow-elevated">
        <CardContent className="p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-slate mb-2 block text-sm font-bold tracking-widest uppercase">
                Project Type
              </label>
              <div className="flex gap-2">
                <Button
                  variant={type === 'KITCHEN' ? 'primary' : 'outline'}
                  onClick={() => setType('KITCHEN')}
                  className="flex-1"
                >
                  Kitchen
                </Button>
                <Button
                  variant={type === 'BATH' ? 'primary' : 'outline'}
                  onClick={() => setType('BATH')}
                  className="flex-1"
                >
                  Bathroom
                </Button>
              </div>
            </div>

            <div>
              <label className="text-slate mb-2 block text-sm font-bold tracking-widest uppercase">
                Location (Zip Code)
              </label>
              <AddressAutocomplete onSelect={(s) => setZip(s.postcode)} />
            </div>

            <div>
              <label className="text-slate mb-2 block text-sm font-bold tracking-widest uppercase">
                Approximate Square Footage
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
                Material Grade
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as Grade)}
                className="border-slate/20 focus:border-oxblood w-full rounded-lg border p-3 outline-none"
              >
                <option value="economy">Economy (Basic/Rental)</option>
                <option value="standard">Standard (Owner-Occupied)</option>
                <option value="premium">Premium (Semi-Custom)</option>
                <option value="luxury">Luxury (Fully Custom)</option>
              </select>
            </div>
          </div>

          <Button onClick={handleCalculate} size="lg" className="mt-8 w-full">
            Generate 2026 Ballpark Estimate
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
              March 2026 Market Range
            </Badge>
            <div className="text-5xl font-black tabular-nums md:text-7xl">
              ${result.low.toLocaleString()} - ${result.high.toLocaleString()}
            </div>
            <p className="mt-4 text-xl opacity-80">
              Estimated project cost for a {sqft} sqft {type.toLowerCase()}{' '}
              remodel.
            </p>
            <div className="bg-cream/5 mt-8 rounded-lg p-4 text-sm italic">
              Verification Formula: {result.formula}
            </div>
            <p className="mx-auto mt-6 max-w-lg text-xs opacity-50">
              *Estimates include 3.4% 2026 labor index adjustment. Final pricing
              depends on specific site conditions and IRC-2026 compliance
              requirements.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
