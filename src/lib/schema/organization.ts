import { HomeAndConstructionBusiness, WithContext } from 'schema-dts';
import { BUSINESS } from '@/lib/constants';

/**
 * Generates the complete, spec-compliant JSON-LD for the
 * HomeAndConstructionBusiness entity.
 * @returns The JSON-LD script content for the organization.
 */
export function getOrganizationSchema(): WithContext<HomeAndConstructionBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': 'https://bensonhomesolutions.com/#organization',
    name: BUSINESS.name,
    url: 'https://bensonhomesolutions.com',
    logo: 'https://bensonhomesolutions.com/favicon.svg',
    image: 'https://bensonhomesolutions.com/og-image.jpg', // Replace with a real image URL
    telephone: `+1-${BUSINESS.phone.replace(/[^0-9]/g, '')}`,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Albany',
      addressRegion: 'OR',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.6366,   // Corrected for Albany, OR
      longitude: -123.105, // Corrected for Albany, OR
    },
    areaServed: [
      { '@type': 'City', 'name': 'Salem' },
      { '@type': 'City', 'name': 'Keizer' },
      { '@type': 'City', 'name': 'Corvallis' },
      { '@type': 'City', 'name': 'Albany' },
      { '@type': 'City', 'name': 'Lebanon' },
      { '@type': 'City', 'name': 'Sweet Home' },
      { '@type': 'City', 'name': 'Burns' }
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: `Oregon ${BUSINESS.license}`,
    },
    sameAs: [
        'https://maps.app.goo.gl/ad4eywwWonPsSZXP9',
        'https://www.facebook.com/profile.php?id=61565667928376',
        'https://search.ccb.state.or.us/search/search_results.aspx?license_number=258533',
        'https://www.bbb.org/us/or/albany/profile/general-contractor/benson-home-solutions-1296-1000137452',
        'https://www.yelp.com/biz/benson-home-solutions-albany',
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
