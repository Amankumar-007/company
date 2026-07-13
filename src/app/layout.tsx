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
  applicationName: 'Twofloww',
  title: {
    default: 'Twofloww – Web Development Company & Web Agency in Delhi NCR',
    template: '%s | Twofloww',
  },
  description:
    'Twofloww is a leading web development company and web agency in Delhi NCR (Noida, Delhi, Gurugram). We build websites, mobile apps, food delivery apps, taxi apps & digital products. 50+ projects. Free consultation.',
  keywords: [
    // High-volume gap keywords (from competitor analysis)
    'web development company',
    'website development company',
    'website development',
    'web development services',
    'web development agency',
    'web agency',
    'web agency in noida',
    'web agency in delhi ncr',
    'web agency in delhi',
    'best web agency in noida',
    'best web agency in delhi ncr',
    'digital agency in noida',
    'digital agency in delhi ncr',
    'web development company in delhi',
    'web development company in noida',
    'website development company in noida',
    'website development company in delhi ncr',
    'website designing company in delhi',
    'digital marketing agency in delhi',
    'digital marketing company in delhi',
    'seo company in delhi',
    'mobile app development services',
    'it companies in delhi',
    'food delivery app development company',
    'on demand app development company',
    'grocery delivery app development company',
    'taxi booking app development company',
    // Core brand/service keywords
    'Twofloww',
    'digital agency India',
    'web development company India',
    'mobile app development India',
    'UI UX design agency',
    'SEO services India',
    'on demand app development company in india',
    'Next.js development company',
    'React development company',
    'e-commerce development India',
    'best web development company in delhi',
    'web design agency Delhi NCR',
    'startup digital agency India',
    'affordable web development India',
    'custom software development India',
    // Newly requested keywords for better ranking
    'two flow',
    'twoflow',
    'twofloww solution',
    'two flow solutio',
    'twoflow solution',
    'website build',
    'website build agency',
    'custom website build',
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
    siteName: 'Twofloww',
    title: 'Twofloww – Web Development Company & Web Agency in Delhi NCR',
    description:
      'Twofloww: web development company & web agency in Delhi NCR (Noida, Delhi, Gurugram). Websites, mobile apps, food delivery & on-demand apps, SEO. 50+ projects. Free consultation.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Twofloww Digital Agency – Web & Mobile Development India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twofloww – Web Development Company & Web Agency in Delhi NCR',
    description:
      'Twofloww: web development company & web agency in Delhi NCR (Noida, Delhi, Gurugram). Websites, mobile apps, food delivery & on-demand apps, SEO. 50+ projects. Free consultation.',
    images: ['/opengraph-image'],
    creator: '@twofloww',
    site: '@twofloww',
  },
  verification: {
    google: 'add-your-google-site-verification-token-here',
  },
  category: 'technology',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
    { '@type': 'Place', name: 'Delhi NCR' },
    { '@type': 'City', name: 'Noida' },
    { '@type': 'City', name: 'Delhi' },
    { '@type': 'City', name: 'Gurugram' },
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
  // "name" is what Google displays instead of the raw domain in search results
  name: 'Twofloww',
  alternateName: 'Twofloww Digital Agency',
  url: BASE_URL,
  description: 'Web development company in Delhi NCR. Websites, mobile apps, food delivery & on-demand apps, SEO & digital marketing.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

// Sitelinks navigation schema — signals main pages to Google so sitelinks
// appear under branded searches (similar to how ICBR Wellness shows sub-pages)
const siteNavigationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Twofloww Main Navigation',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'WebPage',
        name: 'Services – Web Development, Mobile Apps & SEO',
        url: `${BASE_URL}/services`,
        description: 'Web development, mobile app development, UI/UX design, SEO & digital marketing by Twofloww.',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'WebPage',
        name: 'Solutions – Food Delivery, Taxi & On-Demand Apps',
        url: `${BASE_URL}/solutions`,
        description: 'Food delivery app, grocery delivery, taxi booking, fitness, astrology & dating app development.',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'WebPage',
        name: 'Projects – Portfolio',
        url: `${BASE_URL}/projects`,
        description: 'Explore Twofloww\'s portfolio of web apps, mobile applications, and digital products.',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'WebPage',
        name: 'About Twofloww',
        url: `${BASE_URL}/about`,
        description: 'Meet the Twofloww team — developers, designers, and digital architects building top-ranked products.',
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'WebPage',
        name: 'Blog – Web Development & Digital Marketing Insights',
        url: `${BASE_URL}/blog`,
        description: 'Practical guides on web development, SEO, UI/UX design and digital marketing from Twofloww.',
      },
    },
    {
      '@type': 'ListItem',
      position: 6,
      item: {
        '@type': 'WebPage',
        name: 'Contact Twofloww',
        url: `${BASE_URL}/contact`,
        description: 'Get in touch with Twofloww for web development, mobile apps, and digital marketing. Free consultation.',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
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
