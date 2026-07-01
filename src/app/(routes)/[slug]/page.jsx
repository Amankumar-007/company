import { notFound } from 'next/navigation';
import { getSeoTarget } from '@/data/seo-locations';
import SeoLandingHero from '@/components/SeoLandingHero';
import SeoContent from '@/components/SeoContent';
import FAQ from '@/components/Faq';
import {
  getLocationBySlug,
  getAllLocations,
  getAllServices,
  generateTitle,
  generateDescription,
  generateH1,
  generateIntro,
  generateFAQs,
} from '@/lib/seoTemplates';
import { generateLocalBusinessSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import locationsData from '@/data/locations-data.json';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const BASE_URL = 'https://www.twofloww.in';
const OLD_LOC_PREFIX = 'web-development-company-';

// Pre-generate every location page at build time (SSG)
export async function generateStaticParams() {
  const locations = getAllLocations();
  const services = getAllServices();
  
  const params = [];
  
  // Generate old format for backward compatibility
  locations.forEach(loc => {
    params.push({ slug: `${OLD_LOC_PREFIX}${loc.slug}` });
  });

  // Generate new SEO optimized format: /[service]-agency-in-[location]
  locations.forEach(loc => {
    services.forEach(service => {
      params.push({ slug: `${service.key}-agency-in-${loc.slug}` });
    });
  });

  return params;
}

function parseSlug(slug) {
  // 1. Check old format
  if (slug.startsWith(OLD_LOC_PREFIX)) {
    const locationSlug = slug.slice(OLD_LOC_PREFIX.length);
    const loc = getLocationBySlug(locationSlug);
    const service = getAllServices().find(s => s.key === 'web-development');
    if (loc && service) return { loc, service };
  }

  // 2. Check new format: [service]-agency-in-[location]
  const match = slug.match(/^(.+)-agency-in-(.+)$/);
  if (match) {
    const serviceKey = match[1];
    const locationSlug = match[2];
    const loc = getLocationBySlug(locationSlug);
    const service = getAllServices().find(s => s.key === serviceKey);
    if (loc && service) return { loc, service };
  }

  return null;
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // ── New Location + Service company pages ─────────────────────────────────
  const parsed = parseSlug(slug);
  if (parsed) {
    const { loc, service } = parsed;
    const title = generateTitle(loc, service.label);
    const description = generateDescription(loc, service.label);

    return {
      title,
      description,
      alternates: { canonical: `${BASE_URL}/${slug}` },
      openGraph: {
        title,
        description,
        url: `${BASE_URL}/${slug}`,
        type: 'website',
        locale: 'en_IN',
        siteName: 'Twofloww Digital Agency',
        images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/opengraph-image'],
        creator: '@twofloww',
      },
    };
  }

  // ── Existing SEO target pages (best-*-in-*) ──────────────────────────────
  const target = getSeoTarget(slug);
  if (!target) return { title: 'Not Found | Twofloww' };

  const { location, serviceName } = target;
  return {
    title: `Best ${serviceName} in ${location.name} | TwoFloww`,
    description: `Looking for the best ${serviceName} in ${location.name}? TwoFloww is the top-rated agency providing cutting-edge digital solutions tailored for your business in ${location.name}${location.state ? `, ${location.state}` : ''}.`,
    alternates: { canonical: `${BASE_URL}/${slug}` },
    openGraph: {
      title: `Top ${serviceName} Agency in ${location.name}`,
      description: `Elevate your business with expert ${serviceName} in ${location.name}. Partner with TwoFloww today.`,
      url: `${BASE_URL}/${slug}`,
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function SeoPage({ params }) {
  const { slug } = await params;

  // ── New Location + Service company pages ─────────────────────────────────
  const parsed = parseSlug(slug);
  if (parsed) {
    const { loc, service } = parsed;

    const faqs = generateFAQs(loc, service.label);
    const jsonLd = [
      generateLocalBusinessSchema(loc, locationsData.brand),
      generateFAQSchema(faqs),
      generateBreadcrumbSchema(loc),
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
          serviceLabel={service.label}
          h1={generateH1(loc, service.label)}
          intro={generateIntro(loc, service.label)}
          faqs={faqs}
        />
      </>
    );
  }

  // ── Existing SEO target pages (best-*-in-*) ──────────────────────────────
  const target = getSeoTarget(slug);
  if (!target) notFound();

  const { location, serviceName } = target;

  return (
    <div className="min-h-screen bg-white">
      <SeoLandingHero location={location} serviceName={serviceName} />
      <SeoContent location={location} serviceName={serviceName} />
      <FAQ />
    </div>
  );
}
