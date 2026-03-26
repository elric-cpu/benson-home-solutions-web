import { HomeAndConstructionBusiness, WithContext } from 'schema-dts';
import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';

/**
 * Generates the complete, spec-compliant JSON-LD for the
 * HomeAndConstructionBusiness entity.
 * @returns The JSON-LD script content for the organization.
 */
export function getOrganizationSchema(): WithContext<HomeAndConstructionBusiness> {
  const allCities = [...SERVICE_AREAS.midWillametteValley, ...SERVICE_AREAS.harneyCounty];

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': 'https://www.bensonhomesolutions.com/#organization',
    name: BUSINESS.name,
    url: BUSINESS.url,
    logo: `${BUSINESS.url}/favicon.svg`,
    image: `${BUSINESS.url}/opengraph-image`,
    telephone: `+1-${BUSINESS.phone.replace(/[^0-9]/g, '')}`,
    email: BUSINESS.email,
    description:
      'Licensed Oregon contractor for post-inspection repairs, water damage restoration, mold mitigation, maintenance, property preservation, and weatherization.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Service area business',
      addressLocality: 'Albany',
      addressRegion: 'OR',
      postalCode: '97321',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.6366,   // Corrected for Albany, OR
      longitude: -123.105, // Corrected for Albany, OR
    },
    areaServed: allCities.map((name) => ({ '@type': 'City', name })),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: `Oregon ${BUSINESS.license}`,
    },
    sameAs: [
        BUSINESS.gbp,
        BUSINESS.facebook,
        'https://search.ccb.state.or.us/search/search_results.aspx?license_number=258533',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
  };
}
