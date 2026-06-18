'use client'
import React, { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import VideoComponent from '@/components/VideoComponent';

export default function ProjectDetailsClient({ project }) {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
      return () => locomotiveScroll.destroy();
    })();
  }, []);

  const getDomainForTech = (techName) => {
    const domains = {
      'React': 'react.dev',
      'Next.js': 'nextjs.org',
      'TypeScript': 'typescriptlang.org',
      'Node.js': 'nodejs.org',
      'Express.js': 'expressjs.com',
      'MongoDB': 'mongodb.com',
      'PostgreSQL': 'postgresql.org',
      'Tailwind CSS': 'tailwindcss.com',
      'GraphQL': 'graphql.org',
      'Docker': 'docker.com',
      'AWS': 'aws.amazon.com',
      'Vercel': 'vercel.com',
      'Swift': 'swift.org',
      'Kotlin': 'kotlinlang.org',
      'React Native': 'reactnative.dev',
      'Flutter': 'flutter.dev',
      'Firebase': 'firebase.google.com',
      'Jest': 'jestjs.io',
      'Fastlane': 'fastlane.tools',
      'Sentry': 'sentry.io',
      'Figma': 'figma.com',
      'Sketch': 'sketch.com',
      'Adobe XD': 'adobe.com',
      'Photoshop': 'adobe.com',
      'Illustrator': 'adobe.com',
      'InVision': 'invisionapp.com',
      'Principle': 'principleformac.com',
      'Framer': 'framer.com',
      'Maze': 'maze.co',
      'Hotjar': 'hotjar.com',
      'Storybook': 'storybook.js.org',
      'Zeplin': 'zeplin.io',
      'Shopify': 'shopify.com',
      'WooCommerce': 'woocommerce.com',
      'Magento': 'magento.com',
      'BigCommerce': 'bigcommerce.com',
      'Stripe': 'stripe.com',
      'PayPal': 'paypal.com',
      'Redis': 'redis.io',
      'AWS Mobile': 'aws.amazon.com',
      'Google Analytics': 'analytics.google.com',
      'SEMrush': 'semrush.com',
      'Ahrefs': 'ahrefs.com',
      'Google Ads': 'ads.google.com',
      'Facebook Ads': 'facebook.com',
      'Content CMS': 'wordpress.org',
      'Google Cloud': 'cloud.google.com',
      'Azure': 'azure.microsoft.com',
      'Kubernetes': 'kubernetes.io',
      'Terraform': 'terraform.io',
      'Inventory APIs': 'postman.com',
      'Angular': 'angular.io',
      'HTML5': 'w3.org',
      'JavaScript': 'javascript.info',
      'Meta Business Suite': 'business.facebook.com',
      'Hootsuite': 'hootsuite.com',
      'Buffer': 'buffer.com',
      'Default': 'github.com'
    };
    return domains[techName] || domains['Default'];
  };

  const getFaviconUrl = (techName) => {
    const domain = getDomainForTech(techName);
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-18">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-full"
          >
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-xs font-medium text-black tracking-wider uppercase">{project.status}</span>
          </motion.div>

          {/* Clean Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
              {project.subtitle}
            </p>
          </motion.div>

          {/* Professional Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-700 leading-relaxed max-w-2xl mx-auto text-base sm:text-lg"
          >
            {project.description}
          </motion.p>
        </div>
      </div>
      <Suspense fallback={<div className="w-full h-[55vh] bg-gray-100 rounded-3xl animate-pulse" />}>
        <VideoComponent videoSrc={project.video || '/video1.mp4'} />
      </Suspense>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto mt-12 sm:mt-16 md:mt-20 px-4 sm:px-6 pb-12 sm:pb-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Case Study Content */}
          <div className="lg:col-span-8">
            <div className="mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-4xl sm:text-5xl font-light mb-6 sm:mb-8">
                <span className="text-black font-bold">CASE</span><br />
                <span className="text-gray-400">STUDY</span>
              </h2>
            </div>

            {/* Problem Section */}
            <div className="mb-8 sm:mb-12 md:mb-16">
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6">{project.caseStudy.challenge.title}</h3>
              {project.caseStudy.challenge.content.map((paragraph, index) => (
                <p key={index} className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6 font-light">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Solution Section */}
            <div className="mb-8 sm:mb-12 md:mb-16">
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6">{project.caseStudy.solution.title}</h3>
              {project.caseStudy.solution.content.map((paragraph, index) => (
                <p key={index} className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 font-light">
                  {paragraph}
                </p>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-10">
                {project.caseStudy.solution.features.map((feature, index) => (
                  <div key={index} className="border-l-4 border-gray-300 pl-4 sm:pl-6 hover:border-black transition-colors duration-300">
                    <h4 className="font-bold text-black mb-2 sm:mb-3 text-base sm:text-lg">{feature.title}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Section */}
            <div className="mb-8 sm:mb-12 md:mb-16">
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6">{project.caseStudy.results.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {project.caseStudy.results.metrics.map((metric, index) => (
                  <div key={index} className="text-center bg-gray-50 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
                    <div className="text-4xl sm:text-5xl font-black text-black mb-2 sm:mb-3">{metric.value}</div>
                    <div className="text-gray-600 font-medium text-sm sm:text-base">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Project Info */}
          <div className="lg:col-span-4">
            <div className="sticky top-4 sm:top-8 space-y-6 sm:space-y-8">
              {/* Project Metrics */}
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
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

              {/* Key Features */}
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">KEY FEATURES</h3>
                <div className="space-y-2 sm:space-y-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <span className="text-gray-700 text-sm sm:text-base">{feature.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="bg-gray-50 py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6">
              <span className="text-black font-black">TECHNOLOGY</span><br />
              <span className="text-gray-400">STACK</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Built with cutting-edge technologies to ensure optimal performance, scalability, and user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {project.technologies.map((tech, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <img 
                      src={getFaviconUrl(tech.name)} 
                      alt={tech.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="font-bold text-black text-base sm:text-lg">{tech.name}</h3>
                    <p className="text-xs text-gray-500 tracking-wide uppercase font-medium">{tech.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-black py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 sm:mb-8">
            {project.callToAction.title}
            <span className="block text-gray-400"></span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            {project.callToAction.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            {project.callToAction.buttons.map((button, index) => {
              const isDemoButton = button.label.includes('DEMO') || button.label.includes('VIEW') || button.icon === 'ExternalLink';
              const shouldRedirectToLive = isDemoButton && project.liveLink;
              
              if (shouldRedirectToLive) {
                return (
                  <a 
                    key={index}
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto"
                  >
                    <span className="font-bold text-base sm:text-lg">{button.label}</span>
                    {button.icon === 'ArrowRight' && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {button.icon === 'ExternalLink' && <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </a>
                );
              }
              
              return (
                <button key={index} className="flex items-center justify-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto">
                  <span className="font-bold text-base sm:text-lg">{button.label}</span>
                  {button.icon === 'ArrowRight' && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                  {button.icon === 'ExternalLink' && <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
