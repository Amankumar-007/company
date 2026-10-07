'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-0 sm:min-h-[90vh] -mb-6 sm:-mb-[25vh] flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center px-5 sm:px-5 lg:px-7 pt-32 sm:pt-36 pb-20 sm:pb-[32vh]"
    >
      <Image
        src="/hero1.png"
        alt="Twofloww Digital Excellence"
        fill
        priority
        className="object-cover object-center -z-10"
      />
      {/* Gradient overlay to blend bottom into white background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-[40vh] bg-gradient-to-b from-transparent via-white/50 to-white z-0 pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto text-left sm:text-center relative z-10">
        {/* Main Heading */}
        <h1 className="text-left sm:text-center text-[2.35rem] xs:text-[2.75rem] sm:text-[2.6rem] lg:text-[3.0rem] xl:text-[3.8rem] font-bold text-white leading-[1.08] sm:leading-tight mb-5 sm:mb-8 tracking-[-0.03em] sm:tracking-tight max-w-[340px] xs:max-w-md sm:max-w-none">
          <div className="overflow-hidden pb-1 -mb-1">
            <span className="hero-line block sm:inline">Building Digital</span>{' '}
            <span className="hero-line [animation-delay:0.12s] block sm:inline">Excellence</span>
          </div>
          <div className="overflow-hidden pb-1 -mb-1">
            <span className="hero-line [animation-delay:0.24s]">
              the <span className="border-b-4 border-orange-500 pb-1">Agile</span> Way
            </span>
          </div>
        </h1>

        {/* Subtitle */}
        <p className="hero-fade [animation-delay:0.45s] text-left sm:text-center text-[1.05rem] xs:text-[1.125rem] sm:text-xl lg:text-2xl text-white/85 sm:text-gray-200 max-w-[330px] xs:max-w-md sm:max-w-4xl mr-auto ml-0 sm:mx-auto leading-[1.55] sm:leading-relaxed mb-8 sm:mb-12 font-normal sm:font-light">
          We use agile methodology to build exceptional websites.
          <span className="block mt-2">Get your <span className="font-semibold border-b-2 border-orange-500 pb-0.5 text-white">free</span> first wireframe - let&apos;s create something amazing together.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row flex-wrap sm:flex-row gap-4 sm:gap-10 justify-start sm:justify-center items-center mt-3 sm:mt-4">
          <Link
            href="/contact"
            className="hero-fade [animation-delay:0.6s] relative overflow-hidden px-6 py-3 sm:px-7 sm:py-3.5 bg-black border border-black text-white rounded-full transition-all duration-300 hover:border-[#4169E1] group"
          >
            <div className="absolute inset-0 bg-[#4169E1] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <span className="relative z-10 font-medium text-sm sm:text-base">
              Start Your Project
            </span>
          </Link>
          <Link
            href="/projects"
            className="hero-fade [animation-delay:0.7s] group relative pb-1 text-white font-medium transition-all duration-300"
          >
            <span className="group-hover:text-gray-300 transition-colors duration-300 uppercase tracking-widest text-xs sm:text-sm">
              View Our Work
            </span>
            {/* Aesthetic animated black line on the bottom */}
            <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-black group-hover:w-full transition-all duration-500 ease-out"></span>
          </Link>
        </div>

        {/* Decorative Elements – static, no infinite animations */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-10 pointer-events-none"></div>
        <div className="absolute top-1/2 right-20 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 pointer-events-none"></div>

      </div>
    </section>
  );
}