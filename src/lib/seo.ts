import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, BUSINESS.url).toString();
}

export function canonicalMetadata({
  title,
  description,
  path,
  openGraphType = 'website',
}: {
  title: string;
  description: string;
  path: string;
  openGraphType?: 'website' | 'article';
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: openGraphType,
    },
  };
}
