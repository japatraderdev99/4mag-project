import Hero from "@/components/sections/Hero"
import Marquee from "@/components/ui/Marquee"
import Gallery from "@/components/sections/Gallery"
import Subscribe from "@/components/sections/Subscribe"
import Footer from "@/components/sections/Footer"
import SectionTransition from "@/components/ui/SectionTransition"

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Marquee />
      
      <SectionTransition variant="diagonal" color="red" />
      
      <Gallery />
      
      <SectionTransition variant="geometric" color="paper" />
      
      <Subscribe />
      
      <SectionTransition variant="fade" color="red" />
      
      <Footer />
    </div>
  )
}
