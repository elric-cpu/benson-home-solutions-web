import type { Metadata } from 'next'
import Link from 'next/link'
import { Camera, ClipboardCheck, Droplets, Ruler, Thermometer, Zap } from 'lucide-react'
import { Badge, Button, Container, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'How We Work',
  description:
    'See how Benson Home Solutions scopes repair work, documents moisture and damage, and carries projects from diagnosis through correction. CCB #258533.',
  alternates: {
    canonical: '/methodology',
  },
  openGraph: {
    title: 'How Benson Home Solutions Works',
    description:
      'See how Benson Home Solutions scopes repair work, documents moisture and damage, and carries projects from diagnosis through correction.',
    url: 'https://www.bensonhomesolutions.com/methodology',
    images: ['/opengraph-image'],
  },
}

export default function MethodologyPage() {
  const steps = [
    {
      title: '1. Diagnose the Failure',
      desc: 'We start with the actual problem: water, rot, mold, insulation gaps, lender-required corrections, or a repair list from an inspection report.',
      icon: Droplets,
    },
    {
      title: '2. Document What Matters',
      desc: 'Moisture readings, thermal patterns, field photos, and line-item scopes give owners, lenders, and insurers something usable instead of vague guesswork.',
      icon: Ruler,
    },
    {
      title: '3. Build a Clear Scope',
      desc: 'You get a direct plan with priorities, pricing factors, and the order of work so repairs are understandable before anyone swings a hammer.',
      icon: ClipboardCheck,
    },
    {
      title: '4. Precision Repairs',
      desc: 'We fix the cause, not just the stain, crack, or symptom. That is how water, mold, envelope, and compliance issues stay fixed.',
      icon: Zap,
    },
  ]

  return (
    <>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 px-4 py-1.5 font-black uppercase tracking-widest text-cream border-cream/20">
            How We Work
          </Badge>
          <h1 className="mb-8 text-5xl font-black leading-tight tracking-tight text-cream md:text-7xl">
            We Don&apos;t Guess.
            <br />
            <span className="opacity-60 italic">We Measure.</span>
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-xl font-medium leading-relaxed text-cream/80 md:text-2xl">
            We are not selling inspections. We are using real measurements and field
            documentation to scope repairs, protect properties, and keep small failures
            from turning into expensive rebuilds.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.title} className="group flex flex-col items-center text-center">
                <div className="mb-8 rounded-full bg-oxblood/5 p-6 transition-all duration-300 group-hover:bg-oxblood group-hover:text-cream">
                  <step.icon className="h-12 w-12" />
                </div>
                <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-oxblood">
                  {step.title}
                </h3>
                <p className="font-medium leading-relaxed text-slate">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="lg">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black uppercase tracking-tight text-oxblood md:text-5xl">
              The Tools We Use
            </h2>
            <p className="mx-auto max-w-2xl text-xl font-medium text-slate">
              We own and operate specialized equipment so the job can move without waiting
              on someone else&apos;s rental calendar.
            </p>
          </div>
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div className="rounded-2xl border border-oxblood/10 bg-surface p-8 shadow-lg">
              <Thermometer className="mx-auto mb-4 h-10 w-10 text-oxblood" />
              <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-oxblood">
                Thermal Imaging
              </h3>
              <p className="text-sm font-medium text-slate">
                Helps us trace heat loss, missing insulation, and moisture movement before
                we open up more than we need to.
              </p>
            </div>
            <div className="rounded-2xl border border-oxblood/10 bg-surface p-8 shadow-lg">
              <Droplets className="mx-auto mb-4 h-10 w-10 text-oxblood" />
              <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-oxblood">
                Moisture Meters
              </h3>
              <p className="text-sm font-medium text-slate">
                Shows whether framing and finishes are dry enough to save, dry enough to
                close up, or still at risk.
              </p>
            </div>
            <div className="rounded-2xl border border-oxblood/10 bg-surface p-8 shadow-lg">
              <Camera className="mx-auto mb-4 h-10 w-10 text-oxblood" />
              <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-oxblood">
                Borescope Cameras
              </h3>
              <p className="text-sm font-medium text-slate">
                Lets us verify cavity conditions without turning a small repair into
                unnecessary demolition.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container className="max-w-3xl text-center">
          <div className="mb-10 grid gap-4 md:grid-cols-2">
            <Link
              href="/tools/cost-calculator"
              className="rounded-2xl border border-oxblood/10 bg-cream px-5 py-5 text-left transition-colors hover:border-oxblood"
            >
              <div className="text-xs font-black uppercase tracking-widest text-oxblood/60">
                Tool
              </div>
              <div className="mt-2 text-xl font-black tracking-tight text-oxblood">
                Dry rot cost calculator
              </div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate">
                See how climate, siding type, and delayed maintenance increase repair cost.
              </p>
            </Link>
            <Link
              href="/tools/cost-estimator"
              className="rounded-2xl border border-oxblood/10 bg-cream px-5 py-5 text-left transition-colors hover:border-oxblood"
            >
              <div className="text-xs font-black uppercase tracking-widest text-oxblood/60">
                Tool
              </div>
              <div className="mt-2 text-xl font-black tracking-tight text-oxblood">
                Building reserve estimator
              </div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate">
                Model reserve pressure for roofs, siding, HVAC, windows, and plumbing systems.
              </p>
            </Link>
          </div>
          <h2 className="mb-6 text-4xl font-black uppercase tracking-tight text-oxblood">
            Ready to Scope the Repair?
          </h2>
          <p className="mb-12 text-xl font-medium text-slate">
            Send the repair list, the lender notes, or the photos from the damage.
            We&apos;ll turn it into a practical plan and get the work moving.
          </p>
          <Link href="/contact?service=Inspection Repairs">
            <Button
              size="lg"
              className="px-12 py-8 text-lg font-black uppercase tracking-widest shadow-xl shadow-oxblood/20"
            >
              Start Your Repair Scope
            </Button>
          </Link>
        </Container>
      </Section>
    </>
  )
}
