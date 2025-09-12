'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ServicesPage = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  
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
      description: "Creating responsive, scalable web applications using modern technologies like React, Next.js, Node.js, and cutting-edge frameworks. We build everything from simple landing pages to complex enterprise applications.",
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL"],
      features: [
        "Responsive Design",
        "Performance Optimization", 
        "SEO Friendly",
        "Progressive Web Apps",
        "API Development",
        "Database Design"
      ]
    },
    {
      id: 2,
      title: "Mobile Development",
      subtitle: "iOS & Android Apps",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences. From concept to deployment, we create apps that engage users and drive business growth.",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL"],
      features: [
        "Cross-Platform Development",
        "Native Performance",
        "Push Notifications",
        "Offline Functionality",
        "App Store Optimization",
        "Real-time Features"
      ]
    },
    {
      id: 3,
      title: "SEO & Marketing",
      subtitle: "Digital Growth Strategy",
      description: "Comprehensive digital marketing strategies that boost your online presence and drive organic traffic. We combine technical SEO expertise with content marketing strategies.",
      technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Google Ads", "Facebook Ads", "Content CMS"],
      features: [
        "Technical SEO Audit",
        "Keyword Research",
        "Content Strategy",
        "Link Building",
        "Social Media Marketing",
        "Performance Tracking"
      ]
    },
    {
      id: 4,
      title: "UI/UX Design",
      subtitle: "User-Centered Design",
      description: "Creating intuitive and visually stunning user interfaces that enhance user experience and drive conversions. Our design process focuses on user research and prototyping.",
      technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision", "Zeplin"],
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Visual Design",
        "Usability Testing",
        "Design Systems"
      ]
    },
    {
      id: 5,
      title: "Cloud Solutions",
      subtitle: "Scalable Infrastructure",
      description: "Robust cloud infrastructure solutions that scale with your business needs. We provide deployment, monitoring, and maintenance services across major cloud platforms.",
      technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"],
      features: [
        "Cloud Migration",
        "Auto Scaling",
        "Load Balancing",
        "Security Implementation",
        "Monitoring & Analytics",
        "Backup Solutions"
      ]
    },
    {
      id: 6,
      title: "E-commerce Solutions",
      subtitle: "Online Store Development", 
      description: "Complete e-commerce solutions that drive sales and provide seamless shopping experiences. From custom platforms to popular CMS integrations, we build converting stores.",
      technologies: ["Shopify", "WooCommerce", "Magento", "Stripe", "PayPal", "Inventory APIs"],
      features: [
        "Payment Gateway Integration",
        "Inventory Management",
        "Order Processing",
        "Customer Analytics",
        "Multi-currency Support",
        "Mobile Commerce"
      ]
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
      serviceCardsRef.current.forEach((card, index) => {
        if (card) {
          const isLeft = index % 2 === 0
          gsap.fromTo(card,
            { opacity: 0, x: isLeft ? -100 : 100, y: 50 },
            {
              opacity: 1,
              x: 0,
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

  const handleServiceHover = (serviceId: number | null, isEntering: boolean) => {
    if (isEntering) {
      setHoveredService(serviceId)
    } else {
      setHoveredService(null)
    }
  }


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
        <div className="max-w-7xl mx-auto space-y-16">
          {services.map((service, index) => {
            const isLeft = index % 2 === 0
            const isHovered = hoveredService === service.id
            
            return (
              <div
                key={service.id}
                ref={el => { serviceCardsRef.current[index] = el; }}
                className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch gap-8 lg:gap-16`}
              >
                {/* Service Card */}
                <div className="lg:w-1/2">
                  <div
                    className="h-full bg-white border-2 border-black p-8 lg:p-12 cursor-pointer transition-all duration-500 hover:shadow-2xl group"
                    onMouseEnter={() => handleServiceHover(service.id, true)}
                    onMouseLeave={() => handleServiceHover(service.id, false)}
                  >
                    {/* Service Number */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-sm font-mono text-gray-500 tracking-wider">
                        SERVICE {String(service.id).padStart(2, '0')}
                      </span>
                      <motion.div
                        className="w-8 h-8 border-2 border-black flex items-center justify-center"
                        animate={{
                          rotate: isHovered ? 45 : 0
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <div className="w-4 h-0.5 bg-black absolute" />
                        <div className="w-0.5 h-4 bg-black absolute" />
                      </motion.div>
                    </div>

                    {/* Service Title */}
                    <motion.h3 
                      className="text-4xl lg:text-5xl font-black mb-4 leading-tight"
                      animate={{
                        fontSize: isHovered ? '3.5rem' : '3rem'
                      }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      {service.title}
                    </motion.h3>
                    
                    <p className="text-xl text-gray-600 mb-6 font-medium">
                      {service.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                      {service.description}
                    </p>

                    {/* Learn More Button - Always visible */}
                    <motion.button
                      className="bg-black text-white px-8 py-4 font-bold text-lg hover:bg-gray-800 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More →
                    </motion.button>
                  </div>
                </div>

                {/* Properties Panel */}
                <div className="lg:w-1/2">
                  <motion.div
                    className="h-full bg-gray-50 border-2 border-gray-200 p-8 lg:p-12 overflow-hidden"
                    animate={{
                      backgroundColor: isHovered ? '#f9f9f9' : '#f5f5f5',
                      borderColor: isHovered ? '#000' : '#e5e5e5'
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Technologies Section */}
                    <div className="mb-12">
                      <motion.h4 
                        className="text-2xl font-bold mb-6 text-black"
                        animate={{
                          scale: isHovered ? 1.05 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        Technologies
                      </motion.h4>
                      <motion.div 
                        className="flex flex-wrap gap-3"
                        animate={{
                          y: isHovered ? 0 : 10,
                          opacity: isHovered ? 1 : 0.7
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {service.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-4 py-2 bg-white border border-gray-300 text-sm font-semibold hover:border-black hover:bg-black hover:text-white transition-all duration-200"
                            animate={{
                              scale: isHovered ? 1 : 0.95,
                              opacity: isHovered ? 1 : 0.8
                            }}
                            transition={{ 
                              delay: isHovered ? techIndex * 0.03 : 0,
                              duration: 0.3
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Features Section */}
                    <div>
                      <motion.h4 
                        className="text-2xl font-bold mb-6 text-black"
                        animate={{
                          scale: isHovered ? 1.05 : 1
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        Key Features
                      </motion.h4>
                      <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        animate={{
                          y: isHovered ? 0 : 10,
                          opacity: isHovered ? 1 : 0.7
                        }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        {service.features.map((feature, featureIndex) => (
                          <motion.div
                            key={feature}
                            className="flex items-center text-gray-700 py-2"
                            animate={{
                              x: isHovered ? 0 : -10,
                              opacity: isHovered ? 1 : 0.8
                            }}
                            transition={{ 
                              delay: isHovered ? featureIndex * 0.03 : 0,
                              duration: 0.3
                            }}
                          >
                            <motion.span 
                              className="w-3 h-3 bg-black mr-4 flex-shrink-0"
                              animate={{
                                scale: isHovered ? [1, 1.3, 1] : 1
                              }}
                              transition={{ 
                                delay: isHovered ? featureIndex * 0.05 : 0,
                                duration: 0.4
                              }}
                            />
                            <span className="font-medium text-base">{feature}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
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