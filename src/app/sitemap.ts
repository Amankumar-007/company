import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'
import { targetLocations } from '@/data/seo-locations'
import locationsData from '@/data/locations-data.json'
import { solutionsData } from '@/data/solutions'

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

    const seoServicesToGenerate = ['digital-agency', 'web-development', 'seo-services', 'ecommerce-solutions']
    const programmaticSeoPages = targetLocations.flatMap(location =>
        seoServicesToGenerate.map(service => ({
            url: `${BASE_URL}/best-${service}-in-${location.id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    )

    // Location company pages — one per city/country in locations-data.json
    const locationCompanyPages = locationsData.locations.flatMap(loc => {
        const oldPage = {
            url: `${BASE_URL}/web-development-company-${loc.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: loc.is_home_base ? 1.0 : 0.8,
        };
        
        const newPages = locationsData.services.map(service => ({
            url: `${BASE_URL}/${service.key}-agency-in-${loc.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: loc.is_home_base ? 1.0 : 0.8,
        }));

        return [oldPage, ...newPages];
    })

    const solutionsPages = solutionsData.map((solution) => ({
        url: `${BASE_URL}/solutions/${solution.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // Use the most recent blog publish date as the blog index's lastModified
    const latestBlogDate = blogs && blogs.length > 0
        ? new Date(blogs[0].updated_at ?? new Date())
        : new Date('2024-01-01')

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/solutions`,
            lastModified: new Date('2025-01-01'),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date('2024-10-01'),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/services`,
            lastModified: new Date('2025-01-01'),
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
            lastModified: new Date('2024-10-01'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: latestBlogDate,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...blogPages,
        ...programmaticSeoPages,
        ...locationCompanyPages,
        ...solutionsPages,
    ]
}
