export default function Marquee() {
  const content = "4MAG · ART PRINTED MAGAZINE · [ HASHART EXPOSITION ] · CANNABIS CULTURE · STREET ART · SÃO PAULO → BERLIN → COLOMBIA · PRINT IS NOT DEAD · UNDERGROUND MOVEMENT · LIMITED EDITION #001"
  
  return (
    <section className="bg-red text-paper py-4 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="font-mono text-[12px] uppercase tracking-widest flex-shrink-0 py-1">
            {content} · {content} · {content} ·&nbsp;
          </div>
        </div>
      </div>
    </section>
  )
}