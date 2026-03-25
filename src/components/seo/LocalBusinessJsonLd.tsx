import { BUSINESS } from '@/lib/constants';

export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: BUSINESS.name,
    image: 'https://bensonhomesolutions.com/images/generated/hero-exterior.png',
    url: 'https://bensonhomesolutions.com',
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    description: 'Licensed Oregon contractor for home maintenance, emergency restoration, & remodeling.',
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
      'https://maps.app.goo.gl/ad4eywwWonPsSZXP9',
      'https://www.facebook.com/profile.php?id=61565667928376',
      'https://search.ccb.state.or.us/search/search_results.aspx?license_number=258533',
      'https://www.bbb.org/us/or/albany/profile/general-contractor/benson-home-solutions-1296-1000137452',
      'https://www.yelp.com/biz/benson-home-solutions-albany',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
