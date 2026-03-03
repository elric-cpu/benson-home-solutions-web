import { Metadata } from 'next';
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
  title: 'Property Intelligence Tools | Benson Home Solutions',
  description:
    'Free tools for homeowners, property managers, and facility boards to analyze ownership costs and maintenance requirements.',
};

const tools = [
  {
    title: 'True Cost of Homeownership',
    href: '/tools/cost-calculator',
    desc: 'Calculate the true annual cost of owning your property beyond the mortgage—including taxes, insurance, and deferred maintenance risks.',
    badge: 'Lead Generator',
    icon: '📊',
  },
  {
    title: 'Cost Estimator',
    href: '/tools/cost-estimator',
    desc: 'Get a quick estimate for specific restoration or maintenance projects based on Mid-Willamette Valley labor and material rates.',
    badge: 'Project Planning',
    icon: '🧮',
  },
  {
    title: 'Maintenance Configurator',
    href: '/tools/maintenance-configurator',
    desc: 'Our AI-powered engine analyzes your property data to recommend a systematic maintenance plan tailored to your building age and zone.',
    badge: 'AI Recommendations',
    icon: '⚙️',
  },
];

export default function ToolsPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Tools', url: `${BUSINESS.url}/tools` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Hero */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Property Intelligence
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl">
              Data-Driven Property Oversight
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              We provide the tools required to identify risks, forecast budgets,
              and protect the building envelope from predictable failures.
            </p>
          </div>
        </Container>
      </Section>

      {/* Tools Grid */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link key={tool.title} href={tool.href} className="group">
                <Card hover className="border-slate/10 h-full">
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-start justify-between">
                      <span className="text-4xl">{tool.icon}</span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] tracking-tighter uppercase opacity-50"
                      >
                        {tool.badge}
                      </Badge>
                    </div>
                    <h2 className="text-charcoal group-hover:text-oxblood mb-4 text-2xl font-bold transition-colors">
                      {tool.title}
                    </h2>
                    <p className="text-slate mb-8 leading-relaxed">
                      {tool.desc}
                    </p>
                    <div className="text-oxblood flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                      Launch Tool
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
      <Section variant="oxblood" spacing="md">
        <Container size="narrow" className="text-center">
          <h2 className="text-cream mb-6 text-2xl font-bold md:text-3xl">
            Need Professional Oversight?
          </h2>
          <p className="text-cream/70 mb-8 text-lg">
            Our tools provide high-fidelity estimates, but nothing replaces a
            physical site assessment by a licensed trade professional.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Schedule Site Walkthrough
            </Button>
          </Link>
        </Container>
      </Section>
    </>
  );
}
