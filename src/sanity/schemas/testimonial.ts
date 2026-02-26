import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City or neighborhood (e.g. "Albany, OR")',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'service',
      title: 'Service Provided',
      type: 'reference',
      to: [{ type: 'service' }],
    }),
    defineField({
      name: 'projectDate',
      title: 'Project Date',
      type: 'date',
    }),
    defineField({
      name: 'avatar',
      title: 'Client Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Google', value: 'google' },
          { title: 'Website', value: 'website' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Yelp', value: 'yelp' },
          { title: 'Referral', value: 'referral' },
        ],
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'clientName', subtitle: 'location', media: 'avatar' },
  },
});
