import React, { createContext, useCallback, useContext, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// ============================================================================
// 3D CUBE PAGE TRANSITION CONSTANTS (Powered by Framer Motion)
// ============================================================================
export const CUBE_CONFIG = {
  DURATION: 0.95, // Crisp, elegant 0.95s cube revolution
  EASING: [0.33, 1, 0.68, 1], // Smooth physical momentum cubic-bezier
  SCALE_DIP: 0.86, // Subtle scale-back at mid-turn to reveal 3D cube depth
  BACKGROUND: '#1A110B', // Luxury dark backdrop behind the rotating cube
}

export const GLOBE_CONFIG = CUBE_CONFIG
export const MOBILE_GLOBE_CONFIG = CUBE_CONFIG

/**
 * DIRECTION RULES:
 * - Leaving Services (/ or /services -> detail page): cube turns LEFT TO RIGHT.
 * - Arriving at Services (detail page -> / or /services): cube turns RIGHT TO LEFT.
 * - Any other transition: default to LEFT TO RIGHT.
 */
export function getCubeTurnDirection(fromPath, toPath) {
  const isServicesPage = (path) =>
    path === '/' ||
    path === '/services' ||
    path?.startsWith('/services#') ||
    path?.startsWith('/#services')

  const isDetail = (path) => path?.startsWith('/services/') && path !== '/services'

  // Arriving at Services from a detail page: turns RIGHT TO LEFT
  if (isServicesPage(toPath) && isDetail(fromPath)) {
    return 'RIGHT_TO_LEFT'
  }

  // Leaving Services for detail: turns LEFT TO RIGHT
  if (isServicesPage(fromPath)) {
    return 'LEFT_TO_RIGHT'
  }

  return 'LEFT_TO_RIGHT'
}

export const getGlobeTurnDirection = getCubeTurnDirection

const PageTransitionContext = createContext(() => {})
export const usePageTransitionNavigate = () => useContext(PageTransitionContext)
export const useTiltNavigate = usePageTransitionNavigate
export const useGlobeNavigate = usePageTransitionNavigate
export const useCubeNavigate = usePageTransitionNavigate

/**
 * CubeTransitionStage:
 * Authentic geometric 3D Cube transition.
 * The outgoing and incoming pages form two solid faces of a 3D cube meeting at
 * an exact 90-degree right angle (NO rounded paper edges or bending).
 * The entire cube parent rotates rigidly around its center axis.
 */
function CubeTransitionStage({ transitionData, children, onComplete }) {
  const { fromLocation, toLocation, direction, outgoingScrollY, incomingScrollY } = transitionData
  const turnsLeftToRight = direction === 'LEFT_TO_RIGHT'

  const [halfWidth, setHalfWidth] = useState(() =>
    typeof window !== 'undefined' ? Math.round(window.innerWidth / 2) : 600
  )

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setHalfWidth(Math.round(window.innerWidth / 2))
    }
  }, [])

  // In CSS 3D, center of rotation for a cube of width W is at Z = -halfWidth
  const cubeCenter = `50% 50% -${halfWidth}px`
  const perspective = Math.max(1400, halfWidth * 2.4)

  // LEFT_TO_RIGHT (Entering each service):
  // - Parent cube rotates 0 -> -90deg
  // - Incoming Face starts at +90deg (on the right) and swings into front view (0deg)
  // RIGHT_TO_LEFT (Returning to All services):
  // - Parent cube rotates 0 -> +90deg
  // - Incoming Face starts at -90deg (on the left) and swings into front view (0deg)
  const targetCubeRotation = turnsLeftToRight ? -90 : 90
  const incomingStartAngle = turnsLeftToRight ? 90 : -90

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-100 overflow-hidden select-none pointer-events-none"
      style={{
        width: '100vw',
        height: '100vh',
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%',
        backgroundColor: CUBE_CONFIG.BACKGROUND,
      }}
    >
      {/* SOLID 3D CUBE CONTAINER */}
      <motion.div
        className="relative h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: cubeCenter,
        }}
        initial={{
          rotateY: 0,
          scale: 1,
        }}
        animate={{
          rotateY: targetCubeRotation,
          scale: [1, CUBE_CONFIG.SCALE_DIP, 1],
        }}
        transition={{
          duration: CUBE_CONFIG.DURATION,
          ease: CUBE_CONFIG.EASING,
        }}
        onAnimationComplete={onComplete}
      >
        {/* FACE 1: FRONT (Outgoing Page) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: '#FDF8F5',
            transform: 'rotateY(0deg)',
            transformOrigin: cubeCenter,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: '0 0 80px rgba(0, 0, 0, 0.55)',
          }}
        >
          <div style={{ transform: `translateY(-${outgoingScrollY}px)` }} className="w-full">
            {React.isValidElement(children)
              ? React.cloneElement(children, { location: fromLocation })
              : children}
          </div>
          {/* Dynamic face shadow as front face turns into depth */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            transition={{ duration: CUBE_CONFIG.DURATION, ease: 'easeIn' }}
            className="pointer-events-none absolute inset-0 bg-black/60"
          />
        </div>

        {/* FACE 2: ADJACENT (Incoming Page) - Locked at an exact 90-degree cube corner */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: '#FDF8F5',
            transform: `rotateY(${incomingStartAngle}deg)`,
            transformOrigin: cubeCenter,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: '0 0 80px rgba(0, 0, 0, 0.55)',
          }}
        >
          <div style={{ transform: `translateY(-${incomingScrollY}px)` }} className="w-full">
            {React.isValidElement(children)
              ? React.cloneElement(children, { location: toLocation })
              : children}
          </div>
          {/* Dynamic face shadow clears as incoming face swings into camera front */}
          <motion.div
            initial={{ opacity: 0.65 }}
            animate={{ opacity: 0 }}
            transition={{ duration: CUBE_CONFIG.DURATION, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 bg-black/60"
          />
        </div>
      </motion.div>
    </div>
  )
}

/**
 * PageTransition:
 * Wraps routes and manages the Framer Motion 3D Globe-Turn transition.
 * Uses frozen location cloning so destination pages NEVER flash prematurely.
 */
export function PageTransition({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  // Frozen active location that controls what is rendered in normal view
  const [activeLocation, setActiveLocation] = useState(location)
  const [transitionData, setTransitionData] = useState(null)

  const busyRef = useRef(false)
  const prevPathRef = useRef(location.pathname)
  const lastHomeScrollY = useRef(0)

  // Track scroll position on the home page
  useLayoutEffect(() => {
    if (location.pathname === '/') {
      const onScroll = () => {
        if (!busyRef.current) {
          lastHomeScrollY.current = window.scrollY
          try {
            const servicesEl = document.getElementById('services')
            if (servicesEl) {
              sessionStorage.setItem('servicesOffsetTop', String(servicesEl.offsetTop))
            }
          } catch {
            /* ignore */
          }
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [location.pathname])

  // Explicit programmatic navigation helper
  const go = useCallback(
    (to, { dir, state, targetId } = {}) => {
      if (busyRef.current) return

      if (targetId) {
        try {
          sessionStorage.setItem('returnTo', targetId)
        } catch {
          /* ignore */
        }
      }

      if (location.pathname === '/') {
        lastHomeScrollY.current = window.scrollY
        try {
          sessionStorage.setItem('servicesScrollY', String(window.scrollY))
          const servicesEl = document.getElementById('services')
          if (servicesEl) {
            sessionStorage.setItem('servicesOffsetTop', String(servicesEl.offsetTop))
          }
        } catch {
          /* ignore */
        }
      }

      navigate(to, { state })
    },
    [location.pathname, navigate],
  )

  // Detect route changes and initiate Globe-Turn animation
  useLayoutEffect(() => {
    const fromPath = prevPathRef.current
    const toPath = location.pathname

    if (fromPath === toPath) {
      if (!transitionData && !busyRef.current) {
        setActiveLocation(location)
      }
      return
    }

    // Route changed!
    prevPathRef.current = toPath

    // Check reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setActiveLocation(location)
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    busyRef.current = true

    const direction = getGlobeTurnDirection(fromPath, toPath)
    const outgoingScrollY = window.scrollY

    // Strict detection: returning from a service page to Home always targets Services
    const isReturningToServices =
      (fromPath?.startsWith('/services/') && toPath === '/') ||
      (toPath === '/' && sessionStorage.getItem('returnTo') === 'services')

    let incomingScrollY = 0
    if (toPath === '/') {
      if (isReturningToServices) {
        let savedTop = 0
        try {
          savedTop =
            Number(sessionStorage.getItem('servicesScrollY')) ||
            Number(sessionStorage.getItem('servicesOffsetTop')) ||
            0
        } catch {
          /* ignore */
        }
        incomingScrollY = savedTop || lastHomeScrollY.current || 2000
      } else {
        incomingScrollY = 0
      }
    }

    setTransitionData({
      fromLocation: activeLocation, // Frozen previous location: guarantees NO flash
      toLocation: location,         // Target location
      direction,
      outgoingScrollY,
      incomingScrollY,
      isReturningToServices,
    })
  }, [location.pathname])

  return (
    <PageTransitionContext.Provider value={go}>
      {/* Normal view: renders with activeLocation so destination page NEVER flashes early */}
      {!transitionData && (
        <div className="w-full">
          {React.isValidElement(children)
            ? React.cloneElement(children, { location: activeLocation })
            : children}
        </div>
      )}

      {/* 3D Cube Transition Stage powered by Framer Motion */}
      {transitionData && (
        <CubeTransitionStage
          transitionData={transitionData}
          children={children}
          onComplete={() => {
            const { toLocation, isReturningToServices, incomingScrollY } = transitionData
            setActiveLocation(toLocation)
            setTransitionData(null)
            busyRef.current = false

            // Scroll restoration: target clicked service card directly
            const restore = () => {
              if (isReturningToServices) {
                let serviceSlug = null
                let savedScrollY = null
                try {
                  serviceSlug = sessionStorage.getItem('returnToServiceSlug')
                  savedScrollY = Number(sessionStorage.getItem('servicesScrollY'))
                } catch {}

                if (serviceSlug) {
                  const targetCard = document.getElementById(`service-${serviceSlug}`)
                  if (targetCard) {
                    targetCard.scrollIntoView({ behavior: 'instant', block: 'center' })
                    return
                  }
                }

                if (savedScrollY && savedScrollY > 0) {
                  window.scrollTo({ top: savedScrollY, behavior: 'instant' })
                  return
                }

                const el = document.getElementById('services')
                if (el) {
                  el.scrollIntoView({ behavior: 'instant', block: 'start' })
                } else if (incomingScrollY > 0) {
                  window.scrollTo({ top: incomingScrollY, behavior: 'instant' })
                }
              } else {
                window.scrollTo({ top: 0, behavior: 'instant' })
              }
            }

            restore()
            requestAnimationFrame(restore)
            setTimeout(restore, 40)
            setTimeout(restore, 120)
          }}
        />
      )}
    </PageTransitionContext.Provider>
  )
}

export const TiltProvider = PageTransition
export default PageTransition
