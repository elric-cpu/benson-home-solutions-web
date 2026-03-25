'use client';

import { useState } from 'react';
import { Container, Section, Button, Card, CardHeader, CardContent, Badge } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';
import planData from '@/lib/maintenance-plans.json';
import Link from 'next/link';

type Segment = 'residential' | 'commercial' | 'church';
type Tier = {
  name: string;
  description: string;
  price: number;
  features: string[];
};

export default function PlansPage() {
  const [selectedSegment, setSelectedSegment] = useState<Segment>('residential');

  const segmentData = planData.segments[selectedSegment];

  return (
    <main>
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood">
              Proactive Maintenance Plans
            </h1>
            <p className="text-xl text-slate font-medium max-w-3xl mx-auto mt-6">
              Stop paying for surprise repairs. Our maintenance plans are designed to save you money by fixing small problems before they become big ones. Choose your property type to see our recommended plans.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-cream/50 p-2 rounded-full">
              {(Object.keys(planData.segments) as Segment[]).map(segKey => (
                <Button
                  key={segKey}
                  variant={selectedSegment === segKey ? 'primary' : 'ghost'}
                  size="lg"
                  onClick={() => setSelectedSegment(segKey)}
                  className="rounded-full px-8 md:px-12 py-4 text-lg font-bold"
                >
                  {planData.segments[segKey].name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {Object.values(segmentData.tiers).map((tier) => {
              const typedTier = tier as Tier;
              return (
              <Card key={tier.name} className="flex flex-col">
                <CardHeader>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-oxblood">{typedTier.name}</h3>
                  {typedTier.name === 'Standard' && <Badge className="absolute top-4 right-4">Most Popular</Badge>}
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
                    <Button size="lg" className="w-full font-black uppercase tracking-widest">
                      {typedTier.price > 0 ? 'Choose Plan' : 'Request a Custom Quote'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>

          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-oxblood mb-4">Not Sure Which Plan is Right for You?</h2>
            <p className="text-lg text-slate max-w-2xl mx-auto mb-8">
              Every property is unique. If you&apos;re not sure where to start, we&apos;re happy to provide a custom recommendation.
            </p>
            <Link href="/contact">
                <Button variant="outline" size="lg" className="px-10 py-7 text-lg font-black uppercase tracking-widest border-2 border-oxblood text-oxblood">
                  Request a Free Consultation
                </Button>
            </Link>
          </div>

        </Container>
      </Section>
    </main>
  );
}
