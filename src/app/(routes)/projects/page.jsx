"use client"
import React, { useState, useEffect, useRef } from 'react';

const CubertoProjectsPage = () => {
  const containerRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Punto Pago",
      description: "The First Super-App in Latin America",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Kelvin Zero",
      description: "A digital product for passwordless authentication",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "DaoWay",
      description: "Astrology planner app: plan, achieve, thrive",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Neural Dashboard",
      description: "AI-powered analytics platform for modern businesses",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Flux Design",
      description: "Comprehensive design system for scalable applications",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      title: "Orbit Social",
      description: "Next-generation social platform for content creators",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    }
  ];

  const ProjectCard = ({ project, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

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

    return (
      <div
        ref={cardRef}
        className={`transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] group cursor-pointer">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isHovered ? 'opacity-5' : 'opacity-0'
          }`} />
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
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Header */}
      <header className="pt-20 pb-16 lg:pt-24 lg:pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
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
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {projects.map((project, index) => (
              <div key={project.id} className={index % 2 === 1 ? 'lg:mt-20' : ''}>
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Call to Action */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to create something amazing?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Let's work together to bring your vision to life.
          </p>
          <button className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            Start a Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default CubertoProjectsPage;