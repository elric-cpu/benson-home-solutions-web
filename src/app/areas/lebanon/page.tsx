import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lebanon & Sweet Home OR Maintenance & Restoration | Benson Home Solutions',
  description: 'Professional maintenance, restoration, and mitigation services for Lebanon and Sweet Home, Oregon. CCB #258533. Call (541) 321-5115.',
};

export default function LebanonAreaPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Serving Lebanon &amp; Sweet Home, Oregon</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            From the South Santiam corridor to the foothills of the Cascades, Benson Home Solutions provides reliable maintenance, restoration, and emergency services for Lebanon and Sweet Home properties.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Local Knowledge Matters</h2>
          <div className="prose prose-lg text-gray-700 space-y-4">
            <p>
              Lebanon and Sweet Home sit in the transition zone between the valley floor and the Cascade foothills. That means higher rainfall totals, steeper terrain, and properties surrounded by trees — all of which increase risk for water intrusion, drainage problems, and storm damage.
            </p>
            <p>
              Many properties in this area are on well water and septic systems, adding another layer of maintenance responsibility. Our programs account for these rural and semi-rural property realities that generic maintenance checklists miss.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Services Available</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: 'Preventive Maintenance Programs', href: '/services/maintenance' },
              { name: 'Water Damage Restoration', href: '/services/water-damage' },
              { name: 'Emergency Response (24/7)', href: '/emergency' },
              { name: 'Remodeling & Renovation', href: '/services/remodeling' },
              { name: 'Property Assessments', href: '/contact' },
              { name: 'Church Maintenance Programs', href: '/services/commercial' },
            ].map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="flex items-center gap-3 bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-colors"
              >
                <span className="text-blue-600">→</span>
                <span className="font-medium text-gray-900">{s.name}</span>
              </Link>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Communities We Serve</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {['Lebanon', 'Sweet Home', 'Scio', 'Crabtree', 'Lacomb', 'Waterloo', 'Sodaville', 'Brownsville'].map((n) => (
              <div key={n} className="text-gray-700 flex items-center gap-2">
                <span className="text-green-600">📍</span> {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Lebanon or Sweet Home Property Owner?</h2>
          <p className="text-blue-100 text-lg mb-8">We understand your local maintenance challenges. Let&apos;s talk about protecting your property.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Schedule Assessment
            </Link>
            <a href="tel:+15413215115" className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition-colors">
              Call (541) 321-5115
            </a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML=541
      />
    </main>
  );
}
