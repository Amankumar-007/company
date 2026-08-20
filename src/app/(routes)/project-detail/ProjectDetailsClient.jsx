'use client'
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Monitor, Smartphone } from 'lucide-react';
import ProjectShowcase from '@/components/ProjectShowcase';

export default function ProjectDetailsClient({ project }) {

  const getFaviconUrl = (techName) => {
    const slugMap = {
      'React': 'react',
      'Next.js': 'nextdotjs',
      'TypeScript': 'typescript',
      'Node.js': 'nodedotjs',
      'MongoDB': 'mongodb',
      'PostgreSQL': 'postgresql',
      'GraphQL': 'graphql',
      'AWS': 'amazonwebservices',
      'AWS S3': 'amazons3',
      'Docker': 'docker',
      'JavaScript': 'javascript',
      'HTML5': 'html5',
      'Angular': 'angular',
      'Tailwind CSS': 'tailwindcss',
      'Flutter': 'flutter',
      'React Native': 'react',
      'Swift': 'swift',
      'Kotlin': 'kotlin',
      'Firebase': 'firebase',
      'Google Analytics': 'googleanalytics',
      'Figma': 'figma',
      'Shopify': 'shopify',
      'Stripe': 'stripe',
      'OpenAI API': 'openai',
      'WebSockets': 'socketdotio',
      'Vercel': 'vercel',
    };

    const slug = slugMap[techName] || techName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `https://cdn.simpleicons.org/${slug}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6 sm:pt-14 sm:pb-8">
        <div className="text-center space-y-5 sm:space-y-7">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 border border-gray-200 rounded-full bg-gray-50"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-black tracking-wider uppercase">{project.status}</span>
          </motion.div>

          {/* Clean Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight mb-3">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[#DE5D26] font-semibold tracking-wider uppercase">
              {project.subtitle}
            </p>
          </motion.div>

          {/* Professional Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-base sm:text-lg font-normal"
          >
            {project.description}
          </motion.p>
        </div>
      </div>

      {/* Interactive Device Showcase (Desktop & Mobile, No Videos) */}
      <ProjectShowcase project={project} />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto mt-12 sm:mt-16 md:mt-20 px-4 sm:px-6 pb-12 sm:pb-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Case Study Content */}
          <div className="lg:col-span-8">
            <div className="mb-8 sm:mb-12 md:mb-14">
              <h2 className="text-4xl sm:text-5xl font-light mb-6 sm:mb-8">
                <span className="text-black font-extrabold">CASE</span><br />
                <span className="text-gray-400">STUDY</span>
              </h2>
            </div>

            {/* Problem Section */}
            {project.caseStudy?.challenge && (
              <div className="mb-8 sm:mb-12 md:mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6">{project.caseStudy.challenge.title}</h3>
                {project.caseStudy.challenge.content?.map((paragraph, index) => (
                  <p key={index} className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 font-normal">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Solution Section */}
            {project.caseStudy?.solution && (
              <div className="mb-8 sm:mb-12 md:mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6">{project.caseStudy.solution.title}</h3>
                {project.caseStudy.solution.content?.map((paragraph, index) => (
                  <p key={index} className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8 font-normal">
                    {paragraph}
                  </p>
                ))}
                {project.caseStudy.solution.features && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-10">
                    {project.caseStudy.solution.features.map((feature, index) => (
                      <div key={index} className="border-l-4 border-[#DE5D26] pl-4 sm:pl-6 bg-gray-50/50 p-4 rounded-r-xl">
                        <h4 className="font-bold text-black mb-2 text-base sm:text-lg">{feature.title}</h4>
                        <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Results Section */}
            {project.caseStudy?.results && (
              <div className="mb-8 sm:mb-12 md:mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6">{project.caseStudy.results.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                  {project.caseStudy.results.metrics?.map((metric, index) => (
                    <div key={index} className="text-center bg-gray-50 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 border border-gray-100">
                      <div className="text-4xl sm:text-5xl font-black text-black mb-2 sm:mb-3">{metric.value}</div>
                      <div className="text-gray-600 font-medium text-sm sm:text-base">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* High-Resolution Screenshot Gallery (Desktop & Mobile) */}
            <div className="mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-6">DEVICE INTERFACES</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Desktop Screenshot Card */}
                {project.desktopImage && (
                  <div className="rounded-2xl overflow-hidden border border-gray-200 bg-neutral-950 shadow-md">
                    <div className="p-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-xs text-neutral-400 font-medium">
                        <Monitor className="w-4 h-4 text-[#DE5D26]" />
                        <span>Desktop Experience</span>
                      </div>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">1920x1080</span>
                    </div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={project.desktopImage}
                        alt={`${project.title} Desktop`}
                        fill
                        className="object-cover object-top hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}

                {/* Mobile Screenshot Card */}
                {project.mobileImage && (
                  <div className="rounded-2xl overflow-hidden border border-gray-200 bg-neutral-950 shadow-md">
                    <div className="p-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-xs text-neutral-400 font-medium">
                        <Smartphone className="w-4 h-4 text-[#DE5D26]" />
                        <span>Mobile View</span>
                      </div>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">390x844</span>
                    </div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden flex items-center justify-center bg-neutral-900">
                      <div className="relative h-full w-[45%] aspect-[9/19] my-auto">
                        <Image
                          src={project.mobileImage}
                          alt={`${project.title} Mobile`}
                          fill
                          className="object-cover object-top rounded-lg hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Project Info */}
          <div className="lg:col-span-4">
            <div className="sticky top-4 sm:top-8 space-y-6 sm:space-y-8">
              {/* Project Metrics */}
              {project.metrics && (
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">PROJECT METRICS</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {project.metrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600 font-medium text-sm sm:text-base">{metric.label}:</span>
                        <span className="text-black font-bold text-sm sm:text-base">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {project.features && (
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">KEY CAPABILITIES</h3>
                  <div className="space-y-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#DE5D26] rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <span className="text-gray-900 font-semibold text-sm sm:text-base block">{feature.title}</span>
                          <span className="text-gray-500 text-xs sm:text-sm">{feature.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Section */}
      {project.technologies && (
        <div className="bg-gray-50 py-16 sm:py-20 md:py-24 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">
                <span className="text-black font-extrabold">TECHNOLOGY</span><br />
                <span className="text-gray-400">STACK</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-normal">
                Engineered with high-performance frameworks and scalable infrastructure.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {project.technologies.map((tech, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5 border border-gray-100 group">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                      <img 
                        src={getFaviconUrl(tech.name)} 
                        alt={tech.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-black text-sm sm:text-base">{tech.name}</h3>
                      <p className="text-xs text-gray-500 tracking-wide uppercase font-medium">{tech.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Call to Action Section */}
      {project.callToAction && (
        <div className="bg-black py-16 sm:py-20 md:py-24 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6">
              {project.callToAction.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {project.callToAction.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {project.liveLink && (
                <a 
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-[#DE5D26] hover:bg-[#c94f1c] text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto font-bold"
                >
                  <span>VISIT LIVE PLATFORM</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button 
                onClick={() => window.location.assign('/contact')}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto font-bold"
              >
                <span>BUILD SIMILAR PRODUCT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
