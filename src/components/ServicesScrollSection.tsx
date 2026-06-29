'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { openConsultModal } from '@/components/ConsultModal';

/* ─── Services Data ──────────────────────────────────────── */
const services = [
  {
    id: '01',
    title: 'E-commerce',
    subtitle: 'Sell More, Scale Fast',
    description:
      'Custom online stores engineered for conversion. We build headless Shopify architectures and full WooCommerce platforms tailored to your brand.',
    tags: ['Shopify', 'WooCommerce', 'Headless', 'Payments'],
    href: '/service-detail?id=ecommerce',
  },
  {
    id: '02',
    title: 'Software Eng.',
    subtitle: 'MVP to Enterprise',
    description:
      'End-to-end product engineering using Next.js, React, and Node.js. We transform ideas into scalable, high-performance web applications.',
    tags: ['Next.js', 'React', 'Node.js', 'SaaS'],
    href: '/service-detail?id=web-development',
  },
  {
    id: '03',
    title: 'Mobile Apps',
    subtitle: 'iOS · Android · Cross-Platform',
    description:
      'Native-quality applications built with Flutter and React Native. Delivered with pixel-perfect UI and seamless backend integrations.',
    tags: ['Flutter', 'React Native', 'iOS', 'Android'],
    href: '/service-detail?id=mobile-development',
  },
  {
    id: '04',
    title: 'SEO & Growth',
    subtitle: 'Rank · Retain · Revenue',
    description:
      'Technical SEO, content strategy, and performance marketing that compounds. We deliver sustainable organic growth through data-driven campaigns.',
    tags: ['Technical SEO', 'Content', 'PPC', 'Analytics'],
    href: '/service-detail?id=seo-marketing',
  },
  {
    id: '05',
    title: 'UI/UX Design',
    subtitle: 'Design that Converts',
    description:
      'Research-backed, intuitive interfaces crafted in Figma. From comprehensive design systems to interactive prototypes that delight users.',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'UX Research'],
    href: '/service-detail?id=ui-ux-design',
  },
];

/* ─── Single Service Card ────────────────────────────────── */
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-[300px] md:w-[380px] lg:w-[420px] shrink-0 h-[380px] flex flex-col justify-between border-l border-neutral-200 pl-8 md:pl-12 py-6 bg-transparent"
    >
      {/* Number */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm font-medium text-neutral-400 font-mono tracking-wider">
          {service.id}
        </span>
        <div className="h-[1px] w-8 bg-neutral-200 group-hover:w-16 group-hover:bg-[#DE5D26] transition-all duration-500 ease-out" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        <h3
          className="text-3xl md:text-4xl lg:text-[2.25rem] font-bold tracking-tight mb-4 text-[#0B0D17] group-hover:text-[#DE5D26] transition-colors duration-500 leading-tight"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {service.title}
        </h3>
        
        <p className="text-[11px] md:text-[11px] uppercase tracking-widest text-neutral-500 font-semibold mb-4">
            {service.subtitle}
        </p>

        <p className="text-[13px] md:text-[13px] leading-relaxed text-neutral-600 mb-6 max-w-sm">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto mb-6">
          {service.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] md:text-[11px] font-medium px-3 py-1.5 bg-neutral-100 text-neutral-600 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Link */}
        <Link
            href={service.href}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0B0D17] uppercase tracking-widest hover:text-[#DE5D26] transition-colors duration-300 w-fit"
        >
            Explore
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────── */
export default function ServicesScrollSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Smooth horizontal scroll
  const rawX = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);
  const x = useSpring(rawX, { stiffness: 50, damping: 20, mass: 1 });

  const progressScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={targetRef}
      className="relative h-[450vh] bg-white select-none"
      aria-label="Our Services"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-start pt-20 md:pt-28 pb-8">
        
        {/* Header Area - Minimalist */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 shrink-0">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-6"
            >
                <div className="w-2 h-2 rounded-full bg-[#DE5D26]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Capabilities
                </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[#0B0D17]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Expertise that drives <br />
              <span className="text-neutral-400">digital transformation.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0"
          >
            <button
              onClick={openConsultModal}
              className="group relative px-7 py-4 bg-[#0B0D17] text-white text-[13px] font-bold uppercase tracking-wider overflow-hidden rounded-sm w-full md:w-auto text-center"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    Start a Project
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-[#DE5D26] transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            </button>
            
            <div className="hidden md:flex flex-col items-end gap-3 mt-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                    Scroll
                </span>
                <div className="w-[1px] h-16 bg-neutral-200 relative overflow-hidden">
                    <motion.div 
                        className="absolute top-0 left-0 w-full h-full bg-[#DE5D26] origin-top"
                        style={{ scaleY: progressScaleY }}
                    />
                </div>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Rail */}
        <div className="relative flex-1 flex items-center">
          <motion.div
            style={{ x }}
            className="flex h-full items-center pl-6 md:pl-12 lg:pl-16 pr-[15vw] w-max gap-0"
          >
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
            
            {/* Minimal End Cap */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-[280px] shrink-0 h-[380px] flex flex-col justify-center items-start border-l border-neutral-200 pl-8 md:pl-12 py-6 bg-transparent"
            >
               <h3
                className="text-2xl font-bold tracking-tight mb-4 text-[#0B0D17]"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
               >
                 Need something custom?
               </h3>
               <p className="text-[14px] leading-relaxed text-neutral-500 mb-8 max-w-sm">
                 We tailor every engagement to your exact business goals.
               </p>
               <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0B0D17] uppercase tracking-widest hover:text-[#DE5D26] transition-colors duration-300 group"
              >
                  All Services
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
              </Link>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
