'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;

    let lenis: Lenis | null = null;
    let rafId: number;

    const initLenis = () => {
      // Disable smooth scroll on mobile devices and small screens (<= 768px)
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth <= 768;

      if (isMobile) {
        if (lenis) {
          lenis.destroy();
          lenis = null;
          lenisRef.current = null;
          cancelAnimationFrame(rafId);
        }
        return;
      }

      if (!lenis) {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          touchMultiplier: 2,
          gestureOrientation: 'vertical',
          smoothWheel: true,
          syncTouch: false, // Keep touch scrolling 100% native
        });
        lenisRef.current = lenis;

        const raf = (time: number) => {
          if (lenis) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
          }
        };
        rafId = requestAnimationFrame(raf);
      }
    };

    initLenis();

    const handleResize = () => {
      initLenis();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (lenis) {
        lenis.destroy();
      }
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
    };
  }, [isAdmin]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
