'use client';

import { useState } from 'react';
import { Container, Section, Button, Card, CardHeader, CardContent, Badge } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import {
  getSegmentData,
  getTierEntries,
  recommendedTierBySegment,
  type Segment,
} from '@/lib/maintenance-pricing';

const SEGMENT_COPY: Record<Segment, { headline: string; subheading?: string; description: string }> = {
  residential: {
    headline: 'Maintenance Plans That Prevent Bigger Repairs',
    description:
      'These plans are built for owners who would rather stay ahead of water, envelope, access, and seasonal failure points than pay for another emergency later.',
  },
  commercial: {
    headline: 'Professional Facility Maintenance & Asset Preservation',
    subheading:
      'We don’t just "fix things." We provide Mid-Willamette Valley property managers with documented, SLA-backed maintenance and forensic data modeling to protect your CAPEX.',
    description:
      'Our commercial tiers are built for facility and asset managers who need documented response, capital forecasting, and risk dashboards—no guesswork left for owners or boards.',
  },
  church: {
    headline: 'Recurring Care for Your Sacred Space',
    description:
      'Plans designed for stewards who need preventative maintenance, safety checks, and preservation scopes that respect history and support ministry.',
  },
};

const COMMERCIAL_HOOKS = [
  {
    title: 'Guaranteed Response (SLAs)',
    description: 'Tiered response times (4hr/24hr) for "Plus" members. No more ghosting contractors.',
  },
  {
    title: 'Digital Asset Logbooks',
    description:
      "Every unit, roof section, and HVAC filter is tagged and documented. View your building's health in real-time.",
  },
  {
    title: 'Forensic Documentation',
    description: 'We provide the "Why" behind the failure—essential for insurance claims and owner reports.',
  },
  {
    title: 'Vendor Consolidation',
    description: 'One call for plumbing, structural, and preventive maintenance, so owners get a single reliable partner.',
  },
];

function getHeroCopy(segment: Segment) {
  return SEGMENT_COPY[segment];
}

export default function PlansPageClient() {
  const [selectedSegment, setSelectedSegment] = useState<Segment>('residential');

  const tiers = getTierEntries(selectedSegment);
  const heroCopy = getHeroCopy(selectedSegment);

  return (
    <Section spacing="lg">
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood">
            {heroCopy.headline}
          </h1>
          {heroCopy.subheading && (
            <p className="mt-6 text-lg font-bold uppercase tracking-widest text-oxblood/70">
              {heroCopy.subheading}
            </p>
          )}
          <p className="text-xl text-slate font-medium max-w-3xl mx-auto mt-6">
            {heroCopy.description}
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-cream/50 p-2 rounded-full">
            {(['residential', 'commercial', 'church'] as Segment[]).map(segKey => (
              <Button
                key={segKey}
                variant={selectedSegment === segKey ? 'primary' : 'ghost'}
                size="lg"
                onClick={() => setSelectedSegment(segKey)}
                className="rounded-full px-8 md:px-12 py-4 text-lg font-bold"
              >
                {getSegmentData(segKey).name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((typedTier) => {
            return (
            <Card key={typedTier.name} className="flex flex-col">
              <CardHeader>
                <h3 className="text-3xl font-black uppercase tracking-tight text-oxblood">{typedTier.name}</h3>
                {typedTier.key === recommendedTierBySegment[selectedSegment] && <Badge className="absolute top-4 right-4">Recommended</Badge>}
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-slate font-medium mb-8 flex-grow">{typedTier.description}</p>
                <div className="mb-8">
                  <span className="text-5xl font-black text-oxblood">${typedTier.price}</span>
                  <span className="text-lg font-bold text-oxblood/70">/mo</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {typedTier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-oxblood shrink-0 mt-1" />
                      <span className="font-medium text-slate">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Link href={`/calculator?segment=${selectedSegment}&tier=${typedTier.key}`} className="block">
                    <Button size="lg" className="w-full font-black uppercase tracking-widest">
                      {typedTier.price > 0 ? 'Price This Plan' : 'Request a Custom Quote'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>

        {selectedSegment === 'commercial' && (
          <div className="mt-20 rounded-3xl border border-oxblood/10 bg-cream/70 p-10 shadow-[0_20px_60px_rgba(122,20,20,0.12)]">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-oxblood/70">Rich Asset Management Language</p>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-oxblood">
                Why Facilities Managers Choose Benson
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {COMMERCIAL_HOOKS.map((hook) => (
                <div key={hook.title} className="rounded-2xl border border-oxblood/10 bg-white/90 p-6 shadow-sm">
                  <h3 className="text-lg font-black uppercase tracking-tight text-oxblood mb-3">{hook.title}</h3>
                  <p className="text-sm font-medium text-slate leading-relaxed">{hook.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <Link href="/contact?service=Commercial%20Maintenance" className="w-full md:w-auto">
                <Button size="lg" className="w-full max-w-xs text-lg font-black uppercase tracking-widest">
                  Request a Portfolio Consultation
                </Button>
              </Link>
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-oxblood/70">
                CCB #258533 | Fully Licensed, Bonded, & Insured for Commercial Tiers.
              </p>
            </div>
          </div>
        )}

        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-oxblood mb-4">Not Sure Which Plan is Right for You?</h2>
          <p className="text-lg text-slate max-w-2xl mx-auto mb-8">
            If the property needs more than a recurring plan, we can also help with repairs, mitigation work, and documentation-heavy scopes.
          </p>
          <Link href="/contact">
              <Button variant="outline" size="lg" className="px-10 py-7 text-lg font-black uppercase tracking-widest border-2 border-oxblood text-oxblood">
                Get a Recommendation
              </Button>
          </Link>
        </div>

      </Container>
    </Section>
  );
}
