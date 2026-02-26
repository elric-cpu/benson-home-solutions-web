import { BUSINESS } from './constants';

/** LocalBusiness JSON-LD — included on every page */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${BUSINESS.url}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: BUSINESS.url,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    description:
      'Licensed Oregon contractor specializing in home maintenance, emergency restoration, remodeling, and commercial construction. CCB #258533.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.stateCode,
      postalCode: BUSINESS.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.6366,
      longitude: -123.1059,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
    sameAs: [BUSINESS.social.facebook].filter(Boolean),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Oregon Construction Contractors Board License',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Oregon Construction Contractors Board',
      },
      identifier: BUSINESS.licenseNumber,
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'Oregon',
      },
    ],
    priceRange: '$$',
  };
}

/** WebSite JSON-LD with SearchAction */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BUSINESS.url}/#website`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BUSINESS.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Service JSON-LD */
export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
  priceRange?: string;
  areaServed?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${BUSINESS.url}/#business`,
      name: BUSINESS.name,
    },
    ...(service.priceRange && { priceRange: service.priceRange }),
    areaServed: service.areaServed
      ? { '@type': 'City', name: service.areaServed }
      : { '@type': 'State', name: 'Oregon' },
  };
}

/** FAQPage JSON-LD */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** BreadcrumbList JSON-LD */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** WebApplication JSON-LD for tools (calculator, estimator) */
export function webApplicationSchema(tool: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${BUSINESS.url}/#business`,
    },
  };
}
