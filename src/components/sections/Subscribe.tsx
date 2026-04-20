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
    const base = "w-full py-4 px-6 font-mono text-sm uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red/50"
    
    switch (formState) {
      case 'success':
        return cn(base, "bg-red text-paper border-2 border-red")
      case 'error':
        return cn(base, "bg-transparent text-red border-2 border-red hover:bg-red/10")
      case 'loading':
        return cn(base, "bg-muted/20 text-muted border-2 border-muted/30 cursor-not-allowed")
      default:
        return cn(base, "bg-red text-paper border-2 border-red hover:bg-red/90 active:scale-[0.98]")
    }
  }

  return (
    <section 
      id="newsletter"
      ref={containerRef} 
      className="py-24 bg-ink text-paper relative overflow-hidden"
    >
      {/* Simple Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Water-Leaf-Mavericks.JPEG"
          alt="Background"
          fill
          className="object-cover opacity-8 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/95 to-ink/90" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        
        {/* Clear Heading */}
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-red mb-4">
            Newsletter
          </div>
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-light leading-tight mb-6">
            Get the magazine.
          </h2>
          <p className="text-lg text-muted leading-relaxed max-w-lg mx-auto">
            Be the first to know when Issue #001 drops. Limited to 500 copies worldwide.
          </p>
        </div>

        {/* Simple, Effective Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
          
          {/* Name Field */}
          <div className="relative">
            <input
              {...register('name')}
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 bg-paper/5 border border-paper/20 text-paper placeholder:text-muted/60 focus:border-red focus:bg-paper/10 transition-all duration-300 focus:outline-none"
              disabled={formState === 'loading'}
            />
            <AnimatePresence mode="wait">
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-6 left-0 text-red text-sm"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-paper/5 border border-paper/20 text-paper placeholder:text-muted/60 focus:border-red focus:bg-paper/10 transition-all duration-300 focus:outline-none"
              disabled={formState === 'loading'}
            />
            <AnimatePresence mode="wait">
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-6 left-0 text-red text-sm"
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
          >
            {getButtonText()}
          </motion.button>

          {/* Error Message */}
          <AnimatePresence>
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red text-sm bg-red/10 border border-red/20 px-4 py-2 rounded"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </form>

        {/* Trust Indicators */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm text-muted">
            <span>✓ No spam</span>
            <span>✓ Unsubscribe anytime</span>
            <span>✓ Limited edition</span>
          </div>
          <p className="text-xs text-muted/70">
            Join 1,200+ art enthusiasts from São Paulo, Berlin, and beyond.
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