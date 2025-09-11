'use client'
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollContextType } from './ScrollContext.types'

gsap.registerPlugin(ScrollTrigger)

const ScrollContext = createContext<ScrollContextType | null>(null)

export const useScroll = () => useContext(ScrollContext)

interface ScrollProviderProps {
  children: ReactNode
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenisInstance
    setLenis(lenisInstance)

    function raf(time: number) {
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
