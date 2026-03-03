import { defineType, defineField } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Benson Home Solutions',
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
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'ownerBio',
      title: 'Owner Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'ownerPhoto',
      title: 'Owner Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'companyHistory',
      title: 'Company History',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials & Licenses',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'teamPhotos',
      title: 'Team Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'values',
      title: 'Company Values',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'resources',
      title: 'Resources & Backlinks',
      type: 'array',
      of: [{ type: 'resource' }],
      validation: (r) => r.min(6).max(6),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
});
