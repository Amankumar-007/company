'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  Repeat,
  Zap,
  Users,
  ChevronRight,
  Code2,
  Cpu,
  Globe,
  Rocket,
  Terminal,
  Workflow,
  Kanban,
  Gauge,
  Boxes,
  Activity,
  FileCode2,
  Server,
  Smartphone,
  CheckCheck,
  Compass,
  Database,
  Braces,
  Lock,
  Trophy,
  Briefcase,
  Star,
  MessageSquare,
  Phone,
  User
} from 'lucide-react';
import TechLogo from '@/components/TechLogo';
import { openConsultModal } from '@/components/ConsultModal';
import { servicePages } from '@/data/service-pages';
import { getProjectBySlug } from '@/data/projects';
import { solutionsData } from '@/data/solutions';
import locationsData from '@/data/locations-data.json';

const BASE_URL = 'https://www.twofloww.in';
const { brand } = locationsData;

type ServicePage = (typeof servicePages)[number];

const sectionTitle = 'font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 mb-4';
const sectionSubtitle = 'text-zinc-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-12';

// ── DISTINCT CUSTOM SVG 3D GEOMETRIC ARTWORK PATTERNS (UNIQUE PER MODULE) ──
// Pattern: Concentric Layered Domes / Arcs (Exact motif from user reference)
const PatternConcentricDomes = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="domes-1" cx="85%" cy="95%" r="95%">
        <stop offset="0%" stopColor="#434968" stopOpacity="0.85" />
        <stop offset="35%" stopColor="#2A2F48" stopOpacity="0.75" />
        <stop offset="70%" stopColor="#181B2B" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#0B0D17" stopOpacity="0.15" />
      </radialGradient>
      <radialGradient id="domes-2" cx="85%" cy="95%" r="75%">
        <stop offset="0%" stopColor="#5B638A" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#353A5A" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1C2033" stopOpacity="0.6" />
      </radialGradient>
      <radialGradient id="domes-3" cx="85%" cy="95%" r="55%">
        <stop offset="0%" stopColor="#7B85B5" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#4A527A" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#252A42" stopOpacity="0.7" />
      </radialGradient>
      <radialGradient id="domes-4" cx="85%" cy="95%" r="35%">
        <stop offset="0%" stopColor="#9EAAE0" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#5D6796" stopOpacity="0.75" />
      </radialGradient>
    </defs>
    <circle cx="340" cy="380" r="340" fill="url(#domes-1)" stroke="#525B82" strokeWidth="1" strokeOpacity="0.35" />
    <circle cx="340" cy="380" r="260" fill="url(#domes-2)" stroke="#6773A3" strokeWidth="1" strokeOpacity="0.45" />
    <circle cx="340" cy="380" r="180" fill="url(#domes-3)" stroke="#818FC4" strokeWidth="1.2" strokeOpacity="0.55" />
    <circle cx="340" cy="380" r="105" fill="url(#domes-4)" stroke="#A5B2E8" strokeWidth="1.5" strokeOpacity="0.65" />
    <circle cx="340" cy="380" r="45" fill="#C8D4FF" fillOpacity="0.85" />
  </svg>
);

// Pattern 2: Stepped 3D Isometric Pyramid / Ziggurat
const PatternPyramid = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="pyr-f1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C3F53C" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#059669" stopOpacity="0.25" />
      </linearGradient>
      <linearGradient id="pyr-f2" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#064E3B" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="pyr-glow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C3F53C" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Tier 1 (Base Platform) */}
    <polygon points="260,180 380,240 260,300 140,240" fill="#0D2818" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" />
    <polygon points="140,240 260,300 260,350 140,290" fill="#071E11" stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.5" />
    <polygon points="260,300 380,240 380,290 260,350" fill="url(#pyr-f2)" stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.5" />
    {/* Tier 2 */}
    <polygon points="260,140 350,185 260,230 170,185" fill="#143D24" stroke="#34D399" strokeWidth="1.5" strokeOpacity="0.7" />
    <polygon points="170,185 260,230 260,265 170,220" fill="#0A2415" stroke="#34D399" strokeWidth="1" strokeOpacity="0.5" />
    <polygon points="260,230 350,185 350,220 260,265" fill="#143D24" stroke="#34D399" strokeWidth="1" strokeOpacity="0.5" />
    {/* Tier 3 */}
    <polygon points="260,100 320,130 260,160 200,130" fill="url(#pyr-f1)" stroke="#6EE7B7" strokeWidth="1.5" strokeOpacity="0.8" />
    {/* Tier 4 (Apex Platform) */}
    <polygon points="260,60 290,75 260,90 230,75" fill="#C3F53C" stroke="#FFFFFF" strokeWidth="1.8" />
    {/* Apex Laser Core */}
    <line x1="260" y1="20" x2="260" y2="60" stroke="#C3F53C" strokeWidth="2.5" strokeDasharray="3 3" />
    <circle cx="260" cy="50" r="28" fill="url(#pyr-glow)" filter="blur(8px)" />
    <circle cx="260" cy="50" r="5" fill="#FFFFFF" />
  </svg>
);

// Pattern 3: Floating 3D Isometric Voxel Cubes
const PatternIsometricCubes = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="cube-t1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0284C7" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="cube-l1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0284C7" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0C4A6E" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="cube-r1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0F172A" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Primary Giant Cube */}
    <polygon points="260,120 340,160 260,200 180,160" fill="url(#cube-t1)" stroke="#38BDF8" strokeWidth="1.5" />
    <polygon points="180,160 260,200 260,290 180,250" fill="url(#cube-l1)" stroke="#38BDF8" strokeWidth="1.5" />
    <polygon points="260,200 340,160 340,250 260,290" fill="url(#cube-r1)" stroke="#38BDF8" strokeWidth="1.5" />
    {/* Secondary Floating Cube Upper-Left */}
    <polygon points="170,80 220,105 170,130 120,105" fill="url(#cube-t1)" stroke="#7DD3FC" strokeWidth="1.2" />
    <polygon points="120,105 170,130 170,180 120,155" fill="url(#cube-l1)" stroke="#7DD3FC" strokeWidth="1.2" />
    <polygon points="170,130 220,105 220,155 170,180" fill="url(#cube-r1)" stroke="#7DD3FC" strokeWidth="1.2" />
    {/* Small Satellite Cube Lower-Right */}
    <polygon points="320,240 360,260 320,280 280,260" fill="url(#cube-t1)" stroke="#38BDF8" strokeWidth="1" />
    <polygon points="280,260 320,280 320,320 280,300" fill="url(#cube-l1)" stroke="#38BDF8" strokeWidth="1" />
    <polygon points="320,280 360,260 360,300 320,320" fill="url(#cube-r1)" stroke="#38BDF8" strokeWidth="1" />
    {/* Cyber Connection Grid Lines */}
    <line x1="170" y1="130" x2="260" y2="120" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.6" />
    <line x1="260" y1="290" x2="320" y2="280" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.6" />
    <circle cx="260" cy="120" r="4" fill="#38BDF8" />
    <circle cx="170" cy="80" r="3.5" fill="#7DD3FC" />
    <circle cx="260" cy="200" r="4" fill="#C3F53C" />
  </svg>
);

// Pattern 4: Concentric Gyroscopic Orbital Torus & Planetary Rings
const PatternOrbitalTorus = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="torus-grad-1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#065F46" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#022C22" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="torus-grad-2" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C3F53C" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0.15" />
      </linearGradient>
      <linearGradient id="torus-glow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C3F53C" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
      </linearGradient>
    </defs>
    <ellipse cx="260" cy="240" rx="150" ry="55" transform="rotate(-28 260 240)" stroke="url(#torus-grad-1)" strokeWidth="2" strokeDasharray="6 3" strokeOpacity="0.8" />
    <ellipse cx="260" cy="240" rx="130" ry="45" transform="rotate(45 260 240)" stroke="url(#torus-grad-2)" strokeWidth="2.2" strokeOpacity="0.85" />
    <ellipse cx="260" cy="240" rx="95" ry="35" transform="rotate(-75 260 240)" stroke="#34D399" strokeWidth="1.5" strokeOpacity="0.7" />
    <circle cx="260" cy="240" r="48" fill="#064E3B" stroke="#C3F53C" strokeWidth="1.8" strokeOpacity="0.8" />
    <circle cx="260" cy="240" r="28" fill="#022C22" stroke="#34D399" strokeWidth="1.2" />
    <circle cx="260" cy="240" r="14" fill="#C3F53C" />
    <circle cx="160" cy="180" r="5" fill="#C3F53C" />
    <circle cx="360" cy="300" r="4.5" fill="#34D399" />
    <circle cx="210" cy="320" r="4" fill="#6EE7B7" />
    <circle cx="330" cy="140" r="4" fill="#C3F53C" />
    <circle cx="260" cy="240" r="32" fill="url(#torus-glow)" filter="blur(12px)" />
  </svg>
);

// Pattern 5: 3D Curved Parametric Wave Ribbon Mesh
const PatternWaveformRibbon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="wave-grad-1" x1="40" y1="120" x2="360" y2="280" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E879F9" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#A855F7" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#3B0764" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id="wave-grad-2" x1="40" y1="160" x2="360" y2="320" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C084FC" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#581C87" stopOpacity="0.15" />
      </linearGradient>
      <linearGradient id="wave-glow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F472B6" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M 60 160 C 140 70, 210 270, 290 140 C 340 60, 380 110, 390 140 L 390 240 C 360 200, 310 150, 260 230 C 180 340, 120 180, 60 260 Z"
      fill="url(#wave-grad-1)"
      stroke="#E879F9"
      strokeWidth="1.5"
      strokeOpacity="0.9"
    />
    <path
      d="M 60 240 C 130 150, 200 340, 280 220 C 330 140, 370 190, 380 220 L 380 310 C 350 270, 300 220, 250 300 C 170 410, 110 250, 60 330 Z"
      fill="url(#wave-grad-2)"
      stroke="#A855F7"
      strokeWidth="1.2"
      strokeOpacity="0.6"
    />
    <circle cx="290" cy="140" r="18" fill="url(#wave-glow)" filter="blur(6px)" />
    <circle cx="290" cy="140" r="4.5" fill="#F472B6" />
    <circle cx="140" cy="120" r="3.5" fill="#C084FC" />
    <circle cx="360" cy="110" r="3.5" fill="#C3F53C" />
  </svg>
);

// Pattern 6: 3D Faceted Diamond Octahedron Polyhedron
const PatternOctahedron = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="octa-top-1" x1="260" y1="50" x2="260" y2="220" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="octa-bot-1" x1="260" y1="220" x2="260" y2="370" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#0F172A" stopOpacity="0.15" />
      </linearGradient>
    </defs>
    <polygon points="260,40 370,220 260,370 150,220" stroke="#60A5FA" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.4" fill="none" />
    <polygon points="260,60 170,220 260,220" fill="url(#octa-top-1)" stroke="#60A5FA" strokeWidth="1.5" />
    <polygon points="260,60 350,220 260,220" fill="#2563EB" fillOpacity="0.6" stroke="#93C5FD" strokeWidth="1.5" />
    <polygon points="260,370 170,220 260,220" fill="url(#octa-bot-1)" stroke="#3B82F6" strokeWidth="1.5" />
    <polygon points="260,370 350,220 260,220" fill="#1E3A8A" fillOpacity="0.7" stroke="#60A5FA" strokeWidth="1.5" />
    <line x1="150" y1="220" x2="370" y2="220" stroke="#BFDBFE" strokeWidth="1.8" />
    <circle cx="260" cy="60" r="4.5" fill="#FFFFFF" />
    <circle cx="260" cy="370" r="4" fill="#60A5FA" />
    <circle cx="170" cy="220" r="3.5" fill="#93C5FD" />
    <circle cx="350" cy="220" r="3.5" fill="#93C5FD" />
    <circle cx="260" cy="220" r="5" fill="#C3F53C" />
  </svg>
);

// Pattern 7: Cybernetic Reactor Core & Hexagonal Matrix
const PatternQuantumCore = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="core-hex-1" x1="120" y1="80" x2="380" y2="340" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB923C" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#EA580C" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#431407" stopOpacity="0.1" />
      </linearGradient>
      <radialGradient id="core-radial-1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#EA580C" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#18181B" stopOpacity="0" />
      </radialGradient>
    </defs>
    <polygon points="260,60 375,130 375,270 260,340 145,270 145,130" stroke="url(#core-hex-1)" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
    <polygon points="260,100 345,150 345,250 260,300 175,250 175,150" stroke="#F97316" strokeWidth="1.8" strokeDasharray="8 4" fill="none" />
    <polygon points="260,135 315,168 315,232 260,265 205,232 205,168" fill="#1C1917" stroke="#FB923C" strokeWidth="1.8" />
    <circle cx="260" cy="200" r="50" fill="url(#core-radial-1)" />
    <circle cx="260" cy="200" r="28" fill="#431407" stroke="#FDE047" strokeWidth="1.8" />
    <circle cx="260" cy="200" r="14" fill="#FDE047" />
    <line x1="260" y1="60" x2="260" y2="135" stroke="#FB923C" strokeWidth="1.5" />
    <line x1="260" y1="265" x2="260" y2="340" stroke="#FB923C" strokeWidth="1.5" />
    <circle cx="260" cy="60" r="4" fill="#FB923C" />
    <circle cx="375" cy="130" r="4" fill="#F97316" />
    <circle cx="375" cy="270" r="4" fill="#FB923C" />
  </svg>
);

// Pattern 8: Twisting 3D Double Helix Structural Spiral
const PatternHelixGeometry = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="helix-grad-1" x1="180" y1="40" x2="340" y2="360" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#0D9488" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#042F2E" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    <line x1="260" y1="30" x2="260" y2="370" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.35" />
    <path
      d="M 260 40 C 350 80, 350 140, 260 180 C 170 220, 170 280, 260 320 C 350 360, 310 370, 260 370"
      stroke="#5EEAD4"
      strokeWidth="2.8"
      strokeOpacity="0.95"
      fill="none"
    />
    <path
      d="M 260 40 C 170 80, 170 140, 260 180 C 350 220, 350 280, 260 320 C 170 360, 210 370, 260 370"
      stroke="url(#helix-grad-1)"
      strokeWidth="2.8"
      strokeOpacity="0.75"
      fill="none"
    />
    <line x1="195" y1="95" x2="325" y2="95" stroke="#2DD4BF" strokeWidth="1.8" />
    <circle cx="195" cy="95" r="4.5" fill="#5EEAD4" />
    <circle cx="325" cy="95" r="4.5" fill="#14B8A6" />
    <line x1="215" y1="135" x2="305" y2="135" stroke="#5EEAD4" strokeWidth="1.5" />
    <circle cx="215" cy="135" r="4" fill="#2DD4BF" />
    <circle cx="305" cy="135" r="4" fill="#5EEAD4" />
    <circle cx="260" cy="180" r="5.5" fill="#C3F53C" />
    <line x1="215" y1="225" x2="305" y2="225" stroke="#5EEAD4" strokeWidth="1.5" />
    <line x1="195" y1="265" x2="325" y2="265" stroke="#2DD4BF" strokeWidth="1.8" />
    <circle cx="195" cy="265" r="4.5" fill="#14B8A6" />
    <circle cx="325" cy="265" r="4.5" fill="#5EEAD4" />
  </svg>
);

// Pattern 9: Tiered Architectural Floating Glass Plates
const PatternFloatingPlates = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="plate-grad-1" x1="140" y1="60" x2="380" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB7185" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#881337" stopOpacity="0.15" />
      </linearGradient>
      <linearGradient id="plate-grad-2" x1="140" y1="130" x2="380" y2="270" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#4C0519" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <polygon points="260,60 380,120 260,180 140,120" fill="url(#plate-grad-1)" stroke="#FB7185" strokeWidth="1.8" />
    <polygon points="260,140 380,200 260,260 140,200" fill="url(#plate-grad-2)" stroke="#F43F5E" strokeWidth="1.5" />
    <polygon points="260,220 380,280 260,340 140,280" fill="#4C0519" fillOpacity="0.4" stroke="#E11D48" strokeWidth="1.2" />
    <line x1="140" y1="120" x2="140" y2="280" stroke="#FDA4AF" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.5" />
    <line x1="380" y1="120" x2="380" y2="280" stroke="#FDA4AF" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.5" />
    <circle cx="260" cy="60" r="4" fill="#FFE4E6" />
    <circle cx="380" cy="120" r="3.5" fill="#FB7185" />
    <circle cx="140" cy="120" r="3.5" fill="#FB7185" />
    <circle cx="260" cy="180" r="4.5" fill="#C3F53C" />
  </svg>
);

// Map distinct patterns sequentially so each card has its own custom artwork
const getModulePattern = (index: number) => {
  const patterns = [
    PatternConcentricDomes,
    PatternPyramid,
    PatternIsometricCubes,
    PatternOrbitalTorus,
    PatternWaveformRibbon,
    PatternOctahedron,
    PatternQuantumCore,
    PatternHelixGeometry,
    PatternFloatingPlates,
  ];
  return patterns[index % patterns.length];
};

// ── CUSTOM HIGH-TECH SVG PATTERN COMPONENTS ────────────────────────────
const ArchitecturalGridPattern = ({ className = 'opacity-[0.04]' }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="arch-grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 0 0 L 5 0 M 0 0 L 0 5 M 48 0 L 43 0 M 48 0 L 48 5 M 0 48 L 0 43 M 0 48 L 5 48 M 48 48 L 43 48 M 48 48 L 48 43" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <circle cx="24" cy="24" r="1" fill="currentColor" opacity="0.6" />
        </pattern>
        <radialGradient id="arch-vignette" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="65%" stopColor="white" stopOpacity="0.8" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="arch-vignette-mask">
          <rect width="100%" height="100%" fill="url(#arch-vignette)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#arch-grid-pattern)" mask="url(#arch-vignette-mask)" />
    </svg>
  </div>
);

const CyberMatrixPattern = ({ className = 'opacity-20' }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="cyber-matrix-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" />
          <path d="M 14 0 L 14 28 M 0 14 L 28 14" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 7" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cyber-matrix-grid)" />
    </svg>
  </div>
);

// 5 Core Engineering Pillars with images from public/service-png
const engineeringPillars = [
  {
    title: 'Modern Frontend & Reactive UI Systems',
    tag: 'Frontend Architecture',
    stepNumber: '01',
    icon: Braces,
    desc: 'High-performance web and mobile user interfaces engineered with Next.js 15, React 19, and TypeScript. Sub-second initial load, partial prerendering, fluid 60fps micro-animations, and full WCAG accessibility.',
    image: '/service-png/frontend.png',
    chips: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind', 'Framer Motion'],
    topTerminal: 'NEXT.JS 15 // REACT 19 RSC',
    metricBadge: 'LCP < 0.9s · 100 LIGHTHOUSE',
    ambientGlow: 'from-[#C3F53C]/12 via-emerald-500/8 to-cyan-500/10',
    accentBorder: 'hover:border-emerald-300',
    points: [
      'Server-Side Rendering (SSR) & Partial Prerendering (PPR)',
      'Sub-second Largest Contentful Paint (LCP < 0.9s)',
      'Design system tokens & reusable atomic UI components',
      'Mobile-first responsive architecture across all breakpoints'
    ]
  },
  {
    title: 'Robust Backend, APIs & Cloud Scalability',
    tag: 'Cloud & Infrastructure',
    stepNumber: '02',
    icon: Server,
    desc: 'Enterprise-grade microservices and serverless infrastructure powered by Node.js, Python, PostgreSQL, Supabase, and AWS. Zero-bottleneck throughput ready to handle high-concurrency spikes without latency.',
    image: '/service-png/backend.png',
    chips: ['Node.js', 'PostgreSQL', 'Supabase', 'Redis', 'AWS Cloud'],
    topTerminal: 'POSTGRESQL // SUPABASE POOL',
    metricBadge: '99.99% SLA · P99 < 18ms LATENCY',
    ambientGlow: 'from-blue-500/12 via-indigo-500/8 to-purple-500/10',
    accentBorder: 'hover:border-indigo-300',
    points: [
      'Scalable RESTful & GraphQL API gateways with rate-limiting',
      'PostgreSQL, Supabase & Redis memory caching tiers',
      'Microservices architecture with Docker containerization',
      'Automated cloud auto-scaling with AWS ECS & Vercel'
    ]
  },
  {
    title: 'Cross-Device & Omnichannel Synchronization',
    tag: 'Cross-Platform',
    stepNumber: '03',
    icon: Boxes,
    desc: 'Unified digital ecosystems where desktop, tablet, and smartphone experiences stay seamlessly in sync. Offline-first PWA architectures, real-time data streaming via WebSockets, and zero data fragmentation.',
    image: '/service-png/cross.png',
    chips: ['PWA', 'WebSockets', 'CRM Integrations', 'Stripe Payments', 'Sync APIs'],
    topTerminal: 'WEBSOCKET // OMNICHANNEL ENGINE',
    metricBadge: 'REALTIME SYNC · OFFLINE FIRST',
    ambientGlow: 'from-amber-500/12 via-orange-500/8 to-red-500/10',
    accentBorder: 'hover:border-amber-300',
    points: [
      'Seamless cross-browser and cross-device visual parity',
      'Progressive Web App (PWA) with background sync & offline caches',
      'Low-latency WebSocket event streams and push messaging',
      'CRM, ERP & payment gateway API orchestration'
    ]
  },
  {
    title: 'High-Speed Native & Hybrid Mobile Apps',
    tag: 'Mobile Engineering',
    stepNumber: '04',
    icon: Smartphone,
    desc: 'Bespoke iOS and Android mobile solutions built for speed, tactile fluidity, and high retention. Whether native Swift/Kotlin or high-velocity React Native, we guarantee buttery 60fps animations and biometric auth.',
    image: '/service-png/native.png',
    chips: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'App Store QA'],
    topTerminal: 'SWIFT & KOTLIN // REACT NATIVE',
    metricBadge: '60 FPS METAL · ZERO JANK UI',
    ambientGlow: 'from-sky-500/12 via-cyan-500/8 to-blue-500/10',
    accentBorder: 'hover:border-sky-300',
    points: [
      'Native iOS (Swift) & Android (Kotlin) performance standards',
      'Cross-platform velocity via modern React Native & Flutter',
      'Biometric authentication, push notifications & deep linking',
      'App Store & Google Play compliance guarantees'
    ]
  },
  {
    title: 'Enterprise Security & CI/CD Automated Quality',
    tag: 'DevOps & Security',
    stepNumber: '05',
    icon: ShieldCheck,
    desc: 'Zero-compromise application security, secret management, and automated testing pipelines. Every code push is validated with automated end-to-end tests, linting, and vulnerability scanning before production deploy.',
    image: '/service-png/native2.png',
    chips: ['OWASP Audit', 'GitHub Actions', 'Docker', 'Sentry', '99.99% SLA'],
    topTerminal: 'OWASP AUDIT // GITHUB ACTIONS',
    metricBadge: 'ZERO VULNERABILITY · SOC-2 READY',
    ambientGlow: 'from-emerald-500/12 via-teal-500/8 to-zinc-500/10',
    accentBorder: 'hover:border-emerald-300',
    points: [
      'OWASP Top-10 security audit compliance & pen-testing',
      'Automated CI/CD deployment pipelines with zero downtime',
      'End-to-end SSL encryption, JWT tokens & RBAC auth guards',
      '99.99% uptime monitoring and automated rollback safeguards'
    ]
  }
];

// Comprehensive 6-Phase End-to-End Delivery Process
const fullProcessPhases = [
  {
    step: '01',
    phase: 'Discovery & Strategic Architecture',
    timeframe: 'WEEK 01',
    icon: Compass,
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'We align on business goals, map user personas, design database schemas, and define a strict scope with clear acceptance criteria.',
    activities: [
      'Technical feasibility & benchmark analysis',
      'Database schema & API architecture blueprint',
      'User journey mapping & high-level wireframing',
      'Defined milestone & sprint velocity plan'
    ],
    deliverable: 'Approved Technical PRD & Architecture Spec'
  },
  {
    step: '02',
    phase: 'UI/UX Wireframes & Design Systems',
    timeframe: 'WEEKS 01–02',
    icon: Layers,
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'We craft clickable Figma prototypes and complete design systems so you test and approve every screen before any code is written.',
    activities: [
      'Low-fidelity wireframe flows & layout testing',
      'Interactive clickable prototype in Figma',
      'Design tokens (colors, typography, states, dark mode)',
      'Client design review & milestone sign-off'
    ],
    deliverable: 'Complete Clickable Figma Prototype'
  },
  {
    step: '03',
    phase: 'Agile Sprint Execution & Core Build',
    timeframe: 'WEEKS 03–06',
    icon: Workflow,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'We code in bi-weekly agile sprints with working software delivered to a private staging URL every single week for your review.',
    activities: [
      'Frontend & backend modular implementation',
      'Database modeling & secure API integration',
      'Weekly live staging demos on staging URL',
      'Iterative feedback integration without delays'
    ],
    deliverable: 'Live Staging Builds Every 14 Days'
  },
  {
    step: '04',
    phase: 'QA, Security & Performance Benchmarks',
    timeframe: 'WEEK 07',
    icon: Gauge,
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Rigorous cross-device testing across 20+ real phones and browsers, security vulnerability scans, and Core Web Vitals optimization.',
    activities: [
      'Cross-browser & device matrix testing',
      'Automated unit & end-to-end testing suites',
      'Lighthouse 90+ Core Web Vitals audit',
      'OWASP vulnerability & security checks'
    ],
    deliverable: 'QA Test Sign-off & Performance Audit'
  },
  {
    step: '05',
    phase: 'Zero-Downtime Deployment & Go-Live',
    timeframe: 'WEEK 08',
    icon: Rocket,
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Seamless deployment to production with CDN routing, SSL configuration, DNS migration, analytics setup, and Google Search Console indexing.',
    activities: [
      'Production cloud provisioning & CDN caching',
      'Zero-downtime DNS cutover migration',
      'Google Analytics 4 & Search Console setup',
      'Technical SEO verification & XML sitemaps'
    ],
    deliverable: 'Production Launch & Full Source Code Transfer'
  },
  {
    step: '06',
    phase: 'Post-Launch Warranty, SLA & Evolution',
    timeframe: 'ONGOING',
    icon: Activity,
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    description: '30-day dedicated post-launch warranty, 24/7 uptime monitoring, performance maintenance, and ongoing agile sprint improvements.',
    activities: [
      '30-day bug-free warranty guarantee',
      'Uptime & error monitoring (Sentry, Datadog)',
      'Routine library & security patch updates',
      'Feature backlog scaling & next-phase roadmap'
    ],
    deliverable: 'Dedicated Support Channel & SLA Guarantee'
  }
];

// Core Agile Pillars
const agilePillars = [
  {
    icon: Repeat,
    badge: 'CADENCE',
    title: '2-Week Sprint Cadence',
    desc: 'Work is broken into predictable 14-day sprint cycles with defined story points, clear acceptance criteria, and transparent milestone commitments.'
  },
  {
    icon: FileCode2,
    badge: 'DE-RISKED',
    title: 'Free First Wireframe (Sprint 0)',
    desc: 'We de-risk your investment by delivering your initial wireframe and architecture roadmap for free before any long-term contract is signed.'
  },
  {
    icon: Globe,
    badge: 'TRANSPARENCY',
    title: 'Live Staging & Weekly Demos',
    desc: 'You test real, working software every week on a private staging link. No static slide decks — see actual progress in real time.'
  },
  {
    icon: Kanban,
    badge: 'FLEXIBILITY',
    title: 'Adaptive Scope Flexibility',
    desc: 'Market conditions change. Re-prioritize your product backlog at the start of any sprint without painful change orders or penalties.'
  },
  {
    icon: Users,
    badge: 'COLLABORATION',
    title: 'Direct Engineer Access',
    desc: 'Collaborate directly with your dedicated Scrum Master and engineers in a shared Slack or Teams channel. Zero middlemen, zero miscommunication.'
  },
  {
    icon: ShieldCheck,
    badge: 'OWNERSHIP',
    title: '100% Code & IP Ownership',
    desc: 'Every commit belongs to you. Complete Git repository, documentation, deployment scripts, and credentials handed over at milestone completion.'
  }
];

// Verified Client Testimonials for Scattered-to-Arranged Section (Images 3 & 4)
const clientReviews = [
  {
    id: 1,
    quote: "Twofloww completed a rebranding and full re-engineering of our web platform. The quality of the team's work exceeded our expectations, and since completion we have seen a 42% lift in qualified inquiries.",
    brand: "zelt",
    author: "Alex Rivera",
    role: "Product Lead",
    bgClass: "bg-[#F8F9FA]",
    borderClass: "border-zinc-200/90",
    tiltClass: "lg:rotate-[-5deg] lg:translate-y-3 lg:-translate-x-3"
  },
  {
    id: 2,
    quote: "We worked with the Twofloww team over a multi-month project on a complete product overhaul with new copy, UI system, and custom APIs. Several things stood out: their agile sprint transparency and weekly demos.",
    brand: "LoanPro",
    author: "Marcus Vance",
    role: "VP Engineering",
    bgClass: "bg-[#EBF7F4]",
    borderClass: "border-emerald-200/80",
    tiltClass: "lg:rotate-[3deg] lg:-translate-y-4"
  },
  {
    id: 3,
    quote: "Twofloww was engaged in developing our modern web app and design tokens. Their efforts were highly satisfactory, and we were thoroughly impressed with their collaborative, engineering-led approach.",
    brand: "Potion",
    author: "Elena Rostova",
    role: "Creative Director",
    bgClass: "bg-[#F8F9FA]",
    borderClass: "border-zinc-200/90",
    tiltClass: "lg:rotate-[6deg] lg:translate-y-3 lg:translate-x-3"
  },
  {
    id: 4,
    quote: "I'd like to extend a heartfelt gratitude to the Twofloww team for their exceptional support throughout the portal build. Your team's responsiveness and engineering rigor made this a complete success.",
    brand: "SnippetsX",
    author: "Priya Sharma",
    role: "Founder & CEO",
    bgClass: "bg-[#EBF7F4]",
    borderClass: "border-emerald-200/80",
    tiltClass: "lg:rotate-[-3deg] lg:translate-y-6 lg:-translate-x-2"
  },
  {
    id: 5,
    quote: "We had a great experience working with Twofloww on our platform redesign. Their senior developers brought a strong mix of creativity, technical skill, and strategic velocity to every 14-day sprint milestone.",
    brand: "AwasDhara",
    author: "Devendra Mehta",
    role: "Managing Director",
    bgClass: "bg-[#F8F9FA]",
    borderClass: "border-zinc-200/90",
    tiltClass: "lg:rotate-[4deg] lg:translate-y-5 lg:translate-x-3"
  }
];

// Service-specific Hero Visual Showcase Data
const getHeroVisualData = (slug: string) => {
  switch (slug) {
    case 'mobile-app-development':
      return {
        image: '/service-png/native.png',
        badge: 'iOS & Android Native Runtime',
        tag: 'Mobile Engineering',
        accentColor: '#C3F53C',
        specTitle: 'Dual-Engine Mobile Chassis',
        specItems: [
          { label: 'Rendering', val: '120 FPS Fluid' },
          { label: 'Sync Delay', val: '< 15ms Latency' },
          { label: 'Store SLA', val: '100% Guaranteed' },
        ],
        chips: ['Swift', 'Kotlin', 'Flutter', 'React Native', 'Firebase'],
        floatingBadgeTop: '⚡ 120 FPS Fluid Native',
        floatingBadgeBottom: '🛡️ Store Approval Guarantee',
      };
    case 'web-development':
      return {
        image: '/service-png/frontend.png',
        badge: 'Next.js 15 & React 19 RSC',
        tag: 'Web Ecosystem',
        accentColor: '#38BDF8',
        specTitle: 'High-Performance Edge Stack',
        specItems: [
          { label: 'Core Vitals', val: 'LCP < 0.8s' },
          { label: 'SEO Audit', val: '100 / 100 Score' },
          { label: 'Uptime SLA', val: '99.99% Cloud' },
        ],
        chips: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'PostgreSQL'],
        floatingBadgeTop: '⚡ Sub-second LCP Speed',
        floatingBadgeBottom: '🛡️ 100% SEO Score Handover',
      };
    case 'ecommerce-development':
      return {
        image: '/service-png/cross.png',
        badge: 'Headless Commerce & Checkout',
        tag: 'Omnichannel Store',
        accentColor: '#F59E0B',
        specTitle: 'High-Conversion Architecture',
        specItems: [
          { label: 'Checkout Flow', val: '< 1.2s Fast Lane' },
          { label: 'Uptime SLA', val: '99.99% Peak' },
          { label: 'Gateway Sync', val: 'Instant Webhooks' },
        ],
        chips: ['Shopify Plus', 'WooCommerce', 'Stripe', 'Next Commerce', 'Redis'],
        floatingBadgeTop: '💳 1-Click Fast Checkout',
        floatingBadgeBottom: '📦 Automated Inventory Sync',
      };
    case 'ui-ux-design':
      return {
        image: '/service-png/native2.png',
        badge: 'Design Systems & Motion UI',
        tag: 'Product Design',
        accentColor: '#EC4899',
        specTitle: 'Atomic Design & Prototypes',
        specItems: [
          { label: 'Figma Tokens', val: '100% Scalable' },
          { label: 'User Testing', val: 'Prototype Ready' },
          { label: 'Design Handoff', val: 'Dev-Ready Specs' },
        ],
        chips: ['Figma Tokens', 'Prototyping', 'WCAG AAA', 'Micro-interactions', 'Design System'],
        floatingBadgeTop: '🎨 Figma Design Tokens',
        floatingBadgeBottom: '✨ Dev-Ready Prototype',
      };
    default:
      return {
        image: '/service-png/backend.png',
        badge: 'Enterprise Architecture & Cloud',
        tag: 'Digital Engineering',
        accentColor: '#10B981',
        specTitle: 'Production Cloud Stack',
        specItems: [
          { label: 'Concurrency', val: '10k+ Req/sec' },
          { label: 'API P99', val: '< 20ms Response' },
          { label: 'Security', val: 'Enterprise Grade' },
        ],
        chips: ['Node.js', 'PostgreSQL', 'Docker', 'AWS ECS', 'Supabase'],
        floatingBadgeTop: '⚡ Enterprise Concurrency',
        floatingBadgeBottom: '🛡️ 100% Code Ownership',
      };
  }
};

export default function ServicePageTemplate({ page }: { page: ServicePage }) {
  const [activeOfferingIndex, setActiveOfferingIndex] = useState(-1);
  const [isTestimonialsArranged, setIsTestimonialsArranged] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const userInteractedRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const activeOfferingIndexRef = useRef<number>(-1);
  activeOfferingIndexRef.current = activeOfferingIndex;

  const handleCardClick = (index: number) => {
    userInteractedRef.current = Date.now();
    lastScrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0;
    setActiveOfferingIndex((prev) => (prev === index ? -1 : index));
  };

  // Scroll-driven slow, buttery-smooth reveal:
  // Opens cards sequentially when scrolled down into view, closes them sequentially when scrolled up.
  // 100% jitter-free with hysteresis buffer and static document container anchoring.
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = cardsContainerRef.current;
          if (!container) {
            ticking = false;
            return;
          }

          const currentScrollY = window.scrollY;
          // If user clicked manually recently, preserve choice unless scrolled significantly (> 120px)
          if (Date.now() - userInteractedRef.current < 2000) {
            if (Math.abs(currentScrollY - lastScrollYRef.current) < 120) {
              ticking = false;
              return;
            }
          }
          lastScrollYRef.current = currentScrollY;

          const windowHeight = window.innerHeight;
          const containerRect = container.getBoundingClientRect();
          const cardElements = Array.from(container.children) as HTMLElement[];
          const totalItems = cardElements.length;

          if (totalItems === 0) {
            ticking = false;
            return;
          }

          // Trigger line around viewport center (eye level)
          const triggerLine = windowHeight * 0.5;

          // 1. Above the cards section (container top has not reached center line yet) -> close all
          if (containerRect.top > triggerLine) {
            if (activeOfferingIndexRef.current !== -1) {
              setActiveOfferingIndex(-1);
            }
            ticking = false;
            return;
          }

          // 2. Past the cards section (container bottom has scrolled well above center) -> close all
          if (containerRect.bottom < windowHeight * 0.15) {
            if (activeOfferingIndexRef.current !== -1) {
              setActiveOfferingIndex(-1);
            }
            ticking = false;
            return;
          }

          // 3. Determine which card should be open:
          // As the user scrolls down, each card whose top reaches triggerLine becomes active.
          let targetIndex = 0;
          for (let i = 0; i < totalItems; i++) {
            const cardRect = cardElements[i].getBoundingClientRect();
            if (cardRect.top <= triggerLine + 24) {
              targetIndex = i;
            } else {
              break;
            }
          }

          if (targetIndex !== activeOfferingIndexRef.current) {
            setActiveOfferingIndex(targetIndex);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [page.offerings.items.length]);

  const url = `${BASE_URL}/services/${page.slug}`;
  const caseStudies = page.caseStudies.map((s: string) => getProjectBySlug(s)).filter(Boolean);
  const solutions = page.solutions
    .map((s: string) => solutionsData.find((x: { slug: string }) => x.slug === s))
    .filter(Boolean) as { slug: string; title: string }[];
  const otherServices = servicePages.filter((p) => p.slug !== page.slug);
  const cityService = locationsData.services.find((s) => s.key === page.locationServiceKey);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.name,
      serviceType: page.name,
      description: page.seo.description,
      url,
      provider: {
        '@type': 'Organization',
        name: brand.name,
        url: BASE_URL,
        telephone: brand.phone_india,
        email: brand.email
      },
      areaServed: [{ '@type': 'Country', name: 'India' }, 'Worldwide'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: page.offerings.heading,
        itemListElement: page.offerings.items.map((i: { title: string; desc: string }) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: i.title, description: i.desc }
        }))
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((f: { q: string; a: string }) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: page.name, item: url }
      ]
    }
  ];

  return (
    <main className="bg-white text-zinc-950 selection:bg-[#C3F53C] selection:text-black relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── 1. ULTRA-MINIMAL AESTHETIC HERO (VIDEO IN TEXT & BUTTON) ────── */}
      <section className="relative w-full min-h-[75vh] sm:min-h-[82vh] lg:min-h-[88vh] flex flex-col items-center justify-center text-center bg-white overflow-hidden pt-28 sm:pt-32 pb-16 isolate select-none">
        
        {/* 1. Looping Ambient Video Playing in Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source src="/LLW_Credentials.mp4" type="video/mp4" />
        </video>

        {/* 2. Video-in-Text Mask Layer: White background with pure black text, screen-blended so video plays inside text */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 bg-white flex flex-col items-center justify-center mix-blend-screen pointer-events-none z-10 px-4 sm:px-6 lg:px-8"
        >
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-black tracking-[-0.035em] leading-[0.98] sm:leading-[0.92] max-w-5xl mx-auto text-balance uppercase text-center">
              {page.name}
            </h1>
            {/* Button spacer offset so vertical centering matches foreground */}
            <div className="mt-8 sm:mt-12 lg:mt-14 h-14 sm:h-16 opacity-0" />
          </div>
        </div>

        {/* 3. Aesthetic Minimal Background Elements (Overlaid onto White Stage) */}
        {/* Precision Concentric Architectural Hairline Rings */}
        <div 
          aria-hidden="true" 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[540px] h-[480px] sm:h-[540px] rounded-full border border-zinc-950/[0.045] pointer-events-none z-15" 
        />
        <div 
          aria-hidden="true" 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] sm:w-[860px] h-[760px] sm:h-[860px] rounded-full border border-zinc-950/[0.035] border-dashed pointer-events-none z-15" 
        />
        <div 
          aria-hidden="true" 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] sm:w-[1220px] h-[1100px] sm:h-[1220px] rounded-full border border-zinc-950/[0.02] pointer-events-none hidden sm:block z-15" 
        />

        {/* Fine Horizon Hairline Divider */}
        <div 
          aria-hidden="true" 
          className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent pointer-events-none z-15" 
        />

        {/* Minimalist Studio Crosshair Coordinate Markers */}
        <div aria-hidden="true" className="absolute top-10 sm:top-14 left-8 sm:left-14 font-mono text-[11px] text-zinc-300 pointer-events-none tracking-widest z-15">+</div>
        <div aria-hidden="true" className="absolute top-10 sm:top-14 right-8 sm:right-14 font-mono text-[11px] text-zinc-300 pointer-events-none tracking-widest z-15">+</div>
        <div aria-hidden="true" className="absolute bottom-10 sm:bottom-14 left-8 sm:left-14 font-mono text-[11px] text-zinc-300 pointer-events-none tracking-widest z-15">+</div>
        <div aria-hidden="true" className="absolute bottom-10 sm:bottom-14 right-8 sm:right-14 font-mono text-[11px] text-zinc-300 pointer-events-none tracking-widest z-15">+</div>

        {/* 4. Foreground Interactive Layer (Accessible Title & Button) */}
        <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pointer-events-none">
          {/* Transparent Title for Screen Readers and Spatial Alignment */}
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[-0.035em] leading-[0.98] sm:leading-[0.92] max-w-5xl mx-auto text-balance uppercase text-center opacity-0 select-none">
            {page.name}
          </h1>

          {/* Minimal Aesthetic Action Button */}
          <div className="mt-8 sm:mt-12 lg:mt-14 pointer-events-auto">
            <button
              type="button"
              onClick={openConsultModal}
              className="group relative inline-flex items-center gap-3.5 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-zinc-950 text-white text-sm sm:text-base font-medium tracking-tight shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.22)] hover:bg-black hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span>Start a Project</span>
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── CORE TECH STACK & ARCHITECTURE FAST-STRIP ────── */}
      {page.tech && page.tech.length > 0 && (
        <section className="bg-[#F6F2EB] border-y border-stone-200/80 py-5 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-600 font-bold flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#00BA55]" />
              <span>Core Tech Stack for {page.name}:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {page.tech.map((t: string) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-stone-800 bg-white border border-stone-200/90 px-3.5 py-1.5 rounded-full shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DE5D26]" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 2. EXPANDABLE HOVER ACCORDION SECTION (IMAGE 1 SPEC WITH 3D PYRAMID ART) ── */}
      <section id="modular-specializations" className="py-24 px-5 bg-white relative">
        <ArchitecturalGridPattern className="opacity-[0.03]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-mono font-bold uppercase tracking-widest mb-3">
              <Boxes className="w-3.5 h-3.5 text-zinc-900" />
              <span>Modular Specializations</span>
            </div>
            <h2 className={sectionTitle}>
              {page.offerings.heading}
            </h2>
            <p className={sectionSubtitle}>
              Scroll down to explore each discipline in detail, or select any module to expand its technical workflows and deliverables.
            </p>
          </div>

          {/* Scroll-Driven Expandable Accordion with Unique 3D Geometric Artwork per Module */}
          <div ref={cardsContainerRef} className="space-y-4">
            {page.offerings.items.map((item: { title: string; desc: string }, i: number) => {
              const isExpanded = activeOfferingIndex === i;
              const formattedNumber = String(i + 1).padStart(2, '0');
              const PatternComponent = getModulePattern(i);

              return (
                <div
                  key={item.title}
                  onClick={() => handleCardClick(i)}
                  style={{
                    transition:
                      'background-color 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className={`group cursor-pointer overflow-hidden relative rounded-[2rem] sm:rounded-[2.4rem] ${
                    isExpanded
                      ? 'bg-[#05060A] text-white shadow-2xl border border-zinc-800 ring-1 ring-white/10'
                      : 'bg-[#373940] hover:bg-[#3E4048] text-zinc-300 border border-zinc-700/60'
                  }`}
                >
                  <div className="p-6 sm:p-9 lg:p-11 relative z-10">
                    {/* Header Row: Title on Left, Number on Right (Exact User Reference Spec) */}
                    <div className="flex items-center justify-between w-full">
                      <h3
                        style={{
                          transition: 'color 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        className={`font-display font-medium text-xl sm:text-2xl lg:text-[28px] tracking-tight leading-snug ${
                          isExpanded
                            ? 'text-white'
                            : 'text-zinc-300 group-hover:text-white'
                        }`}
                      >
                        {item.title}
                      </h3>

                      <span
                        className={`font-mono text-sm sm:text-base font-medium shrink-0 ml-4 transition-colors duration-500 ${
                          isExpanded ? 'text-zinc-400' : 'text-zinc-400'
                        }`}
                      >
                        {formattedNumber}
                      </span>
                    </div>

                    {/* Silky-Smooth Responsive Collapsible Body */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0
                      }}
                      transition={{
                        height: {
                          duration: 0.65,
                          ease: [0.16, 1, 0.3, 1]
                        },
                        opacity: {
                          duration: 0.45,
                          ease: [0.16, 1, 0.3, 1],
                          delay: isExpanded ? 0.12 : 0
                        }
                      }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="pt-6 sm:pt-8 max-w-xl pr-4 relative z-20">
                        <p className="text-zinc-300 text-sm sm:text-base lg:text-base leading-relaxed font-normal mb-8">
                          {item.desc}
                        </p>

                        {/* Explore CTA with White Circle Arrow Button (Exact Image 2 Spec) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openConsultModal();
                          }}
                          className="inline-flex items-center gap-3 text-white font-medium text-sm sm:text-base group/explore cursor-pointer"
                        >
                          <span>Explore</span>
                          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover/explore:translate-x-0.5 group-hover/explore:-translate-y-0.5 shadow-md">
                            <ArrowUpRight className="w-4 h-4 text-black stroke-[2.2]" />
                          </span>
                        </button>
                      </div>
                    </motion.div>

                    {/* Distinct 3D Geometric Pattern Artwork Anchored at Bottom-Right (Exact Images 1 & 2 Spec) */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isExpanded ? 1 : 0.28,
                        scale: isExpanded ? 1 : 0.92,
                        y: isExpanded ? 0 : 30
                      }}
                      transition={{
                        duration: 0.65,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="absolute -right-4 sm:right-0 bottom-0 w-64 sm:w-80 lg:w-[440px] pointer-events-none select-none"
                    >
                      <PatternComponent className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. FULL-STACK CAPABILITIES & 3D SYSTEM ARCHITECTURE (WITH 5 SERVICE-PNG IMAGES) ── */}
      <section className="py-24 px-5 bg-zinc-50/60 border-t border-zinc-200/80 relative">
        <ArchitecturalGridPattern className="opacity-[0.025]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white text-zinc-800 text-[11px] font-mono font-bold uppercase tracking-widest mb-3 border border-zinc-200">
              <Cpu className="w-3.5 h-3.5 text-[#DE5D26]" />
              <span>Full-Stack Capabilities</span>
            </div>
            <h2 className={sectionTitle}>
              Production-grade engineering from UI to database
            </h2>
            <p className={sectionSubtitle}>
              Every system we engineer combines modern front-end ergonomics, scalable cloud backends, and multi-device synchronization built to scale with your business.
            </p>
          </div>

          <div className="space-y-12">
            {engineeringPillars.map((pillar, index) => {
              const isEven = index % 2 === 0;
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-zinc-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 group ${pillar.accentBorder}`}
                >
                  {/* Text Column */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-zinc-400">
                        [{pillar.stepNumber}]
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 shadow-2xs">
                        <IconComp className="w-3.5 h-3.5 text-zinc-700" />
                        <span>{pillar.tag}</span>
                      </span>
                      {pillar.chips.map((chip) => (
                        <span key={chip} className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-200/60 text-zinc-600">
                          {chip}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-950 tracking-tight leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
                      {pillar.desc}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      {pillar.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-sm text-zinc-800 font-medium">
                          <div className="w-5 h-5 rounded-md bg-zinc-950 text-[#C3F53C] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 3D Image Illustration Column with High-End Viewport Frame */}
                  <div className={`lg:col-span-5 flex justify-center items-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[420px] rounded-3xl bg-zinc-50/60 p-6 border border-zinc-200/90 shadow-sm flex flex-col items-center justify-between overflow-hidden group-hover:border-zinc-400 transition-all">
                      
                      {/* Top Viewport Header */}
                      <div className="w-full flex items-center justify-between pb-3 border-b border-zinc-200/70 relative z-20">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 group-hover:bg-red-400 transition-colors" />
                          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 group-hover:bg-amber-400 transition-colors" />
                          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 group-hover:bg-emerald-400 transition-colors" />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                          {pillar.topTerminal}
                        </span>
                      </div>

                      {/* Corner Precision Marks */}
                      <span className="absolute top-2 left-2 text-zinc-400 font-mono text-[9px] pointer-events-none">+</span>
                      <span className="absolute top-2 right-2 text-zinc-400 font-mono text-[9px] pointer-events-none">+</span>
                      <span className="absolute bottom-2 left-2 text-zinc-400 font-mono text-[9px] pointer-events-none">+</span>
                      <span className="absolute bottom-2 right-2 text-zinc-400 font-mono text-[9px] pointer-events-none">+</span>

                      {/* Ambient Halo behind 3D PNG */}
                      <div className={`absolute inset-0 bg-gradient-to-tr ${pillar.ambientGlow} blur-2xl pointer-events-none`} />

                      {/* Transparent 3D PNG Image */}
                      <div className="relative w-full h-full flex items-center justify-center py-4 my-auto">
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          width={600}
                          height={600}
                          className="w-full h-full object-contain relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                          priority={index < 2}
                        />
                      </div>

                      {/* Bottom Floating Spec Pill Badge */}
                      <div className="w-full pt-3 border-t border-zinc-200/70 flex items-center justify-between relative z-20 text-[11px] font-mono font-semibold text-zinc-600">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{pillar.metricBadge}</span>
                        </span>
                        <span className="text-zinc-400 text-[10px]">VERIFIED</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. SIGNATURE CURVED EDGE TRANSITION INTO AGILE STUDIO (IMAGE 2 SPEC) ── */}
      <div className="w-full bg-zinc-50/60 pt-10">
        <section id="agile-process" className="py-24 px-5 bg-[#09090B] text-white relative overflow-hidden rounded-t-[48px] sm:rounded-t-[64px] lg:rounded-t-[84px] shadow-[0_-20px_60px_rgba(0,0,0,0.12)]">
          {/* Dark Cyber Mesh Pattern */}
          <CyberMatrixPattern className="opacity-15 text-zinc-600" />
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C3F53C]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[#C3F53C] text-xs font-mono font-semibold tracking-wider uppercase mb-5">
                <Repeat className="w-3.5 h-3.5 text-[#C3F53C]" />
                <span>THE AGILE WAY • ZERO SURPRISE DELIVERY</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                How we work: Agile methodology & sprint framework
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
                We eliminate the risks of traditional waterfall agency contracts by building your product in rapid, transparent 2-week agile sprints. You get continuous visibility, weekly staging demos, and the flexibility to adapt priorities as your vision evolves.
              </p>
            </div>

            {/* Agile Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {agilePillars.map((p) => {
                const IconComp = p.icon;
                return (
                  <div
                    key={p.title}
                    className="p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800 hover:border-[#C3F53C]/40 hover:bg-zinc-900 transition-all duration-300 flex flex-col justify-between group backdrop-blur-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 text-[#C3F53C] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 px-2.5 py-1 rounded-full">
                          {p.badge}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-white mb-2.5 tracking-tight group-hover:text-[#C3F53C] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed font-light">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 14-Day Sprint Lifecycle Blueprint Timeline */}
            <div className="rounded-[2.5rem] bg-zinc-900/90 p-8 sm:p-12 lg:p-14 relative overflow-hidden border border-zinc-800 shadow-2xl backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-800">
                <div>
                  <span className="text-xs font-mono font-bold text-[#C3F53C] uppercase tracking-widest block mb-1">
                    Continuous Delivery Loop
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    The 14-Day Sprint Lifecycle
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-[#C3F53C] animate-pulse" />
                  <span>Velocity-Tracked • Live Staging • Clean IP</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-6 relative group hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-[#C3F53C] bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-800">DAYS 01–02</span>
                    <Kanban className="w-4 h-4 text-zinc-500" />
                  </div>
                  <h4 className="font-bold text-lg text-white mb-2">1. Sprint Planning</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">User stories groomed, acceptance criteria locked, story point commitments agreed.</p>
                  <div className="pt-3 border-t border-zinc-900 text-[11px] font-mono text-zinc-500">
                    OUTPUT: Locked Sprint Backlog
                  </div>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-6 relative group hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-[#C3F53C] bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-800">DAYS 03–10</span>
                    <Terminal className="w-4 h-4 text-zinc-500" />
                  </div>
                  <h4 className="font-bold text-lg text-white mb-2">2. Focused Build</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">Daily async standups, test-driven code execution, continuous integration to dev branches.</p>
                  <div className="pt-3 border-t border-zinc-900 text-[11px] font-mono text-zinc-500">
                    OUTPUT: Git Commits & Test Suites
                  </div>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-6 relative group hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-[#C3F53C] bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-800">DAYS 11–13</span>
                    <Globe className="w-4 h-4 text-zinc-500" />
                  </div>
                  <h4 className="font-bold text-lg text-white mb-2">3. Demo & QA</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">Live walkthrough on private staging URL, client feedback incorporated directly.</p>
                  <div className="pt-3 border-t border-zinc-900 text-[11px] font-mono text-zinc-500">
                    OUTPUT: Staging URL Validation
                  </div>
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-6 relative group hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-[#C3F53C] bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-800">DAY 14</span>
                    <Rocket className="w-4 h-4 text-zinc-500" />
                  </div>
                  <h4 className="font-bold text-lg text-white mb-2">4. Release & Retro</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">Milestone pushed to staging/production, sprint retrospective held, next sprint planned.</p>
                  <div className="pt-3 border-t border-zinc-900 text-[11px] font-mono text-zinc-500">
                    OUTPUT: Production Deploy & Retro
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── 5. SCATTERED-TO-ARRANGED TESTIMONIALS SECTION (IMAGES 3 & 4 SPEC) ── */}
      <div className="w-full bg-[#09090B] -mt-1 pt-8 sm:pt-12">
        <section 
          className="py-24 px-5 bg-white relative overflow-hidden rounded-t-[48px] sm:rounded-t-[64px] lg:rounded-t-[84px] shadow-[0_-25px_60px_rgba(0,0,0,0.25)]"
          onMouseEnter={() => setIsTestimonialsArranged(true)}
          onMouseLeave={() => setIsTestimonialsArranged(false)}
        >
          <ArchitecturalGridPattern className="opacity-[0.035]" />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Header Row with arrange toggle */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#DE5D26] mb-3 block">
                  Client Testimonials & Trust
                </span>
                <h2 className={sectionTitle}>
                  What founders and engineering leaders say
                </h2>
                <p className="text-zinc-600 text-base max-w-xl">
                  Hover anywhere over this area to watch the review cards arrange smoothly into an aligned grid.
                </p>
              </div>

              {/* Interactive Toggle indicator */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-zinc-50 text-xs font-mono font-semibold text-zinc-700 shrink-0 self-start sm:self-end">
                <span className={`w-2 h-2 rounded-full ${isTestimonialsArranged ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
                <span>{isTestimonialsArranged ? 'ALIGNED GRID ACTIVE' : 'HOVER TO ARRANGE CARDS'}</span>
              </div>
            </div>

            {/* Cards Grid: Scattered by default, Arranges on hover with smooth cubic-bezier */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
              {clientReviews.map((rev) => (
                <div
                  key={rev.id}
                  className={`${rev.bgClass} ${rev.borderClass} border rounded-3xl p-8 sm:p-9 shadow-md flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isTestimonialsArranged ? 'rotate-0 translate-x-0 translate-y-0 scale-100 shadow-xl' : rev.tiltClass
                  }`}
                >
                  <div>
                    {/* Quote Mark ❝ (as in Images 3 & 4) */}
                    <div className="text-3xl text-emerald-700/40 font-serif leading-none mb-4 select-none">
                      ❝
                    </div>
                    <p className="text-zinc-800 text-sm sm:text-base leading-relaxed font-normal mb-8">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-5 border-t border-zinc-200/60 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-zinc-950 font-display">{rev.author}</div>
                      <div className="text-xs text-zinc-500 font-mono">{rev.role}</div>
                    </div>
                    <div className="text-lg font-black text-zinc-900 tracking-tight font-display lowercase">
                      {rev.brand}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── 6. FULL PROCESS: HOW WE DO IT (6 PHASES) ────────────────── */}
      <section className="bg-zinc-50/60 py-24 border-t border-zinc-200/80 relative">
        <ArchitecturalGridPattern className="opacity-[0.035]" />

        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-zinc-200 text-zinc-800 text-[11px] font-mono font-bold uppercase tracking-widest mb-3">
              <Workflow className="w-3.5 h-3.5 text-zinc-900" />
              <span>Step-by-Step Delivery</span>
            </div>
            <h2 className={sectionTitle}>
              Our complete {page.name.toLowerCase()} process: How we do it
            </h2>
            <p className={sectionSubtitle}>
              From the initial architecture call to post-launch scaling, here is the exact 6-phase roadmap that ensures on-time, zero-defect delivery.
            </p>
          </div>

          {/* Visual Step Progress Tracker */}
          <div className="hidden lg:grid grid-cols-6 gap-3 mb-12 pb-6 border-b border-zinc-200/80">
            {fullProcessPhases.map((phase) => (
              <div key={phase.step} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-zinc-950 text-[#C3F53C] font-mono font-bold text-xs flex items-center justify-center">
                    {phase.step}
                  </span>
                  <div className="h-0.5 flex-1 bg-zinc-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-emerald-500 opacity-60" />
                  </div>
                </div>
                <span className="text-[11px] font-mono font-semibold text-zinc-500 uppercase truncate">
                  {phase.timeframe}
                </span>
                <span className="text-xs font-bold text-zinc-900 truncate">
                  {phase.phase.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>

          {/* 6-Phase Responsive Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {fullProcessPhases.map((phase) => {
              const PhaseIcon = phase.icon;
              return (
                <div
                  key={phase.step}
                  className="bg-white rounded-[2rem] sm:rounded-[2.2rem] p-7 sm:p-8 border border-zinc-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.09)] hover:border-zinc-950 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden hover:-translate-y-1.5"
                >
                  {/* Top Accent Gradient Line on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-950 via-[#C3F53C] to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Header with Step, Timeframe & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-2xl bg-zinc-950 text-[#C3F53C] font-mono font-bold text-lg flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                          {phase.step}
                        </span>
                        <span className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider border ${phase.badgeColor}`}>
                          {phase.timeframe}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-600 group-hover:text-black group-hover:bg-zinc-100 transition-colors">
                        <PhaseIcon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Phase Title */}
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight mb-3 leading-snug group-hover:text-black transition-colors">
                      {phase.phase}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-600 leading-relaxed font-normal mb-6">
                      {phase.description}
                    </p>

                    {/* Key Activities Checklist */}
                    <div className="space-y-2.5 pt-4 border-t border-zinc-100">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                        Key Sprint Activities
                      </span>
                      <ul className="space-y-2">
                        {phase.activities.map((act) => (
                          <li key={act} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800 font-medium leading-snug">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Deliverable Box (Pinned to Bottom of Card) */}
                  <div className="mt-6 pt-5 border-t border-zinc-100">
                    <div className="bg-zinc-50 group-hover:bg-zinc-100/70 rounded-2xl p-4 border border-zinc-200/80 transition-colors">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#DE5D26] block mb-1">
                        Phase Deliverable
                      </span>
                      <div className="text-xs sm:text-sm font-semibold text-zinc-950 leading-snug flex items-center gap-2">
                        <FileCode2 className="w-4 h-4 text-zinc-500 shrink-0" />
                        <span>{phase.deliverable}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. CUBERTO-STYLE "WHY TWOFLOWW" BENTO GRID (IMAGE 5 SPEC) ── */}
      <section className="max-w-6xl mx-auto px-5 py-24">
        {/* Top Header Row with Left Monospace Label & Right Editorial Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-14 items-start">
          <div className="lg:col-span-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-500 block">
              WHY TWOFLOWW
            </span>
          </div>
          <div className="lg:col-span-9">
            <p className="text-xl sm:text-2xl lg:text-3xl text-zinc-900 leading-snug font-normal tracking-tight">
              For over 6 years, we&apos;ve been helping startups, scale-ups and global companies transform ambitious ideas into successful digital products. Our work combines technical rigor with agile velocity, but what matters most to us is building long-term partnerships and delivering measurable business value.
            </p>
          </div>
        </div>

        {/* Top Bento Row: 3 Cards (Pastel Mint & Soft Gray) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Card 1: 6+ Years */}
          <div className="bg-[#E8F7F3] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between min-h-[230px] border border-emerald-100/70 shadow-xs">
            <Star className="w-8 h-8 text-zinc-800 stroke-[1.5]" />
            <div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-zinc-950 tracking-tight mb-2">
                6+
              </div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700">
                Years of Experience
              </div>
            </div>
          </div>

          {/* Card 2: Recognized Awards / Engineering */}
          <div className="bg-[#F3F4F6] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between min-h-[230px] border border-zinc-200/60 shadow-xs">
            <Trophy className="w-8 h-8 text-zinc-800 stroke-[1.5]" />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 leading-tight">
              Recognized for high-velocity agile delivery & clean code
            </h3>
          </div>

          {/* Card 3: 50+ Projects */}
          <div className="bg-[#E8F7F3] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between min-h-[230px] border border-emerald-100/70 shadow-xs">
            <Globe className="w-8 h-8 text-zinc-800 stroke-[1.5]" />
            <div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-zinc-950 tracking-tight mb-2">
                {brand.projects_delivered}
              </div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700">
                Projects Delivered Worldwide
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bento Row: 2 Wide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 4: Long-term partnerships */}
          <div className="bg-[#F3F4F6] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between min-h-[210px] border border-zinc-200/60 shadow-xs">
            <Briefcase className="w-8 h-8 text-zinc-800 stroke-[1.5]" />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 leading-tight">
              Long-term partnerships with startups & global brands across 10+ countries
            </h3>
          </div>

          {/* Card 5: In-house strategy, design & development */}
          <div className="bg-[#F3F4F6] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between min-h-[210px] border border-zinc-200/60 shadow-xs">
            <Repeat className="w-8 h-8 text-zinc-800 stroke-[1.5]" />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-950 leading-tight">
              Strategy, design & development – all in-house with direct engineer access
            </h3>
          </div>
        </div>
      </section>

      {/* ── 8. TECHNOLOGIES WE USE ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-24 border-t border-zinc-200/80">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 text-zinc-800 text-[11px] font-mono font-bold uppercase tracking-widest mb-3 border border-zinc-200">
            <Cpu className="w-3.5 h-3.5 text-zinc-900" />
            <span>Battle-Tested Stack</span>
          </div>
          <h2 className={sectionTitle}>Technologies & frameworks we use</h2>
          <p className={sectionSubtitle}>
            We choose proven, modern technologies that guarantee fast load times, long-term maintainability, and effortless hiring.
          </p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {page.tech.map((name: string) => (
            <li
              key={name}
              className="flex items-center gap-3.5 bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm hover:border-zinc-950 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <TechLogo name={name} className="w-5 h-5 object-contain" />
              </div>
              <span className="text-sm font-semibold text-zinc-950">{name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 9. COST & TRANSPARENT INVESTMENT FACTORS ─────────────────── */}
      <section className="bg-zinc-50/60 py-24 border-y border-zinc-200/80 relative">
        <ArchitecturalGridPattern className="opacity-[0.03]" />

        <div className="max-w-6xl mx-auto px-5 grid gap-10 lg:grid-cols-12 items-start relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#DE5D26] block">
              Transparent Pricing
            </span>
            <h2 className={sectionTitle}>{page.cost.heading}</h2>
            <div className="space-y-4 text-zinc-600 leading-relaxed text-base sm:text-lg">
              {page.cost.paragraphs.map((p: string) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={openConsultModal}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-zinc-950 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors cursor-pointer shadow-lg shadow-zinc-950/10"
              >
                <span>Request Custom Estimate</span>
                <ArrowRight className="w-4 h-4 text-[#C3F53C]" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm">
            <h3 className="font-display font-bold text-xl text-zinc-950 mb-5">
              Key factors that affect investment
            </h3>
            <ul className="space-y-3.5 text-sm text-zinc-700">
              {page.cost.factors.map((f: string) => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 10. CASE STUDIES / DELIVERED WORK ────────────────────────── */}
      {caseStudies.length > 0 && (
        <section className="bg-white py-24 border-b border-zinc-200/80 relative">
          <div className="max-w-6xl mx-auto px-5 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#DE5D26] mb-3 block">
                  Proven Track Record
                </span>
                <h2 className={sectionTitle}>Recent delivered projects</h2>
              </div>
              <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 hover:text-[#DE5D26] transition-colors">
                <span>View all case studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {caseStudies.map((p: { slug: string; title: string; description: string; category: string }) => (
                <Link
                  key={p.slug}
                  href={`/case-studies/${p.slug}`}
                  className="bg-zinc-50/70 rounded-3xl p-8 border border-zinc-200 shadow-sm hover:shadow-xl hover:border-zinc-950 transition-all duration-300 block group"
                >
                  <p className="text-xs uppercase tracking-wider font-mono font-semibold text-[#DE5D26] mb-3">
                    {p.category}
                  </p>
                  <h3 className="font-display font-bold text-xl text-zinc-950 mb-3 group-hover:text-[#DE5D26] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3 mb-6">
                    {p.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-950 group-hover:translate-x-1 transition-transform">
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 11. FREQUENTLY ASKED QUESTIONS ───────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 py-24">
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#DE5D26] mb-3 block">
            Got Questions?
          </span>
          <h2 className={sectionTitle}>Frequently asked questions</h2>
          <p className="text-zinc-600 text-base max-w-xl mx-auto">
            Everything you need to know about our sprints, timeline, code handoff, and support.
          </p>
        </div>

        <div className="divide-y divide-zinc-200 border-y border-zinc-200">
          {page.faqs.map((f: { q: string; a: string }, idx: number) => (
            <details key={f.q} className="group py-6">
              <summary className="flex justify-between items-center gap-4 cursor-pointer font-display font-semibold text-lg text-zinc-950 list-none hover:text-[#DE5D26] transition-colors">
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-400 font-normal">[{String(idx + 1).padStart(2, '0')}]</span>
                  <span>{f.q}</span>
                </span>
                <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 text-sm font-bold group-open:rotate-45 group-open:bg-zinc-950 group-open:text-[#C3F53C] transition-all shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-4 text-zinc-600 leading-relaxed text-base pr-8 pl-8">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 12. RELATED LINKS & SITEMAP ──────────────────────────────── */}
      <section className="bg-zinc-50/60 py-20 border-t border-zinc-200/80">
        <div className="max-w-6xl mx-auto px-5 grid gap-12 lg:grid-cols-3">
          <nav aria-label="Other services">
            <h3 className="font-display text-xl font-bold mb-5 text-zinc-950">Other services</h3>
            <ul className="space-y-2.5">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-zinc-600 hover:text-black hover:underline transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {solutions.length > 0 && (
            <nav aria-label="Industry solutions">
              <h3 className="font-display text-xl font-bold mb-5 text-zinc-950">Industry solutions</h3>
              <ul className="space-y-2.5">
                {solutions.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/solutions/${s.slug}`} className="text-sm text-zinc-600 hover:text-black hover:underline transition-colors">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {cityService && (
            <nav aria-label={`${cityService.label} by city`}>
              <h3 className="font-display text-xl font-bold mb-5 text-zinc-950">{cityService.label} by city</h3>
              <ul className="flex flex-wrap gap-2">
                {locationsData.locations.map((loc) => (
                  <li key={loc.slug}>
                    <Link
                      href={`/${cityService.key}-agency-in-${loc.slug}`}
                      className="inline-block text-xs px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:border-black transition-colors"
                    >
                      {loc.city ?? loc.country}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>

      {/* ── 13. HIGH-CONVERTING BOTTOM CTA WITH SIGNATURE CURVED EDGE (IMAGE 2 SPEC) ── */}
      <div className="w-full bg-zinc-50/60 pt-6">
        <section className="rounded-t-[48px] sm:rounded-t-[64px] lg:rounded-t-[84px] bg-zinc-950 text-white p-10 sm:p-14 lg:p-20 relative overflow-hidden shadow-2xl border-t border-zinc-800">
          <CyberMatrixPattern className="opacity-15 text-zinc-500" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C3F53C]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C3F53C] text-xs font-mono font-bold uppercase tracking-wider mb-6 border border-white/10">
              <Rocket className="w-3.5 h-3.5" />
              <span>Free Consultation & Wireframe</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.08]">
              Ready to build your {page.name.toLowerCase()} solution the agile way?
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg mb-10 leading-relaxed max-w-2xl font-light">
              Tell us about your project vision. We reply within 24 hours with a scope outline, timeline estimate, and free first wireframe — or email us at{' '}
              <a href={`mailto:${brand.email}`} className="text-[#C3F53C] underline font-medium">
                {brand.email}
              </a>.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openConsultModal}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#C3F53C] text-black font-bold text-base hover:bg-white transition-all hover:scale-[1.02] shadow-xl cursor-pointer"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-zinc-700 text-white font-semibold text-base hover:border-white hover:bg-white/5 transition-colors"
              >
                <span>Contact Page</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
