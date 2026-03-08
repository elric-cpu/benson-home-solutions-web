import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import {
  Section,
  Container,
  Card,
  CardContent,
  RichHero,
  Button,
} from '@/components/ui';
import { BUSINESS, HERO_ASSETS } from '@/lib/constants';
import { ContactForm } from './ContactForm';
import { PortableTextRenderer as PortableText } from '@/components/content/PortableText';
import { LocalBusinessJsonLd } from '@/components/seo/json-ld';

interface ContactPageData {
  title?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  heroVideo?: string;
  emergencyBannerText?: string;
  contactInfo?: { title: string; content: Record<string, unknown>[] }[];
}

export const metadata: Metadata = {
  title: 'Contact Us | Benson Home Solutions',
  description:
    'Get in touch with Benson Home Solutions for emergency services, maintenance plans, or general inquiries about our property services in the Willamette Valley.',
};

export default async function ContactPage() {
  const page: ContactPageData | null = await client.fetch(
    `*[_type == "contactPage"][0]{
      title,
      heroHeadline,
      heroSubtext,
      heroVideo,
      emergencyBannerText,
      contactInfo
    }`,
  );

  return (
    <>
      <LocalBusinessJsonLd />
      <RichHero
        title={page?.heroHeadline || 'Get in Touch'}
        description={
          page?.heroSubtext ||
          "We're here to help with your property needs. Reach out 24/7 for emergencies."
        }
        videoBackground={page?.heroVideo}
        backgroundImage={HERO_ASSETS.about}
      >
        <a href={`tel:${BUSINESS.phone.replace(/[^\d]/g, '')}`}>
          <Button variant="secondary" size="lg">
            Call Now: {BUSINESS.phone}
          </Button>
        </a>
      </RichHero>

      {/* Emergency Banner */}
      <div
        role="alert"
        className="bg-red-700 py-4 text-center font-black tracking-widest text-white"
      >
        <Container>
          {page?.emergencyBannerText ||
            `24/7 EMERGENCY? CALL ${BUSINESS.phone} IMMEDIATELY.`}
        </Container>
      </div>

      <Section className="bg-surface/50">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-benson-text mb-4 text-3xl font-black">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and our team will get back to you
                  shortly. For immediate assistance, please use our 24/7 line.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Information Section */}
            <div>
              <h2 className="text-benson-text mb-8 text-3xl font-black">
                Contact Information
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {page?.contactInfo?.map((info, idx) => (
                  <Card key={idx} className="border-benson-creamDark shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-benson-maroon mb-3 text-lg font-bold">
                        {info.title}
                      </h3>
                      <div className="text-muted-foreground text-sm leading-relaxed">
                        <PortableText value={info.content} />
                      </div>
                    </CardContent>
                  </Card>
                )) || (
                  <>
                    <Card className="border-benson-creamDark shadow-sm">
                      <CardContent className="p-6">
                        <h3 className="text-benson-maroon mb-3 text-lg font-bold">
                          Service Areas
                        </h3>
                        <div className="text-muted-foreground text-sm leading-relaxed">
                          <p>
                            <strong>Mid-Willamette Valley:</strong> Albany,
                            Lebanon, Sweet Home, Corvallis, Salem.
                          </p>
                          <p className="mt-2">
                            <strong>Harney County:</strong> Burns, Riley,
                            Drewsey, Denio, McDermitt.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-benson-creamDark shadow-sm">
                      <CardContent className="p-6">
                        <h3 className="text-benson-maroon mb-3 text-lg font-bold">
                          Business Details
                        </h3>
                        <div className="text-muted-foreground text-sm leading-relaxed">
                          <p>
                            <strong>Phone:</strong> {BUSINESS.phone}
                          </p>
                          <p>
                            <strong>Email:</strong> {BUSINESS.email}
                          </p>
                          <p>
                            <strong>License:</strong> CCB #{BUSINESS.license}
                          </p>
                          <p className="mt-2 italic">
                            Licensed, Bonded, and Insured in the State of
                            Oregon.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>

              {/* Trust Signal */}
              <div className="border-benson-maroon/20 mt-8 rounded-xl border border-dashed p-6 text-center">
                <p className="text-benson-maroon text-sm font-bold">
                  Oregon Contractor CCB #258533
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Professional Maintenance Specialists
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
