'use client'

import { useEffect } from 'react'

/**
 * Suppresses browser-extension runtime errors that flood the console.
 * These errors come from Chrome extensions (e.g. Stylish, StyleBot, auth extensions)
 * whose background service workers go to sleep, causing "Could not establish connection.
 * Receiving end does not exist." messages — they are NOT from your app code.
 */
export default function ExtensionErrorSuppressor() {
  useEffect(() => {
    // Suppress unhandled promise rejections caused by extension messaging
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const msg = event?.reason?.message ?? ''
      if (
        msg.includes('Could not establish connection') ||
        msg.includes('Receiving end does not exist') ||
        msg.includes('Extension context invalidated')
      ) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    }

    // Suppress console.error noise from extension content scripts
    const originalConsoleError = console.error
    console.error = (...args: unknown[]) => {
      const msg = args.join(' ')
      if (
        msg.includes('Could not establish connection') ||
        msg.includes('Receiving end does not exist') ||
        msg.includes('Extension context invalidated') ||
        msg.includes('applyMatchedStylesToDom') ||
        msg.includes('GET_DOMAIN_STYLES_TO_INJECT')
      ) {
        return // swallow silently
      }
      originalConsoleError(...args)
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      console.error = originalConsoleError
    }
  }, [])

  return null
}
