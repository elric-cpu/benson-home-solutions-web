import { homePage } from './homePage';
import { aboutPage } from './aboutPage';
import { contactPage } from './contactPage';
import { emergencyPage } from './emergencyPage';
import { methodologyPage } from './methodologyPage';
import { servicePage } from './servicePage';
import { areaPage } from './areaPage';
import { blogPost } from './blogPost';
import { faqItem } from './faqItem';
import { testimonial } from './testimonial';
import { siteSettings } from './siteSettings';

export const schemaTypes = [
  // Singletons
  homePage,
  aboutPage,
  contactPage,
  emergencyPage,
  methodologyPage,
  siteSettings,
  // Documents
  servicePage,
  areaPage,
  blogPost,
  // Objects
  faqItem,
  testimonial,
];
