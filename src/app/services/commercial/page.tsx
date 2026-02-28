import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Commercial & Church Maintenance | Benson Home Solutions',
  description: 'Specialized maintenance programs for commercial buildings, churches, and institutional properties in the Mid-Willamette Valley. SLA-based service. CCB #258533.',
};

export default function CommercialPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Commercial &amp; Church Maintenance</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Institutional properties have unique maintenance demands. We offer SLA-based programs designed for commercial buildings, houses of worship, and multi-unit residential properties.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Property Types We Serve</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '\u26EA',
                title: 'Churches & Worship Facilities',
                desc: 'From historic sanctuaries to modern fellowship halls, we understand the unique maintenance challenges of worship facilities: aging roofs, stained glass care, fellowship kitchen maintenance, parking lot drainage, and ADA compliance.',
              },
              {
                icon: '\uD83C\uDFE2',
                title: 'Commercial Buildings',
                desc: 'Office buildings, retail spaces, and mixed-use properties. We maintain building envelopes, coordinate vendor services, and keep your facility presentable and functional for tenants and customers.',
              },
              {
                icon: '\uD83C\uDFE0',
                title: 'Multi-Unit Residential',
                desc: 'Apartment complexes, duplexes, and rental portfolios. We help landlords and property managers maintain multiple units efficiently with scheduled maintenance rotations.',
              },
            ].map((type) => (
              <div key={type.title} className="bg-white border border-gray-200 rounded-lg p-6">
                <span className="text-3xl mb-3 block">{type.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Level Agreements</h2>
          <p className="text-gray-700 text-lg mb-8">
            Our commercial maintenance programs include clear SLAs so you know exactly what to expect:
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Response Times', items: ['Emergency: 2-4 hour response', 'Urgent: Same business day', 'Routine: Scheduled within 5 business days', 'Preventive: Per maintenance calendar'] },
              { title: 'Documentation', items: ['Post-visit photo reports', 'Annual condition assessments', 'Capital expenditure forecasting', 'Insurance-ready documentation'] },
              { title: 'Communication', items: ['Dedicated point of contact', 'Scheduled check-in meetings', 'Digital maintenance portal', 'Real-time emergency updates'] },
              { title: 'Scope', items: ['Building envelope maintenance', 'Interior common area upkeep', 'Vendor coordination', 'Emergency board-up and tarping'] },
            ].map((sla) => (
              <div key={sla.title} className="bg-white rounded-lg p-5 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3">{sla.title}</h3>
                <ul className="space-y-2">
                  {sla.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-blue-600 mt-0.5">\u2713</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Church-specific */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Church Maintenance Expertise</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Churches face maintenance challenges that residential contractors often do not understand: high ceilings and roof systems, large gathering spaces with heavy foot traffic, commercial kitchens, aging plumbing in historic buildings, and the need to maintain a welcoming environment on a limited budget.
            </p>
            <p className="text-gray-700">
              We work with church boards and facility committees to create maintenance programs that fit within annual budgets while protecting the building from the deferred maintenance that plagues so many worship facilities. Our documentation helps boards make informed decisions about capital projects and long-term facility planning.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Let\u2019s Discuss Your Facility</h2>
          <p className="text-blue-100 text-lg mb-8">
            Every commercial or institutional property is different. Contact us for a facility assessment and a customized maintenance proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Request Facility Assessment
            </Link>
            <a href="tel:+15413215115" className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition-colors">
              Call (541) 321-5115
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
