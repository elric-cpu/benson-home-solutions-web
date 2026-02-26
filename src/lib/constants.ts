export const BUSINESS = {
  name: 'Benson Home Solutions',
  owner: 'Elric Benson',
  phone: '(541) 321-5115',
  email: 'office@bensonhomesolutions.com',
  license: 'CCB #258533',
  ein: '33-4085009',
  rating: '4.9/5',
  experience: '10+ Years',
  projects: '200+',
  url: 'https://bensonhomesolutions.com',
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
  font: 'Calibri',
} as const;
