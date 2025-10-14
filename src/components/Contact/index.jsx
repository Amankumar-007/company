import styles from './style.module.scss';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import { useRef, useState, useEffect } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Magnetic from '../../common/Magnetic';
import { useRouter } from 'next/navigation';

export default function index() {
    const container = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const router = useRouter();
    
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
        offset: ["start end", "end end"]
    })
    
    // Reduce animation intensity for mobile devices, disable for tablets
    const x = useTransform(scrollYProgress, [0, 1], shouldAnimate ? [0, 100] : [0, 0])
    const y = useTransform(scrollYProgress, [0, 1], shouldAnimate ? [-500, 0] : [0, 0])
    const rotate = useTransform(scrollYProgress, [0, 1], shouldAnimate ? [120, 90] : [90, 90])
    return (
        <motion.div 
            style={{
                y: shouldAnimate ? y : 0,
                transition: shouldAnimate ? 'inherit' : 'none'
            }} 
            ref={container} 
            className={styles.contact}
        >
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <Image 
                            fill={true}
                            alt={"image"}
                            src={`/brandlogo.png`}
                            />
                        </div>
                        <h2>Let's work</h2>
                    </span>
                    <h2>together</h2>
                    <motion.div 
                        style={{
                            x: shouldAnimate ? x : 0,
                            transition: shouldAnimate ? 'inherit' : 'none'
                        }} 
                        className={styles.buttonContainer}
                    >
                        <Rounded  backgroundColor={"#334BD3"} className={styles.button} onClick={() => router.push('/contact')}>
                            <p>Get a quote</p>
                        </Rounded>
                    </motion.div>
                    <motion.svg 
                        style={{
                            rotate: shouldAnimate ? rotate : 90,
                            scale: shouldAnimate ? 2 : 1,
                            transition: shouldAnimate ? 'inherit' : 'none'
                        }} 
                        width="9" 
                        height="9" 
                        viewBox="0 0 9 9" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
                    </motion.svg>
                </div>
                <div className={styles.nav}>
                        <Rounded>
                            <a href="mailto:amanr3388@gmail.com" className={styles.contactLink}>
                                <p>amanr3388@gmail.com</p>
                            </a>
                        </Rounded>
                        <Rounded>
                            <a href="tel:7906753589" className={styles.contactLink}>
                                <p>7906753589</p>
                            </a>
                        </Rounded>
                </div>
                <div className={styles.info}>
                    <div>
                        <span>
                            <h3>socials</h3>
                            <Magnetic>
                                <p>Awwwards</p>
                            </Magnetic>
                        </span>
                        <Magnetic>
                            <p>Instagram</p>
                        </Magnetic>
                        <Magnetic>
                            <p>Dribbble</p>
                        </Magnetic>
                        <Magnetic>
                            <p>Linkedin</p>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
