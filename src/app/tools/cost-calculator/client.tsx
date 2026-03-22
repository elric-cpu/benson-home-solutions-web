'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Section, Button, Badge, Card } from '@/components/ui';
import { AlertTriangle, Droplets, TrendingUp, ShieldCheck, Share2 } from 'lucide-react';


const sidingTypes = [
  { name: 'Wood / Cedar', risk: 0.9, maintenance: 'High' },
  { name: 'Hardie / Fiber Cement', risk: 0.3, maintenance: 'Medium' },
  { name: 'Vinyl', risk: 0.4, maintenance: 'Low' },
  { name: 'Brick / Stone', risk: 0.1, maintenance: 'Low' },
];

const locations = [
  { name: 'Mid-Willamette Valley (Rain Focus)', rainfall: 45, humidity: 80 },
  { name: 'Harney County (High Desert)', rainfall: 10, humidity: 20 },
  { name: 'Coastal Oregon (Salt/Wind)', rainfall: 80, humidity: 90 },
];

export default function RotRiskSimulator() {
  const [yearsDeferred, setYearsDeferred] = useState(0);
  const [siding, setSiding] = useState(sidingTypes[0]);
  const [location, setLocation] = useState(locations[0]);

  // Derived state (replaces useEffect)
  const baseMaint = 150 * (yearsDeferred || 1);
  const mult = location.rainfall > 40 ? 1.8 : 1.3;
  const baseRest = 1500 * Math.pow(mult, yearsDeferred) * siding.risk;

  const repairCost = Math.round(baseMaint);
  const restorationCost = Math.round(baseRest);

  const riskScore = Math.min(100, Math.round((yearsDeferred * 15) * siding.risk * (location.rainfall / 30)));

  return (
    <main>
      <Section variant="cream" spacing="lg">
        <Container className="text-center">
          <Badge variant="secondary" className="mb-6 uppercase tracking-widest font-black border-oxblood/30 text-oxblood px-4 py-1.5">
            Interactive Building Science Tool
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-oxblood">
            The Oregon <br />
            <span className="italic text-oxblood/60">Rot Risk Simulator.</span>
          </h1>
          <p className="text-xl text-oxblood/80 max-w-2xl mx-auto font-medium">
            How long until a $150 gutter cleaning turns into a $15,000 siding restoration? Use the Rot Clock to find out.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Card className="p-8 shadow-2xl border-oxblood/5">
              <h2 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-8">Set Your Parameters</h2>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-oxblood/60 mb-4">
                    Years since last forensic audit: {yearsDeferred}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={yearsDeferred}
                    onChange={(e) => setYearsDeferred(parseInt(e.target.value))}
                    className="w-full h-3 bg-oxblood/10 rounded-lg appearance-none cursor-pointer accent-oxblood"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-oxblood/40 uppercase">
                    <span>Just Audited</span>
                    <span>10 Years (Critical)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-oxblood/60 mb-2">Location</label>
                    <select 
                      className="w-full p-3 bg-cream border-2 border-oxblood/10 rounded-xl font-bold text-oxblood outline-none focus:border-oxblood"
                      onChange={(e) => setLocation(locations.find(l => l.name === e.target.value) || locations[0])}
                    >
                      {locations.map(l => <option key={l.name}>{l.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-oxblood/60 mb-2">Siding Type</label>
                    <select 
                      className="w-full p-3 bg-cream border-2 border-oxblood/10 rounded-xl font-bold text-oxblood outline-none focus:border-oxblood"
                      onChange={(e) => setSiding(sidingTypes.find(s => s.name === e.target.value) || sidingTypes[0])}
                    >
                      {sidingTypes.map(s => <option key={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-8">
              <Card className={`p-8 border-none text-cream transition-all duration-500 ${riskScore > 50 ? 'bg-red-900' : 'bg-oxblood'}`}>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-sm font-black uppercase tracking-widest opacity-60 mb-1">Rot Risk Score</div>
                    <div className="text-6xl font-black italic">{riskScore}%</div>
                  </div>
                  <AlertTriangle className={`w-12 h-12 ${riskScore > 50 ? 'animate-pulse' : 'opacity-20'}`} />
                </div>
                
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-cream/10">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Maintenance Cost</div>
                    <div className="text-2xl font-black">${repairCost.toLocaleString()}</div>
                    <div className="text-[10px] opacity-60 mt-1 italic">Proactive Care</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Est. Restoration Cost</div>
                    <div className="text-2xl font-black text-red-400">${restorationCost.toLocaleString()}</div>
                    <div className="text-[10px] opacity-60 mt-1 italic">Reactive Repair</div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm font-medium leading-relaxed opacity-80 mb-6">
                    {riskScore < 20 
                      ? "You're in the safe zone, but Oregon's rain is persistent. A monthly audit keeps your score at zero."
                      : riskScore < 60
                      ? "Significant risk detected. Moisture is likely trapped behind your building envelope right now."
                      : "CRITICAL ALERT: Your property is likely sustaining active structural decay. Immediate forensic intervention required."
                    }
                  </p>
                  <div className="flex gap-4">
                    <Link href="/contact" className="flex-1">
                      <Button variant="secondary" className="w-full font-black uppercase tracking-widest">
                        Request Audit
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-cream text-cream hover:bg-cream hover:text-oxblood">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-cream p-4 rounded-xl text-center border border-oxblood/5">
                  <Droplets className="w-5 h-5 text-oxblood mx-auto mb-2" />
                  <div className="text-lg font-black text-oxblood">{location.rainfall}&quot;</div>
                  <div className="text-[8px] font-bold uppercase tracking-widest opacity-40">Annual Rain</div>
                </div>
                <div className="bg-cream p-4 rounded-xl text-center border border-oxblood/5">
                  <TrendingUp className="w-5 h-5 text-oxblood mx-auto mb-2" />
                  <div className="text-lg font-black text-oxblood">x{yearsDeferred || 1}</div>
                  <div className="text-[8px] font-bold uppercase tracking-widest opacity-40">Degradation</div>
                </div>
                <div className="bg-cream p-4 rounded-xl text-center border border-oxblood/5">
                  <ShieldCheck className="w-5 h-5 text-oxblood mx-auto mb-2" />
                  <div className="text-lg font-black text-oxblood">{siding.maintenance}</div>
                  <div className="text-[8px] font-bold uppercase tracking-widest opacity-40">Need</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      <Section variant="cream">
        <Container size="narrow" className="text-center">
          <h3 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-6">Why This Matters</h3>
          <p className="text-slate font-medium leading-relaxed mb-8">
            In Oregon, moisture doesn&apos;t just sit on the surface. It uses capillary action to pull itself into your framing. By the time you see a stain on your drywall, the structure is already compromised. 
            <strong> Forensic maintenance identifies the moisture before the rot begins.</strong>
          </p>
          <div className="inline-flex gap-8 items-center py-4 px-8 bg-oxblood/5 rounded-2xl border border-oxblood/10">
            <div className="text-left">
              <div className="text-2xl font-black text-oxblood">3:1</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Maintenance ROI</div>
            </div>
            <div className="w-px h-8 bg-oxblood/10" />
            <div className="text-left">
              <div className="text-2xl font-black text-oxblood">24hr</div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Mold Growth Window</div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
