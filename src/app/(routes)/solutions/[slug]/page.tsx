import { notFound } from 'next/navigation';
import { solutionsData } from '@/data/solutions';
import SolutionDetailClient from './SolutionDetailClient';
import * as React from 'react';

export function generateStaticParams() {
  return solutionsData.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const solution = solutionsData.find((s) => s.slug === slug);
  
  if (!solution) {
    return {
      title: { absolute: 'Solution Not Found | Twofloww' },
    };
  }

  return {
    // solution.seo.title already includes "| Twofloww" — use `absolute` so
    // the root layout's title template doesn't append the brand again.
    title: { absolute: solution.seo.title },
    description: solution.seo.description,
    keywords: solution.seo.keywords,
    openGraph: {
      title: solution.seo.ogTitle || solution.seo.title,
      description: solution.seo.ogDescription || solution.seo.description,
      type: 'website',
      url: `https://www.twofloww.in/solutions/${slug}`,
      locale: 'en_IN',
      siteName: 'Twofloww',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: solution.seo.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: solution.seo.ogTitle || solution.seo.title,
      description: solution.seo.ogDescription || solution.seo.description,
      images: ['/opengraph-image'],
      creator: '@twofloww',
      site: '@twofloww',
    },
    alternates: {
      canonical: `https://www.twofloww.in/solutions/${slug}`,
    }
  };
}

export default async function SolutionPage({ params }) {
  const { slug } = await params;
  const solution = solutionsData.find((s) => s.slug === slug);

  if (!solution) {
    notFound();
  }

  const safeSolution = {
    id: solution.id,
    slug: solution.slug,
    title: solution.title,
    description: solution.description,
    longDescription: solution.longDescription,
    icon: solution.icon,
    color: solution.color,
    features: solution.features,
    benefits: solution.benefits,
    stats: solution.stats,
    process: solution.process,
    techStack: solution.techStack,
    faq: solution.faq,
  };

  const BASE_URL = 'https://www.twofloww.in';

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: solution.title,
    description: solution.longDescription || solution.description,
    serviceType: solution.title,
    provider: {
      '@type': 'Organization',
      name: 'Twofloww',
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      sameAs: [
        'https://www.linkedin.com/company/twofloww',
        'https://twitter.com/twofloww',
        'https://www.instagram.com/twofloww',
      ],
    },
    url: `${BASE_URL}/solutions/${slug}`,
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Place', name: 'Delhi NCR' },
      { '@type': 'City', name: 'Noida' },
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Bangalore' },
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Businesses, Startups, Enterprises',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: 'Free consultation available. Contact us for a custom quote.',
      url: `${BASE_URL}/contact`,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Twofloww',
        url: BASE_URL,
      },
    },
    ...(solution.features && solution.features.length > 0
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${solution.title} Features`,
            itemListElement: solution.features.map((feature, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: feature,
            })),
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${BASE_URL}/solutions` },
      { '@type': 'ListItem', position: 3, name: solution.title, item: `${BASE_URL}/solutions/${slug}` },
    ],
  };

  const faqJsonLd = solution.faq && solution.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: solution.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <SolutionDetailClient solution={safeSolution} />
    </>
  );
}
