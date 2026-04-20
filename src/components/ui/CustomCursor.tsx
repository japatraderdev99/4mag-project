'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 650 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    setMounted(true)

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 14)
      cursorY.set(e.clientY - 14)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      // Guard: e.target may be a text node or SVG node — check it's an Element
      if (e.target instanceof Element && e.target.closest('[data-cursor-magnetic]')) {
        setIsHovered(true)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('[data-cursor-magnetic]')) {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          backgroundColor: 'var(--paper)',
          mixBlendMode: 'difference',
        }}
        animate={{ scale: isHovered ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      />
      <style jsx global>{`
        @media (pointer: coarse) { body { cursor: auto !important; } }
      `}</style>
    </>
  )
}
