import './globals.css'
import { Inter, Space_Grotesk, Unbounded } from 'next/font/google'
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import { ReactNode } from 'react';
import { CursorProvider } from '../components/Cursor';
import SmoothScrollWrapper from '../components/SmoothScrollWrapper';
import ExtensionErrorSuppressor from '../components/ExtensionErrorSuppressor';
import ConsultModal from '../components/ConsultModal';
import type { Metadata, Viewport } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-unbounded',
  display: 'swap',
})

const BASE_URL = 'https://www.twofloww.in';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Twofloww – Premium Digital Agency | Web & Mobile Development India',
    template: '%s | Twofloww Digital Agency',
  },
  description:
    'Twofloww is a premium digital agency in India specializing in web development, mobile apps, UI/UX design, SEO & digital marketing. Trusted by startups and enterprises. Get a free consultation today.',
  keywords: [
    'digital agency India',
    'web development company India',
    'mobile app development India',
    'UI UX design agency',
    'SEO services India',
    'digital marketing agency India',
    'Next.js development agency',
    'React development company',
    'e-commerce development India',
    'cloud solutions India',
    'best digital agency Noida',
    'web design agency Delhi',
    'startup digital agency India',
    'twofloww',
    'affordable web development India',
    'custom software development India',
  ],
  authors: [{ name: 'Twofloww', url: BASE_URL }],
  creator: 'Twofloww',
  publisher: 'Twofloww',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Twofloww Digital Agency',
    title: 'Twofloww – Premium Digital Agency | Web & Mobile Development India',
    description:
      'Premium digital agency in India delivering world-class web development, mobile apps, UI/UX design, and digital marketing. Trusted by startups and enterprises.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Twofloww Digital Agency – Web & Mobile Development India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twofloww – Premium Digital Agency India',
    description:
      'Premium digital agency in India delivering world-class web development, mobile apps, UI/UX design, and digital marketing.',
    images: ['/og-image.png'],
    creator: '@twofloww',
    site: '@twofloww',
  },
  verification: {
    google: 'add-your-google-site-verification-token-here',
  },
  category: 'technology',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Twofloww',
  alternateName: 'Twofloww Digital Agency',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/logo.png`,
    width: 400,
    height: 400,
  },
  sameAs: [
    'https://www.linkedin.com/company/twofloww',
    'https://twitter.com/twofloww',
    'https://www.instagram.com/twofloww',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${BASE_URL}/contact`,
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${BASE_URL}/contact`,
      availableLanguage: ['English'],
      areaServed: ['IN', 'US', 'GB', 'AU', 'CA'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressRegion: 'Uttar Pradesh',
    addressLocality: 'Noida',
  },
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'City', name: 'Noida' },
    { '@type': 'City', name: 'Delhi' },
    { '@type': 'City', name: 'Mumbai' },
    { '@type': 'City', name: 'Bangalore' },
    { '@type': 'City', name: 'Hyderabad' },
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'City', name: 'Pune' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
  ],
  description:
    'Premium digital agency in India specializing in web development, mobile apps, UI/UX design, SEO, and digital marketing for startups and enterprises.',
  foundingDate: '2023',
  knowsAbout: [
    'Web Development',
    'Next.js Development',
    'React Development',
    'Mobile App Development',
    'UI/UX Design',
    'Search Engine Optimization',
    'Digital Marketing',
    'Cloud Solutions',
    'E-commerce Development',
    'Custom Software Development',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Agency Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UI/UX Design' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-commerce Solutions' } },
    ],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Twofloww Digital Agency',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable} ${unbounded.variable} bg-white text-black min-h-screen`} suppressHydrationWarning>
        <ExtensionErrorSuppressor />
        <SmoothScrollWrapper>
          <CursorProvider>
            <Header />
            <div className="relative z-20 bg-white min-h-screen">
              {children}
            </div>
            <div className="sticky bottom-0 z-10">
              <Footer />
            </div>
            <ConsultModal />
            <ScrollToTop />
          </CursorProvider>
        </SmoothScrollWrapper>
      </body>
    </html>
  )
}
