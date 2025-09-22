'use client';
import React from 'react'
import styles from './style.module.scss';
import { useRouter } from 'next/navigation';

export default function index({index, title, manageModal}) {
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
            onMouseEnter={(e) => {manageModal(true, index, e.clientX, e.clientY)}} 
            onMouseLeave={(e) => {manageModal(false, index, e.clientX, e.clientY)}} 
            onClick={handleClick}
            className={styles.project}
            style={{ cursor: 'pointer' }}
        >
            <h2>{title}</h2>
            <p>Design & Development</p>
        </div>
    )
}
