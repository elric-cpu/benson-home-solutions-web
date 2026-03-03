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
  title: 'Professional Mold Remediation | Benson Home Solutions',
  description:
    'Certified mold remediation and mitigation in Oregon. We follow IICRC S520 standards to ensure permanent air quality stabilization. Licensed CCB #258533.',
};

export default function MoldRemediationPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    {
      name: 'Mold Remediation',
      url: `${BUSINESS.url}/services/mold-remediation`,
    },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name="Mold Remediation"
        description="Permanent air quality stabilization and mold mitigation following IICRC S520 standards."
        url={`${BUSINESS.url}/services/mold-remediation`}
      />

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Air Quality Stabilization
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Certified Mold Remediation
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Mold is a symptom of a building envelope failure. We provide the
              forensic oversight needed to not only remove the mold but to
              identify and stop the source of moisture permanently.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Request Assessment</Button>
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
                  IICRC Standard Care
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  We follow strict S520 protocols for containment and removal.
                  We protect your building and your occupants from
                  cross-contamination.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Moisture Identification
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Using high-fidelity moisture mapping, we find where the water
                  is entering and why. Remediation is useless without stopping
                  the source.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Permanent Stabilization
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Post-remediation cleaning and structural stabilization. We
                  provide the documentation needed to prove your air quality is
                  safe.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
