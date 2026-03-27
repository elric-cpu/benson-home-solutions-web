export interface ServiceDefinition {
  slug: string;
  title: string;
  shortDesc: string;
}

export const SERVICES_DATA: Record<string, ServiceDefinition> = {
  'water-damage': {
    slug: 'water-damage',
    title: 'Water Damage Restoration',
    shortDesc: 'Emergency dry-out and restoration services.',
  },
  'bathroom-remodeling': {
    slug: 'bathroom-remodeling',
    title: 'Bathroom Remodeling',
    shortDesc: 'Complete bathroom transformations.',
  },
  'kitchen-remodeling': {
    slug: 'kitchen-remodeling',
    title: 'Kitchen Remodeling',
    shortDesc: 'Custom kitchen design and construction.',
  },
  'mold-remediation': {
    slug: 'mold-remediation',
    title: 'Mold Remediation',
    shortDesc: 'Mold mitigation and moisture control.',
  },
  'roof-maintenance': {
    slug: 'roof-maintenance',
    title: 'Roof Maintenance',
    shortDesc: 'Proactive roof care and storm prep.',
  },
  'maintenance-subscriptions': {
    slug: 'maintenance-subscriptions',
    title: 'Home Maintenance Subscriptions',
    shortDesc: 'Recurring property care and priority response.',
  },
  'windows-doors': {
    slug: 'windows-doors',
    title: 'Windows & Doors',
    shortDesc: 'Precision building envelope installations.',
  },
  sitework: {
    slug: 'sitework',
    title: 'Sitework & Drainage',
    shortDesc: 'Site analysis and water management.',
  },
  'tenant-services': {
    slug: 'tenant-services',
    title: 'Tenant Improvements',
    shortDesc: 'Commercial turnover and facility correction work.',
  },
  demolition: {
    slug: 'demolition',
    title: 'Demolition Services',
    shortDesc: 'Controlled selective and full-scope demolition.',
  },
};
