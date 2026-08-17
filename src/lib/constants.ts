export const BUSINESS = {
  legalName: 'Benson Enterprises, LLC',
  name: 'Benson Home Solutions',
  owner: 'Elric Benson',
  phone: '(458) 723-0818',
  phoneHref: '+14587230818',
  afterhoursPhone: '(541) 413-0480',
  email: 'office@bensonhomesolutions.com',
  url: 'https://bensonhomesolutions.com',
  facebook: 'https://www.facebook.com/profile.php?id=61565667928376',
  gbp: 'https://maps.app.goo.gl/ad4eywwWonPsSZXP9',
  license: 'CCB #258533',
} as const;

export const SERVICE_AREAS = {
  harneyCounty: [
    'Burns', 'Hines', 'Frenchglen', 'Fields', 'Diamond', 'Princeton', 'Riley', 'Drewsey', 'Crane', 'Lawen',
  ],
  secondary: ['Sweet Home'],
  // Compatibility only for legacy route modules that are permanently redirected.
  // Do not use this array for current public service-area positioning or schema.
  midWillametteValley: ['Sweet Home'],
} as const;
