import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';

const footerLinks = {
  services: [
    {
      name: 'Maintenance Programs',
      href: '/services/maintenance-subscriptions',
    },
    { name: 'Water Damage Restoration', href: '/services/water-damage' },
    { name: 'Emergency Response', href: '/emergency' },
    { name: 'Remodeling & Restoration', href: '/services/remodeling' },
    { name: 'All Services', href: '/' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Methodology', href: '/methodology' },
    { name: 'Contact Us', href: '/contact' },
  ],
  areas: SERVICE_AREAS.midWillametteValley.map((city) => ({
    name: city,
    href: `/areas/${city.toLowerCase().replace(' ', '-')}`,
  })),
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-cream/5 border-t">
      <Section variant="charcoal" className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Brand */}
            <div className="space-y-6">
              <Link href="/" className="group inline-block">
                <span className="text-cream group-hover:text-oxblood-light text-2xl font-black tracking-tight transition-colors">
                  BENSON
                  <span className="text-oxblood group-hover:text-cream transition-colors">
                    .
                  </span>
                </span>
                <span className="text-cream/50 block text-xs font-bold tracking-[0.2em] uppercase">
                  Home Solutions
                </span>
              </Link>
              <p className="text-cream/90 max-w-xs text-sm leading-relaxed">
                Professional maintenance, restoration &amp; mitigation services
                for the Mid-Willamette Valley. Licensed, bonded, and insured.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={BUSINESS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/70 hover:text-cream transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <span className="text-xs font-bold tracking-wider uppercase underline underline-offset-4">
                    Facebook
                  </span>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-cream mb-6 text-xs font-bold tracking-widest uppercase">
                Services
              </h3>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/80 hover:text-cream text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-cream mb-6 text-xs font-bold tracking-widest uppercase">
                Company
              </h3>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/80 hover:text-cream text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="text-cream mt-10 mb-6 text-xs font-bold tracking-widest uppercase">
                Service Areas
              </h3>
              <ul className="space-y-4">
                {footerLinks.areas.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/80 hover:text-cream text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-8">
              <div>
                <h3 className="text-cream mb-6 text-xs font-bold tracking-widest uppercase">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <a href={`tel:${BUSINESS.phone}`} className="group block">
                    <span className="text-cream/70 mb-1 block text-xs font-bold tracking-tighter uppercase">
                      Office
                    </span>
                    <span className="text-cream group-hover:text-cream-dark font-bold transition-colors">
                      {BUSINESS.phone}
                    </span>
                  </a>
                  <a
                    href={`tel:${BUSINESS.afterhoursPhone}`}
                    className="group block"
                  >
                    <span className="mb-1 block text-xs font-bold tracking-tighter text-red-200 uppercase">
                      Emergency 24/7
                    </span>
                    <span className="font-bold text-red-100 transition-colors group-hover:text-red-200">
                      {BUSINESS.afterhoursPhone}
                    </span>
                  </a>
                  <a href={`mailto:${BUSINESS.email}`} className="group block">
                    <span className="text-cream/70 mb-1 block text-xs font-bold tracking-tighter uppercase">
                      Email
                    </span>
                    <span className="text-cream group-hover:text-cream-dark font-bold transition-colors">
                      {BUSINESS.email}
                    </span>
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-cream mb-1 text-xs font-bold">
                    {BUSINESS.license}
                  </p>
                  <p className="text-cream/70 text-[10px] font-bold tracking-widest uppercase">
                    Oregon CCB Registered
                  </p>
                </div>
                <div className="rounded-xl border border-oxblood/30 bg-oxblood/10 p-4">
                  <p className="text-cream mb-1 text-xs font-bold italic">
                    2026 Senior Principal Engine
                  </p>
                  <p className="text-cream/70 text-[10px] font-bold tracking-widest uppercase">
                    Forensic Data Modeling
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Bottom Bar */}
      <div className="bg-charcoal border-t border-white/5 py-8">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-cream/70 text-xs font-medium">
              &copy; {currentYear} {BUSINESS.name}. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link
                href="/privacy"
                className="text-cream/70 hover:text-cream text-xs transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-cream/70 hover:text-cream text-xs transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
