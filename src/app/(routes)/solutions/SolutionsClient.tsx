'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, ArrowDown } from 'lucide-react';
import { openConsultModal } from '@/components/ConsultModal';
import { solutionsData } from '@/data/solutions';
import {
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
} from 'lucide-react';

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

// 13 cards: 13×420 + 12×64 (gaps) + 96 (pl) + 120 (pr) = 6444px
const TRACK_WIDTH = 6444;

export default function SolutionsClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ['0px', `-${TRACK_WIDTH}px`]);
  const x = useSpring(xTransform, { damping: 20, stiffness: 90, mass: 0.5 });

  return (
    <div className="relative selection:bg-[#DE5D26]/20 selection:text-[#DE5D26] bg-[#FAFAFA]">

      {/* ─── DESKTOP LAYOUT (Horizontal Scroll) ────────────────────────── */}
      {/* h-[870vh] proportional to 13 cards (was 400vh for 6) */}
      <div ref={containerRef} className="hidden md:block h-[870vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-[#FAFAFA]">

          {/* Background Ambient Glowing Blobs */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/[0.02] blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[700px] h-[700px] rounded-full bg-blue-500/[0.02] blur-[180px] pointer-events-none" />

          {/* Scrolling Rail */}
          <motion.div
            style={{ x, willChange: 'transform' }}
            className="flex items-center h-full whitespace-nowrap"
          >
            {/* 1. HERO SLIDE (100vw) */}
            <div className="w-screen h-full shrink-0 flex flex-col justify-center px-12 lg:px-24 relative select-none">

              {/* dot-grid background just for hero slide */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage: 'radial-gradient(circle, #E5E7EB 1.5px, transparent 1.5px)',
                  backgroundSize: '32px 32px',
                }}
              />

              <div className="relative z-10 max-w-5xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="inline-flex items-center gap-2 border border-zinc-200 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-8 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Advanced Capabilities
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                  className="text-6xl lg:text-8xl font-black tracking-tight leading-[1.05] text-[#0B0D17] mb-8"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  We Architect Digital <br />
                  Systems that{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B0D17] to-[#DE5D26]">
                    Scale & Dominate
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  className="text-zinc-500 text-xl lg:text-2xl max-w-3xl leading-relaxed font-medium mb-12 whitespace-normal"
                >
                  From food delivery apps and taxi booking platforms to fintech, astrology, and dating apps —
                  we build digital products that rank, retain, and grow.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-400"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  >
                    <ArrowDown className="w-4 h-4 text-[#DE5D26]" />
                  </motion.div>
                  Scroll Down to Explore {solutionsData.length} Solutions
                </motion.div>
              </div>
            </div>

            {/* 2. CARDS TRACK */}
            <div className="flex items-center gap-[64px] pl-[96px] pr-[120px] h-full">
              {solutionsData.map((solution, index) => {
                const IconComponent = iconMap[solution.icon] || Rocket;

                let offsetStyle = {};
                if (index % 3 === 0) {
                  offsetStyle = { transform: 'translateY(-60px)' };
                } else if (index % 3 === 1) {
                  offsetStyle = { transform: 'translateY(60px)' };
                } else {
                  offsetStyle = { transform: 'translateY(0px)' };
                }

                return (
                  <div
                    key={solution.id}
                    style={offsetStyle}
                    className="shrink-0 w-[420px] h-[520px] relative transition-transform duration-500"
                  >
                    <Link
                      href={`/solutions/${solution.slug}`}
                      className="group block relative w-full h-full bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.015)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.07)] transition-all duration-500 flex flex-col justify-between overflow-hidden"
                    >
                      {/* Interactive Hover Glow Background */}
                      <div
                        className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[80px] opacity-[0.03] group-hover:opacity-[0.09] transition-opacity duration-500 pointer-events-none"
                        style={{ backgroundColor: solution.color }}
                      />

                      {/* Large Background Graphic Number */}
                      <span
                        className="absolute right-8 top-6 text-[8rem] font-black leading-none text-zinc-50 select-none pointer-events-none group-hover:text-zinc-100/40 transition-colors duration-500"
                        style={{ fontFamily: 'var(--font-unbounded)' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Content Area */}
                      <div className="relative z-10 whitespace-normal">
                        {/* Dynamic Colored Icon */}
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-zinc-100 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-white"
                          style={{ color: solution.color }}
                        >
                          <IconComponent className="w-7 h-7" />
                        </div>

                        {/* Title */}
                        <h2
                          className="text-2xl font-black text-[#0B0D17] mb-4 tracking-tight leading-tight"
                          style={{ fontFamily: 'var(--font-space-grotesk)' }}
                        >
                          {solution.title}
                        </h2>

                        {/* Description */}
                        <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                          {solution.description}
                        </p>

                        {/* Feature tags */}
                        <div className="flex flex-wrap gap-2">
                          {solution.features.slice(0, 2).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-bold tracking-wide uppercase px-3.5 py-1.5 bg-zinc-50 border border-zinc-100 rounded-full text-zinc-500 group-hover:bg-zinc-100/50 transition-colors"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Info Area */}
                      <div className="border-t border-zinc-100 pt-6 mt-auto flex items-center justify-between z-10">
                        <div>
                          <div
                            className="text-2xl font-black"
                            style={{ color: solution.color, fontFamily: 'var(--font-space-grotesk)' }}
                          >
                            {solution.stats[0].value}
                          </div>
                          <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                            {solution.stats[0].label}
                          </div>
                        </div>

                        <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-zinc-50 text-zinc-900 group-hover:bg-zinc-950 group-hover:text-white transition-all duration-300 border border-zinc-100 group-hover:border-zinc-950 shadow-sm">
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── MOBILE LAYOUT (Vertical Stack) ───────────────────────────── */}
      <div className="block md:hidden px-6 py-24 bg-[#FAFAFA]">
        <div className="mb-16 select-none">
          <span className="inline-flex items-center gap-2 border border-zinc-200 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-[10px] text-[#DE5D26] font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles className="w-3 h-3" />
            Our Solutions
          </span>
          <h1
            className="text-4xl font-black tracking-tight text-[#0B0D17] leading-none mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Architectures <br />
            Engineered to Dominate
          </h1>
          <p className="text-zinc-500 text-base leading-relaxed">
            Food delivery apps, taxi platforms, fintech, astrology, fitness, matrimonial &
            dating apps — and much more. We build digital products that rank and grow.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {solutionsData.map((solution, index) => {
            const IconComponent = iconMap[solution.icon] || Rocket;

            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="block relative bg-white rounded-3xl p-8 border border-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.01)] overflow-hidden"
                >
                  <div
                    className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full blur-[60px] opacity-[0.04]"
                    style={{ backgroundColor: solution.color }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-zinc-100 shadow-sm bg-white"
                      style={{ color: solution.color }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <h2
                      className="text-xl font-black text-[#0B0D17] mb-3 tracking-tight"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {solution.title}
                    </h2>

                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                      {solution.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {solution.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-bold tracking-wide uppercase px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full text-zinc-500"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-zinc-100 pt-5 mt-6 flex items-center justify-between">
                      <div>
                        <div
                          className="text-xl font-black"
                          style={{ color: solution.color, fontFamily: 'var(--font-space-grotesk)' }}
                        >
                          {solution.stats[0].value}
                        </div>
                        <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                          {solution.stats[0].label}
                        </div>
                      </div>

                      <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: solution.color }}>
                        Explore
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ─── SEO KEYWORD SECTION ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-zinc-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4 inline-block">
              What We Build
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-[#0B0D17] mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              On-Demand App Development Company India
            </h2>
            <p className="text-zinc-500 text-lg max-w-3xl mx-auto leading-relaxed">
              Twofloww is a leading on-demand app development company in India, delivering production-grade
              mobile and web applications across food delivery, grocery, ride-hailing, fitness, fintech,
              and niche markets. Our cross-platform teams ship apps faster and at a fraction of the cost
              of in-house development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Food Delivery App Development",
                desc: "Build Zomato & Swiggy-like food ordering apps with real-time GPS tracking, multi-restaurant marketplace, driver app, and restaurant dashboard.",
                slug: "food-delivery-app-development",
                keywords: "food delivery app development company"
              },
              {
                title: "Grocery Delivery App Development",
                desc: "Quick commerce apps with 10-minute delivery, real-time inventory, dark store management, and slot-based scheduling.",
                slug: "grocery-delivery-app-development",
                keywords: "grocery delivery app development"
              },
              {
                title: "Taxi & Cab Booking App Development",
                desc: "Ola/Uber-like ride-hailing apps with real-time dispatch, surge pricing, driver onboarding, and fleet management.",
                slug: "taxi-app-development",
                keywords: "taxi app development company"
              },
              {
                title: "Fitness & Gym App Development",
                desc: "Personalized workout tracking apps with AI training plans, wearable sync, live video classes, and gamified progress tracking.",
                slug: "fitness-gym-app-development",
                keywords: "fitness app development company"
              },
              {
                title: "Astrology App Development",
                desc: "Kundli generators, daily horoscopes, live astrologer consultation marketplaces, and Vedic astrology platforms.",
                slug: "astrology-app-development",
                keywords: "astrology app development company"
              },
              {
                title: "Dating App Development",
                desc: "AI-driven dating apps with smart matching algorithms, swipe mechanics, video speed dating, safety features, and freemium monetization.",
                slug: "dating-app-development",
                keywords: "dating app development company"
              },
            ].map((item) => (
              <Link
                key={item.slug}
                href={`/solutions/${item.slug}`}
                className="group bg-[#FAFAFA] border border-zinc-100 rounded-2xl p-7 hover:bg-white hover:border-zinc-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300"
              >
                <h3
                  className="text-lg font-black text-[#0B0D17] mb-3 group-hover:text-[#DE5D26] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                <span className="text-xs font-bold text-[#DE5D26] flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4 inline-block">
                Why Twofloww
              </span>
              <h2
                className="text-4xl md:text-5xl font-black text-[#0B0D17] mb-6 tracking-tight leading-none"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                The Best On-Demand App Development Company in India
              </h2>
              <p className="text-zinc-500 text-base leading-relaxed mb-8">
                We are not a typical IT outsourcing firm. Twofloww is a product-focused app development
                company that understands go-to-market, user retention, and revenue growth — not just code.
                Our apps are built to rank on the App Store, convert users, and scale without breaking.
              </p>
              <button
                onClick={openConsultModal}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0B0D17] text-white font-bold rounded-full text-sm tracking-wide hover:bg-[#DE5D26] transition-colors duration-300 cursor-pointer"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { value: "150+", label: "Apps Delivered", color: "#EF4444" },
                { value: "5+", label: "Years Experience", color: "#6C5CE7" },
                { value: "98%", label: "Client Satisfaction", color: "#10B981" },
                { value: "30+", label: "Engineers", color: "#F59E0B" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white border border-zinc-100 rounded-2xl p-7 shadow-[0_8px_20px_rgba(0,0,0,0.02)]"
                >
                  <div
                    className="text-4xl font-black mb-2"
                    style={{ color: stat.color, fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAFAFA] relative z-20">
        <div className="max-w-6xl mx-auto bg-[#0B0D17] rounded-[2.5rem] lg:rounded-[3.5rem] p-10 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">

          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#DE5D26] opacity-[0.08] rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 opacity-[0.08] rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center select-none">
            <span className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2 text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Get In Touch
            </span>

            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Ready to scale <br className="hidden md:inline" />
              your business?
            </h2>

            <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed whitespace-normal">
              Partner with our team of elite developers and digital architects. Schedule a
              consultation today and get a free project estimate within 24 hours.
            </p>

            <button
              onClick={openConsultModal}
              className="relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#DE5D26] text-white font-bold rounded-full overflow-hidden group text-sm tracking-wide shadow-xl shadow-[#DE5D26]/20 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-white/10 transition-transform duration-300 ease-out transform -translate-x-full group-hover:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2">
                Schedule a Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
