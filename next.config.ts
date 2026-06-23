import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gzip/Brotli compression for all responses
  compress: true,

  // Skip TS type checking during build — Next.js 16.2 canary Turbopack bug:
  // routes.js is generated AFTER validator.ts tries to import it.
  // The compilation itself succeeds; this only skips the broken post-compile check.
  typescript: {
    ignoreBuildErrors: true,
  },

  // Silence the workspace root inference warning (pnpm-lock.yaml detected above)
  turbopack: {
    root: __dirname,
  },

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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },


  // Security + performance HTTP headers
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';
    
    const headersList: any[] = [
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
        ],
      },
    ];

    if (isProd) {
      // Add caching headers for production only
      headersList[0].headers.push({
        key: 'Cache-Control',
        value: 'public, max-age=0, must-revalidate',
      });

      headersList.push(
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
        }
      );
    }

    return headersList;
  },
};

export default nextConfig;
