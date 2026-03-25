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
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message: string;
  honeypot: string; // Anti-spam
}

const serviceOptions = [
  'Residential Maintenance Plan',
  'Commercial Maintenance Plan',
  'Church & Non-Profit Maintenance Plan',
  'Forensic Audit & Inspection',
  'Water Damage or Restoration',
  'Remodeling Inquiry',
  'General Question',
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    message: '',
    honeypot: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent fail for bots

    setStatus('submitting');
    setErrorMessage('');
    setSubmittedName(formData.name);

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
      setFormData({ name: '', email: '', phone: '', address: '', service: '', message: '', honeypot: '' });
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
            <h1 className="text-4xl md:text-5xl font-black text-oxblood leading-tight uppercase tracking-tight">
              Let&apos;s Talk About Your Property
            </h1>
            <p className="mt-4 text-lg font-medium text-slate leading-relaxed">
              {`Whether you're ready for a maintenance plan, need a specific repair, or just have a question, we're here to help. Fill out the form below, and we'll get back to you within one business day.`}
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
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-charcoal uppercase tracking-tight">
                    Message Sent!
                  </h2>
                  <p className="mt-2 text-slate font-medium">
                    Thanks, {submittedName.split(' ')[0]}. We&apos;ve received your message and will get back to you within one business day. If this is an emergency, please call our 24/7 line at {BUSINESS.afterhoursPhone}.
                  </p>
                  <div className="mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setStatus('idle')}
                      className="font-black uppercase tracking-widest"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot */}
                  <input type="text" name="honeypot" className="hidden" value={formData.honeypot} onChange={(e) => handleChange('honeypot', e.target.value)} />

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-oxblood/60 mb-2">Full Name *</label>
                    <input type="text" id="name" required value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full rounded-xl border-2 border-oxblood/10 px-4 py-3 text-oxblood bg-white focus:border-oxblood focus:ring-0 transition-colors font-bold" placeholder="Your Name" />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-oxblood/60 mb-2">Email *</label>
                      <input type="email" id="email" required value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full rounded-xl border-2 border-oxblood/10 px-4 py-3 text-oxblood bg-white focus:border-oxblood focus:ring-0 transition-colors font-bold" placeholder="you@email.com" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-black uppercase tracking-widest text-oxblood/60 mb-2">Phone</label>
                      <input type="tel" id="phone" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full rounded-xl border-2 border-oxblood/10 px-4 py-3 text-oxblood bg-white focus:border-oxblood focus:ring-0 transition-colors font-bold" placeholder="(541) 555-1234" />
                    </div>
                  </div>

                  {/* Property Address */}
                  <div>
                    <label htmlFor="address" className="block text-xs font-black uppercase tracking-widest text-oxblood/60 mb-2">Property Address</label>
                      <input type="text" id="address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className="w-full rounded-xl border-2 border-oxblood/10 px-4 py-3 text-oxblood bg-white focus:border-oxblood focus:ring-0 transition-colors font-bold" placeholder="123 Main St, Salem, OR" />
                    <p className="mt-2 text-[10px] font-bold text-oxblood/40 uppercase tracking-widest">
                      Providing an address allows us to research your property&apos;s history before we talk, saving you time.
                    </p>
                  </div>

                  {/* Service Interest */}
                  <div>
                    <label htmlFor="service" className="block text-xs font-black uppercase tracking-widest text-oxblood/60 mb-2">I&apos;m Interested In...</label>
                    <select id="service" value={formData.service} onChange={(e) => handleChange('service', e.target.value)} className="w-full rounded-xl border-2 border-oxblood/10 px-4 py-3 text-oxblood bg-white focus:border-oxblood focus:ring-0 transition-colors font-bold appearance-none">
                      <option value="">Please select one...</option>
                      {serviceOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-oxblood/60 mb-2">Your Message *</label>
                    <textarea id="message" required rows={4} value={formData.message} onChange={(e) => handleChange('message', e.target.value)} className="w-full rounded-xl border-2 border-oxblood/10 px-4 py-3 text-oxblood bg-white focus:border-oxblood focus:ring-0 transition-colors font-bold resize-y" placeholder="Tell us about your project or problem..."></textarea>
                  </div>

                  {status === 'error' && (<div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">{errorMessage}</div>)}

                  <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full sm:w-auto font-black uppercase tracking-widest px-8">
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card variant="outlined" className="p-8">
                <h3 className="text-xl font-black text-charcoal mb-6 uppercase tracking-tight">What to Expect</h3>
                <ol className="list-decimal list-inside space-y-4 text-sm text-slate font-medium">
                  <li>A team member will review your message.</li>
                  <li>We&apos;ll call you to discuss your needs in detail.</li>
                  <li>We&apos;ll schedule a site visit if necessary.</li>
                  <li>You&apos;ll receive a clear, data-backed proposal.</li>
                </ol>
              </Card>

              <Card variant="outlined" className="p-8 border-oxblood/20 bg-cream">
                <h3 className="text-lg font-semibold text-charcoal mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-oxblood" /> Have an Emergency?
                </h3>
                <p className="text-sm text-slate mb-4">
                  For urgent issues like water or storm damage, call our 24/7 emergency line for immediate help.
                </p>
                <a href={`tel:${BUSINESS.afterhoursPhone}`}>
                  <Button variant="emergency" className="w-full font-bold">
                    Call Our 24/7 Line
                  </Button>
                </a>
              </Card>

              <Card variant="outlined" className="p-6">
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  Our Service Areas
                </h3>
                <p className="text-sm text-slate">
                  We proudly serve the Mid-Willamette Valley and Harney County.
                </p>
                <Link href="/areas" className="text-sm text-oxblood font-medium hover:text-oxblood/80 transition-colors mt-2 inline-block">
                  View Service Area Map &rarr;
                </Link>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
