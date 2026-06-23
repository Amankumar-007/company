'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function HeroSection({ isLoading = true }) {
  const heroRef = useRef(null);

  useEffect(() => {
    // Only fire once isLoading flips to false (preloader is leaving)
    if (isLoading) return;

    // Wait for the preloader slide-up exit to finish (~900ms: 0.2s delay + 0.8s anim)
    const timer = setTimeout(() => {
      if (!heroRef.current) return;
      const tl = gsap.timeline();
      tl.fromTo('.hero-title-line-home',
        { opacity: 0, y: '110%' },
        { opacity: 1, y: '0%', duration: 1.2, ease: 'power4.out', stagger: 0.12 }
      )
        .fromTo('.hero-subtitle-home',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo('.hero-cta-home',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
          '-=0.6'
        );
    }, 900);

    return () => clearTimeout(timer);
  }, [isLoading]);
  return (
    <div
      ref={heroRef}
      className="relative min-h-[90vh] -mb-[25vh] flex items-center justify-center px-4 sm:px-5 lg:px-7 pt-32 pb-[32vh]"
    >
      <Image
        src="/hero1.png"
        alt="Twofloww Digital Excellence"
        fill
        priority
        className="object-cover object-center -z-10"
      />
      {/* Gradient overlay to blend bottom into white background */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-transparent via-white/50 to-white z-0 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Main Heading */}
        <h1 className="text-[1.8rem] sm:text-[2.6rem] lg:text-[3.0rem] xl:text-[3.8rem] font-bold text-white leading-tight mb-8 tracking-tight">
          <div className="overflow-hidden pb-1 -mb-1">
            <div className="hero-title-line-home inline-block opacity-0 translate-y-[110%]">Building Digital Excellence</div>
          </div>
          <div className="overflow-hidden pb-1 -mb-1">
            <div className="hero-title-line-home inline-block opacity-0 translate-y-[110%]">the <span className="border-b-4 border-orange-500 pb-1">Agile</span> Way</div>
          </div>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle-home text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12 font-light opacity-0">
          We use agile methodology to build exceptional websites.
          <span className="block mt-2">Get your <span className="font-semibold border-b-2 border-orange-500 pb-0.5 text-white">free</span> first wireframe - let&apos;s create something amazing together.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center items-center mt-4">
          <Link
            href="/contact"
            className="hero-cta-home relative overflow-hidden px-7 py-3.5 bg-black border border-black text-white rounded-full transition-all duration-300 hover:border-[#4169E1] group opacity-0"
          >
            <div className="absolute inset-0 bg-[#4169E1] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10 font-medium text-base">
              Start Your Project
            </span>
          </Link>
          <Link
            href="/projects"
            className="hero-cta-home group relative pb-1 text-white font-medium transition-all duration-300 opacity-0"
          >
            <span className="group-hover:text-gray-300 transition-colors duration-300 uppercase tracking-widest text-sm">
              View Our Work
            </span>
            {/* Aesthetic animated black line on the bottom */}
            <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-black group-hover:w-full transition-all duration-500 ease-out"></span>
          </Link>
        </div>

        {/* Decorative Elements – static, no infinite animations */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-10 pointer-events-none"></div>
        <div className="absolute top-1/2 right-20 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 pointer-events-none"></div>

      </div>
    </div>
  );
}