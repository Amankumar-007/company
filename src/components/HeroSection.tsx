import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="min-h-[50vh] mb-10 mt-5  flex items-center justify-center px-4 sm:px-5 lg:px-7 pt-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-[2.6rem] sm:text-[3.5rem] lg:text-[4.4rem] xl:text-[5.3rem] font-bold text-gray-900 leading-tight mb-8 tracking-tight">
          <span className="block">Building Digital Excellence</span>
          <span className="block">the <span className="text-orange-500">Agile</span> Way</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
          We use agile methodology to build exceptional websites. 
          <span className="block mt-2">Get your <span className="font-semibold text-orange-500">free</span> first wireframe - let&apos;s create something amazing together.</span>
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/contact" 
            className="relative overflow-hidden px-8 py-4 border border-gray-600 rounded-full text-black transition-all duration-300 hover:border-black group"
          >
            {/* Water fill effect */}
            <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            
            {/* Text */}
            <span className="bg relative z-10 group-hover:text-white transition-colors duration-300 font-medium text-lg">
              Start Your Project
            </span>
          </Link>
          <Link 
            href="/projects" 
            className="relative overflow-hidden px-8 py-4 border border-gray-600 rounded-full text- black transition-all duration-300 hover:border-black group"
          >
            {/* Water fill effect */}
            <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            
            {/* Text */}
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 font-medium text-lg">
              View Our Work
            </span>
          </Link>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20"></div>
        
        
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}