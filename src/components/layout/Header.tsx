import Link from 'next/link';
import { Container } from '@/components/ui';
import { BUSINESS } from '@/lib/constants';
import { MobileNavButton } from './MobileNavButton';

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Tools', href: '/tools' },
  { name: 'About', href: '/about' },
  { name: 'Areas We Serve', href: '/areas' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  return (
    <header className="bg-surface/95 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-oxblood text-xl font-bold md:text-2xl">
              {BUSINESS.name}
            </span>
            <div className="ml-2 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-green-800 uppercase">
                Live
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-charcoal hover:text-oxblood hover:bg-cream/50 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden items-center gap-4 md:flex">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-oxblood hover:text-oxblood/80 text-sm font-semibold transition-colors"
            >
              {BUSINESS.phone}
            </a>
            <Link
              href="/contact"
              className="bg-oxblood text-cream hover:bg-oxblood/90 inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm font-semibold transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          <MobileNavButton navigation={navigation} />
        </div>
      </Container>
    </header>
  );
}
