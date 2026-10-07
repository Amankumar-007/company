import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'
import locationsData from '@/data/locations-data.json'
import { solutionsData } from '@/data/solutions'
import { industries } from '@/data/industries'
import { servicePages } from '@/data/service-pages'

const BASE_URL = 'https://www.twofloww.in'

import { projects as projectsList } from '@/data/projects'

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

    // Core national service pages (legacy service-detail?id= URLs 308 here)
    const servicePageEntries = servicePages.map((page) => ({
        url: BASE_URL + '/services/' + page.slug,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.95,
    }))

    // Case studies use clean, indexable URLs — project-detail?id= is
    // noindexed (query-param route), so it's intentionally excluded here.
    const caseStudyPages = projectsList.map((project) => ({
        url: `${BASE_URL}/case-studies/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
    }))

    // One page per location × service. Legacy web-development-company-* and
    // best-*-in-* URLs 301 to these (next.config.ts), so they're not listed.
    const locationServicePages = locationsData.locations.flatMap(loc =>
        locationsData.services.map(service => ({
            url: `${BASE_URL}/${service.key}-agency-in-${loc.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: loc.is_home_base ? 1.0 : 0.8,
        }))
    )

    const solutionsPages = solutionsData.map((solution) => ({
        url: `${BASE_URL}/solutions/${solution.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    const industryPages = industries.map((industry) => ({
        url: `${BASE_URL}/industries/${industry.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.85,
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
            url: `${BASE_URL}/locations`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/solutions`,
            lastModified: new Date(),
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
            url: `${BASE_URL}/case-studies`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${BASE_URL}/industries`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
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
        ...servicePageEntries,
        ...caseStudyPages,
        ...locationServicePages,
        ...solutionsPages,
        ...industryPages,
    ]
}
