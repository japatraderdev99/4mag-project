import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-ink text-muted border-t border-paper/6 py-14 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-10">

          {/* Logo + tagline */}
          <div className="space-y-4">
            <Image
              src="/IDV/4MAG LOGO WHITE.png"
              alt="4MAG Logo"
              width={140}
              height={40}
              className="opacity-60 hover:opacity-90 transition-opacity"
            />
            <p className="text-xs font-[200] text-paper/25 leading-relaxed max-w-[160px]">
              In a world that scrolls,<br />we print.
            </p>
          </div>

          {/* Center */}
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] space-y-2.5 lg:text-center">
            <div className="flex items-center gap-2 flex-wrap lg:justify-center text-paper/60">
              <span>4MAG®</span>
              <span className="text-paper/20">·</span>
              <span className="text-sand/60">4mag.art</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap lg:justify-center">
              <a
                href="https://instagram.com/fourmagazine"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paper transition-colors"
              >
                @fourmagazine
              </a>
              <span className="text-paper/20">·</span>
              <span>São Paulo</span>
              <span className="text-paper/20">·</span>
              <span>Berlin</span>
              <span className="text-paper/20">·</span>
              <span>Colombia</span>
            </div>
            <div className="text-red/50">[ Print is not dead ]</div>
          </div>

          {/* Right */}
          <div className="lg:text-right space-y-2 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/18">
            <p>Art Printed Magazine</p>
            <p>Cannabis Culture × Street Art</p>
            <p>Underground Print Movement</p>
            <p className="text-sand/35">(2026)</p>
          </div>
        </div>

        <div className="border-t border-paper/6 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/18">
            © 2026 4MAG. Limited Edition #001
          </p>
          <p className="text-xs font-[200] text-paper/18 italic">
            "La cultura no se observa; se recorre."
          </p>
        </div>
      </div>
    </footer>
  )
}
