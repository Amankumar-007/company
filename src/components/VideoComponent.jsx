import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useCursor } from './Cursor/index';

const VideoComponent = ({ videoSrc = '/video1.mp4' }) => {
  const { setCursorHover } = useCursor();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Start downloading the video only when it's about to scroll into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  
  // Memoize device detection to avoid recalculating
  const checkIsMobileOrTablet = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)|tablet|kindle|silk|playbook|nexus\s7|nexus\s9|nexus\s10/i.test(userAgent);
    
    return isMobile || isTablet;
  }, []);
  
  // Initialize device detection
  useEffect(() => {
    setIsMobileOrTablet(checkIsMobileOrTablet());
    
    const handleResize = () => {
      setIsMobileOrTablet(checkIsMobileOrTablet());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkIsMobileOrTablet]);
  

  const handleMouseEnter = () => {
    // Create orange play button SVG
    const playIcon = (
      <svg 
        className="w-5 h-5" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
          clipRule="evenodd" 
        />
      </svg>
    );
    
    setCursorHover(true, '', 60, '#ff6b35', playIcon);
  };

  const handleMouseLeave = () => {
    setCursorHover(false);
  };

  const handleClick = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handleFullscreenChange = () => {
    const isFullscreen = document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
    
    if (!isFullscreen && videoRef.current) {
      // Exit fullscreen handling if needed
      videoRef.current.play();
    }
  };

  useEffect(() => {
    // Add fullscreen change event listeners
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    return () => {
      // Clean up event listeners
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);
  return (
    <section className="relative w-full max-w-7xl mx-auto px-3 sm:px-6">
      {/* Video container with curved corners and shadow */}
      {/* md:aspect-video reserves the 16:9 box up front — with h-auto the height
          was 0 until the video's metadata loaded, shifting the page (CLS). */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer h-[55vh] md:h-auto md:aspect-video bg-neutral-900"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* src is only set once the player is near the viewport, so this ~6MB
            video no longer competes with the page's critical resources. */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={shouldLoad ? videoSrc : undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          onContextMenu={(e) => isMobileOrTablet && e.preventDefault()}
        />
        
      </div>
    </section>
  );
};

export default  VideoComponent;