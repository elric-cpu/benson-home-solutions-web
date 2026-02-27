import { defineType, defineField } from 'sanity';

export const methodologyPage = defineType({
  name: 'methodologyPage',
  title: 'Methodology Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Our Methodology' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (r) => r.max(160) }),
    defineField({ name: 'introContent', title: 'Introduction', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'processSteps', title: 'Process Steps', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'certifications', title: 'Certifications', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'qualityStandards', title: 'Quality Standards', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: {
    prepare: () => ({ title: 'Methodology Page' }),
  },
});
