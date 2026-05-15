export default function About() {
  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center px-8 text-center">

        {/* Headline */}
        <h2 className="mb-10 text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.26em] text-ink">
          In a world that scrolls, we print.
        </h2>

        {/* Body copy */}
        <p className="text-[13px] font-normal leading-[1.85] text-ink/65 max-w-[800px]">
          4MAG is an independent art magazine born from the intersection of cannabis culture, street art,
          and underground movements. Each issue is a handcrafted object — limited, printed, and made to last.
          We believe print carries a weight that the scroll never will. Every page is a stage for artists,
          growers, writers and photographers who refuse to be reduced to a thumbnail. We do not chase the
          algorithm; we publish for the people who still care to hold something in their hands.
        </p>

      </div>
    </section>
  )
}
