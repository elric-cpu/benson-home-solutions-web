import type { MetadataRoute } from 'next'
import { AREA_DATA } from '@/lib/area-data'
import { SERVICES } from '@/lib/constants'
import { BLOG_POSTS } from '@/lib/blog-data'

const BASE_URL = 'https://www.bensonhomesolutions.com'

const staticRoutes = [
  '',
  '/about',
  '/areas',
  '/blog',
  '/calculator',
  '/contact',
  '/emergency',
  '/methodology',
  '/plans',
  '/privacy',
  '/tools/cost-calculator',
  '/tools/cost-estimator',
  '/tools/project-builder',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a stable build-time date rather than generating a new timestamp per-request,
  // to avoid sending noisy freshness signals to Googlebot.
  const lastModifiedDate = new Date('2026-03-20T00:00:00.000Z')

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path, index) => ({
    url: `${BASE_URL}${path || '/'}`,
    lastModified: lastModifiedDate,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/tools/') ? 0.9 : 0.7,
  }))

  const areaEntries: MetadataRoute.Sitemap = Object.keys(AREA_DATA).map((city) => ({
    url: `${BASE_URL}/areas/${city}`,
    lastModified: lastModifiedDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const serviceEntries: MetadataRoute.Sitemap = Object.keys(AREA_DATA).flatMap((city) =>
    Object.keys(SERVICES).map((service) => ({
      url: `${BASE_URL}/areas/${city}/${service}`,
      lastModified: lastModifiedDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
  )

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: lastModifiedDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...staticEntries, ...areaEntries, ...serviceEntries, ...blogEntries]
}
