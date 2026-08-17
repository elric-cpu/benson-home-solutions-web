'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { services } from '@/lib/service-catalog';
import { Captcha } from '@/components/forms/Captcha';

type FormState = {
  name: string; phone: string; email: string; location: string; service: string; description: string; preferred: string;
};

const initial: FormState = { name: '', phone: '', email: '', location: '', service: '', description: '', preferred: 'phone' };

export default function RequestEstimatePage() {
  const [form, setForm] = useState<FormState>(initial);
  const [captcha, setCaptcha] = useState(false);
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [error, setError] = useState('');

  function set<K extends keyof FormState>(key: K, value: FormState[K]) { setForm(current => ({ ...current, [key]: value })); }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!captcha) return;
    setStatus('sending'); setError('');
    const message = `Property/address or location: ${form.location}\nPreferred contact: ${form.preferred}\n\nProject description:\n${form.description}`;
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: form.service, message }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Unable to submit the request.');
      setStatus('success'); setForm(initial);
    } catch (err) { setStatus('error'); setError(err instanceof Error ? err.message : 'Unable to submit the request.'); }
  }

  return <>
    <section className="bg-[#F5F1E8]"><div className="mx-auto max-w-6xl px-5 py-14 md:py-20"><p className="font-semibold uppercase tracking-[0.16em] text-[#722F37]">Project Intake</p><h1 className="mt-3 max-w-4xl text-4xl font-bold text-[#4A1F24] md:text-6xl">Request an estimate or project review.</h1><p className="mt-5 max-w-3xl text-lg leading-8">Give us enough information to understand the property, the problem, and the route. Photos can be requested securely after the initial submission when they will help with scoping.</p></div></section>
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
      <div>
        {status === 'success' ? <div className="rounded-xl border border-[#722F37]/20 bg-[#F5F1E8] p-8"><h2 className="text-2xl font-bold text-[#4A1F24]">Request received.</h2><p className="mt-3 leading-7">We have the project basics. If photos, dimensions, documents, or a site visit will help, the next response can establish that step.</p><button className="mt-6 font-semibold text-[#722F37] underline" onClick={() => setStatus('idle')}>Submit another project</button></div> :
        <form onSubmit={submit} className="space-y-6" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" required><input required autoComplete="name" value={form.name} onChange={e => set('name', e.target.value)} className="input" /></Field>
            <Field label="Phone" required><input required type="tel" autoComplete="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className="input" /></Field>
            <Field label="Email" required><input required type="email" autoComplete="email" value={form.email} onChange={e => set('email', e.target.value)} className="input" /></Field>
            <Field label="Property address or location" required><input required autoComplete="street-address" value={form.location} onChange={e => set('location', e.target.value)} className="input" placeholder="Address, town, ranch, or route location" /></Field>
          </div>
          <Field label="Service needed" required><select required value={form.service} onChange={e => set('service', e.target.value)} className="input"><option value="">Select the closest service</option>{services.map(service => <option key={service.slug} value={service.title}>{service.title}</option>)}<option>Other / multiple services</option></select></Field>
          <Field label="Project description" required><textarea required minLength={10} rows={7} value={form.description} onChange={e => set('description', e.target.value)} className="input" placeholder="What happened, what needs attention, timing, access, and any known constraints." /></Field>
          <fieldset><legend className="mb-2 font-semibold text-[#4A1F24]">Preferred contact method</legend><div className="flex flex-wrap gap-5">{['phone','text','email'].map(option => <label key={option} className="flex items-center gap-2"><input type="radio" name="preferred" value={option} checked={form.preferred === option} onChange={e => set('preferred', e.target.value)} /> <span className="capitalize">{option}</span></label>)}</div></fieldset>
          <Captcha onVerify={setCaptcha} />
          {status === 'error' && <div role="alert" className="rounded-md border border-red-300 bg-red-50 p-4 text-red-900">{error}</div>}
          <button type="submit" disabled={!captcha || status === 'sending'} className="rounded-md bg-[#722F37] px-7 py-3.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{status === 'sending' ? 'Sending…' : 'Send Project Request'}</button>
        </form>}
      </div>
      <aside className="h-fit rounded-xl border border-[#722F37]/15 bg-[#FAF8F3] p-6"><h2 className="text-xl font-bold text-[#4A1F24]">What helps</h2><ul className="mt-4 space-y-3 leading-7"><li>Exact property location</li><li>A short description of what is happening now</li><li>Useful measurements when known</li><li>Gate, road, occupant, or access constraints</li><li>Insurance involvement if this is a loss</li><li>Whether the condition is urgent or route-flexible</li></ul><h2 className="mt-8 text-xl font-bold text-[#4A1F24]">Prefer to call?</h2><a className="mt-2 block font-semibold text-[#722F37]" href={`tel:${BUSINESS.phoneHref}`}>{BUSINESS.phone}</a><p className="mt-6 text-sm leading-6">For fire, medical emergencies, downed power lines, active gas hazards, or an unsafe structure presenting immediate danger, contact emergency services or the responsible utility first.</p><Link href="/privacy" className="mt-5 inline-block text-sm font-semibold text-[#722F37] underline">Privacy policy</Link></aside>
    </section>
    <style jsx global>{`.input{width:100%;border:1px solid rgba(114,47,55,.25);border-radius:.5rem;background:#fff;padding:.75rem 1rem;color:#2D2D2D;outline:none}.input:focus{border-color:#722F37;box-shadow:0 0 0 2px rgba(114,47,55,.15)}`}</style>
  </>;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block font-semibold text-[#4A1F24]">{label}{required ? ' *' : ''}</span>{children}</label>;
}
