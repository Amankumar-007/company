"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCursor } from '@/components/Cursor';

const ProjectDetail = ({ params }) => {
  const router = useRouter();
  const { setCursorHover } = useCursor();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const projects = [
    {
      id: 1,
      title: "Punto Pago",
      description: "The First Super-App in Latin America",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
      fullDescription: "Punto Pago revolutionized the digital payment landscape in Latin America by creating the first comprehensive super-app that combines multiple services into a single, user-friendly platform. This innovative solution enables users to handle payments, transfers, bill payments, and various other financial transactions seamlessly.",
      technologies: ["React Native", "Node.js", "MongoDB", "AWS", "Stripe API"],
      features: [
        "Multi-service integration in one app",
        "Secure payment processing",
        "Real-time transaction tracking",
        "Biometric authentication",
        "Multi-language support"
      ],
      challenge: "Creating a unified platform that could handle multiple types of financial transactions while maintaining security and user experience across different Latin American markets with varying regulations.",
      solution: "We developed a modular architecture that could adapt to different regulatory requirements while maintaining a consistent user experience. The app uses advanced encryption and security protocols to protect user data and transactions."
    },
    {
      id: 2,
      title: "Kelvin Zero",
      description: "A digital product for passwordless authentication",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=800&fit=crop",
      fullDescription: "Kelvin Zero represents the future of digital authentication by eliminating the need for traditional passwords. This innovative solution uses advanced biometric and behavioral analysis to provide secure, seamless access to digital platforms.",
      technologies: ["React", "Python", "TensorFlow", "PostgreSQL", "Docker"],
      features: [
        "Biometric authentication",
        "Behavioral analysis",
        "Zero-knowledge proofs",
        "Cross-platform compatibility",
        "Real-time threat detection"
      ],
      challenge: "Developing a passwordless system that could match or exceed the security of traditional password-based systems while providing a frictionless user experience.",
      solution: "We implemented a multi-factor authentication system that combines biometric data with behavioral patterns, creating a unique user profile that's virtually impossible to replicate."
    },
    {
      id: 3,
      title: "DaoWay",
      description: "Astrology planner app: plan, achieve, thrive",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      fullDescription: "DaoWay combines ancient astrological wisdom with modern productivity techniques to create a unique planning application that helps users align their daily activities with cosmic rhythms and natural cycles.",
      technologies: ["React Native", "Firebase", "Astrology API", "Chart.js", "Redux"],
      features: [
        "Personalized astrological forecasts",
        "Goal tracking with cosmic timing",
        "Meditation and mindfulness exercises",
        "Community features",
        "Progress analytics"
      ],
      challenge: "Creating an app that could accurately provide astrological insights while maintaining scientific credibility and user engagement.",
      solution: "We developed a sophisticated algorithm that combines traditional astrological calculations with modern data analysis to provide personalized insights that users find both meaningful and actionable."
    },
    {
      id: 4,
      title: "Neural Dashboard",
      description: "AI-powered analytics platform for modern businesses",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      fullDescription: "Neural Dashboard harnesses the power of artificial intelligence to transform complex business data into actionable insights. This advanced analytics platform helps businesses make data-driven decisions with unprecedented accuracy and speed.",
      technologies: ["Vue.js", "Python", "TensorFlow", "InfluxDB", "Kubernetes"],
      features: [
        "Real-time data processing",
        "Predictive analytics",
        "Natural language queries",
        "Customizable dashboards",
        "Automated reporting"
      ],
      challenge: "Processing and analyzing massive amounts of business data in real-time while providing insights that are both accurate and understandable to non-technical users.",
      solution: "We implemented a distributed computing architecture with advanced machine learning models that can process and analyze data streams in real-time, presenting results through an intuitive visual interface."
    },
    {
      id: 5,
      title: "Flux Design",
      description: "Comprehensive design system for scalable applications",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop",
      fullDescription: "Flux Design is a comprehensive design system that enables teams to create consistent, scalable, and beautiful user interfaces across multiple platforms and devices.",
      technologies: ["Figma", "React", "Storybook", "TypeScript", "CSS-in-JS"],
      features: [
        "Component library",
        "Design tokens",
        "Accessibility guidelines",
        "Documentation system",
        "Theme management"
      ],
      challenge: "Creating a design system that could be flexible enough to work across different products while maintaining consistency and scalability.",
      solution: "We developed a modular design system based on design tokens and atomic design principles, allowing for both consistency and flexibility across different applications and use cases."
    },
    {
      id: 6,
      title: "Orbit Social",
      description: "Next-generation social platform for content creators",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop",
      fullDescription: "Orbit Social reimagines social media for content creators, providing tools and features specifically designed to help creators grow their audience, monetize their content, and build meaningful communities.",
      technologies: ["Next.js", "GraphQL", "Prisma", "Redis", "WebRTC"],
      features: [
        "Creator analytics",
        "Monetization tools",
        "Live streaming",
        "Community management",
        "Content scheduling"
      ],
      challenge: "Building a social platform that could handle the unique needs of content creators while providing a superior user experience for both creators and their audiences.",
      solution: "We created a platform with creator-centric features, advanced analytics, and multiple monetization options, all built on a scalable architecture that can handle high traffic and real-time interactions."
    }
  ];

  useEffect(() => {
    const projectId = parseInt(params.id);
    const foundProject = projects.find(p => p.id === projectId);
    
    if (foundProject) {
      setProject(foundProject);
    } else {
      router.push('/projects');
    }
    
    setLoading(false);
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
          <button 
            onClick={() => router.push('/projects')}
            className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
            onMouseEnter={() => setCursorHover(true, 'Back', 60, '#000000')}
            onMouseLeave={() => setCursorHover(false)}
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <button 
            onClick={() => router.push('/projects')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
            onMouseEnter={() => setCursorHover(true, 'Back', 60, '#000000')}
            onMouseLeave={() => setCursorHover(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <section className="mb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[60vh] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <main className="pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.fullDescription}
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.challenge}
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Solution</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.solution}
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <section className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              <section className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Project Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="font-medium text-gray-900">Web Application</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <p className="font-medium text-green-600">Completed</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Year</p>
                    <p className="font-medium text-gray-900">2024</p>
                  </div>
                </div>
              </section>

              <button 
                onClick={() => router.push('/contact')}
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
                onMouseEnter={() => setCursorHover(true, 'Get Started', 60, '#000000')}
                onMouseLeave={() => setCursorHover(false)}
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
