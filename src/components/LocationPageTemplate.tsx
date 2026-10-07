'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './LocationPageTemplate.css';
import LocationsWeServe from '@/components/LocationsWeServe';
import GlobalReach from '@/components/GlobalReach';
import TechLogo from '@/components/TechLogo';
import { openConsultModal } from '@/components/ConsultModal';
import { getLocationServiceContent } from '@/data/location-service-content';
import locationsData from '@/data/locations-data.json';
import {
  getLocationBySlug,
  getAllServices,
  generateH1,
  generateIntro,
  generateLocationPageFaqs,
  generateLocalContext,
} from '@/lib/seoTemplates';
import { generateLocalBusinessSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';

// ─── Data ────────────────────────────────────────────────────────────────────

// `key` matches locations-data.json services, so each card links to that
// service's page in the same location (internal linking across the cluster).
const SERVICES = [
  {
    key: 'web-development',
    icon: <span className="ico ico-monitor lp-icon" aria-hidden="true" />,
    label: 'Web Development',
    desc: 'Fast, scalable websites & web apps engineered to convert visitors into customers.',
    bgImage: '/services/web.jpg',
    hoverColor: 'group-hover:bg-[#1A1A1A]',
    features: ['Frontend', 'Backend', 'E-commerce'],
  },
  {
    key: 'app-development',
    icon: <span className="ico ico-smartphone lp-icon-static" aria-hidden="true" />,
    label: 'Mobile App Dev',
    desc: 'Native & cross-platform iOS and Android apps built with React Native and Flutter.',
    bgImage: '/services/mobile.jpg',
    hoverColor: 'group-hover:bg-[#C3F53C]',
    features: ['iOS', 'Android', 'Cross-Platform'],
  },
  {
    key: 'ui-ux-design',
    icon: <span className="ico ico-pen-tool lp-icon" aria-hidden="true" />,
    label: 'UI/UX Design',
    desc: 'Research-backed, pixel-perfect interfaces that users love and that drive measurable results.',
    bgImage: '/services/uiux.png',
    hoverColor: 'group-hover:bg-[#38BDF8]',
    features: ['Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    key: 'ecommerce-development',
    icon: <span className="ico ico-globe lp-icon" aria-hidden="true" />,
    label: 'eCommerce',
    desc: 'Custom Shopify, WooCommerce & headless storefronts built to sell at scale.',
    bgImage: '/services/ecommerse.png',
    hoverColor: 'group-hover:bg-[#1A1A1A]',
    features: ['Shopify', 'WooCommerce', 'Headless'],
  },
  {
    key: 'seo-services',
    icon: <span className="ico ico-megaphone lp-icon" aria-hidden="true" />,
    label: 'SEO Services',
    desc: 'Rank higher, drive qualified organic traffic, and grow revenue sustainably.',
    bgImage: '/services/seo.png',
    hoverColor: 'group-hover:bg-[#DE5D26]',
    features: ['On-Page SEO', 'Technical SEO', 'Link Building'],
  },
  {
    key: 'web-design',
    icon: <span className="ico ico-layers lp-icon" aria-hidden="true" />,
    label: 'Web Design',
    desc: 'Conversion-focused, responsive website designs that make your business look credible.',
    bgImage: '/services/web.jpg',
    hoverColor: 'group-hover:bg-[#1A1A1A]',
    features: ['Redesigns', 'Landing Pages', 'Responsive'],
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface FAQ {
  q: string;
  a: string;
}

interface Loc {
  slug: string;
  city: string | null;
  country: string;
  type: string;
  state: string | null;
  nearby_areas: string[];
  lat: number;
  lng: number;
  country_code: string;
  is_home_base?: boolean;
}

interface Props {
  locSlug: string;
  serviceKey: string;
}

// Location service key -> national /services/[slug] page
const NATIONAL_SERVICE_PAGE: Record<string, string> = {
  'web-development': 'web-development',
  'web-design': 'web-development',
  'app-development': 'mobile-app-development',
  'ecommerce-development': 'ecommerce-development',
  'ui-ux-design': 'ui-ux-design',
  'seo-services': 'seo',
};

// Nearby-area names that are also location pages, so we can link to them
const LOCATION_SLUG_BY_NAME = new Map(
  locationsData.locations.map((l) => [(l.city ?? l.country).toLowerCase(), l.slug])
);

// ─── Arrow icon ──────────────────────────────────────────────────────────────
// The same arrow/chevron icons render ~35× per page; drawing it once as an SVG <symbol> and
// referencing it with <use> keeps each instance to a few bytes of markup.

function ArrowSprite() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <symbol id="i-arrow-ne" viewBox="0 0 24 24">
        <path d="M5 19L19 5M19 5H7M19 5V17" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-chevron-down" viewBox="0 0 24 24">
        <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
    </svg>
  );
}

function ArrowIcon({ size, strokeWidth, className }: { size: number; strokeWidth: number; className?: string }) {
  return (
    <svg width={size} height={size} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <use href="#i-arrow-ne" />
    </svg>
  );
}

// ─── Helper: render text char-by-char ────────────────────────────────────────

function RenderAnimatedText({ text }: { text: string }) {
  return <span>{text}</span>;
}

// ─── FAQ Item ────────────────────────────────────────────────────────────────

function FAQItem({ q, a, idx }: FAQ & { idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`reveal border border-gray-200 rounded-[1.5rem] mb-4 overflow-hidden transition-all duration-300 bg-white ${
        open ? 'shadow-[0_10px_35px_rgba(0,0,0,0.06)] border-l-4 border-l-black' : 'hover:border-gray-300'
      }`}>
      <button
        onClick={() => setOpen(!open)}
        className="group lp-faq-1"
        aria-expanded={open}
      >
        <div className="lp-faq-7">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
              open ? 'bg-black text-[#C3F53C]' : 'bg-[#F6F6F6] text-gray-400'
            }`}
          >
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span className="lp-faq-2">
            {q}
          </span>
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            open ? 'bg-[#C3F53C] text-black rotate-180' : 'bg-[#F6F6F6] text-gray-500'
          }`}
        >
          <svg className="w-4 h-4" aria-hidden="true"><use href="#i-chevron-down" /></svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="lp-faq-3">
          {a}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LocationPageTemplate({ locSlug, serviceKey }: Props) {
  // Everything is derived here from the two slugs (deterministic, so the server
  // render matches hydration) instead of being passed as props — props get
  // serialized into the RSC payload, duplicating all of this text in the HTML.
  const loc = getLocationBySlug(locSlug) as Loc;
  const service = getAllServices().find((s: { key: string }) => s.key === serviceKey)!;
  const serviceLabel: string = service.label;
  const place = loc.type === 'country' ? loc.country : loc.city!;
  const h1: string = generateH1(loc, serviceLabel);
  const intro: string = generateIntro(loc, serviceLabel);
  const faqs: FAQ[] = generateLocationPageFaqs(loc, service);
  const localContext: { paragraphs: string[]; sameRegion: { slug: string; name: string }[] } = generateLocalContext(loc);
  const jsonLd = [
    generateLocalBusinessSchema(loc, locationsData.brand),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(loc, service),
  ];
  const content = getLocationServiceContent(serviceKey);
  const overview: string[] = content.overview(place);
  // Mid-sentence form: "SEO", "UI/UX design" (not "seo services", "ui/ux design")
  // Nearby areas that have their own page, plus other cities in the same state
  const nearbyLinks = [
    ...loc.nearby_areas.flatMap((area) => {
      const slug = LOCATION_SLUG_BY_NAME.get(area.toLowerCase());
      return slug ? [{ slug, name: area }] : [];
    }),
    ...localContext.sameRegion,
  ].filter((l, i, all) => l.slug !== loc.slug && all.findIndex((x) => x.slug === l.slug) === i);
  const serviceShort = locationsData.services.find((s) => s.key === serviceKey)?.short ?? serviceLabel;

  return (
    <main
      className="lp-page-root"
      aria-label={`${serviceLabel} agency in ${place} – TwoFloww`}
    >
      <ArrowSprite />
      {/* Rendered from this client component so the JSON-LD appears once in the
          HTML rather than also in the RSC payload */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />


      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="lp-hero-1">
        <div className="lp-hero-2">

          {/* Left Column - Content */}
          <div className="lp-hero-3">
            {/* No entrance animation: the hero holds the LCP element and must be
                visible in the server HTML (hiding it pushed LCP to 16s+). */}
            <div className="lp-hero-4">
              {/* Trust badge */}
              <div className="lp-trust-badge-1">
                <span className="lp-trust-badge-2">Trusted over 5,000+</span>
              </div>

              {/* Location pill */}
              <div className="lp-location-pill-1">
                <span className="lp-hero-5" />
                <span className="lp-hero-6">Serving {place}</span>
              </div>

              {/* H1 */}
              <h1
                className="lp-hero-7 font-display"
              >
                {h1}
              </h1>

              {/* Intro */}
              <p className="lp-hero-8">
                {intro}
              </p>

              {/* CTAs */}
              <div className="lp-hero-9">
                <button
                  onClick={openConsultModal}
                  className="group lp-hero-10"
                >
                  <span className="lp-hero-11">Book Consultation</span>
                  <div className="lp-hero-12">
                    <ArrowIcon size={18} strokeWidth={2.5} />
                  </div>
                </button>
                <Link
                  href="/projects"
                  className="group lp-hero-13"
                >
                  <span className="lp-hero-11">View Our Work</span>
                  <div className="lp-hero-14">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Image & Typography Overlay */}
          <div className="group lp-hero-15">
            <Image
              src="/flo.jpg"
              alt={`${serviceLabel} in ${place} – TwoFloww`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="lp-hero-16"
            />
            {/* Dark gradient overlay for better text readability and premium feel */}
            <div className="lp-hero-17" />
            {/* Stats overlay */}
            <div className="lp-hero-18">
              <div className="lp-stats-overlay-1">
                <h2
                  className="lp-hero-19 font-display tracking-[-0.01em]"
                >
                  Digital excellence <br />
                  <span className="lp-stats-overlay-2">delivered in {place}.</span>
                </h2>
                <div className="lp-stats-overlay-3">
                  <p className="lp-hero-20">
                    {serviceLabel} Experts
                  </p>
                  <span className="lp-stats-overlay-4" />
                </div>
              </div>
            </div>

            {/* Bottom floating stats */}
            <div className="lp-hero-21">
              {[
                { value: '50+', label: 'Projects' },
                { value: '10+', label: 'Countries' },
                { value: '100%', label: 'Satisfaction' },
              ].map(({ value, label }) => (
                <div key={label} className="lp-hero-22">
                  <p className="lp-bottom-floating-stats-1 font-display">
                    {value}
                  </p>
                  <p className="lp-hero-23">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Tagline ─────────────────────────────────────────────────────── */}
      <section className="lp-tagline-1">
        {/* Small tag */}
        <div className="lp-small-tag-1">
          <span className="lp-small-tag-2" />
          <span className="lp-tagline-2">{serviceLabel} Agency</span>
        </div>

        <h2
          className="reveal lp-tagline-3 font-display"
        >
          <span className="block mb-2 md:mb-4">
            <RenderAnimatedText text={`A premium ${serviceShort} partner`} />
          </span>
          <span className="lp-tagline-4">
            <RenderAnimatedText text="dedicated to engineering" />
            <span className="lp-tagline-5">
              <span className="ico ico-clock lp-small-tag-3" aria-hidden="true" />
            </span>
            <RenderAnimatedText text="smarter" />
          </span>
          <span className="lp-tagline-6">
            <span className="italic"><RenderAnimatedText text="and" /></span>
            <span className="lp-tagline-7">
              <span className="ico ico-lightbulb lp-small-tag-3" aria-hidden="true" />
            </span>
            <RenderAnimatedText text={`highly scalable solutions in ${place}`} />
          </span>
        </h2>

        {/* Avatars */}
        <div className="reveal lp-avatars-1">
          <p className="lp-tagline-8">Trusted by 5,000+ businesses</p>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="lp-services-1">
          {/* Header */}
          <div className="lp-services-2">
            <div className="lp-location-pill-1">
              <span className="lp-header-1" />
              <span className="lp-services-3">What We Build</span>
              <span className="lp-header-1" />
            </div>
            <h2
              className="lp-services-4 font-display tracking-[-0.03em]"
            >
              Full-service digital for <span className="lp-header-2">{place}</span>
            </h2>
            <p className="lp-services-5">
              We provide comprehensive digital solutions, combining strategic thinking with cutting-edge technology to help you dominate your market.
            </p>
          </div>

          {/* Grid */}
          <div className="lp-services-6">
            {SERVICES.map((service) => {
              const isCurrent = service.key === serviceKey;
              return (
              <div
                key={service.key}
                className={`reveal group lp-card relative${isCurrent ? ' border-black' : ''}`}
              >
                <div className="lp-grid-1">
                  <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center ${service.hoverColor} transition-colors duration-500`}>
                    {service.icon}
                  </div>
                  {/* Arrow */}
                  <div className="lp-arrow-btn">
                    <ArrowIcon size={14} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="lp-services-7">
                  {isCurrent ? (
                    service.label
                  ) : (
                    // Stretched link: the whole card is clickable, one anchor per card
                    <Link href={`/${service.key}-agency-in-${loc.slug}`} className="lp-services-8">
                      {service.label} in {place}
                    </Link>
                  )}
                </h3>
                <p className="lp-services-9">{service.desc}</p>
                <div className="lp-arrow-1">
                  {service.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className="lp-pill"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Industries We Serve ──────────────────────────────────────────── */}
      <section className="lp-industries-1">

        <div className="lp-industries-10">
          <div className="reveal lp-industries-2">
            <div className="max-w-xl">
              <div className="lp-location-pill-1">
                <span className="lp-small-tag-2" />
                <span className="lp-tagline-2">{serviceLabel} Agency in {place}</span>
              </div>
              <h2
                className="lp-industries-3 font-display tracking-[-0.03em]"
              >
                Industries<br />We Serve
              </h2>
            </div>

            <div className="max-w-md">
              <p className="lp-industries-4">
                From scalable digital platforms to enterprise infrastructure, we've got you covered. Choose reliability, choose excellence.
              </p>
              <button
                onClick={openConsultModal}
                className="group lp-industries-5"
              >
                <span className="lp-industries-6">Start a Project</span>
                <div className="lp-industries-7">
                  <ArrowIcon size={14} strokeWidth={2.5} />
                </div>
              </button>
            </div>
          </div>

          <div className="hide-scrollbar lp-industries-8">
            {[
              { title: 'Ecommerce Platforms', image: '/ecommerse.png' },
              { title: 'Travel & Hospitality', image: '/travel.jpg' },
              { title: 'Real Estate Solutions', image: '/real-estate.jpg' },
              { title: 'Education Portals', image: '/edu.jpg' },
              { title: 'Logistics & Transport', image: '/transportation.jpg' },
              { title: 'Media & Entertainment', image: '/entertainment.jpg' },
              { title: 'Finance & Banking', image: '/finance.jpg' },
              { title: 'Smart Manufacturing', image: '/manufactiring.jpg' },
            ].map(({ title, image }) => (
              <div
                key={title}
                className="reveal lp-industry-card group"
              >
                <Image src={image} alt={title} width={320} height={440} className="lp-industry-img" />
                <div className="lp-industry-shade" />
                <div className="lp-industry-body">
                  <h3 className="lp-industry-title">
                    {title}
                  </h3>
                </div>
                <div className="corner-cutout">
                  <div className="lp-industry-arrow">
                    <ArrowIcon size={18} strokeWidth={2.5} className="lp-industries-9" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="lp-why-1">

          {/* Header */}
          <div className="mb-12">
            <div className="lp-location-pill-1">
              <span className="lp-small-tag-2" />
              <span className="lp-tagline-2">Why Us</span>
            </div>
            <h2
              className="lp-why-2 font-display tracking-[-0.03em]"
            >
              Why choose TwoFloww
            </h2>
            <p className="lp-services-5">
              With proven expertise, we are a trusted {serviceShort} agency, offering customized digital solutions for {place} businesses and global clients.
            </p>
          </div>

          {/* Cards */}
          <div className="lp-why-3">
            {[
              {
                icon: <span className="ico ico-cpu lp-icon" aria-hidden="true" />,
                title: 'Advanced Technology',
                desc: 'Industry-specific tools that align with your business goals.',
                hoverColor: 'group-hover:bg-[#1A1A1A]',
                features: ['React', 'Next.js', 'Flutter'],
              },
              {
                icon: <span className="ico ico-layers lp-icon-static" aria-hidden="true" />,
                title: 'All-In-One Solution',
                desc: 'Integrated suite of business solutions that simplify your operations.',
                hoverColor: 'group-hover:bg-[#C3F53C]',
                features: ['Design', 'Dev', 'Marketing'],
              },
              {
                icon: <span className="ico ico-user-check lp-icon" aria-hidden="true" />,
                title: 'Client-Centric',
                desc: 'Focus on a client-centric approach that helps you achieve your goals.',
                hoverColor: 'group-hover:bg-[#38BDF8]',
                features: ['Dedicated PM', 'Weekly Reports', 'Milestone'],
              },
              {
                icon: <span className="ico ico-headphones lp-icon" aria-hidden="true" />,
                title: '24/7 Support',
                desc: 'Dedicated support team available 24/7 to resolve any query.',
                hoverColor: 'group-hover:bg-[#DE5D26]',
                features: ['Live Chat', 'Email', 'Phone'],
              },
            ].map(({ icon, title, desc, hoverColor, features }) => (
              <div
                key={title}
                className="reveal lp-card group"
              >
                <div className="lp-grid-1">
                  <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center ${hoverColor} transition-colors duration-500`}>
                    {icon}
                  </div>
                  <div className="lp-arrow-btn">
                    <ArrowIcon size={14} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="lp-why-4">{title}</h3>
                <p className="lp-why-5">{desc}</p>
                <div className="lp-arrow-1">
                  {features.map((f, i) => (
                    <span key={i} className="lp-pill">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ───────────────────────────────────────────────────── */}
      <section className="lp-process-1">
        <div className="lp-process-8">

          <div className="mb-12">
            <div className="lp-location-pill-1">
              <span className="lp-small-tag-2" />
              <span className="lp-tagline-2">Our Process</span>
            </div>
            <h2
              className="lp-why-2 font-display tracking-[-0.03em]"
            >
              How we deliver {serviceShort} projects
            </h2>
          </div>

          <div className="lp-process-2">
            <div>
              <p className="reveal lp-process-3">
                {overview[2]}
              </p>
              <div className="reveal">
                <Link
                  href="/projects"
                  className="group lp-process-4"
                >
                  <span className="lp-industries-6">View Client Success Stories</span>
                  <div className="lp-industries-7">
                    <ArrowIcon size={14} strokeWidth={2.5} />
                  </div>
                </Link>
              </div>
            </div>

            {/* 4-step staircase cards */}
            <div className="lp-process-5">
              {content.process.map(({ t, d }: { t: string; d: string }, i: number) => {
                const n = String(i + 1).padStart(2, '0');
                return (
                <div
                  key={n}
                  className={`reveal bg-[#F6F6F6] rounded-[2rem] p-6 sm:p-8 hover:bg-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between group ${n === '02' || n === '04' ? 'lg:translate-y-8' : ''}`}
                >
                  <div>
                    <p
                      className="lp-process-6 font-display"
                    >
                      {n}
                    </p>
                    <h3 className="lp-process-9">{t}</h3>
                    <p className="lp-process-10">{d}</p>
                  </div>
                  <div className="lp-process-7">
                    <ArrowIcon size={14} strokeWidth={2.5} />
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Technologies ─────────────────────────────────────────────────── */}
      <section className="lp-tech-1">
        <div className="lp-tech-6">
          <div className="lp-tech-2">
            <span className="lp-small-tag-2" />
            <span className="lp-tagline-2">Tech Stack</span>
          </div>
          <h2
            className="lp-services-4 font-display tracking-[-0.03em]"
          >
            Technologies
          </h2>
          <p className="lp-tech-3">
            The tools our {serviceShort} team in {place} uses day to day — chosen for reliability, performance, and how easily your own team can maintain the result.
          </p>
        </div>

        <ul className="lp-tech-4">
          {content.tech.map((name: string) => (
            <li
              key={name}
              className="lp-tech-tile"
            >
              <TechLogo name={name} className="lp-tech-7" />
              <span className="lp-tech-5">{name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="lp-faq-5">
        <div className="max-w-4xl mx-auto">
          <div className="reveal mb-14 text-center">
            <div className="lp-tech-2">
              <span className="lp-small-tag-2" />
              <span className="lp-tagline-2">FAQ</span>
            </div>
            <h2
              className="lp-faq-6 font-display tracking-[-0.03em]"
            >
              Working with us in <span className="lp-header-2">{place}</span>
            </h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} idx={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Working in this location (location-specific facts + nearby links) ── */}
      <section className="lp-local-5">
        <div className="max-w-4xl mx-auto">
          <h2
            className="lp-local-1 font-display tracking-[-0.02em]"
          >
            Working with businesses in {place}
          </h2>
          {localContext.paragraphs.map((p) => (
            <p key={p} className="lp-local-2">{p}</p>
          ))}

          {nearbyLinks.length > 0 && (
            <>
              <h3 className="lp-local-3">
                {serviceLabel} near {place}
              </h3>
              <ul className="lp-local-6">
                {nearbyLinks.map(({ slug, name }) => (
                  <li key={slug}>
                    <Link
                      href={`/${serviceKey}-agency-in-${slug}`}
                      className="lp-local-4"
                    >
                      {serviceLabel} in {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* ── Global Reach ─────────────────────────────────────────────────── */}
      <GlobalReach lightTheme={true} />

      {/* ── About Our Work ───────────────────────────────────────────────── */}
      <section className="lp-about-1" aria-label={`About TwoFloww ${serviceLabel} services in ${place}`}>
        <div className="lp-process-8">
          <div className="reveal">
            <div className="lp-location-pill-1">
              <span className="lp-small-tag-2" />
              <span className="lp-tagline-2">About TwoFloww</span>
            </div>
            <h2
              className="lp-about-2 font-display tracking-[-0.03em]"
            >
              Your trusted {serviceLabel} partner <br />
              <span className="lp-header-2">in {place}</span>
            </h2>

            <div className="lp-about-3">
              <div className="space-y-5">
                <p>{overview[0]}</p>
                <p>{overview[1]}</p>
                <p>
                  Our team is based in {locationsData.brand.address_india} and works with clients in {place} on milestone-based engagements, with full source-code ownership and post-launch support included. Book a free consultation and we will outline an approach tailored to your goals and budget.
                </p>
                <p>
                  Learn more about our <Link href={`/services/${NATIONAL_SERVICE_PAGE[serviceKey]}`} className="underline underline-offset-4 text-black">{serviceShort} services across India</Link>.
                </p>
              </div>
              <div>
                <h3 className="lp-about-4">What our {serviceShort} service includes</h3>
                <ul className="space-y-4">
                  {content.deliverables.map(({ title, desc }: { title: string; desc: string }) => (
                    <li key={title}>
                      <strong className="lp-about-5">{title}</strong> — {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Locations ────────────────────────────────────────────────── */}
      <div className="bg-white">
        <LocationsWeServe serviceKey={serviceKey} serviceLabel={serviceLabel} excludeSlug={loc.slug} />
      </div>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="lp-cta-1">
        <div className="lp-cta-2">
          {/* Background Image */}
          <Image
            src="/bg.jpg"
            alt=""
            fill
            sizes="(min-width: 1400px) 1400px, 100vw"
            className="object-cover"
          />
          <div className="lp-background-image-1" />

          <div className="lp-cta-3">

            {/* Left Text */}
            <div className="max-w-xl text-white">
              <h2
                className="lp-cta-4 font-display tracking-[-0.02em]"
              >
                Let&apos;s discuss how we can elevate your digital presence in {place}
              </h2>
              <p className="lp-cta-5">
                Our expert team bridges strategic thinking and advanced digital solutions to help your {place} business scale, improve online presence, and create intelligent user experiences.
              </p>

              <div className="lp-left-text-1">
                <button
                  onClick={openConsultModal}
                  className="group lp-cta-6"
                >
                  <span className="lp-industries-6">Book Free Consultation</span>
                  <div className="lp-cta-7">
                    <ArrowIcon size={14} strokeWidth={2.5} />
                  </div>
                </button>
                <a
                  href="tel:+917292050505"
                  className="group lp-cta-8"
                >
                  <span className="lp-industries-6">+91 7292 050505</span>
                  <div className="lp-cta-9">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Right — Floating Cards (matching About page CTA style) */}
            <div className="lp-left-text-2">
              {/* Back Dark Card */}
              <div className="reveal lp-cta-10">
                <p className="lp-cta-11">
                  {serviceLabel} <span className="lp-back-dark-card-1" />
                </p>
                <p className="lp-cta-12">
                  Design<br />Development<br />
                  <span className="lp-back-dark-card-2">Strategy, Growth</span><br />
                  and Innovation
                </p>
              </div>

              {/* Front Light Card */}
              <div className="reveal lp-cta-13">
                <div className="lp-front-light-card-1">
                  <div>
                    <p className="lp-front-light-card-2">Performance</p>
                    <p className="lp-front-light-card-3">In the past 7 days</p>
                  </div>
                  <svg className="lp-front-light-card-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                <div className="mb-6">
                  <div className="lp-front-light-card-5">84%</div>
                  <div className="lp-cta-14">
                    Business growth
                    <span className="lp-cta-15">+12%</span>
                  </div>
                </div>
                <div className="lp-front-light-card-6">
                  {['Digital', 'Strategic', 'Tech-Focused', 'Grow Faster'].map((tag) => (
                    <span key={tag} className="lp-cta-16">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
