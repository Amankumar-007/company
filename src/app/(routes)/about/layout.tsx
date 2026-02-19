import type { Metadata } from 'next'
import { ReactNode } from 'react'

const BASE_URL = 'https://www.twofloww.in'

export const metadata: Metadata = {
    title: 'About Us – Meet the Twofloww Team',
    description:
        'Meet the passionate team behind Twofloww — our founders, designers, engineers, and strategists dedicated to delivering world-class digital solutions.',
    keywords: [
        'about twofloww',
        'digital agency team',
        'web development team India',
        'Aman Kumar founder',
        'Twofloww founders',
    ],
    alternates: {
        canonical: `${BASE_URL}/about`,
    },
    openGraph: {
        title: 'About Us – Meet the Twofloww Team',
        description:
            'Meet the passionate team behind Twofloww — our founders, designers, engineers, and strategists.',
        url: `${BASE_URL}/about`,
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Twofloww Team' }],
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
