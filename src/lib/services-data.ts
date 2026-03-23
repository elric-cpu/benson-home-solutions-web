export const SERVICES_DATA: Record<string, any> = {
  'bathroom-remodeling': {
    title: 'Bathroom Remodeling',
    slug: 'bathroom-remodeling',
    metaDescription: 'Complete bathroom remodeling services.',
    heroHeadline: 'Modern Bathroom Remodeling',
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Our Bathroom Remodeling Process' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'We handle everything from design to installation.',
          },
        ],
      },
    ],
  },
  'water-damage': {
    title: 'Water Damage Restoration',
    slug: 'water-damage',
    metaDescription: '24/7 water damage restoration services.',
    heroHeadline: 'Emergency Water Damage Restoration',
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Our Water Damage Services' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'We provide fast and efficient water damage cleanup and restoration.',
          },
        ],
      },
    ],
  },
};
