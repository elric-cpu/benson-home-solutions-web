import Link from 'next/link';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export function ContactSidebar() {
  return (
    <div className="space-y-8">
      <Card variant="outlined" className="p-8">
        <h2 className="text-charcoal mb-6 text-xl font-black tracking-tight uppercase">
          What to Expect
        </h2>
        <ol className="text-slate list-inside list-decimal space-y-4 text-sm font-medium">
          <li>We review the scope, photos, or repair list.</li>
          <li>We call or text you back to confirm the real problem.</li>
          <li>We schedule the site visit or next step.</li>
          <li>You get a clear scope and path to completion.</li>
        </ol>
        <div className="border-oxblood/10 bg-cream/60 mt-6 rounded-2xl border p-4">
          <div className="text-oxblood/50 text-[10px] font-black tracking-widest uppercase">
            Fastest Way To Help Us Help You
          </div>
          <p className="text-slate mt-2 text-sm leading-relaxed font-medium">
            Include the property address, the city, photos if you have them,
            and whether the issue came from an inspection report, a lender,
            active damage, or routine upkeep.
          </p>
        </div>
      </Card>

      <Card
        variant="outlined"
        className="border-oxblood/20 bg-cream p-8"
      >
        <h2 className="text-charcoal mb-2 flex items-center gap-2 text-lg font-semibold">
          <AlertTriangle className="text-oxblood h-5 w-5" /> Have an
          Emergency?
        </h2>
        <p className="text-slate mb-4 text-sm">
          For urgent issues like water or storm damage, call our 24/7
          emergency line for immediate help.
        </p>
        <a href={`tel:${BUSINESS.afterhoursPhone}`}>
          <Button variant="emergency" className="w-full font-bold">
            Call Our 24/7 Line
          </Button>
        </a>
      </Card>

      <Card variant="outlined" className="p-6">
        <h2 className="text-charcoal mb-2 text-lg font-semibold">
          Our Service Areas
        </h2>
        <p className="text-slate text-sm">
          We proudly serve the Mid-Willamette Valley and Harney County.
        </p>
        <Link
          href="/areas"
          className="text-oxblood hover:text-oxblood/80 mt-2 inline-block text-sm font-medium transition-colors"
        >
          View Service Area Map &rarr;
        </Link>
      </Card>

      <Card variant="outlined" className="p-6">
        <h2 className="text-charcoal mb-2 text-lg font-semibold">
          Common Scope Types
        </h2>
        <ul className="text-slate space-y-2 text-sm font-medium">
          <li>FHA, VA, appraisal, and buyer-requested repairs</li>
          <li>
            Water intrusion, mold mitigation, and dry-out follow-through
          </li>
          <li>
            Vacancy turns, board-ups, lock work, and preservation scopes
          </li>
          <li>
            Air sealing, insulation, and weatherization corrections
          </li>
        </ul>
      </Card>
    </div>
  );
}