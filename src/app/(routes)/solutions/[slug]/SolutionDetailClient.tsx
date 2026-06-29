'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { openConsultModal } from '@/components/ConsultModal';
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

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number; strokeWidth?: number; style?: React.CSSProperties }>> = {
  Rocket, Building2, ShoppingCart, Wallet, Activity, BrainCircuit,
  UtensilsCrossed, ShoppingBasket, Car, Dumbbell, Star, Users, Heart,
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
}

/* ─── FAQ accordion ─────────────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-100 rounded-2xl overflow-hidden bg-white shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
      >
        <span className="font-bold text-[#0B0D17] text-base leading-snug">{q}</span>
        <ChevronDown
          className="w-5 h-5 shrink-0 transition-transform duration-300 text-zinc-400"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {open && (
        <div className="px-7 pb-6 text-zinc-500 text-sm leading-relaxed border-t border-zinc-50">
          <div className="pt-4">{a}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Single capability card ─────────────────────────────────────────────── */
function CapabilityCard({
  feature, index, total, color, onActivate,
}: {
  feature: string; index: number; total: number; color: string;
  onActivate: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onActivate(index); },
      { rootMargin: '-20% 0px -55% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, onActivate]);

  return (
    <motion.div
      id={`cap-${index}`}
      ref={ref}
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-[2rem] border border-zinc-100 overflow-hidden
        min-h-[130px] flex items-center
        shadow-[0_4px_20px_rgba(0,0,0,0.02)]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        hover:border-zinc-200 hover:-translate-y-0.5
        transition-all duration-400 cursor-default"
    >
      {/* left accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] group-hover:w-1 opacity-50 group-hover:opacity-100 transition-all duration-300 rounded-r-full group-hover:rounded-none"
        style={{ backgroundColor: color }}
      />

      {/* ghost number */}
      <div aria-hidden className="absolute right-2 top-0 bottom-0 flex items-center pointer-events-none">
        <span
          className="text-[8rem] font-black leading-none select-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500"
          style={{ fontFamily: 'var(--font-unbounded)', color }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="relative z-10 flex items-center gap-5 px-8 py-8 w-full">
        {/* colored badge */}
        <div
          className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white text-[11px] font-black shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
          style={{ backgroundColor: color }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
            Capability · {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <h3
            className="text-xl lg:text-2xl font-black text-[#0B0D17] leading-snug truncate group-hover:text-clip"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {feature}
          </h3>
        </div>

        <ArrowRight className="w-5 h-5 text-zinc-200 group-hover:text-zinc-500 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
      </div>
    </motion.div>
  );
}

/* ─── Core Capabilities section (own component so it can use hooks) ──────── */
function CoreCapabilities({ solution }: { solution: Solution }) {
  const [active, setActive] = useState(0);
  const IconComp = iconMap[solution.icon] || Rocket;
  const total = solution.features.length;

  const handleActivate = useCallback((i: number) => setActive(i), []);

  const jumpTo = (i: number) => {
    document.getElementById(`cap-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ── LEFT STICKY PANEL ───────────────────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">

            {/* section header */}
            <span className="inline-flex items-center gap-2 border border-zinc-200 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-[10px] text-[#DE5D26] font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Technical Depth
            </span>

            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-[#0B0D17] leading-none mb-4"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Core<br />Capabilities
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
              Every feature is engineered for performance, security, and long-term scalability — built
              on battle-tested, production-grade foundations.
            </p>

            {/* ── ACTIVE FEATURE CARD ──────────────────────────────────── */}
            <div className="relative rounded-2xl border border-zinc-100 bg-white overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] mb-6">
              {/* top colored stripe */}
              <div className="h-1 w-full" style={{ backgroundColor: solution.color }} />

              {/* ghost icon backdrop */}
              <div aria-hidden className="absolute inset-0 flex items-center justify-end pr-4 pointer-events-none">
                <IconComp
                  className="w-28 h-28 opacity-[0.04]"
                  style={{ color: solution.color } as React.CSSProperties}
                />
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <span
                      className="text-5xl font-black leading-none block mb-3"
                      style={{ color: solution.color, fontFamily: 'var(--font-unbounded)' }}
                    >
                      {String(active + 1).padStart(2, '0')}
                    </span>
                    <p
                      className="text-base font-black text-[#0B0D17] leading-snug"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {solution.features[active]}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* progress bar */}
                <div className="mt-5 h-[3px] bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: solution.color }}
                    animate={{ width: `${((active + 1) / total) * 100}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Currently Viewing</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: solution.color }}>
                    {active + 1} / {total}
                  </span>
                </div>
              </div>
            </div>

            {/* ── DOT NAVIGATOR ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-[5px]">
              {solution.features.map((feat, i) => (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  className={`flex items-center gap-2.5 text-left w-full py-1 group/nav transition-all duration-200 rounded-lg px-2 hover:bg-zinc-50`}
                >
                  {/* dot */}
                  <span
                    className="shrink-0 rounded-full transition-all duration-250"
                    style={{
                      width: i === active ? 20 : 6,
                      height: 6,
                      backgroundColor: i === active ? solution.color : '#E4E4E7',
                    }}
                  />
                  {/* label */}
                  <span
                    className={`text-[11px] font-bold truncate transition-colors duration-200 ${
                      i === active ? 'text-[#0B0D17]' : 'text-zinc-400 group-hover/nav:text-zinc-600'
                    }`}
                  >
                    {feat}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT CARDS ─────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {solution.features.map((feature, idx) => (
              <CapabilityCard
                key={idx}
                feature={feature}
                index={idx}
                total={total}
                color={solution.color}
                onActivate={handleActivate}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Main page component ────────────────────────────────────────────────── */
export default function SolutionDetailClient({ solution }: { solution: Solution }) {
  const IconComponent = iconMap[solution.icon] || Rocket;

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
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const glowX = useTransform(mouseX, [0, 1], [20, -20]);
  const glowY = useTransform(mouseY, [0, 1], [20, -20]);

  return (
    <div className="bg-[#FAFAFA] text-[#0B0D17] min-h-screen selection:bg-[#DE5D26]/20 selection:text-[#DE5D26] font-sans overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center px-4 sm:px-6 pt-28 sm:pt-36 pb-14 sm:pb-20 overflow-hidden bg-white border-b border-zinc-100 select-none">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(circle, #E5E7EB 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 right-10 w-[450px] h-[450px] rounded-full bg-blue-500/[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[550px] h-[550px] rounded-full bg-orange-500/[0.03] blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

            <div className="lg:col-span-7 flex flex-col">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-400 mb-8 font-semibold tracking-wide uppercase">
                <Link href="/" className="hover:text-[#DE5D26] transition-colors">Home</Link>
                <span>/</span>
                <Link href="/solutions" className="hover:text-[#DE5D26] transition-colors">Solutions</Link>
                <span>/</span>
                <span className="text-zinc-900 font-bold">{solution.title}</span>
              </nav>

              <div className="inline-flex items-center gap-2 text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4" />
                Expert Development Services
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 text-[#0B0D17]"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {solution.title}
              </h1>

              <p className="text-zinc-500 text-lg sm:text-xl max-w-2xl leading-relaxed mb-6 font-medium">
                {solution.description}
              </p>

              {solution.longDescription && (
                <p className="text-zinc-500 text-base max-w-2xl leading-relaxed mb-10">
                  {solution.longDescription}
                </p>
              )}

              <div>
                <button
                  onClick={openConsultModal}
                  className="relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#0B0D17] text-white font-bold rounded-full overflow-hidden group text-sm tracking-wide shadow-xl shadow-[#0B0D17]/15 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#DE5D26] transition-transform duration-300 ease-out transform -translate-x-full group-hover:translate-x-0" />
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Free Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:flex items-center justify-center py-8">
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative cursor-pointer select-none"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                  className="w-72 h-72 sm:w-80 sm:h-80 rounded-[45px] shadow-2xl border border-white/25 flex items-center justify-center relative transition-shadow duration-500 bg-zinc-950"
                >
                  <div
                    className="absolute inset-4 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm pointer-events-none"
                    style={{ transform: 'translateZ(25px)' }}
                  />
                  <div
                    className="relative z-10 flex items-center justify-center text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.35)]"
                    style={{ transform: 'translateZ(60px)' }}
                  >
                    <IconComponent className="w-36 h-36" strokeWidth={1.2} />
                  </div>
                  <motion.div
                    style={{ x: glowX, y: glowY, backgroundColor: solution.color, transform: 'translateZ(-20px)' }}
                    className="absolute inset-0 rounded-[45px] opacity-[0.2] blur-3xl pointer-events-none"
                  />
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
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

      {/* ── CORE CAPABILITIES (extracted component) ──────────────────────── */}
      <CoreCapabilities solution={solution} />

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      {solution.process && solution.process.length > 0 && (
        <section className="py-20 px-6 bg-white border-y border-zinc-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 select-none">
              <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4 inline-block">How We Work</span>
              <h2
                className="text-4xl sm:text-5xl font-black text-[#0B0D17] tracking-tight"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Our Development Process
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {solution.process.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#FAFAFA] border border-zinc-100 rounded-2xl p-7 hover:bg-white hover:border-zinc-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-300 group relative overflow-hidden"
                >
                  <span
                    className="absolute right-5 top-3 text-6xl font-black text-zinc-100 group-hover:text-zinc-200/50 transition-colors pointer-events-none select-none"
                    style={{ fontFamily: 'var(--font-unbounded)' }}
                  >
                    {item.step}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-white text-sm font-black"
                    style={{ backgroundColor: solution.color }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-lg font-black text-[#0B0D17] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BENEFITS ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center max-w-2xl mx-auto select-none">
            <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4 inline-block">Business Impact</span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0B0D17]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Key Business Benefits
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solution.benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white border border-zinc-100 rounded-[2rem] sm:rounded-[2.2rem] p-6 sm:p-10 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.01)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.04)] hover:border-zinc-200 transition-all duration-500 group relative overflow-hidden"
              >
                <span
                  className="absolute right-6 top-4 text-7xl font-black text-zinc-100/50 pointer-events-none select-none"
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
                  <p className="text-zinc-500 text-sm leading-relaxed">{benefit.description}</p>
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

      {/* ── TECH STACK ────────────────────────────────────────────────────── */}
      {solution.techStack && solution.techStack.length > 0 && (
        <section className="py-20 px-6 bg-white border-t border-zinc-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 select-none">
              <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4 inline-block">Technology</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B0D17] tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Tech Stack We Use
              </h2>
              <p className="text-zinc-500 text-base mt-4 max-w-xl mx-auto">
                Battle-tested, production-grade technologies chosen for performance, scalability, and developer ecosystem maturity.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {solution.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-5 py-2.5 bg-[#FAFAFA] border border-zinc-200 rounded-full text-sm font-bold text-zinc-700 hover:border-[#DE5D26] hover:text-[#DE5D26] transition-colors duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      {solution.faq && solution.faq.length > 0 && (
        <section className="py-20 px-6 bg-[#FAFAFA] border-t border-zinc-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 select-none">
              <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-widest mb-4 inline-block">FAQ</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B0D17] tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Frequently Asked Questions
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {solution.faq.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <p className="text-zinc-500 text-sm mb-4">Have a question not listed here?</p>
              <button
                onClick={openConsultModal}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0B0D17] text-white font-bold rounded-full text-sm hover:bg-[#DE5D26] transition-colors duration-300 cursor-pointer"
              >
                Ask Us Directly <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
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
              Connect with our development leads. Get a free project estimate within 24 hours and
              engineer your solution with the best team in India.
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
