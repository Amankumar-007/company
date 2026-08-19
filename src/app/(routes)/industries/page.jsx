import Link from 'next/link';
import { getAllIndustries } from '@/data/industries';

const BASE_URL = 'https://www.twofloww.in';

export const metadata = {
  title: { absolute: 'Industries We Build For | Twofloww' },
  description: 'Real estate, food delivery & logistics, AI/SaaS, developer tools, and consultation marketplaces — see the real products Twofloww has shipped in each.',
  alternates: {
    canonical: `${BASE_URL}/industries`,
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
    url: `${BASE_URL}/industries`,
    siteName: 'Twofloww Digital Agency',
    title: 'Industries We Build For | Twofloww',
    description: 'Real products shipped for real-estate, delivery & logistics, AI/SaaS, developer tools, and consultation marketplaces.',
    images: [{
      url: `${BASE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: 'Twofloww Industries',
      type: 'image/png',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries We Build For | Twofloww',
    description: 'Real products shipped for real-estate, delivery & logistics, AI/SaaS, developer tools, and consultation marketplaces.',
    images: [`${BASE_URL}/opengraph-image`],
    creator: '@twofloww',
    site: '@twofloww',
  },
};

export default function IndustriesPage() {
  const industries = getAllIndustries();

  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">Industries We Build For</h1>
          <p className="text-xl text-gray-600">
            We don't list industries we haven't actually built for. Every page below is backed by a real, shipped product — click through to the full case study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group border border-gray-200 rounded-2xl p-8 hover:border-gray-900 hover:shadow-lg transition-all"
            >
              <h2 className="text-2xl font-bold mb-2 group-hover:underline">{industry.name}</h2>
              <p className="text-gray-600 mb-4">{industry.tagline}</p>
              <div className="flex items-baseline gap-2 text-sm text-gray-500">
                <span className="text-lg font-bold text-gray-900">{industry.heroStat.value}</span>
                <span>{industry.heroStat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
