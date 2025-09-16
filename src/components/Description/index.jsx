import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
export default function index() {

    const phrase = "Transforming digital visions into reality. We create innovative web and mobile solutions that elevate your brand. Excellence in every pixel, every line of code.";
    const description = useRef(null);
    const isInView = useInView(description)
    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <h2 className={styles.headline}>WHAT WE DO</h2>
                <p>
                {
                    phrase.split(" ").map( (word, index) => {
                        return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                    })
                }
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>Our comprehensive services include website development, app creation, SEO marketing, and social media management - all designed to give your business the digital edge it deserves.</motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <Rounded className={styles.button}>
                        <p>Our Services</p>
                    </Rounded>
                </div>
            </div>
        </div>
    )
}