'use client';

import { Dispatch, SetStateAction } from 'react';
import { Button, Card, CardContent, CardHeader } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';
import planData from '@/lib/maintenance-plans.json';

export type Segment = 'residential' | 'commercial' | 'church';

type TierKey = string;
type TierData = {
  name: string;
  price: number;
  description: string;
  features: string[];
};

interface PlanBuilderProps {
  segment: Segment;
  addons: Set<string>;
  setSegment: Dispatch<SetStateAction<Segment>>;
  setAddons: Dispatch<SetStateAction<Set<string>>>;
}

const recommendedTierBySegment: Record<Segment, TierKey> = {
  residential: 'standard',
  commercial: 'plus',
  church: 'guardian',
};

export function PlanBuilder({ segment, addons, setSegment, setAddons: _setAddons }: PlanBuilderProps) {
  const segmentData = planData.segments[segment];
  const tiersByKey = segmentData.tiers as Record<string, TierData>;
  const tiers = Object.values(tiersByKey);
  const defaultTierKey = recommendedTierBySegment[segment];
  const selectedTier = tiersByKey[defaultTierKey] ?? tiers[0];
  const total = selectedTier.price;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Plan Selection */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-3">1. Select Your Property Type</h2>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(planData.segments) as Segment[]).map(segKey => (
              <Button 
                key={segKey}
                variant={segment === segKey ? 'primary' : 'outline'}
                onClick={() => setSegment(segKey)}
              >
                {planData.segments[segKey].name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">2. Compare Recommended Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tiers.map((tier) => (
              <Card key={tier.name} className="transition-all hover:shadow-md">
                <CardContent className="p-4 flex items-center gap-4">
                  <CheckCircle2 className="w-8 h-8 text-oxblood" />
                  <div>
                    <h3 className="font-bold">{tier.name}</h3>
                    <p className="text-sm text-slate-600">${tier.price}/mo</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="lg:col-span-1 sticky top-24">
        <Card className="bg-cream/50">
          <CardHeader>
            <h3 className="text-2xl font-black text-oxblood">{segmentData.name} Recommended Plan</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold">{selectedTier.name}</span>
                <span className="font-bold text-lg">${selectedTier.price}/mo</span>
              </div>
              <div className="border-t border-oxblood/20 pt-4 space-y-2">
                <h4 className="font-semibold mb-2">Included Highlights</h4>
                {selectedTier.features.map((feature) => (
                  <div key={feature} className="flex justify-between items-center text-sm">
                    <span>{feature}</span>
                  </div>
                ))}
                {addons.size > 0 && (
                  <p className="text-sm text-slate-500">
                    Custom add-ons are temporarily unavailable in this builder. Contact us for a tailored quote.
                  </p>
                )}
              </div>
              <div className="border-t-2 border-oxblood/50 pt-4 mt-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-lg uppercase">Total Monthly</span>
                  <span className="font-black text-3xl text-oxblood">${total}</span>
                </div>
              </div>
            </div>
            <Button size="lg" className="w-full mt-6 font-black uppercase tracking-widest">
              Finalize Plan & Get Quote
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
