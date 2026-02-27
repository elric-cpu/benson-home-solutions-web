import Link from 'next/link';
import {
  Button,
  Card,
  CardContent,
  Container,
  Section,
  Badge,
} from '@/components/ui';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';

const services = [
  {
    title: 'Residential Maintenance',
    description:
      'Comprehensive home repair and maintenance for homeowners throughout the Mid-Willamette Valley.',
    href: '/services/residential-maintenance',
    icon: '\u{1F3E0}',
  },
  {
    title: 'Commercial Services',
    description:
      'Reliable facility maintenance and repair for businesses, offices, and commercial properties.',
    href: '/services/commercial',
    icon: '\u{1F3E2}',
  },
  {
    title: 'Church & Non-Profit',
    description:
      'Specialized maintenance programs for houses of worship and community organizations.',
    href: '/services/church-nonprofit',
    icon: '\u{26EA}',
  },
  {
    title: 'Emergency Repairs',
    description:
      'Fast-response emergency repair service when you need it most. Available after hours.',
    href: '/emergency',
    icon: '\u{1F6A8}',
  },
];

const trustSignals = [
  { label: 'Licensed & Bonded', detail: BUSINESS.license },
  { label: 'Fully Insured', detail: 'Liability & Workers\u2019 Comp' },
  { label: 'Locally Owned', detail: BUSINESS.experience + ' Experience' },
  { label: BUSINESS.rating + ' Rating', detail: BUSINESS.projects + ' Projects Completed' },
];

const allAreas = [
  ...SERVICE_AREAS.midWillametteValley,
  ...SERVICE_AREAS.harneyCounty,
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Serving Albany, Lebanon & the Mid-Willamette Valley
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-oxblood leading-tight">
              Professional Handyman &<br className="hidden sm:inline" />
              Home Maintenance Services
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate leading-relaxed max-w-2xl">
              From routine maintenance to emergency repairs, Benson Home
              Solutions keeps your property in peak condition. Licensed, bonded,
              and insured&nbsp;&mdash; serving Oregon with pride.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg">Get a Free Quote</Button>
              </Link>
              <a href={`tel:${BUSINESS.phone}`}>
                <Button variant="outline" size="lg">
                  Call {BUSINESS.phone}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section spacing="lg">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">What We Do</h2>
            <p className="mt-4 text-lg text-slate">
              Comprehensive property maintenance and repair services tailored to
              your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className="group">
                <Card hover className="h-full">
                  <CardContent className="p-6">
                    <span className="text-3xl">{service.icon}</span>
                    <h3 className="mt-3 text-xl font-semibold text-charcoal group-hover:text-oxblood transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-slate leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust Signals */}
      <Section variant="oxblood" spacing="sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustSignals.map((signal) => (
              <div key={signal.label}>
                <div className="text-lg font-semibold text-cream">
                  {signal.label}
                </div>
                <div className="mt-1 text-sm text-cream/70">
                  {signal.detail}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Areas We Serve */}
      <Section variant="cream" spacing="md">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Areas We Serve</h2>
            <p className="mt-4 text-lg text-slate">
              Proudly serving communities throughout the Mid-Willamette Valley
              and Harney County.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {allAreas.map((area) => (
              <Badge
                key={area}
                variant="secondary"
                className="text-sm px-4 py-1.5"
              >
                {area}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      {/* Emergency CTA */}
      <Section variant="default" spacing="md">
        <Container size="narrow">
          <Card
            variant="outlined"
            className="text-center p-8 md:p-12 border-red-200 bg-red-50/50"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              \u{1F6A8} Need Emergency Repairs?
            </h2>
            <p className="mt-4 text-lg text-slate">
              We offer after-hours emergency repair service for urgent
              situations. Don&apos;t wait&nbsp;&mdash; call our emergency line
              now.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <a href={`tel:${BUSINESS.afterhoursPhone}`}>
                <Button variant="emergency" size="lg">
                  Emergency: {BUSINESS.afterhoursPhone}
                </Button>
              </a>
              <Link href="/emergency">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section variant="charcoal" spacing="lg">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-cream">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-cream/80">
              Contact us today for a free, no-obligation quote. We&apos;ll
              assess your needs and provide a clear, upfront estimate.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
