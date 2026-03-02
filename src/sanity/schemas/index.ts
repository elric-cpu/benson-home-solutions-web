import { homePage } from './homePage';
import { aboutPage } from './aboutPage';
import { contactPage } from './contactPage';
import { emergencyPage } from './emergencyPage';
import { methodologyPage } from './methodologyPage';
import { methodologyDetail } from './methodologyDetail';
import { servicePage } from './servicePage';
import { areaPage } from './areaPage';
import { blogPost } from './blogPost';
import { faqItem } from './faqItem';
import { testimonial } from './testimonial';
import { siteSettings } from './siteSettings';
import { project } from './project';
import { resource } from './resource';

export const schemaTypes = [
  // Singletons
  homePage,
  aboutPage,
  contactPage,
  emergencyPage,
  methodologyPage,
  siteSettings,
  // Documents
  methodologyDetail,
  servicePage,
  areaPage,
  blogPost,
  project,
  // Objects
  faqItem,
  testimonial,
  resource,
];
