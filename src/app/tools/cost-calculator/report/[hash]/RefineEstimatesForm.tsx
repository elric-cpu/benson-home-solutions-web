'use client';

import { useState } from 'react';
import { Card, CardContent, Button } from '@/components/ui';

interface Props {
  initialCosts: Record<string, number>;
  initialMetadata: {
    sqft?: number;
    yearBuilt?: number;
    taxAmount?: number;
  };
}

export function RefineEstimatesForm({ initialCosts, initialMetadata }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [sqft, setSqft] = useState(initialMetadata.sqft || 1800);
  const [yearBuilt, setYearBuilt] = useState(initialMetadata.yearBuilt || 1978);
  const [taxAmount, setTaxAmount] = useState(
    initialMetadata.taxAmount || initialCosts.property_tax,
  );

  const [costs, setCosts] = useState(initialCosts);

  const handleRecalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const newCosts = { ...initialCosts };

    // Simple scaling logic for demonstration
    // In a real scenario, this would use a more complex model
    const sqftFactor = sqft / 1800;
    const age = new Date().getFullYear() - yearBuilt;
    const ageFactor = age > 50 ? 1.5 : age > 25 ? 1.2 : 1.0;

    newCosts.property_tax = taxAmount;
    newCosts.maintenance = Math.round(
      initialCosts.maintenance * sqftFactor * ageFactor,
    );
    newCosts.energy = Math.round(
      initialCosts.energy * sqftFactor * (age > 40 ? 1.3 : 1.0),
    );
    newCosts.utilities = Math.round(
      initialCosts.utilities * (sqft > 2500 ? 1.4 : 1.0),
    );

    setCosts(newCosts);
  };

  const annualTotal = Object.values(costs).reduce((a, b) => a + b, 0);

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="border-oxblood text-oxblood hover:bg-oxblood w-full hover:text-white"
      >
        Want more accurate numbers? Refine these estimates &rarr;
      </Button>
    );
  }

  return (
    <Card
      variant="outlined"
      className="border-oxblood/20 shadow-elevated bg-white"
    >
      <CardContent className="p-6">
        <h3 className="text-charcoal mb-4 text-lg font-bold">
          Refine Your Estimate
        </h3>
        <form onSubmit={handleRecalculate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="sqft"
                className="text-slate/60 text-[10px] font-bold tracking-widest uppercase"
              >
                Square Footage
              </label>
              <input
                id="sqft"
                type="number"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="border-slate/20 focus:ring-oxblood w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="yearBuilt"
                className="text-slate/60 text-[10px] font-bold tracking-widest uppercase"
              >
                Year Built
              </label>
              <input
                id="yearBuilt"
                type="number"
                value={yearBuilt}
                onChange={(e) => setYearBuilt(Number(e.target.value))}
                className="border-slate/20 focus:ring-oxblood w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label
              htmlFor="taxAmount"
              className="text-slate/60 text-[10px] font-bold tracking-widest uppercase"
            >
              Actual Property Tax ($/yr)
            </label>
            <input
              id="taxAmount"
              type="number"
              value={taxAmount}
              onChange={(e) => setTaxAmount(Number(e.target.value))}
              className="border-slate/20 focus:ring-oxblood w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" size="sm" className="flex-1">
              Update Report
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>

        <div className="border-slate/10 mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-slate text-xs font-bold tracking-wider uppercase">
              New Estimated Total:
            </span>
            <span className="text-oxblood text-xl font-black">
              ${annualTotal.toLocaleString()}/yr
            </span>
          </div>
          <p className="text-slate/60 mt-2 text-[10px] italic">
            *Recalculated based on building age and scale factors.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
