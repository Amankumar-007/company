# Programmatic Location Pages — Build Spec (Next.js)

**Goal:** One template + one data file → auto-generates a unique, SEO-indexable page for every city/country you serve (e.g. `/web-development-company-noida`, `/web-development-company-united-states`), each ranking for "[service] company in [city]" searches.

**Important:** This is NOT "detect IP → show different content on one URL." Google needs a separate crawlable URL per location to rank you for each city's search. Static generation (SSG) gives you that — fast, unique, indexable pages, built once at deploy time. IP-based personalization can be layered on top later as a UX nicety (e.g. a banner), never as a replacement for this.

---

## 1. Architecture

```
data/
  locations-data.json        ← raw facts per city/country (provided separately)
lib/
  seoTemplates.js            ← functions that GENERATE title/desc/H1/FAQ copy from the data
  schema.js                  ← functions that generate JSON-LD structured data
app/
  [locationSlug]/
    page.tsx                 ← dynamic route: generateStaticParams + generateMetadata
  sitemap.ts                 ← auto-includes every location slug
components/
  LocationPageTemplate.tsx   ← the shared visual template, takes `data` as props
```

Why generate copy from a function instead of hardcoding it in the JSON: if you ever want to change the title formula site-wide, you edit **one function**, not 28+ JSON entries. The JSON only stores facts (city name, state, nearby areas, coordinates).

---

## 2. `lib/seoTemplates.js`

```js
// lib/seoTemplates.js
import locationsData from '@/data/locations-data.json';

const { brand, services } = locationsData;

export function getLocationBySlug(slug) {
  return locationsData.locations.find(l => l.slug === slug);
}

export function getAllLocations() {
  return locationsData.locations;
}

function placeName(loc) {
  return loc.type === 'city' ? loc.city : loc.country;
}

// Rotate between a few phrasings so pages don't read as pure find/replace.
// Pick variant deterministically by slug so it's stable across builds, not random.
function pickVariant(arr, seedStr) {
  const hash = seedStr.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return arr[hash % arr.length];
}

export function generateTitle(loc, serviceLabel = 'Web Design & Development') {
  const place = placeName(loc);
  const variants = [
    `${serviceLabel} Company in ${place} | ${brand.name}`,
    `Best ${serviceLabel} Agency in ${place} – ${brand.name}`,
    `${place} ${serviceLabel} Experts | ${brand.name}`,
  ];
  return pickVariant(variants, loc.slug).slice(0, 60);
}

export function generateDescription(loc, serviceLabel = 'web development') {
  const place = placeName(loc);
  const variants = [
    `Looking for a ${serviceLabel} company in ${place}? ${brand.name} builds fast, scalable websites & apps for ${place} businesses. ${brand.projects_delivered} projects delivered — get a free consultation.`,
    `${brand.name} is a trusted ${serviceLabel} agency in ${place}, helping startups & enterprises grow online. Custom websites, apps & eCommerce. Get a free quote today.`,
    `Hire a reliable ${serviceLabel} team in ${place}. ${brand.name} delivers responsive, secure, high-performing websites & mobile apps. Free 30-min consultation.`,
  ];
  return pickVariant(variants, loc.slug + 'd').slice(0, 160);
}

export function generateH1(loc, serviceLabel = 'Web Design & Development Company') {
  const place = placeName(loc);
  const variants = [
    `${serviceLabel} in ${place}`,
    `Trusted ${serviceLabel} Serving ${place} & Nearby Areas`,
    `${place}'s Partner for ${serviceLabel}`,
  ];
  return pickVariant(variants, loc.slug + 'h');
}

export function generateIntro(loc) {
  const place = placeName(loc);
  const nearby = loc.nearby_areas?.length
    ? ` and businesses across ${loc.nearby_areas.join(', ')}`
    : '';
  return `We are a web design and development company serving ${place}${nearby}. From startups to enterprises, we build scalable websites, mobile apps, and eCommerce platforms built to perform, scale, and grow — backed by ${brand.projects_delivered} projects delivered across ${brand.countries_served} countries.`;
}

export function generateFAQs(loc) {
  const place = placeName(loc);
  return [
    {
      q: `Do you provide web development services in ${place}?`,
      a: `Yes. ${brand.name} provides professional web design and development services to businesses in ${place}${loc.nearby_areas?.length ? ` and nearby areas like ${loc.nearby_areas.join(', ')}` : ''}.`,
    },
    {
      q: `How much does a website cost in ${place}?`,
      a: `Cost depends on project scope, features, and platform. We offer a free consultation to scope your ${place} project and provide a custom quote.`,
    },
    {
      q: `Can you work with clients in ${place} remotely?`,
      a: `Absolutely. We work with clients across time zones with dedicated project tracking, so distance from our office is never a blocker.`,
    },
    {
      q: `Do you offer ongoing support after launch?`,
      a: `Yes — bug fixes, security patches, performance optimization, and content updates are all part of our post-launch support for ${place} clients.`,
    },
  ];
}
```

> **AI agent note:** generate 3–4 phrasing variants per function (titles, descriptions, intros, FAQ wording) and pick deterministically by slug, like above. This is what keeps 28 pages from being flagged as templated/thin "doorway pages" by search engines — see Section 7.

---

## 3. `lib/schema.js` — JSON-LD structured data

```js
// lib/schema.js
export function generateLocalBusinessSchema(loc, brand) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": brand.name,
    "image": "https://yourdomain.com/logo.png",
    "telephone": loc.country_code === 'IN' ? brand.phone_india : brand.phone_intl,
    "email": brand.email,
    "areaServed": {
      "@type": loc.type === 'city' ? "City" : "Country",
      "name": loc.type === 'city' ? loc.city : loc.country,
    },
    "geo": { "@type": "GeoCoordinates", "latitude": loc.lat, "longitude": loc.lng },
    "address": { "@type": "PostalAddress", "addressCountry": loc.country_code },
  };
}

export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };
}

export function generateBreadcrumbSchema(loc) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yourdomain.com" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://yourdomain.com/locations" },
      { "@type": "ListItem", "position": 3, "name": loc.type === 'city' ? loc.city : loc.country },
    ],
  };
}
```

---

## 4. `app/[locationSlug]/page.tsx`

```tsx
import { notFound } from 'next/navigation';
import {
  getAllLocations, getLocationBySlug,
  generateTitle, generateDescription, generateH1, generateIntro, generateFAQs,
} from '@/lib/seoTemplates';
import { generateLocalBusinessSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import locationsData from '@/data/locations-data.json';
import LocationPageTemplate from '@/components/LocationPageTemplate';

// Build a static page for every location at deploy time.
export async function generateStaticParams() {
  return getAllLocations().map(loc => ({
    locationSlug: `web-development-company-${loc.slug}`,
  }));
}

function resolveSlug(locationSlug) {
  return locationSlug.replace('web-development-company-', '');
}

export async function generateMetadata({ params }) {
  const loc = getLocationBySlug(resolveSlug(params.locationSlug));
  if (!loc) return {};
  return {
    title: generateTitle(loc),
    description: generateDescription(loc),
    alternates: { canonical: `https://yourdomain.com/web-development-company-${loc.slug}` },
    openGraph: {
      title: generateTitle(loc),
      description: generateDescription(loc),
      url: `https://yourdomain.com/web-development-company-${loc.slug}`,
    },
  };
}

export default function LocationPage({ params }) {
  const loc = getLocationBySlug(resolveSlug(params.locationSlug));
  if (!loc) return notFound();

  const faqs = generateFAQs(loc);
  const jsonLd = [
    generateLocalBusinessSchema(loc, locationsData.brand),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(loc),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <LocationPageTemplate
        loc={loc}
        h1={generateH1(loc)}
        intro={generateIntro(loc)}
        faqs={faqs}
      />
    </>
  );
}
```

> **AI agent note:** If you'd rather have shorter URLs like `/noida` instead of `/web-development-company-noida`, drop the prefix in `generateStaticParams`/`resolveSlug`. Keyword-in-URL helps a little, but title + content matter far more — don't over-optimize the URL at the cost of a clean site structure.

---

## 5. `app/sitemap.ts` — auto-include every location

```ts
import locationsData from '@/data/locations-data.json';

export default function sitemap() {
  const base = 'https://yourdomain.com';
  const locationUrls = locationsData.locations.map(loc => ({
    url: `${base}/web-development-company-${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: loc.is_home_base ? 1.0 : 0.7,
  }));
  return [
    { url: base, lastModified: new Date(), priority: 1.0 },
    ...locationUrls,
  ];
}
```

---

## 6. `components/LocationPageTemplate.tsx` — shared visual shell

This is the part closest to your existing homepage — reuse your existing sections (services grid, tech stack, testimonials, CTA, trust badges) but feed them `loc`, `h1`, `intro`, `faqs` as props instead of hardcoded text. Skeleton:

```tsx
export default function LocationPageTemplate({ loc, h1, intro, faqs }) {
  return (
    <main>
      <section className="hero">
        <h1>{h1}</h1>
        <p>{intro}</p>
        <a href="#consultation">Book a Free Consultation</a>
      </section>

      {/* reuse your existing components below, unchanged */}
      <ServicesSection />
      <PortfolioSection />
      <TechStackSection />
      <TrustBadgesSection />

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((f, i) => (
          <details key={i}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      <NearbyAreasLinks areas={loc.nearby_areas} />
    </main>
  );
}
```

---

## 7. Avoiding the "doorway pages" penalty

Google explicitly penalizes pages that are pure find-and-replace clones with no real value. Mitigate this:

- ✅ Vary title/description/intro/FAQ wording per page (the `pickVariant` pattern above) — never identical sentence structure 28 times
- ✅ Aim for 350+ unique-feeling words per page (intro + FAQs + service descriptions already gets you most of the way)
- ✅ Add genuinely local signals where you have them: real testimonials from clients in that city, local phone number if you have one, real project examples, currency/timezone notes for country pages, compliance mentions (GDPR for UK/EU, HIPAA for US)
- ✅ Internally link location pages to each other via a "Nearby Areas" / "Locations We Serve" component (already in the template above) — helps crawlability and spreads link equity
- ❌ Don't create pages for cities/countries with zero genuine connection (no clients, no plan to serve them) — quality over coverage; 20 well-built pages outrank 100 thin ones

---

## 8. Master keyword list (fill into content / vary across the 3 variants)

**Primary pattern:** `[service] + company/agency + in/near + [city]`

**Service variations to combine with every city:**
- web development company in {city}
- website design company in {city}
- web design agency in {city}
- mobile app development company in {city}
- ecommerce website development in {city}
- custom software development company in {city}
- UI/UX design agency in {city}
- WordPress development company in {city}
- Shopify development services in {city}
- SEO services in {city}

**Long-tail / intent variations:**
- best web development company in {city}
- affordable website design company in {city}
- top app development agency in {city}
- hire web developers in {city}
- website development cost in {city}
- web design company near me ({city} landing page captures this via local pack + GBP, not the keyword itself)
- {city} web development company reviews

**For country pages (US/UK/UAE/Canada/Australia):**
- web development company in {country}
- hire web developers in {country}
- outsource web development to India from {country}
- offshore software development company for {country} businesses
- best Indian web development company for {country} clients

---

## 9. Step-by-step build flow (paste this into your AI coding agent)

```
1. Add `data/locations-data.json` (provided) to the repo.
2. Replace placeholder brand fields (name, phone, email, address) in the JSON.
3. Create lib/seoTemplates.js and lib/schema.js as specified — generate copy
   from functions, not hardcoded strings, using the variant-rotation pattern.
4. Create app/[locationSlug]/page.tsx with generateStaticParams,
   generateMetadata, and JSON-LD injection (LocalBusiness + FAQPage + Breadcrumb).
5. Build components/LocationPageTemplate.tsx by reusing existing homepage
   sections (services, portfolio, tech stack, trust badges), parameterized
   by the `loc`/`h1`/`intro`/`faqs` props instead of hardcoded copy.
6. Add a "Locations We Serve" footer/nav component that links every
   location page to its nearby_areas + back to the home page (internal
   linking for crawlability).
7. Create app/sitemap.ts to auto-include every generated location URL.
8. Run `next build` and verify all location pages render with unique
   title/description/H1 (spot-check via view-source, not just the browser
   tab, since metadata can be client-rendered incorrectly).
9. Validate JSON-LD with Google's Rich Results Test for at least 3 pages
   (one city, one NCR city, one country).
10. Deploy, then submit the sitemap in Google Search Console and request
    indexing for the top 5 priority city pages manually to speed things up.
11. After 2–3 weeks, check Search Console's Pages report for any
    "Duplicate, Google chose different canonical" or "Crawled - not
    indexed" flags on location pages — if present, increase content
    variation (Section 7) on the affected pages.
```

---

## 10. Optional UX layer (not for SEO — for conversion)

Once the indexable pages exist, you can add a lightweight client-side geolocation banner (using a free IP-geo API) on the homepage: *"Looks like you're in Mumbai — see services for Mumbai →"* linking to `/web-development-company-mumbai`. This improves conversion for organic homepage visitors but plays no role in how Google ranks the location pages themselves — that's entirely driven by the static content built in Steps 1–9.
