import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'
import Header from '../components/Header';
import { ReactNode } from 'react';
import { CursorProvider } from '../components/Cursor';
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
    default: 'Twofloww – Premium Digital Agency | Web & Mobile Development',
    template: '%s | Twofloww Digital Agency',
  },
  description:
    'Twofloww is a premium digital agency specializing in web development, mobile apps, UI/UX design, SEO & digital marketing, cloud solutions, and e-commerce. We turn your vision into reality.',
  keywords: [
    'digital agency',
    'web development',
    'mobile app development',
    'UI UX design',
    'SEO services',
    'digital marketing',
    'Next.js development',
    'React development',
    'e-commerce solutions',
    'cloud solutions',
    'twofloww',
    'India digital agency',
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
    title: 'Twofloww – Premium Digital Agency | Web & Mobile Development',
    description:
      'Premium digital agency delivering world-class web development, mobile apps, UI/UX design, and digital marketing solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Twofloww Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twofloww – Premium Digital Agency',
    description:
      'Premium digital agency delivering world-class web development, mobile apps, UI/UX design, and digital marketing solutions.',
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
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: [
    'https://www.linkedin.com/company/twofloww',
    'https://twitter.com/twofloww',
    'https://www.instagram.com/twofloww',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: `${BASE_URL}/contact`,
    availableLanguage: ['English', 'Hindi'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  description:
    'Premium digital agency specializing in web development, mobile apps, UI/UX design, and digital marketing.',
  foundingDate: '2023',
  knowsAbout: [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'SEO',
    'Digital Marketing',
    'Cloud Solutions',
    'E-commerce',
  ],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
      <body className={`${inter.className} ${spaceGrotesk.variable}`}>
        <CursorProvider>
          <Header />
          {children}
        </CursorProvider>
      </body>
    </html>
  )
}
