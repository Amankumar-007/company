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
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Professional Background */}
        <div className="absolute inset-0">
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-60"></div>
          
          {/* Minimal Geometric Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, black 1px, transparent 1px), 
                               radial-gradient(circle at 75% 75%, black 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          {/* Single Subtle Floating Element */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-50 to-gray-100 rounded-full filter blur-3xl opacity-30"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Professional Category Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <span className="inline-block px-6 py-2 border border-gray-300 text-gray-700 text-sm font-mono tracking-wider font-medium rounded-lg bg-white/80 backdrop-blur-sm">
                {service.category}
              </span>
            </motion.div>

            {/* Professional Main Title */}
            <div className="relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
                {service.title.split(' ').map((word, wordIndex) => (
                  <div key={wordIndex} className="block mb-2">
                    {word.split('').map((char, charIndex) => (
                      <motion.span
                        key={`${wordIndex}-${charIndex}`}
                        initial={{ opacity: 0, y: 60, rotateX: 90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.4 + (wordIndex * 0.15) + (charIndex * 0.03),
                          type: "spring",
                          stiffness: 120,
                          damping: 25
                        }}
                        className="inline-block hover:text-gray-700 transition-colors duration-300"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </h1>
            </div>

            {/* Professional Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl font-normal text-gray-600 mb-6 leading-relaxed max-w-4xl mx-auto px-4"
            >
              {service.subtitle}
            </motion.p>

            {/* Professional Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed px-4"
            >
              {service.heroDescription}
            </motion.p>

            {/* Professional CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8 items-center"
            >
              <motion.a
                href="#"
                className="px-8 py-3 bg-black text-white rounded-lg font-medium transition-all duration-300 hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>
              
              <motion.a
                href="#"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2">
                  <span>View Portfolio</span>
                  <ExternalLink className="w-4 h-4" />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Remove pulse animation CSS */}
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { key: 'overview', label: 'OVERVIEW' },
              { key: 'provide', label: 'WHAT WE PROVIDE' },
              { key: 'process', label: 'HOW WE DO IT' },
              { key: 'technologies', label: 'TECHNOLOGIES' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => scrollToSection(tab.key)}
                className={`py-4 px-2 font-mono text-sm font-medium tracking-wider transition-all duration-300 relative ${
                  activeTab === tab.key 
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
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
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
                <div className="bg-gray-100 border-2 border-black h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {index === 0 ? '💻' : index === 1 ? '⚙️' : '🛒'}
                    </div>
                    <p className="text-gray-600 font-medium">Service Visualization</p>
                  </div>
                </div>
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
                  <div className="text-3xl mb-3">{tech.icon}</div>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {service.callToAction.buttons.map((button, index) => (
                <motion.button
                  key={index}
                  className="bg-white text-black px-8 py-4 font-bold text-lg hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {button.label}
                </motion.button>
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
