import { Metadata } from 'next';
import { Suspense } from 'react';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';
import { client } from '@/sanity/lib/client';
import { LocalBusinessJsonLd } from '@/components/seo/json-ld';
import { Container, Section, Button, Card, Badge } from '@/components/ui';
import Link from 'next/link';
import { HeroSection } from '@/components/content/homepage/HeroSection';
import { ServicesGrid } from '@/components/content/homepage/ServicesGrid';
import { TrustSignals } from '@/components/content/homepage/TrustSignals';
import { AreasServed } from '@/components/content/homepage/AreasServed';
import { ResourcesSection } from '@/components/ui';

export const metadata: Metadata = {
  title:
    'Benson Home Solutions | Professional Property Maintenance & Restoration',
  description:
    'Licensed general contractor specializing in systematic maintenance, water damage restoration, and remodeling in Oregon. CCB #258533.',
};

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

      {/* Subscription Recommender CTA */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="flex-1 space-y-6">
              <Badge variant="secondary" className="tracking-widest uppercase">
                AI Powered Recommendations
              </Badge>
              <h2 className="text-oxblood text-4xl leading-tight font-black md:text-5xl">
                Get Your Personalized Maintenance Plan
              </h2>
              <p className="text-slate text-xl leading-relaxed opacity-80">
                Identify predictable property failures and receive a customized
                oversight plan in under 60 seconds. Our AI analyzes your
                property age, size, and location to recommend the perfect
                subscription tier.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/tools/subscription-recommender">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full font-bold sm:w-auto"
                  >
                    Start My Recommendation
                  </Button>
                </Link>
                <Link href="/services/maintenance-subscriptions">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    View Subscription Tiers
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <Card className="bg-oxblood shadow-elevated text-cream overflow-hidden border-none p-8 md:p-12">
                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between">
                    <span
                      className="text-4xl font-black tracking-tighter uppercase opacity-40"
                      aria-hidden="true"
                    >
                      BHS-2026
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-cream/10 text-cream border-cream/20"
                    >
                      Active Analysis
                    </Badge>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-[85%] animate-pulse bg-green-500" />
                      </div>
                      <p className="text-[10px] font-bold tracking-widest uppercase opacity-50">
                        Benchmarking Complete
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-cream text-2xl font-bold">
                        Subscription Estimate
                      </h3>
                      <div className="text-5xl font-black">
                        $119<span className="ml-1 text-sm opacity-50">/mo</span>
                      </div>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-sm italic opacity-70">
                        &quot;Benson caught a failing window seal and blocked
                        gutters during our first month. Their systematic
                        oversight saved us at least $8,000 in water damage
                        repairs.&quot;
                      </p>
                      <p className="mt-2 text-xs font-bold tracking-widest uppercase">
                        &mdash; Local Property Owner
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
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
