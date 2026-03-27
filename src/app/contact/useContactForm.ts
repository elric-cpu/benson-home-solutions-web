'use client';

import { useState, useRef, useEffect } from 'react';
import type { WindowWithTurnstile } from './turnstile.d';
import { MAX_ATTACHMENT_SIZE_BYTES } from '@/lib/constants';

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

export function useContactForm() {
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
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
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
      if (
        normalized === 'inspection repairs' ||
        normalized === 'inspection-repairs'
      ) {
        setFormData((prev) => ({ ...prev, service: 'Inspection Repairs' }));
      } else if (
        normalized === 'commercial' ||
        normalized === 'commercial maintenance' ||
        normalized === 'commercial-maintenance'
      ) {
        setFormData((prev) => ({ ...prev, service: 'Commercial Maintenance' }));
      } else if (
        normalized === 'maintenance plan' ||
        normalized === 'maintenance-plan'
      ) {
        setFormData((prev) => ({ ...prev, service: 'Maintenance Plan' }));
      } else if (
        normalized === 'water damage' ||
        normalized === 'mold' ||
        normalized === 'water damage / mold / moisture'
      ) {
        setFormData((prev) => ({
          ...prev,
          service: 'Water Damage / Mold / Moisture',
        }));
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

      const turnstile = (window as WindowWithTurnstile).turnstile;

      const container = document.getElementById('turnstile-widget');

      if (!turnstile || !container) return;

      if (container.childElementCount > 0 && !turnstileWidgetId.current) return;

      if (turnstileWidgetId.current) {
        try {
          turnstile.remove(turnstileWidgetId.current);
        } catch {
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
      if ((window as WindowWithTurnstile).turnstile) {
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
      const turnstile = (window as WindowWithTurnstile).turnstile;
      if (turnstile && turnstileWidgetId.current) {
        turnstile.reset(turnstileWidgetId.current);
      }
    }, 100);
  };

  const handleChange = (
    field: keyof Omit<FormData, 'duration'>,
    value: string,
  ) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
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
        throw new Error(
          data.error || 'Something went wrong. Please try again.',
        );
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
        err instanceof Error ? err.message : 'Something went wrong.',
      );
    }
  };

  return {
    formData,
    status,
    errorMessage,
    submittedName,
    attachmentError,
    fileInputRef,
    turnstileSiteKey,
    serviceOptions,
    handleChange,
    handleAttachmentUpload,
    handleSubmit,
    resetForm,
  };
}