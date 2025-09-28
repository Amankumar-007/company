import React, { useState, useRef, useEffect } from 'react';
import { useCursor } from './Cursor/index';
import { usePathname, useSearchParams } from 'next/navigation';
import { getProjectById } from '@/data/projects';

const VideoComponent = () => {
  const { setCursorHover } = useCursor();
  const videoRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Determine current page and get appropriate video
  const getCurrentVideo = () => {
    // Check if we're on project detail page
    if (pathname === '/project-detail') {
      const projectId = searchParams.get('id');
      const project = getProjectById(projectId);
      
      // Return project-specific video or fallback
      if (project && project.video) {
        return project.video;
      }
      
      // Fallback videos based on project ID (using only available videos)
      const projectVideos = {
        '1': '/video1.mp4',     // AI Tool project
        '2': '/video2.mp4',     // Ecommerce project
        '3': '/video1.mp4',     // Task Manager project (fallback to video1 since video3 doesn't exist)
      };
      
      return projectVideos[projectId] || '/video1.mp4';
    }
    
    // Default video for homepage and other pages
    return '/video1.mp4';
  };
  
  const videoSource = getCurrentVideo();

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
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Video container with curved corners and shadow */}
      <div 
        className="relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer h-[55vh] md:h-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <video
          ref={videoRef}
          className="w-full h-full md:h-auto object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          {/* Dynamic video source based on current page */}
          <source
            src={videoSource}
            type="video/mp4"
          />
          {/* Fallback for browsers that don't support video */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-full min-h-[360px] md:min-h-[500px] flex items-center justify-center text-white text-xl font-semibold">
            Video Preview
          </div>
        </video>
        
      </div>
    </div>
  );
};

export default  VideoComponent;