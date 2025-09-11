import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export interface ScrollContextType {
  lenis: Lenis | null
  gsap: typeof gsap
  ScrollTrigger: typeof ScrollTrigger
}
