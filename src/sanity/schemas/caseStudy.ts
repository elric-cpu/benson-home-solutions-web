import { defineType, defineField } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Use first name + last initial or "Homeowner" for privacy',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City or neighborhood (e.g. "Albany, OR")',
    }),
    defineField({
      name: 'completedAt',
      title: 'Completed Date',
      type: 'date',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'beforeAfterImages',
      title: 'Before/After Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'before', title: 'Before', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'after', title: 'After', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
        },
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'services',
      title: 'Services Used',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', validation: (rule) => rule.max(70) }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (rule) => rule.max(160) }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'heroImage' },
  },
});
