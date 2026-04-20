'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    
    // Set initial states
    gsap.set(contentRef.current, { opacity: 0, y: 30 })

    const matchMedia = gsap.matchMedia()

    matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      })
    })

    matchMedia.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(contentRef.current, { opacity: 1, y: 0 })
    })

    return () => {
      tl.kill()
      matchMedia.revert()
    }
  }, [])

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen bg-ink text-paper relative flex items-center justify-center"
      style={{ opacity }}
    >
      {/* Clean Background with Single Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hash-art-exposition.png"
          alt="4MAG - Hash Art Exposition"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70" />
      </div>

      <motion.div 
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center"
        style={{ y }}
      >
        {/* Clean Logo Presentation */}
        <div className="mb-12">
          <Image
            src="/IDV/4MAG LOGO WHITE.png"
            alt="4MAG - Art Printed Magazine"
            width={600}
            height={150}
            className="w-full max-w-2xl h-auto mx-auto"
            priority
          />
        </div>
        
        {/* Clear Value Proposition */}
        <div className="space-y-8 mb-12">
          <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-light leading-tight tracking-tight max-w-2xl mx-auto">
            <span className="block">In a world that scrolls,</span>
            <span className="text-red font-black">we print.</span>
          </h1>
          
          <p className="text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Independent art magazine celebrating cannabis culture, street art, and underground movements across São Paulo, Berlin, and Colombia.
          </p>
        </div>

        {/* Clear Call-to-Action */}
        <div className="space-y-6">
          <motion.a
            href="#newsletter"
            className="inline-flex items-center gap-3 bg-red text-paper px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-red/90 hover:scale-105"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-magnetic
          >
            Get Issue #001
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>
          
          {/* Edition Info */}
          <div className="flex items-center justify-center gap-8 text-sm font-mono uppercase tracking-[0.2em] text-muted">
            <span>Limited Edition</span>
            <span className="w-px h-4 bg-muted/30" />
            <span>500 Copies</span>
            <span className="w-px h-4 bg-muted/30" />
            <span className="text-red">Available Now</span>
          </div>
        </div>
      </motion.div>

      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.08] mix-blend-mode-overlay">
        <div 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(240,235,224,0.4) 1px, transparent 0)',
            backgroundSize: '32px 32px',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </motion.section>
  )
}