'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { subscribeSchema, type SubscribeFormData } from '@/lib/schemas/subscribe'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Subscribe() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      name: '',
      email: '',
      honeypot: '',
    },
  })

  useGSAP(() => {
    if (typeof window === 'undefined') return

    const elements = [headingRef.current, formRef.current]
    
    gsap.set(elements, { opacity: 0, y: 60 })

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const onSubmit = async (data: SubscribeFormData) => {
    setFormState('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong')
      }

      setFormState('success')
      reset()
      
      setTimeout(() => {
        setFormState('idle')
      }, 4000)
    } catch (error) {
      console.error('Subscription error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
      setFormState('error')
      
      setTimeout(() => {
        setFormState('idle')
      }, 4000)
    }
  }

  const getButtonText = () => {
    switch (formState) {
      case 'loading': return '[JOINING...]'
      case 'success': return '[YOU\'RE IN.]'
      case 'error': return '[TRY AGAIN.]'
      default: return '[JOIN THE CULTURE]'
    }
  }

  const getButtonClasses = () => {
    const base = "group relative font-mono text-[11px] uppercase tracking-[0.3em] border-2 px-12 py-4 transition-all duration-500 disabled:cursor-not-allowed overflow-hidden"
    
    switch (formState) {
      case 'success':
        return cn(base, "border-red bg-red text-paper shadow-lg shadow-red/20")
      case 'error':
        return cn(base, "border-red bg-transparent text-red animate-pulse")
      case 'loading':
        return cn(base, "border-muted/30 bg-transparent text-muted cursor-wait")
      default:
        return cn(base, "border-paper/30 bg-transparent text-paper hover:border-red hover:bg-red hover:text-paper hover:shadow-lg hover:shadow-red/10")
    }
  }

  return (
    <section ref={containerRef} className="relative min-h-screen bg-ink text-paper overflow-hidden">
      
      {/* Sophisticated Background Composition */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {/* Background Images with Parallax */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 h-full gap-8">
            <div className="relative">
              <Image
                src="/images/JOINT BURN-SLUGGERS-02.JPEG"
                alt="Editorial Photography"
                fill
                className="object-cover opacity-8 grayscale"
              />
            </div>
            <div className="relative">
              <Image
                src="/images/Water-Leaf-Mavericks.JPEG"
                alt="Art Documentation"
                fill
                className="object-cover opacity-12"
              />
            </div>
            <div className="relative lg:block hidden">
              <Image
                src="/images/colombian-expedition.png"
                alt="Cultural Documentation"
                fill
                className="object-cover opacity-8 grayscale"
              />
            </div>
            <div className="relative lg:block hidden">
              <Image
                src="/images/hash-art2.png"
                alt="Street Art"
                fill
                className="object-cover opacity-10"
              />
            </div>
          </div>
          
          {/* Sophisticated Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/95 to-ink/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,13,13,0.8)_100%)]" />
        </div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-px h-64 bg-gradient-to-b from-transparent via-red/20 to-transparent"
          animate={{ height: ['0px', '256px', '0px'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/6 w-px h-48 bg-gradient-to-b from-transparent via-paper/10 to-transparent"
          animate={{ height: ['0px', '192px', '0px'] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>

      <motion.div 
        className="relative z-10 flex items-center justify-center min-h-screen px-6 py-32"
        style={{ y: contentY }}
      >
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Editorial Content */}
            <div className="space-y-12">
              <div ref={headingRef} className="space-y-8">
                <motion.div 
                  className="font-mono text-[11px] uppercase tracking-[0.3em] text-red"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <span className="border border-red/30 px-4 py-2 backdrop-blur-sm">
                    Subscription
                  </span>
                </motion.div>
                
                <motion.h2 
                  className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.8] tracking-[-0.01em]"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Get the
                  <br />
                  <span className="text-red italic">mag.</span>
                </motion.h2>
                
                <motion.div 
                  className="space-y-6 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xl leading-relaxed text-paper/90 font-light">
                    Drop your email. We'll find you when the next issue drops.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-6 text-center pt-6">
                    <div className="space-y-2">
                      <div className="text-2xl font-black text-red font-mono">001</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted">Issue</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-black text-red font-mono">500</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted">Copies</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-black text-red font-mono">+15</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted">Countries</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Enhanced Form */}
            <div ref={formRef} className="space-y-8">
              <motion.div
                className="bg-ink/40 backdrop-blur-md border border-paper/10 p-8 lg:p-12"
                whileHover={{ 
                  backgroundColor: 'rgba(13, 13, 13, 0.6)',
                  borderColor: 'rgba(240, 235, 224, 0.2)'
                }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Form Fields */}
                  <div className="space-y-8">
                    <div className="relative">
                      <motion.input
                        {...register('name')}
                        type="text"
                        placeholder="Your Name"
                        className="w-full bg-transparent border-0 border-b border-paper/20 pb-4 text-lg font-light placeholder:text-muted/60 focus:border-red focus:outline-none transition-all duration-300"
                        disabled={formState === 'loading'}
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <AnimatePresence mode="wait">
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute -bottom-6 left-0 text-red text-sm font-mono"
                          >
                            {errors.name.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="relative">
                      <motion.input
                        {...register('email')}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-transparent border-0 border-b border-paper/20 pb-4 text-lg font-light placeholder:text-muted/60 focus:border-red focus:outline-none transition-all duration-300"
                        disabled={formState === 'loading'}
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <AnimatePresence mode="wait">
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute -bottom-6 left-0 text-red text-sm font-mono"
                          >
                            {errors.email.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Honeypot */}
                  <input
                    {...register('honeypot')}
                    type="text"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="absolute left-[-9999px]"
                  />

                  {/* Enhanced Submit Button */}
                  <div className="pt-6">
                    <motion.button
                      type="submit"
                      disabled={formState === 'loading' || formState === 'success'}
                      data-cursor-magnetic
                      className={getButtonClasses()}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <span className="relative z-10">
                        <motion.span
                          key={formState}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {getButtonText()}
                        </motion.span>
                      </span>
                      
                      {/* Button Background Animation */}
                      <motion.div
                        className="absolute inset-0 bg-red origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        className="text-center"
                      >
                        <p className="text-red text-sm font-mono bg-red/10 border border-red/20 px-4 py-3">
                          {errorMessage}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>

              {/* Editorial Note */}
              <motion.div 
                className="text-center space-y-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px bg-red/30 flex-1 max-w-16" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    Worldwide Shipping
                  </span>
                  <div className="h-px bg-red/30 flex-1 max-w-16" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
                  São Paulo → Berlin → Colombia → Your City
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Enhanced Grain Texture */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.08] mix-blend-mode-overlay">
        <div 
          style={{
            backgroundImage: 'radial-gradient(circle at 3px 3px, rgba(240,235,224,0.6) 1px, transparent 0)',
            backgroundSize: '48px 48px',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </section>
  )
}