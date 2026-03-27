import { Container, Section } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is a 'Maintenance-First' subscription?",
    answer:
      'It is a recurring service plan built around property upkeep, seasonal checks, minor correction work, and priority response. The goal is simple: handle problems early while the fix is still small.',
  },
  {
    question: 'Why do I need monthly property protection in Oregon?',
    answer:
      "The Mid-Willamette Valley's high rainfall and humidity make properties susceptible to mold, rot, and drainage failures. Regular monthly checks ensure building envelopes are intact and gutters/drainage systems are functioning correctly, preventing thousands of dollars in water damage.",
  },
  {
    question: 'Do you do post-inspection and lender-required repairs?',
    answer:
      'Yes. We handle buyer repair lists, seller pre-listing corrections, FHA and VA repair items, appraisal-required corrections, and documentation-heavy scopes where the work needs to be clear and defensible.',
  },
  {
    question: 'Do you serve Harney County for property maintenance?',
    answer:
      'Yes. We provide specialized high-desert maintenance for properties from Burns to Drewsey, focusing on winterization, wildfire hardening, and extreme temperature protection for residential and commercial assets.',
  },
  {
    question: 'What kind of repair and mitigation work do you handle?',
    answer:
      'Common scopes include water damage restoration, mold mitigation, leak-source repairs, lock changes, board-ups, property preservation, air sealing, attic insulation, and general correction work tied to inspection or lender requirements.',
  },
  {
    question: 'Is Benson Home Solutions a licensed contractor in Oregon?',
    answer:
      'Yes. Benson Home Solutions is a fully licensed, bonded, and insured Oregon General Contractor (CCB #258533). We are authorized to perform residential and commercial maintenance, restoration, and remodeling throughout the state, including the Mid-Willamette Valley and Harney County.',
  },
];

export function FAQSection() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Section spacing="lg" id="faq">
      <Script
        id="faq-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="narrow">
        <h2 className="text-oxblood mb-12 text-center text-4xl font-black tracking-tight uppercase">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-border border-b pb-8">
              <h3 className="text-charcoal mb-4 text-xl leading-tight font-black">
                {faq.question}
              </h3>
              <p className="text-slate leading-relaxed font-medium">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-oxblood/60 mb-6 font-bold italic">
            Have a specific question about your property?
          </p>
          <a
            href={`tel:${BUSINESS.phone}`}
            className="bg-oxblood text-cream hover:bg-oxblood/90 inline-flex h-12 items-center justify-center rounded-xl px-8 text-sm font-black tracking-widest uppercase transition-all"
          >
            Call the Office
          </a>
        </div>
      </Container>
    </Section>
  );
}
