import Link from 'next/link';
import { Container } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';

const groups = [
  {
    title: 'Recovery & Repair', links: [
      ['Post-Fire Recovery', '/services/post-fire-cleanup-recovery'],
      ['Fire Damage Demolition', '/services/fire-damage-demolition'],
      ['Water Damage', '/services/water-damage-restoration'],
      ['Framing & Structural', '/services/framing-structural-repairs'],
      ['All Services', '/services'],
    ],
  },
  {
    title: 'Property Services', links: [
      ['Windows & Doors', '/services/window-door-replacement'],
      ['Property Maintenance', '/services/property-maintenance'],
      ['Sitework & Excavation', '/services/sitework-excavation'],
      ['Small Concrete', '/services/concrete-small-projects'],
      ['Exterior Cleanup', '/services/exterior-property-cleanup'],
    ],
  },
  {
    title: 'Company', links: [
      ['Projects', '/projects'], ['Service Area', '/service-area'], ['About', '/about'], ['Contact', '/contact'], ['Privacy', '/privacy'],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-[#F5F1E8]">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-5 md:py-16">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold">{BUSINESS.name}</Link>
            <p className="mt-3 max-w-md leading-7 text-[#F5F1E8]/75">Construction, repair, reconstruction, property maintenance, and rural project services throughout Harney County, Oregon.</p>
            <div className="mt-5 space-y-2 text-sm">
              <a href={`tel:${BUSINESS.phoneHref}`} className="block hover:text-white">{BUSINESS.phone}</a>
              <a href={`mailto:${BUSINESS.email}`} className="block hover:text-white">{BUSINESS.email}</a>
              <span className="block">{BUSINESS.legalName} · {BUSINESS.license}</span>
            </div>
            <Link href="/request-estimate" className="mt-6 inline-block rounded-md bg-[#F5F1E8] px-5 py-2.5 font-semibold text-[#722F37]">Request an Estimate</Link>
          </div>
          {groups.map(group => <div key={group.title}><h2 className="text-sm font-semibold uppercase tracking-[0.12em]">{group.title}</h2><ul className="mt-4 space-y-2">{group.links.map(([name, href]) => <li key={href}><Link href={href} className="text-sm text-[#F5F1E8]/70 hover:text-white">{name}</Link></li>)}</ul></div>)}
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-[#F5F1E8]/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.</span>
          <span>Harney County, Oregon · {BUSINESS.license}</span>
        </div>
      </Container>
    </footer>
  );
}
