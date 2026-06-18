import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.twofloww.in'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/'],
            },
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/api/'],
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
                disallow: ['/api/'],
            },
            {
                userAgent: 'ClaudeBot',
                allow: '/',
                disallow: ['/api/'],
            },
            {
                userAgent: 'Claude-Web',
                allow: '/',
                disallow: ['/api/'],
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
                disallow: ['/api/'],
            },
            {
                userAgent: 'Applebot-Extended',
                allow: '/',
                disallow: ['/api/'],
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: ['/api/'],
            },
            {
                userAgent: 'Cohere-bot',
                allow: '/',
                disallow: ['/api/'],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    }
}
