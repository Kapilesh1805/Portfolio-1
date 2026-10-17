import { createContext, useCallback, useContext, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

/**
 * Tilted page transition.
 *
 *  forward  (home -> service, service -> next service):
 *     current page swings away to the left, new page tilts in from the right.
 *  back     (service -> home):
 *     current page swings away to the right, home tilts back in from the left.
 *
 * Use the hook instead of <Link>/navigate for the animated version:
 *     const go = useTiltNavigate()
 *     go('/services/lights')                  // forward
 *     go('/', { dir: 'back' })                // back
 *
 * The browser Back/Forward buttons also animate (direction inferred from the URL).
 * Transforms are cleared after every animation so position: sticky / fixed
 * elements behave normally while the page is at rest.
 */

const TiltContext = createContext(() => {})
export const useTiltNavigate = () => useContext(TiltContext)

const ANGLE = 34
const PERSPECTIVE = 1400
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const pose = (dir, phase) => {
  const forward = dir === 'forward'
  const away = phase === 'exit'
  // exit: forward -> left, back -> right.  enter: starts on the opposite side.
  const sign = forward === away ? -1 : 1
  return {
    rotateY: sign * ANGLE,
    rotateZ: sign * 2.5,
    x: `${sign * 14}%`,
    scale: 0.88,
    opacity: 0,
  }
}

// Perspective/rotation origin = middle of what the visitor currently sees,
// otherwise a tall page would pivot around its (off-screen) centre.
const originY = () => window.scrollY + window.innerHeight / 2

export function TiltProvider({ children }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const pageRef = useRef(null)
  const dirRef = useRef(null)
  const busyRef = useRef(false)
  const prevPath = useRef(pathname)

  const go = useCallback(
    (to, { dir = 'forward', state } = {}) => {
      const el = pageRef.current
      if (busyRef.current || !el) return
      if (prefersReducedMotion()) {
        navigate(to, { state })
        return
      }
      busyRef.current = true
      dirRef.current = dir
      gsap.to(el, {
        ...pose(dir, 'exit'),
        transformPerspective: PERSPECTIVE,
        transformOrigin: `50% ${originY()}px`,
        duration: 0.55,
        ease: 'power3.in',
        onComplete: () => {
          // Reset the tilt (keep opacity 0) BEFORE the next page renders, so scroll-based
          // measurements on that page (blur reveal, scroll restore) see an untransformed layout.
          gsap.set(el, { clearProps: 'transform,transformOrigin' })
          navigate(to, { state })
        },
      })
    },
    [navigate],
  )

  // Runs after the new route has rendered (and after the page itself restored its scroll).
  useLayoutEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    const el = pageRef.current
    const dir = dirRef.current ?? (pathname === '/' ? 'back' : 'forward')
    dirRef.current = null

    if (!el || prefersReducedMotion()) {
      busyRef.current = false
      return
    }

    gsap.fromTo(
      el,
      { ...pose(dir, 'enter'), transformPerspective: PERSPECTIVE, transformOrigin: `50% ${originY()}px` },
      {
        rotateY: 0,
        rotateZ: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'all',
        onComplete: () => {
          busyRef.current = false
        },
      },
    )
  }, [pathname])

  return (
    <TiltContext.Provider value={go}>
      <div ref={pageRef}>{children}</div>
    </TiltContext.Provider>
  )
}