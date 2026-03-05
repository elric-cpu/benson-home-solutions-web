import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import {
  Section,
  Container,
  Card,
  CardContent,
  RichHero,
  Button,
} from '@/components/ui';
import { PortableTextRenderer } from '@/components/content/PortableText';
import { BUSINESS, HERO_ASSETS } from '@/lib/constants';
import ContactForm from './ContactForm';

interface ContactPageData {
  title?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  heroVideo?: string;
  metaDescription?: string;
  contactInfo?: Record<string, unknown>[];
  emergencyInfo?: Record<string, unknown>[];
}

export const metadata: Metadata = {
  title: 'Contact Us | Benson Home Solutions',
  description: 'Get in touch with Benson Home Solutions for emergency services, maintenance plans, or general inquiries about our property services in the Willamette Valley.',
};

export default async function ContactPage() {
  // Fetch contact page data from Sanity
  const page: ContactPageData | null = await client.fetch(
    `*[_type == "contactPage"][0]{
      title,
      heroHeadline,
      heroSubtext,
      heroVideo,
      metaDescription,
      contactInfo,
      emergencyInfo
    }`
  );

  return (
    <>
      <RichHero
        title={
          page?.heroHeadline ||
          'Get in Touch'
        }
        description={
          page?.heroSubtext ||
          'We\'re here to help with your property needs. Reach out 24/7 for emergencies.'
        }
        video={page?.heroVideo}
        image={HERO_ASSETS.about}
        cta={
          <Button size="lg" asChild>
            <a href={`tel:${BUSINESS.phone.replace(/[^\d]/g, '')}`}>
              Call Now: {BUSINESS.phone}
            </a>
          </Button>
        }
      />

      <Section className="bg-surface/50">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Emergency Services</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>24/7 Emergency Response Available</p>
                      <p>After Hours: {BUSINESS.afterhoursPhone}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Contact Details</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Phone: {BUSINESS.phone}</p>
                      <p>Email: {BUSINESS.email}</p>
                      <p>License: {BUSINESS.license}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Service Areas</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Mid-Willamette Valley: Salem, Keizer, Wilsonville, Corvallis, Albany, Lebanon, Sweet Home</p>
                      <p>Harney County: Burns, Riley, Drewsey, Denio, McDermitt</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
