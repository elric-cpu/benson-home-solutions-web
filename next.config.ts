import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',

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
        destination: '/services/water-damage',
        permanent: true,
      },
      {
        source: '/services/window-door-replacement',
        destination: '/services/windows-doors',
        permanent: true,
      },
      {
        source: '/services/mold-mitigation',
        destination: '/services/mold-remediation',
        permanent: true,
      },
      {
        source: '/maintenance',
        destination: '/services/maintenance-subscriptions',
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
    ];
  },
};

export default nextConfig;
