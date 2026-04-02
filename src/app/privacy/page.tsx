import type { Metadata } from 'next';
import { Container, Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy Policy | Benson Home Solutions',
  description: 'Privacy Policy and data protection practices for Benson Home Solutions. We value your privacy and the security of your property data.',
};

export default function PrivacyPage() {
  return (
    <>
      <Section variant="oxblood" spacing="md">
        <Container className="text-center">
          <h1 className="text-4xl md:text-6xl font-black text-cream leading-tight uppercase tracking-tight">
            Privacy <span className="italic opacity-60">Policy.</span>
          </h1>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-slate">
            <p className="text-lg font-medium text-slate mb-8">
              At Benson Home Solutions, we take the privacy of our clients and the security of their property data seriously. This Privacy Policy outlines how we collect, use, and protect your information.
            </p>

            <h2 className="text-2xl font-black text-oxblood uppercase tracking-tight mt-12 mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you request an audit, sign up for a maintenance plan, or contact us through our website. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact information (Name, Email, Phone Number)</li>
              <li>Property details (Address, Building Age, System Status)</li>
              <li>Service interests and communication history</li>
            </ul>

            <h2 className="text-2xl font-black text-oxblood uppercase tracking-tight mt-12 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the collected data to provide our proactive maintenance services, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Generating property health scorecards and risk audits</li>
              <li>Calculating maintenance liabilities and service recommendations</li>
              <li>Communicating regarding scheduled maintenance and emergency responses</li>
              <li>Improving our AI-driven diagnostic tools</li>
            </ul>

            <h2 className="text-2xl font-black text-oxblood uppercase tracking-tight mt-12 mb-4">3. Data Integrity & Security</h2>
            <p>
              We utilize high-level security measures to protect your data. Property audit records are hashed using SHA-256 integrity checks to ensure they cannot be tampered with. We do not sell your personal or property data to third-party marketing firms.
            </p>

            <h2 className="text-2xl font-black text-oxblood uppercase tracking-tight mt-12 mb-4">4. Compliance</h2>
            <p>
              As a licensed Oregon contractor (CCB #258533), we adhere to all state regulations regarding client records and property documentation.
            </p>

            <h2 className="text-2xl font-black text-oxblood uppercase tracking-tight mt-12 mb-4">5. Contact Us</h2>
            <p>
              If you have questions about our privacy practices, please contact us at elric@bensonhomesolutions.com.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
