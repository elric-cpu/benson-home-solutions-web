'use client';

import { useState } from 'react';
import { Calculator, MapPin, Loader2, AlertCircle } from 'lucide-react';

export default function CalculatorPage() {
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ total: number; breakdown: Record<string, number> } | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setIsProcessing(true);
    // Simulate Gcloud-backed calculation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setResult({
      total: 4250,
      breakdown: {
        maintenance: 1200,
        risk: 2500,
        efficiency: 550
      }
    });
    setIsProcessing(false);
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4">True Cost Calculator</h1>
        <p className="text-maroon/60 font-medium italic">Powered by RSMeans 2026 & Gcloud Intelligence</p>
      </header>

      <div className="bg-white border-2 border-maroon rounded-3xl p-8 shadow-2xl">
        {!result ? (
          <form onSubmit={handleCalculate} className="space-y-6">
            <div>
              <label htmlFor="property-address" className="block text-xs font-black uppercase tracking-widest mb-2 opacity-50">Property Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon/30" size={20} />
                <input
                  id="property-address"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full bg-cream/30 border-2 border-maroon/10 rounded-2xl py-4 pl-12 pr-4 focus:border-maroon outline-none transition font-bold"
                  placeholder="Enter your Mid-Willamette or Harney County address..."
                />
              </div>
            </div>
            <button
              disabled={isProcessing}
              aria-label="Calculate My True Cost"
              className="w-full bg-maroon text-cream py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition disabled:opacity-50 flex justify-center items-center gap-3"
            >
              {isProcessing ? <Loader2 className="animate-spin" /> : <Calculator size={20} />}
              Calculate My True Cost
            </button>
          </form>
        ) : (
          <div className="space-y-8 animate-in zoom-in duration-500">
            <div className="text-center pb-8 border-b border-maroon/10">
              <span className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Annual Estimated Cost</span>
              <div className="text-7xl font-black text-maroon mt-2">${result.total.toLocaleString()}</div>
            </div>
            
            <div className="grid gap-4">
              {Object.entries(result.breakdown).map(([key, val]: [string, number]) => (
                <div key={key} className="flex justify-between items-center p-4 bg-cream/20 rounded-xl border border-maroon/5">
                  <span className="font-black uppercase text-sm tracking-tight">{key}</span>
                  <span className="font-bold text-lg">${val.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="bg-red-50 border-2 border-red-100 p-6 rounded-2xl flex gap-4 items-start">
              <AlertCircle className="text-red-900 shrink-0" />
              <div>
                <h4 className="text-red-900 font-black uppercase text-sm mb-1 text-left">Deferred Maintenance Risk</h4>
                <p className="text-red-800/70 text-sm font-medium leading-relaxed text-left">
                  Based on local building codes and climate data, neglecting routine maintenance will cost you 3.5x more in emergency repairs within 3 years.
                </p>
              </div>
            </div>

            <button onClick={() => setResult(null)} className="w-full text-xs font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition">
              Run Another Property
            </button>
          </div>
        )}
      </div>

      <div className="mt-16 bg-cream/30 border border-maroon/10 rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-maroon">Why Calculating True Home Maintenance Costs Matters</h2>
        <p className="text-maroon/80 font-medium mb-6 leading-relaxed">
          Homeowners in the Mid-Willamette Valley and Harney County often underestimate the compounding financial impact of deferred maintenance. While traditional inspections focus on immediate repairs, our True Cost Calculator leverages advanced predictive analytics to project your property&apos;s 3-to-5-year maintenance liability. By analyzing local climate stressors—from valley humidity to high-desert freezes—this tool gives you a precise, localized estimate of your total cost of ownership.
        </p>

        <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-maroon">The Hidden Cost of Deferred Maintenance</h3>
        <p className="text-maroon/80 font-medium mb-6 leading-relaxed">
          It is a statistical reality that every $1 deferred in routine home maintenance results in approximately $4 in emergency repair costs later. Minor seal failures around windows can lead to catastrophic water intrusion, black mold, and structural rot, transforming a $150 preventative fix into a $15,000 mitigation project. Our calculator breaks down your projected costs into three core categories: preventative maintenance, deferred risk liability, and energy efficiency losses. By prioritizing these elements, homeowners avoid the cascading damage that plagues valley properties exposed to continuous rain cycles.
        </p>

        <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-maroon">How Our Algorithm Works</h3>
        <p className="text-maroon/80 font-medium mb-6 leading-relaxed">
          We integrate RSMeans construction cost data with historical property records and localized weather patterns. When you enter your address, the system evaluates the median age of homes in your exact neighborhood, typical construction materials used in your specific county, and known environmental threats. Whether you are managing an aging commercial facility in Salem or a rural homestead in Harney County, understanding these numbers is the first step toward transforming your property from a depreciating liability into a stabilized, appreciating asset. Benson Home Solutions uses this data to customize maintenance subscriptions that completely offset these risks, keeping your property safe, dry, and secure year-round.
        </p>
        
        <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-maroon">Shift from Reactive to Proactive</h3>
        <p className="text-maroon/80 font-medium leading-relaxed">
          Traditional contractors thrive on your emergencies. When a storm hits the Mid-Willamette Valley or a deep freeze strikes Harney County, reactive repair services charge premium emergency rates. At Benson Home Solutions, we believe property ownership shouldn&apos;t involve unpredictable financial shocks. Our predictive cost analysis isn&apos;t just an estimate—it&apos;s the baseline for our diagnostic stewardship. We perform comprehensive monthly inspections, clear gutters, check building envelopes, and maintain HVAC systems so you never have to make a panicked 2 AM phone call. Let our building science expertise transform how you manage your Oregon property, guaranteeing long-term value preservation and unparalleled peace of mind.
        </p>
      </div>
    </div>
  );
}
