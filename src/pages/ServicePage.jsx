import { useEffect, useLayoutEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { serviceAreas } from '../data/content'
import { useTiltNavigate } from '../components/animations/TiltTransition'
import Footer from '../components/Footer'

/** Remember which home section to land on when the visitor comes back. */
const rememberReturn = (id) => {
  try {
    sessionStorage.setItem('returnTo', id)
  } catch {
    /* storage can be blocked; home just opens at the top */
  }
}

function ServicePage() {
  const { slug } = useParams()
  const go = useTiltNavigate()
  const [open, setOpen] = useState(null) // index of the image in the lightbox

  const index = serviceAreas.findIndex((s) => s.slug === slug)
  const service = serviceAreas[index]
  const next = serviceAreas[(index + 1) % serviceAreas.length]

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setOpen(null)
  }, [slug])

  // Lightbox: keyboard + scroll lock
  useEffect(() => {
    if (open === null || !service) return
    const count = service.gallery.length
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % count)
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, service])

  if (!service) return <Navigate to="/" replace />

  const back = (id) => {
    rememberReturn(id)
    if (id === 'services' && slug) {
      try {
        sessionStorage.setItem('returnToServiceSlug', slug)
      } catch {
        /* ignore */
      }
    }
    go('/', { dir: 'back', targetId: id })
  }

  return (
    <div className="min-h-screen bg-section">
      {/* Glassmorphism Sticky Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-[#D7B89F]/25 bg-[#FDF8F5]/80 backdrop-blur-md transition-all duration-300">
        <div className="relative mx-auto flex h-16 sm:h-20 max-w-275 items-center justify-between px-[5vw] max-md:px-[6vw]">
          <button
            onClick={() => back('services')}
            className="group flex items-center gap-2.5 font-mono text-[.72rem] tracking-widest uppercase text-heading transition-colors hover:text-accent cursor-pointer"
            aria-label="Back to all services"
          >
            <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
            <span>All services</span>
          </button>

          <button
            onClick={() => back('services')}
            className="cursor-pointer text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 transition-opacity hover:opacity-75"
            aria-label="Balaji Interior Decors"
          >
            <span className="font-serif text-[1.05rem] sm:text-[1.35rem] font-medium tracking-tight text-heading">
              Balaji Interior Decors
            </span>
          </button>

          <div className="hidden sm:block w-[110px]" aria-hidden="true" />
        </div>
      </nav>

      <main className="px-[5vw] pb-24 pt-8 max-md:px-[6vw] max-md:pt-4">
        <header className="mx-auto mt-10 max-w-275 max-md:mt-6">
          <p className="font-mono text-[.67rem] tracking-widest uppercase text-accent">
            <span className="text-heading">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-3">/</span>
            {String(serviceAreas.length).padStart(2, '0')}
          </p>
          <h1 className="mt-6 text-[clamp(2.6rem,6vw,5.6rem)] font-medium leading-[.98] tracking-[-.045em] text-heading">
            {service.label}
          </h1>
          <p className="mt-6 max-w-130 text-[1rem] leading-[1.65] text-body">{service.blurb}</p>
        </header>

        {service.videos.length > 0 && (
          <section className="mx-auto mt-14 grid max-w-275 gap-4 sm:grid-cols-2" aria-label="Videos">
            {service.videos.map((src) => (
              <video key={src} src={src} controls playsInline muted loop className="w-full rounded-lg bg-black" />
            ))}
          </section>
        )}

        <section className="mx-auto mt-14 max-w-275 columns-1 gap-4 sm:columns-2 lg:columns-3" aria-label={`${service.label} photos`}>
          {service.gallery.map((src, i) => (
            <button
              key={src}
              onClick={() => setOpen(i)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg bg-surface/30"
              aria-label={`Open photo ${i + 1} of ${service.gallery.length}`}
            >
              <img
                src={src}
                alt={`${service.label} ${i + 1}`}
                loading={i < 2 ? 'eager' : 'lazy'}
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </section>

        <div className="mx-auto mt-16 flex max-w-275 flex-wrap items-center justify-between gap-6 border-t border-surface/40 pt-10">
          <button
            onClick={() => back('contact')}
            className="btn-primary rounded-full px-8 py-4 font-mono text-[.78rem] tracking-wider uppercase shadow-sm cursor-pointer"
          >
            Book Free Consultation
          </button>
          <button
            onClick={() => go(`/services/${next.slug}`, { dir: 'forward' })}
            className="group flex items-center gap-4 text-left text-heading transition-colors hover:text-accent cursor-pointer"
          >
            <span>
              <span className="block font-mono text-[.62rem] tracking-widest uppercase text-accent">Next service</span>
              <span className="font-serif text-[1.6rem]">{next.label}</span>
            </span>
            <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </main>

      {open !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-dark/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${service.label} photo ${open + 1} of ${service.gallery.length}`}
        >
          <img
            src={service.gallery[open]}
            alt={`${service.label} ${open + 1}`}
            className="max-h-[85vh] max-w-[92vw] rounded object-contain"
            style={{ width: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-5 top-5 text-white hover:text-accent">
            <X size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpen((i) => (i - 1 + service.gallery.length) % service.gallery.length)
            }}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpen((i) => (i + 1) % service.gallery.length)
            }}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent"
          >
            <ChevronRight size={36} />
          </button>
          <span className="absolute bottom-5 font-mono text-[.7rem] tracking-widest text-white/70">
            {open + 1} / {service.gallery.length}
          </span>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ServicePage