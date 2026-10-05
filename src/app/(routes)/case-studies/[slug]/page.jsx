import Link from 'next/link';
import { getProjectBySlug, getAllProjects } from '@/data/projects';
import { industries } from '@/data/industries';
import { notFound } from 'next/navigation';
import ProjectDetailsClient from '../../project-detail/ProjectDetailsClient';

const BASE_URL = 'https://www.twofloww.in';

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

const ACRONYMS = new Set(['AI', 'P2P', 'UI', 'UX', 'B2B', 'B2C', 'SAAS']);

// Project subtitles are ALL-CAPS display copy — title-case them for the <title>.
function toTitleCase(str = '') {
  return str
    .split(' ')
    .map((word) =>
      ACRONYMS.has(word.toUpperCase())
        ? word.toUpperCase()
        : word.toLowerCase().replace(/(^|-)([a-z])/g, (_, sep, ch) => sep + ch.toUpperCase())
    )
    .join(' ');
}

// Keep titles <= 60 chars so Google doesn't truncate them in search results.
function buildCaseStudyTitle(project) {
  const subtitle = toTitleCase(project.subtitle);
  const shortSubtitle = subtitle.split(' & ')[0];
  const candidates = [
    `${project.title} Case Study – ${subtitle} | Twofloww`,
    `${project.title}: ${subtitle} | Twofloww`,
    `${project.title} Case Study – ${shortSubtitle} | Twofloww`,
    `${project.title}: ${shortSubtitle} | Twofloww`,
    `${project.title} Case Study | Twofloww`,
  ];
  return candidates.find((t) => t.length <= 60) || candidates[candidates.length - 1];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: { absolute: 'Case Study Not Found | Twofloww' } };
  }

  const title = buildCaseStudyTitle(project);
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
      <nav aria-label="Related case studies" className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 text-center">
        {relatedIndustry && (
          <Link
            href={`/industries/${relatedIndustry.slug}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 underline underline-offset-4 mb-10"
          >
            See more {relatedIndustry.name} projects we build →
          </Link>
        )}
        <h2 className="text-2xl font-bold mb-6">More case studies</h2>
        <ul className="flex flex-wrap justify-center gap-3">
          {getAllProjects()
            .filter((p) => p.slug !== slug)
            .map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/case-studies/${p.slug}`}
                  className="inline-block px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-black hover:text-black transition-colors"
                >
                  {p.title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}
