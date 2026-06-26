'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, CheckCircle2, Cpu, Layers, UserCheck, Headphones, ShoppingCart, Plane, HeartPulse, Building2, GraduationCap, Truck, Zap, Landmark, Film, Factory } from 'lucide-react';
import { motion } from 'framer-motion';
import LocationsWeServe from '@/components/LocationsWeServe';
import GlobalReach from '@/components/GlobalReach';
import { openConsultModal } from '@/components/ConsultModal';

const SERVICES = [
  { 
    icon: 'https://api.iconify.design/fluent-emoji-flat/globe-showing-americas.svg', 
    label: 'Web Development', 
    desc: 'Fast, scalable websites & web apps engineered to convert visitors into customers.' 
  },
  { 
    icon: 'https://api.iconify.design/fluent-emoji-flat/mobile-phone.svg', 
    label: 'Mobile App Dev', 
    desc: 'Native & cross-platform iOS and Android apps built with React Native and Flutter.' 
  },
  { 
    icon: 'https://api.iconify.design/fluent-emoji-flat/artist-palette.svg', 
    label: 'UI/UX Design', 
    desc: 'Research-backed, pixel-perfect interfaces that users love — and that drive measurable results.' 
  },
  { 
    icon: 'https://api.iconify.design/fluent-emoji-flat/shopping-cart.svg', 
    label: 'eCommerce', 
    desc: 'Custom Shopify, WooCommerce & headless storefronts built to sell at scale.' 
  },
  { 
    icon: 'https://api.iconify.design/fluent-emoji-flat/magnifying-glass-tilted-right.svg', 
    label: 'SEO Services', 
    desc: 'Rank higher, drive qualified organic traffic, and grow revenue sustainably.' 
  },
  { 
    icon: 'https://api.iconify.design/fluent-emoji-flat/cloud.svg', 
    label: 'Cloud Solutions', 
    desc: 'Scalable, cost-effective infrastructure on AWS, GCP, and Azure.' 
  },
];

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

// Framer Motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function FAQItem({ q, a, idx }: FAQ & { idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeInUp}
      className={`border border-gray-100 rounded-2xl mb-4 overflow-hidden transition-all duration-300 bg-white ${
        open ? 'shadow-[0_10px_35px_rgba(0,0,0,0.03)] border-l-4 border-l-[#DE5D26]' : 'hover:border-gray-200'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left gap-4 group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
            open ? 'bg-[#DE5D26]/10 text-[#DE5D26]' : 'bg-gray-50 text-gray-400'
          }`}>
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span className="text-[#0B0D17] font-bold text-base sm:text-lg group-hover:text-[#DE5D26] transition-colors leading-snug">
            {q}
          </span>
        </div>
        <ChevronDown
          className={`shrink-0 w-5 h-5 text-gray-400 transition-transform duration-300 ${
            open ? 'rotate-180 text-[#DE5D26]' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 text-gray-500 text-sm sm:text-base leading-relaxed border-t border-gray-50 pl-16">
          {a}
        </div>
      </div>
    </motion.div>
  );
}

export default function LocationPageTemplate({ loc, h1, intro, faqs, serviceLabel = 'Web Development' }: Props) {
  const place = loc.type === 'city' ? loc.city! : loc.country;

  // Highlight the place name inside the H1 with orange
  const highlightedH1 = h1.includes(place)
    ? h1.split(place).flatMap((part, i, arr) =>
        i < arr.length - 1
          ? [part, <span key={i} className="text-[#DE5D26]">{place}</span>]
          : [part]
      )
    : [h1];

  return (
    <main className="bg-[#FAFAFA] text-[#0B0D17] min-h-screen selection:bg-[#DE5D26]/20 selection:text-[#DE5D26] font-sans overflow-x-hidden">
      
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center px-6 pt-36 pb-24 overflow-hidden bg-white border-b border-gray-100">
        {/* dot-grid background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(circle, #E5E7EB 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* ambient glow blobs */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-10 w-[400px] h-[400px] rounded-full bg-[#DE5D26]/[0.05] blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.04] blur-[120px] pointer-events-none"
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side: text and badges */}
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
              className="lg:col-span-7 flex flex-col"
            >
              {/* breadcrumb */}
              <motion.nav variants={fadeInUp} aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-medium tracking-wide">
                <Link href="/" className="hover:text-[#DE5D26] transition-colors">Home</Link>
                <span>/</span>
                <Link href="/locations" className="hover:text-[#DE5D26] transition-colors">Locations</Link>
                <span>/</span>
                <span className="text-[#0B0D17] font-semibold">{place}</span>
              </motion.nav>

              {/* location badge */}
              <motion.div variants={fadeInUp} className="inline-flex self-start items-center gap-2 border border-gray-200 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-8 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DE5D26] animate-pulse" />
                Serving {place}
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8 text-[#0B0D17]"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {highlightedH1}
              </motion.h1>

              {/* intro */}
              <motion.p variants={fadeInUp} className="text-gray-600 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10 font-medium">
                {intro}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openConsultModal}
                  className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0B0D17] text-white font-semibold rounded-full overflow-hidden group text-sm tracking-wide shadow-xl shadow-[#0B0D17]/15"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#DE5D26] transition-transform duration-300 ease-out transform -translate-x-full group-hover:translate-x-0" />
                  <span className="relative z-10 flex items-center gap-2">
                    Book 30 Min Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <Link
                  href="/projects"
                  className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0B0D17] text-white font-semibold rounded-full overflow-hidden group text-sm tracking-wide shadow-sm"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#DE5D26] transition-transform duration-300 ease-out transform -translate-x-full group-hover:translate-x-0" />
                  <span className="relative z-10">
                    View Our Work
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right side: Interactive Floating Mockup Stack */}
            <div className="relative w-full h-[400px] lg:h-[500px] hidden lg:flex items-center justify-center lg:col-span-5 select-none">
              {/* speed card */}
              <motion.div
                style={{ perspective: 1000 }}
                initial={{ opacity: 0, x: 50, y: -20, rotateY: -15, rotateX: 10 }}
                animate={{ opacity: 1, x: 0, y: 0, rotateY: -12, rotateX: 8 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ rotateY: -5, rotateX: 3, y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                className="absolute top-4 left-4 w-64 p-6 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)] flex flex-col gap-4 z-10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Performance</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-4">
                  {/* Circle progress */}
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" className="stroke-gray-100" strokeWidth="4" fill="transparent" />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        className="stroke-emerald-500"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={176}
                        initial={{ strokeDashoffset: 176 }}
                        animate={{ strokeDashoffset: 176 - (176 * 99) / 100 }}
                        transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                      />
                    </svg>
                    <span className="absolute text-sm font-bold text-gray-800">99%</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">Core Web Vitals</h4>
                    <p className="text-[10px] text-gray-500 font-medium">Page load speed: 0.8s</p>
                  </div>
                </div>
              </motion.div>

              {/* seo card */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 80, rotateY: -10, rotateX: 5 }}
                animate={{ opacity: 1, x: 0, y: 60, rotateY: -8, rotateX: 4 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ rotateY: -3, rotateX: 2, y: 50, scale: 1.02, transition: { duration: 0.3 } }}
                className="absolute w-72 p-6 bg-white border border-gray-150 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex flex-col gap-4 z-20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#DE5D26]">SEO Traffic</span>
                  <span className="text-xs font-black text-emerald-500">+142%</span>
                </div>
                <div className="h-16 relative">
                  {/* svg line graph */}
                  <svg className="w-full h-full" viewBox="0 0 100 30">
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#DE5D26" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#DE5D26" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 25 C 20 20, 40 10, 60 18 C 80 5, 100 2, 100 2 L 100 30 L 0 30 Z"
                      fill="url(#gradient)"
                    />
                    <motion.path
                      d="M 0 25 C 20 20, 40 10, 60 18 C 80 5, 100 2, 100 2"
                      fill="transparent"
                      stroke="#DE5D26"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                    />
                  </svg>
                </div>
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider text-center">Top 3 Google Ranking Achieved</p>
              </motion.div>

              {/* conversions card */}
              <motion.div
                initial={{ opacity: 0, x: -60, y: 160, rotateY: -8, rotateX: 2 }}
                animate={{ opacity: 1, x: -40, y: 150, rotateY: -5, rotateX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ rotateY: -2, rotateX: 1, y: 140, scale: 1.02, transition: { duration: 0.3 } }}
                className="absolute w-56 p-5 bg-[#0B0D17] text-white rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.12)] flex flex-col gap-3 z-30"
              >
                <div className="flex gap-1 text-[#DE5D26]">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="text-xs">★</span>
                  ))}
                </div>
                <p className="text-[11px] font-medium leading-relaxed text-gray-300">
                  "Twofloww transformed our presence. Leads doubled within months."
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] font-black text-white">
                    CEO
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-white">Local Owner</h5>
                    <p className="text-[8px] text-gray-400">Verified Client</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Trust bar (Floating Cards) ───────────────────────────────────── */}
      <section className="relative z-20 -mt-10 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { value: '50+',  label: 'Projects Delivered', desc: 'Crafted with premium performance' },
              { value: '10+',  label: 'Countries Served', desc: 'Global digital reach' },
              { value: '2016', label: 'Founded', desc: 'Years of software excellence' },
              { value: '100%', label: 'Satisfaction', desc: 'Guaranteed quality delivery' },
            ].map(({ value, label, desc }) => (
              <motion.div 
                variants={fadeInUp} 
                key={label} 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:border-[#DE5D26]/30 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <p
                  className="text-3xl md:text-4xl font-black text-[#DE5D26] mb-1 group-hover:scale-105 transition-transform duration-300"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {value}
                </p>
                <p className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-[10px] text-gray-400 font-medium">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 text-center max-w-2xl mx-auto"
          >
            <p className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4">What We Build</p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0D17]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Full-service digital for <span className="text-[#DE5D26]">{place}</span>
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICES.map(({ icon, label, desc }) => (
              <motion.div
                variants={fadeInUp}
                key={label}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white border border-gray-100 hover:border-[#DE5D26]/30 hover:shadow-[0_20px_50px_rgba(222,93,38,0.06)] rounded-3xl p-8 transition-all duration-300 group relative overflow-hidden"
              >
                {/* corner gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#DE5D26]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-14 h-14 bg-gray-50/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#DE5D26]/10 transition-all duration-300 shadow-sm border border-gray-100">
                  <img src={icon} alt={label} className="w-8 h-8 object-contain drop-shadow-sm" />
                </div>
                <h3 className="font-bold text-[#0B0D17] mb-3 text-lg group-hover:text-[#DE5D26] transition-colors">
                  {label}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#DE5D26] opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  Learn more
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Industries We Serve ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAFAFA] border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 text-center max-w-2xl mx-auto"
          >
            <p className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4">
              {serviceLabel} Agency in {place}
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0D17] mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Industries We Serve
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
              Delivering tailored digital solutions for businesses in {place} and across diverse industries, helping brands grow and streamline operations.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {[
              { title: 'Ecommerce', icon: 'shopping-bags' },
              { title: 'Travel & Hospitality', icon: 'airplane' },
              { title: 'Healthcare', icon: 'stethoscope' },
              { title: 'Real Estate', icon: 'house-with-garden' },
              { title: 'Education', icon: 'graduation-cap' },
              { title: 'Transportation', icon: 'delivery-truck' },
              { title: 'Utilities & On Demand', icon: 'wrench' },
              { title: 'Finance & Insurance', icon: 'money-bag' },
              { title: 'Media & Entertainment', icon: 'clapper-board' },
              { title: 'Manufacturing', icon: 'factory' }
            ].map(({ title, icon }) => (
              <motion.div
                variants={fadeInUp}
                key={title}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white border border-gray-100 hover:border-[#DE5D26]/30 hover:shadow-[0_20px_45px_rgba(222,93,38,0.06)] rounded-3xl p-6 flex flex-col items-center text-center justify-center gap-4 transition-all duration-300 group overflow-hidden relative"
              >
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#DE5D26]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative w-16 h-16 bg-gray-50/80 rounded-2xl flex items-center justify-center group-hover:bg-[#DE5D26]/10 transition-colors duration-300 shadow-sm border border-gray-100/50">
                  <img 
                    src={`https://api.iconify.design/fluent-emoji-flat/${icon}.svg`} 
                    alt={title} 
                    className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" 
                  />
                </div>
                <h3 className="relative font-bold text-[#0B0D17] text-[15px] group-hover:text-[#DE5D26] transition-colors duration-300">
                  {title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us (Pillars from Screenshot) ──────────────────────── */}
      <section className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4">
              {serviceLabel} Company for {place} Businesses
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0D17] mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Why Choose Us
            </h2>
            <p className="text-gray-650 text-sm sm:text-base leading-relaxed font-medium">
              With proven expertise, we are a trusted website design and {serviceLabel.toLowerCase()} agency, offering {serviceLabel.toLowerCase()} services for {place} businesses and customized digital solutions for global clients. Our experienced team focuses on performance, scalability, and long-term success.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              {
                icon: <Cpu className="w-6 h-6 text-[#DE5D26] group-hover:rotate-12 transition-transform duration-300" />,
                title: 'Advanced Technology',
                desc: 'Industry-specific customized tools that align with your business goals.',
              },
              {
                icon: <Layers className="w-6 h-6 text-[#DE5D26] group-hover:scale-110 transition-transform duration-300" />,
                title: 'All-In-One Solution',
                desc: 'Integrated suite of all-in-one business solutions simplifies your operations.',
              },
              {
                icon: <UserCheck className="w-6 h-6 text-[#DE5D26] group-hover:-translate-y-0.5 transition-transform duration-300" />,
                title: 'Client-Centric Approach',
                desc: 'Focus on a client-centric approach that helps you achieve your desired goals.',
              },
              {
                icon: <Headphones className="w-6 h-6 text-[#DE5D26] group-hover:scale-110 transition-transform duration-300" />,
                title: '24/7 Support',
                desc: 'A dedicated customer support team is available 24/7 to resolve any query.',
              },
            ].map(({ icon, title, desc }) => (
              <motion.div
                variants={fadeInUp}
                key={title}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-[#FAFAFA] border border-gray-100 rounded-3xl p-8 hover:bg-white hover:shadow-[0_20px_50px_rgba(222,93,38,0.05)] hover:border-[#DE5D26]/20 transition-all duration-300 group flex flex-col items-center text-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#DE5D26]/10 transition-colors duration-300">
                    {icon}
                  </div>
                  <h3 className="font-bold text-[#0B0D17] text-lg mb-3 group-hover:text-[#DE5D26] transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0B0D17] text-white font-bold rounded-full overflow-hidden group text-sm tracking-wide shadow-lg shadow-[#0B0D17]/15"
            >
              <span className="absolute inset-0 w-full h-full bg-[#DE5D26] transition-transform duration-300 ease-out transform -translate-x-full group-hover:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2">
                Connect with Us
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Our Process (Staircase Workflow) ─────────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAFAFA] border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4">Our Process</motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 text-[#0B0D17] leading-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              How we execute your project from start to finish
            </motion.h2>
            <motion.ul variants={staggerContainer} className="space-y-5">
              {[
                `Rigorous discovery mapping out requirements in ${place}`,
                'High-fidelity UX design & prototyping phase',
                'Next.js & React engineering for lightning-fast speeds',
                'Comprehensive QA testing before launch',
                'Ongoing support, monitoring & traffic growth services',
              ].map(item => (
                <motion.li variants={fadeInUp} key={item} className="flex items-start gap-4 text-gray-600 text-base font-medium">
                  <CheckCircle2 className="w-6 h-6 text-[#DE5D26] shrink-0" />
                  <span className="mt-0.5">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={fadeInUp}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 mt-10 text-sm font-bold text-[#DE5D26] hover:text-[#0B0D17] transition-colors group"
              >
                View our client success stories
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* 4-step process (Asymmetric staircase timeline) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              { n: '01', t: 'Discovery', d: `We map your goals and the competitive landscape in ${place}.` },
              { n: '02', t: 'Design',    d: 'Wireframes and high-fidelity prototypes approved before we code.' },
              { n: '03', t: 'Build',     d: 'Clean, tested code with full-stack engineers on every project.' },
              { n: '04', t: 'Launch',    d: 'Go-live, monitor, iterate. Your growth is the KPI.' },
            ].map(({ n, t, d }) => (
              <motion.div 
                variants={fadeInUp} 
                key={n} 
                className={`bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-[#DE5D26]/20 transition-all duration-300 flex flex-col justify-between ${
                  n === '02' || n === '04' ? 'lg:translate-y-8' : ''
                }`}
              >
                <div>
                  <p
                    className="text-[#DE5D26] font-black text-3xl mb-4"
                    style={{ fontFamily: 'var(--font-unbounded)' }}
                  >
                    {n}
                  </p>
                  <h4 className="font-bold text-[#0B0D17] text-lg mb-2">{t}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{d}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Technologies (Bidirectional Infinite Marquees with SimpleIcons) ─ */}
      <section className="py-24 px-6 bg-[#FAFAFA] overflow-hidden border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4">Tech Stack</p>
          <h2
            className="text-4xl sm:text-5xl font-black text-[#0B0D17] mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Technologies
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium">
            At our {serviceLabel.toLowerCase()} company in {place}, we offer custom and scalable solutions designed to meet your specific business needs. Our skilled developers support businesses in {place} & surrounding regions, integrating advanced technology to automate workflows, improve user experience, and enhance performance.
          </p>
        </div>

        {/* CSS Styles for Bidirectional Marquees */}
        <style>{`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left {
            animation: marqueeLeft 30s linear infinite;
          }
          .animate-marquee-right {
            animation: marqueeRight 30s linear infinite;
          }
          .animate-marquee-left:hover, .animate-marquee-right:hover {
            animation-play-state: paused;
          }
          .mask-gradient {
            mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
          }
        `}</style>

        {/* Marquee Track 1 (Scrolling Left) */}
        <div className="relative w-full overflow-hidden mask-gradient mb-6 py-2">
          <div className="flex gap-6 w-max animate-marquee-left">
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
            ].concat([
              { slug: 'nextdotjs', color: '000000', name: 'Next.js' },
              { slug: 'react', color: '61DAFB', name: 'React' },
              { slug: 'typescript', color: '3178C6', name: 'TypeScript' },
              { slug: 'flutter', color: '02569B', name: 'Flutter' },
              { slug: 'html5', color: 'E34F26', name: 'HTML5' },
              { slug: 'css3', color: '1572B6', name: 'CSS3' },
              { slug: 'bootstrap', color: '7952B3', name: 'Bootstrap' },
              { slug: 'javascript', color: 'F7DF1E', name: 'JavaScript' },
              { slug: 'figma', color: 'F24E1E', name: 'Figma' },
            ]).map((tech, idx) => (
              <div
                key={`t1-${idx}`}
                className="w-20 h-20 sm:w-24 h-24 bg-white border border-gray-100 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex items-center justify-center hover:shadow-[0_15px_30px_rgba(222,93,38,0.1)] hover:border-[#DE5D26]/20 hover:scale-105 transition-all duration-300 group shrink-0"
              >
                <img
                  src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                  alt={tech.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:rotate-12 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Track 2 (Scrolling Right) */}
        <div className="relative w-full overflow-hidden mask-gradient py-2">
          <div className="flex gap-6 w-max animate-marquee-right">
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
            ].concat([
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
            ]).map((tech, idx) => (
              <div
                key={`t2-${idx}`}
                className="w-20 h-20 sm:w-24 h-24 bg-white border border-gray-100 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex items-center justify-center hover:shadow-[0_15px_30px_rgba(222,93,38,0.1)] hover:border-[#DE5D26]/20 hover:scale-105 transition-all duration-300 group shrink-0"
              >
                <img
                  src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                  alt={tech.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:-rotate-12 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-14 text-center"
          >
            <p className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4">FAQ</p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0D17]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Working with us in <span className="text-[#DE5D26]">{place}</span>
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
        <section className="py-20 px-6 bg-[#FAFAFA]">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-8">
              Also serving nearby areas
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {loc.nearby_areas.map(area => (
                <span
                  key={area}
                  className="px-6 py-3 text-sm font-medium bg-white border border-gray-200 text-gray-600 rounded-full shadow-sm hover:border-[#DE5D26]/30 transition-all duration-300 cursor-default"
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

      {/* ── All locations ────────────────────────────────────────────────── */}
      <div className="bg-white">
        <LocationsWeServe />
      </div>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 bg-[#DE5D26]/8 border border-[#DE5D26]/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#DE5D26] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DE5D26] animate-pulse" />
              Got Questions?
            </span>
            <h2
              className="text-3xl sm:text-4xl font-black text-[#0B0D17] mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              Everything you need to know before we get started.
            </p>
          </motion.div>

          <div className="divide-y divide-gray-100">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA bottom ───────────────────────────────────────────────────── */}
      <section className="py-10 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-2xl px-10 py-10 sm:px-14"
            style={{
              background: 'linear-gradient(120deg, #E8521A 0%, #F97316 55%, #FBBF24 100%)',
            }}
          >
            {/* subtle grid texture */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* content row */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              {/* Left — label + heading + contacts */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70 mb-3">
                  Start A Conversation
                </p>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-snug mb-5"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Let's Discuss How We Can<br className="hidden sm:block" /> Elevate Your Digital Presence
                </h2>

                {/* contact chips */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+917292050505"
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200"
                  >
                    {/* phone icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    +91 7292 050505
                  </a>
                  <a
                    href="mailto:sales@invoidea.com"
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200"
                  >
                    {/* mail icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    sales@invoidea.com
                  </a>
                </div>
              </div>

              {/* Right — CTA button */}
              <div className="shrink-0">
                <button
                  onClick={openConsultModal}
                  className="inline-flex items-center gap-2.5 bg-white text-[#E8521A] font-bold px-8 py-4 rounded-xl text-base shadow-xl shadow-black/10 hover:shadow-black/20 hover:scale-[1.03] active:scale-100 transition-all duration-200 whitespace-nowrap"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
