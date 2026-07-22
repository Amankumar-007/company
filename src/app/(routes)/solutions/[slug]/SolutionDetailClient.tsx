'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Rocket,
  Building2,
  ShoppingCart,
  Wallet,
  Activity,
  BrainCircuit,
  UtensilsCrossed,
  ShoppingBasket,
  Car,
  Dumbbell,
  Star,
  Users,
  Heart,
  ShieldCheck,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { openConsultModal } from '@/components/ConsultModal';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Rocket,
  Building2,
  ShoppingCart,
  Wallet,
  Activity,
  BrainCircuit,
  UtensilsCrossed,
  ShoppingBasket,
  Car,
  Dumbbell,
  Star,
  Users,
  Heart,
};

interface Benefit { title: string; description: string; }
interface Stat { label: string; value: string; }
interface ProcessStep { step: string; title: string; desc: string; }
interface FAQ { q: string; a: string; }

interface Solution {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  icon: string;
  color: string;
  features: string[];
  benefits: Benefit[];
  stats: Stat[];
  process?: ProcessStep[];
  techStack?: string[];
  faq?: FAQ[];
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
}

/* ─── FAQ accordion component ────────────────────────────────────────── */
function FAQItem({ q, a, idx }: FAQ & { idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border border-gray-200 rounded-[1.5rem] mb-4 overflow-hidden transition-all duration-300 bg-white ${
        open ? 'shadow-[0_10px_35px_rgba(0,0,0,0.05)] border-l-4 border-l-black' : 'hover:border-gray-300'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left gap-4 group cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
              open ? 'bg-black text-[#C3F53C]' : 'bg-[#F6F6F6] text-gray-500'
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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pl-16">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SolutionDetailClient({ solution }: { solution: Solution }) {
  const IconComponent = iconMap[solution.icon] || Rocket;

  // JSON-LD Schema for SEO
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: solution.title,
    description: solution.seo?.description || solution.description,
    provider: {
      '@type': 'Organization',
      name: 'Twofloww',
      url: 'https://www.twofloww.in',
    },
    serviceType: solution.title,
    areaServed: 'Worldwide',
  };

  return (
    <main className="bg-white text-black min-h-screen font-sans selection:bg-[#C3F53C] selection:text-black">
      
      {/* ─── Schema JSON-LD ──────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ─── 1. HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative p-4 sm:p-6 lg:p-8 bg-white max-w-[1600px] mx-auto min-h-[85vh] flex items-center pt-20 lg:pt-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 h-full min-h-[620px] lg:h-[78vh]">
          
          {/* Left Column - Content */}
          <div className="bg-[#F6F6F6] rounded-[2.5rem] p-8 lg:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden h-full">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-w-xl mx-auto flex flex-col items-center"
            >
              {/* Breadcrumb & Pill */}
              <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-semibold uppercase tracking-wider">
                <Link href="/" className="hover:text-black transition-colors">Home</Link>
                <span>/</span>
                <Link href="/solutions" className="hover:text-black transition-colors">Solutions</Link>
                <span>/</span>
                <span className="text-black font-bold">{solution.title}</span>
              </nav>

              {/* Solution Icon & Title */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-200 bg-white"
                style={{ color: solution.color }}
              >
                <IconComponent className="w-8 h-8" />
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-[3.2rem] leading-[1.08] font-medium text-black tracking-tight mb-6"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
              >
                {solution.title}
              </h1>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md mb-10">
                {solution.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openConsultModal}
                  className="flex items-center gap-4 bg-black text-white rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 group shadow-md"
                >
                  <span className="font-bold text-xs tracking-widest uppercase">Consult Solution Architect</span>
                  <div className="w-9 h-9 rounded-full bg-[#C3F53C] flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats & Tech Highlights Overlay */}
          <div className="relative rounded-[2.5rem] bg-[#0B0D17] overflow-hidden h-full min-h-[420px] lg:min-h-full group flex flex-col justify-between p-8 lg:p-14 text-white shadow-2xl">
            {/* Ambient Overlay Glow */}
            <div
              className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[130px] opacity-20 pointer-events-none"
              style={{ backgroundColor: solution.color }}
            />

            {/* Top Info Header */}
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C3F53C] font-bold block mb-1">
                  Production Blueprint
                </span>
                <h2
                  className="text-2xl md:text-3xl font-light leading-snug"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Built for scale <br />
                  <span className="italic font-serif text-white/90">& market performance.</span>
                </h2>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 bg-white/10 rounded-full border border-white/10 text-[#C3F53C]">
                Active SLA
              </span>
            </div>

            {/* Long Description snippet */}
            {solution.longDescription && (
              <div className="relative z-10 my-6 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {solution.longDescription}
                </p>
              </div>
            )}

            {/* Bottom Key Performance Stats */}
            <div className="relative z-10 grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
              {solution.stats.map((st, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                  <p className="text-xl lg:text-2xl font-bold text-[#C3F53C]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {st.value}
                  </p>
                  <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">{st.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ─── 2. TAGLINE & VALUE PROPOSITION ──────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 bg-black rounded-sm" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">Core Value</span>
        </div>

        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.35] text-black tracking-tight max-w-4xl mx-auto mb-8"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          High-performance architecture engineered for <br />
          <span className="italic font-serif text-[#DE5D26]">maximum retention</span> & <span className="bg-[#C3F53C] px-2 py-0.5 rounded-md">operational growth</span>
        </h2>
      </section>


      {/* ─── 3. CORE CAPABILITIES / FEATURES GRID ───────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#C3F53C] rounded-full" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">Technical Depth</span>
              <span className="w-2 h-2 bg-[#C3F53C] rounded-full" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-medium tracking-tight text-black mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.03em' }}
            >
              Key Capabilities & Features
            </h2>
            <p className="text-gray-500 max-w-2xl text-base md:text-lg leading-relaxed">
              Every component is built using modern, production-tested technologies to guarantee stability, security, and effortless scalability.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solution.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
                className="group bg-white rounded-[2rem] p-7 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="w-10 h-10 rounded-xl bg-[#F6F6F6] text-black group-hover:bg-black group-hover:text-white font-bold flex items-center justify-center text-sm transition-colors">
                      0{idx + 1}
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-gray-300 group-hover:text-[#DE5D26] transition-colors" />
                  </div>

                  <h3
                    className="text-xl font-bold text-black leading-snug mb-4"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {feature}
                  </h3>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-black transition-colors">
                  <span>Production Standard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ─── 4. BENEFITS & PROCESS SECTION ─────────────────────────────── */}
      {solution.benefits && solution.benefits.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-[0.2em] mb-4 block">
                  Strategic Advantage
                </span>
                <h2
                  className="text-3xl md:text-5xl font-medium text-black mb-8 tracking-tight"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  Business Impact & ROI
                </h2>

                <div className="space-y-6">
                  {solution.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="p-6 bg-[#F8F9FA] rounded-2xl border border-gray-100">
                      <h3 className="text-lg font-bold text-black mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              {solution.techStack && solution.techStack.length > 0 && (
                <div className="bg-[#0B0D17] text-white rounded-[2.5rem] p-8 lg:p-12 shadow-2xl">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-4 h-4 text-[#C3F53C]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Battle-Tested Tech Stack</span>
                  </div>

                  <h3
                    className="text-2xl lg:text-3xl font-light mb-8"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    Engineered with modern frameworks
                  </h3>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {solution.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-xs font-bold text-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={openConsultModal}
                    className="w-full py-4 bg-[#C3F53C] text-black font-bold rounded-full text-xs tracking-widest uppercase hover:bg-white transition-colors"
                  >
                    Request Stack Documentation
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}


      {/* ─── 5. PROCESS WORKFLOW ────────────────────────────────────────── */}
      {solution.process && solution.process.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-[0.2em] mb-4 block">
                Execution Roadmap
              </span>
              <h2
                className="text-3xl md:text-5xl font-medium text-black tracking-tight"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                How We Deliver Your Product
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solution.process.map((step, pIdx) => (
                <div key={pIdx} className="bg-white rounded-3xl p-7 border border-gray-200/70 shadow-sm flex flex-col justify-between">
                  <div>
                    <span
                      className="text-4xl font-black text-black mb-4 block"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {step.step}
                    </span>
                    <h3 className="text-lg font-bold text-black mb-3">{step.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Phase {pIdx + 1} Milestone
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ─── 6. FAQ SECTION ─────────────────────────────────────────────── */}
      {solution.faq && solution.faq.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-[0.2em] mb-4 block">
                Clear Answers
              </span>
              <h2
                className="text-3xl md:text-5xl font-medium text-black tracking-tight"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div>
              {solution.faq.map((item, fIdx) => (
                <FAQItem key={fIdx} q={item.q} a={item.a} idx={fIdx} />
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ─── 7. CTA BANNER SECTION ──────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white max-w-[1400px] mx-auto overflow-hidden">
        <div className="relative w-full rounded-[2.5rem] bg-[#0B0D17] overflow-hidden min-h-[380px] flex items-center p-8 lg:p-16 text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-xs text-[#C3F53C] font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Build Your {solution.title}
            </span>

            <h2
              className="text-3xl md:text-5xl font-medium leading-tight mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Ready to launch your custom platform?
            </h2>

            <p className="text-gray-300 text-base mb-8 max-w-lg">
              Get a comprehensive scope analysis, tech stack recommendations, and fixed-cost proposal within 24 hours.
            </p>

            <button
              onClick={openConsultModal}
              className="flex items-center gap-4 bg-[#C3F53C] text-black rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 shadow-xl group"
            >
              <span className="font-bold text-xs tracking-widest uppercase">Schedule Consultation</span>
              <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
