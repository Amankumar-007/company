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

  // Flagship page (home base + core service) — deterministic exact-match
  // title for high-intent searches like "best web development agency in noida",
  // rather than leaving it to chance via the hashed variant picker below.
  if (loc.is_home_base && serviceLabel === 'Web Development') {
    return `Best Web Development Agency in ${place} | ${brand.name}`;
  }

  // Mix branded and unbranded phrasing so hundreds of programmatic pages
  // don't all carry an identical "| Brand" suffix.
  const variants = [
    `${serviceLabel} Company in ${place} | ${brand.name}`,
    `Best ${serviceLabel} Agency in ${place} – ${brand.name}`,
    `${place} ${serviceLabel} Experts | ${brand.name}`,
    `Top-Rated ${serviceLabel} Agency in ${place}`,
    `${place}'s ${serviceLabel} Specialists`,
    `Hire a ${serviceLabel} Team in ${place}`,
  ];
  return pickVariant(variants, loc.slug + serviceLabel);
}

// ─── Meta description ────────────────────────────────────────────────────────

export function generateDescription(loc, serviceLabel = 'web development') {
  const place = placeName(loc);
  const variants = [
    `Looking for a ${serviceLabel} company in ${place}? ${brand.name} builds fast, scalable websites & apps for ${place} businesses. ${brand.projects_delivered} projects delivered — get a free consultation.`,
    `${brand.name} is a trusted ${serviceLabel} agency in ${place}, helping startups & enterprises grow online. Get a free quote today.`,
    `Hire a reliable ${serviceLabel} team in ${place}. ${brand.name} delivers responsive, secure, high-performing digital solutions. Free 30-min consultation.`,
    `Need ${serviceLabel} in ${place}? We build fast, scalable websites and apps, backed by ${brand.projects_delivered} projects delivered across ${brand.countries_served} countries. Book a free consultation.`,
    `Top-rated ${serviceLabel} for ${place} businesses — clean code, responsive design, and measurable growth. Free 30-minute consultation, no obligation.`,
  ];
  return pickVariant(variants, loc.slug + serviceLabel + 'd').slice(0, 160);
}

// ─── H1 ──────────────────────────────────────────────────────────────────────

export function generateH1(loc, serviceLabel = 'Web Design & Development Company') {
  const place = placeName(loc);

  if (loc.is_home_base && serviceLabel === 'Web Development') {
    return `Best Web Development Agency in ${place}`;
  }

  const variants = [
    `${serviceLabel} in ${place}`,
    `Trusted ${serviceLabel} Serving ${place} & Nearby Areas`,
    `${place}'s Partner for ${serviceLabel}`,
    `Best ${serviceLabel} in ${place}`,
  ];
  return pickVariant(variants, loc.slug + serviceLabel + 'h');
}

// ─── Intro paragraph ─────────────────────────────────────────────────────────

export function generateIntro(loc, serviceLabel = 'web design and development') {
  const place = placeName(loc);
  const nearby = loc.nearby_areas?.length
    ? ` and businesses across ${loc.nearby_areas.join(', ')}`
    : '';

  const variants = [
    `We are a top-tier ${serviceLabel} agency serving ${place}${nearby}. From startups to enterprises, we build scalable digital solutions built to perform, scale, and grow — backed by ${brand.projects_delivered} projects delivered across ${brand.countries_served} countries.`,
    `${brand.name} partners with businesses in ${place}${nearby} to deliver world-class ${serviceLabel} services. Our team has the expertise to bring your vision to life with precision and creativity.`,
    `Serving ${place}${nearby}, ${brand.name} is the digital growth partner for ambitious businesses. We combine strategic thinking with technical excellence to deliver ${serviceLabel} that drives measurable results.`,
  ];

  return pickVariant(variants, loc.slug + serviceLabel + 'i');
}

// ─── FAQs — two full sets, picked per-slug ────────────────────────────────────

export function generateFAQs(loc, serviceLabel = 'web development') {
  const place = placeName(loc);
  const nearbyStr = loc.nearby_areas?.length ? ` and nearby areas like ${loc.nearby_areas.join(', ')}` : '';

  const faqSets = [
    [
      {
        q: `Do you provide ${serviceLabel} services in ${place}?`,
        a: `Yes. ${brand.name} provides professional ${serviceLabel} services to businesses in ${place}${nearbyStr}. We work with clients remotely and can accommodate ${place}-based timezone needs with ease.`,
      },
      {
        q: `How much does it cost to hire an agency in ${place}?`,
        a: `Cost depends on scope, features, and platform requirements. We offer a free scoping call to give you a transparent, itemised quote tailored to your specific ${serviceLabel} needs.`,
      },
      {
        q: `Can you work with ${place} clients remotely?`,
        a: `Absolutely. We serve clients across ${place}${nearbyStr} and internationally — using dedicated project tracking, regular video calls, and milestone-based delivery so geography is never a bottleneck.`,
      },
      {
        q: `Do you offer ongoing support after launch?`,
        a: `Yes. Bug fixes, security patches, performance optimisation, and content updates are all available via post-launch support plans. ${place} clients get a dedicated point of contact so you're never chasing someone for help.`,
      },
    ],
    [
      {
        q: `What digital services does ${brand.name} offer in ${place}?`,
        a: `We offer specialized ${serviceLabel} solutions alongside a suite of digital services for businesses in ${place}. Every engagement is scoped to your specific goals and market demands.`,
      },
      {
        q: `How long does a typical project take for a ${place} business?`,
        a: `Timelines vary by scope. A standard project takes 2–4 weeks; a custom or complex platform typically takes 6–12 weeks. You'll get a detailed milestone plan during your free discovery call.`,
      },
      {
        q: `Do you have experience working with ${place}-based businesses?`,
        a: `Yes. We have delivered ${brand.projects_delivered} projects for businesses across India and internationally, including clients in ${place}. We understand both local market dynamics and global product standards.`,
      },
      {
        q: `What makes ${brand.name} different from other agencies in ${place}?`,
        a: `We combine technical depth with strategic design thinking. Unlike agencies that only build what you specify, we actively consult on architecture, performance, and SEO — so every product is built to grow, not just to launch.`,
      },
    ],
  ];

  const hash = (loc.slug + serviceLabel).split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return faqSets[hash % faqSets.length];
}
