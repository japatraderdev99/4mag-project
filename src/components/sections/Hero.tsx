import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '65vh', minHeight: 480 }}>

      {/* Background texture with debossed 4mag logo */}
      <Image
        src="/images/hero-texture.jpg"
        alt="4MAG"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Tagline + CTA — centered, lower portion */}
      <div className="absolute inset-x-0 bottom-[18%] z-10 flex flex-col items-center gap-6 px-6 text-center">
        <h1 className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.28em] text-ink">
          We do it for the culture
        </h1>

        <a
          href="#newsletter"
          className="inline-flex items-center justify-center bg-ink px-14 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-paper hover:bg-ink/80 transition-colors duration-200"
          data-cursor-magnetic
        >
          Subscribe
        </a>
      </div>
    </section>
  )
}
