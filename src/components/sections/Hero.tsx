'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

const mobileImages = [
  '/images/hero-mobile1.JPEG',
  '/images/hero-mobile2.PNG', 
  '/images/hero-mobile3.JPEG'
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Check if mobile and setup slideshow
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile slideshow logic
  useEffect(() => {
    if (!isMobile) return
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % mobileImages.length)
    }, 4000) // Change image every 4 seconds
    
    return () => clearInterval(interval)
  }, [isMobile])

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
      {/* Responsive Background */}
      <div className="absolute inset-0 z-0">
        {isMobile ? (
          // Mobile Slideshow
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src={mobileImages[currentImageIndex]}
                  alt={`4MAG - Mobile Background ${currentImageIndex + 1}`}
                  fill
                  className="object-cover opacity-25"
                  priority={currentImageIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Slideshow Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {mobileImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-red w-8' 
                      : 'bg-paper/30 hover:bg-paper/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Desktop Static Image
          <Image
            src="/images/hero-test.jpg"
            alt="4MAG - Hero Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/90 to-ink/70" />
      </div>

      <motion.div 
        ref={contentRef}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center"
        style={{ y }}
      >
        {/* Clean Logo Presentation */}
        <div className="mb-8 sm:mb-12">
          <Image
            src="/IDV/4MAG LOGO WHITE.png"
            alt="4MAG - Art Printed Magazine"
            width={600}
            height={150}
            className="w-full max-w-xs sm:max-w-md lg:max-w-2xl h-auto mx-auto"
            priority
          />
        </div>
        
        {/* Clear Value Proposition */}
        <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          <h1 className="text-[clamp(1.25rem,5vw,2.5rem)] font-light leading-tight tracking-tight max-w-2xl mx-auto px-4">
            <span className="block">In a world that scrolls,</span>
            <span className="text-red font-black">we print.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed px-4">
            Independent art magazine celebrating cannabis culture, street art, and underground movements across São Paulo, Berlin, and Colombia.
          </p>
        </div>

        {/* Clear Call-to-Action */}
        <div className="space-y-6 px-4">
          <motion.a
            href="#newsletter"
            className="inline-flex items-center gap-2 sm:gap-3 bg-red text-paper px-6 sm:px-8 py-3 sm:py-4 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-red/90 hover:scale-105 rounded-sm"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-magnetic
          >
            <span className="hidden sm:inline">Get Issue #001</span>
            <span className="sm:hidden">Get Issue #001</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>
          
          {/* Edition Info */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 text-xs sm:text-sm font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] text-muted flex-wrap">
            <span>Limited Edition</span>
            <span className="w-px h-3 sm:h-4 bg-muted/30" />
            <span>500 Copies</span>
            <span className="w-px h-3 sm:h-4 bg-muted/30" />
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