import { groq } from 'next-sanity';

/* ──────────────────────────────────────────────
 * Projection fragments
 * ────────────────────────────────────────────── */

const seoProjection = `
  seo {
    metaTitle,
    metaDescription,
    "ogImageUrl": ogImage.asset->url
  }
`;

const imageProjection = `
  asset-> {
    _id,
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height,
    "lqip": metadata.lqip
  }
`;

/* ──────────────────────────────────────────────
 * Services
 * ────────────────────────────────────────────── */

export const allServicesQuery = groq`
  *[_type == "service" && isActive == true] | order(sortOrder asc) {
    _id,
    title,
    slug,
    category,
    excerpt,
    icon,
    pricingNote,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    ${seoProjection}
  }
`;

export const servicesByCategoryQuery = groq`
  *[_type == "service" && isActive == true && category == $category] | order(sortOrder asc) {
    _id,
    title,
    slug,
    category,
    excerpt,
    icon,
    pricingNote,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    excerpt,
    body,
    icon,
    pricingNote,
    features,
    heroImage {
      alt,
      ${imageProjection}
    },
    relatedServices[]-> {
      _id,
      title,
      slug,
      category,
      excerpt,
      icon
    },
    faqs[]-> {
      _id,
      question,
      answer
    },
    ${seoProjection}
  }
`;

/* ──────────────────────────────────────────────
 * Service Areas
 * ────────────────────────────────────────────── */

export const allServiceAreasQuery = groq`
  *[_type == "serviceArea" && isActive == true] | order(name asc) {
    _id,
    name,
    slug,
    region,
    excerpt,
    "heroImageUrl": heroImage.asset->url,
    coordinates
  }
`;

export const serviceAreaBySlugQuery = groq`
  *[_type == "serviceArea" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    region,
    excerpt,
    body,
    zipCodes,
    coordinates,
    heroImage {
      alt,
      ${imageProjection}
    },
    servicesAvailable[]-> {
      _id,
      title,
      slug,
      category,
      icon
    },
    testimonials[]-> {
      _id,
      clientName,
      location,
      quote,
      rating
    },
    ${seoProjection}
  }
`;

/* ──────────────────────────────────────────────
 * Blog Posts
 * ────────────────────────────────────────────── */

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    categories,
    isFeatured,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    author-> { name, role, "photoUrl": photo.asset->url }
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    categories,
    body,
    featuredImage {
      alt,
      ${imageProjection}
    },
    author-> { name, role, bio, "photoUrl": photo.asset->url },
    relatedServices[]-> {
      _id,
      title,
      slug,
      category
    },
    ${seoProjection}
  }
`;

export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && isFeatured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt
  }
`;

/* ──────────────────────────────────────────────
 * Case Studies
 * ────────────────────────────────────────────── */

export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(completedAt desc) {
    _id,
    title,
    slug,
    client,
    location,
    completedAt,
    excerpt,
    metrics,
    "heroImageUrl": heroImage.asset->url,
    services[]-> { _id, title, slug, category }
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    location,
    completedAt,
    excerpt,
    challenge,
    solution,
    results,
    metrics,
    heroImage {
      alt,
      ${imageProjection}
    },
    beforeAfterImages[] {
      before { ${imageProjection} },
      after { ${imageProjection} },
      caption
    },
    services[]-> { _id, title, slug, category },
    testimonial-> { clientName, location, quote, rating },
    ${seoProjection}
  }
`;

/* ──────────────────────────────────────────────
 * FAQs
 * ────────────────────────────────────────────── */

export const allFaqsQuery = groq`
  *[_type == "faq"] | order(sortOrder asc) {
    _id,
    question,
    answer,
    category
  }
`;

export const faqsByCategoryQuery = groq`
  *[_type == "faq" && category == $category] | order(sortOrder asc) {
    _id,
    question,
    answer
  }
`;

/* ──────────────────────────────────────────────
 * Testimonials
 * ────────────────────────────────────────────── */

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(isFeatured desc, projectDate desc) {
    _id,
    clientName,
    location,
    quote,
    rating,
    source,
    isFeatured,
    service-> { _id, title, slug },
    "avatarUrl": avatar.asset->url
  }
`;

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && isFeatured == true] | order(projectDate desc)[0...6] {
    _id,
    clientName,
    location,
    quote,
    rating,
    service-> { _id, title, slug },
    "avatarUrl": avatar.asset->url
  }
`;

/* ──────────────────────────────────────────────
 * Team
 * ────────────────────────────────────────────── */

export const allTeamQuery = groq`
  *[_type == "team"] | order(sortOrder asc) {
    _id,
    name,
    slug,
    role,
    bio,
    certifications,
    email,
    photo {
      alt,
      ${imageProjection}
    }
  }
`;

/* ──────────────────────────────────────────────
 * Site Settings (singleton)
 * ────────────────────────────────────────────── */

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    tagline,
    phone,
    email,
    license,
    address,
    socialLinks,
    businessHours,
    emergencyAvailable,
    emergencyMessage,
    announcementBar,
    defaultSeo {
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url
    }
  }
`;

/* ──────────────────────────────────────────────
 * Homepage composite query
 * ────────────────────────────────────────────── */

export const homepageQuery = groq`{
  "services": *[_type == "service" && isActive == true] | order(sortOrder asc)[0...8] {
    _id, title, slug, category, excerpt, icon, pricingNote
  },
  "testimonials": *[_type == "testimonial" && isFeatured == true] | order(projectDate desc)[0...4] {
    _id, clientName, location, quote, rating,
    service-> { title, slug }
  },
  "caseStudies": *[_type == "caseStudy"] | order(completedAt desc)[0...3] {
    _id, title, slug, excerpt, metrics,
    "heroImageUrl": heroImage.asset->url
  },
  "blogPosts": *[_type == "blogPost" && isFeatured == true] | order(publishedAt desc)[0...3] {
    _id, title, slug, publishedAt, excerpt,
    "featuredImageUrl": featuredImage.asset->url
  },
  "areas": *[_type == "serviceArea" && isActive == true] | order(name asc) {
    _id, name, slug, region, coordinates
  },
  "settings": *[_type == "siteSettings"][0] {
    companyName, tagline, phone, email, license,
    emergencyAvailable, emergencyMessage
  }
}`;
