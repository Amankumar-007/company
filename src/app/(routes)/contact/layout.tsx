import type { Metadata } from 'next'
import { ReactNode } from 'react'

const BASE_URL = 'https://www.twofloww.in'

export const metadata: Metadata = {
    title: 'Contact Us – Start Your Project Today',
    description:
        'Contact Twofloww for web development, mobile apps, design, or marketing. We respond within 24 hours. Tell us about your project and get a free consultation.',
    keywords: [
        'contact twofloww',
        'hire digital agency',
        'web development inquiry',
        'get a quote digital agency',
        'start a project',
        'contact us digital agency India',
        'hire web developers USA',
        'contact app developers UK',
        'hire digital agency Australia',
        'web development consultation Dubai',
        'software development agency Canada',
        'best web agency UAE',
    ],
    alternates: {
        canonical: `${BASE_URL}/contact`,
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'Twofloww Digital Agency',
        title: 'Contact Twofloww – Start Your Project',
        description:
            "Tell us about your project and we'll get back to you within 24 hours. Let's build something amazing.",
        url: `${BASE_URL}/contact`,
        images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Contact Twofloww' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Twofloww – Start Your Project',
        description:
            "Tell us about your project and we'll get back to you within 24 hours. Let's build something amazing.",
        images: ['/opengraph-image'],
        creator: '@twofloww',
        site: '@twofloww',
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
