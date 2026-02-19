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
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    }
}
