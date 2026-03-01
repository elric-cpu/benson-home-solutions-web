import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Container, Badge, Button, Card, CardContent } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Window & Door Replacement | Building Envelope Security',
  description:
    'Professional window and door installation in Oregon. We focus on structural integrity and building envelope performance. Licensed CCB #258533.',
};

export default function WindowsDoorsPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    { name: 'Windows & Doors', url: `${BUSINESS.url}/services/windows-doors` },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd 
        name="Window & Door Services"
        description="High-fidelity window and door installation focused on building envelope security and energy performance."
        url={`${BUSINESS.url}/services/windows-doors`}
      />

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">Envelope Security</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-oxblood leading-tight">
              Window & Door Precision
            </h1>
            <p className="mt-6 text-xl text-slate leading-relaxed">
              Windows and doors are the most common points of failure in a building envelope. We provide the expert oversight needed to ensure every install is forensically sealed and structurally sound.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg">Request Estimate</Button>
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
                <h3 className="text-xl font-bold text-charcoal mb-3">Structural Install</h3>
                <p className="text-slate leading-relaxed text-sm">
                  We don&apos;t just swap units. We inspect for rot, stabilize the rough opening, and ensure the new unit is plumb, level, and square.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">Forensic Flashing</h3>
                <p className="text-slate leading-relaxed text-sm">
                  The Valley&apos;s rain requires absolute sealant precision. We follow trade-standard flashing protocols to stop water intrusion before it starts.
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="border-t-4 border-t-oxblood">
              <CardContent className="pt-8">
                <h3 className="text-xl font-bold text-charcoal mb-3">Security & Access</h3>
                <p className="text-slate leading-relaxed text-sm">
                  High-performance hardware and sound installation. We secure your property against the elements and intrusion with trade precision.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}
