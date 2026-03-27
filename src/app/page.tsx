import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Quote, CheckCircle2 } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Section,
} from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

const StatsSection = dynamic(() =>
  import('@/components/content/StatsSection').then((mod) => mod.StatsSection),
);
const FAQSection = dynamic(() =>
  import('@/components/content/FAQSection').then((mod) => mod.FAQSection),
);

export const metadata = {
  title:
    'Post-Inspection Repairs, Water Damage Restoration, and Property Repairs in Oregon',
  description:
    'Licensed Oregon contractor for post-inspection repairs, FHA and VA repair lists, water damage restoration, property preservation, maintenance, and weatherization.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Oregon Post-Inspection Repairs and Property Repair Contractor',
    description:
      'Licensed Oregon contractor for post-inspection repairs, FHA and VA repair lists, water damage restoration, property preservation, maintenance, and weatherization.',
    url: 'https://www.bensonhomesolutions.com/',
    images: ['/opengraph-image'],
  },
};

export default function HomePage() {
  return (
    <>
      <Section
        variant="cream"
        spacing="lg"
        className="relative overflow-hidden"
      >
        <Container className="relative z-10 text-center">
          <Badge
            variant="secondary"
            className="border-oxblood/30 text-oxblood mb-8 px-4 py-1.5 font-black tracking-widest uppercase"
          >
            Oregon CCB #258533
          </Badge>
          <h1 className="text-oxblood mb-8 text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl md:text-7xl">
            Post-inspection repairs in Oregon.
            <br />
            <span className="text-oxblood/60 italic">
              Water, moisture, and maintenance handled right.
            </span>
          </h1>
          <p className="text-oxblood/80 mx-auto mb-12 max-w-4xl px-4 text-lg leading-relaxed font-medium md:text-2xl">
            We handle FHA and VA repair lists, buyer punch lists, water damage,
            mold mitigation, air sealing, attic insulation, and the maintenance
            work that keeps Oregon properties from sliding into bigger problems.
          </p>
          <div className="mb-8 flex flex-col justify-center gap-4 px-4 sm:flex-row">
            <Link
              href="/contact?service=Inspection Repairs"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="shadow-oxblood/20 w-full px-10 py-7 text-base font-black tracking-widest uppercase shadow-xl transition-transform active:scale-95 md:text-lg"
              >
                Start a Repair Request
              </Button>
            </Link>
            <Link href="/plans" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="border-oxblood text-oxblood hover:bg-oxblood hover:text-cream w-full border-2 px-10 py-7 text-base font-black tracking-widest uppercase transition-transform active:scale-95 md:text-lg"
              >
                See Maintenance Plans
              </Button>
            </Link>
          </div>
          <div className="text-oxblood/60 flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="border-cream bg-oxblood/10 flex h-8 w-8 items-center justify-center rounded-full border-2"
                >
                  <span className="text-oxblood text-xs">★</span>
                </div>
              ))}
            </div>
            <span>Trusted by Oregon property owners and facilities teams</span>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="group">
              <div className="bg-oxblood mb-6 h-2 w-12 transition-all duration-500 group-hover:w-full" />
              <h2 className="mb-4 text-2xl font-black tracking-tight uppercase">
                Inspection Repairs
              </h2>
              <p className="text-slate mb-6 leading-relaxed font-medium">
                We take FHA, VA, appraisal, and buyer-requested repair lists and
                turn them into clear scopes, clean documentation, and completed
                work.
              </p>
              <Link
                href="/contact?service=Inspection Repairs"
                className="border-oxblood text-oxblood border-b-2 pb-1 text-xs font-black tracking-widest uppercase transition-opacity hover:opacity-70"
              >
                Start an Inspection Repair Request &rarr;
              </Link>
            </div>
            <div className="group">
              <div className="bg-oxblood mb-6 h-2 w-12 transition-all duration-500 group-hover:w-full" />
              <h2 className="mb-4 text-2xl font-black tracking-tight uppercase">
                Water, Mold & Moisture
              </h2>
              <p className="text-slate mb-6 leading-relaxed font-medium">
                When water gets in, we handle dry-out, mitigation,
                documentation, and repair with the equipment most contractors
                still have to rent.
              </p>
              <Link
                href="/emergency"
                className="border-oxblood text-oxblood border-b-2 pb-1 text-xs font-black tracking-widest uppercase transition-opacity hover:opacity-70"
              >
                Get Emergency Help &rarr;
              </Link>
            </div>
            <div className="group">
              <div className="bg-oxblood mb-6 h-2 w-12 transition-all duration-500 group-hover:w-full" />
              <h2 className="mb-4 text-2xl font-black tracking-tight uppercase">
                Energy & Maintenance
              </h2>
              <p className="text-slate mb-6 leading-relaxed font-medium">
                Air sealing, attic insulation, weatherization, and recurring
                maintenance are how you avoid surprise failures and expensive
                callback work.
              </p>
              <Link
                href="/methodology"
                className="border-oxblood text-oxblood border-b-2 pb-1 text-xs font-black tracking-widest uppercase transition-opacity hover:opacity-70"
              >
                See How We Work &rarr;
              </Link>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Link
              href="/tools/cost-calculator"
              className="border-oxblood/10 bg-cream hover:border-oxblood rounded-3xl border px-6 py-6 text-left shadow-sm transition-colors"
            >
              <div className="text-oxblood/60 text-xs font-black tracking-widest uppercase">
                Calculator
              </div>
              <h3 className="text-oxblood mt-2 text-2xl font-black tracking-tight">
                Dry rot and deferred maintenance cost calculator
              </h3>
              <p className="text-slate mt-2 leading-relaxed font-medium">
                Estimate how a small moisture issue can turn into a larger
                repair bill in Oregon.
              </p>
            </Link>
            <Link
              href="/tools/cost-estimator"
              className="border-oxblood/10 bg-cream hover:border-oxblood rounded-3xl border px-6 py-6 text-left shadow-sm transition-colors"
            >
              <div className="text-oxblood/60 text-xs font-black tracking-widest uppercase">
                Planning Tool
              </div>
              <h3 className="text-oxblood mt-2 text-2xl font-black tracking-tight">
                10-year building reserve estimator
              </h3>
              <p className="text-slate mt-2 leading-relaxed font-medium">
                Give boards, churches, and facilities teams a starting point for
                capital planning.
              </p>
            </Link>
          </div>
        </Container>
      </Section>

      <Section
        variant="cream"
        spacing="sm"
        className="border-oxblood/5 border-y"
      >
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 py-4 md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="text-oxblood text-xl font-black tracking-tight uppercase">
                Need to clear a repair list fast?
              </h2>
              <p className="text-slate text-sm font-medium">
                Send the report, photos, or lender notes. We&apos;ll tell you
                what needs to happen, what drives price, and how fast we can
                move.
              </p>
            </div>
            <Link href="/contact?service=Inspection Repairs">
              <Button className="px-8 font-black tracking-widest uppercase">
                Send the Repair List
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <StatsSection />

      <Section variant="cream" spacing="lg">
        <Container size="narrow" className="text-center">
          <Quote className="text-oxblood/20 mx-auto mb-8 h-16 w-16" />
          <blockquote className="text-oxblood mb-8 text-3xl leading-tight font-black tracking-tight italic md:text-4xl">
            {`"Send the list, send the photos, text me the address. We’ll figure out what failed, what it takes to fix it right, and what can wait."`}
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="text-oxblood mb-1 text-xl font-black tracking-widest uppercase">
              {BUSINESS.owner}
            </div>
            <div className="text-oxblood/60 text-xs font-bold tracking-widest uppercase">
              Owner
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-oxblood mb-4 text-4xl font-black tracking-tight uppercase md:text-5xl">
              Maintenance Plans That Prevent Bigger Repairs
            </h2>
            <p className="text-slate mx-auto max-w-2xl text-xl font-medium">
              Residential, commercial, and church plans built around the work
              that actually prevents emergencies.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card hover className="bg-cream/30">
              <CardHeader>
                <h3 className="text-oxblood text-2xl font-black tracking-tight uppercase">
                  Residential
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-oxblood mt-1 h-5 w-5 shrink-0" />
                    <span className="text-slate font-medium">
                      Scheduled property checks
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-oxblood mt-1 h-5 w-5 shrink-0" />
                    <span className="text-slate font-medium">
                      Drainage, moisture, and system upkeep
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-oxblood mt-1 h-5 w-5 shrink-0" />
                    <span className="text-slate font-medium">
                      Priority scheduling for repairs
                    </span>
                  </li>
                </ul>
                <Link href="/plans">
                  <Button className="w-full font-black tracking-widest uppercase">
                    View Residential Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card hover className="bg-oxblood text-cream">
              <CardHeader>
                <h3 className="text-2xl font-black tracking-tight uppercase">
                  Commercial
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-cream mt-1 h-5 w-5 shrink-0" />
                    <span className="font-medium">
                      Documentation for ownership and facilities teams
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-cream mt-1 h-5 w-5 shrink-0" />
                    <span className="font-medium">
                      4-hour emergency response SLA
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-cream mt-1 h-5 w-5 shrink-0" />
                    <span className="font-medium">
                      Repair planning and recurring service coordination
                    </span>
                  </li>
                </ul>
                <Link href="/plans">
                  <Button
                    variant="secondary"
                    className="w-full font-black tracking-widest uppercase"
                  >
                    View Commercial Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card hover className="bg-cream/30">
              <CardHeader>
                <h3 className="text-oxblood text-2xl font-black tracking-tight uppercase">
                  Churches & Non-Profits
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-oxblood mt-1 h-5 w-5 shrink-0" />
                    <span className="text-slate font-medium">
                      Historic building stewardship
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-oxblood mt-1 h-5 w-5 shrink-0" />
                    <span className="text-slate font-medium">
                      Facility planning and scope documentation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-oxblood mt-1 h-5 w-5 shrink-0" />
                    <span className="text-slate font-medium">
                      Ongoing correction work and priority response
                    </span>
                  </li>
                </ul>
                <Link href="/plans">
                  <Button className="w-full font-black tracking-widest uppercase">
                    View Facility Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <FAQSection />
    </>
  );
}
