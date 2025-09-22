'use client'
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Brain, Zap, Globe, Users, ArrowRight, ExternalLink, Github, Play } from 'lucide-react';
import VideoComponent from '@/components/VideoComponent';
import SplitText from '@/components/SplitText';
import { useSearchParams } from 'next/navigation';
import { getProjectById } from '@/data/projects';
import { notFound } from 'next/navigation';

function ProjectDetailsContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const project = getProjectById(projectId);
  
  if (!project) {
    notFound();
  }
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoClick = () => {
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
      videoRef.current.play();
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(console.log);
      setIsVideoPlaying(true);
    }
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const technologies = [
    { name: 'Next.js', category: 'Frontend Framework', icon: '⚛️' },
    { name: 'React', category: 'UI Library', icon: '⚛️' },
    { name: 'TypeScript', category: 'Language', icon: '📘' },
    { name: 'Tailwind CSS', category: 'Styling', icon: '🎨' },
    { name: 'GSAP', category: 'Animation', icon: '✨' },
    { name: 'Framer Motion', category: 'Animation', icon: '🎭' },
    { name: 'Three.js', category: '3D Graphics', icon: '🎲' },
    { name: 'Node.js', category: 'Runtime', icon: '💚' },
    { name: 'OpenAI API', category: 'AI Integration', icon: '🤖' },
    { name: 'Vercel', category: 'Deployment', icon: '🚀' },
    { name: 'MongoDB', category: 'Database', icon: '🍃' },
    { name: 'Prisma', category: 'ORM', icon: '🔺' }
  ];

  const features = [
    { title: 'AI-Powered Analysis', description: 'Advanced machine learning algorithms for intelligent data processing' },
    { title: 'Real-time Processing', description: 'Lightning-fast response times with optimized performance' },
    { title: 'Interactive UI', description: 'Intuitive user interface with smooth animations and transitions' },
    { title: 'Scalable Architecture', description: 'Built to handle growing user demands and data volumes' },
    { title: 'Cross-platform', description: 'Works seamlessly across all devices and browsers' },
    { title: 'API Integration', description: 'Seamless integration with external APIs and services' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Tabs */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex space-x-8">
              {['overview', 'technology', 'case-study', 'features'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 relative ${
                    activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {tab.toUpperCase().replace('-', ' ')}
                  {activeTab === tab && (
                    <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-black rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition-all duration-300 transform hover:scale-105">
                <Github className="w-4 h-4" />
                <span className="text-sm font-medium">VIEW CODE</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105">
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">LIVE DEMO</span>
              </button>
            </div>
          </div>
        </div>
      </div>
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="flex flex-col items-center justify-center text-center space-y-12">
            {/* Enhanced Hero Section */}
            <div className="space-y-6 max-w-6xl">
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center space-x-3"
              >
                <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-black tracking-widest uppercase">{project.status}</span>
              </motion.div>

              {/* Enhanced Title with SplitText */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="relative">
                  <SplitText
                    text={project.title}
                    className="text-7xl md:text-8xl lg:text-9xl font-black text-black leading-[0.85] tracking-tight"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                    tag="h1"
                  />
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-black rounded-full"></div>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-400 leading-tight tracking-wide">
                  {project.subtitle}
                </h2>
              </motion.div>

              {/* Enhanced Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal max-w-3xl mx-auto px-4"
              >
                {project.description}
              </motion.p>
            </div>

            {/* Enhanced Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-bold text-lg">VIEW CODE</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-3 px-8 py-4 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 group"
              >
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="font-bold text-lg">LIVE DEMO</span>
              </motion.button>
            </motion.div>
          </div>
      </div>
      <VideoComponent/>

      {/* Technology Stack Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-light mb-6">
              <span className="text-black font-black">TECHNOLOGY</span><br />
              <span className="text-gray-400">STACK</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Built with cutting-edge technologies to ensure optimal performance, scalability, and user experience.
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-8">
            {project.technologies.map((tech, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-black text-lg">{tech.name}</h3>
                    <p className="text-xs text-gray-500 tracking-wide uppercase font-medium">{tech.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-12 gap-12">
            {/* Left Column - Case Study Content */}
            <div className="col-span-8">
              <div className="mb-16">
                <h2 className="text-6xl font-light mb-8">
                  <span className="text-black font-black">CASE</span><br />
                  <span className="text-gray-400">STUDY</span>
                </h2>
              </div>

              {/* Problem Section */}
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-black mb-6">{project.caseStudy.challenge.title}</h3>
                {project.caseStudy.challenge.content.map((paragraph, index) => (
                  <p key={index} className="text-xl text-gray-700 leading-relaxed mb-6 font-light">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Solution Section */}
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-black mb-6">{project.caseStudy.solution.title}</h3>
                {project.caseStudy.solution.content.map((paragraph, index) => (
                  <p key={index} className="text-xl text-gray-700 leading-relaxed mb-8 font-light">
                    {paragraph}
                  </p>
                ))}
                <div className="grid grid-cols-2 gap-8 mt-10">
                  {project.caseStudy.solution.features.map((feature, index) => (
                    <div key={index} className="border-l-4 border-gray-300 pl-6 hover:border-black transition-colors duration-300">
                      <h4 className="font-bold text-black mb-3 text-lg">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results Section */}
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-black mb-6">{project.caseStudy.results.title}</h3>
                <div className="grid grid-cols-3 gap-8">
                  {project.caseStudy.results.metrics.map((metric, index) => (
                    <div key={index} className="text-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                      <div className="text-5xl font-black text-black mb-3">{metric.value}</div>
                      <div className="text-gray-600 font-medium">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Project Images & Technical Details */}
            <div className="col-span-4">
              <div className="space-y-10">
                {/* Project Screenshots */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-black">PROJECT SHOWCASE</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {project.screenshots.map((screenshot, index) => (
                      <div key={index} className="aspect-video rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <img 
                          src={screenshot.url} 
                          alt={screenshot.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
                  <h4 className="font-bold text-black mb-6 text-lg">TECHNICAL SPECS</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Response Time:</span>
                      <span className="text-black font-bold">{project.technicalSpecs.responseTime}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Uptime:</span>
                      <span className="text-black font-bold">{project.technicalSpecs.uptime}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Data Processing:</span>
                      <span className="text-black font-bold">{project.technicalSpecs.dataProcessing}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Security:</span>
                      <span className="text-black font-bold">{project.technicalSpecs.security}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-black py-24">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-6xl font-light text-white mb-8">
            {project.callToAction.title}
            <span className="block text-gray-400"></span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            {project.callToAction.subtitle}
          </p>
          <div className="flex justify-center space-x-6">
            {project.callToAction.buttons.map((button, index) => (
              <button key={index} className="flex items-center space-x-3 px-10 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                <span className="font-bold text-lg">{button.label}</span>
                {button.icon === 'ArrowRight' && <ArrowRight className="w-5 h-5" />}
                {button.icon === 'ExternalLink' && <ExternalLink className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    }>
      <ProjectDetailsContent />
    </Suspense>
  );
}