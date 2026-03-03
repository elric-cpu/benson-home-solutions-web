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
} from '@/components/ui';
import { PortableTextRenderer } from '@/components/content/PortableText';
import Link from 'next/link';

interface EmergencyPageData {
  title?: string;
  metaDescription?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroImage?: any;
  heroVideo?: string;
  emergencyPhone?: string;
  afterHoursPhone?: string;
  responseTimeSLA?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emergencyServices?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
}

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
        title={page?.heroHeadline || '24/7 Emergency Response'}
        description={
          page?.heroSubtext ||
          'Water damage, storm mitigation, and emergency board-ups. We protect your property when disaster strikes.'
        }
        backgroundImage={heroImage}
        videoBackground={heroVideo}
        badge="Immediate Dispatch Available"
      >
        <a href={`tel:${page?.emergencyPhone || BUSINESS.afterhoursPhone}`}>
          <Button variant="emergency" size="xl">
            Call Emergency Line: {page?.emergencyPhone || BUSINESS.afterhoursPhone}
          </Button>
        </a>
        <Link href="/contact">
          <Button variant="secondary" size="xl">
            Request Non-Emergency Help
          </Button>
        </Link>
      </RichHero>

      {/* Response Time SLA Section */}
      <Section variant="default" spacing="md">
        <Container size="narrow">
          <div className="bg-oxblood rounded-2xl p-8 text-center text-white md:p-12">
            <h2 className="text-3xl font-bold md:text-4xl">Our Commitment</h2>
            <p className="mt-4 text-xl opacity-90">
              {page?.responseTimeSLA || 'On-site within 60 minutes in the Mid-Willamette Valley.'}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <div className="mb-2 text-3xl">⏱️</div>
                <h3 className="font-bold">Rapid Response</h3>
                <p className="text-sm opacity-80">
                  Crews mobilized immediately upon dispatch.
                </p>
              </div>
              <div>
                <div className="mb-2 text-3xl">🛡️</div>
                <h3 className="font-bold">Expert Mitigation</h3>
                <p className="text-sm opacity-80">
                  Stopping further damage is our first priority.
                </p>
              </div>
              <div>
                <div className="mb-2 text-3xl">📑</div>
                <h3 className="font-bold">Insurance-Ready</h3>
                <p className="text-sm opacity-80">
                  Full documentation and mapping for your adjuster.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Emergency Services Detail */}
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
                  <p>
                    Benson Home Solutions provides comprehensive emergency
                    restoration and mitigation services for residential,
                    commercial, and community properties.
                  </p>
                  <ul className="space-y-4">
                    <li>
                      <strong>Water Damage Mitigation:</strong> Immediate
                      extraction, structural drying, and moisture mapping to
                      prevent mold growth.
                    </li>
                    <li>
                      <strong>Emergency Board-Ups:</strong> Securing your
                      property after a break-in, storm, or vehicle impact.
                    </li>
                    <li>
                      <strong>Roof Tarping:</strong> Stopping water intrusion
                      from storm damage or structural failure.
                    </li>
                    <li>
                      <strong>Storm Damage Cleanup:</strong> Removing debris and
                      securing structural hazards after severe weather.
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div>
              <Card className="bg-cream/50 p-8">
                <h3 className="text-charcoal mb-4 text-xl font-bold">
                  What to do while you wait:
                </h3>
                <ul className="text-slate space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="bg-oxblood flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                      1
                    </span>
                    <span>
                      <strong>Safety first:</strong> If there is structural
                      danger or active electrical hazards, evacuate immediately.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-oxblood flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                      2
                    </span>
                    <span>
                      <strong>Stop the source:</strong> If safe to do so, turn
                      off the main water supply to prevent further flooding.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-oxblood flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                      3
                    </span>
                    <span>
                      <strong>Document everything:</strong> Take photos and video
                      of the damage before mitigation begins. This is critical
                      for insurance.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-oxblood flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                      4
                    </span>
                    <span>
                      <strong>Call Benson Home Solutions:</strong> Our dispatchers
                      will guide you through the next steps and mobilize a crew.
                    </span>
                  </li>
                </ul>
                <div className="mt-8 border-t border-slate/10 pt-8">
                  <a href={`tel:${page?.emergencyPhone || BUSINESS.afterhoursPhone}`}>
                    <Button variant="emergency" className="w-full">
                      Call Now: {page?.emergencyPhone || BUSINESS.afterhoursPhone}
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Additional Content */}
      {page?.content && (
        <Section spacing="lg" className="bg-white">
          <Container size="narrow">
            <div className="prose prose-lg max-w-none">
              <PortableTextRenderer value={page.content} />
            </div>
          </Container>
        </Section>
      )}

      {/* Trust & Verification */}
      <Section variant="cream" spacing="md">
        <Container>
          <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale filter md:gap-16">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">CCB #258533</span>
              <span className="text-xs uppercase tracking-widest">
                Oregon Licensed
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">Fully Insured</span>
              <span className="text-xs uppercase tracking-widest">
                General Liability
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">24/7 Service</span>
              <span className="text-xs uppercase tracking-widest">
                Emergency Only
              </span>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
