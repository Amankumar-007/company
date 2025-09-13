"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import { motion } from "framer-motion"
import StaggeredMenu from "./StaggeredMenu"

export default function Hero() {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    })
   

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
 const menuItems = [
      { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
      { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
      { label: 'Services', ariaLabel: 'View our services', link: '/services' },
      { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
    ];
    
    const socialItems = [
      { label: 'Twitter', link: 'https://twitter.com' },
      { label: 'GitHub', link: 'https://github.com' },
      { label: 'LinkedIn', link: 'https://linkedin.com' }
    ];
  return (
    <>
    
  <StaggeredMenu
    position="right"
    items={menuItems}
    socialItems={socialItems}
    displaySocials={true}
    displayItemNumbering={true}
    menuButtonColor="#fff"
    openMenuButtonColor="#000"
    changeMenuColorOnOpen={true}
    colors={['#B19EEF', '#5227FF']}
    logoUrl="/logo.png"
    accentColor="#A020F0"
    onMenuOpen={() => console.log('Menu opened')}
    onMenuClose={() => console.log('Menu closed')}
  />

    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black text-white ">
      {/* Heading */}

      
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-light tracking-tight"
      >
        Minimal Design,
        <span className="block font-medium bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">
          Bold Ideas
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-6 max-w-xl text-gray-400 text-lg md:text-xl leading-relaxed"
      >
        Crafting thoughtful digital experiences with clean design and modern technology.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="flex gap-4 mt-10"
      >
        <button className="px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition">
          View Work
        </button>
        <button className="px-6 py-3 border border-white/30 rounded-full text-sm font-medium hover:bg-white hover:text-black transition">
          Get in Touch
        </button>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-60">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
    </>
  )
}