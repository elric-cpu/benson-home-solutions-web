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
  title: 'Bathroom Remodeling & Structural Finish | Benson Home Solutions',
  description:
    'High-fidelity bathroom remodeling in Oregon. We handle full-scope reconstruction, waterproofing, and high-end finishing. Licensed CCB #258533.',
};

export default function BathroomRemodelingPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    {
      name: 'Bathroom Remodeling',
      url: `${BUSINESS.url}/services/bathroom-remodeling`,
    },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name="Bathroom Remodeling"
        description="Full-scope bathroom reconstruction focused on forensic waterproofing and professional trade finishing."
        url={`${BUSINESS.url}/services/bathroom-remodeling`}
      />

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Trade Precision
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              High-Fidelity Bathroom Reconstruction
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Bathrooms are the highest-risk environments in any building. We
              provide the expert oversight needed to ensure forensic-level
              waterproofing combined with a premium structural finish.
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
                  Forensic Waterproofing
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  We use advanced membrane systems to ensure your building
                  envelope is protected from the inside out. No shortcuts on
                  moisture barriers.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Layout Optimization
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  Maximize your square footage with sound structural re-routing.
                  We handle complex plumbing and electrical moves with trade
                  precision.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-oxblood border-t-4">
              <CardContent className="pt-8">
                <h3 className="text-charcoal mb-3 text-xl font-bold">
                  Premium Finishing
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  The difference is in the details. Plumb walls, level floors,
                  and flawless tile alignment define the Benson Standard of
                  work.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
