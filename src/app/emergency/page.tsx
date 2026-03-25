import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge, Card, CardContent } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { ShieldAlert, Phone, Droplets, Wind, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: '24/7 Emergency Response | Benson Home Solutions',
  description:
    'Water damage, storm damage, or structural failure in the Mid-Willamette Valley? Call (541) 413-0480 for immediate, expert help. We stop the damage and start the recovery.',
};

export default function EmergencyPage() {
  return (
    <main>
      <Section variant="oxblood" spacing="lg" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/10 skew-x-12 transform origin-top-right" />
        <Container className="text-center relative z-10">
          <Badge className="mb-6 bg-red-600 text-white border-none px-4 py-2 uppercase tracking-widest font-black flex items-center gap-2 mx-auto w-fit animate-pulse">
            <ShieldAlert className="w-4 h-4" /> Urgent Response Team
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            Stay Calm. <br />
            <span className="italic opacity-60">We&apos;re on the way.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            If you have an active emergency, call us immediately. We don&apos;t use an answering service. You&apos;ll speak directly to a contractor who can dispatch a team to your property, day or night.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href={`tel:${BUSINESS.afterhoursPhone}`}>
              <Button size="lg" className="w-full sm:w-auto px-10 py-8 text-xl font-black uppercase tracking-widest bg-red-600 text-white border-none hover:bg-red-700 shadow-2xl shadow-red-900/50">
                <Phone className="w-6 h-6 mr-3" /> Call Now: {BUSINESS.afterhoursPhone}
              </Button>
            </a>
          </div>
        </Container>
      </Section>
      
      <Section spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood mb-4">
              What to Do Right Now
            </h2>
            <p className="text-xl text-slate font-medium max-w-2xl mx-auto">
              Follow these steps while our team is on the way to minimize damage.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">1. Shut Off the Source</h3>
                <p className="text-slate font-medium leading-relaxed">If you have a leak, shut off the main water valve to your property. For storm damage, stay away from broken windows and damaged electrical lines.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">2. Move Valuables</h3>
                <p className="text-slate font-medium leading-relaxed">If it&apos;s safe to do so, move any electronics, furniture, and personal belongings away from the affected area to prevent further damage.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">3. Call Your Insurance</h3>
                <p className="text-slate font-medium leading-relaxed">Once the immediate danger is stabilized, contact your insurance company to inform them of the situation. We can provide them with any documentation they need.</p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="md">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8">
              <div className="mb-6 text-red-600"><Droplets className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Stop the Damage, Fast</h3>
              <p className="text-slate font-medium leading-relaxed">
                We use commercial-grade equipment to extract water, dry out structures, and prevent the secondary damage that happens within the first 24 hours.
              </p>
            </div>
            <div className="p-8">
              <div className="mb-6 text-red-600"><Wind className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Secure Your Property</h3>
              <p className="text-slate font-medium leading-relaxed">
                Our team provides immediate board-up services for windows, doors, and roofs to protect your property from the elements and prevent unauthorized access.
              </p>
            </div>
            <div className="p-8">
              <div className="mb-6 text-red-600"><Zap className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">A Clear Path to Recovery</h3>
              <p className="text-slate font-medium leading-relaxed">
                Once the situation is stable, we provide a clear, data-backed plan for restoration. No guesswork, just a straightforward path to getting your property back to normal.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container size="narrow" className="text-center">
          <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood mb-8">
            Don&apos;t Have an Emergency? Let&apos;s Keep It That Way.
          </h2>
          <p className="text-xl text-slate font-medium leading-relaxed mb-12">
            The best way to handle an emergency is to prevent it from ever happening. Our maintenance plans are designed to identify and fix potential disasters before they strike.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/plans">
              <Button size="lg" className="w-full sm:w-auto px-10 py-7 text-lg font-black uppercase tracking-widest">
                Explore Our Plans
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 py-7 text-lg font-black uppercase tracking-widest border-2 border-oxblood text-oxblood">
                Request a Consultation
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
