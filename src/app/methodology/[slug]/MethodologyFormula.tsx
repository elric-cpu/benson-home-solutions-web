'use client';

import { Card, CardContent } from '@/components/ui';

interface Props {
  formula: string;
  variables: { name: string; description: string }[];
  example?: string;
}

export function MethodologyFormula({ formula, variables, example }: Props) {
  return (
    <Card variant="outlined" className="bg-slate/5 border-slate/10 my-8 overflow-hidden shadow-sm">
      <div className="bg-oxblood/5 border-slate/10 border-b px-6 py-3">
        <h4 className="text-oxblood flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="8" x2="16" y1="12" y2="12" />
            <line x1="12" x2="12" y1="8" y2="16" />
          </svg>
          Transparent Calculation Formula
        </h4>
      </div>
      <CardContent className="p-8">
        <div className="mb-8 font-mono text-xl font-bold text-charcoal md:text-2xl">
          {formula}
        </div>
        
        <div className="space-y-4">
          <h5 className="text-slate text-[10px] font-black tracking-widest uppercase opacity-50">Variables & Constants</h5>
          <div className="grid gap-4 sm:grid-cols-2">
            {variables.map((v, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-oxblood font-mono font-bold">{v.name}</span>
                <span className="text-slate/70">{v.description}</span>
              </div>
            ))}
          </div>
        </div>

        {example && (
          <div className="bg-white/50 mt-8 rounded-lg border border-slate/10 p-4 text-sm italic text-slate/60">
            <strong>Example:</strong> {example}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
