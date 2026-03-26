import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Card, CardHeader, CardContent } from '@/components/ui';
import { SERVICE_AREAS, SERVICES } from '@/lib/constants';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Service Areas',
  description: 'We serve communities across the Mid-Willamette Valley and Harney County with repairs, restoration, maintenance, and weatherization services.',
  alternates: {
    canonical: '/areas',
  },
  openGraph: {
    title: 'Benson Home Solutions Service Areas',
    description:
      'Communities across the Mid-Willamette Valley and Harney County where we handle repairs, restoration, maintenance, and weatherization work.',
    url: 'https://www.bensonhomesolutions.com/areas',
    images: ['/opengraph-image'],
  },
};

const toSlug = (text: string) => text.toLowerCase().replace(/ /g, '-');

export default function ServiceAreasPage() {
  const regions = [
    { name: 'The Mid-Willamette Valley', cities: SERVICE_AREAS.midWillametteValley },
    { name: 'Harney County', cities: SERVICE_AREAS.harneyCounty },
  ];

  return (
    <>
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-oxblood">
            Serving Communities Across Oregon
          </h1>
          <p className="text-lg md:text-xl mb-12 leading-relaxed font-medium text-oxblood/80 max-w-3xl mx-auto">
            Find your city and see the repair, restoration, maintenance, and preservation work we provide there.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          {regions.map((region) => (
            <div key={region.name} className="mb-20">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-oxblood mb-12 text-center">
                {region.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {region.cities.map((city) => (
                  <Card key={city} className="flex flex-col">
                    <CardHeader className="flex-row items-center gap-4">
                      <MapPin className="w-8 h-8 text-oxblood" />
                      <h3 className="text-2xl font-black tracking-tight text-oxblood">{city}</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {Object.entries(SERVICES).map(([slug, service]) => (
                          <li key={slug}>
                            <Link 
                              href={`/areas/${toSlug(city)}/${slug}`}
                              className="font-medium text-slate hover:text-oxblood transition-colors border-b border-dotted hover:border-solid hover:border-oxblood"
                            >
                              {service.title} in {city}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
