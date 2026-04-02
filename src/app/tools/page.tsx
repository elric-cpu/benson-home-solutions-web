import type { Metadata } from 'next';
import { Container, Section, Badge, Card, Button } from '@/components/ui';
import Link from 'next/link';
import { Calculator, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Diagnostic Property Tools | Benson Home Solutions',
  description:
    'Interactive tools and calculators for assessing your property\'s rot risk and long-term maintenance liability in Oregon.',
};

const TOOLS = [
  {
    title: 'Rot Risk Simulator',
    slug: 'cost-calculator',
    description: 'Calculate how quickly a deferred maintenance issue will turn into a major structural failure in your specific Oregon region.',
    icon: <Calculator className="w-8 h-8 text-maroon" />
  },
  {
    title: 'Asset Lifecycle Forecaster',
    slug: 'cost-estimator',
    description: 'A board-level strategic tool for commercial and ecclesiastical properties to forecast 10-year capital expenditure and maintenance liabilities.',
    icon: <Building2 className="w-8 h-8 text-maroon" />
  }
];

export default function ToolsIndexPage() {
  return (
    <>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Interactive Diagnostics
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-cream leading-tight uppercase tracking-tight mb-6">
            Property <span className="italic opacity-60">Intelligence.</span>
          </h1>
          <p className="text-xl text-cream/80 max-w-2xl mx-auto font-medium">
            Stop guessing about your building&apos;s health. Use our data-driven tools to calculate your true maintenance liability.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TOOLS.map((tool) => (
              <Card key={tool.slug} className="p-8 hover:border-maroon/40 transition-colors bg-white shadow-lg border-maroon/10 flex flex-col items-start">
                <div className="p-4 bg-maroon/5 rounded-2xl mb-6">
                  {tool.icon}
                </div>
                <h2 className="text-2xl font-black text-charcoal leading-tight mb-4">
                  {tool.title}
                </h2>
                <p className="text-slate font-medium mb-8 leading-relaxed flex-1">
                  {tool.description}
                </p>
                <Link href={`/tools/${tool.slug}`} className="w-full">
                  <Button className="w-full font-black uppercase tracking-widest">
                    Launch Tool
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
