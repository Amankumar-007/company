'use client'
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Check, Star, Clock, Users, Award, Zap, Code, Database, Smartphone, Globe, Shield, Palette, Cpu } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { getServiceById } from '@/data/services';
import { notFound } from 'next/navigation';

function ServiceDetailsContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('id');
  const service = getServiceById(serviceId);

  if (!service) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // SVG icon mapping for technologies
  const getTechIcon = (techName) => {
    const iconMap = {
      'React': '/tech/7423888_react_react native_icon.svg',
      'Next.js': '/tech/9118036_nextjs_fill_icon.svg',
      'TypeScript': '/tech/11120662_fi_brands_typescript_icon.svg',
      'Node.js': '/tech/1012818_code_development_logo_nodejs_icon.svg',
      'MongoDB': '/tech/1012822_code_development_logo_mongodb_programming_icon.svg',
      'PostgreSQL': '/tech/4691328_postgresql_icon.svg',
      'GraphQL': '/tech/4691403_graphql_icon.svg',
      'AWS': '/tech/4923041_aws_icon.svg',
      'Docker': '/tech/8725837_docker_icon.svg',
      'JavaScript': '/tech/652581_code_command_develop_javascript_language_icon.svg',
      'HTML5': '/tech/104494_html5_html_icon.svg',
      'Angular': '/tech/4373284_angular_logo_logos_icon.svg',
      'Tailwind CSS': '/tech/9055799_bxl_tailwind_css_icon.svg',
      'Flutter': '/tech/9055802_bxl_flutter_icon.svg',
      'Swift': '', // No SVG available
      'Kotlin': '', // No SVG available
      'React Native': '/tech/7423888_react_react native_icon.svg',
      'Figma': '', // No SVG available
      'Sketch': '', // No SVG available
      'Adobe XD': '', // No SVG available
      'Shopify': '', // No SVG available
      'WooCommerce': '', // No SVG available
      'Magento': '', // No SVG available
      'Meta Business Suite': '', // No SVG available
      'Hootsuite': '', // No SVG available
      'Buffer': '', // No SVG available
      'Google Analytics': '', // No SVG available
      'Google Ads': '', // No SVG available
      'SEMrush': '', // No SVG available
      'Ahrefs': '', // No SVG available
      'Google Cloud': '', // No SVG available
      'Azure': '', // No SVG available
      'Firebase': '', // No SVG available
      'Stripe': '', // No SVG available
      'PayPal': '', // No SVG available
      'Default': '' // Fallback
    };

    return iconMap[techName] || iconMap['Default'];
  };

  // Service image mapping - use images according to their names
  const getServiceImages = (serviceId) => {
    const imageMap = {
      'web-development': [
        '/service-png/frontend.png',
        '/service-png/backend.png',
        '/service-png/cross.png'
      ],
      'mobile-development': [
        '/service-png/native.png',
        '/service-png/native2.png',
        '/service-png/cross.png'
      ],
      'ui-ux-design': [
        '/service-png/frontend.png',
        '/service-png/cross.png',
        '/service-png/backend.png'
      ],
      'ecommerce-solutions': [
        '/service-png/frontend.png',
        '/service-png/backend.png',
        '/service-png/cross.png'
      ],
      'social-media': [
        '/service-png/cross.png',
        '/service-png/frontend.png',
        '/service-png/backend.png'
      ],
      'digital-marketing': [
        '/service-png/cross.png',
        '/service-png/frontend.png',
        '/service-png/backend.png'
      ]
    };
    return imageMap[serviceId] || ['/service-png/frontend.png', '/service-png/backend.png', '/service-png/cross.png'];
  };

  const serviceImages = getServiceImages(serviceId);

  const sectionRefs = {
    overview: useRef(null),
    provide: useRef(null),
    process: useRef(null),
    technologies: useRef(null)
  };

  const scrollToSection = (section) => {
    setActiveTab(section);
    sectionRefs[section]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      Code, Database, Smartphone, Globe, Shield, Palette, Cpu, Zap
    };
    return iconMap[iconName] || Code;
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden bg-white">
        {/* Modern Grid Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gray-200 opacity-20 blur-[100px]"></div>
        </div>

        {/* Abstract Organic Shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -right-20 top-[10%] w-96 h-96 border border-gray-200 rounded-full opacity-40"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 0],
              borderRadius: ["50%", "40%", "50%"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -left-20 bottom-[10%] w-72 h-72 border border-gray-200 rounded-full opacity-40 text-gray-100 flex items-center justify-center text-9xl font-black select-none"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            *
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-20">
          <div className="flex flex-col items-start max-w-6xl">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
              </span>
              <span className="text-sm font-mono font-medium tracking-[0.2em] uppercase text-gray-500">
                Premium Service
              </span>
            </motion.div>

            {/* Massive Editorial Title */}
            <h1 className="text-[10vw] md:text-[6rem] lg:text-[8rem] font-black text-black leading-[0.95] tracking-tighter mb-10 -ml-1 md:-ml-2 select-none">
              {service.title.split(' ').map((word, i) => (
                <div key={i} className="overflow-hidden pb-4 -mb-4">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.1 * i,
                      ease: [0.16, 1, 0.3, 1] // Custom refined bezier
                    }}
                  >
                    {word}
                  </motion.div>
                </div>
              ))}
            </h1>

            <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-20 w-full border-t border-gray-200 pt-10 mt-4">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-xl"
              >
                <p className="text-xl md:text-2xl text-gray-800 font-light leading-relaxed">
                  {service.subtitle}
                </p>

              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4 md:ml-auto"
              >
                <motion.a
                  href="/contact"
                  className="group relative px-10 py-5 bg-black text-white text-lg font-bold overflow-hidden rounded-full shadow-2xl shadow-black/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gray-900 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-in-out" />
                  <span className="relative flex items-center gap-3">
                    Start Project
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </span>
                </motion.a>

                <motion.button
                  onClick={() => scrollToSection('overview')}
                  className="px-8 py-5 text-black text-lg font-medium hover:bg-gray-50 rounded-full transition-colors duration-300 flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>
                  Explore
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-24">
          {/* Mobile Dropdown Navigation */}
          <div className="md:hidden" ref={mobileMenuRef}>
            <div className="relative">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full py-4 px-4 flex items-center justify-between bg-white border-2 border-black rounded-lg font-mono text-sm font-medium tracking-wider transition-all duration-300 hover:bg-gray-50"
              >
                <span className="text-black">
                  {[
                    { key: 'overview', label: 'OVERVIEW' },
                    { key: 'provide', label: 'WHAT WE PROVIDE' },
                    { key: 'process', label: 'HOW WE DO IT' },
                    { key: 'technologies', label: 'TECHNOLOGIES' }
                  ].find(tab => tab.key === activeTab)?.label || 'OVERVIEW'}
                </span>
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {[
                      { key: 'overview', label: 'OVERVIEW' },
                      { key: 'provide', label: 'WHAT WE PROVIDE' },
                      { key: 'process', label: 'HOW WE DO IT' },
                      { key: 'technologies', label: 'TECHNOLOGIES' }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          scrollToSection(tab.key);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full py-4 px-6 font-mono text-sm font-medium tracking-wider transition-all duration-300 text-left ${activeTab === tab.key
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Horizontal Navigation */}
          <nav className="hidden md:flex space-x-8 overflow-x-auto">
            {[
              { key: 'overview', label: 'OVERVIEW' },
              { key: 'provide', label: 'WHAT WE PROVIDE' },
              { key: 'process', label: 'HOW WE DO IT' },
              { key: 'technologies', label: 'TECHNOLOGIES' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => scrollToSection(tab.key)}
                className={`py-4 px-2 font-mono text-sm font-medium tracking-wider transition-all duration-300 relative whitespace-nowrap ${activeTab === tab.key
                  ? 'text-black'
                  : 'text-gray-500 hover:text-black'
                  }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Overview Section */}
      <section ref={sectionRefs.overview} className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              {service.overview.title}
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {service.overview.description}
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.overview.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-black p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-800 font-medium">{highlight}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {service.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section ref={sectionRefs.provide} className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              WHAT WE PROVIDE
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Comprehensive solutions tailored to meet your specific business needs
            </p>
          </motion.div>

          <div className="space-y-12">
            {service.whatWeProvide.map((serviceItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                  }`}
              >
                <div>
                  <h3 className="text-3xl font-black mb-4">{serviceItem.title}</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {serviceItem.description}
                  </p>
                  <div className="space-y-3">
                    {serviceItem.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-black rounded-full" />
                        <span className="text-gray-800">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <img
                  src={serviceImages[index] || '/service-png/frontend.png'}
                  alt={`${serviceItem.title}`}
                  className="w-full h-[28rem] object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Do It Section */}
      <section ref={sectionRefs.process} className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              HOW WE DO IT
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Our proven process ensures exceptional results every time
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />

            <div className="space-y-12">
              {service.howWeDoIt.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative flex items-start space-x-8"
                >
                  {/* Step Number */}
                  <div className="relative z-10 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-black text-xl flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-3">{phase.phase}</h3>
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      {phase.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.activities.map((activity, activityIndex) => (
                        <motion.div
                          key={activityIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: activityIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-white border border-gray-200 p-3 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-black rounded-full" />
                            <span className="text-gray-800 text-sm">{activity}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section ref={sectionRefs.technologies} className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              TECHNOLOGIES
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Cutting-edge tools and frameworks we use to build exceptional solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {service.technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden bg-white border-2 border-black p-6 text-center cursor-pointer group"
                whileHover={{ y: -5 }}
              >
                {/* Water fill effect */}
                <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>

                {/* Content */}
                <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    {getTechIcon(tech.name) ? (
                      <img
                        src={getTechIcon(tech.name)}
                        alt={tech.name}
                        className="w-full h-full object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                      />
                    ) : (
                      <div className="text-3xl">{tech.icon}</div>
                    )}
                  </div>
                  <h4 className="font-bold text-lg mb-1">{tech.name}</h4>
                  <p className="text-sm opacity-75 group-hover:opacity-100">{tech.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              {service.callToAction.title}
            </h2>
            <p className="text-xl mb-12 text-gray-300 leading-relaxed">
              {service.callToAction.subtitle}
            </p>
            <div className="flex justify-center">
              {service.callToAction.buttons.map((button, index) => (
                <motion.a
                  key={index}
                  href="/contact"
                  className="bg-white text-black px-8 py-4 font-bold text-lg hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {button.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function ServiceDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    }>
      <ServiceDetailsContent />
    </Suspense>
  );
}
