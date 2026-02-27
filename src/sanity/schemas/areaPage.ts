import { defineType, defineField } from 'sanity';

export const areaPage = defineType({
  name: 'areaPage',
  title: 'Service Area Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (r) => r.max(160) }),
    defineField({ name: 'city', title: 'City', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'county', title: 'County', type: 'string' }),
    defineField({ name: 'state', title: 'State', type: 'string', initialValue: 'Oregon' }),
    defineField({ name: 'serviceRadius', title: 'Service Radius (miles)', type: 'number' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'localContent', title: 'Local Content', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'servicesOffered', title: 'Services Offered', type: 'array', of: [{ type: 'reference', to: [{ type: 'servicePage' }] }] }),
    defineField({ name: 'testimonials', title: 'Local Testimonials', type: 'array', of: [{ type: 'reference', to: [{ type: 'testimonial' }] }] }),
    defineField({ name: 'nearbyAreas', title: 'Nearby Areas', type: 'array', of: [{ type: 'reference', to: [{ type: 'areaPage' }] }] }),
  ],
  preview: {
    select: { title: 'city', subtitle: 'county' },
  },
});
