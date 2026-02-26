import Link from 'next/link';
import { BUSINESS, SERVICES, SERVICE_AREAS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/80">
      {/* CTA Strip */}
      <div className="bg-primary">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-bold text-cream">Ready to get started?</h2>
            <p className="mt-1 text-cream/80">Call now for a free estimate or schedule online.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-cream px-6 font-bold text-primary no-underline transition-colors hover:bg-cream-dark"
            >
              {BUSINESS.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] border-2 border-cream px-6 font-bold text-cream no-underline transition-colors hover:bg-cream/10"
            >
              Get Estimate
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Company */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-cream">Benson Home Solutions</h3>
          <p className="mb-3 text-sm leading-relaxed">
            Licensed, bonded, and insured Oregon contractor specializing in maintenance, restoration, and remodeling.
          </p>
          <p className="text-sm font-semibold text-cream">{BUSINESS.license}</p>
          <div className="mt-4 space-y-1 text-sm">
            <p>Phone: <a href={`tel:${BUSINESS.phoneRaw}`} className="text-cream/80 no-underline hover:text-cream">{BUSINESS.phone}</a></p>
            <p>Emergency: <a href={`tel:${BUSINESS.emergencyPhoneRaw}`} className="text-cream/80 no-underline hover:text-cream">{BUSINESS.emergencyPhone}</a></p>
            <p>Email: <a href={`mailto:${BUSINESS.email}`} className="text-cream/80 no-underline hover:text-cream">{BUSINESS.email}</a></p>
          </div>
        </div>

        {/* Column 2: Services */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-cream">Services</h3>
          <ul className="space-y-2 text-sm">
            {SERVICES.slice(0, 8).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="text-cream/70 no-underline transition-colors hover:text-cream">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Service Areas */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-cream">Areas We Serve</h3>
          <ul className="space-y-2 text-sm">
            {SERVICE_AREAS.primary.map((area) => (
              <li key={area.slug}>
                <Link href={`/areas/${area.slug}`} className="text-cream/70 no-underline transition-colors hover:text-cream">
                  {area.city}, {area.state}
                </Link>
              </li>
            ))}
            <li className="pt-1 text-cream/50">+ {BUSINESS.address.zip} &amp; 75-mile radius</li>
          </ul>
        </div>

        {/* Column 4: Resources */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-cream">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/true-cost-calculator" className="text-cream/70 no-underline hover:text-cream">True Cost Calculator</Link></li>
            <li><Link href="/cost-estimator" className="text-cream/70 no-underline hover:text-cream">Cost Estimator</Link></li>
            <li><Link href="/methodology" className="text-cream/70 no-underline hover:text-cream">Our Methodology</Link></li>
            <li><Link href="/about" className="text-cream/70 no-underline hover:text-cream">About Us</Link></li>
            <li><Link href="/contact" className="text-cream/70 no-underline hover:text-cream">Contact</Link></li>
          </ul>
          <div className="mt-6">
            <h4 className="mb-2 text-sm font-bold text-cream">Hours</h4>
            <p className="text-xs text-cream/60">Mon–Fri: {BUSINESS.hours.weekday}</p>
            <p className="text-xs text-cream/60">Saturday: {BUSINESS.hours.saturday}</p>
            <p className="text-xs text-cream/60">Emergency: {BUSINESS.hours.emergency}</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-cream/50 sm:flex-row">
          <p>&copy; {currentYear} {BUSINESS.name}. All rights reserved.</p>
          <p>{BUSINESS.license} &middot; Serving Oregon since 2014</p>
        </div>
      </div>
    </footer>
  );
}
