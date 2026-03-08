'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { calculateMaintenanceROI } from '@/lib/estimating-engine';

export default function MaintenanceROIEmbed() {
  const [initialCost, setInitialCost] = useState<number>(500);
  const [years, setYears] = useState<number>(5);
  const [result, setResult] = useState<ReturnType<
    typeof calculateMaintenanceROI
  > | null>(null);

  const handleCalculate = () => {
    setResult(calculateMaintenanceROI(initialCost, years));
  };

  return (
    <main className="overflow-hidden p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-oxblood text-lg font-bold">Benson ROI Engine</h2>
        <Badge variant="secondary" className="text-[8px] uppercase">
          Senior Principal 2026
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-slate mb-1 block text-[10px] font-bold tracking-wider uppercase">
            Initial Cost ($)
          </label>
          <input
            type="number"
            value={initialCost}
            onChange={(e) => setInitialCost(Number(e.target.value))}
            className="border-slate/20 focus:border-oxblood w-full rounded border p-2 text-sm outline-none"
          />
        </div>

        <div>
          <label className="text-slate mb-1 block text-[10px] font-bold tracking-wider uppercase">
            Years Deferred
          </label>
          <select
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="border-slate/20 focus:border-oxblood w-full rounded border p-2 text-sm outline-none"
          >
            <option value={1}>1 Year</option>
            <option value={3}>3 Years</option>
            <option value={5}>5 Years</option>
            <option value={10}>10 Years</option>
          </select>
        </div>
      </div>

      <Button
        onClick={handleCalculate}
        size="sm"
        className="mt-4 w-full text-xs font-bold"
      >
        Project Loss
      </Button>

      {result && (
        <div className="mt-4 space-y-3">
          <Card className="bg-charcoal text-cream overflow-hidden border-none shadow-sm">
            <CardContent className="flex items-center justify-between p-4">
              <div className="text-[10px] font-bold uppercase opacity-50">
                Projected Loss
              </div>
              <div className="text-2xl font-black text-red-400 tabular-nums">
                -${result.loss.toLocaleString()}
              </div>
            </CardContent>
            <div className="bg-white/10 px-4 py-1 text-center text-[8px] font-bold tracking-widest uppercase">
              Reactive Factor: {result.ratio}x
            </div>
          </Card>

          <div className="text-center">
            <a
              href="https://bensonhomesolutions.com/tools/maintenance-roi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate/40 hover:text-oxblood text-[9px] font-bold tracking-widest uppercase transition-colors"
            >
              Powered by Benson Home Solutions &rarr;
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
