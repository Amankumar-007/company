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
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';

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
  // Only used in the footer wordmark and 404 page — don't preload it on every page
  preload: false,
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
    default: 'Twofloww | Web Development, Mobile Apps, SEO & Digital Growth',
    template: '%s | Twofloww',
  },
  description:
    'Twofloww is a digital product and growth agency based in India, helping startups and businesses worldwide build websites, mobile apps, ecommerce platforms, and scalable software — plus SEO and digital marketing to grow. 50+ projects delivered. Free consultation.',
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
  // NOTE: Do NOT set a global canonical here — each page sets its own
  // canonical via `alternates.canonical`. Setting one here would make
  // every route look like a duplicate of the homepage to Google.
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Twofloww',
    title: 'Twofloww | Web Development, Mobile Apps, SEO & Digital Growth',
    description:
      'Digital product and growth agency based in India, building websites, mobile apps, ecommerce platforms & scalable software for businesses worldwide. SEO & digital marketing included. 50+ projects. Free consultation.',
    images: [
      {
        url: `${BASE_URL}/send.png`,
        secureUrl: `${BASE_URL}/send.png`,
        width: 1100,
        height: 576,
        type: 'image/png',
        alt: 'Twofloww – Web Development & Digital Growth Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twofloww | Web Development, Mobile Apps, SEO & Digital Growth',
    description:
      'Digital product and growth agency based in India, building websites, mobile apps, ecommerce platforms & scalable software for businesses worldwide. SEO & digital marketing included. 50+ projects. Free consultation.',
    images: [`${BASE_URL}/send.png`],
    creator: '@twofloww',
    site: '@twofloww',
  },
  // Only emit verification tags when configured — the old fallback rendered a
  // bogus google-site-verification="GSC_VERIFICATION_TOKEN" tag on every page.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }),
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }),
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  category: 'technology',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="image_src" href={`${BASE_URL}/send.png`} />
        <meta property="og:image" content={`${BASE_URL}/send.png`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/send.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1100" />
        <meta property="og:image:height" content="576" />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.variable} ${unbounded.variable} bg-white text-black min-h-screen`} suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2MQFRMEMPT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2MQFRMEMPT');
          `}
        </Script>
        <Analytics />
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
