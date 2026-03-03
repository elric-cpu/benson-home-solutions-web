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
  title: 'Commercial & Church Maintenance | Benson Home Solutions',
  description:
    'Specialized maintenance programs for commercial buildings, churches, and institutional properties in the Mid-Willamette Valley. SLA-based service. CCB #258533.',
};

export default function CommercialPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    { name: 'Commercial', url: `${BUSINESS.url}/services/commercial` },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name="Commercial & Church Maintenance"
        description="Institutional property stewardship and maintenance programs for commercial and worship facilities."
        url={`${BUSINESS.url}/services/commercial`}
      />

      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Institutional Stewardship
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Commercial & Church Maintenance
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Institutional properties have unique maintenance demands. We offer
              SLA-based programs designed for commercial buildings, houses of
              worship, and multi-unit residential properties.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Request Facility Assessment</Button>
              </Link>
              <a href={`tel:${BUSINESS.phone}`}>
                <Button variant="outline" size="lg">
                  Call Office: {BUSINESS.phone}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="mb-12">
            <h2 className="text-charcoal text-3xl font-bold md:text-4xl">
              Property Types We Serve
            </h2>
            <p className="text-slate mt-4 text-lg">
              We understand the specific requirements of high-occupancy and
              mission-critical facilities.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: '⛪',
                title: 'Churches & Worship Facilities',
                desc: 'From historic sanctuaries to modern fellowship halls, we understand the unique maintenance challenges of worship facilities: aging roofs, stained glass care, fellowship kitchen maintenance, parking lot drainage, and ADA compliance.',
              },
              {
                icon: '🏢',
                title: 'Commercial Buildings',
                desc: 'Office buildings, retail spaces, and mixed-use properties. We maintain building envelopes, coordinate vendor services, and keep your facility presentable and functional for tenants and customers.',
              },
              {
                icon: '🏠',
                title: 'Multi-Unit Residential',
                desc: 'Apartment complexes, duplexes, and rental portfolios. We help landlords and property managers maintain multiple units efficiently with scheduled maintenance rotations.',
              },
            ].map((type) => (
              <Card key={type.title} variant="elevated" className="border-t-oxblood border-t-4">
                <CardContent className="pt-8">
                  <span className="mb-4 block text-4xl">{type.icon}</span>
                  <h3 className="text-charcoal mb-3 text-xl font-bold">
                    {type.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    {type.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* SLA Section */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="mb-12">
            <h2 className="text-charcoal text-3xl font-bold md:text-4xl">
              Service Level Agreements
            </h2>
            <p className="text-slate mt-4 text-lg">
              Our commercial maintenance programs include clear SLAs so you know
              exactly what to expect.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              {
                title: 'Response Times',
                items: [
                  'Emergency: 2-4 hour response',
                  'Urgent: Same business day',
                  'Routine: Scheduled within 5 business days',
                  'Preventive: Per maintenance calendar',
                ],
              },
              {
                title: 'Documentation',
                items: [
                  'Post-visit photo reports',
                  'Annual condition assessments',
                  'Capital expenditure forecasting',
                  'Insurance-ready documentation',
                ],
              },
              {
                title: 'Communication',
                items: [
                  'Dedicated point of contact',
                  'Scheduled check-in meetings',
                  'Digital maintenance portal',
                  'Real-time emergency updates',
                ],
              },
              {
                title: 'Scope',
                items: [
                  'Building envelope maintenance',
                  'Interior common area upkeep',
                  'Vendor coordination',
                  'Emergency board-up and tarping',
                ],
              },
            ].map((sla) => (
              <Card key={sla.title} variant="default">
                <CardContent className="p-6">
                  <h3 className="text-charcoal mb-4 text-lg font-bold">{sla.title}</h3>
                  <ul className="space-y-3">
                    {sla.items.map((item) => (
                      <li
                        key={item}
                        className="text-slate flex items-start gap-2 text-sm"
                      >
                        <span className="text-oxblood mt-0.5 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Church-specific */}
      <Section spacing="lg">
        <Container size="narrow">
          <h2 className="text-charcoal mb-8 text-3xl font-bold md:text-4xl text-center">
            Church Maintenance Expertise
          </h2>
          <Card className="border-oxblood/10 bg-oxblood/[0.02] p-8 md:p-12">
            <div className="prose prose-lg text-slate max-w-none">
              <p>
                Churches face maintenance challenges that residential contractors
                often do not understand: high ceilings and roof systems, large
                gathering spaces with heavy foot traffic, commercial kitchens,
                aging plumbing in historic buildings, and the need to maintain a
                welcoming environment on a limited budget.
              </p>
              <p>
                We work with church boards and facility committees to create
                maintenance programs that fit within annual budgets while
                protecting the building from the deferred maintenance that plagues
                so many worship facilities. Our documentation helps boards make
                informed decisions about capital projects and long-term facility
                planning.
              </p>
            </div>
          </Card>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="oxblood" spacing="lg">
        <Container size="narrow" className="text-center">
          <h2 className="text-cream text-3xl font-bold md:text-4xl">
            Let&apos;s Discuss Your Facility
          </h2>
          <p className="text-cream/80 mt-6 text-lg">
            Every commercial or institutional property is different. Contact us
            for a facility assessment and a customized maintenance proposal.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Request Facility Assessment
              </Button>
            </Link>
            <a href={`tel:${BUSINESS.phone}`}>
              <Button
                variant="outline"
                size="lg"
                className="text-cream border-white/20 hover:bg-cream hover:text-oxblood bg-white/5"
              >
                Call {BUSINESS.phone}
              </Button>
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}
