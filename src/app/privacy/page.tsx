import type { Metadata } from 'next';
import { Container, Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy covering Benson Home Solutions lead capture, communications, website operations, and customer data handling.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Benson Home Solutions',
    description:
      'Privacy policy covering Benson Home Solutions lead capture, communications, website operations, and customer data handling.',
    url: 'https://www.bensonhomesolutions.com/privacy',
    images: ['/opengraph-image'],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Section variant="cream" spacing="lg">
        <Container className="max-w-3xl">
          <h1 className="text-oxblood mb-6 text-4xl font-black tracking-tight uppercase">
            Privacy Policy
          </h1>
          <p className="text-slate mb-4 leading-relaxed font-medium">
            Benson Home Solutions collects the information you submit through
            this website so we can respond to your request, prepare scopes,
            schedule work, and support ongoing customer service.
          </p>
          <p className="text-slate mb-4 leading-relaxed font-medium">
            Information may include your name, email address, phone number,
            service interest, property address, and the details you provide
            about the repair or project. We use that information internally to
            communicate with you, review the scope, and support operational
            follow-through.
          </p>
          <p className="text-slate mb-4 leading-relaxed font-medium">
            We do not sell your personal information. We may share data with
            service providers that support hosting, email delivery, mapping,
            analytics, address validation, or project operations when that is
            necessary to run the business.
          </p>
          <p className="text-slate mb-4 leading-relaxed font-medium">
            If you want us to update or delete the contact information you
            submitted through this site, email us at{' '}
            <a
              className="text-oxblood underline"
              href="mailto:office@bensonhomesolutions.com"
            >
              office@bensonhomesolutions.com
            </a>
            .
          </p>
          <p className="text-slate leading-relaxed font-medium">
            This policy may be updated as our website and operations change.
          </p>
        </Container>
      </Section>
    </>
  );
}
