import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge, Card } from '@/components/ui';
import { ShieldCheck, Droplets, Hammer, Thermometer, Construction, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contracting Services',
  description:
    'Benson Home Solutions provides diagnostic property maintenance, emergency water restoration, mold mitigation, and specialized remodeling in the Mid-Willamette Valley.',
};

const serviceCategories = [
  {
    title: 'Maintenance Subscriptions',
    description: 'Proactive property care programs for residential, commercial, and church assets. Comprehensive Audits included.',
    href: '/services/maintenance-subscriptions',
    icon: ShieldCheck,
  },
  {
    title: 'Emergency Restoration',
    description: '24/7 rapid response for water damage, mold mitigation, and active moisture intrusion in Oregon climate.',
    href: '/services/water-damage',
    icon: Droplets,
  },
  {
    title: 'Roof & Envelope Care',
    description: 'Essential preservation for roofing systems, siding, and building shells to prevent catastrophic rot.',
    href: '/services/roof-maintenance',
    icon: Home,
  },
  {
    title: 'Energy & Weatherization',
    description: 'Specialized air sealing, insulation, and moisture-barrier corrections for high-desert and valley properties.',
    href: '/services/sitework', // Adjusted based on available routes
    icon: Thermometer,
  },
  {
    title: 'Remodeling & Repairs',
    description: 'Lender-required repairs, post-inspection scopes, and high-performance kitchen and bath remodeling.',
    href: '/services/kitchen-remodeling',
    icon: Hammer,
  },
  {
    title: 'Tenant & Property Services',
    description: 'Preservation and maintenance for rental portfolios and property managers in Linn and Harney Counties.',
    href: '/services/tenant-services',
    icon: Construction,
  }
];

export default function ServicesPage() {
  return (
    <>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge variant="secondary" className="mb-6">
            Expert Trade Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-cream leading-tight uppercase tracking-tight mb-6">
            Diagnostic <span className="italic opacity-60">Property Care.</span>
          </h1>
          <p className="text-xl text-cream/80 max-w-2xl mx-auto font-medium">
            We don&apos;t just fix problems; we analyze the root cause of failure to provide permanent solutions for your property.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((service) => (
              <Link key={service.title} href={service.href}>
                <Card className="p-8 group hover:border-oxblood/20 transition-all cursor-pointer h-full flex flex-col">
                  <div className="p-3 bg-oxblood/5 rounded-2xl w-fit mb-6 group-hover:bg-oxblood group-hover:text-cream transition-colors">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-oxblood uppercase tracking-tight mb-4">
                    {service.title}
                  </h2>
                  <p className="text-slate font-medium leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>
                  <div className="flex items-center text-oxblood font-bold uppercase tracking-widest text-sm">
                    View Details <span className="ml-2 group-hover:translate-x-2 transition-transform">&rarr;</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <h2 className="text-3xl font-black text-oxblood uppercase tracking-tight mb-6">Need Emergency Response?</h2>
          <p className="text-lg text-slate mb-8 max-w-xl mx-auto font-medium">
            Active water damage or structural safety issues? Our emergency teams are available 24/7 for urgent diagnostic stabilization.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/emergency">
              <Button size="lg" variant="emergency" className="w-full sm:w-auto font-black uppercase tracking-widest px-10">
                24/7 Emergency Line
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-black uppercase tracking-widest px-10">
                Request Non-Urgent Quote
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
