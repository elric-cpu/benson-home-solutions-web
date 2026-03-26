import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Section, Badge, Button } from '@/components/ui';
import { SERVICE_AREAS } from '@/lib/constants';
import { ShieldCheck, Ruler, Map, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Benson Home Solutions',
  description:
    'Meet Elric Benson and learn why Benson Home Solutions focuses on repairs, restoration, maintenance, and practical property protection across Oregon.',
  keywords: [
    'Benson Home Solutions about',
    'Elric Benson Oregon contractor',
    'post inspection repair contractor',
    'licensed Oregon contractor CCB 258533',
    'property preservation Oregon',
    'water damage restoration Oregon',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Benson Home Solutions',
    description:
      'Meet Elric Benson and learn why Benson Home Solutions focuses on repairs, restoration, maintenance, and practical property protection across Oregon.',
    url: 'https://www.bensonhomesolutions.com/about',
    images: ['/opengraph-image'],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <Badge variant="secondary" className="mb-6 uppercase tracking-widest font-black border-oxblood/30 text-oxblood px-4 py-1.5">
            A Note from Our Founder
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-oxblood">
            I got tired of seeing <br />
            <span className="italic text-oxblood/60">small problems turn into rebuilds.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-oxblood/80 max-w-3xl mx-auto">
            I started Benson Home Solutions to handle the work people actually need done:
            post-inspection repairs, lender-required corrections, water and mold problems,
            lock changes, board-ups, weatherization, and the maintenance that keeps
            properties out of trouble.
          </p>
          <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-slate">
            We are not trying to turn every property into a remodel. Most calls come in
            because something needs to be corrected, documented, secured, dried out,
            tightened up, or kept from failing again. That is the lane we stay in.
          </p>
        </Container>
      </Section>

      {/* Bio Section */}
      <Section spacing="md">
        <Container>
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1">
              <Image
                src="/images/elric-benson.jpg"
                alt="Elric Benson, Founder of Benson Home Solutions"
                width={400}
                height={500}
                priority
                className="rounded-3xl object-cover shadow-2xl"
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-4xl font-black uppercase tracking-tight text-oxblood mb-6">
                Elric Benson
              </h2>
              <p className="text-slate font-medium leading-relaxed mb-6">
                {"I'm a licensed Oregon contractor (CCB #258533). Most of our work starts because something failed, something showed up on a report, or somebody needs the job documented clearly. We show up, figure out what actually needs to happen, and get it done without turning a simple scope into a sales presentation."}
              </p>
              <p className="text-slate font-medium leading-relaxed mb-6">
                We work for homeowners, sellers, buyers, lenders, churches, facilities teams,
                and property managers who need a contractor that can actually clear the list.
                That means practical scopes, straight answers, and repair work that respects
                budgets, timelines, and the actual condition of the property.
              </p>
              <div className="bg-oxblood p-8 rounded-2xl text-cream">
                <h3 className="text-xl font-black uppercase tracking-tight mb-6">Our Core Standards</h3>
                <ul className="space-y-5">
                  <li className="flex gap-4">
                    <ShieldCheck className="w-5 h-5 shrink-0 text-cream/60" />
                    <div>
                      <div className="font-black uppercase tracking-widest text-xs mb-1">Fully Licensed & Insured</div>
                      <div className="text-cream/80 text-sm">We are fully licensed (CCB #258533), bonded, and insured for your protection.</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Ruler className="w-5 h-5 shrink-0 text-cream/60" />
                    <div>
                      <div className="font-black uppercase tracking-widest text-xs mb-1">Specialized Diagnostics</div>
                      <div className="text-cream/80 text-sm">Moisture meters, thermal tools, and jobsite documentation help us scope repairs correctly the first time.</div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Scale className="w-5 h-5 shrink-0 text-cream/60" />
                    <div>
                      <div className="font-black uppercase tracking-widest text-xs mb-1">Total Transparency</div>
                      <div className="text-cream/80 text-sm">You get direct explanations, clear scopes, and documentation that helps owners, lenders, and insurers understand the work.</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Dual Region Section */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-oxblood mb-4">
              Proudly Serving Oregon
            </h2>
            <p className="text-xl text-slate font-medium max-w-2xl mx-auto">
              Our methods are tailored to the unique challenges of Oregon&apos;s climates.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface p-10 rounded-2xl border border-oxblood/5 shadow-xl">
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4 flex items-center gap-3">
                <Map className="w-6 h-6" /> The Mid-Willamette Valley
              </h3>
              <p className="text-slate font-medium mb-6 leading-relaxed">
                In the Valley, our focus is on managing moisture to prevent rot and mold.
              </p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.midWillametteValley.slice(0, 5).map(city => (
                  <span key={city} className="px-3 py-1 bg-oxblood/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-oxblood">{city}</span>
                ))}
                <span className="px-3 py-1 bg-oxblood/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-oxblood">+ More</span>
              </div>
            </div>

            <div className="bg-surface p-10 rounded-2xl border border-oxblood/5 shadow-xl">
              <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-4 flex items-center gap-3">
                <Map className="w-6 h-6" /> The High Desert
              </h3>
              <p className="text-slate font-medium mb-6 leading-relaxed">
                In Harney County, we focus on winterization and wildfire protection.
              </p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.harneyCounty.map(city => (
                  <span key={city} className="px-3 py-1 bg-oxblood/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-oxblood">{city}</span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust & Stats */}
      <Section spacing="lg">
        <Container className="text-center">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="text-5xl font-black text-oxblood mb-2">15+</div>
              <div className="text-xs uppercase font-bold tracking-widest text-slate opacity-60">Years of In-The-Field <br />Experience</div>
            </div>
            <div>
              <div className="text-5xl font-black text-oxblood mb-2">200+</div>
              <div className="text-xs uppercase font-bold tracking-widest text-slate opacity-60">Properties Protected in <br />Oregon</div>
            </div>
            <div>
              <div className="text-5xl font-black text-oxblood mb-2">4.9/5</div>
              <div className="text-xs uppercase font-bold tracking-widest text-slate opacity-60">Average Client <br />Rating</div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto border-t border-oxblood/10 pt-16">
            <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-8">Need a Contractor Who Can Clear the Scope?</h3>
            <p className="mx-auto mb-8 max-w-2xl text-base font-medium leading-relaxed text-slate">
              If the issue started with an inspection report, a lender condition, active moisture,
              deferred maintenance, or a vacancy problem, we know how to sort the scope, document
              the work, and move it to completion.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact?service=Inspection Repairs">
                <Button size="lg" className="w-full sm:w-auto px-10 py-7 text-base md:text-lg font-black uppercase tracking-widest shadow-xl shadow-oxblood/20">
                  Start a Repair Request
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 py-7 text-base md:text-lg font-black uppercase tracking-widest border-2 border-oxblood text-oxblood">
                  Call or Text the Office
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="md">
        <Container className="max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-oxblood">
                Why People Call Us
              </h3>
              <ul className="space-y-3 text-sm font-medium leading-relaxed text-slate">
                <li>Inspection reports need real corrections, not vague promises.</li>
                <li>Water or mold problems need mitigation plus repair follow-through.</li>
                <li>Vacant properties need board-ups, lock work, and ongoing preservation.</li>
                <li>Older homes need air sealing, insulation, and envelope work that makes sense.</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-oxblood">
                What We Do Not Do
              </h3>
              <ul className="space-y-3 text-sm font-medium leading-relaxed text-slate">
                <li>We do not market ourselves as home inspectors.</li>
                <li>We do not bury small repair scopes inside oversized remodel pitches.</li>
                <li>We do not rely on stock answers when the property needs documentation and a field decision.</li>
                <li>We do not leave owners guessing about what actually has to happen next.</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
