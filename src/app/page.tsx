import Link from 'next/link'
import { Quote, CheckCircle2 } from 'lucide-react'
import { FAQSection } from '@/components/content/FAQSection'
import { StatsSection } from '@/components/content/StatsSection'
import { Badge, Button, Card, CardContent, CardHeader, Container, Section } from '@/components/ui'
import { BUSINESS } from '@/lib/constants'

export const metadata = {
  title: 'Post-Inspection Repairs, Water Damage Restoration, and Property Repairs in Oregon',
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
}

export default function HomePage() {
  return (
    <>
      <Section variant="cream" spacing="lg" className="relative overflow-hidden">
        <Container className="relative z-10 text-center">
          <Badge
            variant="secondary"
            className="mb-8 px-4 py-1.5 font-black uppercase tracking-widest border-oxblood/30 text-oxblood"
          >
            Oregon CCB #258533
          </Badge>
          <h1 className="mb-8 text-4xl font-black leading-[1.05] tracking-tight text-oxblood sm:text-5xl md:text-7xl">
            Post-inspection repairs in Oregon.
            <br />
            <span className="italic text-oxblood/60">Water, moisture, and maintenance handled right.</span>
          </h1>
          <p className="mx-auto mb-12 max-w-4xl px-4 text-lg font-medium leading-relaxed text-oxblood/80 md:text-2xl">
            We handle FHA and VA repair lists, buyer punch lists, water damage, mold
            mitigation, air sealing, attic insulation, and the maintenance work that
            keeps Oregon properties from sliding into bigger problems.
          </p>
          <div className="mb-8 flex flex-col justify-center gap-4 px-4 sm:flex-row">
            <Link href="/contact?service=Inspection Repairs" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full px-10 py-7 text-base font-black uppercase tracking-widest shadow-xl shadow-oxblood/20 transition-transform active:scale-95 md:text-lg"
              >
                Start a Repair Request
              </Button>
            </Link>
            <Link href="/plans" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-oxblood px-10 py-7 text-base font-black uppercase tracking-widest text-oxblood transition-transform hover:bg-oxblood hover:text-cream active:scale-95 md:text-lg"
              >
                See Maintenance Plans
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest text-oxblood/60">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-cream bg-oxblood/10"
                >
                  <span className="text-xs text-oxblood">★</span>
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
              <div className="mb-6 h-2 w-12 bg-oxblood transition-all duration-500 group-hover:w-full" />
              <h2 className="mb-4 text-2xl font-black uppercase tracking-tight">
                Inspection Repairs
              </h2>
              <p className="mb-6 font-medium leading-relaxed text-slate">
                We take FHA, VA, appraisal, and buyer-requested repair lists and turn
                them into clear scopes, clean documentation, and completed work.
              </p>
              <Link
                href="/contact?service=Inspection Repairs"
                className="border-b-2 border-oxblood pb-1 text-xs font-black uppercase tracking-widest text-oxblood transition-opacity hover:opacity-70"
              >
                Start an Inspection Repair Request &rarr;
              </Link>
            </div>
            <div className="group">
              <div className="mb-6 h-2 w-12 bg-oxblood transition-all duration-500 group-hover:w-full" />
              <h2 className="mb-4 text-2xl font-black uppercase tracking-tight">
                Water, Mold & Moisture
              </h2>
              <p className="mb-6 font-medium leading-relaxed text-slate">
                When water gets in, we handle dry-out, mitigation, documentation, and
                repair with the equipment most contractors still have to rent.
              </p>
              <Link
                href="/emergency"
                className="border-b-2 border-oxblood pb-1 text-xs font-black uppercase tracking-widest text-oxblood transition-opacity hover:opacity-70"
              >
                Get Emergency Help &rarr;
              </Link>
            </div>
            <div className="group">
              <div className="mb-6 h-2 w-12 bg-oxblood transition-all duration-500 group-hover:w-full" />
              <h2 className="mb-4 text-2xl font-black uppercase tracking-tight">
                Energy & Maintenance
              </h2>
              <p className="mb-6 font-medium leading-relaxed text-slate">
                Air sealing, attic insulation, weatherization, and recurring maintenance
                are how you avoid surprise failures and expensive callback work.
              </p>
              <Link
                href="/methodology"
                className="border-b-2 border-oxblood pb-1 text-xs font-black uppercase tracking-widest text-oxblood transition-opacity hover:opacity-70"
              >
                See How We Work &rarr;
              </Link>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Link
              href="/tools/cost-calculator"
              className="rounded-3xl border border-oxblood/10 bg-cream px-6 py-6 text-left shadow-sm transition-colors hover:border-oxblood"
            >
              <div className="text-xs font-black uppercase tracking-widest text-oxblood/60">
                Calculator
              </div>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-oxblood">
                Dry rot and deferred maintenance cost calculator
              </h3>
              <p className="mt-2 font-medium leading-relaxed text-slate">
                Estimate how a small moisture issue can turn into a larger repair bill in Oregon.
              </p>
            </Link>
            <Link
              href="/tools/cost-estimator"
              className="rounded-3xl border border-oxblood/10 bg-cream px-6 py-6 text-left shadow-sm transition-colors hover:border-oxblood"
            >
              <div className="text-xs font-black uppercase tracking-widest text-oxblood/60">
                Planning Tool
              </div>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-oxblood">
                10-year building reserve estimator
              </h3>
              <p className="mt-2 font-medium leading-relaxed text-slate">
                Give boards, churches, and facilities teams a starting point for capital planning.
              </p>
            </Link>
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="sm" className="border-y border-oxblood/5">
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 py-4 md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-black uppercase tracking-tight text-oxblood">
                Need to clear a repair list fast?
              </h2>
              <p className="text-sm font-medium text-slate">
                Send the report, photos, or lender notes. We&apos;ll tell you what needs
                to happen, what drives price, and how fast we can move.
              </p>
            </div>
            <Link href="/contact?service=Inspection Repairs">
              <Button className="px-8 font-black uppercase tracking-widest">
                Send the Repair List
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <StatsSection />

      <Section variant="cream" spacing="lg">
        <Container size="narrow" className="text-center">
          <Quote className="mx-auto mb-8 h-16 w-16 text-oxblood/20" />
          <blockquote className="mb-8 text-3xl font-black italic leading-tight tracking-tight text-oxblood md:text-4xl">
            {`"Send the list, send the photos, text me the address. We’ll figure out what failed, what it takes to fix it right, and what can wait."`}
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="mb-1 text-xl font-black uppercase tracking-widest text-oxblood">
              {BUSINESS.owner}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-oxblood/60">
              Owner
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black uppercase tracking-tight text-oxblood md:text-5xl">
              Maintenance Plans That Prevent Bigger Repairs
            </h2>
            <p className="mx-auto max-w-2xl text-xl font-medium text-slate">
              Residential, commercial, and church plans built around the work that
              actually prevents emergencies.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card hover className="bg-cream/30">
              <CardHeader>
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood">
                  Residential
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-oxblood" />
                    <span className="font-medium text-slate">Scheduled property checks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-oxblood" />
                    <span className="font-medium text-slate">
                      Drainage, moisture, and system upkeep
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-oxblood" />
                    <span className="font-medium text-slate">
                      Priority scheduling for repairs
                    </span>
                  </li>
                </ul>
                <Link href="/plans">
                  <Button className="w-full font-black uppercase tracking-widest">
                    View Residential Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card hover className="bg-oxblood text-cream">
              <CardHeader>
                <h3 className="text-2xl font-black uppercase tracking-tight">Commercial</h3>
              </CardHeader>
              <CardContent>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cream" />
                    <span className="font-medium">
                      Documentation for ownership and facilities teams
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cream" />
                    <span className="font-medium">4-hour emergency response SLA</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cream" />
                    <span className="font-medium">
                      Repair planning and recurring service coordination
                    </span>
                  </li>
                </ul>
                <Link href="/plans">
                  <Button variant="secondary" className="w-full font-black uppercase tracking-widest">
                    View Commercial Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card hover className="bg-cream/30">
              <CardHeader>
                <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood">
                  Churches & Non-Profits
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-oxblood" />
                    <span className="font-medium text-slate">
                      Historic building stewardship
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-oxblood" />
                    <span className="font-medium text-slate">
                      Facility planning and scope documentation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-oxblood" />
                    <span className="font-medium text-slate">
                      Ongoing correction work and priority response
                    </span>
                  </li>
                </ul>
                <Link href="/plans">
                  <Button className="w-full font-black uppercase tracking-widest">
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
  )
}
