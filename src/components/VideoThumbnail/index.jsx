'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

const VideoThumbnail = ({ 
  videoSrc, 
  posterSrc, 
  alt, 
  className = '', 
  isHovered = false,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const checkIsMobileOrTablet = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)|tablet|kindle|silk|playbook|nexus\s7|nexus\s9|nexus\s10/i.test(userAgent);
    return isMobile || isTablet;
  }, []);

  useEffect(() => {
    setIsMobileOrTablet(checkIsMobileOrTablet());
    const handleResize = () => setIsMobileOrTablet(checkIsMobileOrTablet());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkIsMobileOrTablet]);

  // Handle desktop hover playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isMobileOrTablet) return;

    if (isHovered) {
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isHovered, isMobileOrTablet]);

  // Handle mobile/tablet scroll intersection playback
  useEffect(() => {
    if (!isMobileOrTablet) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isMobileOrTablet]);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* Background Poster Image (Always Rendered to Prevent Flickering) */}
      {posterSrc && (
        <Image
          src={posterSrc}
          alt={alt || "Video thumbnail"}
          fill
          className={`object-cover transition-transform duration-500 ease-out ${
            !isMobileOrTablet && isHovered ? 'scale-105' : 'scale-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      {/* Video Overlay (Smooth Opacity Transition) */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
          isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${!isMobileOrTablet && isHovered ? 'scale-105' : 'scale-100'}`}
        disablePictureInPicture
        onContextMenu={(e) => isMobileOrTablet && e.preventDefault()}
      />
    </div>
  );
};

export default React.memo(VideoThumbnail);
