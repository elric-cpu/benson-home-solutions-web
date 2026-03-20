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
              <label className="block text-xs font-black uppercase tracking-widest mb-2 opacity-50">Property Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon/30" size={20} />
                <input
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
              className="w-full bg-maroon text-cream py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition disabled:opacity-50 flex justify-center items-center gap-3"
            >
              {isProcessing ? <Loader2 className="animate-spin" /> : <Calculator size={20} />}
              Analyze My Property
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
    </div>
  );
}
