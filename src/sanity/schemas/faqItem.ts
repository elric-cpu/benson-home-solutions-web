import { defineType, defineField } from 'sanity';

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'array', of: [{ type: 'block' }], validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: [
      { title: 'General', value: 'general' },
      { title: 'Pricing', value: 'pricing' },
      { title: 'Emergency', value: 'emergency' },
      { title: 'Maintenance', value: 'maintenance' },
      { title: 'Restoration', value: 'restoration' },
      { title: 'Remodeling', value: 'remodeling' },
    ] } }),
    defineField({ name: 'isActualCustomerQuestion', title: 'Actual Customer Question', type: 'boolean', initialValue: false }),
    defineField({ name: 'source', title: 'Question Source', type: 'string', description: 'e.g., Email, Phone, In-person' }),
    defineField({ name: 'relatedServices', title: 'Related Services', type: 'array', of: [{ type: 'reference', to: [{ type: 'servicePage' }] }] }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
});
