'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'

const heroImages = [
  '/images/hash-art-exposition.png',
  '/images/hash-art2.png',
  '/images/colombian-expedition.png'
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const sloganRef = useRef<HTMLParagraphElement>(null)
  const metadataRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.5 })
  const opacity = useTransform(smoothScrollY, [0, 0.5], [1, 0])
  const scale = useTransform(smoothScrollY, [0, 0.5], [1, 1.1])
  const y = useTransform(smoothScrollY, [0, 0.5], [0, -100])
  const backgroundY = useTransform(smoothScrollY, [0, 1], [0, -200])

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline()
    
    // Set initial states
    gsap.set([logoRef.current, sloganRef.current, metadataRef.current], {
      opacity: 0,
      y: 100
    })

    const matchMedia = gsap.matchMedia()

    matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
      // Background reveal
      tl.fromTo(backgroundRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      )
      
      // Staggered content reveal
      .to([logoRef.current, sloganRef.current, metadataRef.current], {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
        delay: 0.5
      })
      
      // Floating animation for logo
      .to(logoRef.current, {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1
      }, "-=0.5")
    })

    matchMedia.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([logoRef.current, sloganRef.current, metadataRef.current, backgroundRef.current], {
        opacity: 1,
        y: 0,
        scale: 1
      })
    })

    return () => {
      tl.kill()
      matchMedia.revert()
    }
  }, [])

  return (
    <motion.section
      ref={containerRef}
      className="h-svh bg-ink text-paper relative overflow-hidden"
      style={{ opacity }}
    >
      {/* Dynamic Background Images with Parallax */}
      <motion.div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{ y: backgroundY, scale }}
      >
        {heroImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.05
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={image}
              alt={`Hero Background ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        ))}
        
        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/50" />
        
        {/* Animated Geometric Elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 border border-red/20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-32 h-32 border border-paper/10"
          animate={{
            rotate: [360, 0],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div 
        className="relative z-10 h-full flex items-center"
        style={{ y }}
      >
        <div className="grid grid-cols-12 w-full max-w-[1920px] mx-auto px-6 lg:px-12 gap-8">
          
          {/* Editorial Metadata */}
          <motion.div 
            ref={metadataRef}
            className="col-span-12 lg:col-span-3 flex flex-col justify-between h-full py-16 space-y-8"
          >
            <div className="space-y-6">
              {/* Issue Info */}
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted space-y-3">
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <div className="w-2 h-2 bg-red rounded-full animate-pulse"></div>
                  <span className="text-red">#001</span>
                  <span>/</span>
                  <span>PRINT IS NOT DEAD</span>
                </motion.div>
                <div className="pl-5">SÃO PAULO — BRASIL</div>
                <div className="pl-5 text-red font-black">[ hashart ]</div>
                <div className="pl-5 text-paper/70">EXPOSIÇÃO 2024</div>
              </div>
              
              {/* Limited Edition Badge */}
              <motion.div 
                className="border border-red/30 p-4 backdrop-blur-sm"
                whileHover={{ 
                  borderColor: 'rgb(200, 0, 30)',
                  backgroundColor: 'rgba(200, 0, 30, 0.05)',
                  transition: { duration: 0.3 }
                }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-center space-y-1">
                  <div className="text-red">LIMITED EDITION</div>
                  <div className="text-paper font-black">500 COPIES</div>
                  <div className="text-muted">WORLDWIDE</div>
                </div>
              </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
              className="hidden lg:flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <motion.div 
                className="w-8 h-px bg-red"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
              />
              <span>SCROLL</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-red text-sm"
              >
                ↓
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Main Logo & Content */}
          <div className="col-span-12 lg:col-span-9 flex flex-col justify-center space-y-12">
            
            {/* 4MAG Logo with Enhanced Animation */}
            <motion.div 
              ref={logoRef}
              className="relative"
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <Image
                src="/IDV/4MAG LOGO WHITE.png"
                alt="4MAG Logo"
                width={800}
                height={200}
                className="w-full max-w-4xl h-auto filter drop-shadow-2xl"
                priority
              />
              
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 border-2 border-red/30"
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-8 h-8 bg-red/20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2] 
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Manifesto Slogan */}
            <motion.div 
              ref={sloganRef}
              className="space-y-6 max-w-3xl"
            >
              <motion.p 
                className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-light text-balance leading-[1.1] tracking-[-0.02em]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                In a world that scrolls,{' '}
                <motion.span 
                  className="text-red font-black"
                  whileHover={{ textShadow: "0 0 8px rgb(200, 0, 30)" }}
                >
                  we print.
                </motion.span>
              </motion.p>
              
              <motion.div 
                className="flex items-center gap-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <motion.div 
                  className="h-px bg-gradient-to-r from-red to-transparent flex-1 max-w-24"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2.2, duration: 1 }}
                />
                <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted">
                  Art Printed Magazine · 4 The Culture
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Grain & Texture */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.12] mix-blend-mode-overlay"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(240,235,224,0.8) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.06] mix-blend-mode-multiply"
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(200,0,30,0.1) 50%)',
            backgroundSize: '2px 2px',
          }}
        />
      </div>
    </motion.section>
  )
}