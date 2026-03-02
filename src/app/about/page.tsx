import { Metadata } from 'next';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { Section, Container, Card, CardContent, RichHero, ResourcesSection } from '@/components/ui';
import { PortableTextRenderer } from '@/components/content/PortableText';
import { BUSINESS, HERO_ASSETS } from '@/lib/constants';

interface AboutPageData {
  title?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  heroVideo?: string;
  resources?: any[];
  metaDescription?: string;
  ownerBio?: Record<string, unknown>[];
  ownerPhoto?: any;
  companyHistory?: Record<string, unknown>[];
  credentials?: Record<string, unknown>[];
  teamPhotos?: any[];
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
          ''
        )}.`,
    };
  } catch {
    return { title: 'About Us | Maintenance & Restoration Experts' };
  }
}

import { BreadcrumbJsonLd, LocalBusinessJsonLd } from '@/components/seo/json-ld';

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
        title={page?.heroHeadline || page?.title || `Protecting Properties Since 2014`}
        description={page?.heroSubtext || "We provide the expert oversight required to protect Oregon’s properties from the ground up. Our team specializes in preemptive maintenance and high-fidelity restoration across the Mid-Willamette Valley."}
        backgroundImage={HERO_ASSETS.about}
        videoBackground={page?.heroVideo}
        imageAlt="Benson Home Solutions office planning"
        badge="Our Mission"
        overlayOpacity={70}
      />

      {/* History & Bio */}
      <Section spacing="md">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-charcoal mb-6">
                Our Foundation
              </h2>
              {page?.companyHistory ? (
                <PortableTextRenderer value={page.companyHistory} />
              ) : (
                <div className="prose prose-lg text-slate">
                  <p>
                    {BUSINESS.name} was built on a simple trade reality: most property damage is entirely preventable. We saw homeowners and property managers stuck in a cycle of reactive repairs—waiting for a leak to become a flood before taking action. We built this company to stop that cycle.
                  </p>
                  <p>
                    Based in Albany, we provide the professional oversight needed to identify risks before they turn into five-figure insurance claims. From residential maintenance to complex commercial restoration, our work is defined by precision, high-fidelity documentation, and a direct, contractor-led approach.
                  </p>
                </div>
              )}
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-elevated">
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
                  <div className="w-full h-full bg-slate/10 flex items-center justify-center text-slate">
                    [Owner Photo]
                  </div>
                )}
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-charcoal">
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
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-charcoal">
              Our Principles
            </h2>
            <p className="mt-4 text-slate text-lg">
              We operate on a standard of technical precision and accountability.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
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
                  <div className="text-4xl mb-6">{value.icon}</div>
                  <h3 className="text-xl font-bold text-charcoal mb-4">
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
          <div className="bg-surface border border-border rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">
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
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate/5 shadow-sm"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <div className="text-sm font-bold text-slate uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-lg font-semibold text-charcoal">
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

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: `About ${BUSINESS.name}`,
            description: `Learn about the history, values, and credentials of ${BUSINESS.name}.`,
            url: `${BUSINESS.url}/about`,
            mainEntity: {
              '@type': 'Person',
              name: BUSINESS.owner,
              jobTitle: 'Founder',
              worksFor: {
                '@type': 'HomeAndConstructionBusiness',
                name: BUSINESS.name,
              },
            },
          }),
        }}
      />
    </>
  );
}
