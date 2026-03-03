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
  title: 'Professional Property Maintenance | Benson Home Solutions',
  description:
    'Comprehensive property maintenance services in the Mid-Willamette Valley. We provide the professional oversight needed to protect your building investment. Licensed CCB #258533.',
};

export default function MaintenancePage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    { name: 'Maintenance', url: `${BUSINESS.url}/services/maintenance` },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name="Property Maintenance"
        description="Professional property maintenance and building envelope oversight for Oregon property owners."
        url={`${BUSINESS.url}/services/maintenance`}
      />

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Building Stewardship
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Professional Property Oversight
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Maintaining a property is about more than aesthetics—it is about
              structural defense. We provide the expert oversight needed to
              identify deferred maintenance before it leads to building envelope
              failure.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Request Maintenance Audit</Button>
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
                  Envelope Audits
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  We perform forensic walkthroughs of your exterior seals, roof
                  transitions, and drainage systems to find active risks.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Mechanical Overisght
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Systematic monitoring of HVAC, plumbing, and electrical
                  systems. We ensure your infrastructure is operating at peak
                  efficiency.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Trade-Standard Repairs
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  No &quot;handyman&quot; patches. Every repair is performed to
                  trade standards, ensuring long-term structural integrity and
                  resale value.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
