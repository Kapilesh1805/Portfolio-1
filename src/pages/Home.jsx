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
import StaggeredMenu from '../components/animations/StaggeredMenu'
import { useBlurReveal } from '../components/animations/useBlurReveal'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const menuItems = [
  { label: 'About', ariaLabel: 'Learn about Balaji Interior Decor', link: '#about' },
  { label: 'Projects', ariaLabel: 'View our selected projects', link: '#work' },
  { label: 'Gallery', ariaLabel: 'Explore our gallery of details', link: '#gallery' },
  { label: 'Services', ariaLabel: 'Explore our interior design services', link: '#services' },
  { label: 'Why Us', ariaLabel: 'Why choose Balaji Interior Decor', link: '#why-us' },
  { label: 'Testimonials', ariaLabel: 'Client reviews and testimonials', link: '#testimonials' },
  { label: 'Estimate', ariaLabel: 'Calculate your interior estimate', link: '#estimate' },
  { label: 'Contact', ariaLabel: 'Get in touch with us', link: '#contact' },
]

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
      <StaggeredMenu
        position="right"
        isFixed
        items={menuItems}
        displaySocials={false}
        displayItemNumbering
        logoUrl="/Logo.webp"
        menuButtonColor="#4A2E1F"
        openMenuButtonColor="#C98E7A"
        changeMenuColorOnOpen
        colors={['#4A2E1F', '#C98E7A']}
        accentColor="#C98E7A"
      />

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