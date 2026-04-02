import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { ShieldAlert, Clock, Droplets, Wind } from 'lucide-react';

export const metadata: Metadata = {
  title: '24/7 Emergency Restoration',
  description:
    'Rapid diagnostic emergency response for water damage, storm damage, and structural failures in the Mid-Willamette Valley and Harney County. Available 24/7 for immediate stabilization and restoration dispatch.',
};

export default function EmergencyPage() {
  return (
    <>
      <Section variant="oxblood" spacing="lg" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/10 skew-x-12 transform origin-top-right" />
        <Container className="text-center relative z-10">
          <Badge className="mb-6 bg-red-600 text-white border-none px-4 py-2 uppercase tracking-widest font-black flex items-center gap-2 mx-auto w-fit animate-pulse">
            <ShieldAlert className="w-4 h-4" /> Critical Response Team
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            24/7 Diagnostic <br />
            <span className="italic opacity-60">Emergency Dispatch.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            When disaster strikes, every minute counts. We provide immediate diagnostic stabilization to stop the damage and protect your property from secondary failure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href={`tel:${BUSINESS.afterhoursPhone}`}>
              <Button size="lg" className="w-full sm:w-auto px-10 py-8 text-xl font-black uppercase tracking-widest bg-red-600 text-white border-none hover:bg-red-700 shadow-2xl shadow-red-900/50">
                Call {BUSINESS.afterhoursPhone}
              </Button>
            </a>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 border-2 border-oxblood/5 rounded-3xl hover:border-red-600/20 transition-all">
              <div className="mb-6 text-red-600"><Clock className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">4hr Response SLA</h3>
              <p className="text-slate font-medium leading-relaxed">
                Guaranteed on-site response within 4 hours for subscription members. We prioritize our partners when the Valley floods.
              </p>
            </div>
            <div className="p-8 border-2 border-oxblood/5 rounded-3xl hover:border-red-600/20 transition-all">
              <div className="mb-6 text-red-600"><Droplets className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Flood & Leak Stop</h3>
              <p className="text-slate font-medium leading-relaxed">
                Emergency extraction and source isolation. We stop the water before it compromises your structural framing.
              </p>
            </div>
            <div className="p-8 border-2 border-oxblood/5 rounded-3xl hover:border-red-600/20 transition-all">
              <div className="mb-6 text-red-600"><Wind className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4">Storm Board-Up</h3>
              <p className="text-slate font-medium leading-relaxed">
                Immediate window, door, and roof stabilization following storm or impact damage to prevent unauthorized entry and moisture intrusion.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="lg">
        <Container size="narrow" className="text-center">
          <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood mb-8">
            Why Wait for Business Hours?
          </h2>
          <p className="text-xl text-slate font-medium leading-relaxed mb-12">
            Secondary damage—like mold growth and structural shifting—begins in as little as 24 hours. A late response can double the cost of your insurance claim.
          </p>
          <div className="bg-oxblood p-10 rounded-3xl text-cream flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <div className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">Direct Emergency Line</div>
              <div className="text-3xl font-black italic">{BUSINESS.afterhoursPhone}</div>
            </div>
            <Link href="/services/maintenance-subscriptions">
              <Button variant="secondary" className="font-black uppercase tracking-widest px-8">View Priority Plans</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
