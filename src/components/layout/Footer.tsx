'use client';

import Link from 'next/link';

const footerLinks = {
  services: [
    { name: 'Maintenance Programs', href: '/services/maintenance' },
    { name: 'Water Damage Restoration', href: '/services/water-damage' },
    { name: 'Emergency Response', href: '/emergency' },
    { name: 'Remodeling & Restoration', href: '/services/remodeling' },
    { name: 'All Services', href: '/services' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Methodology', href: '/methodology' },
    { name: 'Service Areas', href: '/areas/albany' },
    { name: 'Contact', href: '/contact' },
  ],
  areas: [
    { name: 'Albany', href: '/areas/albany' },
    { name: 'Salem & Keizer', href: '/areas/salem' },
    { name: 'Lebanon & Sweet Home', href: '/areas/lebanon' },
    { name: 'Corvallis & Philomath', href: '/areas/corvallis' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Benson Home Solutions</h3>
            <p className="text-sm leading-relaxed mb-4">
              Professional maintenance, restoration &amp; mitigation services for the Mid-Willamette Valley. Licensed, bonded, and insured.
            </p>
            <p className="text-sm">CCB #258533</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Areas */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+15413215115" className="hover:text-white transition-colors">
                  (541) 321-5115
                </a>
              </li>
              <li>
                <a href="tel:+15414130480" className="hover:text-white transition-colors">
                  Emergency: (541) 413-0480
                </a>
              </li>
              <li>
                <a href="mailto:office@bensonhomesolutions.com" className="hover:text-white transition-colors">
                  office@bensonhomesolutions.com
                </a>
              </li>
            </ul>
            <h4 className="text-white font-semibold mt-6 mb-2">Service Areas</h4>
            <ul className="space-y-1">
              {footerLinks.areas.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Benson Home Solutions. All rights reserved.</p>
          <p className="text-xs text-gray-500">Serving Albany, Salem, Lebanon, Corvallis &amp; the Mid-Willamette Valley</p>
        </div>
      </div>
    </footer>
  );
}
