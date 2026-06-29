import HomeClient from './HomeClient';

export const metadata = {
  title: {
    absolute: 'TwoFloww – Web Development Company Delhi NCR',
  },
  description: 'TwoFloww is a top web development company in Delhi NCR. Websites, mobile apps, food delivery & taxi apps, SEO & digital marketing. 150+ projects. Free consultation.',
  keywords: [
    'web development company',
    'website development company',
    'web development company in delhi',
    'web development company in noida',
    'web development services',
    'web development agency',
    'digital marketing agency in delhi',
    'mobile app development services',
    'food delivery app development company',
    'on demand app development company',
    'best web development company in delhi',
    'TwoFloww',
  ],
  alternates: {
    canonical: 'https://www.twofloww.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.twofloww.in',
    siteName: 'TwoFloww',
    title: 'TwoFloww – Web Development Company Delhi NCR',
    description: 'TwoFloww: web development company Delhi NCR. Websites, mobile apps, food delivery & on-demand apps, SEO. 150+ projects. Free consultation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TwoFloww – Web Development Company Delhi NCR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TwoFloww – Web Development Company Delhi NCR',
    description: 'TwoFloww: web development company Delhi NCR. Websites, mobile apps, food delivery & on-demand apps, SEO. 150+ projects. Free consultation.',
    images: ['/og-image.png'],
    creator: '@twofloww',
    site: '@twofloww',
  },
};

export default function Home() {
  return <HomeClient />;
}
