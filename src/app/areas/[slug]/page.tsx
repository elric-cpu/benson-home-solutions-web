import { Metadata } from 'next';
import Link from 'next/link';
import { client, isConfigured } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
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
import { BUSINESS, HERO_ASSETS } from '@/lib/constants';

interface Resource {
  title: string;
  url: string;
  description?: string;
  isBacklink?: boolean;
  authority?: string;
}

interface AreaPageData {
  _id: string;
  title: string;
  slug: { current: string };
  city: string;
  county?: string;
  metaDescription?: string;
  heroImage?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  heroVideo?: string;
  resources?: Resource[];
  localContent?: Record<string, unknown>[];
  servicesOffered?: {
    _id: string;
    title: string;
    slug: { current: string };
    heroHeadline?: string;
  }[];
  testimonials?: {
    _id: string;
    clientName: string;
    quote: string;
    rating: number;
    service?: { title: string };
  }[];
  nearbyAreas?: { title: string; slug: { current: string }; city: string }[];
}

const areaQuery = `*[_type == "areaPage" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  city,
  county,
  metaDescription,
  heroImage,
  heroVideo,
  resources,
  localContent[]{
    ...,
    _type == "image" => { ..., asset-> }
  },
  servicesOffered[]->{ _id, title, slug, heroHeadline },
  testimonials[]->{ _id, clientName, quote, rating, service->{ title } },
  nearbyAreas[]->{ title, slug, city }
}`;

function formatSlugToCity(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateStaticParams() {
  if (!isConfigured) {
    return [{ slug: 'albany-or' }];
  }

  try {
    const slugs = await client.fetch<{ slug: { current: string } }[]>(
      `*[_type == "areaPage" && defined(slug.current)]{ slug }`,
    );
    const result = (slugs || []).map((s) => ({ slug: s.slug.current }));
    return result.length > 0 ? result : [{ slug: 'albany-or' }];
  } catch (error) {
    console.error('Error fetching area slugs:', error);
    return [{ slug: 'albany-or' }];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const area = await client.fetch<AreaPageData | null>(areaQuery, { slug });
    const city = area?.city || formatSlugToCity(slug);

    return {
      title: `${city} OR Maintenance & Restoration`,
      description:
        area?.metaDescription ||
        `Professional maintenance, restoration, and mitigation services in ${city}, Oregon. Licensed, bonded, and insured contractor serving the Mid-Willamette Valley.`,
    };
  } catch {
    const city = formatSlugToCity(slug);
    return { title: `${city} OR Maintenance & Restoration` };
  }
}

import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let area: AreaPageData | null = null;
  try {
    area = await client.fetch<AreaPageData | null>(areaQuery, { slug });
  } catch {
    // Fail silently
  }

  const city = area?.city || formatSlugToCity(slug);
  const county = area?.county || (slug === 'burns' ? 'Harney' : 'Linn');

  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Service Areas', url: `${BUSINESS.url}/#service-areas` },
    { name: city, url: `${BUSINESS.url}/areas/${slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {/* Hero */}
      <RichHero
        title={`Professional Property Care in ${city}`}
        description={
          area?.metaDescription ||
          `Benson Home Solutions provides comprehensive maintenance, restoration, and emergency mitigation services to homeowners and businesses throughout ${city} and ${county} County.`
        }
        backgroundImage={
          area?.heroImage
            ? urlForImage(area.heroImage).width(1600).url()
            : HERO_ASSETS.maintenance
        }
        videoBackground={area?.heroVideo}
        badge={`Service Area: ${city}, Oregon`}
      >
        <Link href="/contact">
          <Button size="lg" variant="secondary">
            Get a Free {city} Estimate
          </Button>
        </Link>
        <a href={`tel:${BUSINESS.phone}`}>
          <Button
            variant="outline"
            size="lg"
            className="text-cream border-cream/20 hover:bg-cream hover:text-oxblood bg-white/10"
          >
            Call {BUSINESS.phone}
          </Button>
        </a>
      </RichHero>

      {/* Local Content */}
      <Section spacing="md">
        <Container size="narrow">
          {area?.localContent ? (
            <PortableTextRenderer value={area.localContent} />
          ) : (
            <div className="prose prose-lg text-slate max-w-none">
              <h2 className="text-charcoal mb-6 text-2xl font-bold md:text-3xl">
                Why {city} Properties Trust Benson Home Solutions
              </h2>
              <p>
                From historic homes to modern commercial buildings, {city}
                &apos;s architecture faces unique environmental challenges. Our
                team understands the local climate and common maintenance issues
                specific to the Mid-Willamette Valley.
              </p>
              <p>
                As a locally owned and operated contractor (CCB #
                {BUSINESS.license.replace('CCB #', '')}), we don&apos;t just
                provide a service — we build long-term relationships with our
                clients in {city}. We focus on <strong>prevention</strong> to
                save you from costly emergency repairs down the road.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Services Offered */}
      <Section variant="cream" spacing="md">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold">
              Services We Provide in {city}
            </h2>
            <p className="text-slate mt-4">
              Complete property protection from a single, trusted source.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(area?.servicesOffered && area.servicesOffered.length > 0
              ? area.servicesOffered
              : [
                  {
                    title: 'Maintenance Programs',
                    slug: { current: 'maintenance-subscriptions' },
                  },
                  {
                    title: 'Water Damage Restoration',
                    slug: { current: 'water-damage' },
                  },
                  {
                    title: 'Emergency Response',
                    slug: { current: 'emergency' },
                  },
                  {
                    title: 'Kitchen & Bath Remodeling',
                    slug: { current: 'remodeling' },
                  },
                ]
            ).map((service) => (
              <Link
                key={service.slug.current}
                href={`/services/${service.slug.current}`}
              >
                <Card hover className="h-full">
                  <CardContent className="flex items-center justify-between p-6">
                    <span className="text-charcoal font-bold">
                      {service.title}
                    </span>
                    <span className="text-oxblood">→</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      {area?.testimonials && area.testimonials.length > 0 && (
        <Section spacing="md">
          <Container>
            <h2 className="mb-10 text-center text-3xl font-bold">
              What Your Neighbors in {city} Are Saying
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {area.testimonials.map((t) => (
                <Card key={t._id} variant="elevated">
                  <CardContent className="p-6">
                    <div className="mb-4 flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < t.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <blockquote className="text-slate mb-4 italic">
                      &quot;{t.quote}&quot;
                    </blockquote>
                    <div className="text-charcoal font-bold">
                      — {t.clientName}
                    </div>
                    {t.service && (
                      <div className="text-oxblood text-sm">
                        {t.service.title}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Emergency CTA */}
      <Section variant="oxblood" spacing="md">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-cream text-3xl font-bold">
              Active Emergency in {city}?
            </h2>
            <p className="text-cream/80 mt-4 text-lg">
              Water damage, storm damage, or urgent board-ups — we are on-site
              within 60 minutes in the Mid-Willamette Valley.
            </p>
            <div className="mt-8">
              <a href={`tel:${BUSINESS.afterhoursPhone}`}>
                <Button
                  variant="emergency"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Call Now: {BUSINESS.afterhoursPhone}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Nearby Areas */}
      {area?.nearbyAreas && area.nearbyAreas.length > 0 && (
        <Section spacing="sm" variant="cream">
          <Container>
            <p className="text-slate mb-4 text-center text-sm font-bold tracking-wider uppercase">
              Also Serving Nearby Communities
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {area.nearbyAreas.map((nearby) => (
                <Link
                  key={nearby.slug.current}
                  href={`/areas/${nearby.slug.current}`}
                  className="text-oxblood hover:underline"
                >
                  {nearby.city}
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Authoritative Resources */}
      {area?.resources && <ResourcesSection resources={area.resources} />}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: `${BUSINESS.name} - ${city}`,
            description: `Professional property maintenance and restoration in ${city}, OR. Licensed contractor CCB #${BUSINESS.license.replace('CCB #', '')}.`,
            url: `${BUSINESS.url}/areas/${slug}`,
            telephone: BUSINESS.phone,
            address: {
              '@type': 'PostalAddress',
              addressLocality: city,
              addressRegion: 'OR',
              addressCountry: 'US',
            },
            areaServed: {
              '@type': 'City',
              name: city,
            },
          }),
        }}
      />
    </>
  );
}
