import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, Button, Badge, Card } from '@/components/ui';
import { CheckCircle2, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Benson Home Solutions vs. HomeSmiles | Oregon Maintenance",
  description:
    "Comparing home maintenance services. Discover why Benson Home Solutions' holistic internal and external diagnostic care outperforms HomeSmiles' exterior cleaning bundles.",
};

export default function CompareHomeSmilesPage() {
  return (
    <>
      <Section variant="oxblood" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Competitor Comparison
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-cream uppercase">
            Benson Home Solutions <br />
            <span className="italic opacity-60 lowercase text-3xl">vs</span> <br />
            HomeSmiles
          </h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-cream/80 max-w-3xl mx-auto">
            Don&apos;t confuse exterior cleaning with structural protection. Learn why true property stewardship requires diagnostic, year-round maintenance inside and out.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/calculator">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-10 py-6 text-lg font-black uppercase tracking-widest">
                Calculate Your True Cost
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black uppercase tracking-tight text-oxblood mb-8 text-center">
              The Preventative Maintenance Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="p-8 border-oxblood shadow-xl bg-oxblood/5">
                <h3 className="text-2xl font-black uppercase text-oxblood mb-6">Benson Home Solutions</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <span className="font-medium text-slate"><strong>Holistic Property Audits:</strong> We inspect and log building envelope integrity, HVAC systems, plumbing lines, and structural rot risks.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <span className="font-medium text-slate"><strong>24/7 Disaster Mitigation:</strong> Full-scale emergency restoration available around the clock.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <span className="font-medium text-slate"><strong>Capital Expenditure Planning:</strong> We help you forecast 10-year replacement budgets using RSMeans data.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <span className="font-medium text-slate"><strong>Custom Subscription Tiers:</strong> Monthly or quarterly plans adapted exactly to the age and climate exposure of your home.</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 border-slate/20 shadow-md bg-white">
                <h3 className="text-2xl font-black uppercase text-slate mb-6">HomeSmiles</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-slate shrink-0" />
                    <span className="font-medium text-slate"><strong>Rapid Exterior Blitz:</strong> Fast, one-day service combining gutter cleaning, window washing, and pressure washing.</span>
                  </li>
                  <li className="flex gap-3 opacity-80">
                    <XCircle className="w-6 h-6 text-slate/40 shrink-0" />
                    <span className="font-medium text-slate"><strong>Cosmetic Focus:</strong> Lacks deep internal system checks (like plumbing pressure tests or thermal imaging for hidden leaks).</span>
                  </li>
                  <li className="flex gap-3 opacity-80">
                    <XCircle className="w-6 h-6 text-slate/40 shrink-0" />
                    <span className="font-medium text-slate"><strong>Franchise Model:</strong> Standardized packages that don&apos;t adapt to localized extremes like Harney County freezes.</span>
                  </li>
                  <li className="flex gap-3 opacity-80">
                    <XCircle className="w-6 h-6 text-slate/40 shrink-0" />
                    <span className="font-medium text-slate"><strong>No 24/7 Emergency Coverage:</strong> They clean to prevent issues, but do not provide priority restoration if a pipe bursts at midnight.</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="prose prose-lg prose-oxblood max-w-none">
              <h3 className="text-2xl font-bold text-oxblood uppercase tracking-tight">Curb Appeal vs. Structural Survival</h3>
              <p>
                HomeSmiles offers an incredibly convenient service if you are preparing to sell your home and need a rapid exterior refresh. Their bundled &quot;365 Plan&quot; is excellent for cosmetic upkeep like power washing driveways and clearing gutters.
              </p>
              <p>
                However, <strong>Benson Home Solutions</strong> operates on a different fundamental principle: building science. Our clients aren&apos;t just looking for clean windows; they are protecting multi-million dollar investments from systemic failure. We prioritize the invisible threats—moisture in the crawlspace, failing HVAC capacitors, and unseen roof flashing damage. When you hire Benson Home Solutions, you gain a strategic partner committed to the long-term structural and financial health of your property.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
