import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Container,
  Section,
  Button,
  Badge,
  Card,
  CardContent,
} from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { ShieldAlert, Phone, Droplets, Wind, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Emergency Response',
  description:
    'Water damage, storm damage, break-ins, or urgent property failures in the Mid-Willamette Valley or Harney County? Call (541) 413-0480 now.',
  alternates: {
    canonical: '/emergency',
  },
  openGraph: {
    title: '24/7 Emergency Response | Benson Home Solutions',
    description:
      'Water damage, storm damage, break-ins, or urgent property failures in the Mid-Willamette Valley or Harney County? Call now.',
    url: 'https://www.bensonhomesolutions.com/emergency',
    images: ['/opengraph-image'],
  },
};

export default function EmergencyPage() {
  return (
    <>
      <Section
        variant="oxblood"
        spacing="lg"
        className="relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 h-full w-1/3 origin-top-right skew-x-12 transform bg-red-600/10" />
        <Container className="relative z-10 text-center">
          <Badge className="mx-auto mb-6 flex w-fit animate-pulse items-center gap-2 border-none bg-red-600 px-4 py-2 font-black tracking-widest text-white uppercase">
            <ShieldAlert className="h-4 w-4" /> Urgent Response Team
          </Badge>
          <h1 className="text-cream mb-8 text-5xl leading-tight font-black tracking-tight md:text-7xl">
            Stay Calm. <br />
            <span className="italic opacity-60">We&apos;re on the way.</span>
          </h1>
          <p className="text-cream/80 mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-medium md:text-2xl">
            If there is active damage or the property needs to be secured, call
            now. No form wall, no answering service, no waiting around for a
            callback.
          </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <a href={`tel:${BUSINESS.afterhoursPhone}`}>
              <Button
                size="lg"
                className="w-full border-none bg-red-600 px-10 py-8 text-xl font-black tracking-widest text-white uppercase shadow-2xl shadow-red-900/50 hover:bg-red-700 sm:w-auto"
              >
                <Phone className="mr-3 h-6 w-6" /> Call Now:{' '}
                {BUSINESS.afterhoursPhone}
              </Button>
            </a>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-oxblood mb-4 text-4xl font-black tracking-tight uppercase md:text-5xl">
              What to Do Right Now
            </h2>
            <p className="text-slate mx-auto max-w-2xl text-xl font-medium">
              Follow these steps while our team is on the way to minimize
              damage.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-oxblood mb-4 text-2xl font-black tracking-tight uppercase">
                  1. Shut Off the Source
                </h3>
                <p className="text-slate leading-relaxed font-medium">
                  If you have a leak, shut off the main water valve to your
                  property. For storm damage, stay away from broken windows and
                  damaged electrical lines.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-oxblood mb-4 text-2xl font-black tracking-tight uppercase">
                  2. Move Valuables
                </h3>
                <p className="text-slate leading-relaxed font-medium">
                  If it&apos;s safe to do so, move any electronics, furniture,
                  and personal belongings away from the affected area to prevent
                  further damage.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-oxblood mb-4 text-2xl font-black tracking-tight uppercase">
                  3. Call Your Insurance
                </h3>
                <p className="text-slate leading-relaxed font-medium">
                  Once the immediate danger is stabilized, contact your
                  insurance company to inform them of the situation. We can
                  provide them with any documentation they need.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <Section variant="cream" spacing="md">
        <Container>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="p-8">
              <div className="mb-6 text-red-600">
                <Droplets className="h-10 w-10" />
              </div>
              <h3 className="text-oxblood mb-4 text-2xl font-black tracking-tight uppercase">
                Stop the Damage, Fast
              </h3>
              <p className="text-slate leading-relaxed font-medium">
                We use commercial-grade equipment to extract water, dry out
                structures, and prevent the secondary damage that happens within
                the first 24 hours.
              </p>
            </div>
            <div className="p-8">
              <div className="mb-6 text-red-600">
                <Wind className="h-10 w-10" />
              </div>
              <h3 className="text-oxblood mb-4 text-2xl font-black tracking-tight uppercase">
                Secure Your Property
              </h3>
              <p className="text-slate leading-relaxed font-medium">
                Our team provides immediate board-up services for windows,
                doors, and roofs to protect your property from the elements and
                prevent unauthorized access.
              </p>
            </div>
            <div className="p-8">
              <div className="mb-6 text-red-600">
                <Zap className="h-10 w-10" />
              </div>
              <h3 className="text-oxblood mb-4 text-2xl font-black tracking-tight uppercase">
                A Clear Path to Recovery
              </h3>
              <p className="text-slate leading-relaxed font-medium">
                Once the site is stable, we document the issue, build the scope,
                and move the job from emergency response into repair and
                rebuild.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container size="narrow" className="text-center">
          <h2 className="text-oxblood mb-8 text-4xl font-black tracking-tight uppercase">
            Don&apos;t Have an Emergency? Let&apos;s Keep It That Way.
          </h2>
          <p className="text-slate mb-12 text-xl leading-relaxed font-medium">
            Maintenance is still cheaper than surprise damage. If the property
            is stable today, that is the right time to set up recurring upkeep.
          </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link href="/plans">
              <Button
                size="lg"
                className="w-full px-10 py-7 text-lg font-black tracking-widest uppercase sm:w-auto"
              >
                Explore Our Plans
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-oxblood text-oxblood w-full border-2 px-10 py-7 text-lg font-black tracking-widest uppercase sm:w-auto"
              >
                Request a Consultation
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
