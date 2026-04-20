'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'motion/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { subscribeSchema, type SubscribeFormData } from '@/lib/schemas/subscribe'
import { cn } from '@/lib/utils'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Subscribe() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef   = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { name: '', email: '', honeypot: '' },
  })

  useGSAP(() => {
    gsap.set(contentRef.current, { opacity: 0, y: 32 })
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.15 })
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(contentRef.current, { opacity: 1, y: 0 })
    })
    return () => mm.revert()
  }, [])

  const onSubmit = async (data: SubscribeFormData) => {
    setFormState('loading')
    setErrorMessage('')
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Something went wrong')
      setFormState('success')
      reset()
      setTimeout(() => setFormState('idle'), 3000)
    } catch (error) {
      console.error('Subscription error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
      setFormState('error')
      setTimeout(() => { setFormState('idle'); setErrorMessage('') }, 3000)
    }
  }

  const getButtonText = () => {
    switch (formState) {
      case 'loading': return 'Joining...'
      case 'success': return '✓ You\'re In!'
      case 'error':   return 'Try Again'
      default:        return 'Get Issue #001'
    }
  }

  const getButtonClasses = () => {
    const base = "w-full py-3.5 px-6 font-sans font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 focus:outline-none min-h-[52px] flex items-center justify-center"
    switch (formState) {
      case 'success': return cn(base, "bg-ink text-paper border border-ink")
      case 'error':   return cn(base, "bg-transparent text-red border border-red/40")
      case 'loading': return cn(base, "bg-paper/20 text-paper/40 border border-paper/15 cursor-not-allowed")
      default:        return cn(base, "bg-paper text-ink border border-paper hover:bg-sand hover:text-paper hover:border-sand")
    }
  }

  return (
    <section
      id="newsletter"
      ref={containerRef}
      className="py-20 sm:py-28 lg:py-36 bg-ink text-paper relative overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/water-leaf.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.05] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/96 to-ink/88" />
      </div>

      {/* Side label */}
      <div
        className="absolute left-5 top-1/2 hidden lg:block select-none pointer-events-none"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-paper/15">
          New Territory · Same Vision · (2026)
        </span>
      </div>

      <div ref={contentRef} className="relative z-10 max-w-xl mx-auto px-6 sm:px-8 text-center">

        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-sand mb-5">
            Stay Tuned · Issue 001
          </p>
          <h2 className="text-[clamp(2.2rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.025em] mb-5">
            Get the magazine.
          </h2>
          <p className="text-sm text-paper/40 leading-relaxed font-[200] max-w-sm mx-auto">
            Be the first to know when Issue #001 drops.<br />
            Limited to 500 copies worldwide.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 w-full max-w-md mx-auto text-left">

          <div className="relative">
            <label htmlFor="name" className="sr-only">Nome</label>
            <input
              {...register('name')}
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3.5 bg-paper/5 border border-paper/12 text-paper placeholder:text-paper/25 focus:border-sand/60 focus:bg-paper/8 transition-all duration-300 focus:outline-none disabled:opacity-40 font-[200] text-sm"
              disabled={formState === 'loading'}
              autoComplete="name"
            />
            <AnimatePresence mode="wait">
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute -bottom-5 left-0 text-red text-[11px] font-mono"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3.5 bg-paper/5 border border-paper/12 text-paper placeholder:text-paper/25 focus:border-sand/60 focus:bg-paper/8 transition-all duration-300 focus:outline-none disabled:opacity-40 font-[200] text-sm"
              disabled={formState === 'loading'}
              autoComplete="email"
            />
            <AnimatePresence mode="wait">
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute -bottom-5 left-0 text-red text-[11px] font-mono"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Honeypot */}
          <input
            {...register('honeypot')}
            type="text"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute left-[-9999px]"
          />

          <div className="pt-1">
            <motion.button
              type="submit"
              disabled={formState === 'loading' || formState === 'success'}
              className={getButtonClasses()}
              whileTap={{ scale: 0.99 }}
            >
              <span className="flex items-center justify-center gap-2">
                {formState === 'loading' && (
                  <div className="w-3.5 h-3.5 border border-paper/30 border-t-paper rounded-full animate-spin" />
                )}
                {getButtonText()}
              </span>
            </motion.button>
          </div>

          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-red text-xs border border-red/15 px-4 py-3 bg-red/5 font-[200]"
                role="alert"
                aria-live="polite"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Trust line */}
        <div className="mt-8">
          <div className="flex items-center justify-center gap-5 text-[10px] font-mono uppercase tracking-[0.18em] text-paper/20">
            <span>No spam</span>
            <span>·</span>
            <span>500 copies</span>
            <span>·</span>
            <span className="text-sand/50">Limited edition</span>
          </div>
        </div>
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.05]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </section>
  )
}
