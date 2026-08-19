import Link from 'next/link';
import { getProjectBySlug, getAllProjects } from '@/data/projects';
import { industries } from '@/data/industries';
import { notFound } from 'next/navigation';
import ProjectDetailsClient from '../../project-detail/ProjectDetailsClient';

const BASE_URL = 'https://www.twofloww.in';

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: { absolute: 'Case Study Not Found | Twofloww' } };
  }

  const title = `${project.title} Case Study – ${project.subtitle} | Twofloww`;
  const description = project.description || project.subtitle;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${BASE_URL}/case-studies/${slug}`,
    },
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
    openGraph: {
      type: 'article',
      locale: 'en_IN',
      url: `${BASE_URL}/case-studies/${slug}`,
      siteName: 'Twofloww Digital Agency',
      title,
      description,
      images: [
        {
          url: project.image || `${BASE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.title} case study`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.image || `${BASE_URL}/opengraph-image`],
      creator: '@twofloww',
      site: '@twofloww',
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const relatedIndustry = industries.find((i) => i.caseStudySlug === slug);

  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${project.title} Case Study`,
    headline: `${project.title} – ${project.subtitle}`,
    description: project.description,
    about: project.technologies?.map((tech) => tech.name),
    creator: {
      '@type': 'Organization',
      name: 'Twofloww',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Twofloww',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: `${BASE_URL}/case-studies/${slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${BASE_URL}/case-studies` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${BASE_URL}/case-studies/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([caseStudySchema, breadcrumbSchema]) }}
      />
      <ProjectDetailsClient project={project} />
      {relatedIndustry && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 text-center">
          <Link
            href={`/industries/${relatedIndustry.slug}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 underline underline-offset-4"
          >
            See more {relatedIndustry.name} projects we build →
          </Link>
        </div>
      )}
    </>
  );
}
