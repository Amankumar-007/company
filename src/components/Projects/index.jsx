'use client';
import styles from './style.module.scss'
import { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
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
    src: "locomotive.png",
    color: "#EFE8D3",
    description: "Crafting beautiful, user-centered designs that captivate and convert. We blend creativity with usability to create seamless digital experiences that delight users and achieve your business objectives."
  },
  {
    title: "SEO",
    src: "silencio.png",
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
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})
  }, [])

  const moveItems = (x, y) => {
    xMoveContainer.current(x)
    yMoveContainer.current(y)
    xMoveCursorLabel.current(x)
    yMoveCursorLabel.current(y)
  }
  const manageModal = (active, index, x, y) => {
    moveItems(x, y)
    setModal({active, index})
  }

  return (
  <main onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} className={styles.projects}>
    <h1 className={styles.title}>Our Services</h1>
    <div className={styles.body}>
      {
        projects.map( (project, index) => {
          return <Project index={index} title={project.title} manageModal={manageModal} key={index}/>
        })
      }
    </div>
    <Rounded>
      <p>More work</p>
    </Rounded>
    <>
        <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className={styles.modalContainer}>
            <div style={{top: index * -100 + "%"}} className={styles.modalSlider}>
            {
                projects.map( (project, index) => {
                const { description, color } = project
                return <div className={styles.modal} style={{backgroundColor: color}} key={`modal_${index}`}>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.descriptionHeader}>
                            <h3 className={styles.descriptionTitle}>{project.title}</h3>
                            <div className={styles.descriptionLine}></div>
                        </div>
                        <div className={styles.descriptionContent}>
                            <p className={styles.descriptionText}>{description}</p>
                        </div>
                        <div className={styles.descriptionFooter}>
                            <div className={styles.descriptionIcon}>→</div>
                        </div>
                    </div>
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
