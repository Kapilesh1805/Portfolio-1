import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './LoadingScreen.css'

const NAME = 'BALAJI'
const TAGLINE = 'INTERIOR DECORS'

/**
 * Full-screen preloader shown once on first load.
 * - A dimmed interior photo behind everything slowly zooms in (Ken Burns),
 *   so the wait itself feels like a first look at the work, not dead time.
 * - A small original line-art mark draws itself in stroke-by-stroke.
 * - The brand name letters rise into place underneath it.
 * - Two espresso panels (with the photo showing faintly through) then
 *   wipe apart to reveal the hero, which has been rendered behind the
 *   overlay the whole time - no flash, no reflow.
 * - Respects prefers-reduced-motion: skips straight to a quick fade.
 */
function LoadingScreen({ onComplete }) {
  const rootRef = useRef(null)
  const contentRef = useRef(null)
  const panelTopRef = useRef(null)
  const panelBottomRef = useRef(null)
  const logoRef = useRef(null)
  const lineRef = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.documentElement.style.scrollbarGutter = 'stable'
    document.documentElement.style.overflow = 'hidden'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finish = () => {
      document.documentElement.style.overflow = ''
      setDone(true)
      onComplete?.()
    }

    if (reduce) {
      const t = setTimeout(() => {
        gsap.to(rootRef.current, { opacity: 0, duration: 0.4, onComplete: finish })
      }, 300)
      return () => clearTimeout(t)
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.timeline({ onComplete: finish })
          // 1. Logo & line gently lift out
          .to(contentRef.current, { opacity: 0, y: -20, duration: 0.45, ease: 'power2.in' }, 0)
          // 2. Top and bottom panels wipe apart to reveal the hero section
          .to(panelTopRef.current, { yPercent: -100, duration: 0.95, ease: 'power4.inOut' }, 0.2)
          .to(panelBottomRef.current, { yPercent: 100, duration: 0.95, ease: 'power4.inOut' }, 0.2)
          .to(rootRef.current, { pointerEvents: 'none' }, 0.2)
      },
    })

    // Initial state
    tl.set(logoRef.current, { opacity: 0, scale: 0.92, y: 14 })
      .set(lineRef.current, { scaleX: 0, opacity: 0 })
      // Logo fades and gently scales in
      .to(logoRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.15)
      // Line smoothly sweeps outward from center
      .to(lineRef.current, { scaleX: 1, opacity: 1, duration: 0.85, ease: 'power2.inOut' }, '-=0.4')
      // Hold for a moment so the visitor can take in the luxury visual
      .to({}, { duration: 0.65 })

    return () => tl.kill()
  }, [onComplete])

  if (done) return null

  return (
    <div ref={rootRef} className="loading-screen" aria-hidden="true">
      <div ref={panelTopRef} className="loading-panel loading-panel--top">
        <div className="loading-panel__bg loading-panel__bg--top" />
        <div className="loading-panel__overlay" />
      </div>
      <div ref={panelBottomRef} className="loading-panel loading-panel--bottom">
        <div className="loading-panel__bg loading-panel__bg--bottom" />
        <div className="loading-panel__overlay" />
      </div>

      <div ref={contentRef} className="loading-content">
        <img
          ref={logoRef}
          className="loading-mark"
          src="/loading_logo.webp"
          alt="Balaji Interior Decor"
          width="340"
        />
        <div ref={lineRef} className="loading-line" />
      </div>
    </div>
  )
}

export default LoadingScreen