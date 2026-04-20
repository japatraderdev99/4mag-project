'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const galleryImages = [
  {
    src: '/images/hash-art2.png',
    alt: 'Hash Art Collection',
    title: '[hashart]',
    subtitle: 'Collection 02',
    description: 'Underground street art meets cannabis culture in this explosive visual journey through São Paulo\'s art scene.'
  },
  {
    src: '/images/ZAZA - MAULA 03.PNG',
    alt: 'ZAZA Maula',
    title: 'ZAZA',
    subtitle: 'Maula 03',
    description: 'An intimate portrait of Brazil\'s emerging cannabis culture and the artists who shape its visual identity.'
  },
  {
    src: '/images/LONG CURATED 02 Dry Sift Melt Gang x Gas Close-Up Detail.PNG',
    alt: 'Long Curated',
    title: 'CURATED',
    subtitle: 'Dry Sift Detail',
    description: 'Macro photography revealing the intricate beauty and craftsmanship of artisanal hash production.'
  }
]

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, -50])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  useGSAP(() => {
    if (typeof window === 'undefined') return

    const images = containerRef.current?.querySelectorAll('.gallery-image')
    const titles = containerRef.current?.querySelectorAll('.gallery-title')
    
    if (images && titles) {
      gsap.set([images, titles], { opacity: 0, y: 100 })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(images, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.15
          })
          gsap.to(titles, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.3
          })
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={containerRef} className="relative bg-ink text-paper py-32 overflow-hidden">
      
      {/* Parallax Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 border border-red/20 rotate-45" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 border border-paper/10 rotate-12" />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-red/5"
          style={{ fontFamily: "'Instrument Serif', serif" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          4
        </motion.div>
      </motion.div>

      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Header */}
        <motion.div 
          ref={headerRef}
          className="mb-24 max-w-4xl mx-auto text-center"
          style={{ y: headerY }}
        >
          <motion.div 
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-red mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="border border-red/30 px-4 py-2">Gallery</span>
          </motion.div>
          
          <motion.h2 
            className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.75] tracking-[-0.02em] mb-8"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured
            <br />
            <span className="text-red">Work</span>
          </motion.h2>
          
          <motion.div
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="h-px bg-red flex-1 max-w-16" />
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-muted px-6">
              From the Underground × 4 The Culture
            </p>
            <div className="h-px bg-red flex-1 max-w-16" />
          </motion.div>
        </motion.div>

        {/* Enhanced Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {galleryImages.map((image, index) => (
            <motion.article
              key={index}
              className="group gallery-item"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              
              {/* Image Container */}
              <div className="gallery-image relative overflow-hidden mb-8">
                <div className="aspect-[4/5] relative overflow-hidden bg-ink/50 backdrop-blur-sm">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink/20 via-transparent to-ink/20 group-hover:opacity-0 transition-opacity duration-500" />
                  
                  {/* Interactive Border */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent group-hover:border-red"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Floating Number */}
                  <motion.div
                    className="absolute top-6 right-6 w-12 h-12 border border-red/30 flex items-center justify-center backdrop-blur-sm"
                    whileHover={{ 
                      backgroundColor: 'rgba(200, 0, 30, 0.1)',
                      borderColor: 'rgb(200, 0, 30)'
                    }}
                  >
                    <span className="font-mono text-[10px] font-black text-red">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="space-y-3">
                      <h3 className="font-mono text-lg uppercase tracking-[0.2em] text-red font-black">
                        {image.title}
                      </h3>
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                        {image.subtitle}
                      </p>
                      <motion.p 
                        className="text-sm leading-relaxed text-paper/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                        initial={false}
                      >
                        {image.description}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editorial Details */}
              <div className="gallery-title space-y-4">
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="h-px bg-red flex-1 max-w-12"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    ED.001 / {String(index + 1).padStart(2, '0')} 
                  </span>
                </motion.div>
                
                <motion.div 
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted/70"
                  whileHover={{ color: 'rgb(240, 235, 224)' }}
                >
                  <span>São Paulo</span>
                  <span className="mx-2">·</span>
                  <span>2024</span>
                  <span className="mx-2">·</span>
                  <span className="text-red">[Print Only]</span>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Editorial Statement */}
        <motion.div 
          className="mt-32 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-8">
            <div className="font-mono text-sm uppercase tracking-[0.25em] text-muted leading-relaxed">
              <p className="mb-4">
                Every image tells a story of resistance, creativity, and culture.
              </p>
              <p>
                More exclusive content available in our limited print edition.
              </p>
            </div>
            
            <motion.div 
              className="flex items-center justify-center gap-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="h-px bg-gradient-to-r from-transparent via-red to-transparent flex-1 max-w-24"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
              />
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-red border border-red/30 px-6 py-3 backdrop-blur-sm">
                500 Copies Only
              </div>
              <motion.div 
                className="h-px bg-gradient-to-l from-transparent via-red to-transparent flex-1 max-w-24"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.1 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.05] mix-blend-mode-overlay">
        <div 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(240,235,224,0.4) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </section>
  )
}