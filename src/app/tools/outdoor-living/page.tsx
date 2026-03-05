import type { Metadata } from 'next';
import { Section, Container, Badge, Button } from '@/components/ui';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Outdoor Living Visualizer | Benson Home Solutions',
  description:
    'Design and estimate your custom outdoor living space, from decks to exterior kitchens.',
};

export default function OutdoorLivingPage() {
  return (
    <main>
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/tools"
              className="text-oxblood hover:text-oxblood/80 mb-4 inline-block text-sm font-medium transition-colors"
            >
              &larr; All Tools
            </Link>
            <Badge variant="secondary" className="mb-4 block w-fit">
              Coming Sprint 3
            </Badge>
            <h1 className="text-oxblood text-4xl leading-tight font-bold md:text-5xl">
              Outdoor Living Visualizer
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Design your dream outdoor oasis. Our upcoming visualizer will help
              you layout decks, patios, and outdoor kitchens while providing
              real-time cost estimates based on material selections.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">Get a Manual Estimate Now</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container size="narrow">
          <div className="prose prose-lg text-slate max-w-none text-center">
            <div className="mb-8 text-6xl">🏗️</div>
            <h2 className="text-charcoal mb-4 text-3xl font-bold">
              Visualizer Under Construction
            </h2>
            <p>
              We are currently training our AI engine on Oregon-specific
              material costs and building codes to ensure your estimates are
              100% accurate. Check back in April 2026.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
