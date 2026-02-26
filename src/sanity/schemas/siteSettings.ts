import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'Benson Home Solutions',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '(541) 321-5115',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      initialValue: 'office@bensonhomesolutions.com',
    }),
    defineField({
      name: 'license',
      title: 'CCB License Number',
      type: 'string',
      initialValue: 'CCB #258533',
    }),
    defineField({
      name: 'address',
      title: 'Business Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'state', title: 'State', type: 'string', initialValue: 'OR' }),
        defineField({ name: 'zip', title: 'ZIP', type: 'string' }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'google', title: 'Google Business', type: 'url' }),
        defineField({ name: 'yelp', title: 'Yelp', type: 'url' }),
        defineField({ name: 'nextdoor', title: 'Nextdoor', type: 'url' }),
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'days', title: 'Days', type: 'string' }),
            defineField({ name: 'hours', title: 'Hours', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'emergencyAvailable',
      title: 'Emergency Service Available',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'emergencyMessage',
      title: 'Emergency Banner Message',
      type: 'string',
      initialValue: '24/7 Emergency Service Available — Call Now',
    }),
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: false }),
        defineField({ name: 'message', title: 'Message', type: 'string' }),
        defineField({ name: 'link', title: 'Link', type: 'url' }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Default Meta Title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Default Meta Description', type: 'text', rows: 3 }),
        defineField({ name: 'ogImage', title: 'Default OG Image', type: 'image' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
