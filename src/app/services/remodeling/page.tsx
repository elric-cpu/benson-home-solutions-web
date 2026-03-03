import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Remodeling & Restoration | Benson Home Solutions',
  description:
    'Professional remodeling and restoration services for the Mid-Willamette Valley. Post-damage reconstruction, kitchen and bathroom remodels, and structural repairs. CCB #258533.',
};

const serviceTypes = [
  {
    title: 'Post-Damage Reconstruction',
    desc: 'After water damage, fire, or storm events, we handle the full reconstruction process. From structural repairs to finish work, we restore your property to pre-loss condition or better.',
    items: [
      'Structural framing repairs',
      'Drywall and finish work',
      'Flooring replacement',
      'Cabinet and fixture installation',
      'Insurance claim documentation',
    ],
  },
  {
    title: 'Kitchen Remodeling',
    desc: 'Functional, durable kitchen renovations designed for how you actually use your kitchen. We focus on quality materials, efficient layouts, and craftsmanship that lasts.',
    items: [
      'Layout optimization',
      'Cabinet installation',
      'Countertop replacement',
      'Plumbing and fixture upgrades',
      'Flooring and backsplash',
    ],
  },
  {
    title: 'Bathroom Remodeling',
    desc: 'Bathroom renovations that prioritize waterproofing, ventilation, and durability. Every bathroom we touch is built to resist the moisture problems that plague Oregon homes.',
    items: [
      'Shower and tub replacement',
      'Tile work and waterproofing',
      'Vanity and fixture upgrades',
      'Ventilation improvements',
      'Accessibility modifications',
    ],
  },
  {
    title: 'Structural Repairs',
    desc: 'Foundation issues, rotted framing, load-bearing wall modifications. We tackle the structural problems that other contractors avoid, with proper engineering and permits.',
    items: [
      'Foundation repair',
      'Framing and load-bearing work',
      'Dry rot remediation',
      'Crawlspace repair',
      'Seismic retrofitting',
    ],
  },
];

export default function RemodelingPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-blue-900 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Remodeling &amp; Restoration
          </h1>
          <p className="text-xl leading-relaxed text-blue-100">
            From post-damage reconstruction to planned renovations, we deliver
            quality craftsmanship with the documentation and communication you
            deserve.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-bold text-gray-900">What We Do</h2>
          <div className="space-y-10">
            {serviceTypes.map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-gray-200 bg-white p-6"
              >
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="mb-4 text-gray-600">{service.desc}</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="text-blue-600">\u2713</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Our Remodeling Process
          </h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Consultation & Scope',
                desc: 'We walk your project, discuss your goals and budget, and define a clear scope of work.',
              },
              {
                step: '2',
                title: 'Detailed Proposal',
                desc: 'You receive a written proposal with line-item pricing, material specifications, and a project timeline.',
              },
              {
                step: '3',
                title: 'Permits & Prep',
                desc: 'We pull all required permits, order materials, and prep the work area before construction begins.',
              },
              {
                step: '4',
                title: 'Construction',
                desc: 'Our crew executes the work with daily cleanup and regular progress updates. No surprises.',
              },
              {
                step: '5',
                title: 'Final Walkthrough',
                desc: 'We walk the completed project with you, address any punch-list items, and ensure your satisfaction.',
              },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900">{s.title}</h3>
                  <p className="text-gray-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Start Your Project?
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            Tell us about your remodeling or restoration needs. We will provide
            a detailed proposal with no obligation.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-900 transition-colors hover:bg-blue-50"
            >
              Request a Proposal
            </Link>
            <a
              href="tel:+15413215115"
              className="inline-block rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-blue-900"
            >
              Call (541) 321-5115
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
