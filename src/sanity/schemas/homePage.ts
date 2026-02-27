import { defineType, defineField } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'heroSubtext', title: 'Hero Subtext', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'serviceCards', title: 'Service Cards', type: 'array', of: [{ type: 'reference', to: [{ type: 'servicePage' }] }] }),
    defineField({ name: 'emergencyBannerEnabled', title: 'Show Emergency Banner', type: 'boolean', initialValue: true }),
    defineField({ name: 'emergencyBannerText', title: 'Emergency Banner Text', type: 'string' }),
    defineField({ name: 'testimonials', title: 'Featured Testimonials', type: 'array', of: [{ type: 'reference', to: [{ type: 'testimonial' }] }], validation: (r) => r.max(3) }),
    defineField({ name: 'ctaHeadline', title: 'CTA Section Headline', type: 'string' }),
    defineField({ name: 'ctaSubtext', title: 'CTA Section Subtext', type: 'text', rows: 2 }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (r) => r.max(160) }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
});
