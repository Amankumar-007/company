'use client';
import React from 'react'
import styles from './style.module.scss';
import { useRouter } from 'next/navigation';

export default function index({index, title}) {
    const router = useRouter();
    
    // Map project titles to service IDs
    const getServiceId = (projectTitle) => {
        const serviceMap = {
            'Web Development': 'web-development',
            'App development': 'mobile-development',
            'UI/UX design': 'ui-ux-design',
            'SEO': 'digital-marketing'
        };
        return serviceMap[projectTitle] || 'web-development';
    };
    
    const handleClick = () => {
        const serviceId = getServiceId(title);
        router.push(`/service-detail?id=${serviceId}`);
    };

    return (
        <div 
            onClick={handleClick}
            className={styles.project}
            style={{ cursor: 'pointer' }}
        >
            <h2>{title}</h2>
            <p>Design & Development</p>
        </div>
    )
}
