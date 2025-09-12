'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutPage() {
  const heroRef = useRef(null)

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
    }

    // Fade-up animations
    gsap.utils.toArray(".fade-up").forEach((el: unknown) => {
      const element = el as HTMLElement
      gsap.fromTo(element, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-light tracking-tight"
        >
          About
          <span className="block font-medium bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">
            Our Company
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 max-w-2xl text-gray-400 text-lg md:text-xl leading-relaxed"
        >
          We are a passionate team of creators, designers, and developers dedicated to crafting exceptional digital experiences that make a difference.
        </motion.p>
      </section>

      {/* Content Sections */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center fade-up">
            <div>
              <h2 className="text-3xl md:text-4xl font-light mb-6">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                To transform ideas into reality through innovative design and cutting-edge technology. We believe in creating digital solutions that not only look beautiful but also deliver exceptional user experiences.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our approach combines strategic thinking with creative execution, ensuring every project we undertake meets the highest standards of quality and performance.
              </p>
            </div>
            <div className="bg-gray-900 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Team Image Placeholder</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20 fade-up">
            <div className="text-center">
              <div className="text-4xl font-bold mb-4">50+</div>
              <h3 className="text-xl font-medium mb-2">Projects Completed</h3>
              <p className="text-gray-400">Delivering excellence across various industries</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-4">15+</div>
              <h3 className="text-xl font-medium mb-2">Team Members</h3>
              <p className="text-gray-400">Passionate professionals dedicated to your success</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-4">5+</div>
              <h3 className="text-xl font-medium mb-2">Years Experience</h3>
              <p className="text-gray-400">Building digital solutions that matter</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
