'use client'

import { motion } from 'motion/react'

interface SectionTransitionProps {
  variant?: 'diagonal' | 'wave' | 'geometric' | 'fade'
  color?: 'red' | 'paper' | 'ink'
  direction?: 'up' | 'down'
}

export default function SectionTransition({ 
  variant = 'diagonal', 
  color = 'red',
  direction = 'down'
}: SectionTransitionProps) {
  const colorMap = {
    red: '#C8001E',
    paper: '#F0EBE0',
    ink: '#0D0D0D'
  }

  const selectedColor = colorMap[color]

  if (variant === 'diagonal') {
    return (
      <div className={`relative h-24 overflow-hidden ${direction === 'up' ? 'rotate-180' : ''}`}>
        <motion.div
          className="absolute inset-0 transform origin-left"
          style={{ backgroundColor: selectedColor }}
          initial={{ scaleX: 0, skewY: -2 }}
          whileInView={{ scaleX: 1, skewY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute inset-0 transform origin-right"
          style={{ backgroundColor: `${selectedColor}80` }}
          initial={{ scaleX: 0, skewY: 2 }}
          whileInView={{ scaleX: 1, skewY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
    )
  }

  if (variant === 'geometric') {
    return (
      <div className="relative h-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-8 gap-2 w-full max-w-4xl">
            {Array.from({ length: 24 }).map((_, index) => (
              <motion.div
                key={index}
                className="h-1"
                style={{ backgroundColor: selectedColor }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: "easeOut" 
                }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  if (variant === 'wave') {
    return (
      <div className="relative h-20 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
            fill={selectedColor}
            initial={{ pathLength: 0, fillOpacity: 0 }}
            whileInView={{ pathLength: 1, fillOpacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
        </svg>
      </div>
    )
  }

  // fade variant
  return (
    <motion.div
      className="h-16"
      style={{ 
        background: `linear-gradient(to bottom, transparent, ${selectedColor}20, transparent)`
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    />
  )
}