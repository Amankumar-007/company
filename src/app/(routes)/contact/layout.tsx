import type { Metadata } from 'next'
import { ReactNode } from 'react'

const BASE_URL = 'https://www.twofloww.in'

export const metadata: Metadata = {
    title: 'Contact Us – Start Your Project Today',
    description:
        'Get in touch with Twofloww. Tell us about your project — web development, mobile app, design, or marketing. We respond within 24 hours. Let\'s build something amazing together.',
    keywords: [
        'contact twofloww',
        'hire digital agency',
        'web development inquiry',
        'get a quote digital agency',
        'start a project',
        'contact us digital agency India',
    ],
    alternates: {
        canonical: `${BASE_URL}/contact`,
    },
    openGraph: {
        title: 'Contact Twofloww – Start Your Project',
        description:
            'Tell us about your project and we\'ll get back to you within 24 hours. Let\'s build something amazing.',
        url: `${BASE_URL}/contact`,
        type: 'website',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact Twofloww' }],
    },
}

const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Twofloww',
    url: `${BASE_URL}/contact`,
    description: 'Reach out to Twofloww to discuss your digital project.',
    mainEntity: {
        '@type': 'Organization',
        name: 'Twofloww',
        url: BASE_URL,
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            availableLanguage: ['English', 'Hindi'],
        },
    },
}

export default function ContactLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            {children}
        </>
    )
}
