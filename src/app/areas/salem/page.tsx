import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Card, CardContent, CardHeader } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'General Contractor Salem Oregon | Benson Home Solutions',
  description: 'Benson Home Solutions is a licensed general contractor in Salem, OR (CCB #258533), specializing in maintenance-first property care, remodeling, and 24/7 emergency restoration.',
  keywords: ['general contractor salem oregon', 'home remodeling salem or', 'water damage restoration salem', 'maintenance plans salem'],
};

export default function SalemPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-oxblood">
            Your General Contractor in Salem, Oregon
          </h1>
          <p className="text-lg md:text-xl mb-12 leading-relaxed font-medium text-oxblood/80 max-w-3xl mx-auto">
            {`We're not just builders; we're your partners in protecting and improving your Salem property. From historic homes in the Willamette University area to modern businesses downtown, we provide data-driven construction and maintenance services tailored to the specific challenges of the Salem climate.`}
          </p>
          <Link href="/contact?service=audit">
            <Button size="lg" className="px-10 py-7 text-lg font-black uppercase tracking-widest">
              Get a Project Quote
            </Button>
          </Link>
        </Container>
      </Section>

      {/* Services Section */}
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood mb-4">
              Salem Contracting Services
            </h2>
            <p className="text-xl text-slate font-medium max-w-2xl mx-auto">
              Our licensed team (CCB #258533) is equipped to handle a wide range of projects.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood">Proactive Maintenance</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate font-medium mb-6">Our maintenance plans are designed to address the common issues faced by Salem property owners, like moisture intrusion and dry rot.</p>
                <Link href="/plans" className="text-sm font-bold uppercase tracking-widest text-oxblood border-b-2 border-oxblood pb-1">
                  View Maintenance Plans &rarr;
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood">Remodeling</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate font-medium mb-6">Whether it&apos;s a kitchen, a bathroom, or a full home renovation, we deliver high-quality craftsmanship with transparent pricing and communication.</p>
                <Link href="/contact?service=remodeling" className="text-sm font-bold uppercase tracking-widest text-oxblood border-b-2 border-oxblood pb-1">
                  Start Your Remodel &rarr;
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood">24/7 Emergency Response</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate font-medium mb-6">When disaster strikes, our Salem-based team is ready to respond immediately to mitigate damage and begin the restoration process.</p>
                <Link href="/emergency" className="text-sm font-bold uppercase tracking-widest text-oxblood border-b-2 border-oxblood pb-1">
                  Get Emergency Help &rarr;
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Why Choose Us Section */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood mb-4">
              The Benson Difference in Salem
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="flex items-start gap-6">
              <CheckCircle2 className="w-8 h-8 text-oxblood shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-oxblood mb-2">Local Climate Expertise</h3>
                <p className="text-slate font-medium">We understand the unique challenges of the Willamette Valley climate. Our methods are specifically designed to prevent the moisture-related issues that are common in Salem.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <CheckCircle2 className="w-8 h-8 text-oxblood shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-oxblood mb-2">Data-Driven Approach</h3>
                <p className="text-slate font-medium">We don&apos;t guess. We use forensic tools to diagnose the root cause of problems, ensuring that our repairs are effective and long-lasting.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <CheckCircle2 className="w-8 h-8 text-oxblood shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-oxblood mb-2">Transparent Communication</h3>
                <p className="text-slate font-medium">You&apos;ll receive regular updates and detailed reports throughout your project. We believe in building trust through transparency.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <CheckCircle2 className="w-8 h-8 text-oxblood shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-oxblood mb-2">Licensed & Insured</h3>
                <p className="text-slate font-medium">We are a fully licensed (CCB #258533), bonded, and insured general contractor, so you can have complete peace of mind.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
