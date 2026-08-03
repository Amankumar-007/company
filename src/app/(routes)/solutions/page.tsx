import SolutionsClient from './SolutionsClient';
import { solutionsData } from '@/data/solutions';

const BASE_URL = 'https://www.twofloww.in';

export const metadata = {
  title: 'On-Demand App & Software Development Solutions | Twofloww India',
  description:
    'Twofloww is India\'s top on-demand app development company. We build food delivery apps, taxi booking platforms, grocery delivery, fitness apps, FinTech, AI automation, enterprise digital transformation & e-commerce solutions. Free consultation. Serving Delhi NCR, Mumbai, Bangalore, USA, UK, UAE, Canada & Australia.',
  keywords: [
    // Primary intent keywords
    'on demand app development company',
    'on demand app development company in india',
    'on demand app development',
    'on-demand software development company',
    // Food delivery
    'food delivery app development company',
    'food delivery app development',
    'food ordering app development company',
    'on demand food delivery app development',
    'best food delivery app development company',
    'swiggy zomato clone app development',
    'restaurant app development company',
    'multi-vendor food delivery app',
    // Grocery
    'grocery delivery app development',
    'grocery delivery app development company',
    'quick commerce app development',
    'instant delivery app development',
    // Taxi / ride-hailing
    'taxi app development company',
    'cab booking app development',
    'ride hailing app development company',
    'uber clone app development',
    'taxi booking app development',
    // Fitness & health
    'fitness app development company',
    'gym app development company',
    'health tech app development',
    'wellness app development',
    // FinTech
    'fintech app development company',
    'digital wallet app development',
    'payment app development company',
    // AI / enterprise
    'ai app development company india',
    'enterprise digital transformation company',
    'enterprise software development company india',
    'legacy system migration company',
    // E-commerce
    'ecommerce app development company',
    'ecommerce website development company india',
    'shopify development company india',
    // Astrology / social
    'astrology app development company',
    'dating app development company',
    'matrimonial app development',
    'social app development company',
    // Geo-targeted
    'mobile app development company india',
    'mobile app development company delhi ncr',
    'app development company noida',
    'app development company USA',
    'mobile app development UK',
    'app development agency Australia',
    'on demand app development Dubai',
    'food delivery app development UAE',
    'taxi app development Canada',
    'best app development company New York',
    'software development company india',
    // Brand
    'twofloww solutions',
    'twofloww app development',
  ],
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
    title: 'On-Demand App & Software Development Solutions | Twofloww India',
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
    title: 'On-Demand App & Software Development Solutions | Twofloww India',
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

