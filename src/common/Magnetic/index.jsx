import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';

export default function index({children}) {
    const magnetic = useRef(null);

    useEffect( () => {
        const el = magnetic.current;
        if (!el) return;

        const xTo = gsap.quickTo(el, "x", {duration: 0.8, ease: "elastic.out(1, 0.3)"})
        const yTo = gsap.quickTo(el, "y", {duration: 0.8, ease: "elastic.out(1, 0.3)"})

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            const {height, width, left, top} = el.getBoundingClientRect();
            xTo((clientX - (left + width/2)) * 0.35);
            yTo((clientY - (top + height/2)) * 0.35);
        };

        const onMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener("mousemove", onMouseMove, { passive: true });
        el.addEventListener("mouseleave", onMouseLeave);

        return () => {
            el.removeEventListener("mousemove", onMouseMove);
            el.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [])

    return (
        React.cloneElement(children, {ref:magnetic})
    )
}
