import Nav from "@/components/sections/Nav"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Subscribe from "@/components/sections/Subscribe"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-white">
      <Nav />
      <Hero />
      <About />
      <Subscribe />
      <Footer />
    </main>
  )
}
