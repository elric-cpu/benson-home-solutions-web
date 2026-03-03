import Link from 'next/link';
import { Section, Container, Button, Card } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

export default function NotFound() {
  return (
    <main className="bg-cream min-h-screen">
      <Section className="py-20 md:py-32">
        <Container size="narrow" className="text-center">
          <div className="text-oxblood mb-8 text-6xl font-black md:text-8xl">
            404
          </div>
          <h1 className="text-charcoal mb-6 text-3xl font-bold md:text-4xl">
            Page Not Found
          </h1>
          <p className="text-slate mb-10 text-lg leading-relaxed">
            The page you are looking for might have been moved during our
            website upgrade or no longer exists.
          </p>

          <div className="mx-auto mb-12 grid max-w-lg gap-6">
            <Card hover>
              <Link href="/" className="block p-6">
                <h3 className="text-charcoal mb-1 font-bold">Return Home</h3>
                <p className="text-slate text-sm">
                  Go back to the main overview.
                </p>
              </Link>
            </Card>
            <Card hover>
              <Link href="/services" className="block p-6">
                <h3 className="text-charcoal mb-1 font-bold">View Services</h3>
                <p className="text-slate text-sm">
                  Browse our maintenance and restoration solutions.
                </p>
              </Link>
            </Card>
            <Card hover>
              <Link href="/contact" className="block p-6">
                <h3 className="text-charcoal mb-1 font-bold">
                  Contact Support
                </h3>
                <p className="text-slate text-sm">
                  Need immediate assistance? Call us at {BUSINESS.phone}.
                </p>
              </Link>
            </Card>
          </div>

          <Link href="/">
            <Button variant="secondary" size="lg">
              Go to Homepage
            </Button>
          </Link>
        </Container>
      </Section>
    </main>
  );
}
