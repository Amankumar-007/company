import NotFoundContent from '@/components/NotFoundContent'
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
  return <NotFoundContent />
}
