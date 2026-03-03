import { Metadata } from 'next';
import Link from 'next/link';
import { Section, Container, Card, CardContent, Badge } from '@/components/ui';
import { SERVICE_AREAS, BUSINESS } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Service Areas | Benson Home Solutions',
  description:
    'Professional maintenance and restoration services across the Mid-Willamette Valley and Harney County Oregon.',
};

export default function AreasPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Service Areas', url: `${BUSINESS.url}/areas` },
  ];

  const regions = [
    {
      name: 'Mid-Willamette Valley',
      badge: 'Main Service Area',
      cities: SERVICE_AREAS.midWillametteValley,
      description:
        'Our primary response zone for 24/7 emergency restoration and scheduled maintenance programs.',
    },
    {
      name: 'Harney County',
      badge: 'Extended Coverage',
      cities: SERVICE_AREAS.harneyCounty,
      description:
        'Specialized property oversight and maintenance services for Burns, Hines, and surrounding communities.',
    },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="text-oxblood mb-4">
              Where We Work
            </Badge>
            <h1 className="text-charcoal text-4xl leading-tight font-bold md:text-5xl">
              Serving the Communities of Oregon
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Benson Home Solutions provides professional trade oversight across
              two primary regions. From the rains of the Valley to the high
              desert of Harney County, we protect your property investment.
            </p>
          </div>
        </Container>
      </Section>

      {/* Regions Grid */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            {regions.map((region) => (
              <div key={region.name} className="space-y-8">
                <div>
                  <Badge variant="secondary" className="mb-3">
                    {region.badge}
                  </Badge>
                  <h2 className="text-charcoal mb-4 text-3xl font-bold">
                    {region.name}
                  </h2>
                  <p className="text-slate leading-relaxed">
                    {region.description}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {region.cities.map((city) => (
                    <Link
                      key={city}
                      href={`/areas/${city.toLowerCase().replace(' ', '-')}`}
                      className="group"
                    >
                      <Card
                        hover
                        className="border-slate/5 group-hover:border-oxblood/20 transition-colors"
                      >
                        <CardContent className="flex items-center justify-between p-4">
                          <span className="text-charcoal group-hover:text-oxblood font-bold transition-colors">
                            {city}
                          </span>
                          <span className="text-oxblood opacity-0 transition-all group-hover:opacity-100">
                            &rarr;
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Out of Area CTA */}
      <Section variant="charcoal" spacing="md">
        <Container size="narrow" className="text-center">
          <h2 className="text-cream mb-4 text-2xl font-bold">
            Don&apos;t See Your City?
          </h2>
          <p className="text-cream/60 mb-8">
            We are currently expanding our priority response network. Contact us
            to see if we can facilitate a project in your area.
          </p>
          <Link href="/contact">
            <Badge
              variant="secondary"
              className="hover:bg-cream hover:text-oxblood cursor-pointer px-6 py-2 transition-colors"
            >
              Inquire About Coverage
            </Badge>
          </Link>
        </Container>
      </Section>
    </main>
  );
}
