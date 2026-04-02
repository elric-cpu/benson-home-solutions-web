import { Container, Section } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { getFaqContent } from '@/lib/content/site-content';

export async function FAQSection() {
  const faqs = await getFaqContent();
  
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
            <div key={faq.id || index} className="border-b border-border pb-8">
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
