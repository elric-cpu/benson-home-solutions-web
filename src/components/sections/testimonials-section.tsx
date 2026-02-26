'use client';

import { useState } from 'react';

interface Testimonial {
  _id: string;
  clientName: string;
  location?: string;
  quote: string;
  rating: number;
  service?: { title: string; slug: { current: string } };
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection({
  testimonials,
  title = 'What Our Customers Say',
  subtitle = 'Real reviews from homeowners and businesses across the Mid-Willamette Valley.',
}: TestimonialsSectionProps) {
  if (!testimonials?.length) return null;

  return (
    <section className="bg-[var(--color-cream)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-[var(--color-charcoal)] sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-lg text-[var(--color-slate)]">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t._id}
              className="flex flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-[var(--color-border)]"
            >
              <StarRating rating={t.rating} />
              <blockquote className="mt-4 flex-1 text-[var(--color-slate)]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                <p className="font-semibold text-[var(--color-charcoal)]">
                  {t.clientName}
                </p>
                {t.location && (
                  <p className="text-sm text-[var(--color-muted)]">
                    {t.location}
                  </p>
                )}
                {t.service && (
                  <p className="mt-1 text-sm font-medium text-[var(--color-oxblood)]">
                    {t.service.title}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
