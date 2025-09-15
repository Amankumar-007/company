import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'
import Header from '../components/Header';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['500'],
  variable: '--font-space-grotesk' 
})

export const metadata = {
  title: 'Digital Agency - Excellence in Web Development',
  description: 'World-class digital agency delivering exceptional web experiences and innovative solutions.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${spaceGrotesk.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
