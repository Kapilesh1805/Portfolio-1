import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './LoadingScreen.css'

/**
 * Full-screen preloader with orderly pixel scattering and reassembly:
 * - Uses the Hero living room background (/hero/hero-bg.png) as the base.
 * - Starts as an orderly deconstructed matrix of floating pixel tiles.
 * - As pixels arrange, the Balaji logo glows in the center.
 * - Once fully arranged, the center logo smoothly transitions directly to its
 *   destination in the top-left of the Hero page header.
 * - Concurrently, onStartTransition notifies the Hero page to reveal its text,
 *   achieving a seamless cinematic transition with zero visual jump and no blank screen.
 */
function LoadingScreen({ onStartTransition, onComplete }) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const logoWrapRef = useRef(null)
  const logoRef = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.documentElement.style.scrollbarGutter = 'stable'
    document.documentElement.style.overflow = 'hidden'

    const finish = () => {
      document.documentElement.style.overflow = ''
      setDone(true)
      onComplete?.()
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let animationTimeline = null
    let tiles = []
    let imgLoaded = false
    const img = new Image()

    const setupCanvas = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (!imgLoaded) return

      const imgW = img.naturalWidth || 1920
      const imgH = img.naturalHeight || 1080

      // Match Hero.jsx object-cover object-[center_55%] md:object-[center_60%]
      const canvasRatio = W / H
      const imgRatio = imgW / imgH
      let renderW, renderH, offsetX, offsetY

      if (canvasRatio > imgRatio) {
        renderW = W
        renderH = W / imgRatio
        offsetX = 0
        offsetY = (H - renderH) * (W > 768 ? 0.6 : 0.55)
      } else {
        renderH = H
        renderW = H * imgRatio
        offsetX = (W - renderW) * 0.5
        offsetY = 0
      }

      // Responsive grid: architectural pixel blocks
      const cols = W > 1200 ? 24 : W > 768 ? 18 : 12
      const rows = Math.round(cols * (H / W))
      const tileW = W / cols
      const tileH = H / rows

      tiles = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const targetX = c * tileW
          const targetY = r * tileH

          // Order-wise diagonal wave progression (sweeps from top-left to bottom-right)
          const order = (c / cols) * 0.62 + (r / rows) * 0.38

          // Structured geometric dispersal ("scattered order wise"):
          // Alternating interlaced grid displacements with wave offset
          const colDir = c % 2 === 0 ? 1 : -1
          const rowDir = r % 2 === 0 ? 1 : -1
          const wavePhase = Math.sin((c * 0.8 + r * 1.2) * Math.PI) * 28

          const scatterX = targetX + rowDir * (tileW * 0.55) + Math.cos(((c * 24 + r * 36) % 360) * (Math.PI / 180)) * 32
          const scatterY = targetY + colDir * (tileH * 0.65) + wavePhase
          const scatterScale = 0.74 + ((c + r) % 3) * 0.08
          const scatterRot = (((c * 5 + r * 7) % 5) - 2) * 0.045 // subtle, clean architectural tilt

          // Source slice on /hero/hero-bg.png
          const sx = (targetX - offsetX) * (imgW / renderW)
          const sy = (targetY - offsetY) * (imgH / renderH)
          const sw = tileW * (imgW / renderW)
          const sh = tileH * (imgH / renderH)

          tiles.push({
            c,
            r,
            targetX,
            targetY,
            tileW: tileW + 0.65, // prevent subpixel hairline seams once locked
            tileH: tileH + 0.65,
            sx,
            sy,
            sw,
            sh,
            scatterX,
            scatterY,
            scatterScale,
            scatterRot,
            startTime: order * 0.54,
            duration: 0.42,
          })
        }
      }
    }

    const render = (progress) => {
      const W = window.innerWidth
      const H = window.innerHeight
      ctx.clearRect(0, 0, W, H)

      // Base background color while assembling
      ctx.fillStyle = '#160D08'
      ctx.fillRect(0, 0, W, H)

      if (!imgLoaded || tiles.length === 0) return

      // Draw faint architectural blueprint grid dots on slots not yet assembled
      if (progress < 0.95) {
        ctx.fillStyle = 'rgba(201, 142, 122, 0.16)'
        for (let i = 0; i < tiles.length; i++) {
          const t = tiles[i]
          if (progress < t.startTime + t.duration * 0.7) {
            ctx.fillRect(t.targetX + t.tileW * 0.5 - 1.5, t.targetY + t.tileH * 0.5 - 1.5, 3, 3)
          }
        }
      }

      // Draw all tiles based on current progress
      for (let i = 0; i < tiles.length; i++) {
        const t = tiles[i]
        const localP = (progress - t.startTime) / t.duration

        if (localP >= 1) {
          // Fully assembled in place: clean draw with slight bleed to avoid seams
          ctx.drawImage(img, t.sx, t.sy, t.sw, t.sh, t.targetX, t.targetY, t.tileW, t.tileH)
        } else {
          // Scattered or currently in motion
          const pClamped = Math.max(0, localP)
          // easeOutCubic curve for smooth glide
          const ease = 1 - Math.pow(1 - pClamped, 3)

          const curX = t.scatterX + (t.targetX - t.scatterX) * ease
          const curY = t.scatterY + (t.targetY - t.scatterY) * ease
          const curScale = t.scatterScale + (1 - t.scatterScale) * ease
          const curRot = t.scatterRot * (1 - ease)
          const curAlpha = 0.35 + 0.65 * ease

          ctx.save()
          ctx.globalAlpha = curAlpha
          ctx.translate(curX + t.tileW / 2, curY + t.tileH / 2)
          if (curRot !== 0) ctx.rotate(curRot)
          if (curScale !== 1) ctx.scale(curScale, curScale)

          // Soft ambient tile shadow while floating
          if (pClamped < 0.9) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.65)'
            ctx.shadowBlur = 12 * (1 - pClamped)
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = 6 * (1 - pClamped)
          }

          ctx.drawImage(
            img,
            t.sx,
            t.sy,
            t.sw,
            t.sh,
            -t.tileW / 2,
            -t.tileH / 2,
            t.tileW,
            t.tileH
          )

          // Architectural pixel border while scattered/in motion
          if (pClamped < 0.92) {
            ctx.shadowColor = 'transparent'
            ctx.strokeStyle = `rgba(201, 142, 122, ${0.28 + (1 - pClamped) * 0.45})`
            ctx.lineWidth = 1
            ctx.strokeRect(-t.tileW / 2, -t.tileH / 2, t.tileW, t.tileH)
          } else if (pClamped < 1) {
            // Golden precision snap flash right as it locks
            const snapFlash = (1 - (pClamped - 0.92) / 0.08) * 0.65
            ctx.strokeStyle = `rgba(255, 230, 185, ${snapFlash})`
            ctx.lineWidth = 1.5
            ctx.strokeRect(-t.tileW / 2, -t.tileH / 2, t.tileW, t.tileH)
          }

          ctx.restore()
        }
      }

      // Replicate the exact multi-tier dark gradient overlay matching Hero.jsx
      const grad = ctx.createLinearGradient(0, 0, 0, H)
      grad.addColorStop(0, 'rgba(22, 13, 8, 0.78)')
      grad.addColorStop(0.4, 'rgba(22, 13, 8, 0.38)')
      grad.addColorStop(1, 'rgba(22, 13, 8, 0.82)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      const radialGrad = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.2, W / 2, H / 2, Math.max(W, H) * 0.75)
      radialGrad.addColorStop(0, 'rgba(22, 13, 8, 0)')
      radialGrad.addColorStop(1, 'rgba(22, 13, 8, 0.55)')
      ctx.fillStyle = radialGrad
      ctx.fillRect(0, 0, W, H)
    }

    const state = { progress: 0 }

    const startAnimation = () => {
      animationTimeline = gsap.timeline({
        onComplete: () => {
          // 1. Measure target header logo destination (.sm-logo-img or .sm-logo)
          const targetEl = document.querySelector('.sm-logo-img') || document.querySelector('.sm-logo')
          const currentEl = logoRef.current
          const canvasEl = canvasRef.current

          let dx = 0
          let dy = 0
          let scale = 0.32

          if (currentEl) {
            const currentRect = currentEl.getBoundingClientRect()
            if (targetEl) {
              const targetRect = targetEl.getBoundingClientRect()
              if (targetRect.height > 0) {
                dx = targetRect.left - currentRect.left
                dy = targetRect.top - currentRect.top
                scale = targetRect.height / currentRect.height
              }
            }
            if (dx === 0 && dy === 0) {
              const isMobile = window.innerWidth <= 640
              const targetX = isMobile ? 16 : 24
              const targetY = isMobile ? 14 : 20
              const targetH = isMobile ? 38 : 90
              dx = targetX - currentRect.left
              dy = targetY - currentRect.top
              scale = targetH / currentRect.height
            }
          }

          const exitTl = gsap.timeline({
            onComplete: () => {
              // Seamless handoff: reveal header logo and trigger text entrance
              if (targetEl) {
                targetEl.style.opacity = '1'
              }
              // Logo is now in position in top-left -> trigger text entrance
              onStartTransition?.()
              finish()
            },
          })

          // Cross-fade the canvas immediately into the identical Hero background (0.35s)
          exitTl.to(
            canvasEl,
            {
              opacity: 0,
              duration: 0.35,
              ease: 'power2.out',
            },
            0
          )

          // Smoothly glide the logo to the exact top-left position (0.8s)
          exitTl.to(
            currentEl,
            {
              x: dx,
              y: dy,
              scale: scale,
              transformOrigin: '0 0',
              duration: 0.8,
              ease: 'power3.inOut',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
            },
            0
          )
        },
      })

      // Logo entrance & pixel assembly
      animationTimeline
        .set(logoRef.current, { opacity: 0, scale: 0.94, y: 12 })
        .to(logoRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.1)
        .to(
          state,
          {
            progress: 1,
            duration: 1.85,
            ease: 'power2.inOut',
            onUpdate: () => {
              render(state.progress)
            },
          },
          0.15
        )
        // Brief hold when fully assembled so user sees the perfected space
        .to({}, { duration: 0.18 })
    }

    const start = () => {
      if (imgLoaded) return
      imgLoaded = true
      setupCanvas()
      render(0)
      startAnimation()
    }

    img.onload = start
    img.src = '/hero/hero-bg.png'

    if (img.complete && img.naturalWidth) {
      start()
    }

    const handleResize = () => {
      setupCanvas()
      render(state.progress)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationTimeline) animationTimeline.kill()
    }
  }, [onStartTransition, onComplete])

  if (done) return null

  return (
    <div ref={rootRef} className="loading-screen" aria-hidden="true">
      <canvas ref={canvasRef} className="loading-canvas" />

      <div ref={logoWrapRef} className="loading-logo-wrap">
        <img
          ref={logoRef}
          className="loading-mark"
          src="/loading_logo.webp"
          alt="Balaji Interior Decor"
        />
      </div>
    </div>
  )
}

export default LoadingScreen