'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Card, CardContent, CardHeader } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';
import {
  getTier,
  getTierEntries,
  getSegmentData,
  recommendedTierBySegment,
  type Segment,
} from '@/lib/maintenance-pricing';

export type { Segment } from '@/lib/maintenance-pricing';

interface PlanBuilderProps {
  segment: Segment;
  addons: Set<string>;
  setSegment: Dispatch<SetStateAction<Segment>>;
  setAddons: Dispatch<SetStateAction<Set<string>>>;
}

export function PlanBuilder({
  segment,
  addons,
  setSegment,
  setAddons: _setAddons,
}: PlanBuilderProps) {
  const segmentData = getSegmentData(segment);
  const tiers = getTierEntries(segment);
  const [selectedTierKey, setSelectedTierKey] = useState(
    recommendedTierBySegment[segment],
  );
  const selectedTier = getTier(segment, selectedTierKey);
  const total = selectedTier.price;

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
      {/* Plan Selection */}
      <div className="space-y-6 lg:col-span-2">
        <div>
          <h2 className="mb-3 text-xl font-bold">
            1. Select Your Property Type
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {(['residential', 'commercial', 'church'] as Segment[]).map(
              (segKey) => (
                <Button
                  key={segKey}
                  variant={segment === segKey ? 'primary' : 'outline'}
                  onClick={() => setSegment(segKey)}
                >
                  {getSegmentData(segKey).name}
                </Button>
              ),
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">
            2. Compare Recommended Tiers
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedTier.key === tier.key ? 'ring-oxblood ring-2' : ''}`}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <CheckCircle2 className="text-oxblood h-8 w-8" />
                  <button
                    type="button"
                    onClick={() => setSelectedTierKey(tier.key)}
                    className="text-left"
                  >
                    <h3 className="font-bold">{tier.name}</h3>
                    <p className="text-sm text-slate-600">${tier.price}/mo</p>
                    <p className="mt-2 text-sm text-slate-600">
                      {tier.description}
                    </p>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="sticky top-24 lg:col-span-1">
        <Card className="bg-cream/50">
          <CardHeader>
            <h3 className="text-oxblood text-2xl font-black">
              {segmentData.name} Recommended Plan
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">{selectedTier.name}</span>
                <span className="text-lg font-bold">
                  ${selectedTier.price}/mo
                </span>
              </div>
              <div className="border-oxblood/20 space-y-2 border-t pt-4">
                <h4 className="mb-2 font-semibold">Included Highlights</h4>
                {selectedTier.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{feature}</span>
                  </div>
                ))}
                {addons.size > 0 && (
                  <p className="text-sm text-slate-500">
                    Custom add-ons are not priced in this builder yet. We will
                    scope those separately so the quote stays honest.
                  </p>
                )}
              </div>
              <div className="border-oxblood/50 mt-4 border-t-2 pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-bold uppercase">
                    Total Monthly
                  </span>
                  <span className="text-oxblood text-3xl font-black">
                    ${total}
                  </span>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="mt-6 w-full font-black tracking-widest uppercase"
            >
              Finalize Plan & Get Quote
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
