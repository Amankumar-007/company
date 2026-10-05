import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.twofloww.in'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                // Never disallow /_next/ — it serves the CSS, JS and optimized
                // images (/_next/image) crawlers need to render pages. Blocking it
                // made every page look broken to non-Google crawlers.
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/admin/'],
            },
            {
                userAgent: 'GPTBot',
                allow: '/',
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            {
                userAgent: 'ClaudeBot',
                allow: '/',
            },
            {
                userAgent: 'Claude-Web',
                allow: '/',
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
            },
            {
                userAgent: 'Applebot-Extended',
                allow: '/',
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
            },
            {
                userAgent: 'Cohere-bot',
                allow: '/',
            },
            {
                userAgent: 'CCBot',
                allow: '/',
            },
            {
                userAgent: 'anthropic-ai',
                allow: '/',
            },
            {
                userAgent: 'Omgilibot',
                allow: '/',
            },
            {
                userAgent: 'FacebookBot',
                allow: '/',
            },
            {
                userAgent: 'Bytespider',
                allow: '/',
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    }
}
