import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { MapPin, ShieldCheck } from 'lucide-react';
import { getAreaData, AREA_DATA } from '@/lib/areas';
import { absoluteUrl } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaData(slug);
  
  return {
    title: `${area.name}, OR Home Maintenance | Benson Home Solutions`,
    description: `Professional diagnostic home maintenance and emergency restoration in ${area.name}, Oregon. Licensed contractor (${BUSINESS.license}) serving ${area.county} County.`,
    alternates: {
      canonical: absoluteUrl(`/areas/${slug}`),
    },
    openGraph: {
      title: `${area.name}, OR Home Maintenance | Benson Home Solutions`,
      description: `Professional diagnostic home maintenance and emergency restoration in ${area.name}, Oregon. Licensed contractor (${BUSINESS.license}) serving ${area.county} County.`,
      url: absoluteUrl(`/areas/${slug}`),
      type: 'website',
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
  const area = getAreaData(slug);

  // If we want to strictly only allow defined areas, we could call notFound() here
  // But for now, we'll allow the fallback 'default' data if someone hits a valid-looking slug

  return (
    <>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            {area.badge}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            {area.heroTitle} <br />
            <span className="italic opacity-60">{area.heroSubtitle}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            {area.mainText1}
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
                {area.mainHeading}
              </h2>
              <p className="text-lg text-slate font-medium leading-relaxed mb-6">
                {area.mainText2}
              </p>
              <ul className="space-y-4">
                {area.benefits.map(i => (
                  <li key={i} className="flex items-center gap-3 font-bold text-oxblood">
                    <ShieldCheck className="w-5 h-5 opacity-60" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream p-12 rounded-3xl border border-oxblood/10 shadow-xl">
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6" /> {area.localCitiesHeading}
              </h3>
              <p className="text-slate font-medium mb-6">
                {area.localCitiesText}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {area.localCities.map(c => (
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

      {/* JSON-LD LocalBusiness for specific area */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HomeAndConstructionBusiness',
            name: `${BUSINESS.name} - ${area.name} Service Area`,
            image: BUSINESS.url + '/favicon.svg',
            '@id': `${BUSINESS.url}/areas/${area.slug}`,
            url: `${BUSINESS.url}/areas/${area.slug}`,
            telephone: BUSINESS.phone,
            address: {
              '@type': 'PostalAddress',
              addressLocality: area.name,
              addressRegion: 'OR',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: area.coordinates.lat,
              longitude: area.coordinates.lng,
            },
            areaServed: {
              '@type': 'City',
              name: area.name,
            },
          }),
        }}
      />
    </>
  );
}
