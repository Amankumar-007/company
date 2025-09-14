import React from 'react'
import { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import Magnetic from '../Magnetic';

export default function index({children, backgroundColor="#455CE9", ...attributes}) {

  const circle = useRef(null);
  let timeline = useRef(null);
  let timeoutId = null;
  useEffect( () => {
    timeline.current = gsap.timeline({paused: true})
    timeline.current
      .to(circle.current, {top: "-25%", width: "150%", duration: 0.4, ease: "power3.in"}, "enter")
      .to(circle.current, {top: "-150%", width: "125%", duration: 0.25}, "exit")
  }, [])
  
  const manageMouseEnter = () => {
    if(timeoutId) clearTimeout(timeoutId)
    const hoverColor = attributes['data-hover-color'];
    if (hoverColor) {
      circle.current.style.backgroundColor = hoverColor;
    }
    timeline.current.tweenFromTo('enter', 'exit');
  }

  const manageMouseLeave = () => {
    timeoutId = setTimeout( () => {
      const hoverColor = attributes['data-hover-color'];
      if (hoverColor) {
        circle.current.style.backgroundColor = backgroundColor;
      }
      timeline.current.play();
    }, 300)
  }

  return (
    <Magnetic>
      <div 
        className={attributes['data-shape'] === 'square' ? styles.squareButton : styles.roundedButton} 
        style={{overflow: "hidden"}} 
        onMouseEnter={() => {manageMouseEnter()}} 
        onMouseLeave={() => {manageMouseLeave()}} 
        {...attributes}
      >
          {
            children
          }
        <div 
          ref={circle} 
          style={{backgroundColor}} 
          className={attributes['data-shape'] === 'square' ? styles.squareCircle : styles.circle}
        ></div>
      </div>
    </Magnetic>
  )
}
