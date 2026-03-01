import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Container, Badge, Button, Card, CardContent } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Professional Demolition Services | Benson Home Solutions',
  description:
    'Selective and full-scope demolition services in the Mid-Willamette Valley. Interior prep, debris management, and structural stabilization. Licensed CCB #258533.',
};

export default function DemolitionPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    { name: 'Demolition', url: `${BUSINESS.url}/services/demolition` },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd 
        name="Demolition Services"
        description="Selective and structural demolition with professional debris management and site stabilization."
        url={`${BUSINESS.url}/services/demolition`}
      />

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">Site Preparation</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-oxblood leading-tight">
              Controlled Demolition & Prep
            </h1>
            <p className="mt-6 text-xl text-slate leading-relaxed">
              Every reconstruction project starts with a clean slate. We provide the professional oversight needed for selective or full-scope demolition, ensuring structural stability and sound debris management.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg">Request Quote</Button>
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
                <h3 className="text-xl font-bold text-charcoal mb-3">Selective Demo</h3>
                <p className="text-slate leading-relaxed text-sm">
                  Precision removal of interior elements while protecting existing structures. Ideal for focused remodeling and tenant improvement projects.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">Structural Stripping</h3>
                <p className="text-slate leading-relaxed text-sm">
                  Full-scope removal of building components down to the framing. We identify underlying issues like rot or mold during the process.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">Debris Management</h3>
                <p className="text-slate leading-relaxed text-sm">
                  Sound disposal and site clean-up. We ensure the workspace is stabilized and ready for the next phase of reconstruction.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
