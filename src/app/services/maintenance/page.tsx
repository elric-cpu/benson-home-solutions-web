import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Maintenance Programs | Benson Home Solutions',
  description: 'Preventive maintenance programs for homes, commercial buildings, and churches in the Mid-Willamette Valley. Stop damage before it starts. CCB #258533.',
};

const tiers = [
  {
    name: 'Essential',
    frequency: '2 visits/year',
    desc: 'Spring and fall inspections with basic maintenance tasks. Ideal for newer homes or properties in good condition.',
    includes: [
      'Bi-annual property inspection',
      'Gutter cleaning (2x)',
      'Exterior envelope check',
      'Photo documentation report',
      'Priority scheduling for repairs',
    ],
  },
  {
    name: 'Comprehensive',
    frequency: '4 visits/year',
    desc: 'Quarterly visits covering seasonal maintenance needs. Our most popular program for established homes.',
    includes: [
      'Everything in Essential',
      'Quarterly inspections',
      'HVAC filter changes',
      'Caulking and sealant touch-ups',
      'Drainage system checks',
      'Minor repair allowance',
      'Annual maintenance budget forecast',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    frequency: 'Monthly visits',
    desc: 'Full-service property care for high-value homes, multi-unit properties, or buildings with complex systems.',
    includes: [
      'Everything in Comprehensive',
      'Monthly property visits',
      'Vendor coordination',
      'Emergency priority response',
      'Insurance documentation package',
      'Capital planning assistance',
      'Dedicated account manager',
    ],
  },
];

export default function MaintenancePage() {
  return (
    <main className="min-h-screen">
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Maintenance Programs</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Most property damage is preventable. Our maintenance programs combine scheduled inspections, proactive repairs, and detailed documentation to protect your investment year-round.
          </p>
        </div>
      </section>

      {/* Why Maintenance */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Preventive Maintenance?</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700 text-lg">
              <strong>The math is simple:</strong> A $200 annual gutter cleaning prevents $8,000 in water damage repairs. A $150 caulking touchup prevents $12,000 in siding replacement. Preventive maintenance costs 3-5x less than reactive repairs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '\uD83D\uDCCA', title: 'Documented History', desc: 'Every visit produces a photo-documented report. Build a complete maintenance record for insurance and resale.' },
              { icon: '\u23F0', title: 'Seasonal Timing', desc: 'We schedule tasks when they matter most. Gutter cleaning before fall rains. HVAC checks before summer heat.' },
              { icon: '\uD83D\uDD27', title: 'Catch Issues Early', desc: 'Small problems found during inspections get fixed immediately, before they become emergencies.' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Maintenance Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-lg p-6 shadow-sm ${
                  tier.popular ? 'ring-2 ring-blue-600 relative' : ''
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-3">{tier.frequency}</p>
                <p className="text-gray-600 mb-4">{tier.desc}</p>
                <ul className="space-y-2 mb-6">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 mt-0.5">\u2713</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center font-semibold py-2 px-4 rounded-lg transition-colors ${
                    tier.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-6">
            All plans are customized to your property. Contact us for a tailored quote.
          </p>
        </div>
      </section>

      {/* Seasonal Schedule */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Seasonal Maintenance Schedule</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { season: 'Spring', tasks: ['Roof inspection after winter', 'Gutter cleaning', 'Exterior caulking check', 'Foundation drainage review', 'Window and door seal inspection'] },
              { season: 'Summer', tasks: ['HVAC efficiency check', 'Exterior paint/stain assessment', 'Deck and patio maintenance', 'Irrigation system check', 'Pest entry point sealing'] },
              { season: 'Fall', tasks: ['Gutter cleaning (pre-rain)', 'Furnace/heating prep', 'Weatherstripping replacement', 'Downspout and drainage clearing', 'Chimney and flue inspection'] },
              { season: 'Winter', tasks: ['Storm damage monitoring', 'Ice dam prevention', 'Emergency response readiness', 'Interior moisture checks', 'Pipe freeze prevention'] },
            ].map((s) => (
              <div key={s.season} className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-3">{s.season}</h3>
                <ul className="space-y-1">
                  {s.tasks.map((t) => (
                    <li key={t} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-blue-600">\u2022</span> {t}
                    </li>
                  ))}
                </ul>
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
            Every maintenance program begins with a free property assessment. We\u2019ll document your property\u2019s current condition and recommend the right plan.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Schedule Free Assessment
          </Link>
        </div>
      </section>
    </main>
  );
}
