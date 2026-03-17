import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section, Container } from '@/components/ui';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Article Not Found' };
}

export default function BlogPostPage() {
  notFound();

  return (
    <main className="min-h-screen bg-white">
      <Section variant="cream" spacing="lg" className="border-b">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-charcoal mb-8 text-4xl leading-tight font-black md:text-6xl">
              Article Not Found
            </h1>
          </div>
        </Container>
      </Section>
    </main>
  );
}
