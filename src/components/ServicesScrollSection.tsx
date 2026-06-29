'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "E-commerce Solutions",
    description: "Build engaging, secure, and scalable online stores with a top web development company in Delhi NCR. We drive conversions and brand loyalty with custom e-commerce setups.",
    points: [
      "Custom WooCommerce & Shopify",
      "Headless Commerce Architectures",
      "Payment Gateway & API Integrations"
    ],
    bgColor: "bg-white",
    borderColor: "border-neutral-200/60",
    textColor: "text-neutral-800",
    tagColor: "text-blue-600 bg-blue-50/80",
    iconColor: "text-[#f08020]",
    theme: "light",
  },
  {
    id: "02",
    title: "Software Product Engineering",
    description: "End-to-end web application development services to guide your product from conceptual prototypes to a successful live launch.",
    points: [
      "MVP Development for Startups",
      "SaaS & Progressive Web Apps (PWAs)",
      "Next.js & React Expert Engineering",
      "Legacy Codebase Modernization"
    ],
    bgColor: "bg-[#0b0b0f]",
    borderColor: "border-neutral-800/80",
    textColor: "text-white",
    tagColor: "text-[#f08020] bg-neutral-900",
    iconColor: "text-[#f08020]",
    theme: "dark",
  },
  {
    id: "03",
    title: "Dedicated Teams & Staff Augmentation",
    description: "Scale your development capacity quickly. Get access to dedicated UI/UX designers, frontend experts, and backend developers.",
    points: [
      "Agile Development Teams",
      "Vetted Senior Developers",
      "QA & Devops Specialists"
    ],
    bgColor: "bg-[#f8f9fa]",
    borderColor: "border-neutral-200/80",
    textColor: "text-neutral-800",
    tagColor: "text-emerald-600 bg-emerald-50/80",
    iconColor: "text-[#f08020]",
    theme: "light",
  },
  {
    id: "04",
    title: "Digital Marketing & SEO Services",
    description: "Boost your online visibility with the best SEO agency in Delhi NCR. We create ROI-driven digital marketing campaigns.",
    points: [
      "Technical & On-Page SEO",
      "Content & Growth Marketing",
      "PPC & Social Media Advertising"
    ],
    bgColor: "bg-[#faf9f6]",
    borderColor: "border-neutral-200/80",
    textColor: "text-neutral-800",
    tagColor: "text-purple-600 bg-purple-50/80",
    iconColor: "text-[#f08020]",
    theme: "light",
  }
];

export default function ServicesScrollSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth scroll translation mapping
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-58%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#fffdfa] select-none">

      {/* Sticky container covering full viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Fixed Content (Spans 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            <span className="inline-flex items-center gap-2 text-[#f08020] font-semibold tracking-wider text-xs uppercase mb-4">
              <Sparkles className="w-4 h-4" />
              Empowering Digital Growth
            </span>

            {/* SEO Keyword-Rich Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-sans font-bold text-neutral-900 leading-[1.25] mb-6 tracking-tight">
              Best Web Development Company in Delhi NCR – Design, Build & Scale
            </h2>

            <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              TwoFloww delivers custom web development services, intuitive UI/UX design, and result-driven SEO strategies. From high-converting e-commerce platforms to scalable SaaS applications, we architect digital solutions that drive business success globally.
            </p>

            {/* CTA Card */}
            <div className="bg-[#fdf8f0] rounded-[24px] p-6 flex items-center gap-6 border border-orange-100/80 shadow-sm max-w-md">
              <div className="w-16 h-16 rounded-full border border-orange-200 bg-[#fdf8f0] flex items-center justify-center shrink-0 shadow-inner overflow-hidden relative">
                <div className="absolute inset-1 border border-dashed border-orange-300/40 rounded-full" />
                <div className="absolute inset-3 border border-orange-300/60 rounded-full" />
                <div className="absolute inset-5 border border-orange-400 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#f08020] rounded-full animate-ping" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 mb-2">Accelerate Your Project</h4>
                <button className="bg-[#f08020] hover:bg-[#d86d14] hover:shadow-md transition-all duration-300 text-white px-5 py-2 rounded-lg font-medium text-[10px] tracking-wider uppercase">
                  Consult Experts Free
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Horizontally Scrolling Cards (Spans 7 Columns) */}
          <div
            className="lg:col-span-7 relative h-[460px] w-full overflow-hidden"
            style={{
              // Use mask-image to fade edges of the container transparently.
              // This ensures dark cards fade to transparent (revealing the cream background)
              // instead of blending weirdly with a solid white overlay.
              maskImage: 'linear-gradient(to right, transparent, white 3rem, white calc(100% - 3rem), transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, white 3rem, white calc(100% - 3rem), transparent)'
            }}
          >
            {/* Scrolling container */}
            <motion.div style={{ x }} className="flex gap-6 h-full w-max px-12 items-center">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`w-[320px] md:w-[360px] h-[410px] rounded-[24px] border ${service.borderColor} p-6 md:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.015)] flex flex-col justify-between ${service.bgColor} ${service.textColor} relative overflow-hidden flex-shrink-0 group hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] transition-all duration-300`}
                >
                  {/* Glowing orange spot for dark theme */}
                  {service.theme === 'dark' && (
                    <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-orange-500/10 blur-[90px] rounded-full pointer-events-none" />
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-5">
                      <span className="font-mono text-xs font-bold tracking-widest opacity-40">{service.id}</span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${service.tagColor}`}>
                        Service
                      </span>
                    </div>

                    <h3 className="text-xl md:text-[22px] font-sans font-bold mb-3.5 tracking-tight leading-snug">{service.title}</h3>
                    <p className={`text-xs md:text-sm mb-5 ${service.theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'} leading-relaxed line-clamp-3`}>
                      {service.description}
                    </p>
                  </div>

                  <div>
                    {/* Feature Checklist */}
                    <ul className="space-y-2 mb-6">
                      {service.points.slice(0, 3).map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] md:text-xs">
                          <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${service.iconColor}`} />
                          <span className={service.theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-3.5 border-t border-neutral-200/10">
                      <span className="text-[10px] font-bold tracking-wider uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        Explore Service
                      </span>
                      <button className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${service.theme === 'dark'
                          ? 'border-neutral-800 group-hover:border-neutral-500 text-white bg-neutral-900 group-hover:bg-white group-hover:text-black'
                          : 'border-neutral-200 group-hover:border-neutral-400 text-neutral-800 bg-neutral-50 group-hover:bg-neutral-900 group-hover:text-white'
                        }`}>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
