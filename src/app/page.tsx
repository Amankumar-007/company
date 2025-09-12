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

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Fade-up animations
    gsap.utils.toArray(".fade-up").forEach((el) => {
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

    // Staggered animations for grid items
    gsap.utils.toArray(".grid > *").forEach((item, index) => {
      const itemElement = item as HTMLElement
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

    // Cleanup
    return () => {
      const triggers = ScrollTrigger.getAll()
      triggers.forEach(trigger => trigger.kill())
    }
  }, [gsap, ScrollTrigger])

  return (
    <main ref={mainRef} className="relative min-h-screen bg-black">
      <Hero />
      <FeaturedProjects />
      <Services />
      <BlogPreview />
      <ContactFooter />
    </main>
  )
}
