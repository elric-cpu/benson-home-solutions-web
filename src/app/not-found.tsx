import Link from 'next/link';
import { Section, Container, Button, Card } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream">
      <Section className="py-20 md:py-32">
        <Container size="narrow" className="text-center">
          <div className="mb-8 text-oxblood text-6xl md:text-8xl font-black">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
            Page Not Found
          </h1>
          <p className="text-lg text-slate mb-10 leading-relaxed">
            The page you are looking for might have been moved during our website
            upgrade or no longer exists.
          </p>

          <div className="grid gap-6 max-w-lg mx-auto mb-12">
            <Card hover>
              <Link href="/" className="block p-6">
                <h3 className="font-bold text-charcoal mb-1">Return Home</h3>
                <p className="text-sm text-slate">
                  Go back to the main overview.
                </p>
              </Link>
            </Card>
            <Card hover>
              <Link href="/services" className="block p-6">
                <h3 className="font-bold text-charcoal mb-1">View Services</h3>
                <p className="text-sm text-slate">
                  Browse our maintenance and restoration solutions.
                </p>
              </Link>
            </Card>
            <Card hover>
              <Link href="/contact" className="block p-6">
                <h3 className="font-bold text-charcoal mb-1">Contact Support</h3>
                <p className="text-sm text-slate">
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
