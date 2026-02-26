'use client';

import { useState } from 'react';

interface FAQItem {
  _id: string;
  question: string;
  answer: any; // Portable Text — rendered as plain text for now
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

function extractPlainText(blocks: any[]): string {
  if (!blocks) return '';
  return blocks
    .filter((b: any) => b._type === 'block')
    .map((b: any) => b.children?.map((c: any) => c.text).join('') ?? '')
    .join(' ');
}

export function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs?.length) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-[var(--color-charcoal)] sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-lg text-[var(--color-slate)]">{subtitle}</p>
          )}
        </div>

        <dl className="mt-10 divide-y divide-[var(--color-border)]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq._id} className="py-4">
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between text-left"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-[var(--color-charcoal)]">
                      {faq.question}
                    </span>
                    <span className="ml-4 flex-shrink-0">
                      <svg
                        className={`h-5 w-5 text-[var(--color-muted)] transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </dt>
                {isOpen && (
                  <dd className="mt-3 text-[var(--color-slate)]">
                    {typeof faq.answer === 'string'
                      ? faq.answer
                      : extractPlainText(faq.answer)}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
