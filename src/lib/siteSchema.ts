// Site-wide Organization + WebSite JSON-LD.
//
// Google recommends these on the homepage only. They used to be emitted from
// the root layout on every page, where they were serialized twice (as a
// <script> and again in the RSC payload) — ~15KB of repeated markup per page.

const BASE_URL = 'https://www.twofloww.in';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Twofloww',
  alternateName: 'Twofloww Digital Agency',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/brandlogo.png`,
    width: 1024,
    height: 1024,
  },
  sameAs: [
    'https://www.linkedin.com/company/twofloww',
    'https://twitter.com/twofloww',
    'https://www.instagram.com/twofloww',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${BASE_URL}/contact`,
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${BASE_URL}/contact`,
      availableLanguage: ['English'],
      areaServed: ['IN', 'US', 'GB', 'AU', 'CA', 'AE'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressRegion: 'Uttar Pradesh',
    addressLocality: 'Noida',
  },
  description:
    'Digital product and growth agency in India specializing in web development, mobile apps, UI/UX design, SEO, and digital marketing for startups and enterprises.',
  foundingDate: '2023',
  knowsAbout: [
    'Web Development',
    'Next.js Development',
    'React Development',
    'Mobile App Development',
    'UI/UX Design',
    'Search Engine Optimization',
    'E-commerce Development',
    'Custom Software Development',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  // "name" is what Google shows as the site name in search results
  name: 'Twofloww',
  alternateName: 'Twofloww Digital Agency',
  url: BASE_URL,
};
