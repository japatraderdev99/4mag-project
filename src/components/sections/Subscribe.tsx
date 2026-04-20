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
  const contentRef = useRef<HTMLDivElement>(null)

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
    gsap.set(contentRef.current, { opacity: 0, y: 40 })
    
    const matchMedia = gsap.matchMedia()

    matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.2
      })
    })

    matchMedia.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(contentRef.current, { opacity: 1, y: 0 })
    })

    return () => {
      matchMedia.revert()
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
      }, 3000)
    } catch (error) {
      console.error('Subscription error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
      setFormState('error')
      
      setTimeout(() => {
        setFormState('idle')
        setErrorMessage('')
      }, 3000)
    }
  }

  const getButtonText = () => {
    switch (formState) {
      case 'loading': return 'Joining...'
      case 'success': return '✓ You\'re In!'
      case 'error': return 'Try Again'
      default: return 'Join the Culture'
    }
  }

  const getButtonClasses = () => {
    const base = "w-full py-4 sm:py-5 px-6 sm:px-8 font-mono text-sm sm:text-base md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red/50 rounded min-h-[56px] sm:min-h-[64px] flex items-center justify-center font-medium"
    
    switch (formState) {
      case 'success':
        return cn(base, "bg-green-600 text-paper border-2 border-green-600")
      case 'error':
        return cn(base, "bg-transparent text-red border-2 border-red hover:bg-red/10")
      case 'loading':
        return cn(base, "bg-muted/20 text-muted border-2 border-muted/30 cursor-not-allowed")
      default:
        return cn(base, "bg-red text-paper border-2 border-red hover:bg-red/90 hover:shadow-lg active:scale-[0.98]")
    }
  }

  return (
    <section 
      id="newsletter"
      ref={containerRef} 
      className="py-12 sm:py-16 lg:py-24 bg-ink text-paper relative overflow-hidden"
    >
      {/* Simple Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/water-leaf.jpg"
          alt="Background"
          fill
          className="object-cover opacity-8 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/95 to-ink/90" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Clear Heading */}
        <div className="mb-8 sm:mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-red mb-3 sm:mb-4">
            Newsletter
          </div>
          <h2 className="text-[clamp(2rem,7vw,4.5rem)] font-light leading-tight mb-4 sm:mb-6 tracking-tight px-4">
            Get the magazine.
          </h2>
          <p className="text-lg sm:text-xl lg:text-lg text-muted leading-relaxed max-w-2xl mx-auto font-light px-4">
            Be the first to know when Issue #001 drops. Limited to 500 copies worldwide.
          </p>
        </div>

        {/* Responsive, Enhanced Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8 w-full max-w-lg sm:max-w-xl mx-auto px-4 sm:px-6 lg:px-0">
          
          {/* Name Field */}
          <div className="relative">
            <label htmlFor="name" className="sr-only">Nome</label>
            <input
              {...register('name')}
              id="name"
              type="text"
              placeholder="Seu nome"
              className="w-full px-4 sm:px-6 py-4 sm:py-5 text-base sm:text-lg md:text-base bg-paper/5 border border-paper/20 rounded text-paper placeholder:text-muted/60 focus:border-red focus:bg-paper/10 focus:ring-2 focus:ring-red/20 transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formState === 'loading'}
              autoComplete="name"
            />
            <AnimatePresence mode="wait">
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-6 sm:-bottom-7 left-0 text-red text-xs sm:text-sm bg-ink/90 px-2 py-1 rounded backdrop-blur-sm z-10"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full px-4 sm:px-6 py-4 sm:py-5 text-base sm:text-lg md:text-base bg-paper/5 border border-paper/20 rounded text-paper placeholder:text-muted/60 focus:border-red focus:bg-paper/10 focus:ring-2 focus:ring-red/20 transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formState === 'loading'}
              autoComplete="email"
            />
            <AnimatePresence mode="wait">
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-6 sm:-bottom-7 left-0 text-red text-xs sm:text-sm bg-ink/90 px-2 py-1 rounded backdrop-blur-sm z-10"
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

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={formState === 'loading' || formState === 'success'}
            className={getButtonClasses()}
            whileHover={{ scale: formState === 'idle' ? 1.02 : 1 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-magnetic
            aria-describedby={errorMessage ? 'error-message' : undefined}
          >
            <span className="flex items-center justify-center gap-2">
              {formState === 'loading' && (
                <div className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
              )}
              {getButtonText()}
            </span>
          </motion.button>

          {/* Error Message */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red text-sm bg-red/10 border border-red/20 px-4 py-3 rounded-sm backdrop-blur-sm"
                id="error-message"
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-start gap-2">
                  <span className="text-red font-bold">⚠</span>
                  <p>{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Trust Indicators */}
        <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4 px-4 sm:px-0">
          <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-muted flex-wrap">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-green-400">✓</span> Sem spam
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-green-400">✓</span> Cancele quando quiser
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-red">✓</span> Edição limitada
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted/70 text-center px-2 sm:px-4 leading-relaxed">
            Junte-se a 1.200+ entusiastas da arte de São Paulo, Berlim e além.
          </p>
        </div>
      </div>
      
      {/* Subtle Grain */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.06] mix-blend-mode-overlay">
        <div 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(240,235,224,0.3) 1px, transparent 0)',
            backgroundSize: '32px 32px',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </section>
  )
}