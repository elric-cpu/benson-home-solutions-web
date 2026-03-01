'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { Input, Textarea, Label, Select } from '@/components/ui/Form';

const SERVICES = [
  { value: 'maintenance', label: 'Maintenance Program' },
  { value: 'water-damage', label: 'Water Damage Restoration' },
  { value: 'emergency', label: 'Emergency Response' },
  { value: 'remodeling', label: 'Remodeling & Restoration' },
  { value: 'inspection', label: 'Property Assessment' },
  { value: 'other', label: 'Other' },
];

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    const formData = new FormData(event.currentTarget);
    
    // Honeypot check
    if (formData.get('website')) {
      console.warn('Honeypot submission detected.');
      setStatus('success'); // Pretend success to bots
      return;
    }

    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(result.message);
        (event.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
        setMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection.');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">Message Sent!</h3>
        <p className="text-green-800 mb-6">{message}</p>
        <Button onClick={() => setStatus('idle')} variant="outline">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input 
          type="text" 
          name="website" 
          tabIndex={-1} 
          autoComplete="off" 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Jane"
            required
            disabled={status === 'loading'}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            required
            disabled={status === 'loading'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            required
            disabled={status === 'loading'}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(541) 555-0123"
            disabled={status === 'loading'}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">How can we help? *</Label>
        <Select
          id="service"
          name="service"
          required
          disabled={status === 'loading'}
          defaultValue=""
        >
          <option value="" disabled>
            Select a service...
          </option>
          {SERVICES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your property and what you need..."
          required
          minLength={10}
          disabled={status === 'loading'}
        />
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
          {message}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        loading={status === 'loading'}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>

      <p className="text-xs text-slate text-center">
        We typically respond within 1 business day. For emergencies, please call
        our 24/7 line at (541) 413-0480.
      </p>
    </form>
  );
}
