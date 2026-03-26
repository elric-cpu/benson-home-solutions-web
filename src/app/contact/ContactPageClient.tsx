'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import {
  Button,
  Container,
  Section,
  Card,
} from '@/components/ui';
import { BUSINESS, MAX_ATTACHMENT_SIZE_BYTES } from '@/lib/constants';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message: string;
  honeypot: string;
  turnstileToken: string;
  duration: number;
  attachmentName: string;
  attachmentType: string;
  attachmentData: string;
  attachmentSize: number;
}

const serviceOptions = [
  'Inspection Repairs',
  'FHA / VA / Lender Repairs',
  'Water Damage / Mold / Moisture',
  'Property Preservation',
  'Energy Audit / Air Sealing / Insulation',
  'Maintenance Plan',
  'Windows / Doors / Site Repairs',
  'General Question',
];

export default function ContactPageClient() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [formData, setFormData] = useState<Omit<FormData, 'duration'>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    message: '',
    honeypot: '',
    turnstileToken: '',
    attachmentName: '',
    attachmentType: '',
    attachmentData: '',
    attachmentSize: 0,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [attachmentError, setAttachmentError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formStartedAt = useRef(Date.now());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');

    if (service) {
      const normalized = service.toLowerCase();
      
      // Exact matches or known aliases
      if (normalized === 'inspection repairs' || normalized === 'inspection-repairs') {
        setFormData((prev) => ({ ...prev, service: 'Inspection Repairs' }));
      } else if (normalized === 'commercial' || normalized === 'commercial maintenance' || normalized === 'commercial-maintenance') {
        setFormData((prev) => ({ ...prev, service: 'Commercial Maintenance' }));
      } else if (normalized === 'maintenance plan' || normalized === 'maintenance-plan') {
        setFormData((prev) => ({ ...prev, service: 'Maintenance Plan' }));
      } else if (normalized === 'water damage' || normalized === 'mold' || normalized === 'water damage / mold / moisture') {
        setFormData((prev) => ({ ...prev, service: 'Water Damage / Mold / Moisture' }));
      } else if (serviceOptions.includes(service)) {
        setFormData((prev) => ({ ...prev, service }));
      }
    }
  }, []);

  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!turnstileSiteKey) return;

    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || typeof window === 'undefined') return;

      const turnstile = (window as Window & {
        turnstile?: {
          render: (
            element: string | HTMLElement,
            options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void }
          ) => string;
          reset: (widgetId: string) => void;
          remove: (widgetId: string) => void;
        };
      }).turnstile;

      const container = document.getElementById('turnstile-widget');

      if (!turnstile || !container) return;

      // If we already have a widget rendered, we might need to remove/reset it if it's broken
      // or if we're coming from a success state. 
      // However, for the initial render, we just check if it's empty.
      if (container.childElementCount > 0 && !turnstileWidgetId.current) return;

      if (turnstileWidgetId.current) {
        try {
          turnstile.remove(turnstileWidgetId.current);
        } catch (e) {
          // Ignore removal errors
        }
      }

      turnstileWidgetId.current = turnstile.render(container, {
        sitekey: turnstileSiteKey,
        callback: (token: string) => {
          setFormData((prev) => ({ ...prev, turnstileToken: token }));
        },
        'expired-callback': () => {
          setFormData((prev) => ({ ...prev, turnstileToken: '' }));
        },
      });
    };

    const pollId = window.setInterval(() => {
      if ((window as any).turnstile) {
        renderWidget();
        window.clearInterval(pollId);
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearInterval(pollId);
    };
  }, [turnstileSiteKey]);

  const resetForm = () => {
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      service: '',
      message: '',
      honeypot: '',
      turnstileToken: '',
      attachmentName: '',
      attachmentType: '',
      attachmentData: '',
      attachmentSize: 0,
    });
    formStartedAt.current = Date.now();
    // Trigger Turnstile re-render/reset after a short delay to ensure DOM is ready
    setTimeout(() => {
      const turnstile = (window as any).turnstile;
      if (turnstile && turnstileWidgetId.current) {
        turnstile.reset(turnstileWidgetId.current);
      }
    }, 100);
  };

  const handleChange = (field: keyof Omit<FormData, 'duration'>, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAttachmentUpload = (file: File | null) => {
    if (!file) {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFormData((prev) => ({
        ...prev,
        attachmentName: '',
        attachmentType: '',
        attachmentData: '',
        attachmentSize: 0,
      }));
      setAttachmentError('');
      return;
    }

    if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
      setAttachmentError('File must be 3.75MB or smaller.');
      setFormData((prev) => ({
        ...prev,
        attachmentName: '',
        attachmentType: '',
        attachmentData: '',
        attachmentSize: 0,
      }));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1] ?? '';
      setFormData((prev) => ({
        ...prev,
        attachmentName: file.name,
        attachmentType: file.type || 'application/pdf',
        attachmentData: base64,
        attachmentSize: file.size,
      }));
      setAttachmentError('');
    };
    reader.onerror = () => {
      setAttachmentError('Unable to read that file. Try a different format.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    if (attachmentError) {
      setStatus('error');
      setErrorMessage(attachmentError);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    setSubmittedName(formData.name);

    const payload: FormData = {
      ...formData,
      duration: Date.now() - formStartedAt.current,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setAttachmentError('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        service: '',
        message: '',
        honeypot: '',
        turnstileToken: '',
        attachmentName: '',
        attachmentType: '',
        attachmentData: '',
        attachmentSize: 0,
      });
      formStartedAt.current = Date.now();
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong.'
      );
    }
  };

  return (
    <>
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
        />
      )}
      <Section variant="cream" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-oxblood leading-tight uppercase tracking-tight">
              Send the Scope. We&apos;ll Take It From There.
            </h1>
            <p className="mt-4 text-lg font-medium text-slate leading-relaxed">
              {`Send the inspection report, lender notes, address, or a plain-English description of the problem. We handle repair scopes, mitigation work, maintenance, and urgent response.`}
            </p>
            <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate">
              Typical requests include FHA and VA corrections, appraisal-required repairs,
              leak and moisture work, mold mitigation, board-ups, lock changes, insulation
              upgrades, and recurring maintenance scopes for occupied or vacant properties.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
                      onClick={resetForm}
                      className="font-black uppercase tracking-widest"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="sr-only">
                    <label htmlFor="company-field">Leave this field blank</label>
                    <input
                      type="text"
                      id="company-field"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => handleChange('honeypot', e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-oxblood/60 mb-2">Full Name *</label>
                    <input type="text" id="name" required value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full rounded-xl border-2 border-oxblood/10 px-4 py-3 text-oxblood bg-white focus:border-oxblood focus:ring-0 transition-colors font-bold" placeholder="Your Name" />
                  </div>

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

                  <div>
                    <label htmlFor="address" className="block text-xs font-black uppercase tracking-widest text-oxblood/60 mb-2">Property Address</label>
                    <input type="text" id="address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className="w-full rounded-xl border-2 border-oxblood/10 px-4 py-3 text-oxblood bg-white focus:border-oxblood focus:ring-0 transition-colors font-bold" placeholder="123 Main St, Salem, OR" />
                    <p className="mt-2 text-[10px] font-bold text-oxblood/40 uppercase tracking-widest">
                      Providing an address allows us to research your property&apos;s history before we talk, saving you time.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-xs font-black uppercase tracking-widest text-oxblood/60 mb-2">I&apos;m Interested In...</label>
                    <select id="service" value={formData.service} onChange={(e) => handleChange('service', e.target.value)} className="w-full rounded-xl border-2 border-oxblood/10 px-4 py-3 text-oxblood bg-white focus:border-oxblood focus:ring-0 transition-colors font-bold appearance-none">
                      <option value="">Choose the closest fit...</option>
                      {serviceOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-oxblood/60 mb-2">What&apos;s Going On? *</label>
                    <textarea id="message" required rows={4} value={formData.message} onChange={(e) => handleChange('message', e.target.value)} className="w-full rounded-xl border-2 border-oxblood/10 px-4 py-3 text-oxblood bg-white focus:border-oxblood focus:ring-0 transition-colors font-bold resize-y" placeholder="Tell us what failed, what the report says, or what kind of help you need..."></textarea>
                  </div>

                  <div>
                    <label htmlFor="attachment" className="block text-xs font-black uppercase tracking-widest text-oxblood/60 mb-2">Upload FHA Letter or Inspection Report</label>
                    <input
                      ref={fileInputRef}
                      id="attachment"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleAttachmentUpload(e.target.files?.[0] ?? null)}
                      className="w-full rounded-xl border-2 border-dashed border-oxblood/30 px-4 py-3 text-sm font-bold text-slate bg-white focus:border-oxblood focus:ring-0 transition-colors"
                    />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-oxblood/40">
                      PDF preferred. Limit 3.75MB per upload.
                    </p>
                    {attachmentError && (
                      <p className="mt-2 text-sm font-black uppercase tracking-widest text-red-700">
                        {attachmentError}
                      </p>
                    )}
                    {formData.attachmentName && (
                      <div className="mt-3 flex items-center justify-between text-xs font-black uppercase tracking-widest text-oxblood">
                        <span>{formData.attachmentName} ({Math.round(formData.attachmentSize / 1024)} KB)</span>
                        <button type="button" onClick={() => handleAttachmentUpload(null)} className="text-oxblood/80 underline">
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {turnstileSiteKey ? (
                    <div>
                      <div
                        id="turnstile-widget"
                        className="min-h-16"
                        aria-label="Spam protection"
                      />
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-oxblood/40">
                        This form uses Cloudflare Turnstile to block automated spam.
                      </p>
                    </div>
                  ) : (
                    <p className="text-[10px] font-bold uppercase tracking-widest text-oxblood/40">
                      Spam protection is active on the server side for this form.
                    </p>
                  )}

                  {status === 'error' && (<div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">{errorMessage}</div>)}

                  <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full sm:w-auto font-black uppercase tracking-widest px-8">
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <Card variant="outlined" className="p-8">
                <h2 className="text-xl font-black text-charcoal mb-6 uppercase tracking-tight">What to Expect</h2>
                <ol className="list-decimal list-inside space-y-4 text-sm text-slate font-medium">
                  <li>We review the scope, photos, or repair list.</li>
                  <li>We call or text you back to confirm the real problem.</li>
                  <li>We schedule the site visit or next step.</li>
                  <li>You get a clear scope and path to completion.</li>
                </ol>
                <div className="mt-6 rounded-2xl border border-oxblood/10 bg-cream/60 p-4">
                  <div className="text-[10px] font-black uppercase tracking-widest text-oxblood/50">
                    Fastest Way To Help Us Help You
                  </div>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate">
                    Include the property address, the city, photos if you have them,
                    and whether the issue came from an inspection report, a lender, active
                    damage, or routine upkeep.
                  </p>
                </div>
              </Card>

              <Card variant="outlined" className="p-8 border-oxblood/20 bg-cream">
                <h2 className="text-lg font-semibold text-charcoal mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-oxblood" /> Have an Emergency?
                </h2>
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
                <h2 className="text-lg font-semibold text-charcoal mb-2">
                  Our Service Areas
                </h2>
                <p className="text-sm text-slate">
                  We proudly serve the Mid-Willamette Valley and Harney County.
                </p>
                <Link href="/areas" className="text-sm text-oxblood font-medium hover:text-oxblood/80 transition-colors mt-2 inline-block">
                  View Service Area Map &rarr;
                </Link>
              </Card>

              <Card variant="outlined" className="p-6">
                <h2 className="text-lg font-semibold text-charcoal mb-2">
                  Common Scope Types
                </h2>
                <ul className="space-y-2 text-sm font-medium text-slate">
                  <li>FHA, VA, appraisal, and buyer-requested repairs</li>
                  <li>Water intrusion, mold mitigation, and dry-out follow-through</li>
                  <li>Vacancy turns, board-ups, lock work, and preservation scopes</li>
                  <li>Air sealing, insulation, and weatherization corrections</li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
