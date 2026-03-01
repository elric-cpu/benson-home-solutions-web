import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Container, Badge, Button, Card, CardContent } from '@/components/ui';
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
    { name: 'Bathroom Remodeling', url: `${BUSINESS.url}/services/bathroom-remodeling` },
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
            <Badge variant="secondary" className="mb-4">Trade Precision</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-oxblood leading-tight">
              High-Fidelity Bathroom Reconstruction
            </h1>
            <p className="mt-6 text-xl text-slate leading-relaxed">
              Bathrooms are the highest-risk environments in any building. We provide the expert oversight needed to ensure forensic-level waterproofing combined with a premium structural finish.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg">Request Assessment</Button>
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
                <h3 className="text-xl font-bold text-charcoal mb-3">Forensic Waterproofing</h3>
                <p className="text-slate leading-relaxed text-sm">
                  We use advanced membrane systems to ensure your building envelope is protected from the inside out. No shortcuts on moisture barriers.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">Layout Optimization</h3>
                <p className="text-slate leading-relaxed text-sm">
                  Maximize your square footage with sound structural re-routing. We handle complex plumbing and electrical moves with trade precision.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">Premium Finishing</h3>
                <p className="text-slate leading-relaxed text-sm">
                  The difference is in the details. Plumb walls, level floors, and flawless tile alignment define the Benson Standard of work.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
