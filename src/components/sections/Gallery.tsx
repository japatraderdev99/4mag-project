'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const galleryImages = [
  {
    src: '/images/hash-art2.jpg',
    alt: 'Hash Art Collection',
    label: 'HASHART',
    title: 'Collection 02',
    caption: 'São Paulo, (2025)',
    description: 'Underground street art meets cannabis culture.'
  },
  {
    src: '/images/zaza-maula.jpg',
    alt: 'ZAZA Maula',
    label: 'ZAZA',
    title: 'Maula 03',
    caption: 'Brasil, (2025)',
    description: "Brazil's emerging cannabis culture and its visual identity."
  },
  {
    src: '/images/long-curated.jpg',
    alt: 'Long Curated',
    label: 'CURATED',
    title: 'Dry Sift Detail',
    caption: 'Colombia, (2026)',
    description: 'Macro photography of artisanal hash production.'
  }
]

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const items = containerRef.current?.querySelectorAll('.gallery-item')
    if (!items) return

    gsap.set(items, { opacity: 0, y: 40 })
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 78%',
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1
        })
      }
    })

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <section ref={containerRef} className="relative bg-paper text-ink overflow-hidden">

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-24 lg:pt-28 lg:pb-32">

        {/* Header */}
        <div className="mb-14 lg:mb-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red mb-4">
            Issue 001 · Featured Work
          </p>
          <h2 className="text-[clamp(2.8rem,8vw,7rem)] leading-[0.92] tracking-[-0.03em] font-bold mb-6">
            Full Color.
          </h2>

          <div className="flex items-center gap-5 mt-6">
            <div className="h-px bg-ink/15 flex-1" />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted whitespace-nowrap">
              From the underground × 4 the culture
            </span>
            <div className="h-px bg-ink/15 w-12" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {galleryImages.map((image, index) => (
            <motion.article
              key={index}
              className="gallery-item group"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-ink/8 mb-4">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Index badge */}
                <div className="absolute top-3 left-3 w-8 h-8 bg-paper/90 flex items-center justify-center">
                  <span className="font-mono text-[9px] text-ink">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                {/* Hover border */}
                <div className="absolute inset-0 border border-transparent group-hover:border-red/60 transition-all duration-300" />
              </div>

              {/* Caption */}
              <div className="space-y-1">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-red">{image.label}</p>
                <h3 className="text-lg font-bold leading-snug tracking-[-0.01em]">{image.title}</h3>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">{image.caption}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-16 lg:mt-24 border-t border-ink/10 pt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <p className="text-sm font-[200] leading-relaxed max-w-xs text-ink/50">
            "El arte es planta. La cultura no se observa; se recorre."
          </p>
          <div className="text-right space-y-1">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-red">500 Copies Only</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Print · (2026)</p>
          </div>
        </div>
      </div>
    </section>
  )
}
