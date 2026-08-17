'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { MobileNav } from './MobileNav';

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Wildfire Recovery', href: '/wildfire-recovery' },
  { name: 'Projects', href: '/projects' },
  { name: 'Service Area', href: '/service-area' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#722F37]/15 bg-[#FAF8F3]/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center gap-3" aria-label="Benson Home Solutions home">
            <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-md bg-[#722F37] font-bold text-[#F5F1E8]">B</span>
            <span className="leading-tight"><strong className="block text-lg text-[#4A1F24] md:text-xl">Benson Home Solutions</strong><span className="hidden text-xs font-semibold uppercase tracking-[0.12em] text-[#722F37] sm:block">Harney County · CCB #258533</span></span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navigation.map(item => <Link key={item.name} href={item.href} className="rounded-md px-3 py-2 text-sm font-semibold text-[#2D2D2D] hover:bg-[#F5F1E8] hover:text-[#722F37]">{item.name}</Link>)}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href={`tel:${BUSINESS.phoneHref}`} className="text-sm font-semibold text-[#722F37]">{BUSINESS.phone}</a>
            <Link href="/request-estimate" className="rounded-md bg-[#722F37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#5C252C]">Request Estimate</Link>
          </div>
          <button type="button" className="rounded-md p-2 text-[#2D2D2D] md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-label="Toggle navigation menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">{mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}</svg>
          </button>
        </div>
      </Container>
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} navigation={navigation} />
    </header>
  );
}
