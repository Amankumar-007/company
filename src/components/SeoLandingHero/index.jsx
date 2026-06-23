'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function SeoLandingHero({ location, serviceName }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo('.seo-hero-title',
      { opacity: 0, y: '110%' },
      { opacity: 1, y: '0%', duration: 1.2, ease: 'power4.out', stagger: 0.12 }
    )
      .fromTo('.seo-hero-sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo('.seo-hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.6'
      );
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-5 lg:px-7 pt-32 pb-20 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8 tracking-tight">
          <div className="overflow-hidden pb-2 -mb-2">
            <div className="seo-hero-title inline-block opacity-0 translate-y-[110%]">
              Top <span className="text-orange-500">{serviceName}</span>
            </div>
          </div>
          <div className="overflow-hidden pb-2 -mb-2">
            <div className="seo-hero-title inline-block opacity-0 translate-y-[110%]">
              Agency in {location.name}
            </div>
          </div>
        </h1>

        <p className="seo-hero-sub text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12 font-light opacity-0">
          Partner with TwoflowW to elevate your digital presence. 
          We deliver world-class {serviceName.toLowerCase()} solutions tailored specifically for businesses in {location.name}, {location.state}.
        </p>

        <div className="seo-hero-cta flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center items-center opacity-0">
          <Link
            href="/contact"
            className="relative overflow-hidden px-8 py-4 bg-black border border-black text-white rounded-full transition-all duration-300 hover:border-[#4169E1] group"
          >
            <div className="absolute inset-0 bg-[#4169E1] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10 font-medium text-lg">
              Get Your Free Proposal
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
