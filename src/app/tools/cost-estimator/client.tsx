'use client';

import { useState } from 'react';
import { Container, Section, Button, Badge, Card } from '@/components/ui';
import { Building2, Calendar, ShieldAlert, FileText, PieChart, Info, Download } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

const assetCategories = [
  { name: 'Roofing Systems', life: 25, costPerSqFt: 12 },
  { name: 'HVAC Units', life: 15, costPerSqFt: 8 },
  { name: 'Siding / Envelope', life: 30, costPerSqFt: 18 },
  { name: 'Windows / Doors', life: 25, costPerSqFt: 15 },
  { name: 'Plumbing / Main Lines', life: 40, costPerSqFt: 10 },
];

export default function AssetLifecyclePlanner() {
  const [sqFt, setSqFt] = useState(5000);
  const [buildingAge, setBuildingAge] = useState(10);

  // Derived state (replaces useEffect)
  const totalReplacement = assetCategories.reduce((acc, cat) => acc + (cat.costPerSqFt * sqFt), 0);
  const avgLife = assetCategories.reduce((acc, cat) => acc + cat.life, 0) / assetCategories.length;
  
  const lifeUsed = Math.min(1, buildingAge / avgLife);
  const currentLiability = totalReplacement * lifeUsed;
  
  const totalLiability = Math.round(currentLiability);
  const annualBudget = Math.round(totalReplacement / avgLife);

  return (
    <main>
      <Section variant="charcoal" spacing="lg">
        <Container className="text-center">
          <Badge className="mb-6 bg-cream/10 text-cream border-cream/20 px-4 py-1.5 uppercase tracking-widest font-black">
            Board-Level Strategic Tool
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-cream">
            The 10-Year <br />
            <span className="italic opacity-60">Asset Forecaster.</span>
          </h1>
          <p className="text-xl text-cream/80 max-w-2xl mx-auto font-medium">
            For commercial boards and church committees. Calculate your hidden maintenance liability and plan your 10-year capital expenditure.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card className="p-8 border-oxblood/5 shadow-xl">
                <h2 className="text-2xl font-black uppercase tracking-tight text-oxblood mb-8">Building Profile</h2>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-oxblood/60 mb-4">
                      Total Square Footage: {sqFt.toLocaleString()} sq.ft
                    </label>
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="500"
                      value={sqFt}
                      onChange={(e) => setSqFt(parseInt(e.target.value))}
                      className="w-full h-3 bg-oxblood/10 rounded-lg appearance-none cursor-pointer accent-oxblood"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-oxblood/60 mb-4">
                      Average Building/System Age: {buildingAge} Years
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="1"
                      value={buildingAge}
                      onChange={(e) => setBuildingAge(parseInt(e.target.value))}
                      className="w-full h-3 bg-oxblood/10 rounded-lg appearance-none cursor-pointer accent-oxblood"
                    />
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-oxblood/5 p-6 rounded-2xl border border-oxblood/10">
                  <div className="flex items-center gap-2 text-oxblood mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Target Budget</span>
                  </div>
                  <div className="text-2xl font-black text-oxblood">${annualBudget.toLocaleString()}</div>
                  <div className="text-[10px] opacity-60 font-medium">Annual Reserve Needed</div>
                </div>
                <div className="bg-oxblood/5 p-6 rounded-2xl border border-oxblood/10">
                  <div className="flex items-center gap-2 text-oxblood mb-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Next Critical</span>
                  </div>
                  <div className="text-2xl font-black text-oxblood">{Math.max(1, 15 - buildingAge)} Yrs</div>
                  <div className="text-[10px] opacity-60 font-medium">Est. HVAC/Roof Failure</div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-oxblood text-cream border-none shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-sm font-black uppercase tracking-widest opacity-60 mb-2">Current Maintenance Liability</h3>
                <div className="text-6xl font-black italic mb-8">${totalLiability.toLocaleString()}</div>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4 border-b border-cream/10 pb-6">
                    <div className="p-3 bg-cream/10 rounded-xl"><PieChart className="w-6 h-6" /></div>
                    <div>
                      <div className="font-black uppercase tracking-widest text-xs mb-1">Asset Decay Score</div>
                      <div className="w-48 h-2 bg-cream/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cream transition-all duration-1000" 
                          style={{ width: `${Math.min(100, (buildingAge / 40) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cream/10 rounded-xl"><FileText className="w-6 h-6" /></div>
                    <div>
                      <div className="font-black uppercase tracking-widest text-xs mb-1">Board Ready Report</div>
                      <div className="text-sm opacity-80 font-medium">Detailed asset lifecycle breakdown available.</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="secondary" className="flex-1 font-black uppercase tracking-widest py-6">
                    Request Proposal
                  </Button>
                  <Button variant="outline" className="border-cream text-cream hover:bg-cream hover:text-oxblood py-6">
                    <Download className="w-4 h-4 mr-2" /> PDF
                  </Button>
                </div>
              </div>
              
              {/* Background Decoration */}
              <Building2 className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 pointer-events-none" />
            </Card>
          </div>
        </Container>
      </Section>

      <Section variant="cream">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Info className="w-12 h-12 text-oxblood/20 mx-auto mb-6" />
            <h3 className="text-3xl font-black uppercase tracking-tight text-oxblood mb-6">Stop Guessing. Start Budgeting.</h3>
            <p className="text-slate font-medium leading-relaxed mb-8">
              Commercial and non-profit boards are often surprised by multi-million dollar failures that could have been identified years in advance. 
              <strong> Benson Home Solutions</strong> provides the forensic data you need to move from reactive crisis management to strategic asset stewardship.
            </p>
            <div className="bg-oxblood text-cream p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <div className="text-xs font-black uppercase tracking-widest opacity-60">Emergency Priority</div>
                <div className="text-xl font-black italic">4hr Response SLA for Partners</div>
              </div>
              <a href={`tel:${BUSINESS.phone}`}>
                <Button variant="secondary" className="font-black uppercase tracking-widest">Call {BUSINESS.phone}</Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
