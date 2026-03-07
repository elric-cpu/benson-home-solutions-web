'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Card, CardContent } from '@/components/ui';
import { Input, Textarea, Label, Select } from '@/components/ui/Form';

const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().optional(), // Honeypot
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const SERVICES = [
  { value: 'maintenance', label: 'Maintenance Program' },
  { value: 'water-damage', label: 'Water Damage Restoration' },
  { value: 'emergency', label: 'Emergency Response' },
  { value: 'remodeling', label: 'Remodeling & Restoration' },
  { value: 'inspection', label: 'Property Assessment' },
  { value: 'other', label: 'Other' },
];

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    if (data.website) {
      // Honeypot hit - ignore submission silently
      console.warn('Honeypot hit');
      setStatus('success');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection.');
    }
  }

  if (status === 'success') {
    return (
      <Card className="border-green-100 bg-green-50 text-center">
        <CardContent className="p-12">
          <div className="mb-6 text-5xl">✅</div>
          <h3 className="mb-3 text-2xl font-black text-green-900">Message Sent!</h3>
          <p className="mb-8 text-green-800">
            We&apos;ve received your inquiry and will be in touch within 24 hours.
            For emergencies, please call our 24/7 line at (541) 413-0480.
          </p>
          <Button onClick={() => setStatus('idle')} variant="outline">
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input {...register('website')} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...register('firstName')}
            placeholder="Jane"
            aria-invalid={errors.firstName ? 'true' : 'false'}
          />
          {errors.firstName && (
            <p className="text-xs text-red-600">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            {...register('lastName')}
            placeholder="Doe"
            aria-invalid={errors.lastName ? 'true' : 'false'}
          />
          {errors.lastName && (
            <p className="text-xs text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="jane@example.com"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="(541) 555-0123"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">How can we help? *</Label>
        <Select
          id="service"
          {...register('service')}
          aria-invalid={errors.service ? 'true' : 'false'}
        >
          <option value="">Select a service...</option>
          {SERVICES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
        {errors.service && (
          <p className="text-xs text-red-600">{errors.service.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your Message *</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Tell us about your property needs..."
          aria-invalid={errors.message ? 'true' : 'false'}
          rows={4}
        />
        {errors.message && (
          <p className="text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      {status === 'error' && (
        <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" loading={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>

      <p className="text-muted-foreground text-center text-xs">
        We respect your privacy. All inquiries are handled with strict confidentiality.
      </p>
    </form>
  );
}
