import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import {
  Section,
  Container,
  Card,
  CardContent,
  RichHero,
  ResourcesSection,
  Button,
} from '@/components/ui';
import { PortableTextRenderer } from '@/components/content/PortableText';
import { BUSINESS, HERO_ASSETS } from '@/lib/constants';

interface Resource {
  title: string;
  url: string;
  description?: string;
  isBacklink?: boolean;
  authority?: string;
}

interface AboutPageData {
  title?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  heroVideo?: string;
  resources?: Resource[];
  metaDescription?: string;
  ownerBio?: Record<string, unknown>[];
  ownerPhoto?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  companyHistory?: Record<string, unknown>[];
  credentials?: Record<string, unknown>[];
  teamPhotos?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  }[];
  values?: Record<string, unknown>[];
}

const aboutQuery = `*[_type == "aboutPage"][0]`;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch<AboutPageData | null>(aboutQuery);
    return {
      title: page?.title || 'About Us | Maintenance & Restoration Experts',
      description:
        page?.metaDescription ||
        `Learn about ${BUSINESS.name} — a licensed Oregon contractor serving the Mid-Willamette Valley. CCB #${BUSINESS.license.replace(
          'CCB #',
          '',
        )}.`,
    };
  } catch {
    return { title: 'About Us | Maintenance & Restoration Experts' };
  }
}

import {
  BreadcrumbJsonLd,
  LocalBusinessJsonLd,
  AboutPageJsonLd,
} from '@/components/seo/json-ld';

export default async function AboutPage() {
  let page: AboutPageData | null = null;
  try {
    page = await client.fetch<AboutPageData | null>(aboutQuery);
  } catch (error) {
    console.error('Failed to load about page data', error);
  }

  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'About', url: `${BUSINESS.url}/about` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <LocalBusinessJsonLd />
      {/* Rich Hero */}
      <RichHero
        title={
          page?.heroHeadline ||
          page?.title ||
          `Protecting Properties Since 2014`
        }
        description={
          page?.heroSubtext ||
          'We provide the expert oversight required to protect Oregon’s properties from the ground up. Our team specializes in preemptive maintenance and high-fidelity restoration across the Mid-Willamette Valley.'
        }
        backgroundImage={HERO_ASSETS.about}
        videoBackground={page?.heroVideo}
        imageAlt="Benson Home Solutions office planning"
        badge="Our Mission"
        overlayOpacity={70}
      />

      {/* History & Bio */}
      <Section spacing="md">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <h2 className="text-charcoal mb-6 text-3xl font-bold">
                Our Foundation
              </h2>
              {page?.companyHistory ? (
                <PortableTextRenderer value={page.companyHistory} />
              ) : (
                <div className="prose prose-lg text-slate">
                  <p>
                    {BUSINESS.name} was built on a simple trade reality: most
                    property damage is entirely preventable. We saw homeowners
                    and property managers stuck in a cycle of reactive
                    repairs—waiting for a leak to become a flood before taking
                    action. We built this company to stop that cycle.
                  </p>
                  <p>
                    Based in Albany, we provide the professional oversight
                    needed to identify risks before they turn into five-figure
                    insurance claims. From residential maintenance to complex
                    commercial restoration, our work is defined by precision,
                    high-fidelity documentation, and a direct, contractor-led
                    approach.
                  </p>
                </div>
              )}
            </div>
            <div className="order-1 lg:order-2">
              <div className="shadow-elevated relative mx-auto aspect-square max-w-md overflow-hidden rounded-2xl">
                {page?.ownerPhoto ? (
                  <Image
                    src={urlForImage(page.ownerPhoto)
                      .width(600)
                      .height(600)
                      .url()}
                    alt={BUSINESS.owner}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-slate/10 text-slate flex h-full w-full items-center justify-center">
                    [Owner Photo]
                  </div>
                )}
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-charcoal text-xl font-bold">
                  {BUSINESS.owner}
                </h3>
                <p className="text-oxblood font-medium">Founder & Principal</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section variant="cream" spacing="md">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-charcoal text-3xl font-bold">Our Principles</h2>
            <p className="text-slate mt-4 text-lg">
              We operate on a standard of technical precision and
              accountability.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Preemptive Defense',
                desc: 'The most cost-effective restoration is the one that never happens. We focus on hardening the building envelope to stop damage before it starts.',
                icon: '🛡️',
              },
              {
                title: 'Forensic Documentation',
                desc: 'Every visit is logged with high-fidelity photo records and moisture mapping. We provide the paper trail required for board reviews and insurance claims.',
                icon: '📋',
              },
              {
                title: 'Direct Response',
                desc: 'When an emergency hits, you don’t need a call center. Our line connects you to trade professionals who can mobilize and stabilize your property fast.',
                icon: '⚡',
              },
            ].map((value) => (
              <Card key={value.title} hover className="border-none shadow-sm">
                <CardContent className="p-8">
                  <div className="mb-6 text-4xl">{value.icon}</div>
                  <h3 className="text-charcoal mb-4 text-xl font-bold">
                    {value.title}
                  </h3>
                  <p className="text-slate leading-relaxed">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Credentials */}
      <Section spacing="md">
        <Container size="narrow">
          <div className="bg-surface border-border rounded-2xl border p-8 md:p-12">
            <h2 className="text-charcoal mb-8 text-center text-3xl font-bold">
              Licensed, Bonded & Insured
            </h2>
            <div className="space-y-6">
              {[
                {
                  label: 'Oregon CCB License',
                  value: BUSINESS.license,
                  icon: '🏛️',
                },
                {
                  label: 'Liability Insurance',
                  value: 'Fully Insured for Commercial & Residential',
                  icon: '🛡️',
                },
                {
                  label: 'Certifications',
                  value: 'IICRC Water Damage Restoration & Lead-Safe Firm',
                  icon: '🎓',
                },
                {
                  label: 'Experience',
                  value: `${BUSINESS.experience} in the Mid-Willamette Valley`,
                  icon: '📍',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border-slate/5 flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <div className="text-slate text-sm font-bold tracking-wider uppercase">
                      {item.label}
                    </div>
                    <div className="text-charcoal text-lg font-semibold">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Authoritative Resources */}
      {page?.resources && <ResourcesSection resources={page.resources} />}

      {/* Final CTA */}
      <Section variant="charcoal" spacing="lg">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-cream text-3xl font-bold md:text-4xl">
              Ready to Discuss Your Project?
            </h2>
            <p className="text-cream/80 mt-4 text-lg">
              Contact us today for a free, no-obligation consultation. Let&apos;s
              build something great together.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* JSON-LD */}
      <AboutPageJsonLd
        name={`About ${BUSINESS.name}`}
        description={`Learn about the history, values, and credentials of ${BUSINESS.name}.`}
        url={`${BUSINESS.url}/about`}
        ownerName={BUSINESS.owner}
      />
    </>
  );
}
