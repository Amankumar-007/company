import locationsData from '@/data/locations-data.json';

const { brand, services } = locationsData;

export function getLocationBySlug(slug) {
  return locationsData.locations.find(l => l.slug === slug) || null;
}

export function getAllLocations() {
  return locationsData.locations;
}

export function getAllServices() {
  return services;
}

export function getBrand() {
  return brand;
}

/** "Noida" for cities/regions, "United States" for countries */
function placeName(loc) {
  return loc.type === 'country' ? loc.country : loc.city;
}

/**
 * Deterministic variant picker — same slug always picks same variant across
 * builds (stable for SSG), but different slugs get different phrasing.
 */
function pickVariant(arr, seedStr) {
  const hash = seedStr.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return arr[hash % arr.length];
}

// ─── Title ───────────────────────────────────────────────────────────────────

import locationsData from '@/data/locations-data.json';

const { brand, services } = locationsData;

export function getLocationBySlug(slug) {
  return locationsData.locations.find(l => l.slug === slug) || null;
}

export function getAllLocations() {
  return locationsData.locations;
}

export function getAllServices() {
  return services;
}

export function getBrand() {
  return brand;
}

/** "Noida" for cities/regions, "United States" for countries */
function placeName(loc) {
  return loc.type === 'country' ? loc.country : loc.city;
}

/**
 * Deterministic variant picker — same slug always picks same variant across
 * builds (stable for SSG), but different slugs get different phrasing.
 */
function pickVariant(arr, seedStr) {
  const hash = seedStr.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return arr[hash % arr.length];
}

// ─── Title ───────────────────────────────────────────────────────────────────

export function generateTitle(loc, serviceLabel = 'Web Design & Development') {
  const place = placeName(loc);

  if (loc.is_home_base && serviceLabel === 'Web Development') {
    return `Best Web Development Agency in ${place} | ${brand.name}`;
  }

  const variants = [
    `${serviceLabel} Company in ${place} | ${brand.name}`,
    `Best ${serviceLabel} Agency in ${place} – ${brand.name}`,
    `${place} ${serviceLabel} Experts | ${brand.name}`,
    `Top-Rated ${serviceLabel} Agency in ${place} | Custom Digital Solutions`,
    `${place}'s Premier ${serviceLabel} Specialists – ${brand.name}`,
    `Hire Expert ${serviceLabel} Team in ${place} | ${brand.name}`,
  ];
  return pickVariant(variants, loc.slug + serviceLabel);
}

// ─── Meta description ────────────────────────────────────────────────────────

export function generateDescription(loc, serviceLabel = 'web development') {
  const place = placeName(loc);
  const variants = [
    `Top ${serviceLabel} company in ${place}. ${brand.name} builds fast, secure websites & apps for brands. ${brand.projects_delivered}+ projects delivered. Free consultation.`,
    `${brand.name}: trusted ${serviceLabel} agency in ${place}. We build modern digital products for startups & enterprises that scale. Free strategy call.`,
    `Hire ${serviceLabel} experts in ${place}. Custom Next.js, React & mobile development. 98% client retention. Free quote.`,
    `Premium ${serviceLabel} in ${place}. ${brand.name} delivers high-converting digital experiences with proven architecture. Request proposal.`,
    `Best ${serviceLabel} agency for ${place} businesses. Responsive UI, cloud backends & technical SEO. Talk to our engineers today.`,
  ];
  const desc = pickVariant(variants, loc.slug + serviceLabel + 'd');
  return desc.length > 160 ? desc.slice(0, 157) + '...' : desc;
}

// ─── H1 ──────────────────────────────────────────────────────────────────────

export function generateH1(loc, serviceLabel = 'Web Design & Development Company') {
  const place = placeName(loc);

  if (loc.is_home_base && serviceLabel === 'Web Development') {
    return `Best Web Development Agency in ${place}`;
  }

  const variants = [
    `${serviceLabel} in ${place}`,
    `Trusted ${serviceLabel} Serving ${place} & Surrounding Hubs`,
    `${place}'s Preferred Agency for ${serviceLabel}`,
    `Best-in-Class ${serviceLabel} Solutions in ${place}`,
    `High-Performance ${serviceLabel} Agency in ${place}`,
  ];
  return pickVariant(variants, loc.slug + serviceLabel + 'h');
}

// ─── Intro paragraph ─────────────────────────────────────────────────────────

export function generateIntro(loc, serviceLabel = 'web design and development') {
  const place = placeName(loc);
  const nearby = loc.nearby_areas?.length
    ? ` and fast-growing businesses across ${loc.nearby_areas.join(', ')}`
    : '';

  const variants = [
    `We are a premier ${serviceLabel} agency empowering ambitious brands in ${place}${nearby}. From funded startups to established enterprises, we design and engineer scalable web applications, mobile platforms, and digital experiences engineered to perform, convert, and scale — backed by ${brand.projects_delivered}+ successful launches worldwide.`,
    `${brand.name} collaborates with forward-thinking leaders in ${place}${nearby} to build custom ${serviceLabel} solutions. Our full-stack engineering team combines intuitive UX design with modern frameworks to turn complex business requirements into fast, reliable digital products.`,
    `Serving ${place}${nearby}, ${brand.name} acts as a dedicated technical partner for companies looking to accelerate growth. We blend strategic product thinking with production-grade code to deliver ${serviceLabel} that yields measurable ROI and long-term competitive edge.`,
    `Businesses in ${place}${nearby} rely on ${brand.name} for modern ${serviceLabel}. Whether launching a new web app, refactoring legacy infrastructure, or driving organic search dominance, our multidisciplinary team delivers results on time and on budget.`,
  ];

  return pickVariant(variants, loc.slug + serviceLabel + 'i');
}

// ─── FAQs — four comprehensive, human-written sets ───────────────────────────

export function generateFAQs(loc, serviceLabel = 'web development') {
  const place = placeName(loc);
  const nearbyStr = loc.nearby_areas?.length ? ` as well as nearby areas like ${loc.nearby_areas.join(', ')}` : '';

  const faqSets = [
    [
      {
        q: `Do you provide custom ${serviceLabel} services in ${place}?`,
        a: `Yes. ${brand.name} provides end-to-end ${serviceLabel} services for businesses based in ${place}${nearbyStr}. We work through structured discovery calls, shared project dashboards, and regular milestones so project communication remains clear and seamless.`,
      },
      {
        q: `How much does a ${serviceLabel} project cost for a business in ${place}?`,
        a: `Project pricing is based on technical complexity, feature scope, and target deadline. We provide transparent, itemised proposals following a free 30-minute discovery call so you know exact scope and deliverables with zero hidden costs.`,
      },
      {
        q: `Can you work with our team in ${place} remotely?`,
        a: `Absolutely. We partner with clients across ${place}${nearbyStr} and internationally using Slack, Notion, Jira, and weekly video standups. Geography is never a barrier to fast execution and transparent collaboration.`,
      },
      {
        q: `Do we get full ownership of the source code and IP?`,
        a: `Yes. Upon project completion and final sign-off, 100% of the source code, design assets, and intellectual property rights are fully transferred to your business with zero vendor lock-in.`,
      },
    ],
    [
      {
        q: `What digital stack do you use for ${serviceLabel} in ${place}?`,
        a: `We build using modern, industry-standard technologies like Next.js, React, TypeScript, Node.js, Tailwind CSS, Supabase, PostgreSQL, and Flutter for cross-platform mobile apps. Our stack prioritises speed, security, and long-term scalability.`,
      },
      {
        q: `How long will it take to build and launch our ${place} project?`,
        a: `A standard corporate website or landing experience typically takes 2–4 weeks, while custom SaaS platforms or on-demand applications average 6–12 weeks. Every engagement includes a detailed sprint timeline prior to kickoff.`,
      },
      {
        q: `Do you provide post-launch maintenance and technical support in ${place}?`,
        a: `Yes. We offer ongoing SLA support plans covering security updates, server monitoring, bug fixes, performance optimization, and continuous feature updates so your platform stays secure and fast after launch.`,
      },
      {
        q: `How do you ensure our website or app ranks on search engines in ${place}?`,
        a: `Every platform we build incorporates technical SEO best practices from day one: clean HTML5 semantic markup, dynamic OpenGraph metadata, schema.org JSON-LD, fast Core Web Vitals, and XML sitemaps ready for indexing.`,
      },
    ],
    [
      {
        q: `Why should our ${place} business choose ${brand.name} over other agencies?`,
        a: `We stand out by combining senior technical execution with strategic business consulting. Unlike agencies that just code what you ask, we challenge assumptions, advise on scalable architecture, and optimize for long-term user retention.`,
      },
      {
        q: `Can you revamp or optimize our existing website/app in ${place}?`,
        a: `Yes. We conduct complete technical and UX audits of existing legacy platforms, identifying performance bottlenecks, UI friction, and SEO gaps before implementing clean, modernized code upgrades.`,
      },
      {
        q: `Will our website or application be fully mobile-responsive?`,
        a: `100%. All user interfaces are designed mobile-first and tested rigorously across iOS, Android, tablet, and desktop viewports to ensure smooth interactions for every user in ${place}.`,
      },
      {
        q: `How do we get started with ${brand.name} in ${place}?`,
        a: `Getting started is simple. Book a free 30-minute consultation through our website, or call our team directly. We will review your goals, outline recommended technical approaches, and deliver an itemised proposal.`,
      },
    ],
    [
      {
        q: `What industries in ${place} do you specialize in?`,
        a: `We have delivered digital solutions for e-commerce, real estate, healthcare, logistics, food delivery, fintech, astrology, and ed-tech companies across India and global markets.`,
      },
      {
        q: `Do you handle both frontend UI design and backend cloud development?`,
        a: `Yes. We provide complete full-stack development, covering UX research, Figma prototyping, frontend coding, backend API development, database architecture, and cloud deployment on AWS or Vercel.`,
      },
      {
        q: `How do you handle security and data protection for ${place} clients?`,
        a: `We adhere to enterprise security standards including HTTPS encryption, parameterized database queries, JWT/OAuth authentication, OWASP guidelines, and GDPR/RERA compliance best practices.`,
      },
      {
        q: `What guarantees do you offer for project milestones?`,
        a: `We work on milestone-based release schedules with clear acceptance criteria for each phase. Payment is tied to verified milestone approvals, giving you complete visibility and peace of mind.`,
      },
    ],
  ];

  const hash = (loc.slug + serviceLabel).split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return faqSets[hash % faqSets.length];
}

