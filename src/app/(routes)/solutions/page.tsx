import SolutionsClient from './SolutionsClient';
import { solutionsData } from '@/data/solutions';

const BASE_URL = 'https://www.twofloww.in';

export const metadata = {
  title: 'On-Demand App & Software Development Solutions',
  description:
    'Twofloww is India\'s top on-demand app development company. We build food delivery apps, taxi booking platforms, grocery delivery, fitness apps, FinTech, AI automation, enterprise digital transformation & e-commerce solutions. Free consultation. Serving Delhi NCR, Mumbai, Bangalore, USA, UK, UAE, Canada & Australia.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'On-Demand App & Software Development Solutions | Twofloww',
    description:
      'India\'s leading on-demand app development company. Food delivery, taxi, grocery, fintech, AI & enterprise solutions. 50+ apps shipped. Free consultation.',
    type: 'website',
    url: `${BASE_URL}/solutions`,
    locale: 'en_IN',
    siteName: 'Twofloww',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Twofloww – On-Demand App Development Solutions India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'On-Demand App & Software Development Solutions | Twofloww',
    description:
      'India\'s leading on-demand app development company. Food delivery, taxi, grocery, fintech, AI & enterprise solutions. 50+ apps shipped.',
    images: ['/opengraph-image'],
    creator: '@twofloww',
    site: '@twofloww',
  },
  alternates: {
    canonical: `${BASE_URL}/solutions`,
  },
};

export default function SolutionsPage() {
  // Build ItemList JSON-LD so Google can index every solution detail page
  // as a rich result directly from this hub page.
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'On-Demand App & Software Development Solutions by Twofloww',
    description:
      'Complete list of digital product solutions offered by Twofloww — India\'s leading on-demand app development company.',
    url: `${BASE_URL}/solutions`,
    numberOfItems: solutionsData.length,
    itemListElement: solutionsData.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
        url: `${BASE_URL}/solutions/${s.slug}`,
        provider: {
          '@type': 'Organization',
          name: 'Twofloww',
          url: BASE_URL,
        },
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${BASE_URL}/solutions` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SolutionsClient />
    </>
  );
}

