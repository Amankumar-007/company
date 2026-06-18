import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'

const BASE_URL = 'https://www.twofloww.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = await createClient()
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug, updated_at')
      .eq('status', 'published')

    const blogPages = blogs?.map((blog) => ({
        url: `${BASE_URL}/blog/${blog.slug}`,
        lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    })) || []

    // Service IDs from services/page.tsx
    const serviceIds = [
        'web-development',
        'mobile-development',
        'seo-marketing',
        'ui-ux-design',
        'cloud-solutions',
        'ecommerce-solutions',
    ]

    // Project IDs from data/projects.js (1-8)
    const projectIds = [1, 2, 3, 4, 5, 6, 7, 8]

    // Key technologies/skills categories
    const skills = [
        'react',
        'next.js',
        'typescript',
        'node.js',
        'mongodb',
        'ui-ux',
        'mobile-apps',
        'seo',
        'digital-marketing',
        'tailwind-css'
    ]

    // Additional dynamic pages based on user examples
    const categories = [
        'ai-tools',
        'full-stack',
        'web-development',
        'saas',
        'mobile-app'
    ]

    const serviceDetailPages = serviceIds.map((id) => ({
        url: `${BASE_URL}/service-detail?id=${id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    const projectDetailPages = projectIds.map((id) => ({
        url: `${BASE_URL}/project-detail?id=${id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const skillPages = skills.map((skill) => ({
        url: `${BASE_URL}/services?filter=${skill}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    const categoryPages = categories.map((cat) => ({
        url: `${BASE_URL}/projects?category=${cat}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/career`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/roadmap`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        ...serviceDetailPages,
        ...projectDetailPages,
        ...categoryPages,
        ...skillPages,
        ...blogPages,
    ]
}
