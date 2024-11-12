'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoadingBar() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsLoading(true)
    setProgress(10)
    
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 90) {
          clearInterval(interval);
          return 90;
        }
        return oldProgress + 10;
      })
    }, 50)

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 200);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    }
  }, [pathname, searchParams])

  if (!isLoading) return null;

  return (
    <div 
      className="loading-bar" 
      style={{ 
        width: `${progress}%`,
      }} 
    />
  )
} 