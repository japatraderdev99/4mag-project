'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

const mobileImages = [
  '/images/hero-mobile1.jpg',
  '/images/hero-mobile2.jpg',
  '/images/hero-mobile3.jpg'
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y       = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % mobileImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isMobile])

  useGSAP(() => {
    gsap.set(contentRef.current, { opacity: 0, y: 24 })
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 })
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(contentRef.current, { opacity: 1, y: 0 })
    })
    return () => mm.revert()
  }, [])

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen bg-ink text-paper relative flex items-center justify-center"
      style={{ opacity }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {isMobile ? (
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={mobileImages[currentImageIndex]}
                  alt={`4MAG – Background ${currentImageIndex + 1}`}
                  fill
                  className="object-cover opacity-20"
                  priority={currentImageIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
            {/* Slideshow dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {mobileImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`h-px transition-all duration-300 ${
                    i === currentImageIndex ? 'w-8 bg-paper' : 'w-3 bg-paper/30'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <Image
            src="/images/hero-test.jpg"
            alt="4MAG – Hero"
            fill
            className="object-cover opacity-15"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/88 to-ink/60" />
      </div>

      <motion.div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28"
        style={{ y }}
      >
        {/* Logo */}
        <div className="mb-10 sm:mb-14">
          <Image
            src="/IDV/4MAG LOGO WHITE.png"
            alt="4MAG"
            width={520}
            height={130}
            className="w-full max-w-[200px] sm:max-w-xs lg:max-w-sm h-auto"
            priority
          />
        </div>

        {/* Label */}
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sand mb-6">
          Cannabis Culture Publisher · Issue 001
        </p>

        {/* Headline */}
        <h1 className="text-[clamp(1.9rem,5.5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.025em] max-w-xl mb-5">
          4 the Culture.<br />
          <span className="font-[200] text-paper/60">From Lab to Print.</span>
        </h1>

        {/* Sub */}
        <p className="text-sm sm:text-base text-paper/45 max-w-sm leading-relaxed font-[200] mb-10">
          Independent art magazine. Cannabis culture,<br className="hidden sm:block" />
          street art, underground movements.<br />
          São Paulo · Berlin · Colombia
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <motion.a
            href="#newsletter"
            className="inline-flex items-center gap-3 bg-paper text-ink px-7 py-3.5 font-sans font-bold text-xs uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-sand hover:text-paper"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Issue #001
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.a>

          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-paper/30">
            <span>Limited</span>
            <span>·</span>
            <span>500 copies</span>
            <span>·</span>
            <span className="text-sand/70">(2026)</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
