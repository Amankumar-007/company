'use client';
import React, { useEffect, useState, useRef } from 'react';
import styles from './page.module.scss';
import { Globe, Smartphone, Palette, ShieldCheck, Clock, Lightbulb, Monitor, PenTool, Megaphone, Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

// Navbar Component

// Hero Section Component
const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo('.about-hero-content > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15 }
      );
      tl.fromTo('.about-hero-image-overlay',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        "-=0.5"
      );
    }
  }, []);

  return (
    <section ref={heroRef} className="relative p-4 sm:p-6 lg:p-8 bg-white max-w-[1600px] mx-auto min-h-[90vh] flex items-center pt-4 lg:pt-6">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 h-full min-h-[650px] lg:h-[80vh]">
        {/* Left Column - Content */}
        <div className="bg-[#F6F6F6] rounded-[2rem] p-8 lg:p-16 flex flex-col justify-center items-center text-center relative overflow-hidden h-full">
          <div className="about-hero-content relative z-10 max-w-xl mx-auto flex flex-col items-center">
            {/* Trusted Label */}
            <div className="flex items-center gap-4 mb-8 lg:mb-12">
              <span className="text-sm font-medium text-gray-800">Trusted over 5,000+</span>
              <div className="flex -space-x-3">
                <img src="/anshu.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-[#F6F6F6] object-cover" />
                <img src="/mahak.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-[#F6F6F6] object-cover" />
                <img src="/hariom.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-[#F6F6F6] object-cover" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] leading-[1.05] font-medium text-black tracking-tight mb-6">
              Empowering businesses through strategy and AI
            </h1>

            {/* Subheading */}
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-md mb-10">
              We are a consulting and AI innovation firm dedicated to helping organizations think smarter, move faster, and grow stronger.
            </p>

            {/* CTA Button */}
            <button className="flex items-center gap-4 bg-black text-white rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 group">
              <span className="font-bold text-sm tracking-widest uppercase">Get Started</span>
              <div className="w-10 h-10 rounded-full bg-[#C3F53C] flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 19L19 5M19 5H7M19 5V17" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column - Image & Typography Overlay */}
        <div className="relative rounded-[2rem] overflow-hidden h-full min-h-[400px] lg:min-h-full group">
          <img
            src="/about1.png"
            alt="About TwoFloww"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Aesthetic Typography Overlay */}
          <div className="absolute inset-0 flex items-start justify-end pt-10 px-8 lg:pt-12 lg:px-12">
            <div className="about-hero-image-overlay text-white max-w-sm text-right">
              <h2
                className="text-2xl md:text-3xl lg:text-4xl leading-snug font-light mb-3 text-white drop-shadow-md"
                style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.01em' }}
              >
                Crafting digital excellence <br /><span className="italic font-serif text-[#C3F53C]">with precision.</span>
              </h2>
              <div className="flex items-center justify-end gap-3">
                <p className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white/90 font-bold drop-shadow-md">
                  Inspiring Growth
                </p>
                <span className="w-8 h-[2px] bg-[#C3F53C]"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Tagline Section
const AboutTaglineSection = () => {
  const line1 = "A premium technology partner";
  const line2Part1 = "dedicated to engineering";
  const line2Part2 = "smarter";
  const line3Part1 = "and";
  const line3Part2 = "highly scalable";

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025, // fade in character by character
      }
    }
  };

  const charVariant = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  const renderText = (text) => {
    return text.split('').map((char, index) => (
      <motion.span key={index} variants={charVariant} className="inline-block">
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  return (
    <section className="py-16 md:py-24 bg-white flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Small tag */}
      <div className="flex items-center gap-2 mb-8">
        <span className="w-1.5 h-1.5 bg-black rounded-sm"></span>
        <span className="text-xs font-bold tracking-[0.2em] uppercase">About Us</span>
      </div>

      {/* Main heading */}
      <motion.h2 
        className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.35] md:leading-[1.25] text-black tracking-tight max-w-4xl mx-auto mb-14"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <span className="block mb-2 md:mb-4">{renderText(line1)}</span>
        <span className="flex items-center justify-center flex-wrap gap-2 md:gap-3 mb-2 md:mb-4">
          <span>{renderText(line2Part1)}</span>
          <motion.span variants={charVariant} className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#38BDF8] rounded-full text-white mx-1">
            <Clock className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
          </motion.span>
          <span>{renderText(line2Part2)}</span>
        </span>
        <span className="flex items-center justify-center flex-wrap gap-2 md:gap-3 text-gray-500 font-normal">
          <span className="italic">{renderText(line3Part1)}</span>
          <motion.span variants={charVariant} className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#C3F53C] rounded-full text-black mx-1">
            <Lightbulb className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
          </motion.span>
          <span>{renderText(line3Part2)}</span>
        </span>
      </motion.h2>

      {/* Avatars */}
      <motion.div 
        className="flex flex-col items-center mt-4"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex -space-x-3 mb-4">
          <img src="https://i.pravatar.cc/150?img=32" alt="Team" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-white object-cover" />
          <img src="https://i.pravatar.cc/150?img=12" alt="Team" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-white object-cover" />
          <img src="https://i.pravatar.cc/150?img=47" alt="Team" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-white object-cover" />
          <img src="https://i.pravatar.cc/150?img=5" alt="Team" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-white object-cover" />
          <img src="https://i.pravatar.cc/150?img=49" alt="Team" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-white object-cover" />
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-white bg-[#C3F53C] flex items-center justify-center text-black font-medium text-lg z-10 relative">
            +
          </div>
        </div>
        <p className="text-[13px] font-medium text-gray-700 mt-2">Trusted over 5,000+</p>
      </motion.div>
    </section>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-[#F2F2F2] rounded-[2rem] p-5 flex flex-col group cursor-pointer overflow-hidden transform hover:-translate-y-2 transition-all duration-300 h-full">
      {/* Top Section */}
      <div className="flex justify-between items-start pt-2 px-1 pb-8">
        <div>
          <h3 className="text-2xl lg:text-[2rem] font-medium text-black leading-tight mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.04em' }}>
            {member.name.split(' ').map((part, i) => (
              <React.Fragment key={i}>
                {part}<br />
              </React.Fragment>
            ))}
          </h3>
          <p className="text-[11px] text-gray-500 font-medium tracking-wide">
            {member.role}
          </p>
        </div>
        
        {/* Arrow Icon */}
        <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shrink-0 group-hover:bg-[#C3F53C] group-hover:text-black transition-colors duration-300 mt-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 19L19 5M19 5H7M19 5V17" />
          </svg>
        </div>
      </div>
      
      {/* Image Section */}
      <div className="relative w-full aspect-[1/1.1] rounded-[1.5rem] overflow-hidden mt-auto bg-gray-200">
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextSibling.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 items-center justify-center text-gray-500 text-6xl font-bold group-hover:scale-105 transition-transform duration-500 ease-out hidden">
          {member.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
    </div>
  );
};

// Team Section Component
const TeamSection = () => {
  const team = [
    { name: "Aman Kumar", role: "Founder & CEO", image: "/about.PNG" },
    { name: "Anshu Kumar", role: "Co-Founder & CTO", image: "https://i.pravatar.cc/300?img=11" },
    { name: "Mahak Kushwah", role: "Chief Operating Officer", image: "https://i.pravatar.cc/300?img=5" },
    { name: "Hariom", role: "Product Designer", image: "https://i.pravatar.cc/300?img=60" },
    { name: "Sarthak Bhatnagar", role: "Marketing Manager", image: "https://i.pravatar.cc/300?img=12" },
    { name: "Mohit Kumar", role: "Customer Success Lead", image: "https://i.pravatar.cc/300?img=33" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 bg-black rounded-sm"></span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Teams</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-medium text-black tracking-tight mb-8" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.03em' }}>
            Meet our teams
          </h2>
          
          <button className="flex items-center gap-4 bg-[#1A1A1A] text-white rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 group inline-flex">
            <span className="font-bold text-[11px] tracking-[0.2em] uppercase">Contact Us</span>
            <div className="w-8 h-8 rounded-full bg-[#C3F53C] flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 19L19 5M19 5H7M19 5V17" />
              </svg>
            </div>
          </button>
        </div>

        {/* Grid / Carousel */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-stretch">
          {team.map((member, index) => (
            <div key={`member-${index}`} className="min-w-[280px] w-[85vw] sm:w-auto sm:min-w-0 snap-center shrink-0">
              <TeamMemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Banner Section Component
const CTABannerSection = () => {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white max-w-[1400px] mx-auto overflow-hidden">
      <div className="relative w-full rounded-[2rem] overflow-hidden min-h-[400px] lg:min-h-[450px] flex items-center">
        {/* Background Image */}
        <img 
          src="/bg.jpg" 
          alt="CTA Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle overlay for text readability if needed */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 lg:p-16">
          
          {/* Left Text */}
          <div className="max-w-xl text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] mb-6 drop-shadow-md" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.02em' }}>
              We blend creative design with cutting-edge technology
            </h2>
            <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8 max-w-md drop-shadow-sm">
              Our expert team bridges strategic thinking and advanced digital solutions to help your business scale, improve online presence, and create intelligent user experiences.
            </p>
            
            <button className="flex items-center gap-3 bg-[#C3F53C] text-black rounded-full pl-6 pr-2 py-2 hover:scale-105 transition-transform duration-300 shadow-xl">
              <span className="font-bold text-[11px] tracking-[0.2em] uppercase">Get Started</span>
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 19L19 5M19 5H7M19 5V17" />
                </svg>
              </div>
            </button>
          </div>

          {/* Right Cards Illustration */}
          <div className="relative h-[300px] hidden lg:block perspective-1000">
            {/* Back Dark Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50, rotate: 0 }}
              whileInView={{ opacity: 1, x: 0, rotate: -8 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute right-32 top-8 w-[260px] bg-[#111] rounded-2xl p-6 text-white shadow-2xl border border-white/10"
            >
              <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                Expertise <span className="w-2 h-2 rounded-full bg-[#C3F53C]"></span>
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                Design<br/>
                Development<br/>
                <span className="text-white text-base">Strategy, Growth</span><br/>
                and Innovation
              </p>
            </motion.div>

            {/* Front Light Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 6 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="absolute right-4 top-16 w-[280px] bg-white rounded-2xl p-6 text-black shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-semibold text-sm">Performance</h4>
                  <p className="text-[10px] text-gray-500">In the past 7 days</p>
                </div>
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
              </div>
              
              <div className="mb-6">
                <div className="text-4xl font-bold mb-1 tracking-tight">84%</div>
                <div className="text-[11px] text-gray-500 flex items-center gap-2 font-medium">
                  Business growth
                  <span className="text-[#84CC16] bg-[#84CC16]/10 px-1.5 py-0.5 rounded font-bold text-[10px]">+12%</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-semibold text-gray-600 border border-gray-100">Digital</span>
                <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-semibold text-gray-600 border border-gray-100">Strategic</span>
                <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-semibold text-gray-600 border border-gray-100">Tech-Focused</span>
                <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-semibold text-gray-600 border border-gray-100">Grow Faster</span>
                <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-semibold text-gray-600 border border-gray-100">Build Smart</span>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

// What We Do Section Component
const WhatWeDoSection = () => {
  const services = [
    {
      title: "Web Development",
      description: "Creating responsive, fast, and secure websites that drive business growth.",
      icon: <Monitor className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />,
      features: ["Frontend", "Backend", "E-commerce"],
      hoverColor: "group-hover:bg-[#1A1A1A]"
    },
    {
      title: "Mobile Apps",
      description: "Transforming ideas into intuitive mobile applications that engage users.",
      icon: <Smartphone className="w-7 h-7 text-black transition-colors duration-300" strokeWidth={1.5} />,
      features: ["iOS", "Android", "Cross-Platform"],
      hoverColor: "group-hover:bg-[#C3F53C]"
    },
    {
      title: "UI/UX Design",
      description: "Crafting beautiful, user-centered designs that captivate and convert.",
      icon: <PenTool className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />,
      features: ["Wireframing", "Prototyping", "Design Systems"],
      hoverColor: "group-hover:bg-[#38BDF8]"
    },
    {
      title: "Digital Marketing",
      description: "Boosting your online presence and driving growth through data.",
      icon: <Megaphone className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />,
      features: ["SEO", "Social Media", "PPC"],
      hoverColor: "group-hover:bg-[#DE5D26]"
    },
    {
      title: "Brand Strategy",
      description: "Building strong brand identities that create lasting impressions.",
      icon: <Palette className="w-7 h-7 text-black transition-colors duration-300" strokeWidth={1.5} />,
      features: ["Identity", "Guidelines", "Research"],
      hoverColor: "group-hover:bg-[#C3F53C]"
    },
    {
      title: "Consulting",
      description: "Providing expert guidance to help your business leverage technology.",
      icon: <Briefcase className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />,
      features: ["Strategy", "Optimization", "Transformation"],
      hoverColor: "group-hover:bg-[#1A1A1A]"
    }
  ];

  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-[#C3F53C] rounded-full"></span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">What We Do</span>
            <span className="w-2 h-2 bg-[#C3F53C] rounded-full"></span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-medium tracking-tight text-black mb-6" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', letterSpacing: '-0.03em' }}>
            Elevating digital experiences
          </h2>
          <p className="text-gray-500 max-w-2xl text-base md:text-lg leading-relaxed">
            We provide comprehensive digital solutions, combining strategic thinking with cutting-edge technology to help you dominate your market.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-[2rem] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-gray-100 flex flex-col cursor-pointer transform hover:-translate-y-2">
              
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center ${service.hoverColor} transition-colors duration-500`}>
                  {service.icon}
                </div>
                {/* Decorative Arrow */}
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:border-black group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold mb-4 text-black tracking-tight">{service.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.features.map((feature, fIndex) => (
                  <span key={fIndex} className="px-4 py-1.5 bg-gray-50 rounded-full text-[11px] font-semibold text-gray-600 border border-gray-100 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300 tracking-wide">
                    {feature}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main About Page Component
const AboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 1000);
  }, []);

  return (
    <div className={`${styles.main} min-h-screen bg-white`}>
      <HeroSection />
      <AboutTaglineSection />
      <TeamSection />
      <WhatWeDoSection />
      <CTABannerSection />
    </div>
  );
};

export default AboutPage;