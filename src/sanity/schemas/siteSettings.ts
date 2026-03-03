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
      name: 'phone',
      title: 'Main Phone',
      type: 'string',
      initialValue: '(541) 321-5115',
    }),
    defineField({
      name: 'afterHoursPhone',
      title: 'After-Hours Phone',
      type: 'string',
      initialValue: '(541) 413-0480',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      initialValue: 'office@bensonhomesolutions.com',
    }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 3 }),
    defineField({
      name: 'ccbNumber',
      title: 'CCB License Number',
      type: 'string',
      initialValue: 'CCB #258533',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'google', title: 'Google Business', type: 'url' }),
        defineField({ name: 'yelp', title: 'Yelp', type: 'url' }),
      ],
    }),
    defineField({
      name: 'defaultSeoTitle',
      title: 'Default SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 3,
    }),
    defineField({ name: 'ogImage', title: 'Default OG Image', type: 'image' }),
    defineField({
      name: 'aiConfig',
      title: 'AI & Chatbot Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'chatbotSystemPrompt',
          title: 'Chatbot System Prompt',
          type: 'text',
          rows: 15,
          description: 'The primary system instructions for the Gus AI assistant.',
        }),
        defineField({
          name: 'chatbotWelcomeMessage',
          title: 'Chatbot Welcome Message',
          type: 'text',
          rows: 3,
          description: 'The first message shown when the chat widget is opened.',
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
