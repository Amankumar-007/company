"use client"
import { useEffect, useRef } from "react"
import { useScroll } from "@/context/ScrollContext"
import Link from "next/link"

const services = [
  {
    title: "Brand Identity",
    description: "Crafting distinctive brand identities that resonate with your audience and stand the test of time.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
      </svg>
    )
  },
  {
    title: "AI-enhanced UX/UI Design",
    description: "Leveraging artificial intelligence to create intuitive, engaging, and data-driven user experiences.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    )
  },
  {
    title: "Custom Development",
    description: "Building tailored digital solutions with cutting-edge technology and scalable architecture.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
      </svg>
    )
  }
]

export default function Services() {
  const sectionRef = useRef(null)
  const { gsap, ScrollTrigger } = useScroll()

  useEffect(() => {
    if (!gsap || !ScrollTrigger || !sectionRef.current) return

    // Section fade-in animation with parallax
    gsap.fromTo(sectionRef.current,
      { y: 80, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animate service cards with stagger effect
    const cards = sectionRef.current.querySelectorAll(".service-card")
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { 
          y: 60, 
          opacity: 0, 
          rotateX: 15,
          borderRadius: "0px",
          transformPerspective: 1000
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          borderRadius: "1rem",
          duration: 0.6,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Animate section header
    const header = sectionRef.current.querySelector(".section-header")
    if (header) {
      gsap.fromTo(header,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [gsap, ScrollTrigger])

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-black rounded-t-[50px] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-header text-center mb-16">
          <h2 className="fade-up text-5xl md:text-6xl font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="fade-up text-xl text-gray-300 max-w-3xl mx-auto">
            We offer comprehensive design and development solutions tailored to your unique needs
          </p>
        </div>
        
        <div className="fade-up grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card group relative bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors duration-300">
                  <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                {service.description}
              </p>
              
              <Link href="/services" prefetch={true} className="flex items-center justify-between pt-4 border-t border-gray-800 group-hover:border-blue-600 transition-colors duration-300">
                <span className="text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  Learn More
                </span>
                <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </Link>
              
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
