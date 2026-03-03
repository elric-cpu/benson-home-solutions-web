import type { Metadata } from 'next';
import {
  Section,
  Container,
  Card,
  CardContent,
  RichHero,
  ResourcesSection,
} from '@/components/ui';
import { HubSpotForm } from '@/components/content/HubSpotForm';
import { BUSINESS, HUBSPOT, HERO_ASSETS } from '@/lib/constants';
import { client } from '@/sanity/lib/client';

interface Resource {
  title: string;
  url: string;
  description?: string;
  isBacklink?: boolean;
  authority?: string;
}

interface ContactPageData {
  title?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  heroVideo?: string;
  resources?: Resource[];
  metaDescription?: string;
  formHeadline?: string;
  formDescription?: string;
}

const contactQuery = `*[_type == "contactPage"][0]`;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch<ContactPageData | null>(contactQuery);
    return {
      title: page?.title || 'Contact Us | Request a Quote',
      description:
        page?.metaDescription ||
        `Contact Benson Home Solutions for professional maintenance, restoration, and mitigation services in the Mid-Willamette Valley. Call ${BUSINESS.phone} or our 24/7 emergency line.`,
    };
  } catch {
    return { title: 'Contact Us | Request a Quote' };
  }
}

import { BreadcrumbJsonLd, ContactPageJsonLd } from '@/components/seo/json-ld';

export default async function ContactPage() {
  let page: ContactPageData | null = null;
  try {
    page = await client.fetch<ContactPageData | null>(contactQuery);
  } catch (error) {
    console.error('Failed to load contact page data', error);
  }

  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Contact', url: `${BUSINESS.url}/contact` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {/* Hero Section */}
      <RichHero
        title={page?.heroHeadline || 'Ready to Protect Your Property?'}
        description={
          page?.heroSubtext ||
          'Whether you need a preventive maintenance program, emergency water damage restoration, or a free property assessment, our licensed team is here to help.'
        }
        backgroundImage={HERO_ASSETS.about}
        videoBackground={page?.heroVideo}
        badge="Get in Touch"
      />

      {/* Main Contact Section */}
      <Section spacing="lg">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-charcoal mb-6 text-2xl font-bold">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-cream text-oxblood flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl">
                      📞
                    </div>
                    <div>
                      <h3 className="text-charcoal font-bold">Office Phone</h3>
                      <a
                        href={`tel:${BUSINESS.phone}`}
                        className="text-oxblood text-lg font-semibold hover:underline"
                      >
                        {BUSINESS.phone}
                      </a>
                      <p className="text-slate text-sm">Mon–Fri, 8am–5pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border border-red-100 bg-red-50 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-xl text-red-600">
                      🚨
                    </div>
                    <div>
                      <h3 className="font-bold text-red-900">Emergency Line</h3>
                      <a
                        href={`tel:${BUSINESS.afterhoursPhone}`}
                        className="text-lg font-bold text-red-600 hover:underline"
                      >
                        {BUSINESS.afterhoursPhone}
                      </a>
                      <p className="text-sm text-red-800">
                        24/7 — Active water damage or emergencies
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-cream text-oxblood flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl">
                      ✉️
                    </div>
                    <div>
                      <h3 className="text-charcoal font-bold">Email Address</h3>
                      <a
                        href={`mailto:${BUSINESS.email}`}
                        className="text-oxblood text-lg hover:underline"
                      >
                        {BUSINESS.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-charcoal mb-6 text-2xl font-bold">
                  Credentials
                </h2>
                <Card variant="outlined" className="bg-surface">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-oxblood text-xl font-bold">
                          ✓
                        </span>
                        <p className="text-slate font-medium">
                          <strong>
                            Oregon CCB #{BUSINESS.license.replace('CCB #', '')}
                          </strong>{' '}
                          — Licensed, Bonded, & Insured
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-oxblood text-xl font-bold">
                          ✓
                        </span>
                        <p className="text-slate font-medium">
                          IICRC Certified Water Damage Restoration
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-oxblood text-xl font-bold">
                          ✓
                        </span>
                        <p className="text-slate font-medium">
                          EPA Lead-Safe Certified Firm
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-charcoal mb-6 text-2xl font-bold">
                  Our Location
                </h2>
                <Card variant="outlined" className="bg-surface">
                  <CardContent className="p-6">
                    <p className="text-charcoal font-semibold">Benson Home Solutions</p>
                    <p className="text-slate">123 Main Street</p>
                    <p className="text-slate">Albany, OR 97321</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Form */}
            <div className="shadow-elevated border-slate/10 rounded-2xl border bg-white p-6 md:p-8">
              <h2 className="text-charcoal mb-2 text-2xl font-bold">
                {page?.formHeadline || 'Send Us a Message'}
              </h2>
              <p className="text-slate mb-8">
                {page?.formDescription ||
                  "Fill out the form below and we'll get back to you within one business day."}
              </p>
              <HubSpotForm
                portalId={HUBSPOT.portalId}
                formId={HUBSPOT.contactFormId}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Embed Placeholder */}
      <Section className="bg-cream">
        <div className="relative h-96 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000.0!2d-123.25!3d44.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54c038481d6f4c51%3A0x6e78d2a6b2a0c6a5!2sAlbany%2C%20OR!5e0!3m2!1sen!2sus!4v1678888888888!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps of Albany, OR"
          ></iframe>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold">
            Google Maps Placeholder
          </div>
        </div>
      </Section>

      {/* Authoritative Resources */}
      {page?.resources && <ResourcesSection resources={page.resources} />}

      {/* JSON-LD */}
      <ContactPageJsonLd />
    </>
  );
}
