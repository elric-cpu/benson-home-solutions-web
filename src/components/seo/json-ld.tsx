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
        priceRange: '$$',
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
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '17:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday'],
            opens: '00:00',
            closes: '00:00',
            description: 'Emergency Services Available 24/7',
          },
        ],
        sameAs: [BUSINESS.gbp, BUSINESS.facebook],
        dateModified: new Date().toISOString(),
      }}
    />
  );
}

/** Article schema — used for Methodology Hub and blog posts to signal E-E-A-T. */
export function ArticleJsonLd({
  headline,
  description,
  datePublished,
  dateModified,
  authorName = BUSINESS.owner,
  imageUrl,
}: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  imageUrl?: string;
}) {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description,
        image: imageUrl ? [imageUrl] : undefined,
        datePublished,
        dateModified,
        author: {
          '@type': 'Person',
          name: authorName,
          url: BUSINESS.url,
        },
        publisher: {
          '@type': 'Organization',
          name: BUSINESS.name,
          logo: {
            '@type': 'ImageObject',
            url: `${BUSINESS.url}/logo.png`, // Ensure this asset exists
          },
        },
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
