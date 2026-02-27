import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'clientName', title: 'Client Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'rating', title: 'Rating (1-5)', type: 'number', validation: (r) => r.min(1).max(5) }),
    defineField({ name: 'service', title: 'Service', type: 'reference', to: [{ type: 'servicePage' }] }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'clientName', subtitle: 'quote' },
  },
});
