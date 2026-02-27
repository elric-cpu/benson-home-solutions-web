import Link from 'next/link';
import { Container } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

const footerNav = {
  services: [
    { name: 'Residential Maintenance', href: '/services/residential-maintenance' },
    { name: 'Commercial Services', href: '/services/commercial' },
    { name: 'Emergency Repairs', href: '/emergency' },
    { name: 'Church & Non-Profit', href: '/services/church-nonprofit' },
    { name: 'All Services', href: '/services' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Methodology', href: '/methodology' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Maintenance Tools', href: '/tools' },
    { name: 'Areas We Serve', href: '/areas' },
    { name: 'Emergency Service', href: '/emergency' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/90">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="text-xl font-bold text-cream">
                {BUSINESS.name}
              </Link>
              <p className="mt-3 text-sm text-cream/70 leading-relaxed">
                Professional handyman and maintenance services for the
                Mid-Willamette Valley. Licensed, bonded, and insured.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="block text-cream/80 hover:text-cream transition-colors"
                >
                  📞 {BUSINESS.phone}
                </a>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="block text-cream/80 hover:text-cream transition-colors"
                >
                  ✉️ {BUSINESS.email}
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-cream uppercase tracking-wider">
                Services
              </h3>
              <ul className="mt-3 space-y-2">
                {footerNav.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-cream/70 hover:text-cream transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-cream uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-3 space-y-2">
                {footerNav.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-cream/70 hover:text-cream transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-cream uppercase tracking-wider">
                Resources
              </h3>
              <ul className="mt-3 space-y-2">
                {footerNav.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-cream/70 hover:text-cream transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-cream/50">
              &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights
              reserved.
            </div>
            <div className="text-sm text-cream/50">
              {BUSINESS.license} &middot; Licensed &middot; Bonded &middot;
              Insured
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
