'use client';

import {
  PortableText as SanityPortableText,
  type PortableTextComponents,
} from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-charcoal mt-10 mb-4 text-2xl font-bold md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-charcoal mt-8 mb-3 text-xl font-bold md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-charcoal mt-6 mb-2 text-lg font-semibold">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-slate mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-oxblood text-slate my-6 border-l-4 pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-slate mb-4 ml-4 list-inside list-disc space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="text-slate mb-4 ml-4 list-inside list-decimal space-y-1">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-charcoal font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          className="text-oxblood hover:text-oxblood-light underline transition-colors"
          {...(isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const src = urlForImage(value).width(800).url();
      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={value.alt || ''}
            width={800}
            height={450}
            className="h-auto w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="text-muted mt-2 text-center text-sm">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any; // Using any here because Sanity fetch returns Record<string, unknown>[] which doesn't perfectly match PortableTextBlock[] but is compatible at runtime
}

export function PortableTextRenderer({ value }: Props) {
  return <SanityPortableText value={value} components={components} />;
}
