import { defineType, defineField } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'author', title: 'Author', type: 'string', initialValue: 'Elric Benson' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: (r) => r.max(200) }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }], options: { list: [
      { title: 'Home Maintenance', value: 'maintenance' },
      { title: 'Restoration', value: 'restoration' },
      { title: 'Remodeling', value: 'remodeling' },
      { title: 'Case Study', value: 'case-study' },
      { title: 'Tips & Advice', value: 'tips' },
    ] } }),
    defineField({ name: 'relatedServices', title: 'Related Services', type: 'array', of: [{ type: 'reference', to: [{ type: 'servicePage' }] }] }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'featuredImage' },
  },
  orderings: [{ title: 'Published Date', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
});
