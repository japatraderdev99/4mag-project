'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { subscribeSchema, type SubscribeFormData } from '@/lib/schemas/subscribe'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Subscribe() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { name: '', email: '', honeypot: '' },
  })

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
      setTimeout(() => setFormState('idle'), 4000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
      setFormState('error')
      setTimeout(() => { setFormState('idle'); setErrorMessage('') }, 4000)
    }
  }

  return (
    <section id="newsletter" className="bg-ink text-paper py-20 lg:py-28">
      <div className="mx-auto max-w-[1100px] px-8 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">

          {/* Left — headline */}
          <div>
            <h2 className="text-[1.6rem] sm:text-[1.8rem] font-bold uppercase leading-[1.1] tracking-[0.01em] mb-5">
              Subscribe<br />& Stay Tuned
            </h2>
            <p className="text-[13px] font-normal leading-[1.75] text-paper/55 max-w-[280px]">
              Be the first to know when Issue #001 drops.<br />
              Limited to 500 copies worldwide.
            </p>
          </div>

          {/* Right — form */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/50 mb-5">
              Get the magazine.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Honeypot */}
              <input
                {...register('honeypot')}
                type="text"
                tabIndex={-1}
                aria-hidden="true"
                className="absolute left-[-9999px]"
              />

              {/* Email row — stacked on mobile/tablet, inline on lg+ */}
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 relative">
                  <label htmlFor="sub-email" className="sr-only">Email</label>
                  <input
                    {...register('email')}
                    id="sub-email"
                    type="email"
                    placeholder="Email"
                    disabled={formState === 'loading' || formState === 'success'}
                    autoComplete="email"
                    className="w-full px-5 py-4 bg-transparent border border-paper/25 text-paper placeholder:text-paper/35 focus:border-paper/60 focus:outline-none transition-colors duration-200 text-[12px] font-normal uppercase tracking-[0.1em] disabled:opacity-40"
                  />
                  {errors.email && (
                    <p className="absolute -bottom-5 left-0 text-[10px] font-mono" style={{ color: '#c0392b' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formState === 'loading' || formState === 'success'}
                  className="px-7 py-4 bg-transparent border border-paper/25 lg:border-l-0 text-paper text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-paper hover:text-ink transition-colors duration-200 disabled:opacity-40 whitespace-nowrap"
                >
                  {formState === 'loading' ? (
                    <span className="w-3 h-3 border border-paper/30 border-t-paper rounded-full animate-spin inline-block" />
                  ) : formState === 'success' ? (
                    '✓ Done'
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>

              {errorMessage && (
                <p className="mt-3 text-[11px] font-mono" style={{ color: '#c0392b' }}>{errorMessage}</p>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
