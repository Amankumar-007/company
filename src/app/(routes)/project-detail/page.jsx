import React from 'react';
import { getProjectById } from '@/data/projects';
import { notFound } from 'next/navigation';
import ProjectDetailsClient from './ProjectDetailsClient';

export async function generateMetadata({ searchParams }) {
  const resolvedParams = await searchParams;
  const id = resolvedParams?.id || '1';
  const project = getProjectById(id);

  if (!project) {
    return {
      title: 'Project Not Found | Twofloww Digital Agency',
    };
  }

  const BASE_URL = 'https://www.twofloww.in';
  return {
    title: `${project.title} – ${project.subtitle || project.description} | Twofloww Portfolio`,
    description: project.description || project.subtitle,
    alternates: {
      canonical: `${BASE_URL}/project-detail?id=${id}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: `${BASE_URL}/project-detail?id=${id}`,
      siteName: 'Twofloww Digital Agency',
      title: `${project.title} – Case Study | Twofloww`,
      description: project.description || project.subtitle,
      images: [
        {
          url: project.image || '/og-image.png',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} – Case Study | Twofloww`,
      description: project.description || project.subtitle,
      images: [project.image || '/og-image.png'],
    },
  };
}

export default async function ProjectDetailsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const id = resolvedParams?.id || '1';
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const BASE_URL = 'https://www.twofloww.in';

  // Dynamic JSON-LD structured data for the Project Case Study / CreativeWork
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description || project.subtitle,
    image: project.image,
    creator: {
      '@type': 'Organization',
      name: 'Twofloww',
      url: BASE_URL,
    },
    about: project.technologies?.map(tech => tech.name),
    publisher: {
      '@type': 'Organization',
      name: 'Twofloww',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <ProjectDetailsClient project={project} />
    </>
  );
}