'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, MessageSquare, LogOut, ArrowLeft } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  if (pathname === '/admin/auth/login') {
    return <div className="min-h-screen bg-neutral-950 flex items-center justify-center">{children}</div>
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/auth/login')
  }

  const menuItems = [
    {
      name: 'Overview',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin'
    },
    {
      name: 'Blogs',
      href: '/admin/blogs',
      icon: FileText,
      active: pathname?.startsWith('/admin/blogs')
    },
    {
      name: 'Submissions',
      href: '/admin/submissions',
      icon: MessageSquare,
      active: pathname?.startsWith('/admin/submissions')
    }
  ]

  return (
    <div className="flex h-screen bg-zinc-50 z-50 fixed inset-0 overflow-hidden text-neutral-900 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-zinc-800">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#7ED348] flex items-center justify-center font-bold text-black text-lg font-space-grotesk shadow-[0_0_15px_rgba(126,211,72,0.3)]">
                F
              </div>
              <span className="font-space-grotesk text-xl font-bold tracking-tight text-white">
                flow<span className="text-[#7ED348]">W</span> admin
              </span>
            </Link>
          </div>
          
          {/* Main Navigation */}
          <nav className="p-4 space-y-1.5">
            <span className="px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-3">Management</span>
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    item.active
                      ? 'bg-[#7ED348]/10 text-[#7ED348] font-medium shadow-[inset_0_0_0_1px_rgba(126,211,72,0.15)]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Icon size={18} className={`transition-transform duration-200 ${item.active ? 'text-[#7ED348]' : 'text-zinc-400 group-hover:scale-105 group-hover:text-white'}`} />
                  <span className="text-sm">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link
            href="/"
            className="flex w-full items-center space-x-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors text-sm"
          >
            <ArrowLeft size={18} />
            <span>Go to Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all duration-200 text-sm font-medium"
          >
            <LogOut size={18} />
            <span>Logout Account</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto flex flex-col bg-zinc-50">
        <main className="p-8 max-w-6xl w-full mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
