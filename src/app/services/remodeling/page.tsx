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
import { BUSINESS, HERO_ASSETS } from '@/lib/constants';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/seo/json-ld';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Remodeling & Reconstruction | Benson Home Solutions',
  description:
    'Professional remodeling and restoration services for the Mid-Willamette Valley. Post-damage reconstruction, kitchen and bathroom remodels, and structural repairs. CCB #258533.',
};

const serviceTypes = [
  {
    title: 'Post-Damage Reconstruction',
    desc: 'After water damage, fire, or storm events, we handle the full reconstruction process. From structural repairs to finish work, we restore your property to pre-loss condition or better.',
    items: [
      'Structural framing repairs',
      'Drywall and finish work',
      'Flooring replacement',
      'Cabinet and fixture installation',
      'Insurance claim documentation',
    ],
    icon: '🏗️',
  },
  {
    title: 'Kitchen Remodeling',
    desc: 'Functional, durable kitchen renovations designed for how you actually use your kitchen. We focus on quality materials, efficient layouts, and craftsmanship that lasts.',
    items: [
      'Layout optimization',
      'Cabinet installation',
      'Countertop replacement',
      'Plumbing and fixture upgrades',
      'Flooring and backsplash',
    ],
    icon: '🍳',
    href: '/services/kitchen-remodeling',
  },
  {
    title: 'Bathroom Remodeling',
    desc: 'Bathroom renovations that prioritize waterproofing, ventilation, and durability. Every bathroom we touch is built to resist the moisture problems that plague Oregon homes.',
    items: [
      'Shower and tub replacement',
      'Tile work and waterproofing',
      'Vanity and fixture upgrades',
      'Ventilation improvements',
      'Accessibility modifications',
    ],
    icon: '🚿',
    href: '/services/bathroom-remodeling',
  },
  {
    title: 'Structural Repairs',
    desc: 'Foundation issues, rotted framing, load-bearing wall modifications. We tackle the structural problems that other contractors avoid, with proper engineering and permits.',
    items: [
      'Foundation repair',
      'Framing and load-bearing work',
      'Dry rot remediation',
      'Crawlspace repair',
      'Seismic retrofitting',
    ],
    icon: '🧱',
  },
];

export default function RemodelingPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
    { name: 'Remodeling', url: `${BUSINESS.url}/services/remodeling` },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceJsonLd
        name="Remodeling & Reconstruction"
        description="Professional remodeling and post-damage restoration services in the Mid-Willamette Valley."
        url={`${BUSINESS.url}/services/remodeling`}
      />

      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Structural Excellence
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Remodeling & Reconstruction
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              From post-damage reconstruction to planned renovations, we deliver
              quality craftsmanship with the documentation and communication you
              deserve. We focus on structural integrity and trade-standard
              finishes.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Request a Proposal</Button>
              </Link>
              <a href={`tel:${BUSINESS.phone}`}>
                <Button variant="outline" size="lg">
                  Call {BUSINESS.phone}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services List */}
      <Section spacing="lg">
        <Container>
          <div className="mb-12">
            <h2 className="text-charcoal text-3xl font-bold md:text-4xl">
              Specialized Reconstruction
            </h2>
            <p className="text-slate mt-4 text-lg">
              We handle the complex structural work that many remodeling
              contractors avoid.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {serviceTypes.map((service) => (
              <Card key={service.title} variant="elevated" className="group">
                <CardContent className="p-8">
                  <div className="mb-4 text-4xl">{service.icon}</div>
                  <h3 className="text-charcoal mb-3 text-xl font-bold transition-colors group-hover:text-oxblood">
                    {service.title}
                  </h3>
                  <p className="text-slate mb-6 leading-relaxed">
                    {service.desc}
                  </p>
                  <ul className="mb-8 grid gap-2 sm:grid-cols-1">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="text-slate flex items-center gap-2 text-sm"
                      >
                        <span className="text-oxblood font-bold">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  {service.href ? (
                    <Link href={service.href}>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        View Service Details
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/contact">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Inquire About This Service
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section variant="cream" spacing="lg">
        <Container size="narrow">
          <h2 className="text-charcoal mb-12 text-center text-3xl font-bold md:text-4xl">
            Our Remodeling Process
          </h2>
          <div className="space-y-10">
            {[
              {
                step: '1',
                title: 'Consultation & Scope',
                desc: 'We walk your project, discuss your goals and budget, and define a clear scope of work.',
              },
              {
                step: '2',
                title: 'Detailed Proposal',
                desc: 'You receive a written proposal with line-item pricing, material specifications, and a project timeline.',
              },
              {
                step: '3',
                title: 'Permits & Prep',
                desc: 'We pull all required permits, order materials, and prep the work area before construction begins.',
              },
              {
                step: '4',
                title: 'Construction',
                desc: 'Our crew executes the work with daily cleanup and regular progress updates. No surprises.',
              },
              {
                step: '5',
                title: 'Final Walkthrough',
                desc: 'We walk the completed project with you, address any punch-list items, and ensure your satisfaction.',
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-6">
                <div className="bg-oxblood text-cream flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-charcoal text-lg font-bold">{s.title}</h3>
                  <p className="text-slate leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="oxblood" spacing="lg">
        <Container size="narrow" className="text-center">
          <h2 className="text-cream text-3xl font-bold md:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="text-cream/80 mt-6 text-lg">
            Tell us about your remodeling or restoration needs. We will provide
            a detailed proposal with no obligation.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Request a Proposal
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
