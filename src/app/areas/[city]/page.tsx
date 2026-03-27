import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, ShieldCheck } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { BUSINESS } from '@/lib/constants';
import { Container, Section, Button, Badge } from '@/components/ui';
import { AREA_DATA } from '@/lib/area-data';
import Script from 'next/script';

interface Props {
  params: Promise<{ city: string }>;
}

function getAreaCopy(
  city: string,
  county: string,
  region: 'midWillametteValley' | 'harneyCounty',
) {
  if (region === 'harneyCounty') {
    return {
      title: `${city}, OR Repairs & Property Services`,
      description: `Benson Home Solutions handles repairs, property preservation, weatherization, and urgent response in ${city}, Oregon and across ${county} County.`,
      heroTitle: `${city} Repairs`,
      heroSubtitle: 'Done with clear scopes and follow-through.',
      heroDescription: `We help ${city}-area owners handle lender-required work, water and moisture problems, seasonal protection, and the repair scopes that keep remote and high-desert properties serviceable.`,
      protectionTitle: `${county} County Service Coverage`,
      protectionDescription: `High-desert properties demand practical winterization, envelope work, access repairs, and fast response when weather or vacancy turns into a bigger problem.`,
      protectionFeatures: [
        'Urgent response for active damage',
        'Property preservation and vacancy scopes',
        'Weatherization and insulation corrections',
        'Clear documentation for owners and managers',
      ],
    };
  }

  if (city.toLowerCase() === 'keizer') {
    return {
      title: 'Property Preservation & Repair in Keizer, OR',
      description:
        'From Gubser to Clear Lake—Benson Home Solutions provides Keizer homeowners with the technical expertise required for Willamette Valley’s unique climate challenges.',
      heroTitle: 'Property Preservation & Repair in Keizer, OR',
      heroSubtitle:
        'From Gubser to Clear Lake—Benson Home Solutions provides Keizer homeowners the technical expertise required for Willamette Valley’s unique climate challenges.',
      heroDescription:
        'We keep Keizer homes resilient with moss mitigation, moisture remediation, and lender-ready documentation before small issues escalate.',
      protectionTitle: 'Keizer Climate Expertise',
      protectionDescription:
        'Keizer’s mix of older riverfront homes and 90s-era subdivisions demands proactive moss, moisture, and roof care plus the documentation lenders expect.',
      protectionFeatures: [
        'Moss mitigation and moisture-intrusion repairs for older stock and 90s subdivisions',
        'Documentation-ready scopes aligned with FHA, VA, and lender-letter timelines',
        'Subscription upkeep tuned to the Valley humidity swings',
        'Priority dispatch along the I-5 corridor and North Salem routes',
      ],
    };
  }

  return {
    title: `${city}, OR Repairs & Property Services`,
    description: `Benson Home Solutions handles post-inspection repairs, water and mold work, maintenance, and weatherization in ${city}, Oregon and across ${county} County.`,
    heroTitle: `${city} Repairs`,
    heroSubtitle: 'Handled before small failures become bigger projects.',
    heroDescription: `We help ${city}-area owners clear repair lists, solve moisture problems, tighten building envelopes, and keep homes and facilities from slipping into avoidable damage.`,
    protectionTitle: `${county} County Property Protection`,
    protectionDescription: `Valley properties need practical moisture control, recurring upkeep, and repair scopes that solve the source of the problem instead of buying time for the next callback.`,
    protectionFeatures: [
      'Post-inspection and lender-required repairs',
      'Water, mold, and moisture correction work',
      'Maintenance planning and recurring service',
      'Air sealing, insulation, and weatherization',
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = AREA_DATA[city];

  if (!area) {
    return {
      title: 'Service Area Not Found',
    };
  }

  const copy = getAreaCopy(area.city, area.county, area.region);
  const url = `https://www.bensonhomesolutions.com/areas/${city}`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
      images: ['/opengraph-image'],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(AREA_DATA).map((city) => ({
    city,
  }));
}

export default async function AreaPage({ params }: Props) {
  const { city } = await params;
  const area = AREA_DATA[city];

  if (!area) {
    notFound();
  }

  const copy = getAreaCopy(area.city, area.county, area.region);
  const isKeizer = area.city.toLowerCase() === 'keizer';
  const keizerNeighbors = ['Brooks', 'Gervais', 'Clear Lake'];

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${BUSINESS.name} - ${area.city}`,
    description: copy.description,
    url: `https://www.bensonhomesolutions.com/areas/${city}`,
    telephone: BUSINESS.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: area.city,
      addressRegion: 'OR',
      addressCountry: 'US',
    },
    geo: area.coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: area.coordinates.lat,
          longitude: area.coordinates.lng,
        }
      : undefined,
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: area.coordinates
        ? {
            '@type': 'GeoCoordinates',
            latitude: area.coordinates.lat,
            longitude: area.coordinates.lng,
          }
        : undefined,
      geoRadius: '40000',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Does Benson Home Solutions handle emergency repair work in ${area.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. We provide urgent response for water damage, storm damage, securing work, and time-sensitive repairs in ${area.city} and surrounding ${area.county} County communities.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is Benson Home Solutions a licensed contractor in ${area.city}, Oregon?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. Benson Home Solutions is a licensed, bonded, and insured Oregon contractor (${BUSINESS.license}) serving ${area.city} and the surrounding region.`,
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="local-business-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Script
        id="faq-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Service Areas', item: '/areas' },
          { name: area.city, item: `/areas/${city}` },
        ]}
      />

      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="border-cream/20 bg-cream/10 text-cream mb-6 px-4 py-1.5 font-black tracking-widest uppercase">
            Serving {area.city} & {area.county} County
          </Badge>
          <h1 className="text-cream mb-8 text-5xl leading-tight font-black tracking-tight md:text-7xl">
            {copy.heroTitle} <br />
            <span className="italic opacity-60">{copy.heroSubtitle}</span>
          </h1>
          <p className="text-cream/80 mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-medium md:text-2xl">
            {copy.heroDescription}
          </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <a href={`tel:${BUSINESS.phone}`}>
              <Button
                size="lg"
                variant="secondary"
                className="w-full px-10 py-8 text-lg font-black tracking-widest uppercase sm:w-auto"
              >
                Call Our Office
              </Button>
            </a>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <h2 className="text-oxblood mb-6 text-4xl font-black tracking-tight uppercase">
                {copy.protectionTitle}
              </h2>
              <p className="text-slate mb-8 text-lg leading-relaxed font-medium">
                {copy.protectionDescription}
              </p>
              <ul className="space-y-4">
                {copy.protectionFeatures.map((item) => (
                  <li
                    key={item}
                    className="text-oxblood flex items-center gap-3 font-bold"
                  >
                    <ShieldCheck className="h-5 w-5 opacity-60" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-oxblood/10 bg-cream rounded-3xl border p-12 shadow-xl">
              <h3 className="text-oxblood mb-6 flex items-center gap-3 text-2xl font-black tracking-tight uppercase">
                <MapPin className="h-6 w-6" /> Local Service Area
              </h3>
              <p className="text-slate mb-6 font-medium">
                We serve the {area.city} area and surrounding {area.county}{' '}
                County communities:
              </p>
              <div className="mb-8 flex flex-wrap gap-2">
                {area.localCommunities.map((community) => (
                  <span
                    key={community}
                    className="bg-oxblood text-cream rounded-full px-3 py-1 text-xs font-bold uppercase"
                  >
                    {community}
                  </span>
                ))}
              </div>
              <Link href={`/contact?service=Inspection Repairs`}>
                <Button className="w-full font-black tracking-widest uppercase">
                  Request Service in {area.city}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {isKeizer && (
        <Section
          variant="cream"
          spacing="lg"
          className="border-oxblood/10 border-t"
        >
          <Container>
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <p className="text-oxblood/70 text-xs font-black tracking-[0.4em] uppercase">
                  Local Climate Expertise
                </p>
                <h2 className="text-oxblood mt-4 text-3xl font-black tracking-tight uppercase">
                  Moss & Moisture Specialists
                </h2>
                <p className="text-slate mt-4 text-lg leading-relaxed font-medium">
                  We specialize in moss mitigation and moisture-intrusion
                  repairs—the #1 threat to Keizer’s older housing stock and
                  90s-era developments.
                </p>
                <ul className="text-oxblood mt-6 space-y-3 text-sm font-bold">
                  <li>
                    Mapped moss mitigation and moisture-intrusion repairs for
                    riverfront and subdivision stock.
                  </li>
                  <li>
                    Inspection-ready scopes that explain the root cause before
                    FHA, VA, and lender deadlines.
                  </li>
                  <li>
                    Subscription upkeep built for the Valley humidity swings and
                    rapid freeze cycles.
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-oxblood/70 text-xs font-black tracking-[0.4em] uppercase">
                  FHA & VA Deadline Specialists
                </p>
                <h2 className="text-oxblood mt-4 text-3xl font-black tracking-tight uppercase">
                  Close on Time Near Keizer Station
                </h2>
                <p className="text-slate mt-4 text-lg leading-relaxed font-medium">
                  Selling a home near Keizer Station? We clear inspection
                  contingencies fast so you can close on time—no more lender
                  pushback or surprise punch lists.
                </p>
                <p className="text-slate mt-4 text-sm leading-relaxed font-medium">
                  Our Keizer team batches upload-ready FHA letters, documents
                  the scope, and keeps every lender and buyer in the loop.
                </p>
              </div>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="border-oxblood/10 rounded-3xl border bg-white/90 p-6">
                <p className="text-oxblood/70 text-xs font-black tracking-[0.4em] uppercase">
                  On-Site in Minutes
                </p>
                <h3 className="text-oxblood mt-4 text-2xl font-black">
                  Priority Dispatch
                </h3>
                <p className="text-slate mt-3 text-sm leading-relaxed">
                  Technicians are frequently dispatched along the I-5 corridor,
                  giving Keizer and North Salem residents priority scheduling
                  when moisture or inspection timelines demand it.
                </p>
              </div>
              <div className="border-oxblood/10 bg-oxblood/5 flex flex-col justify-between rounded-3xl border p-6 md:col-span-2">
                <div>
                  <p className="text-oxblood/70 text-xs font-black tracking-[0.4em] uppercase">
                    Not in Keizer?
                  </p>
                  <h3 className="text-oxblood mt-3 text-2xl font-black">
                    {keizerNeighbors.join(', ')}
                  </h3>
                  <p className="text-slate mt-3 text-sm leading-relaxed">
                    We also serve {keizerNeighbors.join(', ')}. Check our live
                    availability map to see when we are next free in your
                    neighborhood.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact?service=Keizer%20Site%20Visit"
                    className="w-full md:w-auto"
                  >
                    <Button
                      size="lg"
                      className="w-full max-w-xs text-lg font-black tracking-widest uppercase"
                    >
                      Schedule a Keizer Site Visit
                    </Button>
                  </Link>
                  <Link href="/areas" className="w-full md:w-auto">
                    <Button
                      variant="outline"
                      className="w-full max-w-xs text-lg font-black tracking-widest uppercase"
                    >
                      View Live Availability Map
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {area.caseStudy && (
        <Section variant="cream" spacing="lg">
          <Container>
            <div className="grid items-center gap-16 md:grid-cols-2">
              <div className="order-last md:order-first">
                <h2 className="text-oxblood mb-6 text-4xl font-black tracking-tight uppercase">
                  {area.caseStudy.title}
                </h2>
                <p className="text-slate mb-8 text-lg leading-relaxed font-medium">
                  {area.caseStudy.description}
                </p>
                <Link href={`/contact?service=Inspection Repairs`}>
                  <Button variant="secondary">
                    See How We Handle Similar Work
                  </Button>
                </Link>
              </div>
              <div>
                <Image
                  src={area.caseStudy.imageUrl}
                  alt={area.caseStudy.title}
                  width={800}
                  height={600}
                  className="rounded-3xl shadow-xl"
                />
              </div>
            </div>
          </Container>
        </Section>
      )}

      {area.testimonial && (
        <Section spacing="lg">
          <Container className="text-center">
            <h2 className="text-oxblood mb-6 text-4xl font-black tracking-tight uppercase">
              What Our Clients Say
            </h2>
            <blockquote className="mx-auto max-w-3xl">
              <p className="text-slate text-2xl leading-relaxed font-medium">
                &ldquo;{area.testimonial.quote}&rdquo;
              </p>
              <footer className="mt-8">
                <p className="text-oxblood text-xl font-black">
                  {area.testimonial.author}
                </p>
                <p className="text-slate text-sm font-medium">
                  {area.testimonial.authorTitle}
                </p>
              </footer>
            </blockquote>
          </Container>
        </Section>
      )}

      <Section
        variant="cream"
        spacing="md"
        className="border-oxblood/5 border-t"
      >
        <Container>
          <div className="mb-12 text-center">
            <h3 className="text-oxblood text-2xl font-black tracking-tight uppercase">
              Available Services in {area.city}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                name: 'Inspection Repairs',
                href: `/areas/${city}/inspection-repairs`,
              },
              {
                name: 'Water, Mold & Moisture',
                href: `/areas/${city}/water-mold-moisture`,
              },
              {
                name: 'Property Preservation',
                href: `/areas/${city}/property-preservation`,
              },
              {
                name: 'Energy & Weatherization',
                href: `/areas/${city}/energy-weatherization`,
              },
            ].map((service) => (
              <Link key={service.href} href={service.href}>
                <Button
                  variant="outline"
                  className="border-oxblood/20 text-oxblood hover:bg-oxblood hover:text-cream w-full text-xs font-black tracking-widest uppercase"
                >
                  {service.name}
                </Button>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
