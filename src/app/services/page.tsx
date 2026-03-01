import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Container, Card, CardContent, Badge, Button } from '@/components/ui';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    absolute: 'Professional Maintenance & Restoration Services | Benson Home Solutions',
  },
  description: 'Explore our full range of professional maintenance, restoration, and mitigation services for residential and commercial properties in the Mid-Willamette Valley.',
};

const services = [
  {
    title: 'Maintenance Subscriptions',
    href: '/services/maintenance-subscriptions',
    desc: 'Systematic preventive maintenance that identifies building envelope risks before they become emergencies. Tailored for homes, commercial facilities, and churches.',
    icon: '🛡️',
    features: ['Seasonal inspections', 'Gutter & drainage audits', 'Envelope integrity checks', 'HVAC monitoring', 'Forensic photo logs'],
  },
  {
    title: 'Water Damage Restoration',
    href: '/services/water-damage',
    desc: 'Rapid-response extraction, structural drying, and high-fidelity reconstruction. We provide the forensic documentation required for insurance alignment from day one.',
    icon: '💧',
    features: ['Emergency extraction', 'Structural dry-out', 'IICRC-standard mitigation', 'Full structural rebuild', 'Moisture mapping'],
  },
  {
    title: 'Emergency Response',
    href: '/emergency',
    desc: 'Available 24/7 for active water intrusion, storm damage, and board-ups. On-site within 60 minutes in the Mid-Willamette Valley to stabilize your property.',
    icon: '🚨',
    features: ['24/7 direct access', '60-minute mobilization', 'Storm securement', 'Emergency board-up', 'Immediate stabilization'],
  },
  {
    title: 'Remodeling & Reconstruction',
    href: '/services/remodeling',
    desc: 'From high-end kitchen and bathroom remodels to post-damage reconstruction. We provide the trade precision required for a seamless structural finish.',
    icon: '🔨',
    features: ['Kitchen & bath precision', 'Structural reconstruction', 'ADA modifications', 'Building envelope repairs', 'Energy upgrades'],
  },
  {
    title: 'Commercial & Church Care',
    href: '/services/commercial',
    desc: 'Specialized oversight for institutional properties. We understand the unique requirements of high-occupancy facilities—from steeple repair to parking lot integrity.',
    icon: '🏢',
    features: ['Institutional maintenance', 'Church facility stewardship', 'Facility board reporting', 'SLA-based service', 'Budget forecasting'],
  },
  {
    title: 'Property Assessments',
    href: '/contact',
    desc: 'Not sure where to start? Our forensic assessment documents current conditions, identifies deferred maintenance risks, and provides a prioritized repair schedule.',
    icon: '📋',
    features: ['Full site walkthrough', 'Risk identification', 'Prioritized repair plan', 'Accurate cost estimating', 'Board-ready reporting'],
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
            <Badge variant="secondary" className="mb-4">Trade Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-oxblood leading-tight">
              Expert Oversight for Every Property
            </h1>
            <p className="mt-6 text-xl text-slate leading-relaxed">
              Benson Home Solutions provides the professional trade oversight required to maintain building integrity and recover from property damage.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section spacing="lg">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col h-full"
              >
                <Card hover className="flex-1 flex flex-col border-slate/10">
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <span className="text-4xl mb-6 block">{service.icon}</span>
                    <h2 className="text-2xl font-bold text-charcoal mb-4 group-hover:text-oxblood transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-slate mb-8 leading-relaxed flex-1">{service.desc}</p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-sm text-slate/70 flex items-center gap-2">
                          <span className="text-oxblood font-bold">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-oxblood font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                      View Service Details
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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
          <h2 className="text-3xl font-bold text-cream mb-6">Need a Forensic Assessment?</h2>
          <p className="text-cream/70 text-lg mb-10 leading-relaxed">
            We provide comprehensive site walkthroughs to identify risks and prioritize your maintenance budget. Stop the cycle of reactive repairs today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Schedule Assessment
              </Button>
            </Link>
            <a href={`tel:${BUSINESS.phone}`}>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/5 text-cream border-white/10 hover:bg-white/10"
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
