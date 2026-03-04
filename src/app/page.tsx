import { Suspense } from 'react';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';
import { client } from '@/sanity/lib/client';
import { LocalBusinessJsonLd } from '@/components/seo/json-ld';
import { Container, Section, Button, Card } from '@/components/ui';
import Link from 'next/link';
import { HeroSection } from '@/components/content/homepage/HeroSection';
import { ServicesGrid } from '@/components/content/homepage/ServicesGrid';
import { TrustSignals } from '@/components/content/homepage/TrustSignals';
import { AreasServed } from '@/components/content/homepage/AreasServed';
import { ResourcesSection } from '@/components/ui';

interface Resource {
  title: string;
  url: string;
  description?: string;
  isBacklink?: boolean;
  authority?: string;
}

interface HomePageData {
  title?: string;
  heroHeadline?: string;
  heroDescription?: string;
  heroVideo?: string;
  resources?: Resource[];
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

function HeroFallback() {
  return <div className="bg-oxblood min-h-[70vh] animate-pulse" />;
}

function SectionFallback() {
  return <div className="h-64 animate-pulse bg-gray-100" />;
}

const homeQuery = `*[_type == "homePage"][0]{
  title,
  heroHeadline,
  heroDescription,
  heroVideo,
  resources,
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

  const services =
    page?.services?.map((s) => ({
      title: s.title,
      description: s.description,
      href: `/services/${s.slug.current}`,
    })) || FALLBACK_SERVICES;

  const trustSignals = page?.trustSignals || [
    { label: 'Licensed & Bonded', detail: BUSINESS.license },
    { label: 'Fully Insured', detail: 'Liability & Workers\u2019 Comp' },
    { label: 'Locally Owned', detail: BUSINESS.experience + ' Experience' },
    {
      label: BUSINESS.rating + ' Rating',
      detail: BUSINESS.projects + ' Projects Completed',
    },
  ];

  return (
    <>
      <LocalBusinessJsonLd />

      <Suspense fallback={<HeroFallback />}>
        <HeroSection
          headline={page?.heroHeadline}
          description={page?.heroDescription}
          video={page?.heroVideo}
        />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ServicesGrid services={services} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TrustSignals signals={trustSignals} />
      </Suspense>

      {/* Static Content Section: The Benson Standard */}
      <Section spacing="md">
        <Container size="narrow">
          <div className="prose prose-lg text-slate max-w-none">
            <h2 className="text-charcoal mb-8 text-center text-3xl font-bold">
              The Benson Standard
            </h2>
            <div className="not-prose grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-3 text-4xl">🛠️</div>
                <h3 className="text-charcoal mb-2 text-lg font-bold">
                  Proactive Oversight
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Most damage is preventable. Our maintenance programs identify
                  risks like failing seals or blocked drainage before they turn
                  into $10,000 insurance claims.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 text-4xl">📄</div>
                <h3 className="text-charcoal mb-2 text-lg font-bold">
                  Board-Ready Records
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  We provide full photo documentation and moisture mapping for
                  every job. Whether it’s for an adjuster or a facility board,
                  our records stand up to scrutiny.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 text-4xl">🚒</div>
                <h3 className="text-charcoal mb-2 text-lg font-bold">
                  60-Minute Response
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  When a pipe bursts, every minute counts. Our emergency crews
                  are mobilized and on-site within an hour in the Mid-Willamette
                  Valley, 24/7.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Suspense fallback={<SectionFallback />}>
        <AreasServed areas={allAreas} />
      </Suspense>

      {page?.resources && (
        <Suspense fallback={<SectionFallback />}>
          <ResourcesSection resources={page.resources} />
        </Suspense>
      )}

      {/* Emergency CTA */}
      <Section variant="default" spacing="md">
        <Container size="narrow">
          <Card
            variant="outlined"
            className="border-red-200 bg-red-50/50 p-8 text-center md:p-12"
          >
            <h2 className="text-2xl font-bold md:text-3xl">
              Need Emergency Restoration?
            </h2>
            <p className="text-slate mt-4 text-lg">
              Water damage, storm damage, or emergency board-ups — we respond
              24/7. Don&apos;t wait&nbsp;&mdash; call our emergency line now.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
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
            <h2 className="text-cream text-3xl font-bold md:text-4xl">
              Ready to Protect Your Property?
            </h2>
            <p className="text-cream/80 mt-4 text-lg">
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
