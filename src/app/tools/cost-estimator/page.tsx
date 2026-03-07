import type { Metadata } from 'next';
import { Section, Container, Badge } from '@/components/ui';
import Link from 'next/link';
import { EstimatorTool } from './EstimatorTool';

export const metadata: Metadata = {
  title: 'AI Remodel Cost Estimator | Benson Home Solutions',
  description:
    'Get an instant AI-powered ballpark estimate for your kitchen or bathroom remodeling project using March 2026 market data.',
};

export default function CostEstimatorPage() {
  return (
    <main>
      <Section variant="cream" spacing="lg" className="pb-32">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/tools"
              className="text-oxblood hover:text-oxblood/80 mb-4 inline-block text-sm font-medium transition-colors"
            >
              &larr; All Tools
            </Link>
            <Badge variant="secondary" className="mb-4 block w-fit">
              2026 Senior Principal Engine
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl">
              AI Project Cost Estimator
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Generate a high-fidelity ballpark estimate for your construction
              or remodeling project. Our engine uses March 2026 market data,
              including the 3.4% labor compensation adjustment.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="-mt-32">
        <Container size="narrow">
          <EstimatorTool />
        </Container>
      </Section>

      <Section variant="default" spacing="lg">
        <Container size="narrow">
          <div className="prose prose-lg text-slate max-w-none">
            <h2 className="text-charcoal text-2xl font-bold">How We Calculate Your Estimate</h2>
            <p>
              Unlike generic &quot;ballpark&quot; calculators, our engine is anchored to the March 2026 Producer Price Index (PPI) 
              and National Association of Home Builders (NAHB) regional modifier tables.
            </p>
            <div className="bg-cream/50 rounded-xl p-6 border border-oxblood/5">
              <h3 className="text-oxblood mt-0 font-bold">2026 Market Variables:</h3>
              <ul className="grid md:grid-cols-2 gap-4 list-none pl-0">
                <li className="flex items-center gap-2">
                  <span className="text-oxblood font-bold">Lumber:</span> 142.3 PPI (Stable)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-oxblood font-bold">Labor:</span> +3.4% Annual Index
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-oxblood font-bold">Code:</span> 2026 IRC Updates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-oxblood font-bold">Region:</span> NW Regional Modifiers
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
