import { defineType, defineField } from 'sanity';

export const methodologyDetail = defineType({
  name: 'methodologyDetail',
  title: 'Methodology Detail Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideo',
      title: 'Authority Brief Video (Mux)',
      type: 'mux.video',
      description: 'Upload the 60s Senior Principal Methodology Brief here.',
    }),
    defineField({
      name: 'resources',
      title: 'Resources & Backlinks',
      type: 'array',
      of: [{ type: 'resource' }],
      validation: (Rule) => Rule.min(6).max(6),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Property Taxes', value: 'property-taxes' },
          { title: 'Insurance', value: 'insurance' },
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Energy', value: 'energy' },
          { title: 'Water & Utilities', value: 'water-utilities' },
          { title: 'Deferred Maintenance', value: 'deferred-maintenance' },
          { title: 'Appliance Lifecycle', value: 'appliance-lifecycle' },
        ],
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'dataSources',
      title: 'Data Sources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Source Name', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faqItem' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
});
