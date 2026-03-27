import { Metadata } from 'next';
import Link from 'next/link';
import {
  Container,
  Section,
  Card,
  CardHeader,
  CardContent,
} from '@/components/ui';
import { SERVICE_AREAS, SERVICES } from '@/lib/constants';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Service Areas',
  description:
    'We serve communities across the Mid-Willamette Valley and Harney County with repairs, restoration, maintenance, and weatherization services.',
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
    {
      name: 'The Mid-Willamette Valley',
      cities: SERVICE_AREAS.midWillametteValley,
    },
    { name: 'Harney County', cities: SERVICE_AREAS.harneyCounty },
  ];

  return (
    <>
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <h1 className="text-oxblood mb-8 text-4xl leading-tight font-black tracking-tight sm:text-5xl md:text-6xl">
            Serving Communities Across Oregon
          </h1>
          <p className="text-oxblood/80 mx-auto mb-12 max-w-3xl text-lg leading-relaxed font-medium md:text-xl">
            Find your city and see the repair, restoration, maintenance, and
            preservation work we provide there.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          {regions.map((region) => (
            <div key={region.name} className="mb-20">
              <h2 className="text-oxblood mb-12 text-center text-3xl font-black tracking-tight uppercase md:text-4xl">
                {region.name}
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {region.cities.map((city) => (
                  <Card key={city} className="flex flex-col">
                    <CardHeader className="flex-row items-center gap-4">
                      <MapPin className="text-oxblood h-8 w-8" />
                      <h3 className="text-oxblood text-2xl font-black tracking-tight">
                        {city}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {Object.entries(SERVICES).map(([slug, service]) => (
                          <li key={slug}>
                            <Link
                              href={`/areas/${toSlug(city)}/${slug}`}
                              className="text-slate hover:text-oxblood hover:border-oxblood border-b border-dotted font-medium transition-colors hover:border-solid"
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
