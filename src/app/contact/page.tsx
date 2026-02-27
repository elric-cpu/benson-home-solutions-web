import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Benson Home Solutions for a free estimate. Call (541) 321-5115 or email office@bensonhomesolutions.com. Serving Salem, Keizer, Corvallis, Albany, and Burns.',
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-heading md:text-5xl">Contact Us</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Phone: <a href="tel:+15413215115" className="font-semibold underline">(541) 321-5115</a><br />
        Email: <a href="mailto:office@bensonhomesolutions.com" className="font-semibold underline">office@bensonhomesolutions.com</a>
      </p>
      <p className="margin-note mt-6">Scaffold — contact form coming Sprint 2.</p>
    </section>
  );
}
