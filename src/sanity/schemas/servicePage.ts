import { defineType, defineField } from 'sanity';

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'answerFirstSummary',
      title: 'Answer-First Summary (AEO)',
      type: 'text',
      rows: 3,
      description:
        'A 2-3 sentence direct answer to the primary question for Answer Engine Optimization. Max 300 characters.',
      validation: (r) => r.max(300),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video URL',
      type: 'url',
      description: 'Enter a direct MP4 link for the hero background video',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service Areas',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'areaPage' }] }],
    }),
    defineField({
      name: 'resources',
      title: 'Resources & Backlinks',
      type: 'array',
      of: [{ type: 'resource' }],
      validation: (r) => r.min(6).max(6),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get a Free Estimate',
    }),
    defineField({ name: 'ctaLink', title: 'CTA Link', type: 'url' }),
    defineField({
      name: 'pricingNote',
      title: 'Pricing Note',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faqItem' }] }],
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'servicePage' }] }],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'heroImage' },
  },
});
