'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BUSINESS, NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { EmergencyBanner } from './emergency-banner';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      <EmergencyBanner />
      <nav className="border-b border-border bg-surface/95 backdrop-blur-sm" aria-label="Main navigation">
        <div className="container-page flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-primary text-cream font-bold text-lg">
              BH
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg font-bold text-heading leading-tight">{BUSINESS.name}</span>
              <span className="block text-xs text-muted">{BUSINESS.license} &middot; Oregon</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-body no-underline transition-colors hover:bg-cream-dark hover:text-heading',
                  )}
                >
                  {item.label}
                  {item.children && (
                    <svg className="h-3.5 w-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-[var(--radius-lg)] border border-border bg-surface py-2 shadow-overlay animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-body no-underline transition-colors hover:bg-cream-dark hover:text-heading"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button size="sm" className="hidden sm:inline-flex" asChild>
              <a href={`tel:${BUSINESS.phoneRaw}`}>Call Now</a>
            </Button>
            <Link href="/contact">
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
                Get Estimate
              </Button>
            </Link>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-body hover:bg-cream-dark lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-border bg-surface px-4 py-4 lg:hidden animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="mb-2">
                <Link
                  href={item.href}
                  className="block rounded-[var(--radius-md)] px-3 py-2 font-medium text-heading no-underline hover:bg-cream-dark"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-[var(--radius-sm)] px-3 py-1.5 text-sm text-body no-underline hover:bg-cream-dark hover:text-heading"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <Button fullWidth asChild>
                <a href={`tel:${BUSINESS.phoneRaw}`}>Call {BUSINESS.phone}</a>
              </Button>
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" fullWidth>Get Free Estimate</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
