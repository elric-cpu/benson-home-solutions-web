import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', title: 'Company Name', type: 'string', initialValue: 'Benson Home Solutions' }),
    defineField({ name: 'phone', title: 'Main Phone', type: 'string', initialValue: '(541) 321-5115' }),
    defineField({ name: 'afterHoursPhone', title: 'After-Hours Phone', type: 'string', initialValue: '(541) 413-0480' }),
    defineField({ name: 'email', title: 'Email', type: 'string', initialValue: 'office@bensonhomesolutions.com' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 3 }),
    defineField({ name: 'ccbNumber', title: 'CCB License Number', type: 'string', initialValue: 'CCB #258533' }),
    defineField({ name: 'socialLinks', title: 'Social Links', type: 'object', fields: [
      defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
      defineField({ name: 'google', title: 'Google Business', type: 'url' }),
      defineField({ name: 'yelp', title: 'Yelp', type: 'url' }),
    ] }),
    defineField({ name: 'defaultSeoTitle', title: 'Default SEO Title', type: 'string' }),
    defineField({ name: 'defaultSeoDescription', title: 'Default SEO Description', type: 'text', rows: 3 }),
    defineField({ name: 'ogImage', title: 'Default OG Image', type: 'image' }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
