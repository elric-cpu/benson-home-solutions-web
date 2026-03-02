import { Metadata } from 'next';
import Link from 'next/link';
import { Section, Container, Card, CardContent, Badge } from '@/components/ui';
import { SERVICE_AREAS, BUSINESS } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Service Areas | Benson Home Solutions',
  description: 'Professional maintenance and restoration services across the Mid-Willamette Valley and Harney County Oregon.',
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
      description: 'Our primary response zone for 24/7 emergency restoration and scheduled maintenance programs.'
    },
    {
      name: 'Harney County',
      badge: 'Extended Coverage',
      cities: SERVICE_AREAS.harneyCounty,
      description: 'Specialized property oversight and maintenance services for Burns, Hines, and surrounding communities.'
    }
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      
      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 text-oxblood">Where We Work</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight">
              Serving the Communities of Oregon
            </h1>
            <p className="mt-6 text-xl text-slate leading-relaxed">
              Benson Home Solutions provides professional trade oversight across two primary regions. 
              From the rains of the Valley to the high desert of Harney County, we protect your property investment.
            </p>
          </div>
        </Container>
      </Section>

      {/* Regions Grid */}
      <Section spacing="lg">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            {regions.map((region) => (
              <div key={region.name} className="space-y-8">
                <div>
                  <Badge variant="secondary" className="mb-3">{region.badge}</Badge>
                  <h2 className="text-3xl font-bold text-charcoal mb-4">{region.name}</h2>
                  <p className="text-slate leading-relaxed">{region.description}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {region.cities.map((city) => (
                    <Link 
                      key={city} 
                      href={`/areas/${city.toLowerCase().replace(' ', '-')}`}
                      className="group"
                    >
                      <Card hover className="border-slate/5 group-hover:border-oxblood/20 transition-colors">
                        <CardContent className="p-4 flex items-center justify-between">
                          <span className="font-bold text-charcoal group-hover:text-oxblood transition-colors">{city}</span>
                          <span className="text-oxblood opacity-0 group-hover:opacity-100 transition-all">&rarr;</span>
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
          <h2 className="text-2xl font-bold text-cream mb-4">Don&apos;t See Your City?</h2>
          <p className="text-cream/60 mb-8">
            We are currently expanding our priority response network. Contact us to see if we can 
            facilitate a project in your area.
          </p>
          <Link href="/contact">
            <Badge variant="secondary" className="cursor-pointer hover:bg-cream hover:text-oxblood transition-colors px-6 py-2">
              Inquire About Coverage
            </Badge>
          </Link>
        </Container>
      </Section>
    </main>
  );
}
