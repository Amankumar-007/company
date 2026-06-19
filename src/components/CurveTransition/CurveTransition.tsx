'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const panelVariants = {
  initial: {
    top: "0%"
  },
  exit: (index: number) => ({
    top: "-100%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1], // Custom cubic-bezier for snappy, premium feel
      delay: index * 0.08
    }
  })
};

const textVariants = {
  initial: {
    opacity: 0,
    y: 40
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
      delay: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -40,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.4
    }
  }
};

interface CurveTransitionProps {
  title: string;
}

export default function CurveTransition({ title }: CurveTransitionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    // Unmount from DOM after animations complete (total duration ~ 1.5s)
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  if (!isAnimating) return null;

  // Custom colors for our staggered columns (Middle column is brand green!)
  const panelColors = [
    "#0c0d0e", // Deep Charcoal
    "#121314", // Dark Grey
    "#7ED348", // Brand Green
    "#18191a", // Medium Grey
    "#0c0d0e"  // Deep Charcoal
  ];

  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] pointer-events-none flex overflow-hidden">
      {/* 5 Staggered Columns */}
      {panelColors.map((color, index) => (
        <motion.div
          key={index}
          variants={panelVariants}
          initial="initial"
          animate={isMounted ? "exit" : "initial"}
          custom={index}
          className="relative w-[20%] h-full shrink-0"
          style={{ backgroundColor: color }}
        />
      ))}

      {/* Floating Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-widest uppercase font-sans flex items-center gap-4 text-center px-6"
          style={{
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          {title}
        </motion.div>
      </div>
    </div>
  );
}
