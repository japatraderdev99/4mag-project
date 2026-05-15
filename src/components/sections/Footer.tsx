import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-paper text-ink py-14 px-8 md:px-12">
      <div className="mx-auto max-w-[1100px]">

        <div className="grid grid-cols-2 md:grid-cols-[auto_1fr_1fr_auto] gap-10 md:gap-16 items-start">

          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" aria-label="4MAG home">
              <Image
                src="/IDV/4MAG LOGO BLACK.png"
                alt="4MAG"
                width={140}
                height={54}
                className="h-[54px] w-auto"
              />
            </a>
          </div>

          {/* Column: 4MAG */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink mb-4">4MAG</p>
            <ul className="space-y-2.5">
              <li>
                <a href="#about" className="text-[12px] font-normal text-ink/55 hover:text-ink transition-colors duration-200">
                  About us
                </a>
              </li>
              <li>
                <a href="mailto:hello@4mag.art" className="text-[12px] font-normal text-ink/55 hover:text-ink transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Feature Word */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink mb-4">Feature Word</p>
            <ul className="space-y-2.5">
              <li>
                <a href="#gallery" className="text-[12px] font-normal text-ink/55 hover:text-ink transition-colors duration-200">
                  Editions
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-[12px] font-normal text-ink/55 hover:text-ink transition-colors duration-200">
                  Exhibitions
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-[12px] font-normal text-ink/55 hover:text-ink transition-colors duration-200">
                  Prints
                </a>
              </li>
            </ul>
          </div>

          {/* Social circles */}
          <div className="col-span-2 md:col-span-1 flex items-start gap-3">
            <a
              href="https://instagram.com/fourmagazine"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="4MAG on Instagram"
              className="w-9 h-9 rounded-full bg-ink flex items-center justify-center hover:bg-ink/70 transition-colors duration-200"
              data-cursor-magnetic
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#E9E3D6" strokeWidth="1.8"/>
                <circle cx="12" cy="12" r="4.5" stroke="#E9E3D6" strokeWidth="1.8"/>
                <circle cx="17.5" cy="6.5" r="1" fill="#E9E3D6"/>
              </svg>
            </a>
            <a
              href="https://linktr.ee/fourmagazine"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="4MAG Linktree"
              className="w-9 h-9 rounded-full bg-ink flex items-center justify-center hover:bg-ink/70 transition-colors duration-200"
              data-cursor-magnetic
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="#E9E3D6" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  )
}
