import { defineType, defineField } from 'sanity';

export const serviceArea = defineType({
  name: 'serviceArea',
  title: 'Service Area',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Area Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Mid-Willamette Valley', value: 'mid-willamette' },
          { title: 'Harney County', value: 'harney-county' },
          { title: 'Greater Albany', value: 'greater-albany' },
          { title: 'Lebanon / Sweet Home', value: 'lebanon-sweet-home' },
          { title: 'Corvallis Area', value: 'corvallis' },
          { title: 'Salem Area', value: 'salem' },
        ],
      },
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
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'zipCodes',
      title: 'ZIP Codes Served',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'coordinates',
      title: 'Map Center',
      type: 'object',
      fields: [
        defineField({ name: 'lat', title: 'Latitude', type: 'number' }),
        defineField({ name: 'lng', title: 'Longitude', type: 'number' }),
      ],
    }),
    defineField({
      name: 'servicesAvailable',
      title: 'Services Available',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'testimonials',
      title: 'Area Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', validation: (rule) => rule.max(70) }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (rule) => rule.max(160) }),
        defineField({ name: 'ogImage', title: 'OG Image', type: 'image' }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'region', media: 'heroImage' },
  },
});
