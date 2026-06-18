"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useCursor } from '@/components/Cursor';
import { useRouter } from 'next/navigation';
import FAQ from '@/components/Faq';
import ProjectTimeline from '@/components/ProjectTimeline';
import VideoThumbnail from '@/components/VideoThumbnail';
import { getAllProjects } from '@/data/projects';

// Pattern Component for Projects
const ProjectsPattern = () => (
  <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none text-black z-0">
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M 20 40 C 80 0 120 200 180 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 40 70 C 90 40 110 160 160 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 60 100 C 100 80 100 120 140 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="5 15"/>
    </svg>
  </div>
);

// Memoized ProjectCard component to prevent unnecessary re-renders
const ProjectCard = React.memo(({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const { setCursorHover } = useCursor();
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: "-20px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Memoized event handlers to prevent unnecessary re-renders
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setCursorHover(true, 'Explore', 80, '#000000');
  }, [setCursorHover]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCursorHover(false);
  }, [setCursorHover]);

  const handleClick = useCallback(() => {
    router.push(`/project-detail?id=${project.id}`);
  }, [router, project.id]);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 50}ms` : '0ms'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Thumbnail */}
      <div 
        className="relative mb-8 overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <VideoThumbnail
          videoSrc={project.video}
          posterSrc={project.screenshots[0]?.url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'}
          alt={project.title}
          className="w-full h-full"
          isHovered={isHovered}
        />
      </div>

      {/* Text */}
      <div className="space-y-2">
        <p className="text-lg leading-relaxed text-gray-900">
          <span className="font-bold text-black">{project.title}</span>
          {" – "}
          <span className="font-normal text-gray-600">{project.description}</span>
        </p>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const CubertoProjectsPage = () => {
  const containerRef = useRef(null);

  // Memoize projects data to load only once
  const projects = useMemo(() => getAllProjects(), []);

  // Initialize Locomotive Scroll only once
  useEffect(() => {
    let locomotiveScroll;
    
    const initScroll = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      locomotiveScroll = new LocomotiveScroll();
    };
    
    initScroll();
    
    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative pb-16 lg:pt-14 lg:pb-20">
        <ProjectsPattern />
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our Projects
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We help bring ideas to life and create digital products that work.
            </p>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {projects.map((project, index) => (
              <div key={project.id} className={index % 2 === 1 ? 'lg:mt-20' : ''}>
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <ProjectTimeline />

      <FAQ />

      {/* Call to Action */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to create something amazing?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Let's work together to bring your vision to life.
          </p>
          <button onClick={() => window.location.assign('/contact')} className="relative z-50 cursor-pointer bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            Start a Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default CubertoProjectsPage;