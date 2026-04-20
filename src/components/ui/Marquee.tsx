export default function Marquee() {
  const content = "4MAG · Art Printed Magazine · [ HashArt Exposition ] · Cannabis Culture · Street Art · São Paulo → Berlin → Colombia · Print is not dead · Underground Movement · Limited Edition #001"

  return (
    <section className="bg-paper text-ink py-3.5 overflow-hidden border-t border-b border-ink/10">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50 flex-shrink-0 py-0.5">
            {content} · {content} · {content} ·&nbsp;
          </div>
        </div>
      </div>
    </section>
  )
}
