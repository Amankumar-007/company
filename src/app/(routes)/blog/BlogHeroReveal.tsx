'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function BlogHeroReveal() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo('.blog-hero-title-line',
        { opacity: 0, y: '110%' },
        { opacity: 1, y: '0%', duration: 1.2, ease: 'power4.out', stagger: 0.12 }
      )
      tl.fromTo('.blog-hero-sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      )
    }
  }, [])

  return <div ref={heroRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />
}
