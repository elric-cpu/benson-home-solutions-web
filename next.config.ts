import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
      ],
    }];
  },
  async redirects() {
    return [
      { source: '/services/water-damage', destination: '/services/water-damage-restoration', permanent: true },
      { source: '/services/windows-doors', destination: '/services/window-door-replacement', permanent: true },
      { source: '/services/mold-remediation', destination: '/services/mold-mitigation', permanent: true },
      { source: '/services/sitework', destination: '/services/sitework-excavation', permanent: true },
      { source: '/services/maintenance-subscriptions', destination: '/services/property-maintenance', permanent: true },
      { source: '/services/tenant-services', destination: '/services/property-maintenance', permanent: true },
      { source: '/services/roof-maintenance', destination: '/services/weatherization-air-sealing', permanent: true },
      { source: '/services/kitchen-remodeling', destination: '/services/fire-damage-repair-reconstruction', permanent: true },
      { source: '/services/bathroom-remodeling', destination: '/services/fire-damage-repair-reconstruction', permanent: true },
      { source: '/maintenance', destination: '/services/property-maintenance', permanent: true },
      { source: '/areas', destination: '/service-area', permanent: true },
      { source: '/areas/:path*', destination: '/service-area', permanent: true },
      { source: '/service-areas/mid-valley/:path*', destination: '/service-area', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/reviews', destination: '/about', permanent: true },
      { source: '/tools/spatial-data', destination: '/', permanent: true },
      { source: '/category/uncategorized/:path*', destination: '/', permanent: true },
      { source: '/most-innovative-builders-company/:path*', destination: '/about', permanent: true },
      { source: '/seven-mistakes-to-avoid-during-construction/:path*', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
