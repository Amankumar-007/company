'use client';
import React from 'react';
import Image from 'next/image';

const ProjectDeviceThumbnail = ({
  desktopImage,
  mobileImage,
  title,
  domain = '',
  isHovered = false,
  className = '',
  priority = false,
}) => {
  return (
    <div className={`relative w-full h-full select-none rounded-2xl overflow-hidden border border-gray-200 bg-neutral-950 shadow-md group ${className}`}>
      {/* Desktop Browser Window - Full Container */}
      <div className="relative w-full h-full flex flex-col">
        {/* Browser Top Navigation Bar */}
        <div className="h-8 sm:h-9 bg-neutral-900 border-b border-neutral-800 px-3.5 flex items-center justify-between z-10 flex-shrink-0">
          {/* macOS window control buttons */}
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>

          {/* Browser Address Bar */}
          {domain && (
            <div className="flex items-center space-x-1.5 bg-neutral-800/90 px-3 py-0.5 rounded-full border border-neutral-700/60 text-[11px] text-neutral-300 font-mono tracking-tight max-w-[220px] truncate">
              <svg className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{domain}</span>
            </div>
          )}

          {/* View Indicator */}
          <div className="flex items-center space-x-1 text-[10px] uppercase tracking-wider text-neutral-400 font-bold">
            <span className="hidden sm:inline">Live Preview</span>
          </div>
        </div>

        {/* Desktop Image Viewport */}
        <div className="relative w-full flex-1 overflow-hidden bg-neutral-950">
          {desktopImage && (
            <Image
              src={desktopImage}
              alt={`${title} desktop view`}
              fill
              priority={priority}
              className={`object-cover object-top transition-transform duration-700 ease-out ${isHovered ? 'scale-[1.03]' : 'scale-100'
                }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
          )}
        </div>
      </div>

      {/* Floating Mobile Smartphone Frame - Clean & Independent */}
      {mobileImage && (
        <div
          className={`absolute right-3 sm:right-5 bottom-3 sm:bottom-4 w-[28%] sm:w-[26%] aspect-[9/18.5] max-w-[140px] min-w-[85px] rounded-[1.25rem] sm:rounded-[1.6rem] p-[3px] sm:p-[4px] bg-neutral-900 border-[2.5px] sm:border-[3px] border-neutral-700 shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out z-20 ${isHovered ? '-translate-y-2 -rotate-1 scale-[1.04] shadow-[0_20px_45px_rgba(0,0,0,0.95)] border-neutral-500' : 'translate-y-0 rotate-0 scale-100'
            }`}
        >
          {/* Phone Dynamic Island */}
          <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-1.5 sm:h-2 bg-black rounded-full z-30 flex items-center justify-end px-1">
            <div className="w-1 h-1 rounded-full bg-[#1a1a2e]" />
          </div>

          {/* Phone Screen Container */}
          <div className="relative w-full h-full rounded-[1rem] sm:rounded-[1.3rem] overflow-hidden bg-black">
            <Image
              src={mobileImage}
              alt={`${title} mobile view`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 35vw, 15vw"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProjectDeviceThumbnail);
