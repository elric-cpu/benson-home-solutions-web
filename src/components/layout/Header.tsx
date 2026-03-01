'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { MobileNav } from './MobileNav';

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Tools', href: '/tools/cost-calculator' },
  { name: 'About', href: '/about' },
  { name: 'Areas We Serve', href: '/areas' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-oxblood">
              {BUSINESS.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-charcoal hover:text-oxblood transition-colors rounded-lg hover:bg-cream/50"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-sm font-semibold text-oxblood hover:text-oxblood/80 transition-colors"
            >
              {BUSINESS.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-10 px-5 text-sm font-semibold rounded-lg bg-oxblood text-cream hover:bg-oxblood/90 transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-charcoal"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
      />
    </header>
  );
}
