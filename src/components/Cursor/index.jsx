'use client';
import React, { useEffect, useRef, useState, createContext, useContext } from 'react'
import gsap from 'gsap';

// Create context for cursor state management
export const CursorContext = createContext();

export const useCursor = () => {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error('useCursor must be used within a CursorProvider');
    }
    return context;
};

export const CursorProvider = ({ children }) => {
    const [cursorState, setCursorState] = useState({
        isHovering: false,
        text: '',
        icon: null,
        size: 20,
        backgroundColor: '#ec4e39',
        showIcon: false
    });

    const setCursorHover = (isHovering, text = '', size = 60, backgroundColor = '#ec4e39', icon = null) => {
        setCursorState({
            isHovering,
            text,
            icon,
            size: isHovering ? size : 20,
            backgroundColor: isHovering ? backgroundColor : '#ec4e39',
            showIcon: isHovering && icon !== null
        });
    };

    return (
        <CursorContext.Provider value={{ setCursorHover }}>
            {children}
            <Cursor state={cursorState} />
        </CursorContext.Provider>
    );
};

export default function Cursor({ state }) {
    const mouse = useRef({x: 0, y: 0});
    const delayedMouse = useRef({x: 0, y: 0});
    const cursor = useRef();
    const cursorText = useRef();
    const cursorIcon = useRef();
    const rafId = useRef();
    
    useEffect(() => {
        // Initialize with window dimensions after component mounts
        mouse.current = {x: window.innerWidth / 2, y: window.innerHeight / 2};
        delayedMouse.current = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    }, []);
    
    const lerp = (x, y, a) => x * (1 - a) + y * a;
    
    const manageMouseMove = (e) => {
        const { clientX, clientY } = e;
    
        mouse.current = {
            x: clientX,
            y: clientY
        }
    }

    const animate = () => {
        const { x, y } = delayedMouse.current;

        delayedMouse.current = {
            x: lerp(x, mouse.current.x, 0.15),
            y: lerp(y, mouse.current.y, 0.15)
        }

        moveCircle(delayedMouse.current.x, delayedMouse.current.y);
        rafId.current = window.requestAnimationFrame(animate);
    }

    const moveCircle = (x, y) => {
        // Use gsap.set for immediate position updates to avoid animation conflicts
        gsap.set(cursor.current, { 
            x, 
            y, 
            force3D: true, // Hardware acceleration
            xPercent: -50, 
            yPercent: -50
        });
        
        // Only animate size and color changes, not position
        gsap.to(cursor.current, { 
            width: state.size,
            height: state.size,
            backgroundColor: state.backgroundColor,
            duration: 0.2,
            ease: "power1.out",
            force3D: true
        });
        
        // Animate text opacity
        if (cursorText.current) {
            gsap.to(cursorText.current, {
                opacity: state.isHovering && state.text ? 1 : 0,
                duration: 0.2,
                ease: "power1.out",
                force3D: true
            });
        }
        
        // Animate icon
        if (cursorIcon.current) {
            gsap.to(cursorIcon.current, {
                opacity: state.showIcon ? 1 : 0,
                scale: state.showIcon ? 1 : 0.8,
                duration: 0.2,
                ease: "power1.out",
                force3D: true
            });
        }
    }

    useEffect( () => {
        // Set initial position with hardware acceleration
        if (cursor.current) {
            gsap.set(cursor.current, { 
                x: window.innerWidth / 2, 
                y: window.innerHeight / 2,
                xPercent: -50, 
                yPercent: -50,
                width: state.size,
                height: state.size,
                backgroundColor: state.backgroundColor,
                force3D: true
            });
        }
        
        window.addEventListener("mousemove", manageMouseMove);
        animate();
        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
            window.cancelAnimationFrame(rafId.current);
        }
    }, [state])

    return (
        <>
            <div 
                ref={cursor}
                style={{
                    backgroundColor: state.backgroundColor,
                    width: `${state.size}px`,
                    height: `${state.size}px`,
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s ease',
                    willChange: 'transform, width, height, opacity', // Performance hint
                    backfaceVisibility: 'hidden' // Hardware acceleration
                }}
            >
                <div 
                    ref={cursorText}
                    style={{
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: '600',
                        opacity: 0,
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        position: 'absolute',
                        willChange: 'opacity',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    {state.text}
                </div>
                <div 
                    ref={cursorIcon}
                    style={{
                        opacity: 0,
                        pointerEvents: 'none',
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        willChange: 'opacity, transform',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    {state.icon}
                </div>
            </div>
        </>
    )
}
