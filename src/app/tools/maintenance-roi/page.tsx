'use client';

import { useState } from 'react';
import { 
  Section, 
  Container, 
  Card, 
  CardContent, 
  Button, 
  Badge 
} from '@/components/ui';
import { calculateMaintenanceROI } from '@/lib/estimating-engine';
import Link from 'next/link';

export default function MaintenanceROIPage() {
  const [initialCost, setInitialCost] = useState<number>(500);
  const [years, setYears] = useState<number>(5);
  const [result, setResult] = useState<ReturnType<typeof calculateMaintenanceROI> | null>(null);

  const handleCalculate = () => {
    setResult(calculateMaintenanceROI(initialCost, years));
  };

  return (
    <main>
      <Section variant="cream" spacing="lg" className="pb-32">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/tools"
              className="text-oxblood hover:text-oxblood/80 mb-4 inline-block text-sm font-medium transition-colors"
            >
              &larr; All Tools
            </Link>
            <Badge variant="secondary" className="mb-4 block w-fit">
              Risk Mitigation Engine
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl">
              Preventative vs. Reactive ROI
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Calculate the exponential cost of deferred maintenance. Our model uses 2026 data 
              to project how a minor $500 repair scales into a $5,000+ structural failure.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="-mt-32">
        <Container size="narrow">
          <Card className="border-oxblood/10 shadow-elevated">
            <CardContent className="p-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-slate mb-2 block text-sm font-bold tracking-widest uppercase">
                    Initial Repair/Service Cost
                  </label>
                  <input 
                    type="number" 
                    value={initialCost}
                    onChange={(e) => setInitialCost(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate/20 p-3 outline-none focus:border-oxblood"
                  />
                  <p className="text-slate/50 mt-1 text-[10px]">e.g., Gutter cleaning, leak patch, HVAC tune-up.</p>
                </div>

                <div>
                  <label className="text-slate mb-2 block text-sm font-bold tracking-widest uppercase">
                    Years Deferred
                  </label>
                  <select 
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate/20 p-3 outline-none focus:border-oxblood"
                  >
                    <option value={1}>1 Year</option>
                    <option value={3}>3 Years</option>
                    <option value={5}>5 Years (Standard Horizon)</option>
                    <option value={10}>10 Years (Critical Horizon)</option>
                  </select>
                </div>
              </div>

              <Button 
                onClick={handleCalculate} 
                size="lg" 
                className="mt-8 w-full"
              >
                Project Maintenance Loss
              </Button>
            </CardContent>
          </Card>

          {result && (
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <Card className="bg-white border-green-500/20 shadow-sm">
                <CardContent className="p-6">
                  <Badge className="bg-green-500 mb-2">Preventative Action</Badge>
                  <div className="text-charcoal text-4xl font-black">${result.preventative.toLocaleString()}</div>
                  <p className="text-slate text-sm mt-2 italic">Scheduled service price today.</p>
                </CardContent>
              </Card>

              <Card className="bg-oxblood text-cream border-none shadow-xl">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="bg-cream/10 border-cream/20 text-cream mb-2">Reactive Failure</Badge>
                  <div className="text-5xl font-black">${result.reactive.toLocaleString()}</div>
                  <p className="text-cream/70 text-sm mt-2 italic">Projected emergency repair in {years} years.</p>
                </CardContent>
              </Card>

              <div className="md:col-span-2">
                <Card className="bg-charcoal text-cream border-none overflow-hidden">
                  <CardContent className="p-8 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-cream">Avoidable Fiscal Loss</h3>
                      <p className="text-cream/50 text-sm">Money incinerated by inaction over {years} years.</p>
                    </div>
                    <div className="text-4xl md:text-6xl font-black text-red-400 tabular-nums">
                      -${result.loss.toLocaleString()}
                    </div>
                  </CardContent>
                  <div className="bg-white/10 px-8 py-2 text-[10px] tracking-widest uppercase font-bold text-center">
                    Reactive Factor: {result.ratio}x Initial Investment
                  </div>
                </Card>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
