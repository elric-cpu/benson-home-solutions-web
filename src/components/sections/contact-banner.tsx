import Link from 'next/link';
import { Button } from '@/components/ui';
import { COMPANY, ROUTES } from '@/lib/constants';

interface ContactBannerProps {
  message?: string;
}

export function ContactBanner({
  message = 'Need help now? Our team is ready.',
}: ContactBannerProps) {
  return (
    <div className="bg-[var(--color-oxblood)] py-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center font-medium text-white sm:text-left">
          {message}
        </p>
        <div className="flex gap-3">
          <Button asChild size="sm" variant="secondary">
            <a href={`tel:${COMPANY.PHONE.replace(/\D/g, '')}`}>
              {COMPANY.PHONE}
            </a>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href={ROUTES.CONTACT}>Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
