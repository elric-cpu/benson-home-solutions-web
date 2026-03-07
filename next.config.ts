import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  // --- Next.js 15: Performance & Optimization ---
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@ai-sdk/react',
      'clsx',
      'tailwind-merge',
    ],
  },

  // --- Strict Mode ---
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // --- External Assets FIX ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**', // Ensures all Sanity assets are allowed
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // Fixes the Unsplash "Invalid src prop" error
      },
    ],
  },
};

// Sentry configuration options
const sentryConfig = {
  hideSourceMaps: true,
  tunnelRoute: '/monitoring-tunnel',

  // --- TURBOPACK COMPATIBILITY FIXES ---
  disableServerWebpackPlugin: true,
  disableClientWebpackPlugin: true,
  useRunAfterProductionCompileHook: true,

  // --- VERSION 10 CONFIG ---
  _experimental: {
    vercelCronsMonitoring: true,
  },

  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
};

export default withSentryConfig(nextConfig, sentryConfig);
