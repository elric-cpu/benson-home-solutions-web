import { BUSINESS } from '@/lib/constants';

export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${BUSINESS.url}/#organization`,
    name: BUSINESS.name,
    image: `${BUSINESS.url}/opengraph-image`,
    url: BUSINESS.url,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    description: 'Licensed Oregon contractor for post-inspection repairs, water damage restoration, mold mitigation, maintenance, property preservation, and weatherization.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2283 NW Skyline Dr',
      addressLocality: 'Albany',
      addressRegion: 'OR',
      postalCode: '97321',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.6465,
      longitude: -123.1165,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
    sameAs: [
      BUSINESS.gbp,
      BUSINESS.facebook,
      'https://search.ccb.state.or.us/search/search_results.aspx?license_number=258533',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
