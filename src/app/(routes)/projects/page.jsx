"use client"
import React, { useState, useEffect, useRef } from 'react';

const CubertoProjectsPage = () => {
  const containerRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Potion",
      subtitle: "E-commerce Platform",
      description: "A revolutionary e-commerce platform with AI-powered recommendations",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      color: "#FF6B6B",
      year: "2024"
    },
    {
      id: 2,
      title: "Neural",
      subtitle: "AI Dashboard",
      description: "Intelligent dashboard for machine learning model management",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      color: "#4ECDC4",
      year: "2024"
    },
    {
      id: 3,
      title: "Flux",
      subtitle: "Design System",
      description: "Comprehensive design system for modern applications",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
      color: "#45B7D1",
      year: "2023"
    },
    {
      id: 4,
      title: "Orbit",
      subtitle: "Social Platform",
      description: "Next-generation social media platform for creators",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      color: "#96CEB4",
      year: "2023"
    },
    {
      id: 5,
      title: "Zenith",
      subtitle: "Financial App",
      description: "Innovative fintech solution for modern banking",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      color: "#FFEAA7",
      year: "2023"
    },
    {
      id: 6,
      title: "Prism",
      subtitle: "Analytics Tool",
      description: "Advanced analytics platform for data visualization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      color: "#DDA0DD",
      year: "2022"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1, margin: "-50px" }
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

    return (
      <div
        ref={cardRef}
        className={`project-card relative overflow-hidden bg-white rounded-3xl shadow-lg border border-gray-100 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isHovered ? 'transform -translate-y-2 shadow-xl' : ''}`}
        style={{
          transitionDelay: isVisible ? `${Math.min(index * 50, 300)}ms` : '0ms'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-96 overflow-hidden">
          <div
            className={`absolute inset-0 transition-all duration-600 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className={`absolute inset-0 transition-opacity duration-400 ease-out ${isHovered ? 'opacity-70' : 'opacity-60'}`}
            style={{ backgroundColor: project.color }}
          />
          
          <div className="absolute top-6 right-6 text-white font-light text-sm transition-opacity duration-300">
            {project.year}
          </div>

          <div 
            className={`absolute bottom-0 left-0 right-0 p-8 text-white transition-transform duration-400 ease-out ${isHovered ? 'translate-y-0' : 'translate-y-2.5'}`}
          >
            <h3 className="text-4xl font-bold mb-2">
              {project.title}
            </h3>
            <p className="text-lg opacity-90 mb-3">
              {project.subtitle}
            </p>
            <p className="opacity-80">
              {project.description}
            </p>
          </div>

          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-400 ease-out ${isHovered ? 'opacity-15' : 'opacity-0'}`}
          />
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-gray-900 relative overflow-hidden">

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gray-900 rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `translateY(${scrollY * 0.1 * (Math.random() - 0.5)}px)`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 
              className="text-8xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent"
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
                opacity: 1 - scrollY * 0.002
              }}
            >
              Our Projects
            </h1>
            <p 
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
                opacity: 1 - scrollY * 0.003
              }}
            >
              We help bring ideas to life and create digital products that work.
              Each project is a journey of innovation and creative excellence.
            </p>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="relative z-10 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">Ready to create something amazing?</h2>
          <p className="text-xl text-gray-600 mb-8">Let's work together to bring your vision to life</p>
          <button 
            className="bg-gray-900 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
          >
            Start a Project
          </button>
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        /* Reset cursor to default */
        * {
          cursor: auto;
        }
        
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          overflow-x: hidden;
          background: white;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .project-card {
          will-change: transform, opacity;
          transform-origin: center center;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Grid container optimizations */
        .grid {
          contain: layout style;
        }
        
        /* Prevent flickering during scroll */
        .project-card {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        
        /* CSS animation utilities */
        .scale-100 {
          transform: scale(1);
        }
        
        .scale-105 {
          transform: scale(1.05);
        }
        
        .translate-y-0 {
          transform: translateY(0);
        }
        
        .translate-y-2.5 {
          transform: translateY(10px);
        }
        
        .translate-y-8 {
          transform: translateY(32px);
        }
        
        .opacity-0 {
          opacity: 0;
        }
        
        .opacity-60 {
          opacity: 0.6;
        }
        
        .opacity-70 {
          opacity: 0.7;
        }
        
        .opacity-100 {
          opacity: 1;
        }
        
        .opacity-15 {
          opacity: 0.15;
        }
        
        /* Animation timing utilities */
        .duration-400 {
          transition-duration: 400ms;
        }
        
        .duration-600 {
          transition-duration: 600ms;
        }
        
        .ease-out {
          transition-timing-function: ease-out;
        }

        /* Smooth scroll for better performance */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #999;
        }

        /* Ensure text selection is visible */
        ::selection {
          background: rgba(0, 0, 0, 0.1);
          color: black;
        }

        /* Masonry Grid Layout */
        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          align-items: start;
        }

        .masonry-item {
          break-inside: avoid;
        }

        .offset-down {
          margin-top: 4rem;
        }

        .offset-up {
          margin-top: -2rem;
        }

        @media (max-width: 768px) {
          .masonry-grid {
            grid-template-columns: 1fr;
          }
          
          .offset-down,
          .offset-up {
            margin-top: 0;
          }
        }

        /* Loading animation for images */
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
      `}</style>
    </div>
  );
};

export default CubertoProjectsPage;