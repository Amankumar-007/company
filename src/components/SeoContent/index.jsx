import React from 'react';
import Link from 'next/link';

export default function SeoContent({ location, serviceName }) {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our {serviceName} Experts in {location.name}?
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                When it comes to <strong>{serviceName.toLowerCase()}</strong>, you need a partner who understands both the global digital landscape and the local market dynamics of <strong>{location.name}</strong>. At TwoflowW, we combine technical excellence with strategic insights to help your business thrive.
              </p>
              <p>
                Our team of dedicated professionals has successfully delivered cutting-edge digital solutions to businesses across {location.state}. We don't just build products; we craft digital experiences that drive growth, engage customers, and maximize your ROI.
              </p>
              <ul className="space-y-4 mt-8">
                <li className="flex items-start">
                  <span className="mr-3 text-orange-500">✓</span>
                  <span><strong>Local Expertise:</strong> Deep understanding of the {location.name} business environment.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-orange-500">✓</span>
                  <span><strong>Proven Track Record:</strong> Delivered successful {serviceName.toLowerCase()} projects for top brands.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-orange-500">✓</span>
                  <span><strong>Agile Methodology:</strong> Fast delivery with continuous feedback and improvements.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-12">
              <Link href="/services" className="inline-flex items-center text-lg font-bold text-black hover:text-[#4169E1] transition-colors">
                Explore All Services
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Value Prop Box */}
          <div className="bg-gray-50 rounded-3xl p-10 lg:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Process for {location.name} Clients</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-semibold text-black mb-2">1. Discovery & Strategy</h4>
                  <p className="text-gray-600">We analyze your business goals and the competitive landscape in {location.name} to formulate a winning strategy.</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-black mb-2">2. Execution & Development</h4>
                  <p className="text-gray-600">Our team utilizes the latest frameworks to build robust, scalable {serviceName.toLowerCase()} solutions.</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-black mb-2">3. Launch & Optimization</h4>
                  <p className="text-gray-600">We ensure a smooth rollout and continuously monitor performance to keep you ahead of the competition.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
