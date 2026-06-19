'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, MessageSquare, LogOut, ArrowLeft, Users } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import Image from 'next/image'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  // Memoize supabase client to prevent new auth listeners being registered on every render
  const supabaseRef = useRef(createClient())
  const supabase = supabaseRef.current

  if (pathname === '/admin/auth/login') {
    return <div className="min-h-screen bg-[#f2f1ec] flex items-center justify-center">{children}</div>
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
      name: 'Authors',
      href: '/admin/authors',
      icon: Users,
      active: pathname?.startsWith('/admin/authors')
    },
    {
      name: 'Submissions',
      href: '/admin/submissions',
      icon: MessageSquare,
      active: pathname?.startsWith('/admin/submissions')
    }
  ]

  return (
    <div className="flex h-screen bg-[#fafafa] z-50 fixed inset-0 overflow-hidden text-neutral-900 font-sans">
      {/* Sidebar */}
      <div className="w-[280px] bg-white border-r border-neutral-100 flex flex-col justify-between shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div>
          {/* Sidebar Header */}
          <div className="p-8 pb-6">
            <Link href="/admin" className="flex items-center gap-3">
              <Image src="/brandlogo.png" alt="flowW Logo" width={40} height={40} className="rounded-lg object-contain" />
              <span className="font-space-grotesk text-2xl font-bold tracking-tight text-neutral-900">
                flow<span className="text-[#ea580c]">W</span> <span className="font-medium text-neutral-400 text-lg">admin</span>
              </span>
            </Link>
          </div>
          
          {/* Main Navigation */}
          <nav className="px-5 space-y-2 mt-4">
            <span className="px-4 text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-4">Management</span>
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                    item.active
                      ? 'bg-[#ea580c] text-white shadow-[0_8px_16px_rgba(234,88,12,0.2)]'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-orange-50/50'
                  }`}
                >
                  <Icon size={20} className={`transition-transform duration-300 ${item.active ? 'text-white' : 'text-neutral-400 group-hover:scale-110 group-hover:text-[#ea580c]'}`} />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-5 space-y-2">
          <Link
            href="/"
            className="flex w-full items-center space-x-3.5 px-4 py-3.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-2xl transition-all duration-300 text-sm font-medium group"
          >
            <ArrowLeft size={20} className="text-neutral-400 group-hover:text-neutral-900 transition-colors" />
            <span>Go to Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3.5 px-4 py-3.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all duration-300 text-sm font-medium group"
          >
            <LogOut size={20} className="text-red-400 group-hover:text-red-500 transition-colors" />
            <span>Logout Account</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto flex flex-col bg-[#fafafa]">
        <main className="p-8 md:p-12 max-w-7xl w-full mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
