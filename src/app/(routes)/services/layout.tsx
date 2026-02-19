import type { Metadata } from 'next'
import { ReactNode } from 'react'

const BASE_URL = 'https://www.twofloww.in'

export const metadata: Metadata = {
    title: 'Our Services – Web, Mobile, SEO & Design',
    description:
        'Explore Twofloww\'s full range of digital services: web development, mobile app development, UI/UX design, SEO & marketing, cloud solutions, and e-commerce. Expert team with 5+ years of experience.',
    keywords: [
        'web development services',
        'mobile app development',
        'UI UX design services',
        'SEO marketing services',
        'cloud solutions',
        'e-commerce development',
        'digital agency services India',
        'Next.js React development',
    ],
    alternates: {
        canonical: `${BASE_URL}/services`,
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'Twofloww Digital Agency',
        title: 'Our Services – Web, Mobile, SEO & Design | Twofloww',
        description:
            'Full-range digital services — web development, mobile apps, UI/UX design, SEO, cloud, and e-commerce.',
        url: `${BASE_URL}/services`,
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Twofloww Services' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Services – Web, Mobile, SEO & Design | Twofloww',
        description:
            'Full-range digital services — web development, mobile apps, UI/UX design, SEO, cloud, and e-commerce.',
        images: ['/og-image.png'],
        creator: '@twofloww',
        site: '@twofloww',
    },
}

const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Twofloww Digital Services',
    url: `${BASE_URL}/services`,
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            item: {
                '@type': 'Service',
                name: 'Web Development',
                description: 'Responsive, scalable web applications using React, Next.js, Node.js.',
                provider: { '@type': 'Organization', name: 'Twofloww', url: BASE_URL },
                url: `${BASE_URL}/service-detail?id=web-development`,
            },
        },
        {
            '@type': 'ListItem',
            position: 2,
            item: {
                '@type': 'Service',
                name: 'Mobile App Development',
                description: 'Native and cross-platform iOS & Android apps.',
                provider: { '@type': 'Organization', name: 'Twofloww', url: BASE_URL },
                url: `${BASE_URL}/service-detail?id=mobile-development`,
            },
        },
        {
            '@type': 'ListItem',
            position: 3,
            item: {
                '@type': 'Service',
                name: 'SEO & Digital Marketing',
                description: 'Comprehensive digital marketing and SEO strategies.',
                provider: { '@type': 'Organization', name: 'Twofloww', url: BASE_URL },
                url: `${BASE_URL}/service-detail?id=seo-marketing`,
            },
        },
        {
            '@type': 'ListItem',
            position: 4,
            item: {
                '@type': 'Service',
                name: 'UI/UX Design',
                description: 'User-centered design that converts and delights.',
                provider: { '@type': 'Organization', name: 'Twofloww', url: BASE_URL },
                url: `${BASE_URL}/service-detail?id=ui-ux-design`,
            },
        },
        {
            '@type': 'ListItem',
            position: 5,
            item: {
                '@type': 'Service',
                name: 'Cloud Solutions',
                description: 'Scalable cloud infrastructure on AWS, GCP, and Azure.',
                provider: { '@type': 'Organization', name: 'Twofloww', url: BASE_URL },
                url: `${BASE_URL}/service-detail?id=cloud-solutions`,
            },
        },
        {
            '@type': 'ListItem',
            position: 6,
            item: {
                '@type': 'Service',
                name: 'E-commerce Solutions',
                description: 'Complete e-commerce platforms that drive conversions.',
                provider: { '@type': 'Organization', name: 'Twofloww', url: BASE_URL },
                url: `${BASE_URL}/service-detail?id=ecommerce-solutions`,
            },
        },
    ],
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
            />
            {children}
        </>
    )
}
