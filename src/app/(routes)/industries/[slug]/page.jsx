import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getIndustryBySlug, getAllIndustries } from '@/data/industries';
import { getProjectBySlug } from '@/data/projects';

const BASE_URL = 'https://www.twofloww.in';

export async function generateStaticParams() {
  return getAllIndustries().map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return { title: { absolute: 'Industry Not Found | Twofloww' } };
  }

  const title = `${industry.name} Software Development | Twofloww`;
  const description = `${industry.summary} Free consultation.`.slice(0, 160);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${BASE_URL}/industries/${slug}`,
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
      url: `${BASE_URL}/industries/${slug}`,
      siteName: 'Twofloww Digital Agency',
      title,
      description,
      images: [{
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: title,
        type: 'image/png',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/opengraph-image`],
      creator: '@twofloww',
      site: '@twofloww',
    },
  };
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) notFound();

  const project = getProjectBySlug(industry.caseStudySlug);
  const challenge = project?.caseStudy?.challenge?.content || [];
  const solution = project?.caseStudy?.solution?.content || [];
  const techStack = project?.technologies?.map((t) => t.name) || [];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: `${BASE_URL}/industries` },
      { '@type': 'ListItem', position: 3, name: industry.name, item: `${BASE_URL}/industries/${slug}` },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `${industry.name} Software Development`,
    provider: { '@type': 'Organization', name: 'Twofloww', url: BASE_URL },
    areaServed: 'IN',
    description: industry.summary,
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema]) }}
      />

      <div className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-xs font-medium tracking-wider uppercase text-gray-500">Industries</span>
        <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-6">{industry.name} Software Development</h1>
        <p className="text-xl text-gray-600 leading-relaxed">{industry.summary}</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-8">
        <Link
          href={`/case-studies/${industry.caseStudySlug}`}
          className="flex items-center justify-between gap-4 bg-gray-50 rounded-2xl p-6 sm:p-8 hover:bg-gray-100 transition-colors group"
        >
          <div>
            <div className="text-sm text-gray-500 mb-1">Case study</div>
            <div className="text-xl font-bold group-hover:underline">{industry.caseStudyName}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{industry.heroStat.value}</div>
            <div className="text-sm text-gray-500">{industry.heroStat.label}</div>
          </div>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">What We Build</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {industry.whatWeBuild.map((item) => (
            <div key={item.title} className="border-l-4 border-gray-300 pl-6">
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {(challenge.length > 0 || solution.length > 0) && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-8">How We Built {industry.caseStudyName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {challenge.length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-4">The challenge</h3>
                {challenge.map((p) => (
                  <p key={p} className="text-gray-600 mb-3 leading-relaxed">{p}</p>
                ))}
              </section>
            )}
            {solution.length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-4">Our solution</h3>
                {solution.map((p) => (
                  <p key={p} className="text-gray-600 mb-3 leading-relaxed">{p}</p>
                ))}
              </section>
            )}
          </div>
          {techStack.length > 0 && (
            <p className="text-gray-600 mt-8">
              <strong className="text-gray-900">Tech stack:</strong> {techStack.join(', ')}.
            </p>
          )}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-12 bg-gray-50 rounded-2xl mb-16">
        <h2 className="text-2xl font-bold mb-6">Common Requests We Get in {industry.name}</h2>
        <ul className="space-y-3">
          {industry.commonAsks.map((ask) => (
            <li key={ask} className="flex items-start gap-3 text-gray-700">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2.5 flex-shrink-0" />
              <span>{ask}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Have a {industry.name.toLowerCase()} project in mind?</h2>
        <p className="text-gray-600 mb-8">Book a free consultation and we'll walk through what building it would actually take.</p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
        >
          Book a Free Consultation
        </Link>
      </div>

      <nav aria-label="Other industries" className="max-w-4xl mx-auto px-6 pb-24 border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-bold mb-6">Other industries we build for</h2>
        <ul className="flex flex-wrap gap-3">
          {getAllIndustries()
            .filter((i) => i.slug !== industry.slug)
            .map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="inline-block px-5 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
                >
                  {i.name}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </main>
  );
}
