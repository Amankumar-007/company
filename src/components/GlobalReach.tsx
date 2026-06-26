'use client';

import { motion } from 'framer-motion';
import { openConsultModal } from '@/components/ConsultModal';

interface Props {
  lightTheme?: boolean;
}

export default function GlobalReach({ lightTheme = true }: Props) {
  // Theme styling states based on props
  const bg = lightTheme ? 'bg-white' : 'bg-[#050505]';
  const text = lightTheme ? 'text-[#111827]' : 'text-white';
  const subText = lightTheme ? 'text-gray-600' : 'text-gray-400';
  const gridColor = lightTheme ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.03)';
  const mapDotColor = lightTheme ? '#E5E7EB' : '#1F2937';
  const arcColor = lightTheme ? '#9CA3AF' : '#4B5563';
  const tickerText = lightTheme ? 'text-gray-300' : 'text-zinc-800';

  // Footer country shorthand list
  const locations = ['IND', 'AUS', 'USA', 'DXB', 'UAE', 'IRAQ', 'NRA'];

  return (
    <section className={`${bg} relative overflow-hidden pt-20 pb-12 px-6 md:px-12 w-full font-sans transition-colors duration-300`}>

      {/* ── Background Grid Overlay ─────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: ` 1px, transparent 1px), linear-gradient(to right, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px]">

        {/* ── Left Content Block ──────────────────────────── */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-4xl md:text-5xl font-bold tracking-tight mb-6 ${text} leading-[1.15]`}
          >
            Delivering Digital <br />
            Solutions Across <br />
            the Globe
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${subText} text-base md:text-lg mb-8 max-w-md leading-relaxed`}
          >
            We proudly serve clients globally with advanced digital solutions –
            no matter whether you are a startup or an established enterprise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <button onClick={openConsultModal} className="bg-[#EF5A24] hover:bg-[#d94f1c] text-white font-medium px-7 py-3.5 rounded-full shadow-lg shadow-orange-500/10 transition-all duration-200 active:scale-95">
              Request a Free Quote
            </button>
          </motion.div>
        </div>

        {/* ── Right Content Block (Globe Map + Arc Overlay) ── */}
        <div className="lg:col-span-7 flex items-center justify-center">
          {/*
            Key fix: wrap img + SVG in a position:relative box with the same
            intrinsic aspect ratio as the SVG file (3501 × 2501 ≈ 1.4:1).
            Both children are stretched to fill this box exactly, so the
            overlay SVG coordinate system matches the image pixel-for-pixel.
          */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full max-w-[820px]"
            style={{ aspectRatio: '3501 / 2501' }}
          >
            {/* Base map image */}
            <img
              src="/vecteezy_globe-map-icon-with-black-color_7941182.svg"
              alt="Global Reach Map"
              className="absolute inset-0 w-full h-full object-contain select-none"
              style={{
                filter: lightTheme
                  ? 'brightness(0) drop-shadow(0 16px 32px rgba(0,0,0,0.14))'
                  : 'brightness(0) invert(1) opacity(0.75)',
              }}
            />

            {/* Arc + Pin overlay — same viewBox as the image */}
            <svg
              viewBox="0 0 3501 2501"
              className="absolute inset-0 w-full h-full overflow-visible"
              style={{ pointerEvents: 'none' }}
            >
              {/*
                Pin is placed on India (≈ x:2080 y:1260 in the 3501×2501 space).
                Arcs fan out from representative world cities toward India.
              */}

              {/* ── Flight arcs ─────────────────────────── */}
              <g
                fill="none"
                stroke={lightTheme ? '#111827' : '#e5e7eb'}
                strokeWidth="6"
                strokeLinecap="round"
              >
                {[
                  // New York  → India
                  { id: 'ny',  d: 'M 520,900  Q 1200,300  2080,1260' },
                  // London    → India
                  { id: 'lon', d: 'M 1450,680 Q 1700,500  2080,1260' },
                  // Sydney    → India
                  { id: 'syd', d: 'M 2900,1900 Q 2600,1400 2080,1260' },
                  // Tokyo     → India
                  { id: 'tok', d: 'M 2950,880 Q 2600,900  2080,1260' },
                  // Dubai     → India (short arc)
                  { id: 'dxb', d: 'M 1820,1100 Q 1950,1080 2080,1260' },
                ].map((arc, i) => (
                  <motion.path
                    key={arc.id}
                    d={arc.d}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.7 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: 'easeInOut', delay: i * 0.15 + 0.2 }}
                  />
                ))}
              </g>

              {/* ── Small origin dots at arc starts ─────── */}
              {[
                [520,  900],
                [1450, 680],
                [2900, 1900],
                [2950, 880],
                [1820, 1100],
              ].map(([cx, cy], i) => (
                <motion.circle
                  key={i}
                  cx={cx} cy={cy} r="14"
                  fill="#EF5A24"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 0.9, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.8 }}
                />
              ))}

              {/* ── India Hub pin ────────────────────────── */}
              <g transform="translate(2080, 1260)">
                {/* Pulse ring */}
                <circle r="30" fill="#EF5A24" opacity="0">
                  <animate attributeName="r"       values="20;80;20" dur="2.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite" />
                </circle>

                {/* Pin body — classic teardrop */}
                <motion.g
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 1.2, type: 'spring', stiffness: 180 }}
                >
                  <path
                    d="M0,0 C-40,-56 -60,-88 -60,-120
                       C-60,-153 -33,-180 0,-180
                       C33,-180   60,-153  60,-120
                       C60,-88    40,-56   0,0 Z"
                    fill="#EF5A24"
                    stroke={lightTheme ? '#ffffff' : '#111827'}
                    strokeWidth="8"
                  />
                  {/* Inner hole */}
                  <circle cx="0" cy="-120" r="32"
                    fill={lightTheme ? '#ffffff' : '#111827'}
                  />
                  <circle cx="0" cy="-120" r="12" fill="#EF5A24" />
                </motion.g>
              </g>
            </svg>
          </motion.div>
        </div>

      </div>

      {/* ── Bottom Track / Background Location Label Text ── */}
      <div className="w-full mt-12 md:mt-6 border-t border-gray-200/40 pt-8 flex flex-wrap justify-between items-center gap-6 select-none px-4">
        {locations.map((loc, index) => (
          <span
            key={index}
            className={`text-4xl md:text-5xl font-black tracking-wider ${tickerText} transition-colors duration-300`}
            style={{ fontFamily: 'monospace' }}
          >
            {loc}
          </span>
        ))}
      </div>

    </section>
  );
}