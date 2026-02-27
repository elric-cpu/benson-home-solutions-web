'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
  Button,
  Container,
  Section,
  Card,
} from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const serviceOptions = [
  'Residential Maintenance',
  'Commercial Services',
  'Church & Non-Profit',
  'Emergency Repairs',
  'Remodeling',
  'Water Damage Restoration',
  'General Inquiry',
  'Other',
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong.'
      );
    }
  };

  return (
    <>
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-oxblood leading-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-slate leading-relaxed">
              Ready to get started? Fill out the form below for a free,
              no-obligation quote, or reach out directly.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {status === 'success' ? (
                <Card variant="outlined" className="p-8 text-center border-green-200 bg-green-50/50">
                  <div className="text-4xl mb-4">\u2705</div>
                  <h2 className="text-2xl font-bold text-charcoal">
                    Message Sent!
                  </h2>
                  <p className="mt-2 text-slate">
                    Thanks for reaching out. We&apos;ll get back to you within
                    one business day.
                  </p>
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setStatus('idle')}
                    >
                      Send Another Message
                    </Button>
                  </div>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-charcoal mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-charcoal bg-surface focus:border-oxblood focus:ring-1 focus:ring-oxblood transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-charcoal mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full rounded-lg border border-border px-4 py-2.5 text-charcoal bg-surface focus:border-oxblood focus:ring-1 focus:ring-oxblood transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-charcoal mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-full rounded-lg border border-border px-4 py-2.5 text-charcoal bg-surface focus:border-oxblood focus:ring-1 focus:ring-oxblood transition-colors"
                        placeholder="(541) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Service Interest */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-charcoal mb-1"
                    >
                      Service Interest
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => handleChange('service', e.target.value)}
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-charcoal bg-surface focus:border-oxblood focus:ring-1 focus:ring-oxblood transition-colors"
                    >
                      <option value="">Select a service...</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-charcoal mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="w-full rounded-lg border border-border px-4 py-2.5 text-charcoal bg-surface focus:border-oxblood focus:ring-1 focus:ring-oxblood transition-colors resize-y"
                      placeholder="Tell us about your project or question..."
                    />
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card variant="outlined" className="p-6">
                <h3 className="text-lg font-semibold text-charcoal mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-charcoal">Phone</div>
                    <a
                      href={`tel:${BUSINESS.phone}`}
                      className="text-oxblood hover:text-oxblood/80 transition-colors"
                    >
                      {BUSINESS.phone}
                    </a>
                  </div>
                  <div>
                    <div className="font-medium text-charcoal">
                      After-Hours Emergency
                    </div>
                    <a
                      href={`tel:${BUSINESS.afterhoursPhone}`}
                      className="text-oxblood hover:text-oxblood/80 transition-colors"
                    >
                      {BUSINESS.afterhoursPhone}
                    </a>
                  </div>
                  <div>
                    <div className="font-medium text-charcoal">Email</div>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="text-oxblood hover:text-oxblood/80 transition-colors"
                    >
                      {BUSINESS.email}
                    </a>
                  </div>
                  <div>
                    <div className="font-medium text-charcoal">License</div>
                    <span className="text-slate">{BUSINESS.license}</span>
                  </div>
                </div>
              </Card>

              <Card variant="outlined" className="p-6 border-oxblood/20 bg-cream">
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  \u{1F6A8} Emergency?
                </h3>
                <p className="text-sm text-slate mb-4">
                  For urgent repairs, call our after-hours emergency line
                  immediately.
                </p>
                <a href={`tel:${BUSINESS.afterhoursPhone}`}>
                  <Button variant="emergency" size="sm" className="w-full">
                    {BUSINESS.afterhoursPhone}
                  </Button>
                </a>
              </Card>

              <Card variant="outlined" className="p-6">
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  Service Areas
                </h3>
                <p className="text-sm text-slate">
                  We serve Albany, Lebanon, Sweet Home, Salem, Corvallis, and
                  surrounding communities in the Mid-Willamette Valley, plus
                  Harney County.
                </p>
                <Link
                  href="/areas"
                  className="text-sm text-oxblood font-medium hover:text-oxblood/80 transition-colors mt-2 inline-block"
                >
                  View all areas &rarr;
                </Link>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* JSON-LD LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HomeAndConstructionBusiness',
            name: BUSINESS.name,
            telephone: BUSINESS.phone,
            email: BUSINESS.email,
            url: BUSINESS.url,
            areaServed: {
              '@type': 'State',
              name: 'Oregon',
            },
            sameAs: [BUSINESS.facebook, BUSINESS.gbp],
          }),
        }}
      />
    </>
  );
}
