import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Section,
  Container,
  Badge,
  Button,
  Card,
  CardContent,
} from '@/components/ui';
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
    {
      name: 'Tenant Services',
      url: `${BUSINESS.url}/services/tenant-services`,
    },
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
            <Badge variant="secondary" className="mb-4">
              Facility Stewardship
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Tenant Turnover & Care
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              We understand the financial impact of vacancy. We provide the
              expert oversight needed for rapid, turn-key tenant transitions,
              ensuring your property is stabilized and board-ready for the next
              occupant.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Partner With Us</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Turn-Key Prep
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Complete interior refresh—paint, flooring, and utility audits.
                  We get the unit back on the market with a professional finish.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Structural Audits
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  We don&apos;t just clean; we inspect. Every turnover includes
                  a forensic review of the building envelope to find deferred
                  maintenance before it costs you.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Rapid Trash-Outs
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Full debris removal and site stabilization for abandoned
                  units. We handle the heavy work so your crews can focus on
                  management.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
