"use client"
import Hero from "../components/Hero"
import FeaturedProjects from "../components/FeaturedProjects"
import Services from "../components/Services"
import BlogPreview from "../components/BlogPreview"
import ContactFooter from "../components/ContactFooter"

import { useScroll } from "@/context/ScrollContext"
import { useEffect, useRef } from "react"

export default function Home() {
  const scrollContext = useScroll()
  const { gsap, ScrollTrigger } = scrollContext || { gsap: undefined, ScrollTrigger: undefined }
  const mainRef = useRef(null)


  
  useEffect(() => {
    if (!gsap || !ScrollTrigger) return

    // Register ScrollTrigger plugin
    ScrollTrigger.refresh()

    // Enhanced fade-up animations
    gsap.utils.toArray(".fade-up").forEach((el: unknown) => {
      const element = el as HTMLElement
      gsap.fromTo(element, 
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            scrub: 0.3
          }
        }
      )
    })

    // Parallax effect for sections
    gsap.utils.toArray("section").forEach((section: unknown) => {
      const sectionElement = section as Element
      const bg = sectionElement.querySelector(".parallax-bg")
      if (bg) {
        gsap.to(bg, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        })
      }
    })

    // Staggered animations for grid items
    gsap.utils.toArray(".grid > *").forEach((item: unknown, index: number) => {
      const itemElement = item as Element
      gsap.fromTo(itemElement,
        { y: 60, opacity: 0, rotationX: 15 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: itemElement,
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
      const triggers = ScrollTrigger.getAll() as Array<{kill: () => void}>
      triggers.forEach(trigger => trigger.kill())
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
