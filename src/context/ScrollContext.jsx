'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollContext = createContext(null)

export const useScroll = () => useContext(ScrollContext)

export function ScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenisInstance
    setLenis(lenisInstance)

    function raf(time) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // sync with GSAP
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000)
    })

    return () => {
      lenisInstance.destroy()
      gsap.ticker.remove((time) => lenisInstance.raf(time * 1000))
    }
  }, [])

  return (
    <ScrollContext.Provider value={{ lenis, gsap, ScrollTrigger }}>
      {children}
    </ScrollContext.Provider>
  )
}
