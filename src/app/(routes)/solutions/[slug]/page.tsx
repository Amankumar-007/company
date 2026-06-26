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
      title: 'Solution Not Found',
    };
  }

  return {
    title: solution.seo.title,
    description: solution.seo.description,
    keywords: solution.seo.keywords,
    openGraph: {
      title: solution.seo.ogTitle || solution.seo.title,
      description: solution.seo.ogDescription || solution.seo.description,
      type: 'website',
      url: `https://twofloww.in/solutions/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: solution.seo.ogTitle || solution.seo.title,
      description: solution.seo.ogDescription || solution.seo.description,
    },
    alternates: {
      canonical: `https://twofloww.in/solutions/${slug}`,
    }
  };
}

export default async function SolutionPage({ params }) {
  const { slug } = await params;
  const solution = solutionsData.find((s) => s.slug === slug);

  if (!solution) {
    notFound();
  }

  // Cast solution data to expected type for TypeScript/ESLint safety
  const safeSolution = {
    id: solution.id,
    slug: solution.slug,
    title: solution.title,
    description: solution.description,
    icon: solution.icon,
    color: solution.color,
    features: solution.features,
    benefits: solution.benefits,
    stats: solution.stats,
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: solution.title,
    description: solution.description,
    provider: {
      '@type': 'Organization',
      name: 'Twofloww',
      url: 'https://www.twofloww.in'
    },
    url: `https://www.twofloww.in/solutions/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SolutionDetailClient solution={safeSolution} />
    </>
  );
}
