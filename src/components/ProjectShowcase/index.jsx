'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, Layers, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ProjectShowcase({ project }) {
  const [viewMode, setViewMode] = useState('dual'); // 'dual' | 'desktop' | 'mobile'

  const desktopImg = project.desktopImage || project.image || project.screenshots?.[0]?.url;
  const mobileImg = project.mobileImage || project.screenshots?.[1]?.url || project.screenshots?.[0]?.url;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 my-6 sm:my-8">
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-gray-50 border border-gray-200 p-2.5 sm:p-3 rounded-2xl shadow-sm">
        {/* Domain Badge & Status */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-mono text-gray-800 font-semibold shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="truncate">{project.domain || project.liveLink?.replace('https://', '').replace('/', '') || project.title}</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Project</span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-gray-200/70 p-1 rounded-xl space-x-1 w-full sm:w-auto justify-center">
          <button
            onClick={() => setViewMode('dual')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === 'dual'
              ? 'bg-black text-white shadow-sm'
              : 'text-gray-600 hover:text-black hover:bg-white/50'
              }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Dual View</span>
          </button>

          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === 'desktop'
              ? 'bg-black text-white shadow-sm'
              : 'text-gray-600 hover:text-black hover:bg-white/50'
              }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>

          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${viewMode === 'mobile'
              ? 'bg-black text-white shadow-sm'
              : 'text-gray-600 hover:text-black hover:bg-white/50'
              }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Live Site Link */}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center space-x-2 bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md hover:scale-105"
          >
            <span>Visit Live Platform</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Main Showcase Area - No Thick Black Outer Frame */}
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          {/* DUAL VIEW */}
          {viewMode === 'dual' && (
            <motion.div
              key="dual"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="relative w-full"
            >
              {/* Desktop Browser Window */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-950 border border-gray-200 shadow-2xl">
                {/* Browser bar */}
                <div className="h-9 bg-neutral-900 border-b border-neutral-800 px-4 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex items-center space-x-2 bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700/60 text-xs text-neutral-300 font-mono">
                    <span className="text-emerald-400">🔒</span>
                    <span>{project.domain || project.title}</span>
                  </div>
                  <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Desktop View
                  </div>
                </div>

                {/* Desktop Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-950">
                  {desktopImg && (
                    <Image
                      src={desktopImg}
                      alt={`${project.title} Desktop View`}
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 1400px) 100vw, 1400px"
                    />
                  )}
                </div>
              </div>

              {/* Floating Mobile Phone Frame */}
              {mobileImg && (
                <motion.div
                  initial={{ opacity: 0, y: 25, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="absolute right-3 sm:right-6 md:right-10 -bottom-4 sm:bottom-4 md:bottom-6 w-[30%] sm:w-[24%] md:w-[20%] max-w-[240px] min-w-[110px] aspect-[9/19] rounded-[1.4rem] sm:rounded-[2rem] p-[3.5px] sm:p-[5px] bg-neutral-900 border-[2.5px] sm:border-[3.5px] border-neutral-700 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-20"
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-2 sm:h-2.5 bg-black rounded-full z-30 flex items-center justify-end px-1">
                    <div className="w-1 h-1 rounded-full bg-[#1a1a2e]" />
                  </div>

                  {/* Phone Screen */}
                  <div className="relative w-full h-full rounded-[1.1rem] sm:rounded-[1.6rem] overflow-hidden bg-black">
                    <Image
                      src={mobileImg}
                      alt={`${project.title} Mobile View`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 40vw, 25vw"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* DESKTOP ONLY VIEW */}
          {viewMode === 'desktop' && (
            <motion.div
              key="desktop"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <div className="rounded-2xl overflow-hidden bg-neutral-950 border border-gray-200 shadow-2xl">
                <div className="h-9 bg-neutral-900 border-b border-neutral-800 px-4 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex items-center space-x-2 bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700/60 text-xs text-neutral-300 font-mono">
                    <span className="text-emerald-400">🔒</span>
                    <span>{project.domain || project.title}</span>
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">Desktop Viewport</span>
                </div>
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-950">
                  {desktopImg && (
                    <Image
                      src={desktopImg}
                      alt={`${project.title} Desktop View Full`}
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 1400px) 100vw, 1400px"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* MOBILE ONLY VIEW */}
          {viewMode === 'mobile' && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="flex items-center justify-center py-4"
            >
              <div className="w-[280px] sm:w-[320px] md:w-[360px] aspect-[9/19] rounded-[2.2rem] p-[6px] bg-neutral-900 border-[4px] border-neutral-700 shadow-[0_30px_70px_rgba(0,0,0,0.6)] relative">
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-30 flex items-center justify-end px-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a2e]" />
                </div>

                {/* Phone Screen */}
                <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-black">
                  {mobileImg && (
                    <Image
                      src={mobileImg}
                      alt={`${project.title} Mobile View Full`}
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="400px"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Live Site Button (displayed on small screens) */}
      {project.liveLink && (
        <div className="sm:hidden mt-6 text-center">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 bg-black text-white w-full py-3 rounded-xl text-sm font-bold shadow-lg"
          >
            <span>Visit {project.domain || project.title}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
}
