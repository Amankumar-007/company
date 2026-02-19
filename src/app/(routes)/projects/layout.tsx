import type { Metadata } from 'next'
import { ReactNode } from 'react'

const BASE_URL = 'https://www.twofloww.in'

export const metadata: Metadata = {
    title: 'Our Projects – Portfolio & Case Studies',
    description:
        'Browse Twofloww\'s portfolio of successful projects — web apps, mobile applications, UI/UX designs, and digital marketing campaigns. See our work and what we can build for you.',
    keywords: [
        'twofloww portfolio',
        'web development projects',
        'digital agency case studies',
        'mobile app projects',
        'design portfolio',
        'agency work examples',
    ],
    alternates: {
        canonical: `${BASE_URL}/projects`,
    },
    openGraph: {
        title: 'Our Projects – Portfolio & Case Studies | Twofloww',
        description:
            'Browse our portfolio of successful web, mobile, and design projects.',
        url: `${BASE_URL}/projects`,
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Twofloww Projects' }],
    },
}

export default function ProjectsLayout({ children }: { children: ReactNode }) {
    return <>{children}</>
}
