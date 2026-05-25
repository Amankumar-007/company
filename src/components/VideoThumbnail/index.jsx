'use client';
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import styles from './style.module.scss';

const VideoThumbnail = ({ 
  videoSrc, 
  posterSrc, 
  alt, 
  className = '', 
  isHovered = false,
  onClick 
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Memoize device detection to avoid recalculating
  const checkIsMobileOrTablet = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)|tablet|kindle|silk|playbook|nexus\s7|nexus\s9|nexus\s10/i.test(userAgent);
    
    return isMobile || isTablet;
  }, []);

  // Memoize video source to prevent unnecessary re-renders
  const memoizedVideoSrc = useMemo(() => videoSrc, [videoSrc]);
  
  // Initialize device detection
  useEffect(() => {
    setIsMobileOrTablet(checkIsMobileOrTablet());
    
    const handleResize = () => {
      setIsMobileOrTablet(checkIsMobileOrTablet());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkIsMobileOrTablet]);

  // Handle video loaded data
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      // For mobile/tablet: auto-play and loop
      if (isMobileOrTablet) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Mobile video auto-play failed:', error);
          // Fallback: try to play on user interaction
          const handleUserInteraction = () => {
            video.play().then(() => setIsPlaying(true));
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('click', handleUserInteraction);
          };
          document.addEventListener('touchstart', handleUserInteraction);
          document.addEventListener('click', handleUserInteraction);
        });
      } else {
        // For desktop: set to first frame and pause
        video.currentTime = 0;
        video.pause();
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    
    // Handle video errors
    const handleError = () => {
      console.error('Video loading error for:', memoizedVideoSrc);
    };
    
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [memoizedVideoSrc, isMobileOrTablet]);

  // Handle hover state changes (desktop only)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isMobileOrTablet) return;

    if (isHovered && !isPlaying) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Desktop video play failed:', error);
      });
    } else if (!isHovered && isPlaying) {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isHovered, isPlaying, isMobileOrTablet]);

  // Ensure video continues playing on mobile/tablet when it becomes visible
  useEffect(() => {
    if (!isMobileOrTablet) return;
    
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isPlaying) {
          video.play().then(() => setIsPlaying(true))
            .catch((error) => console.log('Intersection play failed:', error));
        } else if (!entry.isIntersecting && isPlaying) {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isMobileOrTablet, isPlaying]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        src={memoizedVideoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload="none"
        className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
          !isMobileOrTablet && isHovered ? 'scale-105' : 'scale-100'
        }`}
        // Disable picture-in-picture for better mobile performance
        disablePictureInPicture
        // Prevent context menu on mobile
        onContextMenu={(e) => isMobileOrTablet && e.preventDefault()}
      />
    </div>
  );
};

export default VideoThumbnail;
