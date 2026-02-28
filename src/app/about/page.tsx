import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Benson Home Solutions | Maintenance, Restoration & Mitigation',
  description: 'Learn about Benson Home Solutions — a licensed maintenance, restoration, and mitigation company serving the Mid-Willamette Valley. CCB #258533.',
  openGraph: {
    title: 'About Benson Home Solutions',
    description: 'Licensed maintenance, restoration, and mitigation services for the Mid-Willamette Valley.',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Benson Home Solutions</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            We protect the places where people live, work, and gather. Our team specializes in preventive maintenance, damage restoration, and emergency mitigation across the Mid-Willamette Valley.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Benson Home Solutions was founded on a simple observation: most property damage is preventable. Leaking roofs, failing gutters, deferred maintenance on HVAC systems — these small neglected items become five-figure insurance claims. We built a company around stopping that cycle.
            </p>
            <p>
              Based in the Mid-Willamette Valley, we serve homeowners, property managers, commercial building operators, and churches across Albany, Salem, Lebanon, Corvallis, and surrounding communities. Our approach combines scheduled preventive maintenance with rapid-response restoration when the unexpected happens.
            </p>
            <p>
              Every project is led by Elric Benson, who brings hands-on construction experience and a systems-level understanding of how buildings fail — and how to keep them from failing in the first place.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Prevention Over Reaction',
                desc: 'We believe the best restoration job is the one that never has to happen. Our maintenance programs catch small issues before they become emergencies.',
                icon: '🛡️',
              },
              {
                title: 'Documentation & Transparency',
                desc: 'Every inspection, every repair, every recommendation is documented with photos and reports. You always know exactly what was done and why.',
                icon: '📋',
              },
              {
                title: 'Rapid Response',
                desc: 'When emergencies happen, response time matters. Our after-hours emergency line connects you to a real person who can mobilize within hours, not days.',
                icon: '⚡',
              },
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-lg p-6 shadow-sm">
                <span className="text-3xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Licensed, Bonded & Insured</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Oregon Construction Contractors Board — <strong>CCB #258533</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>General liability and workers&apos; compensation insurance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Documented processes for insurance claim support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span>Serving residential, commercial, and institutional properties</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Area</h2>
          <p className="text-gray-700 text-lg mb-6">
            We serve the entire Mid-Willamette Valley, including:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Albany & Millersburg',
              'Salem & Keizer',
              'Lebanon & Sweet Home',
              'Corvallis & Philomath',
              'Jefferson & Scio',
              'Stayton & Sublimity',
              'Dallas & Monmouth',
              'Independence & Silverton',
            ].map((area) => (
              <div key={area} className="flex items-center gap-2 text-gray-700">
                <span className="text-green-600">📍</span>
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Property?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Whether you need a maintenance program, emergency restoration, or just want an honest assessment of your property&apos;s condition — we&apos;re here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="tel:+15413215115"
              className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition-colors"
            >
              Call (541) 321-5115
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML=541
      />
    </main>
  );
}
