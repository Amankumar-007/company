import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { servicePages, getServicePage } from '@/data/service-pages';

const BASE_URL = 'https://www.twofloww.in';


export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return { title: { absolute: 'Not Found | Twofloww' } };
  const url = `${BASE_URL}/services/${page.slug}`;
  return {
    title: { absolute: page.seo.title },
    description: page.seo.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: 'Twofloww',
      url,
      title: page.seo.title,
      description: page.seo.description,
      images: [{ url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: page.seo.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seo.title,
      description: page.seo.description,
      images: [`${BASE_URL}/opengraph-image`],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();
  return <ServicePageTemplate page={page} />;
}
