export const BUSINESS = {
  name: 'Benson Home Solutions',
  owner: 'Elric Benson',
  phone: '541-321-5115',
  afterhoursPhone: '541-413-0480',
  email: 'office@bensonhomesolutions.com',
  license: 'CCB #258533',
  url: 'https://www.bensonhomesolutions.com',
  facebook: 'https://www.facebook.com/profile.php?id=61565667928376',
  gbp: 'https://maps.app.goo.gl/ad4eywwWonPsSZXP9',
};

export const SERVICE_AREAS = {
  midWillametteValley: [
    'Albany',
    'Salem',
    'Keizer',
    'Corvallis',
    'Lebanon',
    'Sweet Home',
  ],
  harneyCounty: ['Burns', 'Hines', 'Riley', 'Drewsey'],
} as const;

export const SERVICES = {
  'inspection-repairs': {
    title: 'Inspection Repairs',
    description:
      'We handle FHA, VA, appraisal-required, and buyer-requested repair work in [City], with clear scopes, documentation, and contractor-grade follow-through.',
    keywords: [
      'post inspection repairs [City]',
      'FHA repairs [City]',
      'VA lender repairs [City]',
    ],
  },
  'property-preservation': {
    title: 'Property Preservation',
    description:
      'From vacancy turns and board-ups to lock changes, winterization, and recurring site checks, we keep [City] properties secure and serviceable.',
    keywords: [
      'property preservation [City]',
      'vacant property maintenance [City]',
      'board up services [City]',
    ],
  },
  'water-mold-moisture': {
    title: 'Water, Mold & Moisture Repairs',
    description:
      'We dry out, mitigate, document, and repair water damage, mold issues, and moisture-driven failures in [City] before they spread further.',
    keywords: [
      'water damage restoration [City]',
      'mold mitigation [City]',
      'moisture repair contractor [City]',
    ],
  },
  'energy-weatherization': {
    title: 'Energy & Weatherization',
    description:
      'We help [City] property owners tighten the envelope, improve comfort, and handle air sealing, attic insulation, and weatherization work that actually lasts.',
    keywords: [
      'air sealing [City]',
      'attic insulation [City]',
      'weatherization contractor [City]',
    ],
  },
  'windows-doors-site-repair': {
    title: 'Windows, Doors & Site Repairs',
    description:
      'We take care of window and door replacements, lock work, selective demolition, drainage fixes, and site repairs for [City] homes and facilities.',
    keywords: [
      'window replacement [City]',
      'door replacement [City]',
      'site repairs [City]',
    ],
  },
  'emergency-response': {
    title: 'Emergency Response',
    description:
      'When a leak, storm, break-in, or structural problem hits in [City], we secure the property, document the damage, and start the repair path fast.',
    keywords: [
      'emergency repair [City]',
      'board up service [City]',
      'urgent water damage help [City]',
    ],
  },
} as const;

export const MAX_ATTACHMENT_SIZE_BYTES = 3.75 * 1024 * 1024;

export const PANDADOC_API_KEY = process.env.PANDADOC_API_KEY;
