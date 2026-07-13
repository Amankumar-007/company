import type { Metadata } from 'next'
import { ReactNode } from 'react'

const BASE_URL = 'https://www.twofloww.in'

export const metadata: Metadata = {
    title: 'Our Projects – Portfolio & Case Studies',
    description:
        'Browse Twofloww\'s portfolio — web apps, mobile applications, UI/UX designs, and marketing campaigns. See our work and what we can build for you.',
    keywords: [
        'twofloww portfolio',
        'web development projects',
        'digital agency case studies',
        'mobile app projects',
        'design portfolio',
        'agency work examples',
        'web development portfolio USA',
        'app development case studies UK',
        'software projects Australia',
        'digital agency work Dubai',
        'best web designs UAE',
        'UI UX portfolio Canada',
    ],
    alternates: {
        canonical: `${BASE_URL}/projects`,
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'Twofloww Digital Agency',
        title: 'Our Projects – Portfolio & Case Studies | Twofloww',
        description:
            'Browse our portfolio of successful web, mobile, and design projects.',
        url: `${BASE_URL}/projects`,
        images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Twofloww Projects' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Projects – Portfolio & Case Studies | Twofloww',
        description:
            'Browse our portfolio of successful web, mobile, and design projects.',
        images: ['/opengraph-image'],
        creator: '@twofloww',
        site: '@twofloww',
    },
}

export default function ProjectsLayout({ children }: { children: ReactNode }) {
    return <>{children}</>
}
