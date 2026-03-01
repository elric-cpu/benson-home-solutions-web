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
