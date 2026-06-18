"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FooterRevealProps {
  children: ReactNode;
  footer: ReactNode;
}

export default function FooterReveal({ children, footer }: FooterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0.7 end", "1 end"],
  });

  // As user scrolls to the very bottom of content, the content card:
  // - scales down slightly (from 1 → 0.95)
  // - translates up (from 0 → -40px) giving a "lift away" feel
  // - rounds its bottom corners more dramatically
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px 0px 2.5rem 2.5rem", "0px 0px 2.5rem 2.5rem"]
  );

  return (
    <div className="relative bg-[#ECECEE]">
      {/* Main content — scales & lifts away as footer approaches */}
      <motion.div
        ref={containerRef}
        style={{
          scale,
          y,
          borderRadius,
          transformOrigin: "bottom center",
          boxShadow: "0 30px 100px 10px rgba(0,0,0,0.22)",
          position: "relative",
          zIndex: 2,
          backgroundColor: "white",
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>

      {/* Footer — revealed underneath as the content lifts away */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {footer}
      </div>
    </div>
  );
}
