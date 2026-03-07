import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Get in Touch',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      initialValue: "We're here to help with your property needs. Reach out 24/7 for emergencies.",
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video URL',
      type: 'string',
      description: 'Optional video background for the hero section.',
    }),
    defineField({
      name: 'emergencyBannerText',
      title: 'Emergency Banner Text',
      type: 'string',
      initialValue: '24/7 EMERGENCY? CALL (541) 413-0480 IMMEDIATELY.',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Info Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'content', type: 'array', of: [{ type: 'block' }] },
          ],
        },
      ],
    }),
  ],
});
