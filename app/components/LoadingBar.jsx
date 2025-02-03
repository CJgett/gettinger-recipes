'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function LoadingBar() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const startTime = Date.now()
    setIsLoading(true)
    setProgress(10)
    
    // Track real resources
    const resources = Array.from(document.querySelectorAll('img, script, link[rel="stylesheet"]'))
    let loadedCount = 0;
    
    resources.forEach(resource => {
      if (resource.complete) {
        loadedCount++
      } else {
        resource.addEventListener('load', () => {
          loadedCount++
          // * 80: Scales percentage to range 0-80, + 10: Offsets range to 10-90
          // Initial state starts at 10%, Final state reaches 90%
          // Leaves room for animation completion to 100%
          const realProgress = (loadedCount / resources.length) * 80 + 10
          setProgress(realProgress)
          // once: true auto removes the event listener after it's fired once
        }, { once: true })
      }
    })

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      if (elapsed >= 500) {
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => {
          setIsLoading(false)
          setProgress(0)
        }, 200)
      }
    }, 50)

    return () => {
      clearInterval(interval)
    }
  }, [pathname])

  if (!isLoading) return null

  return (
    <div 
      className="loading-bar" 
      style={{ width: `${progress}%` }} 
    />
  )
}