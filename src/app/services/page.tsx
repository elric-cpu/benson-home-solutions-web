import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services | Benson Home Solutions — Maintenance, Restoration & Mitigation',
  description: 'Explore our full range of maintenance, restoration, and mitigation services for residential and commercial properties in the Mid-Willamette Valley.',
};

const services = [
  {
    title: 'Maintenance Programs',
    href: '/services/maintenance',
    desc: 'Scheduled preventive maintenance that catches small issues before they become expensive emergencies. Customized plans for homes, commercial buildings, and churches.',
    icon: '🛡️',
    features: ['Seasonal inspections', 'Gutter & drainage maintenance', 'Exterior envelope checks', 'HVAC basics', 'Photo documentation'],
  },
  {
    title: 'Water Damage Restoration',
    href: '/services/water-damage',
    desc: 'Fast-response water extraction, structural drying, and complete restoration. We handle everything from burst pipes to storm flooding — plus insurance documentation.',
    icon: '💧',
    features: ['Emergency water extraction', 'Structural drying', 'Mold prevention', 'Reconstruction', 'Insurance documentation'],
  },
  {
    title: 'Emergency Response',
    href: '/emergency',
    desc: 'When disaster strikes, call our 24/7 emergency line. We mobilize fast to stop active damage, secure your property, and begin restoration immediately.',
    icon: '🚨',
    features: ['24/7 availability', 'Rapid mobilization', 'Storm damage response', 'Board-up & tarping', 'Temporary repairs'],
  },
  {
    title: 'Remodeling & Restoration',
    href: '/services/remodeling',
    desc: 'From post-damage reconstruction to planned renovations, we deliver quality craftsmanship. Kitchens, bathrooms, structural repairs, and full-property renovations.',
    icon: '🔨',
    features: ['Kitchen & bathroom remodels', 'Post-damage reconstruction', 'Structural repairs', 'Accessibility modifications', 'Energy efficiency upgrades'],
  },
  {
    title: 'Commercial & Church Maintenance',
    href: '/services/commercial',
    desc: 'Specialized maintenance programs for commercial buildings and houses of worship. We understand the unique needs of institutional properties — from steeple repairs to parking lot drainage.',
    icon: '🏢',
    features: ['Commercial property maintenance', 'Church & worship facility care', 'Multi-unit residential', 'SLA-based service agreements', 'Budget forecasting'],
  },
  {
    title: 'Property Assessments',
    href: '/contact',
    desc: 'Not sure where to start? Our comprehensive property assessment documents current conditions, identifies risks, and prioritizes maintenance needs by urgency and cost.',
    icon: '📋',
    features: ['Full property walkthrough', 'Photo documentation', 'Prioritized action plan', 'Cost estimates', 'Maintenance schedule recommendation'],
  },
];

import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { BUSINESS } from '@/lib/constants';

export default function ServicesPage() {
  const breadcrumbs = [
    { name: 'Home', url: BUSINESS.url },
    { name: 'Services', url: `${BUSINESS.url}/services` },
  ];

  return (
    <main className="min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />
      {/* Hero */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Comprehensive maintenance, restoration, and mitigation services for residential and commercial properties across the Mid-Willamette Valley.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <span className="text-3xl mb-4 block">{service.icon}</span>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.desc}</p>
                <ul className="space-y-1">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="text-blue-600">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Not Sure What You Need?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Start with a free property assessment. We&apos;ll document conditions, identify risks, and recommend next steps — no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Assessment
            </Link>
            <a
              href="tel:+15413215115"
              className="inline-block border-2 border-blue-600 text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              Call (541) 321-5115
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Services — Benson Home Solutions',
            description: 'Maintenance, restoration, and mitigation services for the Mid-Willamette Valley.',
            url: 'https://bensonhomesolutions.com/services',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: services.map((s, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: s.title,
                url: `https://bensonhomesolutions.com${s.href}`,
              })),
            },
          }),
        }}
      />
    </main>
  );
}
