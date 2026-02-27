import { BUSINESS, SERVICE_AREAS } from '@/lib/constants';

interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Renders a JSON-LD script tag with structured data. */
function JsonLdScript({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** LocalBusiness schema — used on homepage and about page. */
export function LocalBusinessJsonLd() {
  const allAreas = [
    ...SERVICE_AREAS.midWillametteValley,
    ...SERVICE_AREAS.harneyCounty,
  ];

  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'HomeAndConstructionBusiness',
        name: BUSINESS.name,
        url: BUSINESS.url,
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        founder: {
          '@type': 'Person',
          name: BUSINESS.owner,
        },
        areaServed: allAreas.map((city) => ({
          '@type': 'City',
          name: city,
          containedInPlace: {
            '@type': 'State',
            name: 'Oregon',
          },
        })),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          bestRating: '5',
          ratingCount: '200',
        },
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'license',
          name: BUSINESS.license,
          recognizedBy: {
            '@type': 'Organization',
            name: 'Oregon Construction Contractors Board',
          },
        },
        sameAs: [BUSINESS.gbp, BUSINESS.facebook],
      }}
    />
  );
}

/** Service schema — used on individual service pages. */
export function ServiceJsonLd({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        url,
        ...(image && { image }),
        provider: {
          '@type': 'HomeAndConstructionBusiness',
          name: BUSINESS.name,
          url: BUSINESS.url,
          telephone: BUSINESS.phone,
        },
        areaServed: {
          '@type': 'State',
          name: 'Oregon',
        },
      }}
    />
  );
}

/** BreadcrumbList schema — used on all interior pages. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

/** FAQPage schema — used on service and area pages with FAQ sections. */
export function FAQPageJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        })),
      }}
    />
  );
}
