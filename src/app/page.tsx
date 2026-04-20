import Hero from "@/components/sections/Hero"
import Marquee from "@/components/ui/Marquee"
import Gallery from "@/components/sections/Gallery"
import Subscribe from "@/components/sections/Subscribe"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Marquee />
      <Gallery />
      <Subscribe />
      <Footer />
    </div>
  )
}
