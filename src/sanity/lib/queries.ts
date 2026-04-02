/**
 * GROQ Queries for Benson Home Solutions
 */

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  title,
  heroHeadline,
  heroSubheadline,
  heroCtaText,
  heroCtaLink,
  "stats": *[_type == "stat"] | order(order asc) {
    label,
    value,
    description,
    "icon": icon.current
  },
  content[]{
    ...,
    _type == "image" => { ..., asset-> }
  },
  faqItems[]->{ _id, question, answer }
}`;

export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  title,
  heroHeadline,
  heroSubheadline,
  content[]{
    ...,
    _type == "image" => { ..., asset-> }
  }
}`;

export const EMERGENCY_PAGE_QUERY = `*[_type == "emergencyPage"][0]{
  title,
  heroHeadline,
  heroSubheadline,
  emergencyPhone,
  content[]{
    ...,
    _type == "image" => { ..., asset-> }
  }
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  title,
  description,
  businessName,
  phone,
  email,
  address,
  licenseNumber,
  socialLinks
}`;
