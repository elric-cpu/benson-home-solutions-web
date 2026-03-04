import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  // --- Next.js 15: Performance & Optimization ---
  experimental: {
    // ppr: 'incremental', // PPR requires next@canary even in v15
    optimizePackageImports: [
      'lucide-react',
      '@ai-sdk/react',
      'clsx',
      'tailwind-merge',
    ],
  },

  // --- Strict Mode: Ensure zero errors/warnings for production builds ---
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // --- External Assets ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

// Sentry configuration options
const sentryConfig = {
  // Suppress source map warnings
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  automaticVercelMonitors: true,
  widenClientFileUpload: false,
  tunnelRoute: '/monitoring',

  // --- TURBOPACK COMPATIBILITY FIXES ---
  
  // Disable Sentry's Webpack plugins to prevent conflicts with Turbopack during the build
  disableServerWebpackPlugin: true,
  disableClientWebpackPlugin: true,

  // Force Sentry to upload source maps after the build completes (Required for Turbopack)
  useRunAfterProductionCompileHook: true,
};

export default withSentryConfig(nextConfig, sentryConfig);