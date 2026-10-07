import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';
import { servicePages } from '@/data/service-pages';

const BASE_URL = 'https://www.twofloww.in';

export const metadata: Metadata = {
  title: 'Web Development, App & SEO Services in India',
  description:
    'Twofloww offers web development, mobile app development, ecommerce, UI/UX design, SEO and digital marketing services from Noida, India. 50+ projects. Free consultation.',
  alternates: { canonical: `${BASE_URL}/services` },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Twofloww',
    title: 'Web Development, App & SEO Services in India | Twofloww',
    description:
      'Web development, mobile apps, ecommerce, UI/UX design, SEO and digital marketing from Noida, India. 50+ projects. Free consultation.',
    url: `${BASE_URL}/services`,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Twofloww services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development, App & SEO Services in India | Twofloww',
    description:
      'Web development, mobile apps, ecommerce, UI/UX design, SEO and digital marketing from Noida, India. 50+ projects. Free consultation.',
    images: ['/opengraph-image'],
    creator: '@twofloww',
    site: '@twofloww',
  },
};

// Schema lives on this page (not a layout) so it doesn't also wrap /services/[slug]
const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Twofloww Services',
  url: `${BASE_URL}/services`,
  itemListElement: servicePages.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: p.name,
      description: p.seo.description,
      provider: { '@type': 'Organization', name: 'Twofloww', url: BASE_URL },
      url: `${BASE_URL}/services/${p.slug}`,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <ServicesClient />
    </>
  );
}
