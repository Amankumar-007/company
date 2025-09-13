"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const letters = "Agile-Driven".split('');

  return (
    <motion.section 
      className="relative min-h-screen mt-12 bg-white text-black overflow-hidden flex items-center justify-center"
      style={{ opacity }}
    >
      {/* Interactive background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute w-96 h-96 border border-black rounded-full opacity-10"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
          }}
        />
        <motion.div 
          className="absolute w-64 h-64 border border-black rounded-full opacity-5"
          style={{
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-6 w-full flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1.2, ease: "easeOut" }}
          className="space-y-12 flex flex-col items-center justify-center"
        >
          {/* Main heading with staggered animation */}
          <motion.h2 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.85] text-center w-full"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
          >
            <motion.span 
              className="block mb-4 tracking-wider"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.8 }}
            >
              WORLD'S FIRST
            </motion.span>
            
            {/* Animated letters for Agile-Driven */}
            <div className="block my-6">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block mx-1"
                  initial={{ opacity: 0, y: 50, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    delay: 3.5 + index * 0.1, 
                    duration: 0.6, 
                    type: "spring",
                    stiffness: 150
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    color: "#666",
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            
           
            <motion.span 
              className="block tracking-wider"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.7, duration: 0.8 }}
            >
              Agency
            </motion.span>
          </motion.h2>

          {/* Subtitle with typewriter effect */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-gray-600 max-w-4xl mx-auto leading-relaxed text-center"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            Creating scalable digital experiences with speed, flexibility, and innovation that transforms your business.
          </motion.p>

          {/* Interactive CTA buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-8 justify-center items-center "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.3, duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link 
                href="/get-started" 
                className="relative px-12 py-4 bg-black text-white font-medium text-sm tracking-widest uppercase overflow-hidden group inline-block"
              >
                <span className="relative z-10">Get Started</span>
                <motion.div 
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  Get Started
                </span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link 
                href="/portfolio" 
                className="relative px-12 py-4 border-2 border-black text-black font-medium text-sm tracking-widest uppercase overflow-hidden group inline-block"
              >
                <span className="relative z-10">See Our Work</span>
                <motion.div 
                  className="absolute inset-0 bg-black"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  See Our Work
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
