'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, AlertCircle, Menu, X } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { MobileNav } from './MobileNav';

const navigation = [
  { name: 'Plans', href: '/plans' },
  { name: 'Emergency', href: '/emergency' },
  { name: 'Methodology', href: '/methodology' },
  { name: 'Areas', href: '/areas' },
  { name: 'Contact', href: '/contact' },
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
    <header className="sticky top-0 z-50 w-full bg-oxblood border-b border-oxblood-light shadow-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="font-bold text-xl md:text-2xl text-cream tracking-tight">
            BENSON<span className="text-white font-light uppercase"> Home Solutions</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-cream/90 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Contact / Emergency Section */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-cream/70 uppercase tracking-widest font-bold leading-tight">Main Line</span>
            <a href={`tel:${BUSINESS.phone}`} className="text-cream font-bold text-lg hover:text-white transition-colors">
              {BUSINESS.phone}
            </a>
          </div>

          <Link 
            href="/contact"
            className="bg-cream hover:bg-white text-oxblood font-bold px-5 py-2 rounded-lg shadow-lg transition-all text-sm"
          >
            Get a Quote
          </Link>
          
          <button 
            onClick={handleEmergencyClick}
            className="bg-red-700 hover:bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 border border-red-500 shadow-lg transition-all animate-pulse group"
          >
            <AlertCircle size={18} className="group-hover:scale-110 transition-transform" />
            <div className="flex flex-col items-start leading-tight text-left">
              <span className="text-[10px] uppercase font-bold">Emergency</span>
              <span className="text-sm font-bold">Call & Text</span>
            </div>
          </button>
        </div>

        {/* Mobile Dual-Action Toggle & Menu */}
        <div className="md:hidden flex items-center gap-3">
          <button 
            onClick={handleEmergencyClick}
            className="bg-red-700 text-white p-3 rounded-full shadow-xl active:scale-95 transition-transform"
            aria-label="Emergency Call and Text"
          >
            <Phone size={24} className="animate-bounce" />
          </button>
          
          <button
            type="button"
            className="p-2 text-cream"
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
