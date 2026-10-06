import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Gallery from './components/Gallery'
import Services from './components/Services'
import Statement from './components/Statement'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/animations/LoadingScreen'
import { useBlurReveal } from './components/animations/useBlurReveal'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [loading, setLoading] = useState(true)

  useBlurReveal()

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div className="overflow-x-clip">
        <main>
          <div className="stack-hero-about">
            <Hero menuOpen={menuOpen} setMenuOpen={setMenuOpen} activeSection={activeSection} scrollTo={scrollTo} />
            <About scrollTo={scrollTo} />
          </div>
          <Work />
          <Gallery />
          <Services />
          <Statement />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
