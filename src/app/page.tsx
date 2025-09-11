"use client"
import Hero from "../components/Hero"
import FeaturedProjects from "../components/FeaturedProjects"
import Services from "../components/Services"
import BlogPreview from "../components/BlogPreview"
import ContactFooter from "../components/ContactFooter"
import logo from "../../pages/logo.svg"

import { useScroll } from "@/context/ScrollContext"
import { useEffect, useRef } from "react"

export default function Home() {
  const { gsap, ScrollTrigger } = useScroll()
  const mainRef = useRef(null)


  
  useEffect(() => {
    if (!gsap || !ScrollTrigger) return

    // Register ScrollTrigger plugin
    ScrollTrigger.refresh()

    // Enhanced fade-up animations
    gsap.utils.toArray(".fade-up").forEach(el => {
      gsap.fromTo(el, 
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            scrub: 0.3
          }
        }
      )
    })

    // Parallax effect for sections
    gsap.utils.toArray("section").forEach((section: Element) => {
      const bg = section.querySelector(".parallax-bg")
      if (bg) {
        gsap.to(bg, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        })
      }
    })

    // Staggered animations for grid items
    gsap.utils.toArray(".grid > *").forEach((item: Element, index: number) => {
      gsap.fromTo(item,
        { y: 60, opacity: 0, rotationX: 15 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Smooth scroll behavior
    gsap.to(mainRef.current, {
      scrollBehavior: 'smooth',
      duration: 0
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
    }
  }, [gsap, ScrollTrigger])

  return (
    <main ref={mainRef} className="scroll-smooth">
      
      <Hero />
      <FeaturedProjects />
      <Services />
      <BlogPreview />
      <ContactFooter />
    </main>
  )
}
