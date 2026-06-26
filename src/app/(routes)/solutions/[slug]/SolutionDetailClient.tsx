'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { openConsultModal } from '@/components/ConsultModal';
import {
  Rocket,
  Building2,
  ShoppingCart,
  Wallet,
  Activity,
  BrainCircuit,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>> = {
  Rocket,
  Building2,
  ShoppingCart,
  Wallet,
  Activity,
  BrainCircuit,
};

interface Benefit {
  title: string;
  description: string;
}

interface Stat {
  label: string;
  value: string;
}

interface Solution {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  benefits: Benefit[];
  stats: Stat[];
}

export default function SolutionDetailClient({ solution }: { solution: Solution }) {
  const IconComponent = iconMap[solution.icon] || Rocket;

  // 3D Tilt Hook for Hero Image Card
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXRaw = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateYRaw = useTransform(mouseX, [0, 1], [-15, 15]);

  const rotateX = useSpring(rotateXRaw, { damping: 25, stiffness: 120 });
  const rotateY = useSpring(rotateYRaw, { damping: 25, stiffness: 120 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xVal = (e.clientX - rect.left) / width;
    const yVal = (e.clientY - rect.top) / height;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Parallax shifts for absolute elements in the 3D card
  const glowX = useTransform(mouseX, [0, 1], [20, -20]);
  const glowY = useTransform(mouseY, [0, 1], [20, -20]);

  return (
    <div className="bg-[#FAFAFA] text-[#0B0D17] min-h-screen selection:bg-[#DE5D26]/20 selection:text-[#DE5D26] font-sans overflow-x-hidden">
      
      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center px-4 sm:px-6 pt-28 sm:pt-36 pb-14 sm:pb-20 overflow-hidden bg-white border-b border-zinc-100 select-none">
        
        {/* dot-grid background */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(circle, #E5E7EB 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* ambient glows */}
        <div className="absolute top-0 right-10 w-[450px] h-[450px] rounded-full bg-blue-500/[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[550px] h-[550px] rounded-full bg-orange-500/[0.03] blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Side: Header & Context */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-400 mb-8 font-semibold tracking-wide uppercase">
                <Link href="/" className="hover:text-[#DE5D26] transition-colors">Home</Link>
                <span>/</span>
                <Link href="/solutions" className="hover:text-[#DE5D26] transition-colors">Solutions</Link>
                <span>/</span>
                <span className="text-zinc-900 font-bold">{solution.title}</span>
              </nav>

              {/* Tagline */}
              <div className="inline-flex items-center gap-2 text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4" />
                Capabilities Showcase
              </div>

              {/* Title */}
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8 text-[#0B0D17]"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {solution.title}
              </h1>

              {/* Intro Description */}
              <p className="text-zinc-500 text-lg sm:text-xl max-w-2xl leading-relaxed mb-12 font-medium">
                {solution.description}
              </p>

              {/* Action Button */}
              <div>
                <button
                  onClick={openConsultModal}
                  className="relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#0B0D17] text-white font-bold rounded-full overflow-hidden group text-sm tracking-wide shadow-xl shadow-[#0B0D17]/15 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#DE5D26] transition-transform duration-300 ease-out transform -translate-x-full group-hover:translate-x-0" />
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Free Consultation
                    <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side: Interactive 3D Card Graphic — desktop only */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-center py-8">
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative cursor-pointer select-none"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="w-72 h-72 sm:w-80 sm:h-80 rounded-[45px] shadow-2xl border border-white/25 flex items-center justify-center relative transition-shadow duration-500 hover:shadow-3xl bg-zinc-950"
                >
                  {/* Floating glass overlay panel inside the card */}
                  <div
                    className="absolute inset-4 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm pointer-events-none"
                    style={{ transform: 'translateZ(25px)' }}
                  />

                  {/* 3D Floating Icon Element */}
                  <div
                    className="relative z-10 flex items-center justify-center text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.35)]"
                    style={{ transform: 'translateZ(60px)' }}
                  >
                    <IconComponent className="w-36 h-36" strokeWidth={1.2} />
                  </div>

                  {/* Parallax shifting glow in background */}
                  <motion.div
                    style={{
                      x: glowX,
                      y: glowY,
                      backgroundColor: solution.color,
                      transform: 'translateZ(-20px)',
                    }}
                    className="absolute inset-0 rounded-[45px] opacity-[0.2] blur-3xl pointer-events-none"
                  />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TRUST BAR / STATS ────────────────────────────────────────────── */}
      <section className="relative z-20 mt-0 lg:-mt-10 px-6 select-none">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {solution.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white border border-zinc-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-zinc-200 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <span
                  className="text-2xl sm:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 transition-transform duration-300 group-hover:scale-105"
                  style={{ color: solution.color, fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {stat.value}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-center leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT TIMELINE / CAPABILITIES ────────────────────────────────── */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Sticky Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 self-start select-none">
              <span className="inline-flex items-center gap-2 border border-zinc-200 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-[10px] text-[#DE5D26] font-bold uppercase tracking-widest mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Technical Depth
              </span>
              <h2
                className="text-4xl md:text-5xl font-black tracking-tight text-[#0B0D17] leading-none mb-6"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Core Capabilities
              </h2>
              <p className="text-zinc-500 text-base leading-relaxed">
                Our implementation processes are built around security, speed, and standard-compliant architectures. 
                Explore the key architectural traits and features integrated into this solution.
              </p>
              
              {/* Decorative accent graphic */}
              <div className="mt-8 flex gap-3">
                <div className="h-1.5 w-16 bg-[#DE5D26] rounded-full" />
                <div className="h-1.5 w-8 bg-zinc-300 rounded-full" />
              </div>
            </div>

            {/* Right Scrolling Column (List of features) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {solution.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-zinc-100 rounded-3xl p-8 hover:border-[#DE5D26]/20 transition-all duration-300 group flex items-start gap-5 shadow-[0_12px_30px_rgba(0,0,0,0.015)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0 text-[#DE5D26] group-hover:bg-[#DE5D26] group-hover:text-white transition-colors duration-300">
                    <Check className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B0D17] mb-2 leading-snug">
                      {feature}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      Custom, enterprise-grade execution using modern tooling. Built for modularity, clean 
                      separation of concerns, and ease of future scaling.
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── VALUE PROPOSITION / BENEFITS ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-20 text-center max-w-2xl mx-auto select-none">
            <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4 inline-block">
              Business Impact
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black text-[#0B0D17]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Key Business Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solution.benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-[#FAFAFA] border border-zinc-100 rounded-[2rem] sm:rounded-[2.2rem] p-6 sm:p-10 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.01)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.04)] hover:bg-white hover:border-zinc-200 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Giant number outline background */}
                <span
                  className="absolute right-6 top-4 text-7xl font-black text-zinc-100/50 group-hover:text-zinc-200/50 transition-colors pointer-events-none select-none"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  0{i + 1}
                </span>

                <div className="relative z-10">
                  <h3
                    className="font-black text-[#0B0D17] text-2xl mb-4 group-hover:text-[#DE5D26] transition-colors duration-300 leading-tight"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-8 relative z-10 flex items-center gap-1.5 text-xs font-bold text-zinc-400 group-hover:text-[#DE5D26] transition-colors duration-300">
                  Value Engineered
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAFAFA] relative z-20">
        <div className="max-w-6xl mx-auto bg-[#0B0D17] rounded-[2rem] lg:rounded-[3.5rem] p-8 sm:p-14 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#DE5D26] opacity-[0.08] rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 opacity-[0.08] rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center select-none">
            <span className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2 text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Collaborate
            </span>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Partner on Your <br className="hidden md:inline" />
              Next Venture
            </h2>

            <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">
              Connect with our design and development leads. Let's discuss your current operational roadblocks and engineer solutions together.
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
