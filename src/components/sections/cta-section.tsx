import Link from 'next/link';
import { Button } from '@/components/ui';
import { COMPANY, ROUTES } from '@/lib/constants';

interface CTASectionProps {
  headline?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  showPhone?: boolean;
  variant?: 'primary' | 'light';
}

export function CTASection({
  headline = 'Ready to Get Started?',
  description = 'Contact us today for a free, no-obligation estimate. We respond within 2 hours during business hours.',
  ctaText = 'Request a Free Estimate',
  ctaHref = ROUTES.CONTACT,
  showPhone = true,
  variant = 'primary',
}: CTASectionProps) {
  const isPrimary = variant === 'primary';

  return (
    <section
      className={`py-16 sm:py-20 ${
        isPrimary
          ? 'bg-[var(--color-oxblood)] text-white'
          : 'bg-[var(--color-cream)] text-[var(--color-charcoal)]'
      }`}
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">
          {headline}
        </h2>
        <p
          className={`mt-4 text-lg ${
            isPrimary ? 'text-white/85' : 'text-[var(--color-slate)]'
          }`}
        >
          {description}
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            variant={isPrimary ? 'secondary' : 'default'}
          >
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>

          {showPhone && (
            <Button asChild size="lg" variant="outline" className={isPrimary ? 'border-white text-white hover:bg-white/10' : ''}>
              <a href={`tel:${COMPANY.PHONE.replace(/\D/g, '')}`}>
                Call {COMPANY.PHONE}
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
