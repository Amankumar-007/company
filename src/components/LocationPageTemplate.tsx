'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  CheckCircle2,
  Cpu,
  Layers,
  UserCheck,
  Headphones,
  Monitor,
  Smartphone,
  PenTool,
  Megaphone,
  Globe,
  Cloud,
  Lightbulb,
  Clock,
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import LocationsWeServe from '@/components/LocationsWeServe';
import GlobalReach from '@/components/GlobalReach';
import { openConsultModal } from '@/components/ConsultModal';

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: <Monitor className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />,
    label: 'Web Development',
    desc: 'Fast, scalable websites & web apps engineered to convert visitors into customers.',
    bgImage: '/services/web.jpg',
    hoverColor: 'group-hover:bg-[#1A1A1A]',
    features: ['Frontend', 'Backend', 'E-commerce'],
  },
  {
    icon: <Smartphone className="w-7 h-7 text-black transition-colors duration-300" strokeWidth={1.5} />,
    label: 'Mobile App Dev',
    desc: 'Native & cross-platform iOS and Android apps built with React Native and Flutter.',
    bgImage: '/services/mobile.jpg',
    hoverColor: 'group-hover:bg-[#C3F53C]',
    features: ['iOS', 'Android', 'Cross-Platform'],
  },
  {
    icon: <PenTool className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />,
    label: 'UI/UX Design',
    desc: 'Research-backed, pixel-perfect interfaces that users love and that drive measurable results.',
    bgImage: '/services/uiux.png',
    hoverColor: 'group-hover:bg-[#38BDF8]',
    features: ['Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    icon: <Globe className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />,
    label: 'eCommerce',
    desc: 'Custom Shopify, WooCommerce & headless storefronts built to sell at scale.',
    bgImage: '/services/ecommerse.png',
    hoverColor: 'group-hover:bg-[#1A1A1A]',
    features: ['Shopify', 'WooCommerce', 'Headless'],
  },
  {
    icon: <Megaphone className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />,
    label: 'SEO Services',
    desc: 'Rank higher, drive qualified organic traffic, and grow revenue sustainably.',
    bgImage: '/services/seo.png',
    hoverColor: 'group-hover:bg-[#DE5D26]',
    features: ['On-Page SEO', 'Technical SEO', 'Link Building'],
  },
  {
    icon: <Cloud className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />,
    label: 'Cloud Solutions',
    desc: 'Scalable, cost-effective infrastructure on AWS, GCP, and Azure.',
    bgImage: '/services/cloud.png',
    hoverColor: 'group-hover:bg-[#1A1A1A]',
    features: ['AWS', 'GCP', 'Azure'],
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
  loc: Loc;
  h1: string;
  intro: string;
  faqs: FAQ[];
  serviceLabel?: string;
}

// ─── Motion Variants ─────────────────────────────────────────────────────────

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const charVariant: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
};

// ─── Helper: render text char-by-char ────────────────────────────────────────

function RenderAnimatedText({ text }: { text: string }) {
  return <span>{text}</span>;
}

// ─── FAQ Item ────────────────────────────────────────────────────────────────

function FAQItem({ q, a, idx }: FAQ & { idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeInUp}
      className={`border border-gray-200 rounded-[1.5rem] mb-4 overflow-hidden transition-all duration-300 bg-white ${
        open ? 'shadow-[0_10px_35px_rgba(0,0,0,0.06)] border-l-4 border-l-black' : 'hover:border-gray-300'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left gap-4 group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
              open ? 'bg-black text-[#C3F53C]' : 'bg-[#F6F6F6] text-gray-400'
            }`}
          >
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span className="text-black font-bold text-base sm:text-lg group-hover:text-gray-600 transition-colors leading-snug">
            {q}
          </span>
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            open ? 'bg-[#C3F53C] text-black rotate-180' : 'bg-[#F6F6F6] text-gray-500'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 text-gray-500 text-sm sm:text-base leading-relaxed border-t border-gray-100 pl-16">
          {a}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LocationPageTemplate({ loc, h1, intro, faqs, serviceLabel = 'Web Development' }: Props) {
  const place = loc.type === 'country' ? loc.country : loc.city!;

  return (
    <main
      className="bg-white text-black min-h-screen font-sans overflow-x-hidden"
      aria-label={`${serviceLabel} agency in ${place} – TwoFloww`}
    >

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative p-4 sm:p-6 lg:p-8 bg-white max-w-[1600px] mx-auto min-h-[90vh] flex items-center pt-20 lg:pt-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 h-full min-h-[650px] lg:h-[80vh]">

          {/* Left Column - Content */}
          <div className="bg-[#F1F1F1] rounded-[3rem] p-8 lg:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden h-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-10 max-w-xl mx-auto flex flex-col items-center"
            >
              {/* Trust badge */}
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8 lg:mb-12">
                <span className="text-sm font-medium text-gray-800">Trusted over 5,000+</span>
              </motion.div>

              {/* Location pill */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-700">Serving {place}</span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={fadeInUp}
                className="text-[2.2rem] md:text-5xl lg:text-[3.2rem] leading-[1.05] font-medium text-black tracking-tight mb-6"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
              >
                {h1}
              </motion.h1>

              {/* Intro */}
              <motion.p variants={fadeInUp} className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-md mb-10">
                {intro}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openConsultModal}
                  className="flex items-center gap-4 bg-black text-white rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 group shadow-lg"
                >
                  <span className="font-bold text-sm tracking-widest uppercase">Book Consultation</span>
                  <div className="w-10 h-10 rounded-full bg-[#C3F53C] flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 19L19 5M19 5H7M19 5V17" />
                    </svg>
                  </div>
                </button>
                <Link
                  href="/projects"
                  className="flex items-center gap-4 bg-white text-black border border-gray-200 rounded-full pl-6 pr-2 py-2 hover:bg-gray-50 hover:scale-105 transition-all duration-300 group"
                >
                  <span className="font-bold text-sm tracking-widest uppercase">View Our Work</span>
                  <div className="w-10 h-10 rounded-full bg-[#F1F1F1] flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Image & Typography Overlay */}
          <div className="relative rounded-[3rem] overflow-hidden h-full min-h-[400px] lg:min-h-full group shadow-2xl">
            <img
              src="/flo.jpg"
              alt={`${serviceLabel} in ${place} – TwoFloww`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark gradient overlay for better text readability and premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 mix-blend-multiply" />
            {/* Stats overlay */}
            <div className="absolute inset-0 flex items-start justify-end pt-10 px-8 lg:pt-12 lg:px-12">
              <div className="text-white max-w-sm text-right">
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl leading-snug font-light mb-3 text-white drop-shadow-md"
                  style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.01em' }}
                >
                  Digital excellence <br />
                  <span className="italic font-serif text-[#C3F53C]">delivered in {place}.</span>
                </h2>
                <div className="flex items-center justify-end gap-3">
                  <p className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white/90 font-bold drop-shadow-md">
                    {serviceLabel} Experts
                  </p>
                  <span className="w-8 h-[2px] bg-[#C3F53C]" />
                </div>
              </div>
            </div>

            {/* Bottom floating stats */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
              {[
                { value: '50+', label: 'Projects' },
                { value: '10+', label: 'Countries' },
                { value: '100%', label: 'Satisfaction' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-center">
                  <p className="text-xl font-black text-white" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {value}
                  </p>
                  <p className="text-[10px] text-white/80 font-medium uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Tagline ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Small tag */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-1.5 h-1.5 bg-black rounded-sm" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">{serviceLabel} Agency</span>
        </div>

        <motion.h2
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.35] md:leading-[1.25] text-black tracking-tight max-w-4xl mx-auto mb-14"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          <span className="block mb-2 md:mb-4">
            <RenderAnimatedText text={`A premium ${serviceLabel.toLowerCase()} partner`} />
          </span>
          <span className="flex items-center justify-center flex-wrap gap-2 md:gap-3 mb-2 md:mb-4">
            <RenderAnimatedText text="dedicated to engineering" />
            <motion.span variants={charVariant} className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#38BDF8] rounded-full text-white mx-1">
              <Clock className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
            </motion.span>
            <RenderAnimatedText text="smarter" />
          </span>
          <span className="flex items-center justify-center flex-wrap gap-2 md:gap-3 text-gray-500 font-normal">
            <span className="italic"><RenderAnimatedText text="and" /></span>
            <motion.span variants={charVariant} className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#C3F53C] rounded-full text-black mx-1">
              <Lightbulb className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
            </motion.span>
            <RenderAnimatedText text={`highly scalable solutions in ${place}`} />
          </span>
        </motion.h2>

        {/* Avatars */}
        <motion.div
          className="flex flex-col items-center mt-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[13px] font-medium text-gray-700 mt-2">Trusted by 5,000+ businesses</p>
        </motion.div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-20 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-[#C3F53C] rounded-full" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">What We Build</span>
              <span className="w-2 h-2 bg-[#C3F53C] rounded-full" />
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-[4rem] font-medium tracking-tight text-black mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.03em' }}
            >
              Full-service digital for <span className="italic text-gray-400">{place}</span>
            </h2>
            <p className="text-gray-500 max-w-2xl text-base md:text-lg leading-relaxed">
              We provide comprehensive digital solutions, combining strategic thinking with cutting-edge technology to help you dominate your market.
            </p>
          </div>

          {/* Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`group bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-gray-100 flex flex-col cursor-pointer transform hover:-translate-y-2`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center ${service.hoverColor} transition-colors duration-500`}>
                    {service.icon}
                  </div>
                  {/* Arrow */}
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:border-black group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 19L19 5M19 5H7M19 5V17" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-black tracking-tight">{service.label}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed text-sm">{service.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className="px-4 py-1.5 bg-gray-50 rounded-full text-[11px] font-semibold text-gray-600 border border-gray-100 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300 tracking-wide"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Industries We Serve ──────────────────────────────────────────── */}
      <section className="py-24 px-0 sm:px-6 bg-white border-b border-gray-100 overflow-hidden">
        <style>{`
          .corner-cutout {
            position: absolute;
            bottom: -1px;
            right: -1px;
            width: 72px;
            height: 72px;
            background-color: white;
            border-top-left-radius: 28px;
            z-index: 10;
          }
          .corner-cutout::before, .corner-cutout::after {
            content: "";
            position: absolute;
            width: 28px;
            height: 28px;
            background-image: radial-gradient(circle at top left, transparent 27.5px, white 28px);
          }
          .corner-cutout::before { bottom: 100%; right: 0; }
          .corner-cutout::after { bottom: 0; right: 100%; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-10 mb-8 lg:mb-16 px-6 lg:px-4"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 bg-black rounded-sm" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">{serviceLabel} Agency in {place}</span>
              </div>
              <h2
                className="text-[2.75rem] sm:text-6xl md:text-[5rem] font-medium text-black leading-[1.05] tracking-tight"
                style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.03em' }}
              >
                Industries<br />We Serve
              </h2>
            </div>

            <div className="max-w-md">
              <p className="text-gray-500 font-medium mb-6 leading-relaxed text-base sm:text-lg">
                From scalable digital platforms to enterprise infrastructure, we've got you covered. Choose reliability, choose excellence.
              </p>
              <button
                onClick={openConsultModal}
                className="flex items-center gap-4 bg-black text-white rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 group inline-flex"
              >
                <span className="font-bold text-[11px] tracking-[0.2em] uppercase">Start a Project</span>
                <div className="w-8 h-8 rounded-full bg-[#C3F53C] flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 19L19 5M19 5H7M19 5V17" />
                  </svg>
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 px-4 lg:px-4 w-full"
          >
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
              <motion.div
                variants={fadeInUp}
                key={title}
                className="relative w-[280px] sm:w-[320px] h-[380px] sm:h-[440px] shrink-0 rounded-[2rem] overflow-hidden group snap-start cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 bg-gray-100"
              >
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[1.5s] ease-out group-hover:scale-[1.08] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-10 pointer-events-none pb-12 sm:pb-14">
                  <h3 className="text-xl sm:text-2xl font-bold text-white max-w-[85%] leading-tight group-hover:text-[#C3F53C] transition-colors duration-300">
                    {title}
                  </h3>
                </div>
                <div className="corner-cutout">
                  <div className="absolute inset-2.5 bg-black group-hover:bg-[#C3F53C] rounded-full flex items-center justify-center transition-colors duration-300 shadow-md">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-black transition-colors duration-300">
                      <path d="M5 19L19 5M19 5H7M19 5V17" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-black rounded-sm" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Why Us</span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-[4rem] font-medium text-black tracking-tight mb-8"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.03em' }}
            >
              Why choose TwoFloww
            </h2>
            <p className="text-gray-500 max-w-2xl text-base md:text-lg leading-relaxed">
              With proven expertise, we are a trusted {serviceLabel.toLowerCase()} agency, offering customized digital solutions for {place} businesses and global clients.
            </p>
          </div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <Cpu className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />,
                title: 'Advanced Technology',
                desc: 'Industry-specific tools that align with your business goals.',
                hoverColor: 'group-hover:bg-[#1A1A1A]',
                features: ['React', 'Next.js', 'Flutter'],
              },
              {
                icon: <Layers className="w-7 h-7 text-black transition-colors duration-300" strokeWidth={1.5} />,
                title: 'All-In-One Solution',
                desc: 'Integrated suite of business solutions that simplify your operations.',
                hoverColor: 'group-hover:bg-[#C3F53C]',
                features: ['Design', 'Dev', 'Marketing'],
              },
              {
                icon: <UserCheck className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />,
                title: 'Client-Centric',
                desc: 'Focus on a client-centric approach that helps you achieve your goals.',
                hoverColor: 'group-hover:bg-[#38BDF8]',
                features: ['Dedicated PM', 'Weekly Reports', 'Milestone'],
              },
              {
                icon: <Headphones className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />,
                title: '24/7 Support',
                desc: 'Dedicated support team available 24/7 to resolve any query.',
                hoverColor: 'group-hover:bg-[#DE5D26]',
                features: ['Live Chat', 'Email', 'Phone'],
              },
            ].map(({ icon, title, desc, hoverColor, features }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className="group bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-gray-100 flex flex-col cursor-pointer transform hover:-translate-y-2"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center ${hoverColor} transition-colors duration-500`}>
                    {icon}
                  </div>
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:border-black group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 19L19 5M19 5H7M19 5V17" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-black tracking-tight">{title}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed text-sm flex-1">{desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {features.map((f, i) => (
                    <span key={i} className="px-4 py-1.5 bg-gray-50 rounded-full text-[11px] font-semibold text-gray-600 border border-gray-100 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300 tracking-wide">
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Our Process ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto">

          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-black rounded-sm" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Our Process</span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-[4rem] font-medium text-black tracking-tight mb-8"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.03em' }}
            >
              How we execute your project
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Steps list */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="space-y-5"
            >
              {[
                `Rigorous discovery mapping out requirements in ${place}`,
                'High-fidelity UX design & prototyping phase',
                'Next.js & React engineering for lightning-fast speeds',
                'Comprehensive QA testing before launch',
                'Ongoing support, monitoring & traffic growth services',
              ].map((item) => (
                <motion.li key={item} variants={fadeInUp} className="flex items-start gap-4 text-gray-600 text-base font-medium">
                  <div className="w-6 h-6 rounded-full bg-[#C3F53C] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-black" />
                  </div>
                  <span>{item}</span>
                </motion.li>
              ))}
              <motion.div variants={fadeInUp}>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-4 mt-8 bg-black text-white rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 group"
                >
                  <span className="font-bold text-[11px] tracking-[0.2em] uppercase">View Client Success Stories</span>
                  <div className="w-8 h-8 rounded-full bg-[#C3F53C] flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 19L19 5M19 5H7M19 5V17" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            </motion.ul>

            {/* 4-step staircase cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            >
              {[
                { n: '01', t: 'Discovery', d: `We map your goals and the competitive landscape in ${place}.` },
                { n: '02', t: 'Design', d: 'Wireframes and high-fidelity prototypes approved before we code.' },
                { n: '03', t: 'Build', d: 'Clean, tested code with full-stack engineers on every project.' },
                { n: '04', t: 'Launch', d: 'Go-live, monitor, iterate. Your growth is the KPI.' },
              ].map(({ n, t, d }) => (
                <motion.div
                  variants={fadeInUp}
                  key={n}
                  className={`bg-[#F6F6F6] rounded-[2rem] p-6 sm:p-8 hover:bg-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between group ${n === '02' || n === '04' ? 'lg:translate-y-8' : ''}`}
                >
                  <div>
                    <p
                      className="text-4xl font-black text-black mb-4 group-hover:text-[#1A1A1A]"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {n}
                    </p>
                    <h4 className="font-bold text-black text-lg mb-2">{t}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{d}</p>
                  </div>
                  <div className="mt-6 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-[#C3F53C] group-hover:border-[#C3F53C] group-hover:text-black transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 19L19 5M19 5H7M19 5V17" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Technologies ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-[#F8F9FA] overflow-hidden border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 bg-black rounded-sm" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Tech Stack</span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-[4rem] font-medium tracking-tight text-black mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.03em' }}
          >
            Technologies
          </h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-3xl mx-auto">
            At our {serviceLabel.toLowerCase()} company in {place}, we offer custom and scalable solutions integrating advanced technology to automate workflows, improve user experience, and enhance performance.
          </p>
        </div>

        <style>{`
          @keyframes marqueeLeft { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-100% - 1.5rem)); } }
          @keyframes marqueeRight { 0% { transform: translateX(calc(-100% - 1.5rem)); } 100% { transform: translateX(0); } }
          .animate-marquee-left { animation: marqueeLeft 30s linear infinite; }
          .animate-marquee-right { animation: marqueeRight 30s linear infinite; }
          .mask-gradient {
            mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
          }
        `}</style>

        {/* Marquee Track 1 */}
        <div className="relative w-full overflow-hidden mask-gradient mb-6 py-2 flex gap-6">
          {[0, 1].map((dup) => (
            <div key={dup} className={`flex gap-6 shrink-0 animate-marquee-left`} aria-hidden={dup === 1}>
              {[
                { slug: 'nextdotjs', color: '000000', name: 'Next.js' },
                { slug: 'react', color: '61DAFB', name: 'React' },
                { slug: 'typescript', color: '3178C6', name: 'TypeScript' },
                { slug: 'flutter', color: '02569B', name: 'Flutter' },
                { slug: 'html5', color: 'E34F26', name: 'HTML5' },
                { slug: 'css3', color: '1572B6', name: 'CSS3' },
                { slug: 'bootstrap', color: '7952B3', name: 'Bootstrap' },
                { slug: 'javascript', color: 'F7DF1E', name: 'JavaScript' },
                { slug: 'figma', color: 'F24E1E', name: 'Figma' },
              ].map((tech, idx) => (
                <div
                  key={`t1-${dup}-${idx}`}
                  className="w-16 h-16 sm:w-24 sm:h-24 bg-white border border-gray-100 rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex items-center justify-center hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:border-gray-300 hover:scale-105 transition-all duration-300 group shrink-0"
                >
                  <img src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`} alt={tech.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:rotate-12 transition-transform duration-300" loading="lazy" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Marquee Track 2 */}
        <div className="relative w-full overflow-hidden mask-gradient py-2 flex gap-6">
          {[0, 1].map((dup) => (
            <div key={dup} className={`flex gap-6 shrink-0 animate-marquee-right`} aria-hidden={dup === 1}>
              {[
                { slug: 'woocommerce', color: '96588A', name: 'WooCommerce' },
                { slug: 'mysql', color: '4479A1', name: 'MySQL' },
                { slug: 'mongodb', color: '47A248', name: 'MongoDB' },
                { slug: 'laravel', color: 'FF2D20', name: 'Laravel' },
                { slug: 'php', color: '777BB4', name: 'PHP' },
                { slug: 'vuedotjs', color: '4FC08D', name: 'Vue.js' },
                { slug: 'angular', color: 'DD0031', name: 'Angular' },
                { slug: 'supabase', color: '3ECF8E', name: 'Supabase' },
                { slug: 'tailwindcss', color: '06B6D4', name: 'Tailwind CSS' },
                { slug: 'nodedotjs', color: '339933', name: 'Node.js' },
              ].map((tech, idx) => (
                <div
                  key={`t2-${dup}-${idx}`}
                  className="w-16 h-16 sm:w-24 sm:h-24 bg-white border border-gray-100 rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex items-center justify-center hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:border-gray-300 hover:scale-105 transition-all duration-300 group shrink-0"
                >
                  <img src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`} alt={tech.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:-rotate-12 transition-transform duration-300" loading="lazy" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            className="mb-14 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-black rounded-sm" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">FAQ</span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-[4rem] font-medium text-black tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.03em' }}
            >
              Working with us in <span className="italic text-gray-400">{place}</span>
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} idx={i} {...faq} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Nearby areas ─────────────────────────────────────────────────── */}
      {loc.nearby_areas.length > 0 && (
        <section className="py-20 px-4 sm:px-6 bg-[#F8F9FA]">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="w-1.5 h-1.5 bg-black rounded-sm" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Also serving nearby areas</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {loc.nearby_areas.map((area) => (
                <span
                  key={area}
                  className="px-6 py-3 text-sm font-medium bg-white border border-gray-200 text-gray-600 rounded-full shadow-sm hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-default"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Global Reach ─────────────────────────────────────────────────── */}
      <GlobalReach lightTheme={true} />

      {/* ── About Our Work ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white border-b border-gray-100" aria-label={`About TwoFloww ${serviceLabel} services in ${place}`}>
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-black rounded-sm" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">About TwoFloww</span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-[4rem] font-medium text-black mb-12 leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.03em' }}
            >
              Your trusted {serviceLabel} partner <br />
              <span className="italic text-gray-400">in {place}</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-gray-500 text-base leading-relaxed">
              <div className="space-y-5">
                <p>
                  TwoFloww is a full-service {serviceLabel.toLowerCase()} company serving businesses in {place} and across India. Since our founding, we have delivered over 150 digital projects — from sleek corporate websites to complex multi-vendor e-commerce platforms and on-demand mobile applications.
                </p>
                <p>
                  Our {serviceLabel.toLowerCase()} team based in Noida, Delhi NCR understands the competitive local business landscape. Whether you are a startup looking to launch your first product or an established enterprise modernising your digital presence, we design and build solutions that are fast, scalable, and conversion-optimised.
                </p>
                <p>
                  Businesses in {place} trust TwoFloww for our transparent pricing, milestone-based delivery, and commitment to long-term partnership — not just one-off projects. Every engagement includes full source-code ownership, post-launch support, and dedicated project management.
                </p>
              </div>
              <div className="space-y-5">
                <p>
                  Our technology stack is built for performance. We use Next.js and React for blazing-fast web experiences, Flutter and React Native for cross-platform mobile apps, and Supabase, Node.js, and PostgreSQL for robust back-end infrastructure.
                </p>
                <p>
                  For {place} businesses requiring SEO and digital marketing, our strategies are grounded in technical excellence. We conduct comprehensive audits, implement structured data, optimise Core Web Vitals, and build authoritative link profiles that drive sustainable organic traffic growth.
                </p>
                <p>
                  Ready to take your {place} business to the next level? Our team offers a free 30-minute consultation where we analyse your current digital presence and outline a custom strategy tailored to your market, budget, and growth goals.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── All Locations ────────────────────────────────────────────────── */}
      <div className="bg-white">
        <LocationsWeServe />
      </div>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white max-w-[1400px] mx-auto overflow-hidden">
        <div className="relative w-full rounded-[2rem] overflow-hidden min-h-[400px] lg:min-h-[450px] flex items-center">
          {/* Background Image */}
          <img
            src="/bg.jpg"
            alt="CTA Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 lg:p-16">

            {/* Left Text */}
            <div className="max-w-xl text-white">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] mb-6 drop-shadow-md"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.02em' }}
              >
                Let&apos;s discuss how we can elevate your digital presence in {place}
              </h2>
              <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8 max-w-md drop-shadow-sm">
                Our expert team bridges strategic thinking and advanced digital solutions to help your {place} business scale, improve online presence, and create intelligent user experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openConsultModal}
                  className="flex items-center gap-4 bg-[#C3F53C] text-black rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 shadow-xl group inline-flex"
                >
                  <span className="font-bold text-[11px] tracking-[0.2em] uppercase">Book Free Consultation</span>
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-[#C3F53C] group-hover:rotate-45 transition-transform duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 19L19 5M19 5H7M19 5V17" />
                    </svg>
                  </div>
                </button>
                <a
                  href="tel:+917292050505"
                  className="flex items-center gap-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 group inline-flex"
                >
                  <span className="font-bold text-[11px] tracking-[0.2em] uppercase">+91 7292 050505</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Right — Floating Cards (matching About page CTA style) */}
            <div className="relative h-[300px] hidden lg:block">
              {/* Back Dark Card */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 0 }}
                whileInView={{ opacity: 1, x: 0, rotate: -8 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute right-32 top-8 w-[260px] bg-[#111] rounded-2xl p-6 text-white shadow-2xl border border-white/10"
              >
                <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                  {serviceLabel} <span className="w-2 h-2 rounded-full bg-[#C3F53C]" />
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  Design<br />Development<br />
                  <span className="text-white text-base">Strategy, Growth</span><br />
                  and Innovation
                </p>
              </motion.div>

              {/* Front Light Card */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: 6 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="absolute right-4 top-16 w-[280px] bg-white rounded-2xl p-6 text-black shadow-2xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-semibold text-sm">Performance</h4>
                    <p className="text-[10px] text-gray-500">In the past 7 days</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-1 tracking-tight">84%</div>
                  <div className="text-[11px] text-gray-500 flex items-center gap-2 font-medium">
                    Business growth
                    <span className="text-[#84CC16] bg-[#84CC16]/10 px-1.5 py-0.5 rounded font-bold text-[10px]">+12%</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Digital', 'Strategic', 'Tech-Focused', 'Grow Faster'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-semibold text-gray-600 border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
