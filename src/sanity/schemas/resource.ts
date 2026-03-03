import { defineType, defineField } from 'sanity';

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Resource Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'url',
      title: 'Resource URL',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'isBacklink',
      title: 'Is Backlink',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'authority',
      title: 'Authority Label',
      type: 'string',
      description: 'e.g., FEMA, CCB, City of Albany',
    }),
  ],
});
