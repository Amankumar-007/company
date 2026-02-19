import type { Metadata } from 'next'
import { ReactNode } from 'react'

const BASE_URL = 'https://www.twofloww.in'

export const metadata: Metadata = {
    title: 'Service Details – Expert Digital Solutions',
    description:
        'Detailed overview of Twofloww\'s digital services including technologies, features, and process. Explore web development, mobile apps, UI/UX design, SEO, cloud, and e-commerce solutions.',
    alternates: {
        canonical: `${BASE_URL}/service-detail`,
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'Twofloww Digital Agency',
        title: 'Service Details | Twofloww Digital Agency',
        description:
            'In-depth look at Twofloww services: technologies used, key features, and our delivery process.',
        url: `${BASE_URL}/service-detail`,
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Twofloww Service' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Service Details | Twofloww Digital Agency',
        description:
            'In-depth look at Twofloww services: technologies used, key features, and our delivery process.',
        images: ['/og-image.png'],
        creator: '@twofloww',
        site: '@twofloww',
    },
}

export default function ServiceDetailLayout({ children }: { children: ReactNode }) {
    return <>{children}</>
}
