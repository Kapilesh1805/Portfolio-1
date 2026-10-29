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
      sessionStorage.setItem('returnToServiceSlug', slug)
      sessionStorage.setItem('servicesScrollY', String(window.scrollY))
      const sec = document.getElementById('services')
      if (sec) sessionStorage.setItem('servicesOffsetTop', String(sec.offsetTop))
    } catch {
      /* ignore */
    }
    go(`/services/${slug}`, { dir: 'forward' })
  }

  return (
    <section className="min-h-screen bg-section px-[5vw] py-20 md:py-24 max-md:px-[6vw]" id="services" data-scroll-section>
      <div className="flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-widest uppercase text-accent">
        <span className="text-heading">02</span>
        <span>What we do</span>
      </div>

      <h2 className="mt-14 mb-16 text-center text-[clamp(1.8rem,3.2vw,3rem)] font-normal tracking-[-.02em] text-heading max-md:mb-10">
        End-to-End Interior Solutions
      </h2>

      {/* 5 columns x 3 rows on desktop, 3 cols on tablet, 2 on phone (with last item centered on mobile) */}
      <div className="mx-auto grid max-w-275 grid-cols-5 gap-x-6 gap-y-14 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-y-10">
        {serviceAreas.map((area) => (
          <a
            key={area.slug}
            id={`service-${area.slug}`}
            href={`/services/${area.slug}`}
            onClick={(e) => open(e, area.slug)}
            className="group flex flex-col items-center gap-4 text-center text-heading transition-colors duration-300 hover:text-accent max-sm:last:col-span-2 max-sm:last:mx-auto max-sm:last:w-full"
          >
            {/* 3D Rotating Earth Tile */}
            <div className="relative h-24 w-24 [perspective:900px]">
              <div className="service-tile-flipper relative h-full w-full rounded-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-sm">
                {/* Front face: Icon */}
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white border border-surface/40 [backface-visibility:hidden] shadow-sm">
                  <ServiceIcon slug={area.slug} />
                </div>
                {/* Back face: Room Photo */}
                <div className="absolute inset-0 overflow-hidden rounded-full border-2 border-accent/50 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-sm">
                  <img
                    src={area.image}
                    alt={area.label}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <span className="text-[.82rem] leading-tight font-medium">{area.label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Services