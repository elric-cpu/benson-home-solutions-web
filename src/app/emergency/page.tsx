import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import {
  Button,
  Container,
  Section,
  Card,
  CardContent,
  RichHero,
  ResourcesSection,
} from '@/components/ui';
import { PortableTextRenderer } from '@/components/content/PortableText';
import { BUSINESS, HERO_ASSETS, HERO_VIDEOS } from '@/lib/constants';

interface Resource {
  title: string;
  url: string;
  description?: string;
  isBacklink?: boolean;
  authority?: string;
}

interface EmergencyPageData {
  title?: string;
  metaDescription?: string;
  emergencyPhone?: string;
  afterHoursPhone?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  heroVideo?: string;
  resources?: Resource[];
  emergencyServices?: Record<string, unknown>[];
  responseTimeSLA?: string;
  content?: Record<string, unknown>[];
}

const emergencyQuery = `*[_type == "emergencyPage"][0]`;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch<EmergencyPageData | null>(emergencyQuery);
    return {
      title: page?.title || 'Emergency Services | 24/7 Response',
      description:
        page?.metaDescription ||
        `Emergency board-up, water damage response, and restoration services in the Mid-Willamette Valley. On-site within 60 minutes. Call ${BUSINESS.afterhoursPhone}.`,
    };
  } catch {
    return {
      title: 'Emergency Services | 24/7 Response',
      description: `Emergency board-up, water damage response, and restoration services in the Mid-Willamette Valley. On-site within 60 minutes. Call ${BUSINESS.afterhoursPhone}.`,
    };
  }
}

import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

export default async function EmergencyPage() {
  let fetchedPage: EmergencyPageData | null = null;

  try {
    fetchedPage = await client.fetch<EmergencyPageData | null>(emergencyQuery);
  } catch (error) {
    console.error('Failed to load emergency page data', error);
  }

  // Fallback data structure for when CMS is empty
  const page: EmergencyPageData = fetchedPage || {
    heroHeadline: '24/7 Emergency Stabilization',
    heroSubtext:
      'When disaster hits, Benson Home Solutions is on-site to stabilize your property and stop the cycle of damage. We provide rapid mitigation and the forensic documentation required for your insurance claim.',
    responseTimeSLA: '60-Minute Mobilization in the Mid-Willamette Valley',
    emergencyPhone: BUSINESS.afterhoursPhone,
  };

  const emergencyPhone = page.emergencyPhone || BUSINESS.afterhoursPhone;

  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Emergency', url: `${BUSINESS.url}/emergency` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {/* Rich Hero Section */}
      <RichHero
        title={page.heroHeadline!}
        description={page.heroSubtext}
        backgroundImage={HERO_ASSETS.emergency}
        videoBackground={page.heroVideo || HERO_VIDEOS.emergency}
        badge="Direct Dispatch | 24/7"
        overlayOpacity={80}
      >
        <a href={`tel:${emergencyPhone}`} className="w-full sm:w-auto">
          <Button
            variant="emergency"
            size="lg"
            className="h-16 w-full border-2 border-red-400 px-8 text-xl shadow-xl shadow-red-950/50"
          >
            Call Now: {emergencyPhone}
          </Button>
        </a>
        <div className="text-cream/60 mt-4 w-full text-sm font-bold tracking-widest uppercase">
          {page.responseTimeSLA}
        </div>
      </RichHero>

      {/* Services Breakdown */}
      <Section spacing="md" variant="cream">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-charcoal text-3xl font-bold">
              Rapid Mitigation Services
            </h2>
            <p className="text-slate mt-4 text-lg">
              We stabilize the building envelope, secure the premises, and
              provide the paper trail your insurance carrier requires.
            </p>
          </div>

          {page.emergencyServices && page.emergencyServices.length > 0 ? (
            <div className="prose prose-lg mx-auto max-w-4xl">
              <PortableTextRenderer value={page.emergencyServices} />
            </div>
          ) : (
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
              <Card variant="elevated" className="border-t-oxblood border-t-4">
                <CardContent className="pt-8">
                  <h3 className="text-charcoal mb-2 text-xl font-bold">
                    Water Mitigation
                  </h3>
                  <p className="text-slate leading-relaxed">
                    Forensic extraction, structural dry-out, and immediate
                    moisture mapping. We stop the spread of water before it
                    destroys structural integrity.
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="border-t-oxblood border-t-4">
                <CardContent className="pt-8">
                  <h3 className="text-charcoal mb-2 text-xl font-bold">
                    Security Board-Ups
                  </h3>
                  <p className="text-slate leading-relaxed">
                    Immediate securement after fire, storms, or impact. We
                    provide structural bracing, roof tarping, and window
                    boarding to prevent secondary loss.
                  </p>
                </CardContent>
              </Card>

              <Card variant="elevated" className="border-t-oxblood border-t-4">
                <CardContent className="pt-8">
                  <h3 className="text-charcoal mb-2 text-xl font-bold">
                    Storm Securement
                  </h3>
                  <p className="text-slate leading-relaxed">
                    Fallen tree removal and envelope stabilization. We harden
                    your property against the elements to prevent weather
                    exposure during repairs.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </Container>
      </Section>

      {/* Process & Trust Content */}
      <Section spacing="md">
        <Container size="narrow">
          {page.content && page.content.length > 0 ? (
            <PortableTextRenderer value={page.content} />
          ) : (
            <div className="prose prose-lg text-slate max-w-none">
              <h2 className="text-charcoal mb-4 text-2xl font-bold">
                Our Response Framework
              </h2>
              <ol className="mb-8 list-inside list-decimal space-y-4">
                <li>
                  <strong>Direct Dispatch:</strong> Call our line and speak with
                  a trade professional, not a call center.
                </li>
                <li>
                  <strong>On-Site Stabilization:</strong> Our licensed crew
                  arrives within 60 minutes to secure the premises and stop
                  active damage.
                </li>
                <li>
                  <strong>Forensic Assessment:</strong> We document the loss
                  with high-fidelity photos and moisture readings before
                  mitigation begins.
                </li>
                <li>
                  <strong>Insurance Alignment:</strong> We provide board-ready
                  records and itemized scopes to ensure your carrier has the
                  data they need from hour one.
                </li>
              </ol>

              <div className="bg-surface border-border mt-8 rounded-xl border p-6 shadow-sm">
                <h3 className="text-charcoal mb-2 text-xl font-bold">
                  Licensed, Bonded, & Insured
                </h3>
                <p className="mb-0">
                  You need a contractor you can trust when things go wrong.
                  Benson Home Solutions operates under Oregon CCB #
                  {BUSINESS.license.replace('CCB #', '')}. We are fully insured
                  for liability and workers&apos; compensation.
                </p>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* Authoritative Resources */}
      {page.resources && <ResourcesSection resources={page.resources} />}
    </>
  );
}
