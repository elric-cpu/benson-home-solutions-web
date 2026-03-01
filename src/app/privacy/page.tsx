import { Metadata } from 'next';
import { Section, Container } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy | Benson Home Solutions',
  description: 'How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Section variant="cream" className="py-12 border-b">
        <Container>
          <h1 className="text-4xl font-bold text-oxblood">Privacy Policy</h1>
          <p className="mt-4 text-slate">Last Updated: March 1, 2026</p>
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="narrow">
          <div className="prose prose-slate max-w-none">
            <p>
              At Benson Home Solutions (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we respect your privacy and are committed to protecting the personal information you share with us. This policy describes how we collect, use, and safeguard your data when you visit our website or use our services.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us through our contact forms, home cost calculators, and service requests. This may include:
            </p>
            <ul>
              <li>Name, email address, and phone number.</li>
              <li>Property address and building characteristics.</li>
              <li>Details about your service interests or maintenance needs.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the collected data to:
            </p>
            <ul>
              <li>Provide accurate property intelligence reports and maintenance recommendations.</li>
              <li>Contact you regarding service requests or consultations.</li>
              <li>Improve our website functionality and user experience.</li>
              <li>Comply with legal obligations and industry standards (e.g., CCB records).</li>
            </ul>

            <h2>3. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share data with trusted third-party service providers (such as HubSpot for lead management or Resend for email delivery) solely to facilitate our business operations.
            </p>

            <h2>4. Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at {BUSINESS.email} or call {BUSINESS.phone}.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
