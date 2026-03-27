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
          <Badge
            variant="secondary"
            className="border-oxblood/30 text-oxblood mb-6 px-4 py-1.5 font-black tracking-widest uppercase"
          >
            A Note from Our Founder
          </Badge>
          <h1 className="text-oxblood mb-8 text-5xl leading-tight font-black tracking-tight md:text-7xl">
            I got tired of seeing <br />
            <span className="text-oxblood/60 italic">
              small problems turn into rebuilds.
            </span>
          </h1>
          <p className="text-oxblood/80 mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-medium md:text-2xl">
            I started Benson Home Solutions to handle the work people actually
            need done: post-inspection repairs, lender-required corrections,
            water and mold problems, lock changes, board-ups, weatherization,
            and the maintenance that keeps properties out of trouble.
          </p>
          <p className="text-slate mx-auto max-w-3xl text-base leading-relaxed font-medium">
            We are not trying to turn every property into a remodel. Most calls
            come in because something needs to be corrected, documented,
            secured, dried out, tightened up, or kept from failing again. That
            is the lane we stay in.
          </p>
        </Container>
      </Section>

      {/* Bio Section */}
      <Section spacing="md">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-3">
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
              <h2 className="text-oxblood mb-6 text-4xl font-black tracking-tight uppercase">
                Elric Benson
              </h2>
              <p className="text-slate mb-6 leading-relaxed font-medium">
                {
                  "I'm a licensed Oregon contractor (CCB #258533). Most of our work starts because something failed, something showed up on a report, or somebody needs the job documented clearly. We show up, figure out what actually needs to happen, and get it done without turning a simple scope into a sales presentation."
                }
              </p>
              <p className="text-slate mb-6 leading-relaxed font-medium">
                We work for homeowners, sellers, buyers, lenders, churches,
                facilities teams, and property managers who need a contractor
                that can actually clear the list. That means practical scopes,
                straight answers, and repair work that respects budgets,
                timelines, and the actual condition of the property.
              </p>
              <div className="bg-oxblood text-cream rounded-2xl p-8">
                <h3 className="mb-6 text-xl font-black tracking-tight uppercase">
                  Our Core Standards
                </h3>
                <ul className="space-y-5">
                  <li className="flex gap-4">
                    <ShieldCheck className="text-cream/60 h-5 w-5 shrink-0" />
                    <div>
                      <div className="mb-1 text-xs font-black tracking-widest uppercase">
                        Fully Licensed & Insured
                      </div>
                      <div className="text-cream/80 text-sm">
                        We are fully licensed (CCB #258533), bonded, and insured
                        for your protection.
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Ruler className="text-cream/60 h-5 w-5 shrink-0" />
                    <div>
                      <div className="mb-1 text-xs font-black tracking-widest uppercase">
                        Specialized Diagnostics
                      </div>
                      <div className="text-cream/80 text-sm">
                        Moisture meters, thermal tools, and jobsite
                        documentation help us scope repairs correctly the first
                        time.
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Scale className="text-cream/60 h-5 w-5 shrink-0" />
                    <div>
                      <div className="mb-1 text-xs font-black tracking-widest uppercase">
                        Total Transparency
                      </div>
                      <div className="text-cream/80 text-sm">
                        You get direct explanations, clear scopes, and
                        documentation that helps owners, lenders, and insurers
                        understand the work.
                      </div>
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
          <div className="mb-16 text-center">
            <h2 className="text-oxblood mb-4 text-4xl font-black tracking-tight uppercase md:text-5xl">
              Proudly Serving Oregon
            </h2>
            <p className="text-slate mx-auto max-w-2xl text-xl font-medium">
              Our methods are tailored to the unique challenges of Oregon&apos;s
              climates.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-surface border-oxblood/5 rounded-2xl border p-10 shadow-xl">
              <h3 className="text-oxblood mb-4 flex items-center gap-3 text-2xl font-black tracking-tight uppercase">
                <Map className="h-6 w-6" /> The Mid-Willamette Valley
              </h3>
              <p className="text-slate mb-6 leading-relaxed font-medium">
                In the Valley, our focus is on managing moisture to prevent rot
                and mold.
              </p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.midWillametteValley.slice(0, 5).map((city) => (
                  <span
                    key={city}
                    className="bg-oxblood/5 text-oxblood rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                  >
                    {city}
                  </span>
                ))}
                <span className="bg-oxblood/5 text-oxblood rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                  + More
                </span>
              </div>
            </div>

            <div className="bg-surface border-oxblood/5 rounded-2xl border p-10 shadow-xl">
              <h3 className="text-oxblood mb-4 flex items-center gap-3 text-2xl font-black tracking-tight uppercase">
                <Map className="h-6 w-6" /> The High Desert
              </h3>
              <p className="text-slate mb-6 leading-relaxed font-medium">
                In Harney County, we focus on winterization and wildfire
                protection.
              </p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.harneyCounty.map((city) => (
                  <span
                    key={city}
                    className="bg-oxblood/5 text-oxblood rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust & Stats */}
      <Section spacing="lg">
        <Container className="text-center">
          <div className="mb-16 grid gap-12 md:grid-cols-3">
            <div>
              <div className="text-oxblood mb-2 text-5xl font-black">15+</div>
              <div className="text-slate text-xs font-bold tracking-widest uppercase opacity-60">
                Years of In-The-Field <br />
                Experience
              </div>
            </div>
            <div>
              <div className="text-oxblood mb-2 text-5xl font-black">200+</div>
              <div className="text-slate text-xs font-bold tracking-widest uppercase opacity-60">
                Properties Protected in <br />
                Oregon
              </div>
            </div>
            <div>
              <div className="text-oxblood mb-2 text-5xl font-black">4.9/5</div>
              <div className="text-slate text-xs font-bold tracking-widest uppercase opacity-60">
                Average Client <br />
                Rating
              </div>
            </div>
          </div>

          <div className="border-oxblood/10 mx-auto max-w-3xl border-t pt-16">
            <h3 className="text-oxblood mb-8 text-2xl font-black tracking-tight uppercase">
              Need a Contractor Who Can Clear the Scope?
            </h3>
            <p className="text-slate mx-auto mb-8 max-w-2xl text-base leading-relaxed font-medium">
              If the issue started with an inspection report, a lender
              condition, active moisture, deferred maintenance, or a vacancy
              problem, we know how to sort the scope, document the work, and
              move it to completion.
            </p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <Link href="/contact?service=Inspection Repairs">
                <Button
                  size="lg"
                  className="shadow-oxblood/20 w-full px-10 py-7 text-base font-black tracking-widest uppercase shadow-xl sm:w-auto md:text-lg"
                >
                  Start a Repair Request
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-oxblood text-oxblood w-full border-2 px-10 py-7 text-base font-black tracking-widest uppercase sm:w-auto md:text-lg"
                >
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
              <h3 className="text-oxblood mb-4 text-2xl font-black tracking-tight uppercase">
                Why People Call Us
              </h3>
              <ul className="text-slate space-y-3 text-sm leading-relaxed font-medium">
                <li>
                  Inspection reports need real corrections, not vague promises.
                </li>
                <li>
                  Water or mold problems need mitigation plus repair
                  follow-through.
                </li>
                <li>
                  Vacant properties need board-ups, lock work, and ongoing
                  preservation.
                </li>
                <li>
                  Older homes need air sealing, insulation, and envelope work
                  that makes sense.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-oxblood mb-4 text-2xl font-black tracking-tight uppercase">
                What We Do Not Do
              </h3>
              <ul className="text-slate space-y-3 text-sm leading-relaxed font-medium">
                <li>We do not market ourselves as home inspectors.</li>
                <li>
                  We do not bury small repair scopes inside oversized remodel
                  pitches.
                </li>
                <li>
                  We do not rely on stock answers when the property needs
                  documentation and a field decision.
                </li>
                <li>
                  We do not leave owners guessing about what actually has to
                  happen next.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
