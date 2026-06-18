'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '@/components/Cursor';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { setCursorHover } = useCursor();

  useEffect(() => {
    const toggleVisibility = () => {
      // Check standard window scroll
      const scrolled = document.documentElement.scrollTop || window.scrollY || document.body.scrollTop;
      if (scrolled > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    // Fallback for locomotive scroll which might dispatch custom scroll events
    // or just listen to all scroll events on document
    document.addEventListener('scroll', toggleVisibility, { capture: true, passive: true });
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      document.removeEventListener('scroll', toggleVisibility, { capture: true });
    };
  }, []);

  const scrollToTop = () => {
    // Attempt standard scroll
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // For locomotive-scroll specifically if it's running
    if (window.locomotiveScroll) {
      window.locomotiveScroll.scrollTo(0, { duration: 1000 });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          onMouseEnter={() => setCursorHover(true, '', 60, '#ffffff', (
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          ))}
          onMouseLeave={() => setCursorHover(false)}
          className="fixed bottom-8 right-8 z-[9999] bg-black text-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden group border border-white/10"
          style={{ width: '56px', height: '56px' }}
          aria-label="Scroll to top"
        >
          {/* Liquid hover effect */}
          <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          
          <svg 
            className="w-6 h-6 relative z-10 text-white group-hover:text-black transition-colors duration-300 transform group-hover:-translate-y-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
