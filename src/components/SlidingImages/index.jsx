import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';

const slider1 = [
    {
        color: "#e3e5e7",
        src: "c2.jpg"
    },
    {
        color: "#d6d7dc",
        src: "decimal.jpg"
    },
    {
        color: "#e3e3e3",
        src: "funny.jpg"
    },
    {
        color: "#21242b",
        src: "google.jpg"
    }
]

const slider2 = [
    {
        color: "#d4e3ec",
        src: "maven.jpg"
    },
    {
        color: "#e5e0e1",
        src: "panda.jpg"
    },
    {
        color: "#d7d4cf",
        src: "powell.jpg"
    },
    {
        color: "#e1dad6",
        src: "wix.jpg"
    }
]

export default function index() {

    const container = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    
    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 768);
            setIsTablet(width > 768 && width <= 1024);
        };
        
        checkDevice();
        window.addEventListener('resize', checkDevice);
        
        return () => window.removeEventListener('resize', checkDevice);
    }, []);
    
    // Only enable scroll animations for desktop, disable for mobile and tablet
    const shouldAnimate = !isMobile && !isTablet;
    
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    // Reduce animation intensity for mobile devices, disable for tablets
    const x1 = useTransform(scrollYProgress, [0, 1], shouldAnimate ? [0, 150] : [0, 0])
    const x2 = useTransform(scrollYProgress, [0, 1], shouldAnimate ? [0, -150] : [0, 0])

    return (
        <div ref={container} className={styles.slidingImages}>
            <motion.div 
                style={{
                    x: shouldAnimate ? x1 : 0,
                    transition: shouldAnimate ? 'inherit' : 'none'
                }} 
                className={styles.slider}
            >
                    {
                        slider1.map( (project, index) => {
                            return <div key={index} className={styles.project} style={{backgroundColor: project.color}} >
                                <div className={styles.imageContainer}>
                                    <Image 
                                    fill={true}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    alt={"image"}
                                    src={`/images/${project.src}`}/>
                                </div>
                            </div>
                        })
                    }
                </motion.div>
                <motion.div 
                    style={{
                        x: shouldAnimate ? x2 : 0,
                        transition: shouldAnimate ? 'inherit' : 'none'
                    }} 
                    className={styles.slider}
                >
                    {
                        slider2.map( (project, index) => {
                            return <div key={index} className={styles.project} style={{backgroundColor: project.color}} >
                                <div className={styles.imageContainer}>
                                    <Image 
                                    fill={true}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    alt={"image"}
                                    src={`/images/${project.src}`}/>
                                </div>
                            </div>
                        })
                    }
                </motion.div>
        </div>
    )
}
