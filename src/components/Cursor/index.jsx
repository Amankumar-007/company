'use client';
import React, { useEffect, useRef, useState, createContext, useContext } from 'react'
import gsap from 'gsap';

// Helper function to detect mobile devices
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
};

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
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const mouse = useRef({x: 0, y: 0});
    const delayedMouse = useRef({x: 0, y: 0});
    const cursor = useRef();
    const cursorText = useRef();
    const cursorIcon = useRef();
    const rafId = useRef();
    // Keep a ref to state so animate() always reads latest without re-registering
    const stateRef = useRef(state);

    useEffect(() => {
        stateRef.current = state;
        if (!cursor.current) return;
        // Animate size/color/opacity on state change only
        gsap.to(cursor.current, {
            width: state.size,
            height: state.size,
            backgroundColor: state.backgroundColor,
            duration: 0.18,
            ease: "power2.out",
            overwrite: 'auto'
        });
        if (cursorText.current) {
            gsap.to(cursorText.current, {
                opacity: state.isHovering && state.text ? 1 : 0,
                duration: 0.18,
                ease: "power2.out",
                overwrite: 'auto'
            });
        }
        if (cursorIcon.current) {
            gsap.to(cursorIcon.current, {
                opacity: state.showIcon ? 1 : 0,
                scale: state.showIcon ? 1 : 0.8,
                duration: 0.18,
                ease: "power2.out",
                overwrite: 'auto'
            });
        }
    }, [state]);
    
    const lerp = (x, y, a) => x * (1 - a) + y * a;

    useEffect(() => {
        // Check if mobile device on mount and on resize
        const checkMobile = () => setIsMobileDevice(isMobile());
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    useEffect(() => {
        // Don't initialize cursor animations on mobile devices
        if (isMobileDevice) return;
        
        mouse.current = {x: window.innerWidth / 2, y: window.innerHeight - 100};
        delayedMouse.current = {x: window.innerWidth / 2, y: window.innerHeight - 100};

        if (cursor.current) {
            gsap.set(cursor.current, { 
                x: mouse.current.x,
                y: mouse.current.y,
                xPercent: -50, 
                yPercent: -50,
                force3D: true
            });
        }

        const manageMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            delayedMouse.current = {
                x: lerp(delayedMouse.current.x, mouse.current.x, 0.12),
                y: lerp(delayedMouse.current.y, mouse.current.y, 0.12)
            };
            gsap.set(cursor.current, { 
                x: delayedMouse.current.x, 
                y: delayedMouse.current.y,
                xPercent: -50, 
                yPercent: -50,
                force3D: true
            });
            rafId.current = window.requestAnimationFrame(animate);
        };
        
        window.addEventListener('mousemove', manageMouseMove, { passive: true });
        rafId.current = window.requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', manageMouseMove);
            window.cancelAnimationFrame(rafId.current);
        };
    }, [isMobileDevice])

    // Don't render cursor on mobile devices
    if (isMobileDevice) {
        return null;
    }
    
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
