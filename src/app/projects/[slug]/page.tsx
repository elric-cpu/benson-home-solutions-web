import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section, Container } from '@/components/ui';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Project Not Found' };
}

export default function ProjectPage() {
  notFound();

  return (
    <main className="min-h-screen">
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-4xl">
            <h1 className="text-charcoal text-4xl leading-tight font-bold md:text-6xl">
              Project Not Found
            </h1>
          </div>
        </Container>
      </Section>
    </main>
  );
}
