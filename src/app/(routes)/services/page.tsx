'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Pattern Component for Services
const ServicesPattern = () => (
  <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none text-black z-0">
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M10 100 C 40 10, 60 10, 90 100 C 120 190, 140 190, 190 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 100 C 40 190, 60 190, 90 100 C 120 10, 140 10, 190 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 100 L150 100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 8" />
    </svg>
  </div>
);

const ServicesPage = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  // Refs for GSAP animations
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const processRef = useRef(null)
  const ctaRef = useRef(null)
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([])

  const services = [
    {
      id: "web-development",
      title: "Web Development",
      subtitle: "Full-Stack Solutions",
      description: "Creating responsive, scalable web applications using modern technologies like React, Next.js, Node.js, and cutting-edge frameworks.",
      fullDescription: "We build everything from simple landing pages to complex enterprise applications. Our full-stack approach ensures seamless integration between frontend and backend systems, delivering robust solutions that scale with your business needs.",
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL"],
      features: [
        "Responsive Design",
        "Performance Optimization",
        "SEO Friendly"
      ],
      stats: { projects: "50+", experience: "5+ Years", satisfaction: "98%" },
      accentColor: "#7ED348",
      accentRgb: "126, 211, 72"
    },
    {
      id: "mobile-development",
      title: "Mobile Development",
      subtitle: "iOS & Android Apps",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      fullDescription: "From concept to deployment, we create apps that engage users and drive business growth. Our expertise spans both native development and cross-platform solutions, ensuring optimal performance across all devices.",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL"],
      features: [
        "Cross-Platform Apps",
        "Native Performance",
        "Push Notifications"
      ],
      stats: { projects: "80+", experience: "4+ Years", satisfaction: "95%" },
      accentColor: "#38bdf8",
      accentRgb: "56, 189, 248"
    },
    {
      id: "seo-marketing",
      title: "SEO & Marketing",
      subtitle: "Digital Growth Strategy",
      description: "Comprehensive digital marketing strategies that boost your online presence and drive organic traffic.",
      fullDescription: "We combine technical SEO expertise with content marketing strategies to maximize your digital reach. Our data-driven approach ensures measurable results and sustainable growth for your business.",
      technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Google Ads", "Facebook Ads", "Content CMS"],
      features: [
        "Technical SEO Audit",
        "Content Strategy",
        "Social Media Ads"
      ],
      stats: { projects: "200+", experience: "6+ Years", satisfaction: "97%" },
      accentColor: "#a855f7",
      accentRgb: "168, 85, 247"
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design",
      subtitle: "User-Centered Design",
      description: "Creating intuitive and visually stunning user interfaces that enhance user experience.",
      fullDescription: "Our design process focuses on user research and prototyping to create interfaces that not only look beautiful but also drive conversions. We believe great design is invisible - it just works.",
      technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision", "Zeplin"],
      features: [
        "User Research",
        "Wireframing & Prototypes",
        "High-Fidelity UI"
      ],
      stats: { projects: "120+", experience: "5+ Years", satisfaction: "99%" },
      accentColor: "#f43f5e",
      accentRgb: "244, 63, 94"
    },
    {
      id: "cloud-solutions",
      title: "Cloud Solutions",
      subtitle: "Scalable Infrastructure",
      description: "Robust cloud infrastructure solutions that scale with your business needs.",
      fullDescription: "We provide deployment, monitoring, and maintenance services across major cloud platforms. Our solutions ensure high availability, security, and cost-effectiveness for your applications.",
      technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"],
      features: [
        "Cloud Migration",
        "Auto-Scaling Setup",
        "CI/CD Pipelines"
      ],
      stats: { projects: "90+", experience: "4+ Years", satisfaction: "96%" },
      accentColor: "#0284c7",
      accentRgb: "2, 132, 199"
    },
    {
      id: "ecommerce-solutions",
      title: "E-commerce Solutions",
      subtitle: "Online Store Development",
      description: "Complete e-commerce solutions that drive sales and provide seamless shopping experiences.",
      fullDescription: "From custom platforms to popular CMS integrations, we build converting stores that maximize your revenue. Our solutions include everything from payment processing to inventory management.",
      technologies: ["Shopify", "WooCommerce", "Magento", "Stripe", "PayPal", "Inventory APIs"],
      features: [
        "Payment Integrations",
        "Inventory APIs",
        "Customer Analytics"
      ],
      stats: { projects: "110+", experience: "4+ Years", satisfaction: "94%" },
      accentColor: "#f59e0b",
      accentRgb: "245, 158, 11"
    }
  ]

  // Tech icon mapping function
  const getTechIcon = (techName: string) => {
    const iconMap: Record<string, string> = {
      'React': '/tech/7423888_react_react native_icon.svg',
      'Next.js': '/tech/9118036_nextjs_fill_icon.svg',
      'TypeScript': '/tech/11120662_fi_brands_typescript_icon.svg',
      'Node.js': '/tech/1012818_code_development_logo_nodejs_icon.svg',
      'MongoDB': '/tech/1012822_code_development_logo_mongodb_programming_icon.svg',
      'PostgreSQL': '/tech/4691328_postgresql_icon.svg',
      'GraphQL': '/tech/4691403_graphql_icon.svg',
      'AWS': '/tech/4923041_aws_icon.svg',
      'Docker': '/tech/8725837_docker_icon.svg',
      'JavaScript': '/tech/652581_code_command_develop_javascript_language_icon.svg',
      'HTML5': '/tech/104494_html5_html_icon.svg',
      'Angular': '/tech/4373284_angular_logo_logos_icon.svg',
      'Tailwind CSS': '/tech/9055799_bxl_tailwind_css_icon.svg',
      'Flutter': '/tech/9055802_bxl_flutter_icon.svg',
      'React Native': '/tech/7423888_react_react native_icon.svg',
      'Swift': '',
      'Kotlin': '',
      'Firebase': '',
      'Google Analytics': '',
      'SEMrush': '',
      'Ahrefs': '',
      'Google Ads': '',
      'Facebook Ads': '',
      'Figma': '',
      'Adobe XD': '',
      'Sketch': '',
      'Principle': '',
      'InVision': '',
      'Zeplin': '',
      'Google Cloud': '',
      'Azure': '',
      'Kubernetes': '',
      'Terraform': '',
      'Shopify': '',
      'WooCommerce': '',
      'Magento': '',
      'Stripe': '',
      'PayPal': '',
      'Inventory APIs': '',
      'Content CMS': ''
    };

    return iconMap[techName] || '';
  };

  useEffect(() => {
    if (heroRef.current) {
      // Hero section animations with GSAP - runs immediately on mount since there is no curtain transition
      const tl = gsap.timeline({ delay: 0.1 })

      tl.fromTo('.hero-title-line',
        { opacity: 0, y: '110%' },
        { opacity: 1, y: '0%', duration: 1.2, ease: 'power4.out', stagger: 0.1 }
      )
        // Staggered reveal of service cards on load
        .fromTo('.service-card-wrapper',
          { opacity: 0, y: 50, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
          '-=0.8'
        )

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
    <div className="min-h-screen bg-white text-black relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 px-4 md:px-12 lg:px-24 overflow-hidden flex flex-col items-center justify-center text-center">
        <ServicesPattern />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-sm font-mono tracking-[0.25em] uppercase text-gray-500 mb-4 block font-semibold">
            Our services
          </span>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight select-none text-center"
          >
            <div className="overflow-hidden pb-2 -mb-2">
              <div className="hero-title-line inline-block opacity-0 translate-y-[110%]">Going beyond</div>
            </div>
            <div className="overflow-hidden pb-2 -mb-2">
              <div className="hero-title-line inline-block opacity-0 translate-y-[110%]">what&apos;s possible</div>
            </div>
          </h1>
        </div>
      </section>

      <section ref={servicesRef} className="py-14 px-4 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={el => { serviceCardsRef.current[index] = el; }}
                className="relative service-card-wrapper opacity-0 translate-y-[50px] scale-[0.96]"
              >
                <motion.div
                  className="bg-white border-2 border-gray-200 p-6 sm:p-10 cursor-pointer transition-all duration-500 h-full rounded-2xl relative overflow-hidden group"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() => window.location.href = `/service-detail?id=${service.id}`}
                  animate={{
                    borderColor: hoveredService === service.id ? service.accentColor : '#e5e7eb',
                    boxShadow: hoveredService === service.id
                      ? `0 20px 40px -15px rgba(${service.accentRgb}, 0.3)`
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    y: hoveredService === service.id ? -10 : 0
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  {/* Subtle hover bloom glow in top-right */}
                  <div
                    className="absolute -top-12 -right-12 w-36 h-36 opacity-0 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:opacity-20 group-hover:scale-150"
                    style={{ backgroundColor: service.accentColor }}
                  />

                  {/* Service Header */}
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div>
                      <span
                        className="text-xs font-mono tracking-[0.2em] mb-2 block font-semibold transition-colors duration-300"
                        style={{ color: hoveredService === service.id ? service.accentColor : '#9ca3af' }}
                      >
                        SERVICE {String(index + 1).padStart(2, '0')}
                      </span>
                      <motion.h3
                        className="text-3xl lg:text-4xl font-black mb-3 leading-tight"
                        animate={{
                          scale: hoveredService === service.id ? 1.01 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {service.title}
                      </motion.h3>
                      <p className="text-lg text-gray-500 font-medium">
                        {service.subtitle}
                      </p>
                    </div>
                    <motion.div
                      className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center relative overflow-hidden transition-all duration-300"
                      animate={{
                        rotate: hoveredService === service.id ? 135 : 0,
                        borderColor: hoveredService === service.id ? service.accentColor : '#e5e7eb',
                        backgroundColor: hoveredService === service.id ? service.accentColor : 'rgba(255,255,255,0)'
                      }}
                      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <div className={`w-4 h-0.5 absolute transition-colors duration-300 ${hoveredService === service.id ? 'bg-white' : 'bg-gray-600'}`} />
                      <div className={`w-0.5 h-4 absolute transition-colors duration-300 ${hoveredService === service.id ? 'bg-white' : 'bg-gray-600'}`} />
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 relative z-10 font-light">
                    {service.description}
                  </p>

                  {/* Mini-features Pills */}
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full border border-gray-100 transition-all duration-300 group-hover:bg-gray-100 group-hover:text-black group-hover:border-gray-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack Icons */}
                  <div className="flex flex-wrap gap-3 mb-8 relative z-10">
                    {service.technologies.slice(0, 4).map((tech) => (
                      <div
                        key={tech}
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200 hover:border-black transition-all duration-300 group/icon"
                        title={tech}
                      >
                        {getTechIcon(tech) ? (
                          <Image
                            src={getTechIcon(tech)}
                            alt={tech}
                            width={24}
                            height={24}
                            className="w-5 h-5 object-contain transition-transform duration-300 group-hover/icon:scale-110"
                          />
                        ) : (
                          <span className="text-[10px] font-mono font-semibold text-gray-400">
                            {tech.substring(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                    ))}
                    {service.technologies.length > 4 && (
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-xs font-mono font-bold text-gray-400">
                          +{service.technologies.length - 4}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Click to expand hint */}
                  <div
                    className="text-sm font-mono tracking-wider transition-all duration-300 flex items-center gap-2 relative z-10"
                    style={{ color: hoveredService === service.id ? service.accentColor : '#6b7280' }}
                  >
                    <span>Click to view details</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-16 px-4 md:px-12 lg:px-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="process-title text-3xl sm:text-5xl md:text-6xl font-bold mb-6">
              OUR PROCESS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A streamlined approach to deliver exceptional results, from concept to completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your needs and goals" },
              { step: "02", title: "Strategy", desc: "Planning the perfect solution" },
              { step: "03", title: "Development", desc: "Building with precision and care" },
              { step: "04", title: "Launch", desc: "Deploying and optimizing for success" }
            ].map((item) => (
              <motion.div
                key={item.step}
                className="process-item text-center group cursor-pointer bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-black transition-all duration-300"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl font-black text-gray-200 mb-6 group-hover:text-black transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="px-4 md:px-12 lg:px-24 bg-gradient-to-r from-black to-gray-900 text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="cta-content">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              READY TO START YOUR PROJECT?
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Let&apos;s discuss your vision and bring it to life with our expert team and cutting-edge solutions.
            </p>
            <motion.button
              className="relative z-50 bg-white text-black px-8 py-3.5 sm:px-12 sm:py-4 text-lg font-semibold hover:bg-gray-100 transition-all duration-300 rounded-lg inline-flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.assign('/contact')}
            >
              Get In Touch
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage

