import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Section,
  Container,
  Badge,
  Button,
  Card,
  CardContent,
} from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/seo/json-ld';
import { SubscriptionSelector } from '@/components/content/subscription/SubscriptionSelector';

export const metadata: Metadata = {
  title: 'Maintenance Subscriptions | Proactive Property Oversight',
  description:
    'Systematic preventive maintenance for homes, commercial buildings, and churches in Oregon. Stop the cycle of reactive repairs. Licensed CCB #258533.',
};

export default function MaintenanceSubscriptionsPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    {
      name: 'Maintenance Subscriptions',
      url: `${BUSINESS.url}/services/maintenance-subscriptions`,
    },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name="Maintenance Subscriptions"
        description="Systematic preventive maintenance and professional oversight programs for Oregon property owners."
        url={`${BUSINESS.url}/services/maintenance-subscriptions`}
      />

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Systematic Oversight
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Proactive Property Defense
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Reactive repairs are the most expensive way to own property. We
              provide the systematic oversight required to identify building
              envelope risks before they become five-figure restoration claims.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/tools/subscription-recommender">
                <Button size="lg" className="font-bold">
                  Recommend My Plan
                </Button>
              </Link>
              <a href={`tel:${BUSINESS.phone}`}>
                <Button variant="outline" size="lg">
                  Call Office: {BUSINESS.phone}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-charcoal text-3xl font-black tracking-tight uppercase">
              Subscription Tiers
            </h2>
            <p className="text-slate mt-4">
              Transparent pricing designed for residential, commercial, and
              community properties.
            </p>
          </div>
          <SubscriptionSelector />
        </Container>
      </Section>

      <Section variant="cream" spacing="lg">
        <Container size="narrow">
          <div className="bg-oxblood text-cream rounded-3xl p-8 text-center md:p-12">
            <h2 className="mb-6 text-3xl font-black">
              Not sure which tier you need?
            </h2>
            <p className="text-cream/80 mb-8 text-lg">
              Our AI Recommender analyzes your property data to build a custom
              maintenance schedule based on building age, location, and flood
              risk.
            </p>
            <Link href="/tools/subscription-recommender">
              <Button
                variant="secondary"
                size="xl"
                className="font-black tracking-widest uppercase"
              >
                Start Free Analysis
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Forensic Inspections
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Scheduled reviews of your roof, gutters, seals, and
                  foundations. We find the failure points before the rain does.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Board-Ready Logs
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Every visit generates a forensic photo log and status report.
                  You always have the documentation needed for insurance or
                  resale.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Priority Response
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Subscription members receive 24/7 priority access to our
                  emergency crews. If something breaks, you&apos;re at the front
                  of the line.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
