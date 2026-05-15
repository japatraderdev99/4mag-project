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

type Item = {
  src: string
  alt: string
  title: string
  status: string
  city: string
  year: string
}

const items: Item[] = [
  { src: '/images/hash-art2.jpg',    alt: 'Hash Art Exposition', title: 'Hashart', status: 'Printed only', city: 'Sao Paulo', year: '2024' },
  { src: '/images/zaza-maula.jpg',   alt: 'Zaza Maula',          title: 'Zaza',    status: 'Printed only', city: 'Sao Paulo', year: '2024' },
  { src: '/images/long-curated.jpg', alt: 'Curated — Dry Sift',  title: 'Curated', status: 'Printed only', city: 'Sao Paulo', year: '2024' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.work-card')
      if (!cards) return

      gsap.set(headerRef.current, { opacity: 0, y: 20 })
      gsap.set(cards,             { opacity: 0, y: 36 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 78%',
        onEnter: () => {
          gsap.to(headerRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12, delay: 0.15 })
        },
      })
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.work-card')
      gsap.set([headerRef.current, ...(cards ?? [])], { opacity: 1, y: 0 })
    })

    return () => { mm.revert(); ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <section id="gallery" ref={sectionRef} className="bg-white pb-[120px]">
      <div className="mx-auto max-w-[1280px] px-10">
        {/* Section heading */}
        <h2
          ref={headerRef}
          className="mb-[88px] text-center text-[14px] font-semibold uppercase tracking-[0.32em] text-ink"
        >
          Feature work
        </h2>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3">
          {items.map((item) => (
            <motion.article
              key={item.title}
              className="work-card group flex flex-col cursor-pointer"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              data-cursor-magnetic
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Caption row */}
              <div className="mt-6 flex items-end justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[18px] font-bold uppercase tracking-[0.18em] text-ink">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70">
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70">
                    {item.city}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70">
                    {item.year}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom button */}
        <div className="mt-[88px] flex justify-center">
          <motion.a
            href="#gallery"
            className="inline-flex items-center justify-center border border-ink px-12 py-4 text-[12px] font-semibold uppercase tracking-[0.28em] text-ink transition hover:bg-ink hover:text-paper"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-magnetic
          >
            Check all
          </motion.a>
        </div>
      </div>
    </section>
  )
}
