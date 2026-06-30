'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useInView, motion } from 'framer-motion';
import { Zap, Globe, BarChart3, Star } from 'lucide-react';

const disciplines = [
  {
    title: 'Digital Strategy',
    description: 'We decode complex business challenges into actionable digital roadmaps that drive growth and market dominance.',
    number: '01'
  },
  {
    title: 'Experience Design',
    description: 'Crafting intuitive, human-centric interfaces that blur the line between beautiful aesthetics and seamless functionality.',
    number: '02'
  },
  {
    title: 'Engineering',
    description: 'Building robust, scalable architectures using cutting-edge tech stacks for uncompromised performance.',
    number: '03'
  },
  {
    title: 'Growth Marketing',
    description: 'Data-driven acquisition and retention strategies to scale your brand and maximize ROI in the digital space.',
    number: '04'
  }
];

const whyUs = [
  {
    title: 'Agile Development Process',
    desc: 'Sprints, transparent milestones, and weekly updates so you always know where your project stands.',
  },
  {
    title: 'SEO-First Architecture',
    desc: 'Every website and app we build is engineered for speed, Core Web Vitals, and search engine visibility from day one.',
  },
  {
    title: 'End-to-End Expertise',
    desc: 'From UI/UX design and frontend development to backend APIs, DevOps, and digital marketing — one team for everything.',
  },
  {
    title: 'Free First Wireframe',
    desc: 'We offer a complimentary wireframe and consultation so you can see our quality before committing a single rupee.',
  },
  {
    title: 'Post-Launch Support',
    desc: '3 months of free maintenance and bug fixes after launch. We are committed to your long-term success.',
  },
];

const industries = [
  'E-commerce & Retail',
  'Food & Restaurant',
  'Healthcare & Fitness',
  'Logistics & Transport',
  'Education & EdTech',
  'Real Estate',
  'Finance & FinTech',
  'Hospitality & Travel',
];

const cities = [
  'Delhi',
  'Noida',
  'Gurgaon',
  'Faridabad',
  'Ghaziabad',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Pune',
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const slideUpText = {
  initial: { y: "100%" },
  open: (i) => ({
    y: "0%",
    transition: { duration: 0.5, delay: 0.009 * i, ease: [0.25, 1, 0.5, 1] }
  }),
  closed: {
    y: "100%",
    transition: { duration: 0.5 }
  }
};

export default function HomeSeoSection() {
  const [bentoIndex, setBentoIndex] = useState(0);
  const [openReason, setOpenReason] = useState(0);

  // Scroll triggers for text animations
  const disciplinesRef = useRef(null);
  const isDisciplinesInView = useInView(disciplinesRef, { once: true, margin: "-10%" });

  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-10%" });

  const whyRef = useRef(null);
  const isWhyInView = useInView(whyRef, { once: true, margin: "-10%" });

  // Monitor mobile scroll position on bento slider to auto-update pagination dots
  const handleBentoScroll = (e) => {
    if (window.innerWidth >= 1024) return;
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const cards = container.children;
    if (!cards.length) return;

    let closestIndex = 0;
    let minDistance = Infinity;
    const containerCenter = scrollLeft + containerWidth / 2;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    
    if (closestIndex !== bentoIndex) {
      setBentoIndex(closestIndex);
    }
  };

  return (
    <>
      {/* Local style helper to hide scrollbars on mobile snap tracks */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* ── Capabilities ───────────────────────────────────────────── */}
      <section
        className="py-24 lg:py-32 bg-black rounded-t-[3rem] lg:rounded-t-[5rem] mt-16 border-b border-white/10"
        aria-label="Core capabilities of TwoFloww"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={disciplinesRef} className="max-w-3xl mb-20">
            <p className="text-orange-500 font-mono text-sm tracking-[0.2em] uppercase mb-6">
              Our Disciplines
            </p>
            <h2 className="text-3xl lg:text-5xl font-normal text-white leading-tight tracking-tight flex flex-wrap">
              {"We don't just build.".split(" ").map((word, i) => (
                <span key={i} className="relative overflow-hidden inline-flex mr-2 lg:mr-3">
                  <motion.span
                    custom={i}
                    variants={slideUpText}
                    initial="initial"
                    animate={isDisciplinesInView ? "open" : "closed"}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              <br className="w-full" />
              {"We architect digital dominance.".split(" ").map((word, i) => (
                <span key={i} className="relative overflow-hidden inline-flex mr-2 lg:mr-3 text-gray-500">
                  <motion.span
                    custom={i + 4}
                    variants={slideUpText}
                    initial="initial"
                    animate={isDisciplinesInView ? "open" : "closed"}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          {/* Desktop Grid Layout (hidden on mobile) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden"
          >
            {disciplines.map((item) => (
              <motion.div
                variants={fadeInUp}
                key={item.title}
                className="bg-black p-10 lg:p-16 group hover:bg-[#0a0a0a] transition-colors duration-500 relative overflow-hidden flex flex-col"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="text-white/10 font-mono text-4xl lg:text-5xl mb-16 font-light group-hover:text-orange-500/30 transition-colors duration-500">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-normal text-white mb-6 tracking-wide group-hover:text-orange-400 transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Snap Carousel version (hidden on desktop) */}
          <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-6 no-scrollbar -mx-6 px-6">
            {disciplines.map((item) => (
              <div
                key={item.title}
                className="bg-black p-8 rounded-3xl border border-white/10 flex-shrink-0 w-[78vw] sm:w-[60vw] snap-center flex flex-col justify-between h-[280px] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
                <div className="text-white/10 font-mono text-3xl mb-8 font-light">
                  {item.number}
                </div>
                <div>
                  <h3 className="text-xl font-normal text-white mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Us / Stats Bento ────────────────────────────────── */}
      <section
        className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-white rounded-t-[3rem] lg:rounded-t-[5rem] -mt-12 lg:-mt-20 relative z-10"
        aria-label="About TwoFloww and our impact"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div ref={aboutRef} className="text-center max-w-4xl mx-auto mb-12 lg:mb-20">
            <div className="inline-flex items-center gap-3 mb-6 text-sm font-bold tracking-widest uppercase text-gray-900">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              About Us
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-900 leading-tight tracking-tight flex flex-wrap justify-center">
              {"A premier digital agency dedicated to building".split(" ").map((word, i) => (
                <span key={i} className="relative overflow-hidden inline-flex mr-1.5 lg:mr-2">
                  <motion.span
                    custom={i}
                    variants={slideUpText}
                    initial="initial"
                    animate={isAboutInView ? "open" : "closed"}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              
              <span className="inline-flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-blue-500 text-white mx-2 align-middle shadow-xl shadow-blue-500/20 transform hover:scale-110 transition-transform">
                <Globe className="w-4 h-4 lg:w-6 lg:h-6" />
              </span>
              
              {"high-performance and".split(" ").map((word, i) => (
                <span key={i} className="relative overflow-hidden inline-flex mr-1.5 lg:mr-2">
                  <motion.span
                    custom={i + 6}
                    variants={slideUpText}
                    initial="initial"
                    animate={isAboutInView ? "open" : "closed"}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
              
              <span className="inline-flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-[#c3f53c] text-black mx-2 align-middle shadow-xl shadow-[#c3f53c]/20 transform hover:scale-110 transition-transform">
                <Zap className="w-4 h-4 lg:w-6 lg:h-6" />
              </span>
              
              {"scalable solutions.".split(" ").map((word, i) => (
                <span key={i} className="relative overflow-hidden inline-flex mr-1.5 lg:mr-2">
                  <motion.span
                    custom={i + 9}
                    variants={slideUpText}
                    initial="initial"
                    animate={isAboutInView ? "open" : "closed"}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>

          {/* Desktop Bento Grid (hidden on mobile) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="hidden lg:grid grid-cols-3 gap-6"
          >
            {/* Col 1: Blue Card */}
            <motion.div variants={fadeInUp} className="relative bg-blue-600 rounded-[2rem] p-6 lg:p-8 h-[420px] overflow-hidden flex flex-col justify-between group">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="TwoFloww Team" className="w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-xl font-black text-white tracking-tighter">TwoFloww</span>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-5 h-5 text-gray-900" />
                </div>
              </div>
              <div className="relative z-10 bg-white rounded-[1.5rem] p-5 lg:p-6 shadow-2xl mt-auto translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-4xl lg:text-6xl font-medium text-gray-900 mb-2 tracking-tight">150+</div>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">Successful digital products and campaigns delivered for global startups and enterprises.</p>
              </div>
            </motion.div>

            {/* Col 2: Gray Card */}
            <motion.div variants={fadeInUp} className="bg-[#F4F4F5] rounded-[2rem] p-6 lg:p-8 flex flex-col justify-between h-[420px]">
              <div>
                <p className="text-gray-500 font-semibold uppercase tracking-wider text-xs mb-3">Commitment to measurable ROI</p>
                <div className="text-6xl lg:text-7xl font-medium text-gray-900 tracking-tighter">100%</div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                  <span className="text-gray-500 text-xs font-semibold ml-2">5.0 / 5.0 Rating</span>
                </div>
                <p className="text-gray-900 font-medium text-lg lg:text-xl leading-snug">
                  "Their digital strategy completely reshaped how we scale. It's fast, intelligent, and highly converting."
                </p>
              </div>
            </motion.div>

            {/* Col 3: Split Cards */}
            <motion.div variants={fadeInUp} className="flex flex-col gap-6 h-[420px]">
              {/* Green Card */}
              <div className="bg-[#c3f53c] rounded-[2rem] p-6 lg:p-8 flex-1 flex flex-col justify-between group overflow-hidden relative">
                <p className="text-gray-800 font-semibold uppercase tracking-wider text-xs relative z-10">Organic Traffic Growth</p>
                <div className="relative z-10">
                  <div className="text-5xl lg:text-6xl font-medium text-gray-900 mb-2 tracking-tighter">500k+</div>
                  <p className="text-gray-800 font-medium text-sm lg:text-base leading-tight">Monthly active users driven through our advanced SEO strategies.</p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>
              {/* Black Card */}
              <div className="bg-gray-900 rounded-[2rem] p-6 lg:p-8 flex items-center justify-between h-[100px] shadow-xl">
                <span className="text-white font-medium text-base lg:text-lg">Countries Served</span>
                <span className="text-3xl lg:text-4xl font-medium text-white tracking-tighter">10+</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile Bento Carousel (hidden on desktop) */}
          <div className="block lg:hidden">
            <div 
              onScroll={handleBentoScroll}
              className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar -mx-6 px-6"
            >
              {/* Slide 1: Blue Card */}
              <div className="relative bg-blue-600 rounded-[2rem] p-6 shrink-0 w-[82vw] snap-center h-[340px] overflow-hidden flex flex-col justify-between group">
                <div className="absolute inset-0">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="TwoFloww Team" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
                </div>
                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-lg font-black text-white tracking-tighter">TwoFloww</span>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-4 h-4 text-gray-900" />
                  </div>
                </div>
                <div className="relative z-10 bg-white rounded-[1.25rem] p-4 shadow-xl mt-auto">
                  <div className="text-3xl font-medium text-gray-900 mb-1 tracking-tight">150+</div>
                  <p className="text-gray-600 font-medium text-xs leading-relaxed">Successful digital products and campaigns delivered for global startups and enterprises.</p>
                </div>
              </div>

              {/* Slide 2: Testimonial Gray Card */}
              <div className="bg-[#F4F4F5] rounded-[2rem] p-6 shrink-0 w-[82vw] snap-center h-[340px] flex flex-col justify-between">
                <div>
                  <p className="text-gray-500 font-semibold uppercase tracking-wider text-[10px] mb-2">Commitment to measurable ROI</p>
                  <div className="text-5xl font-medium text-gray-900 tracking-tighter">100%</div>
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                    <span className="text-gray-500 text-[10px] font-semibold ml-1.5">5.0 Rating</span>
                  </div>
                  <p className="text-gray-900 font-medium text-base leading-snug">
                    "Their digital strategy completely reshaped how we scale. It's fast, intelligent, and highly converting."
                  </p>
                </div>
              </div>

              {/* Slide 3: Split Cards Combined */}
              <div className="shrink-0 w-[82vw] snap-center h-[340px] flex flex-col gap-4">
                {/* Green Card */}
                <div className="bg-[#c3f53c] rounded-[2rem] p-5 flex-1 flex flex-col justify-between overflow-hidden relative">
                  <p className="text-gray-800 font-semibold uppercase tracking-wider text-[10px] relative z-10">Organic Traffic Growth</p>
                  <div className="relative z-10">
                    <div className="text-3xl font-medium text-gray-900 mb-0.5 tracking-tighter">500k+</div>
                    <p className="text-gray-800 font-medium text-xs leading-tight">Monthly active users driven through our advanced SEO strategies.</p>
                  </div>
                </div>
                {/* Black Card */}
                <div className="bg-gray-900 rounded-[2rem] p-5 flex items-center justify-between h-[80px] shadow-xl">
                  <span className="text-white font-medium text-sm">Countries Served</span>
                  <span className="text-2xl font-medium text-white tracking-tighter">10+</span>
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-1.5 mt-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  aria-label={`Go to bento slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    bentoIndex === idx ? 'w-5 bg-black' : 'w-1.5 bg-black/25'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose TwoFloww ────────────────────────────────── */}
      <section
        className="py-16 lg:py-20 bg-white"
        aria-label="Why choose TwoFloww as your web development partner"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left column */}
            <div ref={whyRef}>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight flex flex-wrap">
                {"Why Businesses in Delhi NCR Choose TwoFloww as Their Digital Partner".split(" ").map((word, i) => (
                  <span key={i} className="relative overflow-hidden inline-flex mr-1.5 lg:mr-2">
                    <motion.span
                      custom={i}
                      variants={slideUpText}
                      initial="initial"
                      animate={isWhyInView ? "open" : "closed"}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed flex flex-wrap">
                {"We are not just another web development company in Delhi NCR. TwoFloww is a results-driven digital agency that blends technical excellence with business strategy to deliver measurable outcomes — faster time-to-market, higher search rankings, and better ROI.".split(" ").map((word, i) => (
                  <span key={i} className="relative overflow-hidden inline-flex mr-1">
                    <motion.span
                      custom={i + 10}
                      variants={slideUpText}
                      initial="initial"
                      animate={isWhyInView ? "open" : "closed"}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </p>
              
              {/* Interactive Accordion for reasons (saves space on mobile and looks high-end) */}
              <div className="space-y-4 lg:space-y-5">
                {whyUs.map((item, i) => {
                  const isOpen = openReason === i;
                  return (
                    <div 
                      key={item.title} 
                      className="border-b border-neutral-100 pb-4 last:border-0 transition-all duration-300"
                    >
                      <button
                        onClick={() => setOpenReason(isOpen ? -1 : i)}
                        className="flex justify-between items-center w-full text-left font-semibold text-gray-900 text-lg py-2 focus:outline-none"
                      >
                        <span className="flex items-center gap-4">
                          <span className={`w-7 h-7 rounded-full text-white text-xs flex items-center justify-center flex-shrink-0 font-bold transition-colors duration-300 ${
                            isOpen ? 'bg-orange-500' : 'bg-neutral-800'
                          }`}>
                            {i + 1}
                          </span>
                          <span className={`${isOpen ? 'text-orange-500' : 'text-gray-900'} transition-colors duration-300`}>
                            {item.title}
                          </span>
                        </span>
                        <span className={`text-xl font-light transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      
                      <div className={`transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                        isOpen ? 'max-h-[140px] opacity-100 mt-2 pl-11' : 'max-h-0 opacity-0 mt-0 pl-11'
                      }`}>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-[#4169E1] transition-colors duration-300"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="/projects"
                  className="inline-block px-8 py-4 border-2 border-black text-black font-semibold rounded-full hover:border-[#4169E1] hover:text-[#4169E1] transition-colors duration-300"
                >
                  View Our Work
                </Link>
              </div>
            </div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Industries Serve Container */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 lg:mb-5">Industries We Serve</h3>
                
                {/* Desktop Grid Layout */}
                <div className="hidden lg:grid grid-cols-2 gap-3">
                  {industries.map((industry) => (
                    <div key={industry} className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                      {industry}
                    </div>
                  ))}
                </div>

                {/* Mobile Tag Rail Layout */}
                <div className="flex lg:hidden overflow-x-auto gap-2 no-scrollbar pb-2 -mx-2 px-2">
                  {industries.map((industry) => (
                    <span 
                      key={industry} 
                      className="bg-white border border-gray-250 text-gray-800 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cities Serve Container */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 lg:mb-5">
                  Cities We Serve Across India
                </h3>
                
                {/* Desktop Grid Layout */}
                <div className="hidden lg:grid grid-cols-2 gap-3">
                  {cities.map((city) => (
                    <div key={city} className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-[#4169E1] rounded-full flex-shrink-0" />
                      {city}
                    </div>
                  ))}
                </div>

                {/* Mobile Tag Rail Layout */}
                <div className="flex lg:hidden overflow-x-auto gap-2 no-scrollbar pb-2 -mx-2 px-2">
                  {cities.map((city) => (
                    <span 
                      key={city} 
                      className="bg-white border border-gray-250 text-gray-800 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm"
                    >
                      {city}
                    </span>
                  ))}
                </div>
                
                <p className="mt-4 text-sm text-gray-500">
                  Also serving clients in the USA, UK, UAE, Canada, and Australia.
                </p>
              </div>

              <div className="bg-black rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  Ready to build your next digital product?
                </h3>
                <p className="text-gray-400 text-sm mb-5">
                  Get a free project consultation and wireframe from TwoFloww — the top web
                  development company in Delhi NCR.
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors duration-300 text-sm"
                >
                  Start a Free Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
