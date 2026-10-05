import Link from 'next/link';
import { getAllIndustries } from '@/data/industries';

const BASE_URL = 'https://www.twofloww.in';

export const metadata = {
  title: { absolute: 'Industries We Build For | Twofloww' },
  description: 'Real estate, healthcare, gaming, entertainment, AI/SaaS, and developer tools — see the real products Twofloww has shipped in each industry.',
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
    description: 'Real products shipped for real estate, healthcare, gaming, entertainment, AI/SaaS, and developer tools.',
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
    description: 'Real products shipped for real estate, healthcare, gaming, entertainment, AI/SaaS, and developer tools.',
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
              <p className="text-gray-900 font-medium mb-3">{industry.tagline}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{industry.summary}</p>
              <div className="flex items-baseline gap-2 text-sm text-gray-500">
                <span className="text-lg font-bold text-gray-900">{industry.heroStat.value}</span>
                <span>{industry.heroStat.label}</span>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-20 max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">How We Approach Industry Projects</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Every industry has its own users, workflows, and edge cases. A property buyer comparing plots, a patient booking a hospital bed, and a gamer trading an account all expect different things from the product in front of them. Before we write code, we map who uses the platform, what they need to get done, and where existing tools let them down.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            From there we design and build in short, reviewable milestones — usually on Next.js, React, and Node.js — so you can see working software early and steer it as we go. Performance, mobile responsiveness, and search visibility are built in from day one rather than bolted on before launch.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Don&apos;t see your industry listed? The patterns behind these products — marketplaces, booking systems, dashboards, and content platforms — carry over well. <Link href="/contact" className="underline hover:text-black">Tell us what you&apos;re building</Link> and we&apos;ll be upfront about whether we&apos;re the right fit.
          </p>
        </section>
      </div>
    </main>
  );
}
