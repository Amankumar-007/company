'use client'
import Image from 'next/image';
import styles from './style.module.css';
import { useTransform, useScroll, motion } from 'framer-motion';
import { useRef } from 'react';
import { useCursor } from '../Cursor';

const Card = ({ title, description, src, mobileSrc, url, color, i, progress, range, targetScale }) => {
  const container = useRef(null);
  const { setCursorHover } = useCursor();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Professional fade out effect
  const opacity = useTransform(progress, [range[1], range[1] + 0.05], [1, 0]);

  // Subtle parallax effect for the content
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleMouseEnter = () => {
    setCursorHover(true, 'explore', 80, '#1a1a1a');
  };

  const handleMouseLeave = () => {
    setCursorHover(false);
  };

  const desktopImageSrc = src?.startsWith('/') || src?.startsWith('http') ? src : `/images/${src}`;
  const mobileImageSrc = mobileSrc?.startsWith('/') || mobileSrc?.startsWith('http') ? mobileSrc : (mobileSrc ? `/images/${mobileSrc}` : null);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        className={styles.card}
        style={{
          scale,
          opacity,
          top: `calc(-2vh + ${i * 20}px)`,
          y
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.cardContent}>
          <div className={styles.textSection}>
            <div className={styles.cardHeader}>
              <span className={styles.projectNumber}>0{i + 1}</span>
              <h2 className={styles.title}>{title}</h2>
            </div>

            <div className={styles.description}>
              <p>{description}</p>

              <motion.a
                href={url}
                className={styles.ctaLink}
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>Explore Case Study</span>
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5303 6.53033C19.8232 6.23744 19.8232 5.76256 19.5303 5.46967L14.7574 0.696699C14.4645 0.403806 13.9896 0.403806 13.6967 0.696699C13.4038 0.989592 13.4038 1.46447 13.6967 1.75736L17.9393 6L13.6967 10.2426C13.4038 10.5355 13.4038 11.0104 13.6967 11.3033C13.9896 11.5962 14.4645 11.5962 14.7574 11.3033L19.5303 6.53033ZM0 6.75L19 6.75V5.25L0 5.25L0 6.75Z" fill="currentColor" />
                </svg>
              </motion.a>
            </div>
          </div>

          <div className={styles.imageSection}>
            <motion.div
              className={styles.imageWrapper}
              style={{ scale: imageScale, willChange: 'transform' }}
            >
              {/* Desktop Browser Mockup - Full Clean Fill */}
              <div className="relative w-full h-full flex flex-col bg-neutral-950">
                {/* Browser Bar */}
                <div className="h-7 sm:h-8 bg-neutral-900 border-b border-neutral-800 px-3.5 flex items-center justify-between z-10 flex-shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                    <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">{title.toLowerCase()}</span>
                  <span className="text-[9px] text-neutral-500 uppercase font-bold">Desktop</span>
                </div>

                {/* Desktop Image */}
                <div className="relative w-full flex-1 overflow-hidden bg-neutral-950">
                  <Image
                    fill
                    src={desktopImageSrc}
                    alt={`${title} Desktop`}
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority={i === 0}
                  />
                </div>
              </div>

              {/* Floating Mobile Smartphone Frame - Clean Overlay */}
              {mobileImageSrc && (
                <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 w-[28%] sm:w-[24%] aspect-[9/18.5] max-w-[140px] min-w-[85px] rounded-[1.2rem] sm:rounded-[1.5rem] p-[3px] bg-neutral-900 border-[2.5px] border-neutral-700 shadow-[0_20px_45px_rgba(0,0,0,0.9)] z-20 transition-transform duration-500 hover:scale-105">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-black rounded-full z-30" />
                  <div className="relative w-full h-full rounded-[1rem] sm:rounded-[1.2rem] overflow-hidden bg-black">
                    <Image
                      fill
                      src={mobileImageSrc}
                      alt={`${title} Mobile`}
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 35vw, 15vw"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.progressIndicator}>
            <div className={styles.progressBar} style={{ width: `${((i + 1) / 4) * 100}%` }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;