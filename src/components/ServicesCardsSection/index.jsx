'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useInView, motion } from 'framer-motion';
import { Sparkles, MonitorSmartphone, TrendingUp, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "AI Strategy & Custom Solutions",
    description: "Empower your business with AI integration. As a top web development company, we craft custom software solutions that automate operations and accelerate growth.",
    image: "/ai.jpg",
    icon: Sparkles,
  },
  {
    title: "Web & Mobile App Development",
    description: "High-performance website design and hybrid mobile application development in Delhi NCR. Built with Next.js, React, and Flutter for maximum speed and scalability.",
    image: "/utility.jpg",
    icon: MonitorSmartphone,
  },
  {
    title: "SEO Services & Growth Marketing",
    description: "Optimize your search rankings with our expert SEO agency. Drive organic traffic, optimize Core Web Vitals, and convert leads into revenue with data-driven strategies.",
    image: "/services/web.jpg",
    icon: TrendingUp,
  }
];

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

export default function ServicesCardsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-10%" });

  // Auto-detect centered card on mobile horizontal swiping
  // Throttled with a small timeout to keep dragging lag-free and butter-smooth
  const handleScroll = (e) => {
    if (window.innerWidth >= 1024) return;

    const container = e.currentTarget;
    
    // Clear pending scroll index update
    if (container.scrollTimeout) {
      clearTimeout(container.scrollTimeout);
    }

    // Debounce the state change so it doesn't trigger layout reflows during active touch drag
    container.scrollTimeout = setTimeout(() => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const cards = container.children;
      if (!cards.length) return;

      let closestIndex = 0;
      let minDistance = Infinity;
      const containerCenter = scrollLeft + containerWidth / 2;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        // Calculate relative card center point
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }

      if (closestIndex !== hoveredIndex) {
        setHoveredIndex(closestIndex);
      }
    }, 40); // 40ms debounce buffer for smooth swiping
  };

  return (
    <section className="py-24 lg:py-32 bg-white relative border-b border-neutral-100 overflow-hidden">
      {/* Local style helper to hide scrollbars on mobile snap track */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16 lg:mb-20 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6 text-xs font-mono font-bold tracking-[0.25em] uppercase text-orange-500">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            SERVICES
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal text-black leading-[1.1] tracking-tight mb-8 flex flex-wrap justify-center">
            {"Comprehensive consulting and".split(" ").map((word, i) => (
              <span key={i} className="relative overflow-hidden inline-flex mr-2 lg:mr-3">
                <motion.span
                  custom={i}
                  variants={slideUpText}
                  initial="initial"
                  animate={isHeaderInView ? "open" : "closed"}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br className="hidden md:inline w-full" />
            {"intelligent digital innovation".split(" ").map((word, i) => (
              <span key={i} className="relative overflow-hidden inline-flex mr-2 lg:mr-3 text-neutral-400">
                <motion.span
                  custom={i + 4}
                  variants={slideUpText}
                  initial="initial"
                  animate={isHeaderInView ? "open" : "closed"}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
          
          <p className="text-neutral-600 text-lg lg:text-xl font-light leading-relaxed max-w-3xl mb-10 flex flex-wrap justify-center">
            {"Whether you're optimizing your online presence or building custom platforms for tomorrow, as a leading web development company in Delhi NCR, we help you scale with confidence.".split(" ").map((word, i) => (
              <span key={i} className="relative overflow-hidden inline-flex mr-1.5">
                <motion.span
                  custom={i + 8}
                  variants={slideUpText}
                  initial="initial"
                  animate={isHeaderInView ? "open" : "closed"}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-4 px-6 py-3 bg-neutral-950 text-white rounded-full group/btn transition-all duration-300 hover:bg-neutral-900 shadow-lg shadow-neutral-950/10"
          >
            <span className="text-sm font-semibold tracking-wider uppercase">GET STARTED</span>
            <span className="w-8 h-8 rounded-full bg-[#c3f53c] text-black flex items-center justify-center group-hover/btn:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Light cards container block */}
        <div className="bg-[#f4f4f6] p-5 lg:p-6 rounded-[2.5rem] shadow-xl shadow-neutral-200/50 border border-neutral-200/30">
          
          {/* Expanding Cards Layout (responsive layout with swipe snap scroll on mobile) */}
          <div 
            onScroll={handleScroll}
            onMouseLeave={() => setHoveredIndex(0)}
            className="flex flex-row lg:flex-row overflow-x-auto lg:overflow-x-visible gap-4 lg:gap-5 w-full items-stretch justify-between snap-x snap-mandatory no-scrollbar pb-4 lg:pb-0"
          >
            {services.map((service, index) => {
              const isHovered = hoveredIndex === index;
              const IconComponent = service.icon;

              return (
                <div
                  key={index}
                  onClick={() => setHoveredIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`relative overflow-hidden rounded-[2rem] p-8 pb-10 border transition-[flex-grow,height,width,opacity,transform,background-color,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-[flex-grow,height,width,opacity] flex flex-col justify-between cursor-pointer snap-center
                    /* Desktop flex sizing */
                    lg:h-[320px] lg:w-auto lg:shrink lg:px-8 lg:pb-10
                    ${isHovered
                      ? 'lg:flex-[2.5] lg:bg-white lg:border-neutral-300 lg:shadow-xl lg:shadow-neutral-350/20 lg:opacity-100 lg:scale-100'
                      : 'lg:flex-1 lg:bg-white/70 lg:border-neutral-200/50 lg:hover:bg-white/95 lg:hover:border-neutral-300/30 lg:hover:shadow-md lg:hover:shadow-neutral-200/30'
                    }
                    /* Mobile card design */
                    w-[82vw] sm:w-[60vw] shrink-0
                    ${isHovered
                      ? 'h-[460px] bg-white border-neutral-300 shadow-xl shadow-neutral-350/20 opacity-100 scale-100'
                      : 'h-[200px] bg-white/70 border-neutral-200/50 opacity-60 scale-[0.96]'
                    }
                  `}
                >
                  <div className="flex flex-col lg:flex-row h-full w-full justify-between items-stretch gap-5 lg:gap-0 relative z-10">
                    
                    {/* Left Column: Icon & Texts */}
                    <div className="flex flex-col justify-between flex-1 h-full pr-0 lg:pr-5">
                      {/* Top: Icon box */}
                      <div className="w-10 h-10 rounded-xl bg-[#c3f53c] flex items-center justify-center text-black shadow-md shadow-[#c3f53c]/10 self-start">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Bottom: Title & Description */}
                      <div className="mt-6 flex flex-col justify-end">
                        <h3 className={`text-xl lg:text-2xl font-semibold tracking-tight leading-tight mb-2 transition-colors duration-350 flex flex-wrap ${
                          isHovered ? 'text-orange-500' : 'text-neutral-900'
                        }`}>
                          {service.title.split(" ").map((word, i) => (
                            <span key={i} className="relative overflow-hidden inline-flex mr-1.5">
                              <motion.span
                                custom={i + 1}
                                variants={slideUpText}
                                initial="initial"
                                animate={isHeaderInView ? "open" : "closed"}
                              >
                                {word}
                              </motion.span>
                            </span>
                          ))}
                        </h3>
                        
                        <div className={`transition-[max-height,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isHovered
                            ? 'max-h-[120px] mt-2.5'
                            : 'max-h-0 mt-0'
                          }`}>
                          <p className="text-neutral-500 text-xs lg:text-sm font-normal leading-relaxed max-w-md flex flex-wrap">
                            {service.description.split(" ").map((word, i) => (
                              <span key={i} className="relative overflow-hidden inline-flex mr-1">
                                <motion.span
                                  custom={i}
                                  variants={slideUpText}
                                  initial="initial"
                                  animate={isHovered ? "open" : "closed"}
                                >
                                  {word}
                                </motion.span>
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Image container */}
                    <div
                      className={`relative rounded-[1.5rem] overflow-hidden transition-[width,height,opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-[width,height,opacity] ${isHovered
                          ? 'h-[160px] lg:h-full w-full lg:w-[48%] opacity-100 translate-x-0 scale-100'
                          : 'h-0 lg:h-full w-full lg:w-0 opacity-0 translate-x-3 scale-95 pointer-events-none'
                        }`}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out transform-gpu will-change-transform ${isHovered ? 'scale-100' : 'scale-110'
                          }`}
                      />
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Swipe indicator dots for mobile view */}
          <div className="flex justify-center gap-2 mt-4 lg:hidden">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHoveredIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  hoveredIndex === idx ? 'w-6 bg-orange-500' : 'w-1.5 bg-neutral-300'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
