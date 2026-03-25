import { Container, Section } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is a 'Maintenance-First' subscription?",
    answer: "A 'Maintenance-First' subscription is a proactive property care program where Benson Home Solutions performs regular (typically monthly) forensic audits of your property. Instead of waiting for a leak or failure, we identify and fix small issues before they become expensive insurance claims.",
  },
  {
    question: "Why do I need monthly property protection in Oregon?",
    answer: "The Mid-Willamette Valley's high rainfall and humidity make properties susceptible to mold, rot, and drainage failures. Regular monthly checks ensure building envelopes are intact and gutters/drainage systems are functioning correctly, preventing thousands of dollars in water damage.",
  },
  {
    question: "How is a 'Forensic Audit' different from a standard home inspection?",
    answer: "Standard inspections are primarily visual and occur during property transfers. Our forensic audits use moisture meters, thermal imaging, and building-science metrics to detect hidden decay, heat loss, and structural vulnerabilities that visual inspections miss.",
  },
  {
    question: "Do you serve Harney County for property maintenance?",
    answer: "Yes. We provide specialized high-desert maintenance for properties from Burns to Drewsey, focusing on winterization, wildfire hardening, and extreme temperature protection for residential and commercial assets.",
  },
  {
    question: "How do I save money with proactive care?",
    answer: "According to industry standards (BOMA), proactive maintenance has a 3:1 ROI. By spending a small amount monthly to keep systems in peak condition, you avoid the high cost of emergency repairs, structural restoration, and increased insurance premiums.",
  },
  {
    question: "Is Benson Home Solutions a licensed contractor in Oregon?",
    answer: "Yes. Benson Home Solutions is a fully licensed, bonded, and insured Oregon General Contractor (CCB #258533). We are authorized to perform residential and commercial maintenance, restoration, and remodeling throughout the state, including the Mid-Willamette Valley and Harney County.",
  },
];

export function FAQSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <Section spacing="lg" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="narrow">
        <h2 className="text-4xl font-black mb-12 text-center uppercase tracking-tight text-oxblood">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border pb-8">
              <h3 className="text-xl font-black mb-4 text-charcoal leading-tight">
                {faq.question}
              </h3>
              <p className="text-slate font-medium leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-oxblood/60 font-bold italic mb-6">
            Have a specific question about your property?
          </p>
          <a
            href={`tel:${BUSINESS.phone}`}
            className="inline-flex items-center justify-center h-12 px-8 text-sm font-black uppercase tracking-widest rounded-xl bg-oxblood text-cream hover:bg-oxblood/90 transition-all"
          >
            Call our Office
          </a>
        </div>
      </Container>
    </Section>
  );
}
