import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  // --- Next.js 15: Performance & Optimization ---
  experimental: {
    outputFileTracingRoot: process.cwd(),
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

const hasSentryReleaseConfig = Boolean(
  process.env.SENTRY_AUTH_TOKEN &&
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT,
);

// Sentry configuration options
const sentryConfig = {
  hideSourceMaps: true,
  tunnelRoute: '/monitoring-tunnel',
  ...(hasSentryReleaseConfig
    ? {
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
      }
    : {}),

  // --- TURBOPACK COMPATIBILITY FIXES ---
  disableServerWebpackPlugin: true,
  disableClientWebpackPlugin: true,
  useRunAfterProductionCompileHook: hasSentryReleaseConfig,

  // --- VERSION 10 CONFIG ---
  _experimental: {
    vercelCronsMonitoring: true,
  },

  sourcemaps: {
    deleteSourcemapsAfterUpload: hasSentryReleaseConfig,
  },
};

export default withSentryConfig(nextConfig, sentryConfig);
