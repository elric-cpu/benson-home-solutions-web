import type { Metadata } from 'next';
import { BUSINESS } from './constants';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

/** Generate consistent page metadata */
export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${BUSINESS.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${BUSINESS.name}`,
      description,
      url,
      siteName: BUSINESS.name,
      locale: 'en_US',
      type: 'website',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${BUSINESS.name}`,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    ...(noIndex && {
      robots: { index: false, follow: false },
    }),
  };
}
