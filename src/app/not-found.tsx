import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: '404 – Page Not Found | Twofloww' },
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ea580c]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* 404 */}
        <p
          className="text-[9rem] sm:text-[14rem] leading-none font-black select-none"
          style={{
            fontFamily: 'var(--font-unbounded)',
            WebkitTextStroke: '1.5px rgba(255,255,255,0.08)',
            color: 'transparent',
          }}
        >
          404
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 justify-center -mt-4 mb-8">
          <div className="h-px w-12 bg-neutral-700" />
          <div className="w-2 h-2 rounded-full bg-[#ea580c]" />
          <div className="h-px w-12 bg-neutral-700" />
        </div>

        {/* Heading */}
        <h1
          className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Page not found
        </h1>

        {/* Subtext */}
        <p className="text-neutral-500 text-base mb-10 leading-relaxed">
          This page doesn&apos;t exist or was removed.
          <br />
          Let&apos;s get you back on track.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-orange-600/20 group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform group-hover:-translate-x-0.5 transition-transform duration-300"
          >
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  )
}
