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
  title: 'Residential & Commercial Sitework | Benson Home Solutions',
  description:
    'Professional sitework, grading, and drainage solutions in Oregon. Driveway installation, utility prep, and site stabilization. Licensed CCB #258533.',
};

export default function SiteworkPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    { name: 'Sitework', url: `${BUSINESS.url}/services/sitework` },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name="Sitework Services"
        description="Professional grading, drainage, and site preparation for residential and commercial properties."
        url={`${BUSINESS.url}/services/sitework`}
      />

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Site Engineering
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Civil Sitework & Grading
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Ground conditions dictate the long-term stability of any
              structure. We provide the professional oversight needed for
              accurate grading, sound drainage, and reliable utility
              preparation.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Request Estimate</Button>
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
                  Drainage Solutions
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  The Mid-Willamette Valley’s rainfall requires aggressive
                  drainage engineering. We protect your foundation with French
                  drains, swales, and culvert installs.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Utility Prep
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Excavation and trenching for water, sewer, and electrical
                  lines. We ensure the infrastructure is laid with trade
                  precision and code compliance.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Grading & Driveways
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Structural sub-base prep and final grading for driveways and
                  building pads. We build surfaces that last and sheds water
                  correctly.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
