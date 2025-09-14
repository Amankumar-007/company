'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ServicesPage = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [expandedService, setExpandedService] = useState<number | null>(null)
  
  // Refs for GSAP animations
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const processRef = useRef(null)
  const ctaRef = useRef(null)
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([])

  const services = [
    {
      id: 1,
      title: "Web Development",
      subtitle: "Full-Stack Solutions",
      description: "Creating responsive, scalable web applications using modern technologies like React, Next.js, Node.js, and cutting-edge frameworks.",
      fullDescription: "We build everything from simple landing pages to complex enterprise applications. Our full-stack approach ensures seamless integration between frontend and backend systems, delivering robust solutions that scale with your business needs.",
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL"],
      features: [
        "Responsive Design",
        "Performance Optimization", 
        "SEO Friendly",
        "Progressive Web Apps",
        "API Development",
        "Database Design"
      ],
      stats: { projects: "150+", experience: "5+ Years", satisfaction: "98%" }
    },
    {
      id: 2,
      title: "Mobile Development",
      subtitle: "iOS & Android Apps",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      fullDescription: "From concept to deployment, we create apps that engage users and drive business growth. Our expertise spans both native development and cross-platform solutions, ensuring optimal performance across all devices.",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL"],
      features: [
        "Cross-Platform Development",
        "Native Performance",
        "Push Notifications",
        "Offline Functionality",
        "App Store Optimization",
        "Real-time Features"
      ],
      stats: { projects: "80+", experience: "4+ Years", satisfaction: "95%" }
    },
    {
      id: 3,
      title: "SEO & Marketing",
      subtitle: "Digital Growth Strategy",
      description: "Comprehensive digital marketing strategies that boost your online presence and drive organic traffic.",
      fullDescription: "We combine technical SEO expertise with content marketing strategies to maximize your digital reach. Our data-driven approach ensures measurable results and sustainable growth for your business.",
      technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Google Ads", "Facebook Ads", "Content CMS"],
      features: [
        "Technical SEO Audit",
        "Keyword Research",
        "Content Strategy",
        "Link Building",
        "Social Media Marketing",
        "Performance Tracking"
      ],
      stats: { projects: "200+", experience: "6+ Years", satisfaction: "97%" }
    },
    {
      id: 4,
      title: "UI/UX Design",
      subtitle: "User-Centered Design",
      description: "Creating intuitive and visually stunning user interfaces that enhance user experience.",
      fullDescription: "Our design process focuses on user research and prototyping to create interfaces that not only look beautiful but also drive conversions. We believe great design is invisible - it just works.",
      technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision", "Zeplin"],
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Visual Design",
        "Usability Testing",
        "Design Systems"
      ],
      stats: { projects: "120+", experience: "5+ Years", satisfaction: "99%" }
    },
    {
      id: 5,
      title: "Cloud Solutions",
      subtitle: "Scalable Infrastructure",
      description: "Robust cloud infrastructure solutions that scale with your business needs.",
      fullDescription: "We provide deployment, monitoring, and maintenance services across major cloud platforms. Our solutions ensure high availability, security, and cost-effectiveness for your applications.",
      technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"],
      features: [
        "Cloud Migration",
        "Auto Scaling",
        "Load Balancing",
        "Security Implementation",
        "Monitoring & Analytics",
        "Backup Solutions"
      ],
      stats: { projects: "90+", experience: "4+ Years", satisfaction: "96%" }
    },
    {
      id: 6,
      title: "E-commerce Solutions",
      subtitle: "Online Store Development", 
      description: "Complete e-commerce solutions that drive sales and provide seamless shopping experiences.",
      fullDescription: "From custom platforms to popular CMS integrations, we build converting stores that maximize your revenue. Our solutions include everything from payment processing to inventory management.",
      technologies: ["Shopify", "WooCommerce", "Magento", "Stripe", "PayPal", "Inventory APIs"],
      features: [
        "Payment Gateway Integration",
        "Inventory Management",
        "Order Processing",
        "Customer Analytics",
        "Multi-currency Support",
        "Mobile Commerce"
      ],
      stats: { projects: "110+", experience: "4+ Years", satisfaction: "94%" }
    }
  ]

  useEffect(() => {
    if (heroRef.current) {
      // Hero section animations with GSAP
      const tl = gsap.timeline({ delay: 0.1 })
      
      tl.fromTo('.hero-title-line',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', stagger: 0.05 }
      )
      .fromTo('.hero-description',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )

      // Services cards animation with ScrollTrigger
      serviceCardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        }
      })

      // Process section animation
      if (processRef.current) {
        gsap.fromTo('.process-title',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: processRef.current,
              start: 'top 80%',
              once: true
            }
          }
        )

        gsap.fromTo('.process-item',
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: processRef.current,
              start: 'top 70%',
              once: true
            }
          }
        )
      }

      // CTA section animation
      if (ctaRef.current) {
        gsap.fromTo('.cta-content > *',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 80%',
              once: true
            }
          }
        )
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6">
            <div className="hero-title-line">OUR</div>
            <div className="hero-title-line">SERVICES</div>
          </h1>
          <p className="hero-description text-lg md:text-xl max-w-2xl text-gray-600">
            We deliver comprehensive digital solutions that transform your business vision into reality. 
            From web development to digital marketing, we&apos;ve got you covered.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={el => { serviceCardsRef.current[index] = el; }}
                className="relative"
              >
                <motion.div
                  className="bg-white border-2 border-black p-8 cursor-pointer transition-all duration-500 h-full"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() => setExpandedService(service.id)}
                  animate={{
                    boxShadow: hoveredService === service.id ? '0 20px 60px rgba(0,0,0,0.15)' : '0 0px 0px rgba(0,0,0,0)',
                    scale: hoveredService === service.id ? 1.02 : 1
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {/* Service Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-mono text-gray-500 tracking-wider">
                      SERVICE {String(service.id).padStart(2, '0')}
                    </span>
                    <motion.div
                      className="w-8 h-8 border-2 border-black flex items-center justify-center"
                      animate={{
                        rotate: hoveredService === service.id ? 45 : 0,
                        scale: hoveredService === service.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="w-4 h-0.5 bg-black absolute" />
                      <div className="w-0.5 h-4 bg-black absolute" />
                    </motion.div>
                  </div>

                  {/* Service Title */}
                  <motion.h3 
                    className="text-3xl lg:text-4xl font-black mb-4 leading-tight"
                    animate={{
                      scale: hoveredService === service.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <p className="text-lg text-gray-600 mb-6 font-medium">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Quick Tech Preview */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-sm font-medium text-gray-700 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-gray-100 text-sm font-medium text-gray-500 rounded">
                      +{service.technologies.length - 3} more
                    </span>
                  </div>

                  {/* Click to expand hint */}
                  <motion.div
                    className="text-sm text-gray-500 font-medium"
                    animate={{
                      opacity: hoveredService === service.id ? 1 : 0.7
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Click to view details →
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Screen Expanded Service */}
        <AnimatePresence>
          {expandedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setExpandedService(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-white w-full max-w-4xl h-fit rounded-tr-2xl rounded-br-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const service = services.find(s => s.id === expandedService)
                  if (!service) return null
                  
                  return (
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex-1">
                          <span className="text-xs font-mono text-black tracking-widest block mb-2 uppercase">
                            Service {String(service.id).padStart(2, '0')}
                          </span>
                          <h2 className="text-5xl lg:text-6xl font-black mb-3 leading-tight">
                            {service.title}
                          </h2>
                          <p className="text-xl text-black font-medium">
                            {service.subtitle}
                          </p>
                        </div>
                        
                        {/* Close Button */}
                        <motion.button
                          onClick={() => setExpandedService(null)}
                          className="w-12 h-12 border-2 border-black flex items-center justify-center ml-6 bg-white hover:bg-black transition-colors"
                          whileHover={{ rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-5 h-0.5 bg-black absolute rotate-45" />
                          <div className="w-0.5 h-5 bg-black absolute rotate-45" />
                        </motion.button>
                      </div>

                      {/* Main Content */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                        {/* Left Column - Description and Stats */}
                        <div>
                          <h3 className="text-2xl font-black mb-6 text-black">Overview</h3>
                          <p className="text-base text-black leading-relaxed mb-8 font-medium">
                            {service.fullDescription}
                          </p>
                          
                          {/* Enhanced Stats */}
                          <div className="grid grid-cols-3 gap-3 mb-8">
                            <div className="text-center p-4 bg-black text-white border-2 border-black">
                              <div className="text-2xl font-black mb-1">{service.stats.projects}</div>
                              <div className="text-xs font-medium uppercase tracking-wide">Projects</div>
                            </div>
                            <div className="text-center p-4 bg-white text-black border-2 border-black">
                              <div className="text-2xl font-black mb-1">{service.stats.experience}</div>
                              <div className="text-xs font-medium uppercase tracking-wide">Experience</div>
                            </div>
                            <div className="text-center p-4 bg-black text-white border-2 border-black">
                              <div className="text-2xl font-black mb-1">{service.stats.satisfaction}</div>
                              <div className="text-xs font-medium uppercase tracking-wide">Satisfaction</div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <motion.button
                              className="bg-black text-white px-6 py-3 font-black text-base border-2 border-black hover:bg-white hover:text-black transition-all flex-1"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Get Quote
                            </motion.button>
                            <motion.button
                              className="bg-white text-black px-6 py-3 font-black text-base border-2 border-black hover:bg-black hover:text-white transition-all flex-1"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Portfolio
                            </motion.button>
                          </div>
                        </div>

                        {/* Right Column - Technologies */}
                        <div>
                          <h3 className="text-2xl font-black mb-6 text-black">Technologies</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {service.technologies.map((tech, techIndex) => (
                              <motion.div
                                key={tech}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: techIndex * 0.1 }}
                                className="flex items-center p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition-all duration-200"
                              >
                                <div className="w-1.5 h-1.5 bg-black mr-2 rounded-full" />
                                <span className="text-sm font-medium">{tech}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="process-title text-5xl md:text-6xl font-bold mb-16 text-center">
            OUR PROCESS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your needs and goals" },
              { step: "02", title: "Strategy", desc: "Planning the perfect solution" },
              { step: "03", title: "Development", desc: "Building with precision and care" },
              { step: "04", title: "Launch", desc: "Deploying and optimizing for success" }
            ].map((item) => (
              <motion.div
                key={item.step}
                className="process-item text-center group cursor-pointer"
                whileHover={{ y: -15, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-6xl font-black text-gray-300 mb-4 group-hover:text-black transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="px-6 md:px-12 lg:px-24 bg-black text-white" style={{ paddingTop: '4.75rem', paddingBottom: '4.75rem' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="cta-content">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              READY TO START?
            </h2>
            <p className="text-xl mb-12 text-gray-300">
              Let&apos;s discuss your project and bring your vision to life
            </p>
            <motion.button 
              className="bg-white text-black px-12 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage