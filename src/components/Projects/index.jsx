'use client';
import styles from './style.module.scss'
import { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import Rounded from '../../common/RoundedButton';

const projects = [
  {
    title: "Web Development",
    src: "web.png",
    color: "#000000",
    description: "Creating powerful, scalable web applications with cutting-edge technologies. We build responsive, fast, and secure websites that drive business growth and deliver exceptional user experiences across all devices."
  },
  {
    title: "App development",
    src: "mobile.png",
    color: "#8C8C8C",
    description: "Transforming ideas into intuitive mobile applications. Our native and cross-platform solutions combine stunning design with robust functionality to engage users and accelerate your business in the mobile-first world."
  },
  {
    title: "UI/UX design",
    src: "uiux.png",
    color: "#5C6B73",
    description: "Crafting beautiful, user-centered designs that captivate and convert. We blend creativity with usability to create seamless digital experiences that delight users and achieve your business objectives."
  },
  {
    title: "SEO",
    src: "seo.png",
    color: "#706D63",
    description: "Boosting your online visibility and driving organic traffic. Our data-driven SEO strategies combine technical excellence with compelling content to rank higher, attract quality leads, and grow your digital presence."
  }
]

const scaleAnimation = {
    initial: {scale: 0, x:"-50%", y:"-50%"},
    enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
    closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
}

export default function Home() {

  const [modal, setModal] = useState({active: false, index: 0})
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect( () => {
    if (!modalContainer.current || !cursorLabel.current) return;
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})
  }, [])

  const rafRef = useRef(null);
  const pendingPos = useRef({x: 0, y: 0});

  const moveItems = (x, y) => {
    pendingPos.current = {x, y};
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      xMoveContainer.current(pendingPos.current.x);
      yMoveContainer.current(pendingPos.current.y);
      xMoveCursorLabel.current(pendingPos.current.x);
      yMoveCursorLabel.current(pendingPos.current.y);
      rafRef.current = null;
    });
  };
  const manageModal = (active, index, x, y) => {
    moveItems(x, y)
    setModal({active, index})
  }

  return (
  <main onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} className={styles.projects}>
    <h2 className={styles.title}>Our Services</h2>
    <div className={styles.body}>
      {
        projects.map( (project, index) => {
          return <Project index={index} title={project.title} manageModal={manageModal} key={index}/>
        })
      }
    </div>
    <Link href="/services">
      <Rounded>
        <p>More services</p>
      </Rounded>
    </Link>
    <>
        <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className={styles.modalContainer}>
            <div style={{top: index * -100 + "%"}} className={styles.modalSlider}>
            {
                projects.map( (project, index) => {
                const { src, color } = project
                return <div className={styles.modal} style={{backgroundColor: color}} key={`modal_${index}`}>
                    <Image 
                        src={`/${src}`}
                        width={420}
                        height={380}
                        alt={project.title}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        sizes="(max-width: 768px) 100vw, 420px"
                    />
                </div>
                })
            }
            </div>
        </motion.div>
        <motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}>Explore</motion.div>
    </>
  </main>
  )
}
