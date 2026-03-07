import { Metadata } from 'next';
import { BUSINESS, HERO_ASSETS, HERO_VIDEOS } from '@/lib/constants';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import {
  Container,
  Section,
  Button,
  Card,
  RichHero,
  TrustBar,
} from '@/components/ui';
import { EmergencyActionBar } from '@/components/layout';
import { PortableTextRenderer } from '@/components/content/PortableText';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface EmergencyPageData {
  title?: string;
  metaDescription?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  heroImage?: any;
  heroVideo?: string;
  emergencyPhone?: string;
  afterHoursPhone?: string;
  responseTimeSLA?: string;
  emergencyServices?: any;
  content?: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const emergencyQuery = `*[_type == "emergencyPage"][0]{
  title,
  metaDescription,
  heroHeadline,
  heroSubtext,
  heroImage,
  heroVideo,
  emergencyPhone,
  afterHoursPhone,
  responseTimeSLA,
  emergencyServices,
  content
}`;

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<EmergencyPageData | null>(emergencyQuery);

  return {
    title: page?.title || 'Emergency Restoration Services',
    description:
      page?.metaDescription ||
      '24/7 Emergency Water Damage Restoration, Board-Ups, and Storm Mitigation in the Mid-Willamette Valley. On-site within 60 minutes.',
    openGraph: {
      title: page?.title || '24/7 Emergency Restoration',
      description:
        page?.metaDescription ||
        'Rapid emergency response for water damage and property disasters.',
    },
  };
}

export default async function EmergencyPage() {
  const page = await client.fetch<EmergencyPageData | null>(emergencyQuery);

  const heroImage = page?.heroImage
    ? urlForImage(page.heroImage).width(2000).url()
    : HERO_ASSETS.emergency;

  const heroVideo = page?.heroVideo || HERO_VIDEOS.emergency;

  return (
    <main>
      <RichHero
        title={page?.heroHeadline || 'Property Crisis? Call Now.'}
        description={
          page?.heroSubtext ||
          'On-site within 60 minutes. 24/7 emergency water extraction, drying, and storm mitigation to protect your property.'
        }
        backgroundImage={heroImage}
        videoBackground={heroVideo}
        badge="Immediate Dispatch: 24/7"
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <a href={`tel:${page?.emergencyPhone || BUSINESS.afterhoursPhone}`}>
            <Button variant="emergency" size="xl" className="w-full sm:w-auto">
              Call Emergency Line
            </Button>
          </a>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="secondary" size="xl" className="w-full">
              Non-Emergency Request
            </Button>
          </Link>
        </div>
      </RichHero>

      <TrustBar />

      <Section variant="default" spacing="md">
        <Container size="narrow">
          <div className="bg-oxblood rounded-2xl p-8 text-center text-white md:p-12">
            <h2 className="text-3xl font-bold md:text-4xl">Our Commitment</h2>
            <p className="mt-4 text-xl opacity-90">
              {page?.responseTimeSLA ||
                'On-site within 60 minutes in the Mid-Willamette Valley.'}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <div className="mb-2 text-3xl">⏱️</div>
                <h3 className="text-sm font-bold tracking-widest text-white uppercase">
                  Rapid Response
                </h3>
                <p className="mt-2 text-xs opacity-80">
                  Crews mobilized immediately upon dispatch.
                </p>
              </div>
              <div>
                <div className="mb-2 text-3xl">🛡️</div>
                <h3 className="text-sm font-bold tracking-widest text-white uppercase">
                  Expert Mitigation
                </h3>
                <p className="mt-2 text-xs opacity-80">
                  Stopping further damage is our first priority.
                </p>
              </div>
              <div>
                <div className="mb-2 text-3xl">📑</div>
                <h3 className="text-sm font-bold tracking-widest text-white uppercase">
                  Insurance-Ready
                </h3>
                <p className="mt-2 text-xs opacity-80">
                  Full documentation for your adjuster.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-charcoal mb-6 text-3xl font-bold">
                Specialized Emergency Services
              </h2>
              {page?.emergencyServices ? (
                <PortableTextRenderer value={page.emergencyServices} />
              ) : (
                <div className="prose prose-lg text-slate max-w-none">
                  <p className="text-oxblood font-semibold">
                    Benson Home Solutions provides 24/7 mitigation for
                    residential, commercial, and community properties.
                  </p>
                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <strong>Water Damage:</strong> Extraction, drying, and
                      moisture mapping.
                    </li>
                    <li>
                      <strong>Board-Ups:</strong> Securing properties after
                      break-ins or impact.
                    </li>
                    <li>
                      <strong>Roof Tarping:</strong> Stopping water intrusion
                      from storm damage.
                    </li>
                    <li>
                      <strong>Storm Cleanup:</strong> Debris removal and
                      structural security.
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div>
              <Card className="bg-cream/50 p-8 shadow-sm">
                <h3 className="text-charcoal mb-4 text-xl font-bold">
                  What to do while you wait:
                </h3>
                <ul className="text-slate space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="bg-oxblood flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                      1
                    </span>
                    <span>
                      <strong>Safety first:</strong> Evacuate if there are
                      structural or electrical hazards.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-oxblood flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                      2
                    </span>
                    <span>
                      <strong>Stop the source:</strong> If safe, turn off main
                      water supply.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-oxblood flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                      3
                    </span>
                    <span>
                      <strong>Document:</strong> Take photos/video of damage for
                      insurance.
                    </span>
                  </li>
                </ul>
                <div className="border-slate/10 mt-8 border-t pt-8">
                  <a
                    href={`tel:${page?.emergencyPhone || BUSINESS.afterhoursPhone}`}
                  >
                    <Button variant="emergency" className="w-full py-6 text-lg">
                      Call Now:{' '}
                      {page?.emergencyPhone || BUSINESS.afterhoursPhone}
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {page?.content && (
        <Section spacing="lg" className="border-slate/5 border-t bg-white">
          <Container size="narrow">
            <h2 className="text-oxblood mb-8 text-3xl font-bold tracking-tight md:text-4xl">
              While You Wait for Help
            </h2>
            <div className="prose prose-lg max-w-none">
              <PortableTextRenderer value={page.content} />
            </div>
          </Container>
        </Section>
      )}

      <EmergencyActionBar />
    </main>
  );
}
