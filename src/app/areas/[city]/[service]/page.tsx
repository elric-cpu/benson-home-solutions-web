import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';
import { SERVICES } from '@/lib/constants';
import { AREA_DATA } from '@/lib/area-data';
import { notFound } from 'next/navigation';

// --- Data Management ---

const ALL_CITIES = Object.values(AREA_DATA).map((area) => area.city);
const AREA_BY_SLUG = Object.fromEntries(
  Object.values(AREA_DATA).map((area) => [area.slug, area]),
);

const toSlug = (text: string) => text.toLowerCase().replace(/ /g, '-');
const toTitleCase = (text: string) =>
  text.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

// --- Dynamic Page Generation ---

interface Props {
  params: Promise<{ city: string; service: string }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const city of ALL_CITIES) {
    for (const serviceSlug in SERVICES) {
      params.push({
        city: toSlug(city),
        service: serviceSlug,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const area = AREA_BY_SLUG[citySlug];
  const city = area?.city ?? toTitleCase(citySlug);
  const serviceInfo = SERVICES[serviceSlug as keyof typeof SERVICES];

  if (!serviceInfo || !area) {
    return {};
  }

  const title = `${serviceInfo.title} | ${city}, OR`;
  const description = serviceInfo.description.replace(/\[City\]/g, city);
  const keywords = serviceInfo.keywords.map((k) =>
    k.replace(/\[City\]/g, city),
  );
  const url = `https://www.bensonhomesolutions.com/areas/${citySlug}/${serviceSlug}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: ['/opengraph-image'],
    },
  };
}

export default async function ServiceCityPage({ params }: Props) {
  const { city: citySlug, service: serviceSlug } = await params;
  const area = AREA_BY_SLUG[citySlug];
  const service = SERVICES[serviceSlug as keyof typeof SERVICES];
  const city = area?.city ?? toTitleCase(citySlug);
  const sameRegionCities = Object.values(AREA_DATA)
    .filter((item) => item.slug !== citySlug && item.region === area?.region)
    .slice(0, 4);
  const relatedServices = Object.entries(SERVICES)
    .filter(([slug]) => slug !== serviceSlug)
    .slice(0, 3);

  if (!service || !area) {
    notFound();
  }

  const serviceDescription = service.description.replace(/\[City\]/g, city);

  return (
    <>
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <h1 className="text-oxblood mb-8 text-4xl leading-tight font-black tracking-tight sm:text-5xl md:text-6xl">
            {service.title} in {city}, Oregon
          </h1>
          <p className="text-oxblood/80 mx-auto mb-12 max-w-3xl text-lg leading-relaxed font-medium md:text-xl">
            {serviceDescription} As a licensed Oregon contractor (CCB #258533),
            we provide practical scopes, clear communication, and solid repair
            work for {city} properties.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="px-10 py-7 text-lg font-black tracking-widest uppercase"
            >
              Start Your {city} Project
            </Button>
          </Link>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-oxblood mb-4 text-4xl font-black tracking-tight uppercase">
              Why Choose Us for {service.title} in {city}?
            </h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
            <div className="flex items-start gap-6">
              <CheckCircle2 className="text-oxblood mt-1 h-8 w-8 shrink-0" />
              <div>
                <h3 className="text-oxblood mb-2 text-xl font-black tracking-tight uppercase">
                  Local Expertise
                </h3>
                <p className="text-slate font-medium">
                  We live and work here. We understand the specific challenges{' '}
                  {city} properties face, from seasonal weather to local
                  building codes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <CheckCircle2 className="text-oxblood mt-1 h-8 w-8 shrink-0" />
              <div>
                <h3 className="text-oxblood mb-2 text-xl font-black tracking-tight uppercase">
                  Root-Cause Repair
                </h3>
                <p className="text-slate font-medium">
                  We use field measurements, photos, and direct jobsite
                  experience to scope the repair correctly and keep it from
                  turning into repeat work.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <CheckCircle2 className="text-oxblood mt-1 h-8 w-8 shrink-0" />
              <div>
                <h3 className="text-oxblood mb-2 text-xl font-black tracking-tight uppercase">
                  Transparent Pricing
                </h3>
                <p className="text-slate font-medium">
                  You&apos;ll receive a detailed, easy-to-understand quote
                  before any work begins. No surprises, no hidden fees.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <CheckCircle2 className="text-oxblood mt-1 h-8 w-8 shrink-0" />
              <div>
                <h3 className="text-oxblood mb-2 text-xl font-black tracking-tight uppercase">
                  Licensed & Insured
                </h3>
                <p className="text-slate font-medium">
                  We are a fully licensed (CCB #258533), bonded, and insured
                  general contractor for your complete peace of mind.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link href="/plans">
              <Button
                variant="outline"
                size="lg"
                className="border-oxblood text-oxblood border-2 px-10 py-7 text-lg font-black tracking-widest uppercase"
              >
                Learn About Our Maintenance Plans
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="md">
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-oxblood mb-5 text-2xl font-black tracking-tight uppercase">
                Related Services in {city}
              </h2>
              <div className="space-y-3">
                {relatedServices.map(([slug, relatedService]) => (
                  <Link
                    key={slug}
                    href={`/areas/${citySlug}/${slug}`}
                    className="border-oxblood/10 text-slate hover:border-oxblood hover:text-oxblood block rounded-2xl border bg-white px-5 py-4 font-medium transition-colors"
                  >
                    <div className="text-oxblood text-sm font-black tracking-widest uppercase">
                      {relatedService.title}
                    </div>
                    <div className="mt-1 text-sm">
                      {relatedService.description.replace(/\[City\]/g, city)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-oxblood mb-5 text-2xl font-black tracking-tight uppercase">
                Nearby Service Areas
              </h2>
              <div className="space-y-3">
                {sameRegionCities.map((nearbyArea) => {
                  const nearbySlug = nearbyArea.slug;
                  return (
                    <Link
                      key={nearbySlug}
                      href={`/areas/${nearbySlug}/${serviceSlug}`}
                      className="border-oxblood/10 text-slate hover:border-oxblood hover:text-oxblood block rounded-2xl border bg-white px-5 py-4 font-medium transition-colors"
                    >
                      <div className="text-oxblood text-sm font-black tracking-widest uppercase">
                        {service.title} in {nearbyArea.city}
                      </div>
                      <div className="mt-1 text-sm">
                        See how we handle this scope for nearby owners and
                        managers.
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link href={`/areas/${citySlug}`}>
              <Button
                variant="outline"
                className="border-oxblood text-oxblood border-2"
              >
                See All {city} Service Options
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
