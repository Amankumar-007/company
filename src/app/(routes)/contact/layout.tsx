import type { Metadata } from 'next'
import { ReactNode } from 'react'
import Link from 'next/link'
import locationsData from '@/data/locations-data.json'

const BASE_URL = 'https://www.twofloww.in'
const { brand } = locationsData

const nextSteps = [
    {
        title: 'We read your brief',
        description:
            'A member of our team reviews what you sent — goals, features, budget, and any files you attached — and replies within 24 hours.',
    },
    {
        title: 'Free consultation call',
        description:
            'We talk through your users, must-have features, timeline, and constraints, and point out any risks or simpler alternatives we see.',
    },
    {
        title: 'Clear proposal',
        description:
            'You get a written scope with milestones, a recommended tech stack, a timeline, and a cost estimate, so you can decide with full information.',
    },
]

const contactFaqs = [
    {
        question: 'How quickly will Twofloww respond to my enquiry?',
        answer: 'We reply to every project enquiry within 24 hours on working days, usually much sooner. If your request is urgent, mention it in the project description.',
    },
    {
        question: 'Is the first consultation really free?',
        answer: 'Yes. The initial consultation and the proposal that follows are free and come with no obligation to work with us.',
    },
    {
        question: 'What should I include in my project brief?',
        answer: 'Tell us what you want to build, who it is for, and what success looks like. Links to products you like, wireframes, or existing designs help, but a few clear sentences are enough to start.',
    },
    {
        question: "What if I don't know my budget yet?",
        answer: 'Pick the closest range or skip it. During the consultation we can outline options at different budget levels, such as a focused MVP first and more features later.',
    },
    {
        question: 'Do you work with clients outside India?',
        answer: `Yes. We are based in ${brand.address_india} and work with startups and businesses across ${brand.countries_served} countries, including the USA, UK, UAE, Canada, and Australia, collaborating remotely over calls, chat, and shared project boards.`,
    },
]

export const metadata: Metadata = {
    title: 'Contact Us – Start Your Project Today',
    description:
        'Contact Twofloww for web development, mobile apps, design, or marketing. We respond within 24 hours. Tell us about your project and get a free consultation.',
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
            telephone: brand.phone_india,
            email: brand.email,
            availableLanguage: ['English', 'Hindi'],
        },
    },
}

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: contactFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
}

export default function ContactLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([contactSchema, faqSchema]) }}
            />
            <main>
                {children}

                {/* Server-rendered so crawlers see real content — the form above is client-only */}
                <section className="bg-white text-black">
                    <div className="max-w-4xl mx-auto px-6 py-20 border-t border-gray-200">
                        <h2 className="text-3xl md:text-4xl font-bold mb-10">What happens after you contact us</h2>
                        <ol className="grid gap-8 md:grid-cols-3 mb-20">
                            {nextSteps.map((step, i) => (
                                <li key={step.title}>
                                    <span className="text-sm text-gray-500">Step {i + 1}</span>
                                    <h3 className="text-lg font-semibold mt-1 mb-2">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </li>
                            ))}
                        </ol>

                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Other ways to reach Twofloww</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Prefer email or a quick call? Reach us directly — we build{' '}
                            <Link href="/services" className="underline hover:text-black">websites, mobile apps, and ecommerce platforms</Link>,
                            and help businesses grow with SEO and digital marketing. You can also browse our{' '}
                            <Link href="/case-studies" className="underline hover:text-black">case studies</Link> to see what we have shipped.
                        </p>
                        <ul className="space-y-2 text-lg mb-20">
                            <li>Email: <a href={`mailto:${brand.email}`} className="underline hover:text-gray-600">{brand.email}</a></li>
                            <li>Phone / WhatsApp: <a href={`tel:${brand.phone_india.replace(/\s/g, '')}`} className="underline hover:text-gray-600">{brand.phone_india}</a></li>
                            <li>Office: {brand.address_india}</li>
                        </ul>

                        <h2 className="text-3xl md:text-4xl font-bold mb-10">Frequently asked questions</h2>
                        <div className="space-y-8">
                            {contactFaqs.map((faq) => (
                                <div key={faq.question}>
                                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
