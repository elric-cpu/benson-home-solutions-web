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
  address: {
    street: '',
    city: 'Albany',
    state: 'OR',
    zip: '97321',
  },
  gbp: 'https://maps.app.goo.gl/ad4eywwWonPsSZXP9',
  facebook: 'https://www.facebook.com/profile.php?id=61565667928376',
  ccb: 'https://search.ccb.state.or.us/search/search_results.aspx?license_number=258533',
  bbb: 'https://www.bbb.org/us/or/albany/profile/general-contractor/benson-home-solutions-1296-1000137452',
  yelp: 'https://www.yelp.com/biz/benson-home-solutions-albany',
} as const;

export const HUBSPOT = {
  portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '',
  calculatorFormId: process.env.NEXT_PUBLIC_HUBSPOT_CALCULATOR_FORM_ID || '',
  contactFormId: process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID || '',
} as const;

export const HERO_ASSETS = {
  homepage:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000',
  emergency:
    'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=2000',
  waterDamage:
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=2000',
  maintenance:
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2000',
  remodeling:
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=2000',
  calculator:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
  configurator:
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000',
  about:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000',
} as const;

export const HERO_VIDEOS = {
  homepage:
    'https://assets.mixkit.co/videos/preview/mixkit-architect-working-on-a-blueprint-4244-large.mp4', // Cinematic technical work
  emergency:
    'https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-a-window-at-night-4401-large.mp4', // Subtle emergency mood
} as const;

export const SERVICE_AREAS = {
  midWillametteValley: [
    'Salem',
    'Keizer',
    'Wilsonville',
    'Corvallis',
    'Albany',
    'Lebanon',
    'Sweet Home',
  ],
  harneyCounty: ['Burns', 'Hines', 'Riley', 'Drewsey', 'Denio', 'McDermitt'],
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
