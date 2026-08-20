import Link from 'next/link';
import { getAllProjects } from '@/data/projects';
import ProjectDeviceThumbnail from '@/components/ProjectDeviceThumbnail';
import { ArrowUpRight } from 'lucide-react';

const BASE_URL = 'https://www.twofloww.in';

export const metadata = {
  title: { absolute: 'Case Studies – Real Projects Built by Twofloww' },
  description: 'In-depth case studies of real products Twofloww has shipped: AI platforms, real estate marketplaces, entertainment streaming, and developer tools. Challenge, solution, and results for each.',
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
    <main className="min-h-screen bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 max-w-3xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#DE5D26] block mb-2">
            Proven Track Record
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black mb-4 sm:mb-6 tracking-tight">
            Case Studies
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal">
            The challenge, the build, and the measurable results for digital products and platforms we have engineered and launched for real users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/case-studies/${project.slug}`}
              className="group flex flex-col border border-gray-200 rounded-3xl overflow-hidden p-6 sm:p-8 hover:border-gray-900 hover:shadow-2xl transition-all duration-300 bg-white"
            >
              {/* Device Mockup Preview */}
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[16/10] w-full">
                <ProjectDeviceThumbnail
                  desktopImage={project.desktopImage || project.image}
                  mobileImage={project.mobileImage}
                  title={project.title}
                  domain={project.domain || ''}
                  className="w-full h-full"
                />
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#DE5D26]">
                  {project.category}
                </span>
                <span className="inline-flex items-center space-x-1 text-xs font-medium text-gray-500 group-hover:text-black transition-colors">
                  <span>Read Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 group-hover:text-[#DE5D26] transition-colors">
                {project.title}
              </h2>

              <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 border-t border-gray-100">
                {project.metrics?.slice(0, 3).map((metric) => (
                  <div key={metric.label}>
                    <div className="text-xl sm:text-2xl font-black text-black">{metric.value}</div>
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
