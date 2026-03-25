'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
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
        'Preventative Maintenance': 1200,
        'Deferred Repair Risk': 2500,
        'Energy Waste': 550
      }
    });
    setIsProcessing(false);
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-4">The True Cost of Ownership</h1>
        <p className="text-maroon/60 font-medium italic max-w-2xl mx-auto">
          This isn&apos;t just about your mortgage. We analyze your property&apos;s address to estimate the hidden costs of maintenance, energy loss, and deferred repair risk in our climate.
        </p>
      </header>

      <div className="bg-white border-2 border-maroon rounded-3xl p-8 shadow-2xl">
        {!result ? (
          <form onSubmit={handleCalculate} className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-50">Enter Your Property Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon/30" size={20} />
                <input
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full bg-cream/30 border-2 border-maroon/10 rounded-2xl py-4 pl-12 pr-4 focus:border-maroon outline-none transition font-bold"
                  placeholder="e.g., 123 Main St, Salem, OR"
                />
              </div>
            </div>
            <button
              disabled={isProcessing}
              className="w-full bg-maroon text-cream py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition disabled:opacity-50 flex justify-center items-center gap-3"
            >
              {isProcessing ? <Loader2 className="animate-spin" /> : <Calculator size={20} />}
              Calculate My True Cost
            </button>
          </form>
        ) : (
          <div className="space-y-8 animate-in zoom-in duration-500">
            <div className="text-center pb-8 border-b border-maroon/10">
              <span className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Estimated Annual Cost of Ownership</span>
              <div className="text-7xl font-black text-maroon mt-2">${result.total.toLocaleString()}</div>
              <p className="text-sm font-medium text-slate mt-2">This is our estimate of what it costs to properly maintain your property and avoid costly emergency repairs.</p>
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
                <h4 className="text-red-900 font-black uppercase text-sm mb-1 text-left">A Note from Elric Benson</h4>
                <p className="text-red-800/70 text-sm font-medium leading-relaxed text-left">
                  {`"The 'Deferred Repair Risk' is the number that gets most people into trouble. It's the cost of waiting for something to break. Our maintenance plans are designed to turn that risk into an asset."`}
                </p>
              </div>
            </div>
            
            <div className="text-center pt-8 border-t border-maroon/10">
                <h3 className="text-2xl font-black text-oxblood mb-4">Ready to Lower Your Risk?</h3>
                <p className="text-slate mb-6">Our maintenance plans are the most effective way to reduce your long-term costs and protect the value of your property.</p>
                <Link href="/plans">
                    <Button size="lg" className="font-black uppercase tracking-widest">
                        Explore Our Plans
                    </Button>
                </Link>
            </div>

            <button onClick={() => setResult(null)} className="w-full text-xs font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition pt-6">
              Calculate for Another Property
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
