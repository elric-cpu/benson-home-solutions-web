import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Container, Badge, Button, Card, CardContent } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Tenant Improvement & Property Maintenance | Benson Home Solutions',
  description:
    'High-fidelity tenant turnover and facility maintenance in the Mid-Willamette Valley. Turn-key prep, trash-outs, and structural oversight. Licensed CCB #258533.',
};

export default function TenantServicesPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    { name: 'Tenant Services', url: `${BUSINESS.url}/services/tenant-services` },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd 
        name="Tenant Services"
        description="Turn-key tenant turnover and facility maintenance services for property managers and owners."
        url={`${BUSINESS.url}/services/tenant-services`}
      />

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">Facility Stewardship</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-oxblood leading-tight">
              Tenant Turnover & Care
            </h1>
            <p className="mt-6 text-xl text-slate leading-relaxed">
              We understand the financial impact of vacancy. We provide the expert oversight needed for rapid, turn-key tenant transitions, ensuring your property is stabilized and board-ready for the next occupant.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg">Partner With Us</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">Turn-Key Prep</h3>
                <p className="text-slate leading-relaxed text-sm">
                  Complete interior refresh—paint, flooring, and utility audits. We get the unit back on the market with a professional finish.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">Structural Audits</h3>
                <p className="text-slate leading-relaxed text-sm">
                  We don&apos;t just clean; we inspect. Every turnover includes a forensic review of the building envelope to find deferred maintenance before it costs you.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">Rapid Trash-Outs</h3>
                <p className="text-slate leading-relaxed text-sm">
                  Full debris removal and site stabilization for abandoned units. We handle the heavy work so your crews can focus on management.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
