import type { Metadata } from 'next'
import { ReactNode } from 'react'

const BASE_URL = 'https://www.twofloww.in'

export const metadata: Metadata = {
    title: { absolute: 'About Twofloww | Premium Digital Agency & Technology Partner' },
    description:
        'Learn about Twofloww, a premium technology partner blending creative design with cutting-edge technology. We offer web development, mobile apps, UI/UX design, and digital marketing to help your business scale globally.',
    keywords: [
        'about twofloww',
        'premium technology partner',
        'creative digital agency',
        'web development team India',
        'UI/UX design agency',
        'digital transformation consulting',
        'Aman Kumar founder',
        'Twofloww founders',
        'global digital agency',
        'web development agency USA',
        'app development team UK',
        'tech startup founders Dubai',
        'best digital marketing team Australia',
        'global web development Canada',
    ],
    alternates: {
        canonical: `${BASE_URL}/about`,
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'Twofloww Digital Agency',
        title: 'About Twofloww | Premium Digital Agency & Technology Partner',
        description:
            'Learn about Twofloww, a premium technology partner blending creative design with cutting-edge technology. We provide comprehensive digital solutions.',
        url: `${BASE_URL}/about`,
        images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Twofloww Team' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Twofloww | Premium Digital Agency & Technology Partner',
        description:
            'Learn about Twofloww, a premium technology partner blending creative design with cutting-edge technology. We provide comprehensive digital solutions.',
        images: ['/opengraph-image'],
        creator: '@twofloww',
        site: '@twofloww',
    },
}

const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Twofloww Digital Agency',
    url: `${BASE_URL}/about`,
    description:
        'Learn about Twofloww, our mission, team, and how we approach digital solutions.',
    publisher: {
        '@type': 'Organization',
        name: 'Twofloww',
        url: BASE_URL,
    },
}

export default function AboutLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
            />
            {children}
        </>
    )
}
