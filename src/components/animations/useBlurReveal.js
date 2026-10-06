import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BLUR_PX = 18

/**
 * Blur-reveal for every [data-scroll-section] on the page (after the first).
 * As a section scrolls up into view its content sharpens from a soft blur
 * into full focus, smoothly tied to scroll position while you're scrolling
 * down through it.
 *
 * This is intentionally ONE-WAY: once a section has fully come into focus,
 * that state is locked in. Scrolling back up past it never re-blurs it —
 * the blur only ever plays on the way down, the first time you reach it.
 */
export function useBlurReveal() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (reducedMotion.matches) {
      return undefined
    }

    const context = gsap.context(() => {
      const sections = gsap.utils.toArray('[data-scroll-section]')

      if (sections.length < 2) return

      const contentFor = (section) => Array.from(section.children)

      // The first section (Hero) is visible immediately — nothing to reveal.
      gsap.set(contentFor(sections[0]), { opacity: 1, filter: 'blur(0px)' })

      sections.slice(1).forEach((section) => {
        const content = contentFor(section)
        gsap.set(content, { opacity: 0, filter: `blur(${BLUR_PX}px)` })

        let revealed = false

        ScrollTrigger.create({
          trigger: section,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (revealed) return

            const progress = self.progress
            gsap.set(content, {
              opacity: progress,
              filter: `blur(${(1 - progress) * BLUR_PX}px)`,
            })

            if (progress >= 1) {
              revealed = true
              gsap.set(content, { opacity: 1, filter: 'blur(0px)' })
            }
          },
        })
      })
    })

    return () => context.revert()
  }, [])
}