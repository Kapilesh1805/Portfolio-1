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

const PERSPECTIVE = 1200
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

      const scrollY = window.scrollY || window.pageYOffset || 0

      // Lock only the visible 100vh viewport before rotating to prevent GPU lag on tall pages
      gsap.set(el, {
        position: 'fixed',
        top: `-${scrollY}px`,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        transformPerspective: PERSPECTIVE,
        transformOrigin: '50% 50%',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      })

      // 360 flip Phase 1: rotate 180 degrees away smoothly
      gsap.to(el, {
        rotateY: dir === 'forward' ? -180 : 180,
        scale: 0.9,
        opacity: 0,
        duration: 0.42,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(el, { clearProps: 'all' })
          navigate(to, { state })
        },
      })
    },
    [navigate],
  )

  // 360 flip Phase 2: complete the 360 degree rotation into the new page smoothly
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
      {
        rotateY: dir === 'forward' ? 180 : -180,
        scale: 0.9,
        opacity: 0,
        transformPerspective: PERSPECTIVE,
        transformOrigin: '50% 50%',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      },
      {
        rotateY: 0,
        scale: 1,
        opacity: 1,
        duration: 0.48,
        ease: 'power2.out',
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