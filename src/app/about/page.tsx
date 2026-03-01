import { Metadata } from 'next';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { Section, Container, Card, CardContent, RichHero } from '@/components/ui';
import { PortableTextRenderer } from '@/components/content/PortableText';
import { BUSINESS, HERO_ASSETS } from '@/lib/constants';

interface AboutPageData {
  title?: string;
  metaDescription?: string;
  ownerBio?: Record<string, unknown>[];
  ownerPhoto?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  companyHistory?: Record<string, unknown>[];
  credentials?: Record<string, unknown>[];
  teamPhotos?: {
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
          ''
        )}.`,
    };
  } catch {
    return { title: 'About Us | Maintenance & Restoration Experts' };
  }
}

export default async function AboutPage() {
  let page: AboutPageData | null = null;
  try {
    page = await client.fetch<AboutPageData | null>(aboutQuery);
  } catch (error) {
    console.error('Failed to load about page data', error);
  }

  return (
    <>
      {/* Rich Hero Section */}
      <RichHero
        title={page?.title || `Protecting Properties Since 2014`}
        description="We protect the places where people live, work, and gather. Our team specializes in preventive maintenance, damage restoration, and emergency mitigation across the Mid-Willamette Valley."
        backgroundImage={HERO_ASSETS.about}
        badge="Our Story"
        overlayOpacity={65}
      />

      {/* History & Bio */}
      <Section spacing="md">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-charcoal mb-6">
                Our History
              </h2>
              {page?.companyHistory ? (
                <PortableTextRenderer value={page.companyHistory} />
              ) : (
                <div className="prose prose-lg text-slate">
                  <p>
                    {BUSINESS.name} was founded on a simple observation: most
                    property damage is preventable. Leaking roofs, failing
                    gutters, deferred maintenance on HVAC systems — these small
                    neglected items become five-figure insurance claims. We
                    built a company around stopping that cycle.
                  </p>
                  <p>
                    Based in the Mid-Willamette Valley, we serve homeowners,
                    property managers, commercial building operators, and
                    churches across Albany, Salem, Lebanon, Corvallis, and
                    surrounding communities. Our approach combines scheduled
                    preventive maintenance with rapid-response restoration when
                    the unexpected happens.
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
              What We Stand For
            </h2>
            <p className="mt-4 text-slate text-lg">
              Our principles guide every inspection, every repair, and every
              emergency response.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Prevention Over Reaction',
                desc: 'We believe the best restoration job is the one that never has to happen. Our maintenance programs catch small issues before they become emergencies.',
                icon: '🛡️',
              },
              {
                title: 'Documentation & Transparency',
                desc: 'Every inspection and repair is documented with photos and reports. You always know exactly what was done and why.',
                icon: '📋',
              },
              {
                title: 'Rapid Response',
                desc: 'When emergencies happen, response time matters. Our after-hours emergency line connects you to a real person who can mobilize within hours.',
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
