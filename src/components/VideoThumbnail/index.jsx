'use client';
import React, { useState, useRef, useEffect } from 'react';
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
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setHasLoaded(true);
      // Capture the first frame as poster
      video.currentTime = 0.1;
    };

    const handleTimeUpdate = () => {
      if (video.currentTime > 0 && video.currentTime < 0.2) {
        video.pause();
        video.currentTime = 0;
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered && !isPlaying) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Video play failed:', error);
      });
    } else if (!isHovered && isPlaying) {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isHovered, isPlaying]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload="metadata"
        className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        style={{ display: hasLoaded ? 'block' : 'none' }}
      />
      
      {/* Fallback image while video loads */}
      {!hasLoaded && posterSrc && (
        <img
          src={posterSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
      )}

      {/* Play button overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
        isHovered ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="w-16 h-16 bg-black bg-opacity-70 rounded-full flex items-center justify-center backdrop-blur-sm">
          <svg 
            className="w-8 h-8 text-white ml-1" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>

      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
        isHovered ? 'opacity-10' : 'opacity-0'
      }`} />
    </div>
  );
};

export default VideoThumbnail;
