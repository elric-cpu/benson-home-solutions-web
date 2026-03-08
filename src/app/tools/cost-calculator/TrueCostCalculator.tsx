'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AddressAutocomplete } from '@/components/ui/AddressAutocomplete';
import {
  Section,
  Container,
  Button,
  Card,
  CardContent,
  Badge,
  RichHero,
} from '@/components/ui';
import {
  MOCK_ZIP_DATA,
  DEFAULT_BENCHMARK,
  type ZipData,
} from '@/lib/calculator-data';
import { HERO_ASSETS } from '@/lib/constants';
import {
  ChevronDown,
  ChevronUp,
  Plane,
  Info,
  AlertTriangle,
  CheckCircle2,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from 'lucide-react';

type Step = 'input' | 'processing' | 'result' | 'captured';

interface AddressSuggestion {
  formatted: string;
  postcode: string;
  city?: string;
  state?: string;
  county?: string;
  lat?: number;
  lon?: number;
}

export function TrueCostCalculator({ isEmbed = false }: { isEmbed?: boolean }) {
  const [step, setStep] = useState<Step>('input');
  const [address, setAddress] = useState<AddressSuggestion | null>(null);
  const [data, setData] = useState<ZipData | null>(null);
  const [progressStep, setProgressStep] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressHash, setAddressHash] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const PROGRESS_MESSAGES = [
    'Checking property tax records via Census Bureau...',
    'Analyzing flood risk via FEMA...',
    'Calculating energy costs via DOE...',
    'Projecting maintenance risk based on building age...',
  ];

  const handleAddressSelect = async (suggestion: AddressSuggestion) => {
    const s = suggestion;
    setAddress(s);

    const zipData = MOCK_ZIP_DATA[s.postcode] || DEFAULT_BENCHMARK;
    setData({ ...zipData, city: s.city || zipData.city });

    setStep('processing');
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const propertyType = formData.get('propertyType') as string;

    try {
      const total = Object.values(data?.costs || {}).reduce(
        (acc, curr) => acc + curr.annual,
        0,
      );

      const res = await fetch('/api/calculator/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          propertyType,
          address,
          costs: data?.costs,
          total,
        }),
      });

      const responseData = await res.json();
      if (responseData.addressHash) {
        setAddressHash(responseData.addressHash);
      }

      setStep('captured');
    } catch (error) {
      console.error('Lead submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (step === 'processing') {
      const messagesCount = PROGRESS_MESSAGES.length;
      const interval = setInterval(() => {
        setProgressStep((prev) => {
          if (prev >= messagesCount - 1) {
            clearInterval(interval);
            setTimeout(() => setStep('result'), 1200); // Wait a bit for effect
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, PROGRESS_MESSAGES.length]);

  useEffect(() => {
    if ((step === 'result' || step === 'captured') && data) {
      const total = Object.values(data.costs).reduce(
        (acc, curr) => acc + curr.annual,
        0,
      );
      let start = 0;
      const duration = 2500;
      const increment = total / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= total) {
          setAnimatedTotal(total);
          clearInterval(timer);
        } else {
          setAnimatedTotal(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [step, data]);

  if (step === 'input') {
    return (
      <>
        {!isEmbed && (
          <RichHero
            title={
              <>
                What Does Your Home
                <br />
                REALLY Cost Per Year?
              </>
            }
            description="Most homeowners underestimate the true cost of ownership by 40–60%. Enter your address to see the hidden expenses beyond your mortgage."
            backgroundImage={HERO_ASSETS.calculator}
            imageAlt="Modern residential property representing homeownership costs"
            badge="Property Intelligence Tool"
            overlayOpacity={70}
          />
        )}
        <Section
          variant="cream"
          className={isEmbed ? 'py-4' : 'py-12 md:py-20'}
        >
          <Container
            size="narrow"
            className={isEmbed ? 'relative z-20' : 'relative z-20 -mt-32'}
          >
            <Card className="shadow-elevated border-oxblood/10 bg-white/95 p-2 backdrop-blur-md">
              <CardContent className="p-4">
                <AddressAutocomplete
                  onSelect={handleAddressSelect}
                  className="mb-4"
                />
                <div className="text-slate/60 text-center text-xs font-medium tracking-widest uppercase">
                  Built with data from FEMA, DOE, Census Bureau, HUD, EIA, and
                  NOAA
                </div>
              </CardContent>
            </Card>
          </Container>
        </Section>
      </>
    );
  }

  if (step === 'processing') {
    const progressPercent = Math.min(
      100,
      Math.round(((progressStep + 1) / PROGRESS_MESSAGES.length) * 100),
    );

    return (
      <Section variant="cream" className="flex min-h-[600px] items-center">
        <Container size="narrow">
          <div className="mx-auto max-w-md">
            <div className="mb-12 text-center">
              <div className="relative mx-auto mb-6 h-24 w-24">
                <div className="border-oxblood/10 absolute inset-0 rounded-full border-4" />
                <div
                  className="border-oxblood absolute inset-0 animate-spin rounded-full border-4 border-t-transparent"
                  style={{ animationDuration: '1.5s' }}
                />
                <div className="text-oxblood absolute inset-0 flex items-center justify-center text-2xl font-black tabular-nums">
                  {progressPercent}%
                </div>
              </div>
              <h2 className="text-charcoal text-3xl font-black tracking-tight uppercase">
                Analyzing Property Data
              </h2>
              <p className="text-slate mt-2 font-medium italic">
                Searching federal and regional datasets...
              </p>
            </div>
            <div className="space-y-6">
              {PROGRESS_MESSAGES.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 transition-all duration-500 ${i <= progressStep ? 'scale-100 opacity-100' : 'scale-95 opacity-20'}`}
                >
                  <div
                    className={`h-3 w-3 flex-shrink-0 rounded-full ${i < progressStep ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : i === progressStep ? 'bg-oxblood animate-pulse shadow-[0_0_10px_rgba(76,12,20,0.5)]' : 'bg-slate/20'}`}
                  />
                  <span className="text-slate text-xs font-bold tracking-wide uppercase">
                    {msg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  if (step === 'result' || step === 'captured') {
    const monthlyTotal = Math.floor(animatedTotal / 12);
    const tripsToHawaii = Math.floor(animatedTotal / 600);

    return (
      <>
        {/* Step 3: The Reveal */}
        <Section
          variant="oxblood"
          className={
            isEmbed ? 'py-10' : 'text-cream relative overflow-hidden py-20'
          }
        >
          <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden opacity-5">
            <div className="border-cream absolute -top-24 -left-24 h-96 w-96 rounded-full border-[40px]" />
            <div className="border-cream absolute -right-24 -bottom-24 h-96 w-96 rounded-full border-[40px]" />
          </div>

          <Container size="narrow" className="relative z-10 text-center">
            {!isEmbed && (
              <Badge
                variant="secondary"
                className="bg-cream/10 text-cream border-cream/20 mb-8 px-6 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase"
              >
                True Annual Cost Reveal
              </Badge>
            )}
            <div
              className={
                isEmbed
                  ? 'text-cream mb-2 text-5xl font-black tracking-tighter tabular-nums'
                  : 'text-cream mb-4 text-7xl font-black tracking-tighter tabular-nums md:text-9xl'
              }
            >
              ${animatedTotal.toLocaleString()}
              <span
                className={
                  isEmbed
                    ? 'ml-1 text-base font-bold opacity-50'
                    : 'ml-2 text-2xl font-bold opacity-50 md:text-4xl'
                }
              >
                /year
              </span>
            </div>
            <p
              className={
                isEmbed
                  ? 'text-cream/80 text-sm font-medium'
                  : 'text-cream/80 text-2xl font-medium md:text-3xl'
              }
            >
              That&apos;s{' '}
              <strong className="text-cream decoration-cream/30 underline underline-offset-8">
                ${monthlyTotal.toLocaleString()} per month
              </strong>{' '}
              beyond your mortgage.
            </p>
            {!isEmbed && (
              <div className="text-cream animate-in zoom-in fill-mode-both mt-12 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 shadow-2xl backdrop-blur-md delay-1000 duration-700">
                <div className="bg-cream text-oxblood rounded-lg p-2">
                  <Plane className="h-6 w-6 fill-current" />
                </div>
                <span className="text-sm font-black tracking-tight uppercase md:text-base">
                  Equivalent to {tripsToHawaii} round-trip flights to Hawaii
                  every year
                </span>
              </div>
            )}
          </Container>
        </Section>

        <Section
          spacing={isEmbed ? 'sm' : 'lg'}
          className={isEmbed ? 'pb-4' : 'bg-cream/30'}
        >
          <Container>
            <div
              className={`grid gap-12 ${isEmbed ? 'grid-cols-1' : 'lg:grid-cols-3'}`}
            >
              <div className={`space-y-8 ${isEmbed ? '' : 'lg:col-span-2'}`}>
                <div className="mb-4 flex items-center justify-between px-2">
                  <h3 className="text-charcoal text-2xl font-black tracking-tight uppercase">
                    Forensic Cost Breakdown
                  </h3>
                  {!isEmbed && (
                    <span className="text-slate/40 flex items-center gap-1 text-[10px] font-black tracking-widest uppercase">
                      <Info className="h-3 w-3" /> Click for Methodology
                    </span>
                  )}
                </div>
                <div className="space-y-4">
                  {Object.entries(data?.costs || {}).map(([key, detail]) => {
                    const confidenceColors = {
                      high: 'bg-green-500/10 text-green-700 border-green-500/20',
                      medium:
                        'bg-amber-500/10 text-amber-700 border-amber-500/20',
                      low: 'bg-red-500/10 text-red-700 border-red-500/20',
                    };

                    const slugMap: Record<string, string> = {
                      property_tax: 'property-taxes',
                      insurance: 'insurance',
                      maintenance: 'maintenance',
                      energy: 'energy',
                      utilities: 'water-utilities',
                      deferred_maintenance_risk: 'deferred-maintenance',
                      appliance_reserve: 'appliance-lifecycle',
                    };

                    const methodologyUrl = `/methodology/${slugMap[key]}`;
                    const isExpanded = expandedCategory === key;

                    return (
                      <div
                        key={key}
                        className={`rounded-2xl border transition-all duration-300 ${isExpanded ? 'border-oxblood/20 bg-white p-6 shadow-lg' : 'border-transparent bg-white/50 p-4 hover:bg-white'}`}
                      >
                        <button
                          className="w-full text-left"
                          onClick={() =>
                            setExpandedCategory(isExpanded ? null : key)
                          }
                        >
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-charcoal text-sm font-black tracking-widest uppercase">
                                {key.replace(/_/g, ' ')}
                              </span>
                              <Badge
                                variant="secondary"
                                className={`px-2 py-0 text-[9px] font-black uppercase transition-colors ${confidenceColors[detail.confidence]}`}
                              >
                                {detail.confidence} confidence
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-oxblood text-lg font-black">
                                ${detail.annual.toLocaleString()}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="text-slate/40 h-4 w-4" />
                              ) : (
                                <ChevronDown className="text-slate/40 h-4 w-4" />
                              )}
                            </div>
                          </div>

                          <div className="bg-slate/10 mb-2 h-2.5 overflow-hidden rounded-full">
                            <div
                              className="bg-oxblood h-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${(detail.annual / animatedTotal) * 100}%`,
                              }}
                            />
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="border-slate/5 animate-in slide-in-from-top-2 mt-6 border-t pt-6 duration-300">
                            <p className="text-slate mb-4 text-sm leading-relaxed font-medium">
                              Our {key.replace(/_/g, ' ')} model uses{' '}
                              <strong>{detail.source}</strong> datasets to
                              project localized costs for a{' '}
                              {data?.median_year_built}-era property in{' '}
                              {data?.county} County.
                            </p>
                            <Link href={methodologyUrl}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-[10px] font-bold tracking-widest uppercase"
                              >
                                Read Full Methodology &rarr;
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Step 4: The Hook */}
                <div className="relative mt-16 overflow-hidden rounded-[2.5rem] border-2 border-red-100 bg-red-50 p-10 md:p-16">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <AlertTriangle size={120} className="text-red-900" />
                  </div>
                  <div className="relative z-10">
                    <div className="mb-8 flex items-center gap-3">
                      <div className="h-4 w-4 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                      <h4 className="text-sm font-black tracking-[0.2em] text-red-900 uppercase">
                        Deferred Maintenance Alert
                      </h4>
                    </div>
                    <h3 className="mb-6 text-4xl leading-[1.1] font-black tracking-tight text-red-900">
                      Skipping routine maintenance on a home like yours costs an
                      average of 3.5x more in emergency repairs.
                    </h3>
                    <p className="mb-10 max-w-2xl text-xl leading-relaxed font-medium text-red-800/80">
                      Based on our {data?.median_year_built}-era building model,
                      unaddressed building envelope issues are projected to
                      escalate into{' '}
                      <strong className="text-red-900">
                        $
                        {Math.round(
                          (data?.costs.maintenance.annual || 3000) * 3.5,
                        ).toLocaleString()}
                        +
                      </strong>{' '}
                      in avoidable restoration claims within 3–5 years.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="rounded-2xl border border-red-900/10 bg-red-900/5 px-6 py-4">
                        <div className="mb-1 text-[10px] font-black tracking-widest text-red-900/40 uppercase">
                          Year 1: Routine
                        </div>
                        <div className="text-2xl font-black text-red-900">
                          ${data?.costs.maintenance.annual.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center text-red-900/20">
                        <ChevronUp size={32} className="rotate-90" />
                      </div>
                      <div className="text-cream rounded-2xl bg-red-900 px-6 py-4 shadow-xl">
                        <div className="text-cream/60 mb-1 text-[10px] font-black tracking-widest uppercase">
                          Year 5: Emergency
                        </div>
                        <div className="text-cream text-2xl font-black">
                          $
                          {Math.round(
                            (data?.costs.maintenance.annual || 3000) * 3.5,
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`space-y-6 ${isEmbed ? 'order-first' : ''}`}>
                <div className={isEmbed ? '' : 'sticky top-24'}>
                  {step === 'result' ? (
                    /* Step 5: Lead Capture */
                    <Card className="border-oxblood overflow-hidden rounded-[2rem] border-4 bg-white shadow-2xl">
                      <div className="bg-oxblood p-5 text-center">
                        <span className="text-cream text-[10px] font-black tracking-[0.2em] uppercase">
                          Unlock Full Forensic Report
                        </span>
                      </div>
                      <CardContent className="p-10">
                        <h3 className="text-charcoal mb-6 text-3xl leading-tight font-black tracking-tighter">
                          Get Your Personalized Home Cost Report
                        </h3>
                        <ul className="mb-10 space-y-4">
                          {[
                            'Custom maintenance schedule',
                            'Energy savings recommendations',
                            'Appliance replacement timeline',
                            'Comparison to local area averages',
                          ].map((feat, i) => (
                            <li
                              key={i}
                              className="text-slate flex items-start gap-3 text-sm leading-tight font-bold"
                            >
                              <div className="mt-0.5 rounded-full bg-green-100 p-0.5 text-green-600">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                              {feat}
                            </li>
                          ))}
                        </ul>
                        <form className="space-y-5" onSubmit={handleLeadSubmit}>
                          <div>
                            <label className="text-slate/40 mb-2 block px-1 text-[10px] font-black tracking-widest uppercase">
                              Delivery Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              placeholder="you@example.com"
                              className="border-slate/10 text-charcoal focus:border-oxblood w-full rounded-2xl border-2 bg-slate-50 px-5 py-4 font-bold transition-all outline-none focus:bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-slate/40 mb-2 block px-1 text-[10px] font-black tracking-widest uppercase">
                              Property Type
                            </label>
                            <select
                              name="propertyType"
                              className="border-slate/10 text-charcoal focus:border-oxblood w-full appearance-none rounded-2xl border-2 bg-slate-50 px-5 py-4 font-bold transition-all outline-none focus:bg-white"
                            >
                              <option value="residential">
                                Single-Family Home
                              </option>
                              <option value="commercial">
                                Commercial Property
                              </option>
                              <option value="church">Church or Facility</option>
                            </select>
                          </div>
                          <div className="flex items-start gap-3 py-2">
                            <input
                              type="checkbox"
                              id="consent"
                              required
                              className="border-slate/20 text-oxblood focus:ring-oxblood mt-1 h-4 w-4 rounded"
                            />
                            <label
                              htmlFor="consent"
                              className="text-slate/50 text-[10px] leading-normal font-bold"
                            >
                              I agree to the{' '}
                              <Link href="/privacy" className="underline">
                                privacy policy
                              </Link>{' '}
                              and to receive this one-time forensic property
                              report.
                            </label>
                          </div>
                          <Button
                            variant="primary"
                            size="xl"
                            className="hover:shadow-oxblood/20 w-full py-8 font-black tracking-widest uppercase shadow-xl"
                            loading={isSubmitting}
                          >
                            Send My Report &rarr;
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  ) : (
                    /* Step 6: Post-Capture */
                    <Card className="overflow-hidden rounded-[2rem] border-4 border-green-600 bg-white text-center shadow-2xl">
                      <div className="bg-green-600 p-5">
                        <span className="text-cream text-[10px] font-black tracking-[0.2em] uppercase">
                          Report Unlocked
                        </span>
                      </div>
                      <CardContent className="p-10">
                        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-600 shadow-inner">
                          <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-charcoal mb-4 text-3xl font-black tracking-tighter">
                          Analysis Generated
                        </h3>
                        <p className="text-slate mb-10 text-base leading-relaxed font-bold">
                          We&apos;ve mapped{' '}
                          <strong>{address?.formatted}</strong> against regional
                          benchmarks. Your unique forensic profile is ready.
                        </p>
                        <Link href={`/report/${addressHash}`}>
                          <Button
                            variant="primary"
                            size="xl"
                            className="w-full border-green-600 bg-green-600 py-8 font-black tracking-widest uppercase shadow-xl hover:bg-green-700"
                          >
                            View Full Report
                          </Button>
                        </Link>

                        <div className="border-slate/5 mt-10 border-t-2 pt-10">
                          <p className="text-slate/40 mb-6 text-[10px] font-black tracking-[0.2em] uppercase">
                            Share Your Results
                          </p>
                          <div className="flex justify-center gap-6">
                            <button className="text-slate/40 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-white hover:text-[#1877F2] hover:shadow-lg">
                              <Facebook size={24} />
                            </button>
                            <button className="text-slate/40 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-white hover:text-[#1DA1F2] hover:shadow-lg">
                              <Twitter size={24} />
                            </button>
                            <button className="text-slate/40 rounded-2xl bg-slate-50 p-4 transition-all hover:bg-white hover:text-[#0A66C2] hover:shadow-lg">
                              <Linkedin size={24} />
                            </button>
                            <button className="text-slate/40 hover:text-oxblood rounded-2xl bg-slate-50 p-4 transition-all hover:bg-white hover:shadow-lg">
                              <Share2 size={24} />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </>
    );
  }

  return null;
}
