'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Star, Award, Zap, Code, Smartphone, Users, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { openConsultModal } from '@/components/ConsultModal';

export default function ServiceDetailsClient({ service }) {
  const [activeTab, setActiveTab] = useState('overview');
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTechIconUrl = (techName) => {
    const slugMap = {
      'React': 'react',
      'Next.js': 'nextdotjs',
      'TypeScript': 'typescript',
      'Node.js': 'nodedotjs',
      'MongoDB': 'mongodb',
      'PostgreSQL': 'postgresql',
      'GraphQL': 'graphql',
      'AWS': 'amazonwebservices',
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
      'SEMrush': 'semrush',
      'Ahrefs': 'ahrefs',
      'Google Ads': 'googleads',
      'Facebook Ads': 'meta',
      'Figma': 'figma',
      'Adobe XD': 'adobexd',
      'Sketch': 'sketch',
      'Principle': 'framer',
      'InVision': 'invision',
      'Zeplin': 'zeplin',
      'Google Cloud': 'googlecloud',
      'Azure': 'microsoftazure',
      'Kubernetes': 'kubernetes',
      'Terraform': 'terraform',
      'Shopify': 'shopify',
      'WooCommerce': 'woocommerce',
      'Magento': 'magento',
      'Stripe': 'stripe',
      'PayPal': 'paypal',
      'Inventory APIs': 'postman',
      'Content CMS': 'strapi',
    };

    const slug = slugMap[techName] || techName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `https://cdn.simpleicons.org/${slug}`;
  };

  const getServiceImages = (sId) => {
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
    return imageMap[sId] || ['/service-png/frontend.png', '/service-png/backend.png', '/service-png/cross.png'];
  };

  const serviceImages = getServiceImages(service.id);

  const sectionRefs = {
    overview: useRef(null),
    provide: useRef(null),
    process: useRef(null),
    technologies: useRef(null)
  };

  const scrollToSection = (sectionKey) => {
    setActiveTab(sectionKey);
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      const el = sectionRefs[sectionKey]?.current;
      if (el) {
        const navOffset = 90;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 60);
  };

  const getStatIcon = (label) => {
    const labelLower = label.toLowerCase();
    if (labelLower.includes('project') || labelLower.includes('app')) return <Code className="w-8 h-8 text-[#DE5D26]" />;
    if (labelLower.includes('satisfaction') || labelLower.includes('rating')) return <Star className="w-8 h-8 text-[#DE5D26]" />;
    if (labelLower.includes('experience')) return <Award className="w-8 h-8 text-[#DE5D26]" />;
    if (labelLower.includes('support')) return <Zap className="w-8 h-8 text-[#DE5D26]" />;
    if (labelLower.includes('download')) return <Smartphone className="w-8 h-8 text-[#DE5D26]" />;
    if (labelLower.includes('client')) return <Users className="w-8 h-8 text-[#DE5D26]" />;
    return <Award className="w-8 h-8 text-[#DE5D26]" />;
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#C3F53C] selection:text-black">

      {/* ── UNCHANGED: HERO SECTION ────────────────────────────────────────── */}
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
                      ease: [0.16, 1, 0.3, 1]
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
                <button
                  onClick={openConsultModal}
                  className="group relative px-10 py-5 bg-black text-white text-lg font-bold overflow-hidden rounded-full shadow-2xl shadow-black/20 cursor-pointer"
                >
                  <span className="relative flex items-center gap-3">
                    Start Project
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </span>
                </button>

                <button
                  onClick={() => scrollToSection('overview')}
                  className="px-8 py-5 text-black text-lg font-medium hover:bg-gray-50 rounded-full transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>
                  Explore
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ELEVATED: STICKY TAB NAVIGATION ───────────────────────────── */}
      <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Dropdown Navigation */}
          <div className="md:hidden py-3" ref={mobileMenuRef}>
            <div className="relative">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full py-3.5 px-5 flex items-center justify-between bg-[#F6F6F6] border border-gray-200 rounded-2xl text-xs font-bold tracking-widest uppercase cursor-pointer"
              >
                <span className="text-black font-semibold">
                  {[
                    { key: 'overview', label: 'OVERVIEW' },
                    { key: 'provide', label: 'WHAT WE PROVIDE' },
                    { key: 'process', label: 'HOW WE DO IT' },
                    { key: 'technologies', label: 'TECHNOLOGIES' }
                  ].find(tab => tab.key === activeTab)?.label || 'OVERVIEW'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 p-1"
                  >
                    {[
                      { key: 'overview', label: 'OVERVIEW' },
                      { key: 'provide', label: 'WHAT WE PROVIDE' },
                      { key: 'process', label: 'HOW WE DO IT' },
                      { key: 'technologies', label: 'TECHNOLOGIES' }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => scrollToSection(tab.key)}
                        className={`w-full py-3 px-5 text-left text-xs font-bold tracking-wider rounded-xl transition-colors cursor-pointer ${activeTab === tab.key
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2 py-3 overflow-x-auto">
            {[
              { key: 'overview', label: 'OVERVIEW' },
              { key: 'provide', label: 'WHAT WE PROVIDE' },
              { key: 'process', label: 'HOW WE DO IT' },
              { key: 'technologies', label: 'TECHNOLOGIES' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => scrollToSection(tab.key)}
                className={`py-2.5 px-6 rounded-full text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${activeTab === tab.key
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* ── ELEVATED: OVERVIEW SECTION ──────────────────────────────────── */}
      <section ref={sectionRefs.overview} className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-[0.2em] mb-4 block">
              Overview
            </span>
            <h2
              className="text-3xl md:text-5xl font-medium text-black mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {service.overview.title}
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
              {service.overview.description}
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {service.overview.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="bg-[#F8F9FA] rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="w-7 h-7 rounded-full bg-black text-[#C3F53C] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-gray-800 text-sm md:text-base font-medium leading-relaxed">{highlight}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-gray-100"
          >
            {service.stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200/80 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-3 flex justify-center">{getStatIcon(stat.label)}</div>
                <div className="text-3xl font-bold text-black mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── UNCHANGED: WHAT WE PROVIDE SECTION ───────────────────────────── */}
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

      {/* ── ELEVATED: TECHNOLOGIES SECTION ─────────────────────────────── */}
      <section ref={sectionRefs.technologies} className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs text-[#DE5D26] font-bold uppercase tracking-[0.2em] mb-4 block">
              Tech Stack
            </span>
            <h2
              className="text-3xl md:text-5xl font-medium tracking-tight text-black mb-4"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Technologies & Frameworks
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Cutting-edge tools and frameworks we use to build exceptional, production-grade solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {service.technologies.map((tech, index) => {
              const techName = typeof tech === 'string' ? tech : tech.name;
              const techCat = typeof tech === 'string' ? 'Framework' : (tech.category || 'Tool');

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: (index % 4) * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-[#F8F9FA] rounded-3xl p-6 border border-gray-200/60 shadow-sm hover:shadow-xl hover:bg-white hover:border-black transition-all duration-300 flex flex-col items-center text-center group cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <img
                      src={getTechIconUrl(techName)}
                      alt={techName}
                      className="w-7 h-7 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <h4 className="font-bold text-base text-black mb-1" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {techName}
                  </h4>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{techCat}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ELEVATED: CTA SECTION ───────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white max-w-[1400px] mx-auto overflow-hidden">
        <div className="relative w-full rounded-[2.5rem] bg-[#0B0D17] overflow-hidden min-h-[380px] flex items-center p-8 lg:p-16 text-white shadow-2xl">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#DE5D26]/15 rounded-full blur-[130px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-xs text-[#C3F53C] font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Build With TwoFloww
            </span>

            <h2
              className="text-3xl md:text-5xl font-medium leading-tight mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              READY TO BUILD YOUR NEXT SOLUTION?
            </h2>

            <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-lg">
              Let's create something extraordinary together. Schedule a free estimate and technical evaluation.
            </p>

            <button
              onClick={openConsultModal}
              className="flex items-center gap-4 bg-[#C3F53C] text-black rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 shadow-xl group cursor-pointer"
            >
              <span className="font-bold text-xs tracking-widest uppercase">Get Free Estimate</span>
              <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
