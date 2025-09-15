import React from 'react';

export default function HeroSection() {
  return (
    <div className="min-h-[50vh] mb-15 mt-10  flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-[2.7rem] sm:text-[3.6rem] lg:text-[4.5rem] xl:text-[5.4rem] font-bold text-gray-900 leading-tight mb-8 tracking-tight">
          <span className="block">Design agency focused</span>
          <span className="block">on AI-driven products</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
          Cuberto is a digital design and technology partner focused on smart
          interactions, delightful UX, and cutting-edge AI solutions.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Start Your Project
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
            View Our Work
          </button>
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