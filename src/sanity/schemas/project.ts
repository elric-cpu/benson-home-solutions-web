import { defineType, defineField } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
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
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Optional — only display if client consents.',
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Used in gallery cards and meta description.',
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'services',
      title: 'Services Performed',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'servicePage' }] }],
    }),
    defineField({
      name: 'area',
      title: 'Service Area',
      type: 'reference',
      to: [{ type: 'areaPage' }],
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Show on the homepage or projects landing page.',
    }),
    defineField({
      name: 'testimonial',
      title: 'Related Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
  ],
  orderings: [
    {
      title: 'Completion Date (Newest)',
      name: 'completionDateDesc',
      by: [{ field: 'completionDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'images.0',
    },
  },
});
