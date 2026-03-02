import { defineType, defineField } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Contact Us' }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubtext', title: 'Hero Subtext', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroVideo', title: 'Hero Video URL', type: 'url', description: 'Enter a direct MP4 link for the hero background video' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (r) => r.max(160) }),
    defineField({ name: 'resources', title: 'Resources & Backlinks', type: 'array', of: [{ type: 'resource' }], validation: (r) => r.min(6).max(6) }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'afterHoursPhone', title: 'After-Hours Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 3 }),
    defineField({ name: 'officeHours', title: 'Office Hours', type: 'text', rows: 3 }),
    defineField({ name: 'formHeadline', title: 'Form Headline', type: 'string', initialValue: 'Request a Free Estimate' }),
    defineField({ name: 'formDescription', title: 'Form Description', type: 'text', rows: 2 }),
    defineField({ name: 'content', title: 'Additional Content', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
});
