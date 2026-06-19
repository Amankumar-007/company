'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ArrowRight, Lock } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  // Memoize supabase client to prevent new auth listener registrations on each render
  const supabaseRef = useRef(createClient())
  const supabase = supabaseRef.current

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f2f1ec] absolute inset-0 z-[100] px-4 font-sans">
      <div className="w-full max-w-[420px] p-10 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-neutral-100">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
             <Lock className="w-8 h-8 text-[#c2410c]" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 font-space-grotesk tracking-tight">Admin Access</h2>
          <p className="mt-2 text-sm text-neutral-500 font-medium">Please sign in to continue</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-2">Email address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent transition-all duration-200"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent transition-all duration-200"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 font-medium text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group w-full flex justify-center items-center gap-2 px-4 py-3.5 text-white bg-[#ea580c] rounded-xl hover:bg-[#c2410c] focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:ring-offset-2 disabled:opacity-50 transition-all duration-300 font-semibold shadow-lg shadow-orange-500/30"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </div>
    </div>
  )
}
