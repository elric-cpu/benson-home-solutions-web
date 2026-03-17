import Link from 'next/link';
import { RichHero, buttonClassName } from '@/components/ui';
import { BUSINESS, HERO_ASSETS } from '@/lib/constants';

interface HeroSectionProps {
  headline?: string | React.ReactNode;
  description?: string;
  video?: string;
}

export function HeroSection({ headline, description }: HeroSectionProps) {
  return (
    <RichHero
      title={
        headline || (
          <>
            Oregon Property Repairs,
            <br className="hidden sm:inline" />
            Restoration, and Maintenance
          </>
        )
      }
      description={
        description ||
        'Benson Home Solutions handles water damage, inspection repairs, remodels, and recurring maintenance for homes, churches, and commercial properties across the Mid-Willamette Valley and Harney County. You get clear scopes, documented work, and crews that show up ready to solve the problem.'
      }
      backgroundImage={HERO_ASSETS.homepage}
      badge="Mid-Willamette Valley + Harney County | CCB #258533"
    >
      <Link
        href="/contact"
        className={buttonClassName({ size: 'lg', variant: 'secondary' })}
      >
        Request an Estimate
      </Link>
      <a
        href={`tel:${BUSINESS.afterhoursPhone}`}
        className={buttonClassName({ size: 'lg', variant: 'emergency' })}
      >
        24/7 Emergency: {BUSINESS.afterhoursPhone}
      </a>
      <Link
        href="/services"
        className={buttonClassName({
          size: 'lg',
          variant: 'outline',
          className:
            'text-cream border-cream/20 hover:bg-cream hover:text-oxblood bg-white/10',
        })}
      >
        Browse Services
      </Link>
      <div className="text-cream/90 grid w-full gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-lg border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-sm">
          Water damage, mold, and emergency dry-out crews
        </div>
        <div className="rounded-lg border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-sm">
          Maintenance plans for homes, churches, and commercial buildings
        </div>
        <div className="rounded-lg border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-sm">
          Licensed Oregon contractor with photo-documented scopes and repairs
        </div>
      </div>
    </RichHero>
  );
}
