'use client';
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation';
import { text, curve, translate } from '../anim';

const routes = {
    "/": "Home",
    "/about": "About",
    "/contact": "Contact",
    "/services": "Services"
}

const anim = (variants) => {
    return {
        variants,
        initial: "initial",
        animate: "enter",
        exit: "exit"
    }
}

export default function Curve({children, backgroundColor}) {
    const pathname = usePathname();
    const [dimensions, setDimensions] = useState({
        width: null,
        height: null
    })
    const [isClient, setIsClient] = useState(false)
    
    // Check if current page is home page
    const isHomePage = pathname === "/";

    useEffect( () => {
        setIsClient(true)
        function resize(){
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        resize();
        window.addEventListener("resize", resize)
        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [])
    
    // On home page, render children directly without any transition elements
    if (isHomePage) {
        return (
            <div className="page" style={{backgroundColor}}>
                {children}
            </div>
        )
    }
    
    // On other pages, render with full transition effects
    return (
    <motion.div 
        className='page curve' 
        style={{backgroundColor}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        key={pathname}
    >
       <div style={{opacity: dimensions.width == null ? 1 : 0}} className='background'/>
       {isClient && (
            <motion.p className='route' {...anim(text)}>
                {routes[pathname] || "Page"}
            </motion.p>
        )}
       {dimensions.width != null && <SVG {...dimensions}/>}
        {
            children
        }
    </motion.div>
    )
}

const SVG = ({height, width}) => {

    const initialPath = `
        M0 300 
        Q${width/2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width/2} ${height + 600} 0 ${height + 300}
        L0 0
    `

    const targetPath = `
        M0 300
        Q${width/2} 0 ${width} 300
        L${width} ${height}
        Q${width/2} ${height} 0 ${height}
        L0 0
    `

    return (
        <motion.svg {...anim(translate)}>
            <motion.path {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    )
}
