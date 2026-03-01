import type { Metadata } from 'next';
import { Section, Container, Card, CardContent, Badge } from '@/components/ui';
import { HubSpotForm } from '@/components/content/HubSpotForm';
import { BUSINESS, HUBSPOT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us | Request a Quote',
  description: `Contact Benson Home Solutions for professional maintenance, restoration, and mitigation services in the Mid-Willamette Valley. Call ${BUSINESS.phone} or our 24/7 emergency line.`,
};

import { BreadcrumbJsonLd } from '@/components/seo/json-ld';

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Contact', url: `${BUSINESS.url}/contact` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {/* Hero Section */}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-oxblood leading-tight">
              Ready to Protect Your Property?
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate leading-relaxed">
              Whether you need a preventive maintenance program, emergency
              water damage restoration, or a free property assessment, our
              licensed team is here to help.
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Contact Section */}
      <Section spacing="lg">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-oxblood text-xl shrink-0">
                      📞
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal">Office Phone</h3>
                      <a
                        href={`tel:${BUSINESS.phone}`}
                        className="text-lg text-oxblood hover:underline font-semibold"
                      >
                        {BUSINESS.phone}
                      </a>
                      <p className="text-sm text-slate">Mon–Fri, 8am–5pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-red-50 border border-red-100">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xl shrink-0">
                      🚨
                    </div>
                    <div>
                      <h3 className="font-bold text-red-900">Emergency Line</h3>
                      <a
                        href={`tel:${BUSINESS.afterhoursPhone}`}
                        className="text-lg text-red-600 hover:underline font-bold"
                      >
                        {BUSINESS.afterhoursPhone}
                      </a>
                      <p className="text-sm text-red-800">
                        24/7 — Active water damage or emergencies
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-oxblood text-xl shrink-0">
                      ✉️
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal">Email Address</h3>
                      <a
                        href={`mailto:${BUSINESS.email}`}
                        className="text-lg text-oxblood hover:underline"
                      >
                        {BUSINESS.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-6">
                  Credentials
                </h2>
                <Card variant="outlined" className="bg-surface">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-oxblood font-bold text-xl">✓</span>
                        <p className="text-slate font-medium">
                          <strong>Oregon CCB #{BUSINESS.license.replace('CCB #', '')}</strong> — Licensed, Bonded, & Insured
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-oxblood font-bold text-xl">✓</span>
                        <p className="text-slate font-medium">
                          IICRC Certified Water Damage Restoration
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-oxblood font-bold text-xl">✓</span>
                        <p className="text-slate font-medium">
                          EPA Lead-Safe Certified Firm
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-elevated p-6 md:p-8 border border-slate/10">
              <h2 className="text-2xl font-bold text-charcoal mb-2">
                Send Us a Message
              </h2>
              <p className="text-slate mb-8">
                Fill out the form below and we&apos;ll get back to you within one
                business day.
              </p>
              <HubSpotForm 
                portalId={HUBSPOT.portalId}
                formId={HUBSPOT.contactFormId}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: `Contact ${BUSINESS.name}`,
            description: `Contact information and request form for ${BUSINESS.name} in the Mid-Willamette Valley.`,
            url: `${BUSINESS.url}/contact`,
            mainEntity: {
              '@type': 'HomeAndConstructionBusiness',
              name: BUSINESS.name,
              telephone: BUSINESS.phone,
              email: BUSINESS.email,
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'OR',
                addressCountry: 'US',
              },
            },
          }),
        }}
      />
    </>
  );
}
