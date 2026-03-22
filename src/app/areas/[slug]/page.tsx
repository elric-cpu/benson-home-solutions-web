import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, Section, Button, Badge } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { MapPin, ShieldCheck } from 'lucide-react';
import { AREA_DATA } from '@/lib/area-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = AREA_DATA[slug];

  if (!area) {
    return {
      title: 'Service Area Not Found',
    };
  }

  return {
    title: area.title,
    description: area.description,
    alternates: {
      canonical: `https://bensonhomesolutions.com/areas/${slug}`,
    },
    openGraph: {
      title: area.title,
      description: area.description,
      url: `https://bensonhomesolutions.com/areas/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(AREA_DATA).map((slug) => ({
    slug,
  }));
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = AREA_DATA[slug];

  if (!area) {
    notFound();
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${BUSINESS.name} - ${area.city}`,
    description: area.description,
    url: `https://bensonhomesolutions.com/areas/${slug}`,
    telephone: BUSINESS.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: area.city,
      addressRegion: 'OR',
      addressCountry: 'US',
    },
    geo: area.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: area.coordinates.lat,
      longitude: area.coordinates.lng,
    } : undefined,
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: area.coordinates ? {
        '@type': 'GeoCoordinates',
        latitude: area.coordinates.lat,
        longitude: area.coordinates.lng,
      } : undefined,
      geoRadius: '40000',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Does Benson Home Solutions provide emergency restoration in ${area.city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, we provide 24/7 emergency restoration services for water damage, fire damage, and structural emergencies in ${area.city} and throughout ${area.county} County.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is Benson Home Solutions a licensed contractor in ${area.city}, Oregon?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, Benson Home Solutions is a fully licensed, bonded, and insured Oregon contractor (CCB #258533). We are authorized to perform home maintenance, remodeling, and restoration services in ${area.city} and across the state.`,
        },
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Serving {area.city} & {area.county} County
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            {area.heroTitle} <br />
            <span className="italic opacity-60">{area.heroSubtitle}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            {area.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href={`tel:${BUSINESS.phone}`}>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest">
                Call Our Office
              </Button>
            </a>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood mb-6">
                {area.protectionTitle}
              </h2>
              <p className="text-lg text-slate font-medium leading-relaxed mb-8">
                {area.protectionDescription}
              </p>
              <ul className="space-y-4">
                {area.protectionFeatures.map((i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-oxblood">
                    <ShieldCheck className="w-5 h-5 opacity-60" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream p-12 rounded-3xl border border-oxblood/10 shadow-xl">
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6" /> Local Service Area
              </h3>
              <p className="text-slate font-medium mb-6">
                We serve the {area.city} area and surrounding {area.county} County communities:
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {area.localCommunities.map((c) => (
                  <span key={c} className="px-3 py-1 bg-oxblood text-cream rounded-full text-xs font-bold uppercase">{c}</span>
                ))}
              </div>
              <Link href="/contact">
                <Button className="w-full font-black uppercase tracking-widest">Request Site Audit</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
