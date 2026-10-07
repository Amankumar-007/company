import { notFound } from 'next/navigation';
import {
  getLocationBySlug,
  getAllLocations,
  getAllServices,
  generateTitle,
  generateDescription,
} from '@/lib/seoTemplates';
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

  // Only the slugs cross the server→client boundary. The template derives its
  // copy and JSON-LD from the same deterministic generators, so the text isn't
  // serialized a second time into the RSC payload (page-weight / text-to-HTML).
  const { loc, service } = parsed;
  return <LocationPageTemplate locSlug={loc.slug} serviceKey={service.key} />;
}
