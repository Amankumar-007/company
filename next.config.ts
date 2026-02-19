import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gzip/Brotli compression for all responses
  compress: true,

  // Remove X-Powered-By header (security + cleanliness)
  poweredByHeader: false,

  // Image optimization config
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 1 day
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  // Skip ESLint errors during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Security + performance HTTP headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Caching: HTML pages (no-store for dynamic pages)
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff2|woff|ttf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache Next.js static chunks
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
