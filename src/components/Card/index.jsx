'use client'
import Image from 'next/image';
import styles from './style.module.css';
import { useTransform, useScroll, motion } from 'framer-motion';
import { useRef } from 'react';
import { useCursor } from '../Cursor';

const Card = ({ title, description, src, url, color, i, progress, range, targetScale }) => {
  const container = useRef(null);
  const { setCursorHover } = useCursor();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
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
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.ctaLink}
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>View Project</span>
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5303 6.53033C19.8232 6.23744 19.8232 5.76256 19.5303 5.46967L14.7574 0.696699C14.4645 0.403806 13.9896 0.403806 13.6967 0.696699C13.4038 0.989592 13.4038 1.46447 13.6967 1.75736L17.9393 6L13.6967 10.2426C13.4038 10.5355 13.4038 11.0104 13.6967 11.3033C13.9896 11.5962 14.4645 11.5962 14.7574 11.3033L19.5303 6.53033ZM0 6.75L19 6.75V5.25L0 5.25L0 6.75Z" fill="currentColor"/>
                </svg>
              </motion.a>
            </div>
          </div>

          <div className={styles.imageSection}>
            <motion.div 
              className={styles.imageWrapper}
              style={{ scale: imageScale }}
            >
              <div className={styles.imageOverlay} />
              <Image
                fill
                src={`/images/${src}`}
                alt={title}
                className={styles.projectImage}
              />
            </motion.div>
          </div>
        </div>
        
        <div className={styles.cardFooter}>
          <div className={styles.progressIndicator}>
            <div className={styles.progressBar} style={{ width: `${((i + 1) / 5) * 100}%` }} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Card