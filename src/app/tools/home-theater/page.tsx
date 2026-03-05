import type { Metadata } from 'next';
import { Section, Container, Badge, Button } from '@/components/ui';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home Theater Layout 3D | Benson Home Solutions',
  description:
    'Visualize your custom home theater or media room in 3D. Get equipment recommendations and buildout costs.',
};

export default function HomeTheaterPage() {
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
              3D Home Theater Designer
            </h1>
            <p className="text-slate mt-6 text-xl leading-relaxed">
              Visualize the ultimate cinematic experience in your own home. Our
              upcoming 3D tool will help you optimize seating, screen size, and
              acoustics while providing a complete buildout estimate.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">Talk to a Media Specialist</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container size="narrow">
          <div className="prose prose-lg text-slate max-w-none text-center">
            <div className="mb-8 text-6xl">🎬</div>
            <h2 className="text-charcoal mb-4 text-3xl font-bold">
              Rendering the Future
            </h2>
            <p>
              Our 3D modeling engine is being calibrated for the latest 2026
              audio-visual standards and acoustic material data. This tool
              will be live in April 2026.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
