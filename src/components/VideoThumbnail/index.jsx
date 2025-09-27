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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      // Set video to first frame and pause
      video.currentTime = 0;
      video.pause();
    };

    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
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
        muted
        loop
        playsInline
        preload="metadata"
        className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
      />
    </div>
  );
};

export default VideoThumbnail;
