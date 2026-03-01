import Link from 'next/link';
import {
  Button,
  Card,
  CardContent,
  Container,
  Section,
  Badge,
  RichHero,
} from '@/components/ui';
import { BUSINESS, SERVICE_AREAS, HERO_ASSETS } from '@/lib/constants';
import { client } from '@/sanity/lib/client';
import { LocalBusinessJsonLd } from '@/components/seo/json-ld';

interface HomePageData {
  title?: string;
  heroHeadline?: string;
  heroDescription?: string;
  services?: {
    title: string;
    description: string;
    slug: { current: string };
  }[];
  trustSignals?: {
    label: string;
    detail: string;
  }[];
}

const homeQuery = `*[_type == "homePage"][0]{
  title,
  heroHeadline,
  heroDescription,
  "services": *[_type == "servicePage"][0..3]{
    title,
    "description": metaDescription,
    slug
  },
  trustSignals
}`;

const FALLBACK_SERVICES = [
  {
    title: 'Maintenance Programs',
    description:
      'Preventive maintenance subscriptions for residential, commercial, and church properties. We catch problems before they become emergencies.',
    href: '/services/maintenance-subscriptions',
  },
  {
    title: 'Water Damage Restoration',
    description:
      'Rapid dry-out, mitigation, and full rebuild. Insurance-aligned documentation from day one. Available 24/7.',
    href: '/services/water-damage',
  },
  {
    title: 'Emergency Response',
    description:
      'Board-ups, storm damage, water intrusion — on-site within 60 minutes in the Mid-Willamette Valley.',
    href: '/emergency',
  },
  {
    title: 'Remodeling & Restoration',
    description:
      'Kitchen and bathroom remodels, structural repairs, and full property restoration. Licensed and insured.',
    href: '/services/kitchen-remodeling',
  },
];

export default async function HomePage() {
  let page: HomePageData | null = null;
  try {
    page = await client.fetch<HomePageData | null>(homeQuery);
  } catch (error) {
    console.error('Failed to load homepage data', error);
  }

  const allAreas = [
    ...SERVICE_AREAS.midWillametteValley,
    ...SERVICE_AREAS.harneyCounty,
  ];

  const services = page?.services?.map(s => ({
    title: s.title,
    description: s.description,
    href: `/services/${s.slug.current}`
  })) || FALLBACK_SERVICES;

  const trustSignals = page?.trustSignals || [
    { label: 'Licensed & Bonded', detail: BUSINESS.license },
    { label: 'Fully Insured', detail: 'Liability & Workers\u2019 Comp' },
    { label: 'Locally Owned', detail: BUSINESS.experience + ' Experience' },
    { label: BUSINESS.rating + ' Rating', detail: BUSINESS.projects + ' Projects Completed' },
  ];

  return (
    <>
      <LocalBusinessJsonLd />
      {/* Hero Section */}
      <RichHero
        title={page?.heroHeadline || (
          <>
            Property Protection<br className="hidden sm:inline" />
            Built on Reliability
          </>
        )}
        description={page?.heroDescription || "We don’t just fix damage; we prevent it. From local maintenance programs to 24/7 emergency restoration, Benson Home Solutions provides the professional oversight your property deserves. Licensed, bonded, and ready to work."}
        backgroundImage={HERO_ASSETS.homepage}
        badge="Mid-Willamette Valley | CCB #258533"
      >
        <Link href="/tools/cost-calculator">
          <Button size="lg" variant="secondary">Calculate True Home Cost</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" size="lg" className="bg-white/10 text-cream border-cream/20 hover:bg-cream hover:text-oxblood">
            Request a Quote
          </Button>
        </Link>
      </RichHero>

      {/* Services Section */}
      <Section spacing="lg">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">What We Do</h2>
            <p className="mt-4 text-lg text-slate">
              Comprehensive property maintenance, restoration, and mitigation
              services tailored to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className="group">
                <Card hover className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-charcoal group-hover:text-oxblood transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-slate leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust Signals */}
      <Section variant="oxblood" spacing="sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustSignals.map((signal) => (
              <div key={signal.label}>
                <div className="text-lg font-semibold text-cream">
                  {signal.label}
                </div>
                <div className="mt-1 text-sm text-cream/70">
                  {signal.detail}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Benson */}
      <Section spacing="md">
        <Container size="narrow">
          <div className="prose prose-lg text-slate max-w-none">
            <h2 className="text-3xl font-bold text-charcoal text-center mb-8">The Benson Standard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
              <div className="text-center">
                <div className="text-4xl mb-3">🛠️</div>
                <h3 className="text-lg font-bold text-charcoal mb-2">Proactive Oversight</h3>
                <p className="text-slate text-sm leading-relaxed">
                  Most damage is preventable. Our maintenance programs identify risks like failing seals or blocked drainage before they turn into $10,000 insurance claims.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📄</div>
                <h3 className="text-lg font-bold text-charcoal mb-2">Board-Ready Records</h3>
                <p className="text-slate text-sm leading-relaxed">
                  We provide full photo documentation and moisture mapping for every job. Whether it’s for an adjuster or a facility board, our records stand up to scrutiny.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🚒</div>
                <h3 className="text-lg font-bold text-charcoal mb-2">60-Minute Response</h3>
                <p className="text-slate text-sm leading-relaxed">
                  When a pipe bursts, every minute counts. Our emergency crews are mobilized and on-site within an hour in the Mid-Willamette Valley, 24/7.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Areas We Serve */}
      <Section variant="cream" spacing="md">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Areas We Serve</h2>
            <p className="mt-4 text-lg text-slate">
              Proudly serving communities throughout the Mid-Willamette Valley
              and Harney County.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {allAreas.map((area) => (
              <Badge
                key={area}
                variant="secondary"
                className="text-sm px-4 py-1.5"
              >
                {area}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      {/* Emergency CTA */}
      <Section variant="default" spacing="md">
        <Container size="narrow">
          <Card
            variant="outlined"
            className="text-center p-8 md:p-12 border-red-200 bg-red-50/50"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              Need Emergency Restoration?
            </h2>
            <p className="mt-4 text-lg text-slate">
              Water damage, storm damage, or emergency board-ups — we respond
              24/7. Don&apos;t wait&nbsp;&mdash; call our emergency line now.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <a href={`tel:${BUSINESS.afterhoursPhone}`}>
                <Button variant="emergency" size="lg">
                  Emergency: {BUSINESS.afterhoursPhone}
                </Button>
              </a>
              <Link href="/emergency">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section variant="charcoal" spacing="lg">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-cream">
              Ready to Protect Your Property?
            </h2>
            <p className="mt-4 text-lg text-cream/80">
              Contact us today for a free, no-obligation quote. We&apos;ll
              assess your needs and provide a clear, upfront estimate.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
