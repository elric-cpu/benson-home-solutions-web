export const BUSINESS = {
  name: 'Benson Home Solutions',
  owner: 'Elric Benson',
  phone: '(541) 321-5115',
  afterhoursPhone: '(541) 413-0480',
  email: 'office@bensonhomesolutions.com',
  license: 'CCB #258533',
  ein: '33-4085009',
  rating: '4.9/5',
  experience: '10+ Years',
  projects: '200+',
  url: 'https://bensonhomesolutions.com',
  gbp: 'https://maps.app.goo.gl/ad4eywwWonPsSZXP9',
  facebook: 'https://www.facebook.com/profile.php?id=61565667928376',
} as const;

export const HUBSPOT = {
  portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '49142342', // Placeholder
  calculatorFormId: process.env.NEXT_PUBLIC_HUBSPOT_CALCULATOR_FORM_ID || '555-666', // Placeholder
  contactFormId: process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID || '111-222', // Placeholder
} as const;

export const HERO_ASSETS = {
  homepage: 'https://images.unsplash.com/photo-1513584684374-8bdb74a9fe2f?auto=format&fit=crop&q=80&w=2000', // Modern Exterior
  emergency: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&q=80&w=2000', // Storm
  waterDamage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000', // Water/Bathroom
  maintenance: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=2000', // Tools
  remodeling: 'https://images.unsplash.com/photo-1556912177-c54030639a85?auto=format&fit=crop&q=80&w=2000', // Kitchen
  calculator: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000', // Architecture
  configurator: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=2000', // Interior
  about: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=2000', // Office
} as const;

export const SERVICE_AREAS = {
  midWillametteValley: [
    'Salem', 'Keizer', 'Wilsonville', 'Corvallis',
    'Albany', 'Lebanon', 'Sweet Home',
  ],
  harneyCounty: ['Burns', 'Riley', 'Drewsey', 'Denio', 'McDermitt'],
} as const;

export const BRAND = {
  colors: {
    oxblood: '#4C0C14',
    cream: '#FFFDF9',
    charcoal: '#2D2D2D',
    slate: '#4A4A4A',
  },
  /** Web typography: Source Sans 3 (variable, self-hosted). Calibri is print-only. */
  webFont: 'Source Sans 3',
  printFont: 'Calibri',
} as const;
