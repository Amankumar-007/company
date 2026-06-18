import HomeClient from './HomeClient';

export const metadata = {
  title: 'Twofloww – Premium Digital Agency | Web & Mobile Development',
  description: 'Twofloww is a next-generation digital agency specializing in high-performance web development, mobile apps, UI/UX design, SEO, and cloud scaling. We build digital products that grow your business.',
  alternates: {
    canonical: 'https://www.twofloww.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.twofloww.in',
    siteName: 'Twofloww Digital Agency',
    title: 'Twofloww – Premium Digital Agency | Web & Mobile Development',
    description: 'Next-generation digital agency specializing in high-performance web development, mobile apps, UI/UX design, SEO, and cloud scaling.',
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
    description: 'Next-generation digital agency specializing in high-performance web development, mobile apps, UI/UX design, SEO, and cloud scaling.',
    images: ['/og-image.png'],
    creator: '@twofloww',
    site: '@twofloww',
  },
};

export default function Home() {
  return <HomeClient />;
}
