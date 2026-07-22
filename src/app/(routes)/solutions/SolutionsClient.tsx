'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
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
  Zap,
  ShieldCheck,
  TrendingUp,
  Layers,
  Code2,
} from 'lucide-react';
import { openConsultModal } from '@/components/ConsultModal';
import { solutionsData } from '@/data/solutions';

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

export default function SolutionsClient() {
  return (
    <main className="bg-white text-black min-h-screen font-sans selection:bg-[#C3F53C] selection:text-black">
      
      {/* ─── 1. HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative p-4 sm:p-6 lg:p-8 bg-white max-w-[1600px] mx-auto min-h-[85vh] flex items-center pt-20 lg:pt-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 h-full min-h-[620px] lg:h-[78vh]">
          
          {/* Left Column - Content */}
          <div className="bg-[#F6F6F6] rounded-[2.5rem] p-8 lg:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-10 max-w-xl mx-auto flex flex-col items-center"
            >
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#DE5D26] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700">
                  Custom Digital Solutions
                </span>
              </div>

              {/* Main H1 */}
              <h1
                className="text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.08] font-medium text-black tracking-tight mb-6"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
              >
                Engineered Solutions that <span className="italic font-serif text-[#DE5D26]">Scale & Dominate</span>
              </h1>

              {/* Subheading */}
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md mb-10">
                From food delivery apps and ride-hailing platforms to fintech, AI automation, and enterprise transformations — we build digital products engineered for market leadership.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openConsultModal}
                  className="flex items-center gap-4 bg-black text-white rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 group shadow-md cursor-pointer"
                >
                  <span className="font-bold text-xs tracking-widest uppercase">Explore Solutions</span>
                  <div className="w-9 h-9 rounded-full bg-[#C3F53C] flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 19L19 5M19 5H7M19 5V17" />
                    </svg>
                  </div>
                </button>
                <a
                  href="#bento-grid"
                  className="flex items-center gap-3 bg-white text-black border border-gray-200 rounded-full px-6 py-3 hover:bg-gray-50 transition-colors duration-300 font-bold text-xs tracking-widest uppercase"
                >
                  View All ({solutionsData.length})
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Tech/Stats Interactive Card Overlay */}
          <div className="relative rounded-[2.5rem] bg-[#0B0D17] overflow-hidden h-full min-h-[420px] lg:min-h-full group flex flex-col justify-between p-8 lg:p-14 text-white shadow-2xl">
            {/* Subtle Gradient Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#DE5D26]/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

            {/* Top Bar overlay text */}
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C3F53C] font-bold block mb-1">
                  Architecture First
                </span>
                <h2
                  className="text-2xl md:text-3xl font-light leading-snug"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  High Velocity <br />
                  <span className="italic font-serif text-white/90">Software Engineering</span>
                </h2>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                <Code2 className="w-6 h-6 text-[#C3F53C]" />
              </div>
            </div>

            {/* Middle Feature Chips */}
            <div className="relative z-10 my-8 space-y-3">
              {[
                { label: '99.99% Uptime Guarantee', icon: ShieldCheck, color: 'text-emerald-400' },
                { label: 'Sub-Second Global Response Time', icon: Zap, color: 'text-amber-300' },
                { label: 'Scalable Microservices Backend', icon: Layers, color: 'text-sky-400' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 max-w-sm"
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-xs font-semibold text-gray-200 tracking-wide">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Bottom Floating Stats */}
            <div className="relative z-10 grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
              {[
                { value: '50+', label: 'Products Shipped' },
                { value: '10M+', label: 'Monthly Users' },
                { value: '99.9%', label: 'SLA Reliability' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                  <p className="text-xl lg:text-2xl font-bold text-[#C3F53C]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {value}
                  </p>
                  <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ─── 2. TAGLINE SECTION ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 bg-black rounded-sm" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">Our Methodology</span>
        </div>

        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.35] text-black tracking-tight max-w-4xl mx-auto mb-10"
          style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
        >
          Tailored digital solutions built with <br />
          <span className="italic font-serif text-[#DE5D26]">robust engineering</span> & <span className="bg-[#C3F53C] px-2 py-0.5 rounded-md">conversion focus</span>
        </h2>

        <p className="text-gray-500 max-w-2xl text-base md:text-lg leading-relaxed">
          We don't sell off-the-shelf templates. Every solution is architected from the ground up to match your operational needs, market compliance, and scaling roadmap.
        </p>
      </section>


      {/* ─── 3. BENTO GRID SOLUTIONS ────────────────────────────────────── */}
      <section id="bento-grid" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Section Header */}
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#DE5D26] rounded-full" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">Full Capabilities</span>
              <span className="w-2 h-2 bg-[#DE5D26] rounded-full" />
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-[3.8rem] font-medium tracking-tight text-black mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.03em' }}
            >
              Explore Our Industry Solutions
            </h2>
            <p className="text-gray-500 max-w-2xl text-base md:text-lg leading-relaxed">
              Select your domain to explore technical capabilities, architectural blueprints, process workflows, and transparent deliverables.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {solutionsData.map((solution, index) => {
              const IconComponent = iconMap[solution.icon] || Rocket;
              const isFeatured = index === 0 || index === 5;

              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                  className={`group relative bg-white rounded-[2.2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col justify-between overflow-hidden ${
                    isFeatured ? 'lg:col-span-2 bg-gradient-to-br from-white via-white to-gray-50' : ''
                  }`}
                >
                  {/* Subtle Background Glow */}
                  <div
                    className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full blur-[70px] opacity-[0.05] group-hover:opacity-[0.14] transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: solution.color }}
                  />

                  <div>
                    {/* Card Top */}
                    <div className="flex justify-between items-start mb-8">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm bg-[#F6F6F6] group-hover:bg-black group-hover:text-white transition-all duration-300"
                        style={{ color: solution.color }}
                      >
                        <IconComponent className="w-7 h-7" />
                      </div>

                      <span className="text-xs font-bold tracking-widest text-gray-300 uppercase">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl lg:text-3xl font-semibold mb-4 text-black tracking-tight"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {solution.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
                      {solution.description}
                    </p>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {solution.features.slice(0, isFeatured ? 4 : 3).map((feature, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-3.5 py-1.5 bg-[#F6F6F6] rounded-full text-[11px] font-semibold text-gray-700 border border-gray-200/60 group-hover:border-black transition-colors duration-300 tracking-wide"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom / Footer Link */}
                  <div className="border-t border-gray-100 pt-6 flex items-center justify-between mt-auto">
                    {solution.stats?.[0] ? (
                      <div>
                        <span className="text-xl font-bold text-black" style={{ color: solution.color }}>
                          {solution.stats[0].value}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider block">
                          {solution.stats[0].label}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Production Ready
                      </span>
                    )}

                    <Link
                      href={`/solutions/${solution.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black group-hover:text-[#DE5D26] transition-colors duration-300"
                    >
                      Explore Solution
                      <div className="w-8 h-8 rounded-full bg-black text-white group-hover:bg-[#DE5D26] flex items-center justify-center transition-all duration-300 transform group-hover:rotate-45">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ─── 4. SEO DEEP-DIVE KEYWORD SECTION ──────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-[0.2em] mb-4 inline-block">
              Custom Software Engineering
            </span>
            <h2
              className="text-3xl md:text-5xl font-medium text-black mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              On-Demand App & Platform Development Company
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Twofloww is a full-service software development agency delivering high-performance mobile and web solutions. We specialize in building scalable on-demand applications, enterprise cloud architectures, and AI-driven business platforms tailored to your growth objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Food Delivery Apps',
                desc: 'Multi-vendor marketplaces, driver GPS tracking, real-time order dispatching, and restaurant management portals.',
                slug: 'food-delivery-app-development',
              },
              {
                title: 'Grocery & Quick Commerce',
                desc: '10-minute delivery apps, dark store inventory control, slot scheduling, and real-time stock sync.',
                slug: 'grocery-delivery-app-development',
              },
              {
                title: 'Ride-Hailing & Taxi Platforms',
                desc: 'Real-time dispatch algorithms, surge pricing, driver onboarding workflows, and trip analytics.',
                slug: 'taxi-app-development',
              },
              {
                title: 'Fitness & Health Tech',
                desc: 'AI workout personalization, wearable sensor integration (Apple HealthKit, Google Fit), and trainer video portals.',
                slug: 'fitness-gym-app-development',
              },
              {
                title: 'FinTech & Digital Wallets',
                desc: 'RBI & PCI-DSS compliant payment gateways, instant money transfers, lending algorithms, and Web3 solutions.',
                slug: 'fintech-innovation',
              },
              {
                title: 'Enterprise AI & Automation',
                desc: 'Custom LLM fine-tuning, workflow automation pipelines, predictive analytics, and legacy microservices refactoring.',
                slug: 'ai-machine-learning',
              },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={`/solutions/${item.slug}`}
                className="group bg-[#F8F9FA] rounded-2xl p-7 border border-gray-100 hover:bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3
                    className="text-lg font-bold text-black mb-3 group-hover:text-[#DE5D26] transition-colors"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                </div>
                <span className="text-xs font-bold text-black flex items-center gap-2 group-hover:text-[#DE5D26] transition-colors">
                  Learn More Architecture <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ─── 5. WHY CHOOSE US ───────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 bg-black rounded-sm" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">Why TwoFloww</span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-medium text-black tracking-tight mb-8"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.03em' }}
              >
                Why Leaders Trust Us With Their Core Software
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8">
                We combine deep technical expertise with strategic product design. Our engineering team builds resilient, production-ready codebases that allow you to launch fast and iterate without rewriting your infrastructure.
              </p>

              <div className="space-y-4">
                {[
                  'Clean code architecture adhering to modern industry standards',
                  'Dedicated Project Manager & transparent sprint reporting',
                  'Post-launch SLA support, maintenance & performance monitoring',
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#DE5D26] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-gray-700">{point}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={openConsultModal}
                className="mt-10 inline-flex items-center gap-4 bg-black text-white rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 group cursor-pointer"
              >
                <span className="font-bold text-xs tracking-widest uppercase">Schedule Technical Audit</span>
                <div className="w-9 h-9 rounded-full bg-[#C3F53C] flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: '50+', label: 'Apps & Platforms Shipped' },
                { value: '99.9%', label: 'Uptime & Reliability' },
                { value: '35%', label: 'Average Conversion Lift' },
                { value: '100%', label: 'On-Time Sprint Delivery' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200/80 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="text-4xl font-bold text-black mb-2"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ─── 6. CTA BANNER SECTION ──────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white max-w-[1400px] mx-auto overflow-hidden">
        <div className="relative w-full rounded-[2.5rem] bg-[#0B0D17] overflow-hidden min-h-[400px] lg:min-h-[440px] flex items-center p-8 lg:p-16 text-white shadow-2xl">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#DE5D26]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-xs text-[#C3F53C] font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Let's Build
              </span>

              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] mb-6"
                style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}
              >
                Ready to engineer your next digital breakthrough?
              </h2>

              <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-8 max-w-md">
                Schedule a consultation with our senior solutions architect. We will evaluate your scope, propose an optimal tech stack, and deliver a detailed quote within 24 hours.
              </p>

              <button
                onClick={openConsultModal}
                className="flex items-center gap-4 bg-[#C3F53C] text-black rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 shadow-xl group cursor-pointer"
              >
                <span className="font-bold text-xs tracking-widest uppercase">Get Started Today</span>
                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* Right Card Graphic */}
            <div className="relative h-[280px] hidden lg:flex items-center justify-center">
              <div className="w-[300px] bg-white text-black rounded-3xl p-7 shadow-2xl border border-gray-100 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-bold text-base">Growth Engine</h4>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Enterprise Performance</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#C3F53C] flex items-center justify-center text-black">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-black tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    +120%
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-1">Efficiency & Scale Boost</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-700">Scalable</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-700">Modern</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-700">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. SEO CONTENT SECTION ─────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto prose prose-gray max-w-none">
          <h2
            className="text-3xl md:text-4xl font-semibold text-black mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            India&rsquo;s Leading On-Demand App &amp; Software Development Company
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            Twofloww is a full-service on-demand app development company based in India, serving clients across Delhi NCR, Mumbai, Bangalore, Noida, the USA, UK, UAE, Canada, and Australia. We specialize in building production-ready digital products — from food delivery apps and taxi booking platforms to enterprise-grade AI automation and FinTech solutions. With 50+ shipped apps and platforms, our engineering team delivers end-to-end product development at startup speed with enterprise reliability.
          </p>

          <h2
            className="text-2xl md:text-3xl font-semibold text-black mb-3 tracking-tight mt-12"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Our Complete Digital Product Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="text-lg font-bold text-black mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                <Link href="/solutions/food-delivery-app-development" className="hover:text-[#DE5D26] transition-colors">
                  Food Delivery App Development
                </Link>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We build multi-vendor food delivery platforms similar to Swiggy and Zomato — complete with real-time GPS tracking, driver dispatch, restaurant management portals, and payment gateway integration. Ideal for food-tech startups and enterprise restaurant chains.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-black mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                <Link href="/solutions/grocery-delivery-app-development" className="hover:text-[#DE5D26] transition-colors">
                  Grocery &amp; Quick Commerce App Development
                </Link>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                10-minute delivery apps, dark store management, real-time inventory sync, and slot scheduling — engineered for the speed demands of modern quick commerce (q-commerce) businesses.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-black mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                <Link href="/solutions/taxi-app-development" className="hover:text-[#DE5D26] transition-colors">
                  Taxi Booking &amp; Ride-Hailing App Development
                </Link>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Full-featured taxi and cab booking platforms with real-time dispatch algorithms, surge pricing engines, driver onboarding workflows, and trip analytics dashboards. Uber-like app development tailored for your market.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-black mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                <Link href="/solutions/fitness-gym-app-development" className="hover:text-[#DE5D26] transition-colors">
                  Fitness &amp; Health Tech App Development
                </Link>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                AI-powered workout personalization, wearable integration (Apple HealthKit, Google Fit), live trainer sessions, and gym management portals — helping health-tech startups build engaging, sticky fitness apps.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-black mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                <Link href="/solutions/fintech-innovation" className="hover:text-[#DE5D26] transition-colors">
                  FinTech &amp; Digital Wallet App Development
                </Link>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                RBI and PCI-DSS compliant payment gateways, instant money transfer platforms, digital lending algorithms, and Web3 financial solutions — built to global security standards for India, USA, UK, and UAE markets.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-black mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                <Link href="/solutions/ai-machine-learning" className="hover:text-[#DE5D26] transition-colors">
                  AI &amp; Enterprise Automation Solutions
                </Link>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Custom LLM fine-tuning, workflow automation pipelines, predictive analytics dashboards, and legacy microservices refactoring — helping enterprises reduce operational costs by up to 60% with intelligent automation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-black mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                <Link href="/solutions/ecommerce-solutions" className="hover:text-[#DE5D26] transition-colors">
                  E-Commerce App &amp; Platform Development
                </Link>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Headless Shopify Plus storefronts, custom Next.js e-commerce engines, multi-currency checkout, and conversion-optimized product pages — delivering sub-second load times and 35%+ average conversion rate lifts.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-black mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                <Link href="/solutions/startup-acceleration" className="hover:text-[#DE5D26] transition-colors">
                  Startup MVP &amp; Acceleration
                </Link>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                From napkin sketch to investor-ready product in 6–10 weeks. We act as your technical co-founder — rapid prototyping, scalable cloud architecture, and live demo environments for fundraising rounds.
              </p>
            </div>
          </div>

          <h2
            className="text-2xl md:text-3xl font-semibold text-black mb-3 tracking-tight mt-14"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Why Choose Twofloww as Your On-Demand App Development Partner?
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            As a top-rated on-demand app development company in India, Twofloww has a proven track record of shipping over 50 digital products across 10+ verticals. Our clients benefit from:
          </p>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2 leading-relaxed">
            <li><strong>Speed</strong> — Average MVP delivery in 6–10 weeks using our battle-tested agile process.</li>
            <li><strong>Scalability</strong> — Microservices-first architecture that handles millions of concurrent users without expensive rewrites.</li>
            <li><strong>Compliance</strong> — RBI, GDPR, PCI-DSS, and App Store guideline compliant apps for regulated industries.</li>
            <li><strong>Transparency</strong> — Dedicated project manager, weekly sprint demos, and full source code ownership.</li>
            <li><strong>Post-Launch Support</strong> — SLA-backed maintenance, uptime monitoring, and quarterly architecture reviews.</li>
            <li><strong>Global Reach</strong> — We serve startups and enterprises in India, USA, UK, UAE, Canada, and Australia.</li>
          </ul>

          <p className="text-gray-500 text-sm leading-relaxed mt-8">
            Whether you are looking for a <strong>food delivery app development company in India</strong>, a <strong>taxi app development company in Delhi NCR</strong>, or an <strong>enterprise digital transformation partner in Noida</strong> — Twofloww has the engineering depth and product intuition to deliver results. <Link href="/contact" className="text-[#DE5D26] font-semibold hover:underline">Contact us today for a free technical consultation.</Link>
          </p>
        </div>
      </section>

    </main>
  );
}
