import Link from 'next/link';
import { getAllProjects } from '@/data/projects';

const BASE_URL = 'https://www.twofloww.in';

export const metadata = {
  title: { absolute: 'Case Studies – Real Projects Built by Twofloww' },
  description: 'In-depth case studies of real products Twofloww has shipped: AI platforms, real estate marketplaces, on-demand delivery, and developer tools. Challenge, solution, and results for each.',
  alternates: {
    canonical: `${BASE_URL}/case-studies`,
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
    type: 'website',
    locale: 'en_IN',
    url: `${BASE_URL}/case-studies`,
    siteName: 'Twofloww Digital Agency',
    title: 'Case Studies – Real Projects Built by Twofloww',
    description: 'Challenge, solution, and results from real products Twofloww has shipped.',
    images: [{
      url: `${BASE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: 'Twofloww Case Studies',
      type: 'image/png',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies – Real Projects Built by Twofloww',
    description: 'Challenge, solution, and results from real products Twofloww has shipped.',
    images: [`${BASE_URL}/opengraph-image`],
    creator: '@twofloww',
    site: '@twofloww',
  },
};

export default function CaseStudiesPage() {
  const projects = getAllProjects();

  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">Case Studies</h1>
          <p className="text-xl text-gray-600">
            The challenge, the build, and the results — for products we've actually shipped and put in front of real users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/case-studies/${project.slug}`}
              className="group border border-gray-200 rounded-2xl p-8 hover:border-gray-900 hover:shadow-lg transition-all"
            >
              <span className="text-xs font-medium tracking-wider uppercase text-gray-500">
                {project.category}
              </span>
              <h2 className="text-2xl font-bold mt-2 mb-3 group-hover:underline">
                {project.title}
              </h2>
              <p className="text-gray-600 mb-6">{project.description}</p>
              <div className="flex gap-6">
                {project.metrics?.slice(0, 3).map((metric) => (
                  <div key={metric.label}>
                    <div className="text-xl font-bold">{metric.value}</div>
                    <div className="text-xs text-gray-500">{metric.label}</div>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
