import { service } from './service';
import { serviceArea } from './serviceArea';
import { blogPost } from './blogPost';
import { caseStudy } from './caseStudy';
import { faq } from './faq';
import { testimonial } from './testimonial';
import { team } from './team';
import { siteSettings } from './siteSettings';

export const schemaTypes = [
  // Content types
  service,
  serviceArea,
  blogPost,
  caseStudy,
  faq,
  testimonial,
  team,

  // Singleton
  siteSettings,
];
