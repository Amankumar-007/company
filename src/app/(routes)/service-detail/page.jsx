import React from 'react';
import { getServiceById } from '@/data/services';
import { notFound } from 'next/navigation';
import ServiceDetailsClient from './ServiceDetailsClient';

export async function generateMetadata({ searchParams }) {
  const resolvedParams = await searchParams;
  const id = resolvedParams?.id || 'web-development';
  const service = getServiceById(id);

  if (!service) {
    return {
      title: { absolute: 'Service Not Found | Twofloww Digital Agency' },
    };
  }

  const BASE_URL = 'https://www.twofloww.in';
  return {
    title: { absolute: `${service.title} – ${service.subtitle} | Twofloww` },
    description: service.heroDescription || service.overview?.description,
    alternates: {
      canonical: `${BASE_URL}/service-detail?id=${id}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: `${BASE_URL}/service-detail?id=${id}`,
      siteName: 'Twofloww Digital Agency',
      title: `${service.title} – ${service.subtitle} | Twofloww`,
      description: service.heroDescription || service.overview?.description,
      images: [
        {
          url: `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: service.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Twofloww`,
      description: service.heroDescription || service.overview?.description,
      images: ['/opengraph-image'],
    },
  };
}

export default async function ServiceDetailsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const id = resolvedParams?.id || 'web-development';
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  const BASE_URL = 'https://www.twofloww.in';

  // Dynamic JSON-LD structured data for the service
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.heroDescription || service.overview?.description,
    provider: {
      '@type': 'Organization',
      name: 'Twofloww',
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: service.pricing?.[0]?.price?.replace(/[^0-9]/g, '') || '1999',
      highPrice: service.pricing?.[2]?.price?.replace(/[^0-9]/g, '') || '12999',
      offerCount: service.pricing?.length || '3',
    },
    areaServed: 'IN',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.whatWeProvide?.map((item, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: item.title,
          description: item.description,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${BASE_URL}/service-detail?id=${id}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema]) }}
      />
      <ServiceDetailsClient service={service} />
    </>
  );
}
