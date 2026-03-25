export function WebPageJsonLd({
  title,
  description,
  url,
  dateModified = new Date().toISOString().split('T')[0],
}: {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: url,
    dateModified: dateModified,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.summary', '.faq-answer', '.key-points'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
