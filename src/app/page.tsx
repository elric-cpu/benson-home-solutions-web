import { Metadata } from 'next';
import { Suspense } from 'react';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';
import { client } from '@/sanity/lib/client';
import { LocalBusinessJsonLd } from '@/components/seo/json-ld';
import {
  Container,
  Section,
  Card,
  Badge,
  buttonClassName,
} from '@/components/ui';
import Link from 'next/link';
import { HeroSection } from '@/components/content/homepage/HeroSection';
import { ServicesGrid } from '@/components/content/homepage/ServicesGrid';
import { TrustSignals } from '@/components/content/homepage/TrustSignals';
import { AreasServed } from '@/components/content/homepage/AreasServed';
import { ResourcesSection } from '@/components/ui';

export const metadata: Metadata = {
  title:
    'Oregon Property Repairs, Restoration & Maintenance | Benson Home Solutions',
  description:
    'Licensed Oregon contractor for water damage restoration, maintenance plans, inspection repairs, and remodeling across the Mid-Willamette Valley and Harney County. CCB #258533.',
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
    {
      label: BUSINESS.license,
      detail: 'Verify our Oregon contractor record',
      href: BUSINESS.ccb,
    },
    {
      label: '24/7 Emergency Response',
      detail: `Call ${BUSINESS.afterhoursPhone} when damage is active`,
      href: '/emergency',
    },
    {
      label: 'Mid-Valley + Harney County',
      detail: 'Service coverage for homes, churches, and facilities',
      href: '/areas',
    },
    {
      label: 'Reviews & Project Proof',
      detail: `${BUSINESS.projects} documented jobs and customer feedback`,
      href: '/reviews',
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
              Why Property Owners Call Benson
            </h2>
            <div className="not-prose grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-3 text-4xl">🛠️</div>
                <h3 className="text-charcoal mb-2 text-lg font-bold">
                  Clear Scopes Before Work Starts
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  We inspect the issue, document what we find, and explain the
                  repair path in plain language before the job moves forward.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 text-4xl">📄</div>
                <h3 className="text-charcoal mb-2 text-lg font-bold">
                  Documentation That Holds Up
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Moisture readings, progress photos, and written notes make it
                  easier to work with adjusters, property managers, and boards.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-3 text-4xl">🚒</div>
                <h3 className="text-charcoal mb-2 text-lg font-bold">
                  Emergency First, Long-Term Fix Second
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  We stop active damage fast, then handle the cleanup, rebuild,
                  and follow-through needed to get the property stable again.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Maintenance planning CTA */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="flex-1 space-y-6">
              <Badge variant="secondary" className="tracking-widest uppercase">
                Planning Tool
              </Badge>
              <h2 className="text-oxblood text-4xl leading-tight font-black md:text-5xl">
                Build a Maintenance Plan Before Damage Gets Expensive
              </h2>
              <p className="text-slate text-xl leading-relaxed opacity-80">
                Use our planning tool to map recurring upkeep, likely risk
                points, and the service tier that fits your property. It is a
                practical starting point for owners who want a clearer plan
                before scheduling work.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/tools/subscription-recommender"
                  className={buttonClassName({
                    variant: 'primary',
                    size: 'lg',
                    className: 'w-full font-bold sm:w-auto',
                  })}
                >
                  Start the Planning Tool
                </Link>
                <Link
                  href="/services/maintenance-subscriptions"
                  className={buttonClassName({
                    variant: 'outline',
                    size: 'lg',
                    className: 'w-full sm:w-auto',
                  })}
                >
                  Compare Maintenance Plans
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <Card className="bg-oxblood shadow-elevated text-cream overflow-hidden border-none p-8 md:p-12">
                <div className="relative z-10">
                  <Badge
                    variant="secondary"
                    className="bg-cream/10 text-cream border-cream/20 mb-6"
                  >
                    What you get
                  </Badge>
                  <div className="space-y-4">
                    <h3 className="text-cream text-2xl font-bold">
                      A practical first-pass scope
                    </h3>
                    <ul className="space-y-3 text-sm leading-relaxed text-white/80">
                      <li>
                        Recommended maintenance tier for your property type
                      </li>
                      <li>Likely trouble spots based on age, size, and use</li>
                      <li>Budget guidance you can review before calling</li>
                    </ul>
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
              <a
                href={`tel:${BUSINESS.afterhoursPhone}`}
                className={buttonClassName({
                  variant: 'emergency',
                  size: 'lg',
                })}
              >
                Emergency: {BUSINESS.afterhoursPhone}
              </a>
              <Link
                href="/emergency"
                className={buttonClassName({ variant: 'outline', size: 'lg' })}
              >
                Learn More
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
              Tell us what is going on at the property and we&apos;ll help you
              decide whether you need emergency response, a repair scope, or a
              maintenance plan.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className={buttonClassName({
                  variant: 'secondary',
                  size: 'lg',
                })}
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
