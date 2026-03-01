'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AddressAutocomplete } from '@/components/ui/AddressAutocomplete';
import { Section, Container, Button, Card, CardContent, Badge, RichHero } from '@/components/ui';
import { MOCK_ZIP_DATA, DEFAULT_BENCHMARK, type ZipData } from '@/lib/calculator-data';
import { HERO_ASSETS } from '@/lib/constants';

type Step = 'input' | 'processing' | 'result' | 'lead-gen';

export function TrueCostCalculator() {
  const [step, setStep] = useState<Step>('input');
  const [address, setAddress] = useState<any>(null);
  const [data, setData] = useState<ZipData | null>(null);
  const [progressStep, setProgressStep] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const PROGRESS_MESSAGES = [
    'Checking property tax records via Census Bureau...',
    'Analyzing flood risk via FEMA...',
    'Calculating energy costs via DOE...',
    'Projecting maintenance risk based on building age...',
  ];

  const handleAddressSelect = (suggestion: any) => {
    setAddress(suggestion);
    const zipData = MOCK_ZIP_DATA[suggestion.postcode] || DEFAULT_BENCHMARK;
    setData({ ...zipData, city: suggestion.city || zipData.city });
    setStep('processing');
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    try {
      const response = await fetch('/api/calculator/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          address: address.formatted,
          annualTotal: animatedTotal,
          monthlyTotal: Math.floor(animatedTotal / 12),
          isServiceArea: !!MOCK_ZIP_DATA[address.postcode],
          addressHash: null,
        }),
      });

      if (response.ok) {
        setStep('lead-gen');
      }
    } catch (error) {
      console.error('Lead submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (step === 'processing') {
      const interval = setInterval(() => {
        setProgressStep((prev) => {
          if (prev >= PROGRESS_MESSAGES.length - 1) {
            clearInterval(interval);
            setTimeout(() => setStep('result'), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'result' && data) {
      const total = Object.values(data.costs).reduce((a, b) => a + b, 0);
      let start = 0;
      const duration = 2000;
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
        <RichHero
          title={
            <>
              What Does Your Home<br />
              REALLY Cost Per Year?
            </>
          }
          description="Most homeowners underestimate the true cost of ownership by 40–60%. Enter your address to see the hidden expenses beyond your mortgage."
          backgroundImage={HERO_ASSETS.calculator}
          badge="Property Intelligence Tool"
          overlayOpacity={70}
        />
        <Section variant="cream" className="py-12 md:py-20">
          <Container size="narrow" className="-mt-32 relative z-20">
            <Card className="p-2 shadow-elevated border-oxblood/10 bg-white/95 backdrop-blur-md">
              <CardContent className="p-4">
                <AddressAutocomplete onSelect={handleAddressSelect} className="mb-4" />
                <div className="text-center text-xs text-slate/60 font-medium uppercase tracking-widest">
                  Built with data from FEMA, DOE, Census Bureau, HUD, EIA, and NOAA
                </div>
              </CardContent>
            </Card>
          </Container>
        </Section>
      </>
    );
  }

  if (step === 'processing') {
    const progressPercent = Math.min(100, Math.round(((progressStep + 1) / PROGRESS_MESSAGES.length) * 100));
    
    return (
      <Section variant="cream" className="min-h-[600px] flex items-center">
        <Container size="narrow">
          <div className="max-w-md mx-auto">
            <div className="mb-12 text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-oxblood/10 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center font-bold text-oxblood text-xl tabular-nums">
                  {progressPercent}%
                </div>
              </div>
              <h2 className="text-2xl font-bold text-charcoal">Analyzing Property Data</h2>
              <p className="text-slate text-sm mt-2 italic">Searching federal and regional datasets...</p>
            </div>
            <div className="space-y-4">
              {PROGRESS_MESSAGES.map((msg, i) => (
                <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${i <= progressStep ? 'opacity-100' : 'opacity-20'}`}>
                  <div className={`w-2 h-2 rounded-full ${i < progressStep ? 'bg-green-500' : i === progressStep ? 'bg-oxblood animate-pulse' : 'bg-slate/20'}`} />
                  <span className="text-slate font-medium text-sm">{msg}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  if (step === 'result' && data) {
    const monthlyTotal = Math.floor(animatedTotal / 12);
    const perDay = (animatedTotal / 365).toFixed(2);
    const tripsToHawaii = Math.floor(animatedTotal / 1200);

    return (
      <>
        <Section variant="oxblood" className="text-cream py-20">
          <Container size="narrow" className="text-center">
            <Badge variant="secondary" className="mb-6 bg-cream/10 text-cream border-cream/20 uppercase tracking-widest">
              True Annual Cost Reveal
            </Badge>
            <div className="text-6xl md:text-8xl font-black mb-4 tabular-nums">
              ${animatedTotal.toLocaleString()}
              <span className="text-2xl md:text-3xl font-bold opacity-50 ml-2">/year</span>
            </div>
            <p className="text-xl md:text-2xl font-medium text-cream/80">
              That&apos;s <strong className="text-cream">${monthlyTotal.toLocaleString()} per month</strong> or <strong className="text-cream">${perDay} per day</strong> beyond your mortgage.
            </p>
            <div className="mt-10 inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="text-2xl">✈️</span>
              <span className="text-sm font-bold uppercase tracking-wide">
                Equivalent to {tripsToHawaii} round-trip flights to Hawaii every year
              </span>
            </div>
          </Container>
        </Section>

        <Section spacing="lg">
          <Container>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl font-bold text-charcoal mb-6">Annual Cost Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(data.costs).map(([key, value]) => {
                    const slugMap: Record<string, string> = {
                      property_tax: 'property-taxes',
                      insurance: 'insurance',
                      maintenance: 'maintenance',
                      energy: 'energy',
                      utilities: 'water-utilities',
                      deferred_maintenance_risk: 'deferred-maintenance',
                      appliance_reserve: 'appliance-lifecycle',
                    };
                    return (
                      <Link key={key} href={`/methodology/${slugMap[key] || ''}`} className="group block">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-sm font-bold uppercase tracking-wider text-slate group-hover:text-oxblood transition-colors flex items-center gap-2">
                            {key.replace(/_/g, ' ')}
                            <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">(Methodology &rarr;)</span>
                          </span>
                          <span className="font-bold text-charcoal">${value.toLocaleString()}</span>
                        </div>
                        <div className="h-3 bg-slate/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-oxblood transition-all duration-1000 ease-out" 
                            style={{ width: `${(value / animatedTotal) * 100}%` }}
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <Card variant="outlined" className="mt-12 border-red-200 bg-red-50/30 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-red-900 flex items-center gap-2 mb-4">
                      ⚠️ Deferred Maintenance Alert
                    </h3>
                    <p className="text-red-800 leading-relaxed">
                      Skipping routine maintenance on a home like yours in <strong>{data.city}</strong> costs an average 
                      of <strong>${data.costs.deferred_maintenance_risk.toLocaleString()} extra</strong> in emergency 
                      repairs within 3–5 years.
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex-1 h-2 bg-red-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-1/4 animate-pulse" />
                      </div>
                      <span className="text-xs font-black text-red-700 uppercase tracking-widest">Extreme Risk</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div className="sticky top-24">
                  <Card className="bg-charcoal text-cream border-none shadow-elevated">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-4">Cut These Costs</h3>
                      <div className="mb-6 flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="w-10 h-10 rounded-full bg-oxblood/20 flex items-center justify-center text-oxblood text-sm font-bold shrink-0">80%</div>
                        <p className="text-[11px] leading-tight text-cream/70">
                          <strong>Your report is almost ready.</strong><br />
                          Unlock the final 20% &mdash; your custom maintenance schedule.
                        </p>
                      </div>
                      <p className="text-cream/70 text-sm leading-relaxed mb-8">
                        Get your personalized Home Cost Report including a custom maintenance schedule, 
                        energy savings tips, and appliance replacement timeline.
                      </p>
                      
                      <form className="space-y-4" onSubmit={handleLeadSubmit}>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-cream/50">Email Address</label>
                          <input 
                            type="email" 
                            name="email"
                            required 
                            placeholder="jane@example.com"
                            className="w-full bg-white/10 border border-white/10 rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-oxblood/50 text-cream"
                          />
                        </div>
                        <Button variant="secondary" size="lg" className="w-full" loading={isSubmitting}>
                          {isSubmitting ? 'Sending Report...' : 'Get My Full Report'}
                        </Button>
                        <p className="text-[10px] text-center text-cream/30 italic">
                          By clicking, you agree to our privacy policy and marketing opt-in.
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </>
    );
  }

  if (step === 'lead-gen') {
    return (
      <Section variant="cream" className="min-h-[600px] flex items-center text-center">
        <Container size="narrow">
          <div className="text-6xl mb-6">📊</div>
          <h2 className="text-3xl font-bold text-charcoal mb-4">Your Report is Ready!</h2>
          <p className="text-lg text-slate mb-8 max-w-md mx-auto">
            We&apos;ve sent your detailed breakdown and maintenance schedule to your inbox.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-elevated border border-slate/10 max-w-md mx-auto text-left">
            <Badge variant="secondary" className="mb-2">Benson Service Area Match</Badge>
            <h3 className="text-xl font-bold text-oxblood mb-2">Exclusive Mid-Willamette Access</h3>
            <p className="text-sm text-slate mb-6 leading-relaxed">
              Your property in <strong>{address?.formatted}</strong> qualifies for 
              our 24/7 Priority Protection program.
            </p>
            <a href="/contact">
              <Button size="lg" className="w-full">Book Initial Assessment</Button>
            </a>
            <div className="mt-6 flex flex-wrap gap-4 justify-center grayscale opacity-50">
              <span className="text-[10px] font-black uppercase tracking-tighter">IICRC Certified</span>
              <span className="text-[10px] font-black uppercase tracking-tighter">Oregon CCB #258533</span>
              <span className="text-[10px] font-black uppercase tracking-tighter">Lead-Safe Firm</span>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return null;
}
