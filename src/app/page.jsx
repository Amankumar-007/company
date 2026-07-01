import HomeClient from './HomeClient';

const BASE_URL = 'https://www.twofloww.in';

// ── FAQ JSON-LD (matches questions displayed on page) ──────────────────────
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does website development cost in Delhi NCR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Website development cost in Delhi NCR depends on complexity. A standard business website starts from ₹25,000, a custom web application ranges from ₹50,000 to ₹2,00,000, and a full-scale e-commerce or on-demand platform costs ₹2,00,000 to ₹10,00,000+. TwoFloww offers a free consultation and detailed quote tailored to your requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A standard business website takes 2–4 weeks. A custom web application or e-commerce store typically takes 6–12 weeks. On-demand apps (food delivery, taxi booking) take 8–16 weeks depending on features. TwoFloww uses agile methodology, delivering in sprints so you see real progress every week.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you develop food delivery apps like Zomato or Swiggy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TwoFloww specializes in on-demand app development including food delivery apps, grocery delivery apps, taxi booking apps (Uber-like), fitness apps, and more. We deliver complete solutions with a customer app, delivery partner app, restaurant/vendor panel, and a full-featured admin dashboard.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide SEO services in Delhi NCR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TwoFloww offers end-to-end SEO services in Delhi NCR including technical SEO, on-page optimization, local SEO, Google Business Profile management, link building, and content marketing. Most clients see measurable ranking improvements within 3–6 months.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which technologies does TwoFloww use for web development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We use Next.js, React.js, Node.js, TypeScript, MongoDB, PostgreSQL, and Tailwind CSS for web projects. For mobile apps, we use React Native and Flutter. Our stack is chosen for performance, scalability, and long-term SEO advantage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which cities does TwoFloww serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TwoFloww is based in Noida and serves clients across Delhi NCR (Delhi, Noida, Gurgaon, Faridabad, Ghaziabad), and pan-India in Mumbai, Bangalore, Hyderabad, Chennai, and Pune. We also work with clients in the USA, UK, UAE, Canada, and Australia.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you develop mobile apps for both iOS and Android?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TwoFloww develops native iOS and Android apps as well as cross-platform solutions using React Native and Flutter. We handle the full cycle from UI/UX design to App Store and Play Store deployment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide ongoing support and maintenance after launch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every project includes 3 months of free post-launch support covering bug fixes, security patches, and minor updates. We also offer affordable ongoing maintenance packages for long-term performance monitoring, content updates, and feature additions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is the best web agency in Noida?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TwoFloww is a top-rated web agency in Noida, offering website development, mobile app development, UI/UX design, SEO, and digital marketing. Based in Noida, Uttar Pradesh, TwoFloww has delivered 50+ projects and is known for transparent pricing, on-time delivery, and post-launch support.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is the best web agency in Delhi NCR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TwoFloww is a leading web agency in Delhi NCR, serving businesses across Noida, Delhi, Gurugram, Ghaziabad, Faridabad, and Greater Noida. TwoFloww specializes in website development, mobile apps, e-commerce, SEO, and digital marketing, with a free consultation offered before every project.',
      },
    },
  ],
};

// ── LocalBusiness / ProfessionalService JSON-LD ───────────────────────────
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'TwoFloww',
  alternateName: 'TwoFloww Digital Agency',
  image: `${BASE_URL}/opengraph-image`,
  '@id': BASE_URL,
  url: BASE_URL,
  description:
    'TwoFloww is a leading web agency and web development company in Delhi NCR (Noida, Delhi, Gurugram) specializing in website development, mobile app development, food delivery apps, on-demand apps, SEO, and digital marketing.',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.5355,
    longitude: 77.391,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  sameAs: [
    'https://www.linkedin.com/company/twofloww',
    'https://twitter.com/twofloww',
    'https://www.instagram.com/twofloww',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Development & Digital Marketing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development Delhi NCR' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Food Delivery App Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'On-Demand App Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Services Delhi NCR' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UI/UX Design' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-commerce Development' } },
    ],
  },
  areaServed: [
    { '@type': 'City', name: 'Noida' },
    { '@type': 'Place', name: 'Delhi NCR' },
    { '@type': 'City', name: 'Delhi' },
    { '@type': 'City', name: 'Gurgaon' },
    { '@type': 'City', name: 'Faridabad' },
    { '@type': 'City', name: 'Ghaziabad' },
    { '@type': 'City', name: 'Greater Noida' },
    { '@type': 'City', name: 'Mumbai' },
    { '@type': 'City', name: 'Bangalore' },
    { '@type': 'City', name: 'Hyderabad' },
    { '@type': 'City', name: 'Chennai' },
    { '@type': 'City', name: 'Pune' },
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
  ],
};

export const metadata = {
  title: {
    absolute: 'TwoFloww – Web Development Company & Web Agency in Delhi NCR',
  },
  description:
    'TwoFloww is a top web agency and web development company in Delhi NCR (Noida, Delhi, Gurugram). Website development, mobile apps, food delivery apps, on-demand apps, SEO & digital marketing. 50+ projects delivered. Free consultation & wireframe.',
  keywords: [
    // ── Primary geo + service keywords ──────────────────────────
    'web agency in noida',
    'web agency in delhi ncr',
    'web agency in delhi',
    'best web agency in noida',
    'best web agency in delhi ncr',
    'website development',
    'website development company',
    'website development company in delhi ncr',
    'web development company in delhi ncr',
    'web development company in delhi',
    'web development company in noida',
    'web development company in gurgaon',
    'website development company in delhi',
    'website development company in noida',
    'website designing company in delhi',
    'website designing company in noida',
    'web development services in delhi',
    'web development agency in delhi',
    'web development agency in india',
    'best web development company in delhi',
    'best web development company in noida',
    'top web development company delhi ncr',
    // ── Generic high-volume ──────────────────────────────────────
    'web development company',
    'web development services',
    'web development agency',
    'software development company india',
    'custom software development india',
    'it company in noida',
    'it companies in delhi ncr',
    // ── Mobile App ───────────────────────────────────────────────
    'mobile app development company',
    'mobile app development company in delhi',
    'mobile app development company in noida',
    'mobile app development company in india',
    'mobile app development services',
    'android app development company india',
    'ios app development company india',
    'react native app development company',
    'flutter app development company india',
    // ── On-demand & Food Delivery ─────────────────────────────────
    'food delivery app development company',
    'food delivery app development company in india',
    'zomato clone app development',
    'swiggy clone app development',
    'on demand app development company',
    'on demand app development company in india',
    'grocery delivery app development company',
    'taxi booking app development company',
    'uber clone app development india',
    'hyperlocal delivery app development',
    // ── Digital Marketing & SEO ───────────────────────────────────
    'digital marketing agency in delhi',
    'digital marketing agency in noida',
    'digital marketing company in delhi',
    'digital marketing company in india',
    'seo company in delhi',
    'seo company in noida',
    'seo services in delhi',
    'seo services in noida',
    'seo agency delhi ncr',
    'local seo services india',
    'google ads agency delhi',
    'social media marketing agency delhi',
    'content marketing agency india',
    // ── E-commerce ────────────────────────────────────────────────
    'ecommerce website development company',
    'ecommerce development company india',
    'shopify development company india',
    'woocommerce development company india',
    'headless ecommerce development',
    // ── UI/UX ─────────────────────────────────────────────────────
    'ui ux design company india',
    'ui ux design agency delhi',
    'web design company delhi',
    'product design agency india',
    // ── Tech stack ────────────────────────────────────────────────
    'nextjs development company india',
    'react development company india',
    'nodejs development company india',
    // ── Brand ─────────────────────────────────────────────────────
    'TwoFloww',
    'twofloww digital agency',
    'digital agency india',
    'startup digital agency india',
    'affordable web development india',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'TwoFloww',
    title:
      'TwoFloww – Web Development Company & Web Agency in Delhi NCR',
    description:
      'TwoFloww: top web agency & web development company in Delhi NCR (Noida, Delhi, Gurugram). Website development, mobile apps, food delivery & on-demand apps, SEO & digital marketing. 50+ projects. Free consultation.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TwoFloww – Web Development Company & Web Agency in Delhi NCR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'TwoFloww – Web Development Company & Web Agency in Delhi NCR',
    description:
      'TwoFloww: top web agency & web development company in Delhi NCR (Noida, Delhi, Gurugram). Website development, mobile apps, food delivery & on-demand apps, SEO & digital marketing. 50+ projects. Free consultation.',
    images: ['/opengraph-image'],
    creator: '@twofloww',
    site: '@twofloww',
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HomeClient />
    </>
  );
}
