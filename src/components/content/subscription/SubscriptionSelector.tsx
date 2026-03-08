'use client';

import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
} from '@/components/ui';
import { Check, X, Shield, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tier = {
  name: string;
  price: number;
  description: string;
  features: string[];
  notIncluded: string[];
  cta: string;
  highlight?: boolean;
  badge?: string;
  icon: React.ReactNode;
};

const TIERS: Tier[] = [
  {
    name: 'Basic',
    price: 119,
    description:
      'Essential oversight for newer properties or single-unit residences.',
    icon: <Shield className="h-6 w-6" />,
    features: [
      'Annual Gutter Cleaning',
      'Annual HVAC Tune-up',
      'Annual Plumbing Inspection',
      'Photo Documentation Log',
      'Standard 24-Hour Response',
    ],
    notIncluded: [
      'Semi-annual Maintenance',
      'Moisture Mapping',
      '60-Minute Emergency SLA',
      'Exterior Sealant Audit',
    ],
    cta: 'Select Basic Plan',
  },
  {
    name: 'Standard',
    price: 199,
    description:
      'Comprehensive protection for aging properties and active households.',
    highlight: true,
    badge: 'Most Popular',
    icon: <Star className="h-6 w-6" />,
    features: [
      'Semi-annual Gutter Cleaning',
      'Semi-annual HVAC Tune-up',
      'Semi-annual Plumbing Inspection',
      'Annual Exterior Sealant Audit',
      'Photo Documentation Log',
      'Priority 4-Hour Response',
    ],
    notIncluded: [
      'Quarterly Maintenance',
      'Moisture Mapping',
      '60-Minute Emergency SLA',
    ],
    cta: 'Select Standard Plan',
  },
  {
    name: 'Premium',
    price: 299,
    description:
      'The highest level of property defense for high-value estates and commercial sites.',
    icon: <Zap className="h-6 w-6" />,
    features: [
      'Quarterly Gutter Cleaning',
      'Semi-annual HVAC Tune-up',
      'Semi-annual Plumbing Inspection',
      'Semi-annual Sealant Audit',
      'Annual Forensic Moisture Mapping',
      '60-Minute Emergency SLA',
      'Dedicated Account Manager',
    ],
    notIncluded: [],
    cta: 'Select Premium Plan',
  },
];

export function SubscriptionSelector() {
  return (
    <div className="py-12">
      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {TIERS.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              'relative flex flex-col border-2 transition-all duration-300',
              tier.highlight
                ? 'border-oxblood shadow-elevated z-10 scale-105'
                : 'hover:border-oxblood/20 border-transparent shadow-sm',
            )}
          >
            {tier.badge && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-oxblood text-cream rounded-full px-4 py-1 text-[10px] font-black tracking-widest uppercase">
                  {tier.badge}
                </Badge>
              </div>
            )}

            <CardHeader className="pt-8 text-center">
              <div
                className={cn(
                  'mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl',
                  tier.highlight
                    ? 'bg-oxblood text-cream'
                    : 'bg-oxblood/5 text-oxblood',
                )}
              >
                {tier.icon}
              </div>
              <h3 className="text-charcoal text-2xl font-black tracking-tight">
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline justify-center gap-1">
                <span className="text-oxblood text-4xl font-black">
                  ${tier.price}
                </span>
                <span className="text-slate/60 text-sm font-bold tracking-widest uppercase">
                  /mo
                </span>
              </div>
              <p className="text-slate mt-4 px-4 text-sm leading-relaxed">
                {tier.description}
              </p>
            </CardHeader>

            <CardContent className="flex-1 pt-6">
              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-charcoal/80 font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
                {tier.notIncluded.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm opacity-40 grayscale"
                  >
                    <X className="text-slate h-5 w-5 shrink-0" />
                    <span className="text-slate line-through">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-6 pb-8">
              <Button
                variant={tier.highlight ? 'primary' : 'outline'}
                className="w-full font-bold tracking-widest uppercase"
                size="lg"
              >
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="mt-24 overflow-x-auto">
        <div className="min-w-[800px]">
          <h2 className="text-charcoal mb-12 text-center text-3xl font-black tracking-tighter uppercase">
            Full Capability Comparison
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-oxblood/10 border-b-2">
                <th className="text-slate/50 px-4 py-6 text-left text-[10px] font-black tracking-widest uppercase">
                  Feature Set
                </th>
                {TIERS.map((t) => (
                  <th key={t.name} className="px-4 py-6 text-center">
                    <span className="text-charcoal font-black tracking-tight uppercase">
                      {t.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <ComparisonRow
                label="Gutter Cleaning"
                values={['Annual', 'Semi-Annual', 'Quarterly']}
              />
              <ComparisonRow
                label="HVAC Tune-ups"
                values={['Annual', 'Semi-Annual', 'Semi-Annual']}
              />
              <ComparisonRow
                label="Plumbing Audits"
                values={['Annual', 'Semi-Annual', 'Semi-Annual']}
              />
              <ComparisonRow
                label="Sealant Audits"
                values={['None', 'Annual', 'Semi-Annual']}
              />
              <ComparisonRow
                label="Emergency Response"
                values={['24-Hour', '4-Hour Priority', '60-Min SLA']}
              />
              <ComparisonRow
                label="Moisture Mapping"
                values={[false, false, true]}
              />
              <ComparisonRow
                label="Account Manager"
                values={[false, false, true]}
              />
              <ComparisonRow
                label="Documentation"
                values={['Standard', 'Professional', 'Forensic']}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ComparisonRow({
  label,
  values,
}: {
  label: string;
  values: (string | boolean)[];
}) {
  return (
    <tr className="border-oxblood/5 hover:bg-cream/50 border-b transition-colors">
      <td className="text-charcoal px-4 py-5 text-sm font-bold">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="px-4 py-5 text-center">
          {typeof v === 'boolean' ? (
            v ? (
              <Check className="mx-auto h-5 w-5 text-green-600" />
            ) : (
              <X className="text-slate/20 mx-auto h-5 w-5" />
            )
          ) : (
            <span className="text-slate text-sm font-medium">{v}</span>
          )}
        </td>
      ))}
    </tr>
  );
}
