/* ═══════════════════════════════════════════════════════════════════════════
 * Benson Home Solutions — Business Constants
 * Single source of truth for all business data used across the site.
 * ═══════════════════════════════════════════════════════════════════════════ */

import type { NavItem, SubscriptionPlan } from '@/types';

export const BUSINESS = {
  name: 'Benson Home Solutions',
  legalName: 'Benson Home Solutions LLC',
  owner: 'Elric Benson',
  phone: '(541) 321-5115',
  phoneRaw: '+15413215115',
  emergencyPhone: '(541) 413-0480',
  emergencyPhoneRaw: '+15414130480',
  email: 'office@bensonhomesolutions.com',
  license: 'CCB #258533',
  licenseNumber: '258533',
  ein: '33-4085009',
  url: 'https://bensonhomesolutions.com',
  address: {
    street: '',
    city: 'Albany',
    state: 'Oregon',
    stateCode: 'OR',
    zip: '97386',
  },
  social: {
    facebook: 'https://www.facebook.com/BensonHomeSolutions',
    google: '', // Google Business Profile URL
  },
  hours: {
    weekday: '7:00 AM – 6:00 PM',
    saturday: '8:00 AM – 4:00 PM',
    sunday: 'Emergency Only',
    emergency: '24/7',
  },
  stats: {
    rating: '4.9',
    ratingCount: '50+',
    experience: '10+',
    projectsCompleted: '200+',
  },
} as const;

export const SERVICE_AREAS = {
  primary: [
    { city: 'Salem', state: 'OR', slug: 'salem-oregon' },
    { city: 'Keizer', state: 'OR', slug: 'keizer-oregon' },
    { city: 'Corvallis', state: 'OR', slug: 'corvallis-oregon' },
    { city: 'Albany', state: 'OR', slug: 'albany-oregon' },
    { city: 'Burns', state: 'OR', slug: 'burns-oregon' },
  ],
  secondary: [
    { city: 'Lebanon', state: 'OR', slug: 'lebanon-oregon' },
    { city: 'Sweet Home', state: 'OR', slug: 'sweet-home-oregon' },
    { city: 'Wilsonville', state: 'OR', slug: 'wilsonville-oregon' },
    { city: 'Dallas', state: 'OR', slug: 'dallas-oregon' },
    { city: 'Monmouth', state: 'OR', slug: 'monmouth-oregon' },
  ],
  harneyCounty: [
    { city: 'Burns', state: 'OR', slug: 'burns-oregon' },
    { city: 'Riley', state: 'OR', slug: 'riley-oregon' },
    { city: 'Drewsey', state: 'OR', slug: 'drewsey-oregon' },
  ],
  radiusMiles: 75,
} as const;

export const SERVICES = [
  {
    slug: 'emergency-restoration',
    title: 'Emergency Restoration',
    shortDescription: '24/7 emergency response for water damage, fire damage, and storm damage.',
    icon: '🚨',
    priceRange: 'Varies by scope',
    priority: 0,
  },
  {
    slug: 'water-damage-restoration',
    title: 'Water Damage Restoration',
    shortDescription: 'Complete dry-out, mitigation, and rebuild services with insurance-aligned documentation.',
    icon: '💧',
    priceRange: '$2,000 – $45,000+',
    priority: 0,
  },
  {
    slug: 'kitchen-remodel',
    title: 'Kitchen Remodel',
    shortDescription: 'Full kitchen remodeling from cabinets to countertops, plumbing, and electrical.',
    icon: '🍳',
    priceRange: '$25,000 – $45,000',
    priority: 0,
  },
  {
    slug: 'bathroom-remodel',
    title: 'Bathroom Remodel',
    shortDescription: 'Complete bathroom renovations including tile, fixtures, plumbing, and accessibility upgrades.',
    icon: '🚿',
    priceRange: '$18,000 – $28,000',
    priority: 0,
  },
  {
    slug: 'demolition',
    title: 'Demolition',
    shortDescription: 'Interior and exterior demolition — selective or full, with proper permitting and debris removal.',
    icon: '🏗️',
    priceRange: '$3,000 – $25,000',
    priority: 2,
  },
  {
    slug: 'windows-doors',
    title: 'Window & Door Replacement',
    shortDescription: 'Residential and commercial window and door installation, including lock changes.',
    icon: '🪟',
    priceRange: '$500 – $15,000',
    priority: 2,
  },
  {
    slug: 'mold-mitigation',
    title: 'Mold Mitigation',
    shortDescription: 'Professional mold remediation with post-mitigation verification and lab testing.',
    icon: '🔬',
    priceRange: '$1,500 – $15,000',
    priority: 2,
  },
  {
    slug: 'sitework',
    title: 'Sitework',
    shortDescription: 'Driveways, utility replacements, grading, stump removal, and residential sitework.',
    icon: '🚜',
    priceRange: '$5,000 – $50,000',
    priority: 2,
  },
  {
    slug: 'tenant-property-maintenance',
    title: 'Tenant & Property Maintenance',
    shortDescription: 'Move-in/out prep, trash-outs, board-ups, and ongoing maintenance subscriptions.',
    icon: '🏠',
    priceRange: '$200 – $5,000/visit',
    priority: 2,
  },
  {
    slug: 'maintenance-plans',
    title: 'Maintenance Subscription Plans',
    shortDescription: 'Proactive maintenance programs for residential, commercial, and church properties.',
    icon: '📋',
    priceRange: '$119 – $799/month',
    priority: 1,
  },
] as const;

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Emergency Restoration', href: '/services/emergency-restoration' },
      { label: 'Water Damage', href: '/services/water-damage-restoration' },
      { label: 'Kitchen Remodel', href: '/services/kitchen-remodel' },
      { label: 'Bathroom Remodel', href: '/services/bathroom-remodel' },
      { label: 'Demolition', href: '/services/demolition' },
      { label: 'Windows & Doors', href: '/services/windows-doors' },
      { label: 'Mold Mitigation', href: '/services/mold-mitigation' },
      { label: 'Sitework', href: '/services/sitework' },
      { label: 'Property Maintenance', href: '/services/tenant-property-maintenance' },
      { label: 'Maintenance Plans', href: '/services/maintenance-plans' },
    ],
  },
  {
    label: 'Areas We Serve',
    href: '/areas',
    children: [
      { label: 'Salem', href: '/areas/salem-oregon' },
      { label: 'Keizer', href: '/areas/keizer-oregon' },
      { label: 'Corvallis', href: '/areas/corvallis-oregon' },
      { label: 'Albany', href: '/areas/albany-oregon' },
      { label: 'Burns', href: '/areas/burns-oregon' },
    ],
  },
  {
    label: 'Tools',
    href: '/true-cost-calculator',
    children: [
      { label: 'True Cost Calculator', href: '/true-cost-calculator' },
      { label: 'Cost Estimator', href: '/cost-estimator' },
      { label: 'Methodology', href: '/methodology' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'res-basic',
    name: 'Essential',
    tier: 'basic',
    segment: 'residential',
    monthlyPrice: 119,
    annualPrice: 1299,
    sqftRange: { min: 0, max: 1500 },
    features: [
      'Bi-annual HVAC inspection',
      'Annual plumbing check',
      'Seasonal maintenance checklist',
      'Priority scheduling',
      '10% discount on repairs',
    ],
  },
  {
    id: 'res-standard',
    name: 'Complete',
    tier: 'standard',
    segment: 'residential',
    monthlyPrice: 159,
    annualPrice: 1749,
    sqftRange: { min: 1501, max: 2500 },
    features: [
      'Everything in Essential',
      'Quarterly full-home inspection',
      'Gutter cleaning (2x/year)',
      'Water heater flush',
      '15% discount on repairs',
      'Emergency priority response',
    ],
    popular: true,
  },
  {
    id: 'res-premium',
    name: 'Premium',
    tier: 'premium',
    segment: 'residential',
    monthlyPrice: 189,
    annualPrice: 2049,
    sqftRange: { min: 2501, max: 3500 },
    features: [
      'Everything in Complete',
      'Monthly property walkthrough',
      'Roof inspection (annual)',
      'Weatherization check',
      '20% discount on repairs',
      'Dedicated account manager',
    ],
  },
  {
    id: 'res-estate',
    name: 'Estate',
    tier: 'enterprise',
    segment: 'residential',
    monthlyPrice: 219,
    annualPrice: 2399,
    sqftRange: { min: 3501, max: 99999 },
    features: [
      'Everything in Premium',
      'Custom maintenance schedule',
      'Appliance coverage',
      '25% discount on repairs',
      'Annual energy audit',
      'Concierge service',
    ],
  },
];

export const BRAND = {
  colors: {
    oxblood: '#4C0C14',
    oxbloodLight: '#6B1A24',
    oxbloodDark: '#3A090F',
    cream: '#FFFDF9',
    creamDark: '#F5F0E8',
    charcoal: '#2D2D2D',
    slate: '#4A4A4A',
  },
  fonts: {
    web: 'Source Sans 3',
    print: 'Calibri',
  },
} as const;
