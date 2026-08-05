'use client';

import { useMemo, useState } from 'react';
import {
  Bot,
  Calculator,
  CheckCircle2,
  Database,
  FileSpreadsheet,
  FolderKanban,
  Hammer,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';

type View = 'dashboard' | 'projects' | 'estimates' | 'catalog' | 'assistant' | 'scripts' | 'settings';
type ProjectStatus = 'Lead' | 'Estimating' | 'Active' | 'Complete';

type Project = {
  id: number;
  name: string;
  client: string;
  location: string;
  status: ProjectStatus;
  contract: number;
  spent: number;
};

type CostItem = {
  id: number;
  code: string;
  name: string;
  unit: string;
  rate: number;
  trade: string;
  region: string;
  source: string;
  approved: boolean;
};

type EstimateLine = CostItem & { quantity: number; markup: number };

const starterProjects: Project[] = [
  { id: 1, name: 'Hines Insurance Reconstruction', client: 'Owner File', location: 'Hines, OR', status: 'Active', contract: 240750, spent: 68450 },
  { id: 2, name: 'Frenchglen RV Dump Rebuild', client: 'Steens Mountain Wilderness Resort', location: 'Frenchglen, OR', status: 'Complete', contract: 7850, spent: 5610 },
  { id: 3, name: 'Bathroom Floor Restoration', client: 'Residential Client', location: 'Junction City, OR', status: 'Estimating', contract: 4200, spent: 0 },
];

const starterCatalog: CostItem[] = [
  { id: 1, code: '09-2900', name: 'Gypsum board installation and finishing', unit: 'SF', rate: 3.85, trade: 'Drywall', region: 'US-West', source: 'OpenConstructionERP export sample', approved: false },
  { id: 2, code: '08-5300', name: 'Vinyl replacement window allowance', unit: 'EA', rate: 1250, trade: 'Openings', region: 'US-West', source: 'OpenConstructionERP export sample', approved: false },
  { id: 3, code: '03-3000', name: 'Small concrete placement', unit: 'CY', rate: 850, trade: 'Concrete', region: 'Eastern Oregon', source: 'OpenConstructionERP export sample', approved: false },
  { id: 4, code: '01-5000', name: 'Remote mobilization and material staging', unit: 'DAY', rate: 650, trade: 'General Conditions', region: 'Harney County', source: 'Benson internal rate', approved: true },
  { id: 5, code: '02-4100', name: 'Selective interior demolition crew', unit: 'HR', rate: 145, trade: 'Demolition', region: 'Eastern Oregon', source: 'Benson internal rate', approved: true },
  { id: 6, code: '06-1000', name: 'Carpentry and framing crew', unit: 'HR', rate: 165, trade: 'Carpentry', region: 'Eastern Oregon', source: 'Benson internal rate', approved: true },
];

const scripts = [
  ['Import OpenConstructionERP Catalog', 'scripts/import_openconstructionerp_catalog.py'],
  ['Reconcile Cost Catalog', 'scripts/reconcile_cost_catalog.py'],
  ['Draft Estimate from Scope', 'scripts/estimate_from_scope.py'],
  ['Job Cost Variance', 'scripts/job_cost_variance.py'],
];

const nav: Array<[View, string, typeof LayoutDashboard]> = [
  ['dashboard', 'Dashboard', LayoutDashboard],
  ['projects', 'Projects', FolderKanban],
  ['estimates', 'Estimates', Calculator],
  ['catalog', 'Cost Catalog', Database],
  ['assistant', 'AI Assistant', Bot],
  ['scripts', 'Python Jobs', FileSpreadsheet],
  ['settings', 'Settings', Settings],
];

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0);

function parseCsv(text: string): CostItem[] {
  const rows = text.split(/\r?\n/).filter(Boolean);
  if (rows.length < 2) return [];
  const headers = rows[0].split(',').map((v) => v.trim().toLowerCase());
  return rows.slice(1).flatMap((row, index) => {
    const values = row.split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
    const record = Object.fromEntries(headers.map((header, i) => [header, values[i] || '']));
    const name = record.name || record.description || record.item_name;
    const rate = Number(record.rate || record.price || record.unit_cost || 0);
    if (!name || !rate) return [];
    return [{
      id: Date.now() + index,
      code: record.cost_code || record.code || 'UNMAPPED',
      name,
      unit: record.uom || record.unit || 'EA',
      rate,
      trade: record.trade || record.category || 'Unclassified',
      region: record.region || record.market || 'Unspecified',
      source: 'OpenConstructionERP authorized CSV export',
      approved: false,
    }];
  });
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-[#e0d8ce] bg-white shadow-[0_8px_24px_rgba(74,31,36,0.05)] ${className}`}>{children}</div>;
}

export default function ErpPage() {
  const [view, setView] = useState<View>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projects, setProjects] = useState(starterProjects);
  const [catalog, setCatalog] = useState(starterCatalog);
  const [estimate, setEstimate] = useState<EstimateLine[]>([]);
  const [search, setSearch] = useState('');
  const [prompt, setPrompt] = useState('Replace a leaking exterior faucet with a frost-free yard hydrant. Existing line may be galvanized. Include excavation, adapters, shutoff, backfill, testing, and remote mobilization.');
  const [aiResult, setAiResult] = useState<Record<string, any> | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const filteredCatalog = useMemo(() => catalog.filter((item) => `${item.code} ${item.name} ${item.trade} ${item.region}`.toLowerCase().includes(search.toLowerCase())), [catalog, search]);
  const backlog = projects.filter((p) => p.status !== 'Complete').reduce((sum, p) => sum + p.contract, 0);
  const spent = projects.reduce((sum, p) => sum + p.spent, 0);
  const estimateTotal = estimate.reduce((sum, line) => sum + line.quantity * line.rate * (1 + line.markup / 100), 0);

  const addProject = () => {
    setProjects((current) => [{ id: Date.now(), name: 'New Project', client: 'Unassigned', location: 'Oregon', status: 'Lead', contract: 0, spent: 0 }, ...current]);
  };

  const importCsv = async (file?: File) => {
    if (!file) return;
    const imported = parseCsv(await file.text());
    setCatalog((current) => [...imported, ...current]);
  };

  const askAi = async () => {
    setAiLoading(true);
    setAiResult(null);
    try {
      const response = await fetch('/api/estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_type: 'construction scope review', details: prompt }),
      });
      setAiResult(await response.json());
    } catch {
      setAiResult({ error: 'The configured estimator endpoint could not be reached.' });
    } finally {
      setAiLoading(false);
    }
  };

  const content = {
    dashboard: (
      <>
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b454d]">Operating position</p><h1 className="mt-1 font-serif text-3xl font-bold">Construction control center</h1><p className="mt-2 text-sm text-[#6f6762]">Projects, estimating, cost intelligence, and field automation in one modular workspace.</p></div>
          <button onClick={addProject} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#722f37] px-4 py-3 text-sm font-semibold text-[#f5f1e8]"><Plus className="h-4 w-4" />New project</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[['Active projects', String(projects.filter((p) => p.status === 'Active').length), 'Current jobs'], ['Open backlog', money(backlog), 'Excludes complete'], ['Recorded cost', money(spent), 'Starter actuals'], ['Catalog review', String(catalog.filter((c) => !c.approved).length), 'Rates awaiting approval']].map(([label, value, note]) => <Card key={label} className="p-5"><p className="text-sm font-semibold text-[#6f6762]">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p><p className="mt-1 text-xs text-[#817872]">{note}</p></Card>)}
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
          <Card><div className="border-b border-[#eee7de] px-5 py-4"><h2 className="font-serif text-lg font-bold">Project pulse</h2></div><div className="divide-y divide-[#eee7de]">{projects.map((p) => <div key={p.id} className="px-5 py-4"><div className="flex justify-between gap-4"><div><p className="font-semibold">{p.name}</p><p className="mt-1 text-xs text-[#817872]">{p.client} · {p.location}</p></div><div className="text-right"><p className="font-semibold">{money(p.contract)}</p><p className="text-xs text-[#817872]">{money(p.spent)} recorded</p></div></div><div className="mt-3 h-1.5 rounded-full bg-[#eee7de]"><div className="h-full rounded-full bg-[#722f37]" style={{ width: `${Math.min(100, p.contract ? p.spent / p.contract * 100 : 0)}%` }} /></div></div>)}</div></Card>
          <Card className="bg-[#4a1f24] p-5 text-[#f5f1e8]"><Sparkles className="h-6 w-6" /><h2 className="mt-5 font-serif text-xl font-bold">AI estimate review</h2><p className="mt-2 text-sm leading-6 text-[#dccEC3]">Send scope language to the existing Benson estimator endpoint. Every result still requires human approval.</p><button onClick={() => setView('assistant')} className="mt-5 text-sm font-semibold">Open assistant →</button></Card>
        </div>
      </>
    ),
    projects: (
      <><div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b454d]">Project management</p><h1 className="mt-1 font-serif text-3xl font-bold">Projects</h1></div><button onClick={addProject} className="rounded-xl bg-[#722f37] px-4 py-2.5 text-sm font-semibold text-[#f5f1e8]">+ Add project</button></div><Card><div className="divide-y divide-[#eee7de]">{projects.map((p) => <div key={p.id} className="grid gap-3 px-5 py-4 md:grid-cols-[1.5fr_.7fr_.7fr_.7fr] md:items-center"><div><p className="font-semibold">{p.name}</p><p className="text-xs text-[#817872]">{p.client} · {p.location}</p></div><span className="w-fit rounded-full bg-[#f5f1e8] px-2.5 py-1 text-xs font-semibold text-[#722f37]">{p.status}</span><p>{money(p.contract)}</p><p>{money(p.spent)} spent</p></div>)}</div></Card></>
    ),
    estimates: (
      <><div className="mb-5"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b454d]">Precision estimating</p><h1 className="mt-1 font-serif text-3xl font-bold">Working estimate</h1></div><div className="grid gap-6 xl:grid-cols-[.8fr_1.4fr]"><Card className="p-5"><h2 className="font-serif text-lg font-bold">Add catalog items</h2><div className="mt-4 space-y-2">{catalog.slice(0, 8).map((item) => <button key={item.id} onClick={() => setEstimate((current) => [...current, { ...item, quantity: 1, markup: 20 }])} className="flex w-full items-center justify-between rounded-xl border border-[#e0d8ce] p-3 text-left hover:bg-[#faf8f3]"><span><span className="block text-xs font-bold text-[#8b454d]">{item.code}</span><span className="text-sm font-semibold">{item.name}</span></span><Plus className="h-4 w-4" /></button>)}</div></Card><Card><div className="flex items-center justify-between border-b border-[#eee7de] px-5 py-4"><h2 className="font-serif text-lg font-bold">Line items</h2><strong>{money(estimateTotal)}</strong></div>{estimate.length === 0 ? <p className="p-8 text-center text-sm text-[#817872]">Add catalog items to build an estimate.</p> : <div className="divide-y divide-[#eee7de]">{estimate.map((line, index) => <div key={`${line.id}-${index}`} className="p-5"><div className="flex justify-between"><div><p className="text-xs font-bold text-[#8b454d]">{line.code}</p><p className="font-semibold">{line.name}</p></div><button onClick={() => setEstimate((current) => current.filter((_, i) => i !== index))}><X className="h-4 w-4" /></button></div><div className="mt-3 grid grid-cols-3 gap-2"><input type="number" value={line.quantity} onChange={(e) => setEstimate((current) => current.map((v, i) => i === index ? { ...v, quantity: Number(e.target.value) } : v))} className="rounded-lg border p-2 text-sm" /><input type="number" value={line.rate} onChange={(e) => setEstimate((current) => current.map((v, i) => i === index ? { ...v, rate: Number(e.target.value) } : v))} className="rounded-lg border p-2 text-sm" /><input type="number" value={line.markup} onChange={(e) => setEstimate((current) => current.map((v, i) => i === index ? { ...v, markup: Number(e.target.value) } : v))} className="rounded-lg border p-2 text-sm" /></div><p className="mt-2 text-right font-bold text-[#722f37]">{money(line.quantity * line.rate * (1 + line.markup / 100))}</p></div>)}</div>}</Card></div></>
    ),
    catalog: (
      <><div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b454d]">Cost intelligence</p><h1 className="mt-1 font-serif text-3xl font-bold">Cost catalog</h1><p className="mt-2 text-sm text-[#6f6762]">Import an authorized OpenConstructionERP CSV export. New rates remain unapproved until reviewed.</p></div><div className="flex gap-2"><label className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2.5"><Search className="h-4 w-4" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search catalog" className="outline-none" /></label><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#722f37] px-4 py-2.5 text-sm font-semibold text-[#f5f1e8]"><Upload className="h-4 w-4" />Import CSV<input type="file" accept=".csv" className="hidden" onChange={(e) => void importCsv(e.target.files?.[0])} /></label></div></div><Card><div className="divide-y divide-[#eee7de]">{filteredCatalog.map((item) => <div key={item.id} className="grid gap-3 px-5 py-4 lg:grid-cols-[.5fr_1.5fr_.7fr_.7fr_.7fr]"><span className="text-xs font-bold text-[#8b454d]">{item.code}</span><div><p className="font-semibold">{item.name}</p><p className="text-xs text-[#817872]">{item.source}</p></div><span>{item.trade}</span><span>{money(item.rate)}/{item.unit}</span>{item.approved ? <span className="text-xs font-semibold text-emerald-700">✓ Approved</span> : <button onClick={() => setCatalog((current) => current.map((v) => v.id === item.id ? { ...v, approved: true } : v))} className="w-fit rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold">Approve</button>}</div>)}</div></Card></>
    ),
    assistant: (
      <><div className="mb-5"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b454d]">Human-controlled AI</p><h1 className="mt-1 font-serif text-3xl font-bold">AI estimating assistant</h1></div><div className="grid gap-6 xl:grid-cols-2"><Card className="p-5"><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={12} className="w-full rounded-xl border bg-[#faf8f3] p-4 text-sm leading-6" /><button onClick={() => void askAi()} disabled={aiLoading} className="mt-4 w-full rounded-xl bg-[#722f37] px-4 py-3 text-sm font-semibold text-[#f5f1e8]">{aiLoading ? 'Reviewing scope…' : 'Generate AI estimate review'}</button></Card><Card className="p-5"><h2 className="font-serif text-lg font-bold">Assistant output</h2>{!aiResult ? <p className="mt-6 text-sm text-[#817872]">Submit a scope to call the existing Benson estimator endpoint.</p> : aiResult.error ? <p className="mt-6 rounded-xl bg-rose-50 p-4 text-sm text-rose-900">{aiResult.error}</p> : <pre className="mt-4 max-h-[520px] overflow-auto whitespace-pre-wrap rounded-xl bg-[#2d2d2d] p-4 text-xs text-[#f5f1e8]">{JSON.stringify(aiResult, null, 2)}</pre>}</Card></div></>
    ),
    scripts: (
      <><div className="mb-5"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b454d]">Controlled automation</p><h1 className="mt-1 font-serif text-3xl font-bold">Python job registry</h1><p className="mt-2 text-sm text-[#6f6762]">Whitelisted scripts from the FastAPI source package. Execution remains gated until the Python backend is deployed.</p></div><div className="grid gap-4 md:grid-cols-2">{scripts.map(([name, path]) => <Card key={path} className="p-5"><FileSpreadsheet className="h-5 w-5 text-[#722f37]" /><h2 className="mt-4 font-serif text-lg font-bold">{name}</h2><code className="mt-4 block rounded-lg bg-[#2d2d2d] p-3 text-xs text-[#f5f1e8]">{path}</code><p className="mt-3 text-xs font-semibold text-amber-700">API gated</p></Card>)}</div></>
    ),
    settings: (
      <><div className="mb-5"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b454d]">Configuration</p><h1 className="mt-1 font-serif text-3xl font-bold">Settings</h1></div><div className="grid gap-6 md:grid-cols-2"><Card className="p-5"><h2 className="font-serif text-lg font-bold">Company profile</h2><dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><dt className="text-[#817872]">Business</dt><dd className="font-semibold">Benson Enterprises LLC</dd></div><div className="flex justify-between"><dt className="text-[#817872]">Brand</dt><dd className="font-semibold">Benson Home Solutions</dd></div><div className="flex justify-between"><dt className="text-[#817872]">Oregon CCB</dt><dd className="font-semibold">#258533</dd></div><div className="flex justify-between"><dt className="text-[#817872]">Palette</dt><dd className="font-semibold">Oxblood / Ford cream</dd></div></dl></Card><Card className="p-5"><h2 className="font-serif text-lg font-bold">Deployment profile</h2><div className="mt-4 space-y-3 text-sm"><p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" />Responsive web interface</p><p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" />Existing estimator API route</p><p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-600" />Production auth pending</p><p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-600" />PostgreSQL persistence pending</p></div></Card></div></>
    ),
  }[view];

  return <div className="min-h-screen bg-[#f3efe8] text-[#2d2d2d]">
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-[#4a1f24] lg:block"><div className="flex h-20 items-center gap-3 border-b border-white/10 px-6"><div className="grid h-11 w-11 place-items-center rounded-xl bg-[#f5f1e8] text-[#722f37]"><Hammer className="h-6 w-6" /></div><div><p className="font-serif font-bold tracking-wide text-[#f5f1e8]">BENSON</p><p className="text-[10px] font-semibold uppercase tracking-[.19em] text-[#dccEC3]">Construction ERP</p></div></div><nav className="space-y-1 p-4">{nav.map(([id, label, Icon]) => <button key={id} onClick={() => setView(id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${view === id ? 'bg-[#f5f1e8] text-[#722f37]' : 'text-[#f5f1e8] hover:bg-white/10'}`}><Icon className="h-4 w-4" />{label}</button>)}</nav></aside>
    {mobileOpen && <div className="fixed inset-0 z-50 bg-[#4a1f24] p-4 lg:hidden"><button onClick={() => setMobileOpen(false)} className="mb-5 text-[#f5f1e8]"><X /></button>{nav.map(([id, label, Icon]) => <button key={id} onClick={() => { setView(id); setMobileOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[#f5f1e8]"><Icon className="h-5 w-5" />{label}</button>)}</div>}
    <main className="lg:ml-72"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#ded5c9] bg-[#faf8f3]/95 px-4 backdrop-blur lg:h-20 lg:px-8"><div className="flex items-center gap-3"><button onClick={() => setMobileOpen(true)} className="rounded-xl border bg-white p-2 text-[#722f37] lg:hidden"><Menu className="h-5 w-5" /></button><div><p className="font-serif text-lg font-bold">{nav.find(([id]) => id === view)?.[1]}</p><p className="hidden text-xs text-[#766d68] sm:block">Benson Enterprises LLC · Modular operations workspace</p></div></div><button onClick={() => setView('assistant')} className="inline-flex items-center gap-2 rounded-xl bg-[#722f37] px-3.5 py-2.5 text-sm font-semibold text-[#f5f1e8]"><Sparkles className="h-4 w-4" />Ask AI</button></header><div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8"><div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"><strong>Deployment preview:</strong> authentication, PostgreSQL persistence, document generation, and Python execution remain gated. Current edits exist only for this browser session.</div>{content}</div></main>
  </div>;
}
