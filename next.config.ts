import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: '',

  // Strict checks for production
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://challenges.cloudflare.com https:; frame-src https://challenges.cloudflare.com; media-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // === Sprint 0: Legacy URL redirect map (portal.bensonhomesolutions.com → new) ===
      {
        source: '/services',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/water-damage-restoration',
        destination: '/emergency',
        permanent: true,
      },
      {
        source: '/services/window-door-replacement',
        destination: '/contact?service=Windows%20%2F%20Doors%20%2F%20Site%20Repairs',
        permanent: true,
      },
      {
        source: '/services/mold-mitigation',
        destination: '/contact?service=Water%20Damage%20%2F%20Mold%20%2F%20Moisture',
        permanent: true,
      },
      {
        source: '/maintenance',
        destination: '/plans',
        permanent: true,
      },
      {
        source: '/reviews',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/tools/spatial-data',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/uncategorized/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/most-innovative-builders-company/:path*',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/seven-mistakes-to-avoid-during-construction/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/service-areas/mid-valley/:slug',
        destination: '/areas/:slug',
        permanent: true,
      },
      {
        source: '/service-areas/:path*',
        destination: '/areas',
        permanent: true,
      },
      {
        source: '/home-2/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/blog/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/areas/philomath',
        destination: '/areas/corvallis',
        permanent: true,
      },
      {
        source: '/areas/philomath/:service',
        destination: '/areas/corvallis/:service',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/methodology/energy',
        destination: '/methodology',
        permanent: true,
      },
      {
        source: '/services/remodeling',
        destination: '/contact?service=Inspection%20Repairs',
        permanent: true,
      },
      {
        source: '/services/kitchen-remodeling',
        destination: '/contact?service=Inspection%20Repairs',
        permanent: true,
      },
      {
        source: '/services/bathroom-remodeling',
        destination: '/contact?service=Inspection%20Repairs',
        permanent: true,
      },
      {
        source: '/services/maintenance-subscriptions',
        destination: '/plans',
        permanent: true,
      },
      {
        source: '/services/water-damage-restoration',
        destination: '/emergency',
        permanent: true,
      },
      {
        source: '/services/window-door-replacement',
        destination: '/contact?service=Windows%20%2F%20Doors%20%2F%20Site%20Repairs',
        permanent: true,
      },
      {
        source: '/services/mold-mitigation',
        destination: '/contact?service=Water%20Damage%20%2F%20Mold%20%2F%20Moisture',
                permanent: true,
      },
      {
        source: '/tools',
        destination: '/tools/cost-calculator',
        permanent: true,
      },
      {
        source: '/tools/maintenance-roi',
        destination: '/tools/cost-calculator',
        permanent: true,
      },
      {
        source: '/tools/subscription-recommender',
        destination: '/plans',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
