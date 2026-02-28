import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Methodology | Benson Home Solutions',
  description: 'Learn about our 5-phase preventive maintenance methodology. We stop damage before it starts through systematic inspections, documentation, and proactive care.',
};

const phases = [
  {
    number: '01',
    title: 'Assessment & Documentation',
    desc: 'Every engagement starts with a thorough property assessment. We document current conditions with photos, identify deferred maintenance items, and create a prioritized action plan based on risk and cost.',
    details: [
      'Full exterior and interior inspection',
      'Photo documentation of all findings',
      'Risk-prioritized maintenance schedule',
      'Estimated costs for each item',
    ],
  },
  {
    number: '02',
    title: 'Critical Repairs',
    desc: 'We address the highest-risk items first — active leaks, safety hazards, and issues that will cause compounding damage if left unresolved. This stabilizes the property and prevents further deterioration.',
    details: [
      'Active leak and water intrusion repairs',
      'Safety hazard remediation',
      'Structural concern stabilization',
      'Insurance documentation when applicable',
    ],
  },
  {
    number: '03',
    title: 'Preventive Maintenance Program',
    desc: 'Once critical items are resolved, we establish a recurring maintenance schedule tailored to your property. Seasonal inspections, gutter cleaning, HVAC filter changes, caulking — the small tasks that prevent big failures.',
    details: [
      'Seasonal inspection schedule',
      'Gutter and drainage maintenance',
      'Exterior envelope checks (caulking, flashing, siding)',
      'HVAC and mechanical system basics',
    ],
  },
  {
    number: '04',
    title: 'Monitoring & Reporting',
    desc: 'After each visit, you receive a documented report with photos, completed tasks, and any new issues discovered. Over time, this creates a complete maintenance history for your property — invaluable for insurance claims, resale, and budgeting.',
    details: [
      'Post-visit reports with photos',
      'Maintenance history tracking',
      'Budget forecasting for upcoming needs',
      'Insurance-ready documentation',
    ],
  },
  {
    number: '05',
    title: 'Emergency Response',
    desc: 'When the unexpected happens — a pipe bursts, a tree falls, a storm causes damage — our emergency line gets you rapid response. Because we already know your property, we can act faster and smarter than a cold-call contractor.',
    details: [
      'After-hours emergency line: (541) 413-0480',
      'Rapid mobilization for active damage',
      'Water extraction and drying',
      'Insurance liaison and documentation',
    ],
  },
];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Methodology</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Most property damage is preventable. Our 5-phase approach combines systematic inspections, proactive maintenance, and rapid emergency response to protect your investment.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem We Solve</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              The average homeowner spends <strong>1–4% of their home&apos;s value annually</strong> on maintenance and repairs — often reactively, after damage has already occurred. A $5 tube of caulk applied in September prevents a $15,000 water damage claim in January. Our methodology is built around this principle: <strong>systematic prevention costs a fraction of emergency repair</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Phases */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">The 5-Phase Approach</h2>
          <div className="space-y-12">
            {phases.map((phase) => (
              <div key={phase.number} className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-blue-600 shrink-0">{phase.number}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{phase.title}</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{phase.desc}</p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {phase.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-gray-600">
                          <span className="text-blue-600 mt-1">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why This Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { stat: '80%', label: 'of water damage claims are preventable with regular maintenance' },
              { stat: '3–5x', label: 'return on investment for preventive maintenance vs. reactive repairs' },
              { stat: '40%', label: 'reduction in emergency callouts for properties on maintenance programs' },
              { stat: '100%', label: 'of our maintenance visits include photo documentation' },
            ].map((item) => (
              <div key={item.label} className="bg-blue-50 rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-blue-900 mb-2">{item.stat}</p>
                <p className="text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Protecting Your Property</h2>
          <p className="text-blue-100 text-lg mb-8">
            Schedule your initial assessment and find out what your property needs — before it becomes an emergency.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Schedule an Assessment
          </a>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Our Methodology — Benson Home Solutions',
            description: '5-phase preventive maintenance methodology for residential and commercial properties.',
            url: 'https://bensonhomesolutions.com/methodology',
            publisher: {
              '@type': 'HomeAndConstructionBusiness',
              name: 'Benson Home Solutions',
            },
          }),
        }}
      />
    </main>
  );
}
