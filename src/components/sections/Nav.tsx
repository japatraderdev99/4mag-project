'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'About',     href: '#about' },
  { label: 'Gallery',   href: '#gallery' },
  { label: 'Subscribe', href: '#newsletter' },
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color] duration-400 ${
        scrolled
          ? 'bg-paper/95 backdrop-blur-sm border-b border-ink/8'
          : 'bg-transparent'
      }`}
    >
      <nav className="relative mx-auto flex h-[60px] max-w-[1280px] items-center justify-between px-8 md:px-12">

        {/* Left — desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70 hover:text-ink transition-colors duration-200"
              data-cursor-magnetic
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 -ml-2"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className={`block h-px w-5 bg-ink transition-all duration-300 ${
                menuOpen && i === 0 ? 'rotate-45 translate-y-[7px]' :
                menuOpen && i === 1 ? 'opacity-0' :
                menuOpen && i === 2 ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          ))}
        </button>

        {/* Center logo */}
        <a
          href="/"
          aria-label="4MAG home"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          data-cursor-magnetic
        >
          <Image
            src="/IDV/4MAG LOGO BLACK.png"
            alt="4MAG"
            width={72}
            height={28}
            className="h-6 w-auto"
            priority
          />
        </a>

        {/* Right — subscribe */}
        <a
          href="#newsletter"
          className="hidden md:inline-flex text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70 hover:text-ink transition-colors duration-200"
          data-cursor-magnetic
        >
          Subscribe
        </a>

        {/* Mobile spacer */}
        <div className="md:hidden w-9" />
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 bg-paper/97 border-b border-ink/8 ${
          menuOpen ? 'max-h-56' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col px-8 py-2">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/70 hover:text-ink border-b last:border-0 border-ink/8 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
