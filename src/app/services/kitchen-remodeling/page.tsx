import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Container, Badge, Button, Card, CardContent } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Kitchen Remodeling & Reconstruction | Benson Home Solutions',
  description:
    'Professional kitchen remodeling and structural reconstruction in the Mid-Willamette Valley. We provide the trade precision required for a high-fidelity structural finish. Licensed CCB #258533.',
};

export default function KitchenRemodelingPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    { name: 'Kitchen Remodeling', url: `${BUSINESS.url}/services/kitchen-remodeling` },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd 
        name="Kitchen Remodeling"
        description="High-fidelity kitchen remodeling and structural reconstruction focused on building envelope integrity and trade precision."
        url={`${BUSINESS.url}/services/kitchen-remodeling`}
      />

      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">Structural Reconstruction</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-oxblood leading-tight">
              Precision Kitchen Remodeling
            </h1>
            <p className="mt-6 text-xl text-slate leading-relaxed">
              A kitchen is more than a showroom—it is a high-utility environment that requires absolute structural integrity. We provide the trade precision needed to handle everything from layout reconstruction to professional finishing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg">Request Design Consultation</Button>
              </Link>
              <a href={`tel:${BUSINESS.phone}`}>
                <Button variant="outline" size="lg">Call Office: {BUSINESS.phone}</Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Focus Areas */}
      <Section spacing="lg">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">Layout Reconstruction</h3>
                <p className="text-slate leading-relaxed text-sm">
                  We specialize in moving structural walls and re-routing utility lines to optimize your workflow. No &quot;surface-level&quot; patches—just sound engineering.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">Material Precision</h3>
                <p className="text-slate leading-relaxed text-sm">
                  From quartz surfacing to custom millwork, we use materials that withstand the test of time and high-moisture environments.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">Utility Integration</h3>
                <p className="text-slate leading-relaxed text-sm">
                  Electrical and plumbing re-routes handled with trade precision. We ensure your high-end appliances have the dedicated infrastructure they require.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* The Benson Standard */}
      <Section variant="charcoal" spacing="lg">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold text-cream mb-6">The Reconstruction Standard</h2>
          <p className="text-cream/70 text-lg mb-10 leading-relaxed">
            We don&apos;t just install cabinets. We ensure the floor is level, the framing is plumb, and the building envelope is secure. That is the Benson Standard of precision.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">Start Your Project</Button>
          </Link>
        </Container>
      </Section>
    </main>
  );
}
