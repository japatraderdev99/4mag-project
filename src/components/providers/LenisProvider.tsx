'use client'

import { ReactLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import gsap from 'gsap'

interface LenisProviderProps {
  children: React.ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    function update(time: number) {
      gsap.ticker.add(update)
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1,
        duration: 1.2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}