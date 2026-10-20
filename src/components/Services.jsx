import { gsap } from 'gsap'
import { serviceAreas } from '../data/content'
import ServiceIcon from './ServiceIcons'
import { useTiltNavigate } from './animations/TiltTransition'

function Services() {
  const go = useTiltNavigate()

  const open = (e, slug) => {
    // let ctrl/cmd-click open a new tab normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    try {
      sessionStorage.setItem('returnTo', 'services')
    } catch {
      /* ignore */
    }
    const iconEl = e.currentTarget.querySelector('.service-icon-circle')
    if (iconEl) {
      gsap.to(iconEl, {
        rotateY: 360,
        duration: 0.45,
        ease: 'power2.inOut',
      })
    }
    go(`/services/${slug}`, { dir: 'forward' })
  }

  return (
    <section className="min-h-[100dvh] bg-section px-[5vw] py-24 max-md:px-[6vw]" id="services" data-scroll-section>
      <div className="flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-[.1em] uppercase text-accent">
        <span className="text-heading">03</span>
        <span>What we do</span>
      </div>

      <h2 className="mt-14 mb-16 text-center text-[clamp(1.8rem,3.2vw,3rem)] font-normal tracking-[-.02em] text-heading max-md:mb-10">
        End-to-End Interior Solutions
      </h2>

      {/* 5 columns x 3 rows on desktop, 3 cols on tablet, 2 on phone */}
      <div className="mx-auto grid max-w-[1100px] grid-cols-5 gap-x-6 gap-y-14 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-y-10">
        {serviceAreas.map((area) => (
          <a
            key={area.slug}
            href={`/services/${area.slug}`}
            onClick={(e) => open(e, area.slug)}
            className="group flex flex-col items-center gap-4 text-center text-heading transition-colors duration-300 hover:text-accent"
          >
            <span className="service-icon-circle relative flex h-24 w-24 items-center justify-center overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
              <span className="transition-opacity duration-300 group-hover:opacity-0">
                <ServiceIcon slug={area.slug} />
              </span>
              <img
                src={area.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </span>
            <span className="text-[.82rem] leading-tight">{area.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Services