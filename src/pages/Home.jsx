import { useLayoutEffect } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Reviews from '../components/Reviews'
import Estimate from '../components/Estimate'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import StaggeredMenu from '../components/animations/StaggeredMenu'
import { useBlurReveal } from '../components/animations/useBlurReveal'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const menuItems = [
  { label: 'About', ariaLabel: 'Learn about Balaji Interior Decor', link: '#about' },
  { label: 'Services', ariaLabel: 'Explore our interior services', link: '#services' },
  { label: 'Why Us', ariaLabel: 'Why choose Balaji Interior Decor', link: '#why-us' },
  { label: 'Estimate', ariaLabel: 'Calculate your interior estimate', link: '#estimate' },
  { label: 'Reviews', ariaLabel: 'Customer reviews and testimonials', link: '#reviews' },
  { label: 'Contact', ariaLabel: 'Get in touch with us', link: '#contact' },
]

/**
 * Page structure:
 * Hero -> About Us -> Services (Projects) -> Why Us -> Estimate -> Customer Reviews (Testimonials) -> Contact -> Footer
 */
function Home({ heroEntrance = true }) {
  // Coming back from a service page: land on the section the visitor left from.
  // Must run BEFORE useBlurReveal so sections already passed are not re-blurred.
  useLayoutEffect(() => {
    let id = null
    let serviceSlug = null
    let savedScrollY = null
    try {
      id = sessionStorage.getItem('returnTo')
      serviceSlug = sessionStorage.getItem('returnToServiceSlug')
      savedScrollY = sessionStorage.getItem('servicesScrollY')
    } catch {
      /* ignore */
    }
    if (id) {
      const scroll = () => {
        if (serviceSlug) {
          const targetCard = document.getElementById(`service-${serviceSlug}`)
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'instant', block: 'center' })
            return
          }
        }
        if (savedScrollY && Number(savedScrollY) > 0) {
          window.scrollTo({ top: Number(savedScrollY), behavior: 'instant' })
          return
        }
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
      }
      scroll()
      requestAnimationFrame(scroll)
      const t = setTimeout(scroll, 50)
      const t2 = setTimeout(scroll, 200)
      const t3 = setTimeout(() => {
        scroll()
        try {
          sessionStorage.removeItem('returnTo')
          sessionStorage.removeItem('returnToServiceSlug')
          sessionStorage.removeItem('servicesScrollY')
        } catch { }
      }, 2500)
      return () => {
        clearTimeout(t)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    }
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
        logoUrl="/loading_logo.webp"
        menuButtonColor="#FFFFFF"
        openMenuButtonColor="#C98E7A"
        changeMenuColorOnOpen
        colors={['#4A2E1F', '#C98E7A']}
        accentColor="#C98E7A"
        heroEntrance={heroEntrance}
      />
      <main>
        <div className="stack-hero-about">
          <Hero heroEntrance={heroEntrance} />
          <About scrollTo={scrollTo} />
        </div>
        <Services />
        <WhyUs />
        <Estimate />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Home