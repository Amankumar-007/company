import { ScrollProvider } from '@/context/ScrollContext'

export default function App({ Component, pageProps }) {
  return (
    <ScrollProvider>
      <Component {...pageProps} />
    </ScrollProvider>
  )
}
