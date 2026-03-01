import { Metadata } from 'next';
import { Section, Container } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service | Benson Home Solutions',
  description: 'The rules and terms governing our services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Section variant="cream" className="py-12 border-b">
        <Container>
          <h1 className="text-4xl font-bold text-oxblood">Terms of Service</h1>
          <p className="mt-4 text-slate">Last Updated: March 1, 2026</p>
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="narrow">
          <div className="prose prose-slate max-w-none">
            <p>
              By accessing or using the services provided by Benson Home Solutions (CCB #258533), you agree to be bound by these Terms of Service.
            </p>

            <h2>1. Service Scope</h2>
            <p>
              We provide property maintenance, restoration, and mitigation services. The specific scope of any project or maintenance agreement will be detailed in a separate, signed document. Our online tools (calculators and estimators) provide high-fidelity projections but do not constitute a formal quote or contract.
            </p>

            <h2>2. Licensed Work</h2>
            <p>
              All trade work is performed by or managed by Benson Home Solutions under Oregon CCB License #258533. We maintain valid bonding and insurance as required by Oregon state law.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>
              Users of our website and tools agree to provide accurate property information. Misleading data may result in inaccurate reporting. We are not liable for decisions made based on tool projections without a physical site assessment.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              Benson Home Solutions shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our digital tools or website content.
            </p>

            <h2>5. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of Oregon. Any disputes shall be resolved in the courts of Linn County, Oregon.
            </p>

            <h2>6. Contact</h2>
            <p>
              For legal inquiries, contact us at {BUSINESS.email}.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
