'use client';

import Link from 'next/link';
import { Container } from '@/components/ui';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';

const footerLinks = {
  services: [
    { name: 'Maintenance Programs', href: '/services/maintenance-subscriptions' },
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
  areas: SERVICE_AREAS.midWillametteValley.slice(0, 4).map(city => ({
    name: city,
    href: `/areas/${city.toLowerCase().replace(' ', '-')}`
  }))
};

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70 border-t border-cream/5">
      <Section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="space-y-6">
              <Link href="/" className="inline-block group">
                <span className="text-2xl font-black text-cream tracking-tight group-hover:text-oxblood transition-colors">
                  BENSON<span className="text-oxblood group-hover:text-cream transition-colors">.</span>
                </span>
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-cream/50">
                  Home Solutions
                </span>
              </Link>
              <p className="text-sm leading-relaxed max-w-xs">
                Professional maintenance, restoration &amp; mitigation services for the Mid-Willamette Valley. Licensed, bonded, and insured.
              </p>
              <div className="flex items-center gap-4">
                <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream transition-colors">
                  <span className="sr-only">Facebook</span>
                  {/* FB ICON placeholder or simple text */}
                  <span className="text-xs font-bold uppercase tracking-wider underline underline-offset-4">Facebook</span>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-cream font-bold uppercase tracking-widest text-xs mb-6">Services</h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-cream transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-cream font-bold uppercase tracking-widest text-xs mb-6">Company</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-cream transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <h4 className="text-cream font-bold uppercase tracking-widest text-xs mt-10 mb-6">Service Areas</h4>
              <ul className="space-y-4">
                {footerLinks.areas.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-cream transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-8">
              <div>
                <h4 className="text-cream font-bold uppercase tracking-widest text-xs mb-6">Get in Touch</h4>
                <div className="space-y-4">
                  <a href={`tel:${BUSINESS.phone}`} className="block group">
                    <span className="block text-xs text-cream/50 mb-1 uppercase tracking-tighter">Office</span>
                    <span className="text-cream group-hover:text-oxblood transition-colors font-bold">{BUSINESS.phone}</span>
                  </a>
                  <a href={`tel:${BUSINESS.afterhoursPhone}`} className="block group">
                    <span className="block text-xs text-red-400 mb-1 uppercase tracking-tighter">Emergency 24/7</span>
                    <span className="text-red-100 group-hover:text-red-400 transition-colors font-bold">{BUSINESS.afterhoursPhone}</span>
                  </a>
                  <a href={`mailto:${BUSINESS.email}`} className="block group">
                    <span className="block text-xs text-cream/50 mb-1 uppercase tracking-tighter">Email</span>
                    <span className="text-cream group-hover:text-oxblood transition-colors font-bold">{BUSINESS.email}</span>
                  </a>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-xs font-bold text-cream mb-1">{BUSINESS.license}</p>
                <p className="text-[10px] uppercase tracking-widest text-cream/30 font-bold">Oregon CCB Registered</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-8">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-cream/30 font-medium">
              &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link href="/privacy" className="text-xs text-cream/30 hover:text-cream transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-cream/30 hover:text-cream transition-colors">Terms of Service</Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

// Internal Section component for Footer to avoid circular deps or extra imports if needed
function Section({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <section className={className}>
      {children}
    </section>
  );
}
