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
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Rocket,
  Building2,
  ShoppingCart,
  Wallet,
  Activity,
  BrainCircuit,
};

export default function SolutionsClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for desktop horizontal scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate precise translation: 6 cards (420px) + gaps + padding = 3056px
  const xTransform = useTransform(scrollYProgress, [0, 1], ['0px', '-3056px']);
  const x = useSpring(xTransform, { damping: 20, stiffness: 90, mass: 0.5 });

  return (
    <div className="relative selection:bg-[#DE5D26]/20 selection:text-[#DE5D26] bg-[#FAFAFA]">
      
      {/* ─── DESKTOP LAYOUT (Horizontal Scroll) ────────────────────────── */}
      <div ref={containerRef} className="hidden md:block h-[400vh] relative">
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
                  Discover tailored digital engineering and architectures tailored for startups, 
                  fintech innovations, enterprise transformation, and AI applications.
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
                  Scroll Down to Explore
                </motion.div>
              </div>
            </div>

            {/* 2. CARDS TRACK */}
            <div className="flex items-center gap-[64px] pl-[96px] pr-[120px] h-full">
              {solutionsData.map((solution, index) => {
                const IconComponent = iconMap[solution.icon] || Rocket;

                // Staircase offset layout
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
                        0{index + 1}
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
                        <h3
                          className="text-3xl font-black text-[#0B0D17] mb-4 tracking-tight"
                          style={{ fontFamily: 'var(--font-space-grotesk)' }}
                        >
                          {solution.title}
                        </h3>

                        {/* Description */}
                        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                          {solution.description}
                        </p>

                        {/* Staggered mini tags on hover */}
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

                        <div
                          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-zinc-50 text-zinc-900 group-hover:bg-zinc-950 group-hover:text-white transition-all duration-300 border border-zinc-100 group-hover:border-zinc-950 shadow-sm"
                        >
                          <ArrowRight className="w-4.5 h-4.5 transform group-hover:translate-x-0.5 transition-transform" />
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
          <h2
            className="text-4xl font-black tracking-tight text-[#0B0D17] leading-none mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Architectures <br />
            Engineered to Dominate
          </h2>
          <p className="text-zinc-500 text-base leading-relaxed">
            Discover tailored digital engineering and architectures tailored for startups, 
            fintech innovations, enterprise transformation, and AI applications.
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

                    <h3
                      className="text-2xl font-black text-[#0B0D17] mb-3 tracking-tight"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {solution.title}
                    </h3>

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

      {/* ─── CTA SECTION ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAFAFA] relative z-20">
        <div className="max-w-6xl mx-auto bg-[#0B0D17] rounded-[2.5rem] lg:rounded-[3.5rem] p-10 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          
          {/* Decorative CTA ambient glows */}
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
              consultation today to explore your options.
            </p>

            <button
              onClick={openConsultModal}
              className="relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#DE5D26] text-white font-bold rounded-full overflow-hidden group text-sm tracking-wide shadow-xl shadow-[#DE5D26]/20 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-white/10 transition-transform duration-300 ease-out transform -translate-x-full group-hover:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2">
                Schedule a Consultation
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
