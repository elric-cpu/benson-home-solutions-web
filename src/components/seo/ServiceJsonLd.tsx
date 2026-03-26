interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  image?: string;
}

export function ServiceJsonLd({ name, description, url, image }: ServiceJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    url: url,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: 'Benson Home Solutions',
      url: 'https://www.bensonhomesolutions.com',
    },
    serviceType: name,
    areaServed: [
      {
        '@type': 'State',
        name: 'Oregon',
      },
      {
        '@type': 'City',
        name: 'Salem',
      },
      {
        '@type': 'City',
        name: 'Albany',
      },
      {
        '@type': 'City',
        name: 'Corvallis',
      },
      {
        '@type': 'City',
        name: 'Burns',
      },
    ],
    image: image || 'https://www.bensonhomesolutions.com/favicon.svg',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
