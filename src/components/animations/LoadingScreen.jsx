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
  const markRef = useRef(null)
  const lettersRef = useRef(null)
  const lineRef = useRef(null)
  const taglineRef = useRef(null)
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

    // slow background zoom runs across the whole loading sequence)
    const markPath = markRef.current?.querySelector('path')
    const letters = lettersRef.current ? Array.from(lettersRef.current.children) : []

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.timeline({ onComplete: finish })
          // 1. text leaves first
          .to(contentRef.current, { opacity: 0, y: -24, duration: 0.4, ease: 'power2.in' }, 0)
          // 2. panels part and reveal the real hero directly
          .to(panelTopRef.current, { yPercent: -100, duration: 0.95, ease: 'power4.inOut' }, 0.2)
          .to(panelBottomRef.current, { yPercent: 100, duration: 0.95, ease: 'power4.inOut' }, 0.2)
          .to(rootRef.current, { pointerEvents: 'none' }, 0.2)
      },
    })

    if (markPath) {
      const len = markPath.getTotalLength()
      tl.set(markPath, { strokeDasharray: len, strokeDashoffset: len })
        .to(markPath, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' })
    }

    tl.set(letters, { yPercent: 130, opacity: 0 }, 0.15)
      .set(lineRef.current, { scaleX: 0 }, 0.15)
      .set(taglineRef.current, { opacity: 0, y: 8 }, 0.15)
      .to(
        letters,
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.055 },
        markPath ? '-=0.55' : 0.15,
      )
      .to(lineRef.current, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.3')
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35')
      .to({}, { duration: 0.55 }) // brief hold before the reveal

    return () => tl.kill()
  }, [onComplete])

  if (done) return null

  return (
    <div ref={rootRef} className="loading-screen" aria-hidden="true">

      <div ref={panelTopRef} className="loading-panel loading-panel--top" />
      <div ref={panelBottomRef} className="loading-panel loading-panel--bottom" />

      <div ref={contentRef} className="loading-content">
        <svg
          ref={markRef}
          className="loading-mark"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* original minimal line-art: an open corner / frame motif */}
          <path
            d="M6 46V18a4 4 0 0 1 4-4h28M58 18v28a4 4 0 0 1-4 4H26M20 32a12 12 0 0 1 12-12M32 44a12 12 0 0 1-12-12"
            stroke="#b2784e"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p ref={lettersRef} className="loading-name">
          {NAME.split('').map((letter, i) => (
            <span key={i} className="loading-letter">
              {letter}
            </span>
          ))}
        </p>

        <div ref={lineRef} className="loading-line" />

        <p ref={taglineRef} className="loading-tagline">
          {TAGLINE}
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen