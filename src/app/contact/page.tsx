import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Benson Home Solutions | (541) 321-5115',
  description: 'Contact Benson Home Solutions for maintenance, restoration, and mitigation services in the Mid-Willamette Valley. Call (541) 321-5115 or reach our emergency line 24/7.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100">
            Ready to protect your property? Reach out for a free assessment, ask a question, or report an emergency.
          </p>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-red-600 text-white py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-semibold">
            🚨 Active Emergency? Call now:{' '}
            <a href="tel:+15414130480" className="underline font-bold">
              (541) 413-0480
            </a>{' '}
            — Available 24/7
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    What do you need help with?
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a service...</option>
                    <option value="maintenance">Maintenance Program</option>
                    <option value="water-damage">Water Damage Restoration</option>
                    <option value="emergency">Emergency Response</option>
                    <option value="remodeling">Remodeling &amp; Restoration</option>
                    <option value="inspection">Property Assessment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your property and what you need..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
                <p className="text-sm text-gray-500">
                  We typically respond within 1 business day. For emergencies, please call directly.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📞</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Office Phone</h3>
                      <a href="tel:+15413215115" className="text-blue-600 hover:underline text-lg">
                        (541) 321-5115
                      </a>
                      <p className="text-gray-500 text-sm">Mon–Fri, 8am–5pm</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">🚨</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Emergency Line</h3>
                      <a href="tel:+15414130480" className="text-red-600 hover:underline text-lg font-semibold">
                        (541) 413-0480
                      </a>
                      <p className="text-gray-500 text-sm">24/7 — Active water damage, storm damage, emergencies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <a href="mailto:office@bensonhomesolutions.com" className="text-blue-600 hover:underline">
                        office@bensonhomesolutions.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Service Area</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    We serve the entire Mid-Willamette Valley, including:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-gray-600">
                    {[
                      'Albany',
                      'Salem & Keizer',
                      'Lebanon',
                      'Sweet Home',
                      'Corvallis',
                      'Philomath',
                      'Jefferson',
                      'Scio',
                      'Stayton',
                      'Dallas',
                    ].map((city) => (
                      <span key={city} className="flex items-center gap-1">
                        <span className="text-green-600 text-sm">📍</span> {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Credentials</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>CCB #258533</strong> — Licensed, bonded, and insured by the Oregon Construction Contractors Board.
                  </p>
                </div>
              </div>
            </div>
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
