import { defineType, defineField } from 'sanity';

export const emergencyPage = defineType({
  name: 'emergencyPage',
  title: 'Emergency Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Emergency Services',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video URL',
      type: 'url',
      description: 'Enter a direct MP4 link for the hero background video',
    }),
    defineField({
      name: 'emergencyPhone',
      title: 'Emergency Phone',
      type: 'string',
    }),
    defineField({
      name: 'afterHoursPhone',
      title: 'After-Hours Phone',
      type: 'string',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'resources',
      title: 'Resources & Backlinks',
      type: 'array',
      of: [{ type: 'resource' }],
      validation: (r) => r.min(6).max(6),
    }),
    defineField({
      name: 'emergencyServices',
      title: 'Emergency Services List',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'responseTimeSLA',
      title: 'Response Time SLA',
      type: 'string',
      initialValue: 'On-site within 60 minutes',
    }),
    defineField({
      name: 'content',
      title: 'Additional Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Emergency Page' }),
  },
});
