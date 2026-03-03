import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Section,
  Container,
  Card,
  CardContent,
  Badge,
  Button,
} from '@/components/ui';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    absolute:
      'Professional Maintenance & Restoration Services | Benson Home Solutions',
  },
  description:
    'Explore our full range of professional maintenance, restoration, and mitigation services for residential and commercial properties in the Mid-Willamette Valley.',
};

const services = [
  {
    title: 'Maintenance Subscriptions',
    href: '/services/maintenance-subscriptions',
    desc: 'Systematic preventive maintenance that identifies building envelope risks before they become emergencies. Tailored for homes, commercial facilities, and churches.',
    icon: '🛡️',
    features: [
      'Seasonal inspections',
      'Gutter & drainage audits',
      'Envelope integrity checks',
      'HVAC monitoring',
      'Forensic photo logs',
    ],
  },
  {
    title: 'Water Damage Restoration',
    href: '/services/water-damage',
    desc: 'Rapid-response extraction, structural drying, and high-fidelity reconstruction. We provide the forensic documentation required for insurance alignment from day one.',
    icon: '💧',
    features: [
      'Emergency extraction',
      'Structural dry-out',
      'IICRC-standard mitigation',
      'Full structural rebuild',
      'Moisture mapping',
    ],
  },
  {
    title: 'Emergency Response',
    href: '/emergency',
    desc: 'Available 24/7 for active water intrusion, storm damage, and board-ups. On-site within 60 minutes in the Mid-Willamette Valley to stabilize your property.',
    icon: '🚨',
    features: [
      '24/7 direct access',
      '60-minute mobilization',
      'Storm securement',
      'Emergency board-up',
      'Immediate stabilization',
    ],
  },
  {
    title: 'Remodeling & Reconstruction',
    href: '/services/remodeling',
    desc: 'From high-end kitchen and bathroom remodels to post-damage reconstruction. We provide the trade precision required for a seamless structural finish.',
    icon: '🔨',
    features: [
      'Kitchen & bath precision',
      'Structural reconstruction',
      'ADA modifications',
      'Building envelope repairs',
      'Energy upgrades',
    ],
  },
  {
    title: 'Commercial & Church Care',
    href: '/services/commercial',
    desc: 'Specialized oversight for institutional properties. We understand the unique requirements of high-occupancy facilities—from steeple repair to parking lot integrity.',
    icon: '🏢',
    features: [
      'Institutional maintenance',
      'Church facility stewardship',
      'Facility board reporting',
      'SLA-based service',
      'Budget forecasting',
    ],
  },
  {
    title: 'Property Assessments',
    href: '/contact',
    desc: 'Not sure where to start? Our forensic assessment documents current conditions, identifies deferred maintenance risks, and provides a prioritized repair schedule.',
    icon: '📋',
    features: [
      'Full site walkthrough',
      'Risk identification',
      'Prioritized repair plan',
      'Accurate cost estimating',
      'Board-ready reporting',
    ],
  },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Trade Services
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl">
              Expert Oversight for Every Property
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Benson Home Solutions provides the professional trade oversight
              required to maintain building integrity and recover from property
              damage.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex h-full flex-col"
              >
                <Card hover className="border-slate/10 flex flex-1 flex-col">
                  <CardContent className="flex flex-1 flex-col p-8">
                    <span className="mb-6 block text-4xl">{service.icon}</span>
                    <h2 className="text-charcoal group-hover:text-oxblood mb-4 text-2xl font-bold transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-slate mb-8 flex-1 leading-relaxed">
                      {service.desc}
                    </p>
                    <ul className="mb-8 space-y-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-slate/70 flex items-center gap-2 text-sm"
                        >
                          <span className="text-oxblood font-bold">✓</span>{' '}
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-oxblood flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                      View Service Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="charcoal" spacing="lg">
        <Container size="narrow" className="text-center">
          <h2 className="text-cream mb-6 text-3xl font-bold">
            Need a Forensic Assessment?
          </h2>
          <p className="text-cream/70 mb-10 text-lg leading-relaxed">
            We provide comprehensive site walkthroughs to identify risks and
            prioritize your maintenance budget. Stop the cycle of reactive
            repairs today.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Schedule Assessment
              </Button>
            </Link>
            <a href={`tel:${BUSINESS.phone}`}>
              <Button
                variant="outline"
                size="lg"
                className="text-cream border-white/10 bg-white/5 hover:bg-white/10"
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
