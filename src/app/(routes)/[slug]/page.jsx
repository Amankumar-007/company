import { notFound } from 'next/navigation';
import {
  getLocationBySlug,
  getAllLocations,
  getAllServices,
  generateTitle,
  generateDescription,
  generateH1,
  generateIntro,
  generateFAQs,
  generateLocalContext,
} from '@/lib/seoTemplates';
import { generateLocalBusinessSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { getLocationServiceContent } from '@/data/location-service-content';
import locationsData from '@/data/locations-data.json';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const BASE_URL = 'https://www.twofloww.in';

// Legacy URL shapes — `web-development-company-{loc}` and `best-{service}-in-{loc}` —
// are 301-redirected to `{service}-agency-in-{loc}` in next.config.ts. They used
// to render duplicate pages here, which Semrush/Google flagged as duplicate content.

// Pre-generate every location × service page at build time (SSG)
export async function generateStaticParams() {
  const services = getAllServices();
  return getAllLocations().flatMap((loc) =>
    services.map((service) => ({ slug: `${service.key}-agency-in-${loc.slug}` }))
  );
}

function parseSlug(slug) {
  // Format: [service]-agency-in-[location]
  const match = slug.match(/^(.+)-agency-in-(.+)$/);
  if (!match) return null;
  const loc = getLocationBySlug(match[2]);
  const service = getAllServices().find((s) => s.key === match[1]);
  return loc && service ? { loc, service } : null;
}

// Location FAQs + service-specific FAQs, shared by the page and its FAQPage schema
function buildFaqs(loc, service) {
  const place = loc.type === 'country' ? loc.country : loc.city;
  const serviceFaqs = getLocationServiceContent(service.key).faqs(place);
  return [...serviceFaqs, ...generateFAQs(loc, service.label)];
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: { absolute: 'Not Found | Twofloww' } };

  const { loc, service } = parsed;
  const title = generateTitle(loc, service.label);
  const description = generateDescription(loc, service.label);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${BASE_URL}/${slug}` },
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
      title,
      description,
      url: `${BASE_URL}/${slug}`,
      type: 'website',
      locale: 'en_IN',
      siteName: 'Twofloww Digital Agency',
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

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function SeoPage({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { loc, service } = parsed;
  const faqs = buildFaqs(loc, service);
  const jsonLd = [
    generateLocalBusinessSchema(loc, locationsData.brand),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(loc, service),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <LocationPageTemplate
        loc={loc}
        serviceKey={service.key}
        serviceLabel={service.label}
        h1={generateH1(loc, service.label)}
        intro={generateIntro(loc, service.label)}
        faqs={faqs}
        localContext={generateLocalContext(loc)}
      />
    </>
  );
}
