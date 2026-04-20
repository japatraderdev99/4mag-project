import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-ink text-muted py-16 px-6 border-t border-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/IDV/4MAG LOGO WHITE.png"
              alt="4MAG Logo"
              width={200}
              height={60}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Contact Info */}
          <div className="font-mono text-[10px] uppercase tracking-widest space-y-3 text-center">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-paper font-black">4MAG®</span>
              <span>·</span>
              <span>fourmagazine</span>
              <span>·</span>
              <span className="text-red">4mag.art</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <a 
                href="https://instagram.com/fourmagazine" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-red transition-colors"
                data-cursor-magnetic
              >
                @fourmagazine
              </a>
              <span>·</span>
              <span>São Paulo</span>
              <span>·</span>
              <span>Berlin</span>
              <span>·</span>
              <span>Colombia</span>
            </div>
            
            <div className="text-red">
              <span>[ Print is not dead ]</span>
            </div>
          </div>

          {/* Editorial Statement */}
          <div className="text-center lg:text-right space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted/70">
              Art Printed Magazine
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted/70">
              Cannabis Culture × Street Art
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted/70">
              Underground Print Movement
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-muted/10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted/50">
            © 2024 4MAG. All rights reserved. Limited Edition #001
          </p>
        </div>
      </div>
    </footer>
  )
}