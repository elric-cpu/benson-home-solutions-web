'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, AlertCircle, Menu, X } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { MobileNav } from './MobileNav';

const navigation = [
  { name: 'Repairs', href: '/contact' },
  { name: 'Plans', href: '/plans' },
  { name: 'Blog', href: '/blog' },
  { name: 'Emergency', href: '/emergency' },
  { name: 'How We Work', href: '/methodology' },
  { name: 'Areas', href: '/areas' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleEmergencyClick = (_e: React.MouseEvent) => {
    // Dual-action logic: Attempt to trigger call, then provide SMS fallback
    // In 2026 browsers, we trigger the tel intent and then the sms intent
    window.location.href = `tel:${BUSINESS.afterhoursPhone.replace(/[^0-9]/g, '')}`;

    setTimeout(() => {
      window.location.href = `sms:${BUSINESS.afterhoursPhone.replace(/[^0-9]/g, '')}?body=EMERGENCY: I need immediate assistance at [Address]`;
    }, 500);
  };

  return (
    <header className="bg-oxblood border-oxblood-light sticky top-0 z-50 w-full border-b shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-cream text-xl font-bold tracking-tight md:text-2xl">
            BENSON
            <span className="font-light text-white uppercase">
              {' '}
              Home Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-cream/90 text-sm font-medium transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Contact / Emergency Section */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex flex-col items-end">
            <span className="text-cream/70 text-[10px] leading-tight font-bold tracking-widest uppercase">
              Main Line
            </span>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-cream text-lg font-bold transition-colors hover:text-white"
            >
              {BUSINESS.phone}
            </a>
          </div>

          <Link
            href="/contact"
            className="bg-cream text-oxblood rounded-lg px-5 py-2 text-sm font-bold shadow-lg transition-all hover:bg-white"
          >
            Start a Repair Request
          </Link>

          <button
            onClick={handleEmergencyClick}
            className="group flex animate-pulse items-center gap-2 rounded-lg border border-red-500 bg-red-700 px-5 py-2 text-white shadow-lg transition-all hover:bg-red-600"
          >
            <AlertCircle
              size={18}
              className="transition-transform group-hover:scale-110"
            />
            <div className="flex flex-col items-start text-left leading-tight">
              <span className="text-[10px] font-bold uppercase">Emergency</span>
              <span className="text-sm font-bold">Call & Text</span>
            </div>
          </button>
        </div>

        {/* Mobile Dual-Action Toggle & Menu */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={handleEmergencyClick}
            className="rounded-full bg-red-700 p-3 text-white shadow-xl transition-transform active:scale-95"
            aria-label="Emergency Call and Text"
          >
            <Phone size={24} className="animate-bounce" />
          </button>

          <button
            type="button"
            className="text-cream p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
      />
    </header>
  );
}
