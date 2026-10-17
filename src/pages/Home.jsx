import { useLayoutEffect } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Work from '../components/Work'
import Gallery from '../components/Gallery'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Statement from '../components/Statement'
import Testimonials from '../components/Testimonials'
import Estimate from '../components/Estimate'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useBlurReveal } from '../components/animations/useBlurReveal'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

/**
 * Page order is the sales flow:
 *  hook (Hero) -> who we are (About) -> proof (Work, Gallery) -> what we do (Services)
 *  -> why us (WhyUs) -> belief (Statement) -> social proof (Testimonials)
 *  -> the ask (Estimate) -> talk to us (Contact)
 */
function Home() {
  // Coming back from a service page: land on the section the visitor left from.
  // Must run BEFORE useBlurReveal so sections already passed are not re-blurred.
  useLayoutEffect(() => {
    let id = null
    try {
      id = sessionStorage.getItem('returnTo')
      sessionStorage.removeItem('returnTo')
    } catch {
      /* ignore */
    }
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [])

  useBlurReveal()

  return (
    <>
      <main>
        <div className="stack-hero-about">
          <Hero scrollTo={scrollTo} />
          <About scrollTo={scrollTo} />
        </div>
        <Gallery />
        <Services />
        <WhyUs />
        <Statement />
        <Testimonials />
        <Estimate />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Home