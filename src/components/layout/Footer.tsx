import Link from 'next/link';
import { Container } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { Phone, Mail } from 'lucide-react';

const footerNav = {
  services: [
    { name: 'Inspection Repairs', href: '/contact' },
    { name: 'Water & Mold Work', href: '/emergency' },
    { name: 'Property Preservation', href: '/contact' },
    { name: 'Energy & Weatherization', href: '/contact' },
    { name: 'Emergency Repairs', href: '/emergency' },
    { name: 'All Plans', href: '/plans' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'How We Work', href: '/methodology' },
    { name: 'Service Areas', href: '/areas' },
    { name: 'Emergency Response', href: '/emergency' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  resources: [
    { name: 'FAQ', href: '/#faq' },
    { name: 'True Cost Builder', href: '/tools/project-builder' },
    { name: 'Rot Risk Calculator', href: '/tools/cost-calculator' },
    { name: 'Asset Reserve Planner', href: '/tools/cost-estimator' },
    { name: 'Areas We Serve', href: '/areas' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/90">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="text-cream text-xl font-bold">
                {BUSINESS.name}
              </Link>
              <p className="text-cream/70 mt-3 text-sm leading-relaxed">
                Post-inspection repairs, water damage restoration, property
                preservation, maintenance, and weatherization for the
                Mid-Willamette Valley and Harney County.
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="text-cream/80 hover:text-cream flex items-center gap-2 transition-colors"
                >
                  <Phone className="h-4 w-4" /> {BUSINESS.phone}
                </a>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-cream/80 hover:text-cream flex items-center gap-2 transition-colors"
                >
                  <Mail className="h-4 w-4" /> {BUSINESS.email}
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-cream text-sm font-semibold tracking-wider uppercase">
                Services
              </h3>
              <ul className="mt-3 space-y-2">
                {footerNav.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-cream/70 hover:text-cream text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-cream text-sm font-semibold tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-3 space-y-2">
                {footerNav.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-cream/70 hover:text-cream text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-cream text-sm font-semibold tracking-wider uppercase">
                Resources
              </h3>
              <ul className="mt-3 space-y-2">
                {footerNav.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-cream/70 hover:text-cream text-sm transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-cream/10 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <div className="text-cream/50 text-sm">
              &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights
              reserved.
            </div>
            <div className="text-cream/50 text-sm">
              <a
                href="https://search.ccb.state.or.us/search/business_details.aspx?id=258533"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cream underline transition-colors"
              >
                {BUSINESS.license}
              </a>{' '}
              &middot; Licensed &middot; Bonded &middot; Insured
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
