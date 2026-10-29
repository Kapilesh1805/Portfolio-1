import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './LoadingScreen.css'

/**
 * Full-screen preloader with orderly pixel scattering and reassembly:
 * - Uses the Hero living room background (/hero/hero-bg.png) as the base.
 * - Starts as an orderly deconstructed matrix of floating pixel tiles.
 * - During loading (0% -> 100%), tiles sweep diagonally across the space,
 *   aligning and locking into their exact coordinates with seamless precision.
 * - As the final pixels lock into place, the loader softly dissolves and
 *   seamlessly transitions into the Hero page, with zero visual jump.
 */
function LoadingScreen({ onComplete }) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const contentRef = useRef(null)
  const logoRef = useRef(null)
  const lineRef = useRef(null)
  const [percent, setPercent] = useState(0)
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

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let animationTimeline = null
    let tiles = []
    let imgLoaded = false
    const img = new Image()
    img.src = '/hero/hero-bg.png'

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
    }

    const state = { progress: 0 }

    img.onload = () => {
      imgLoaded = true
      setupCanvas()
      render(0)

      animationTimeline = gsap.timeline({
        onComplete: () => {
          gsap
            .timeline({ onComplete: finish })
            // 1. HUD content smoothly rises and fades
            .to(contentRef.current, { opacity: 0, y: -20, duration: 0.45, ease: 'power2.in' }, 0)
            // 2. Loading screen softly reveals the Hero page (which shares the identical background)
            .to(rootRef.current, { opacity: 0, duration: 0.65, ease: 'power3.out' }, 0.15)
            .to(rootRef.current, { pointerEvents: 'none' }, 0.15)
        },
      })

      // Logo entrance
      animationTimeline
        .set(logoRef.current, { opacity: 0, scale: 0.92, y: 14 })
        .set(lineRef.current, { scaleX: 0, opacity: 0 })
        .to(logoRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: 'power3.out' }, 0.1)
        .to(lineRef.current, { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.inOut' }, '-=0.4')
        // Progress animation: smoothly assembles pixels from 0 to 1
        .to(
          state,
          {
            progress: 1,
            duration: 2.3,
            ease: 'power2.inOut',
            onUpdate: () => {
              render(state.progress)
              setPercent(Math.round(state.progress * 100))
            },
          },
          0.2
        )
        // Brief hold when fully assembled so user sees the perfected space
        .to({}, { duration: 0.35 })
    }

    // In case image is already cached
    if (img.complete && img.naturalWidth) {
      img.onload()
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
  }, [onComplete])

  if (done) return null

  return (
    <div ref={rootRef} className="loading-screen" aria-hidden="true">
      <canvas ref={canvasRef} className="loading-canvas" />

      <div ref={contentRef} className="loading-content">
        <img
          ref={logoRef}
          className="loading-mark"
          src="/loading_logo.webp"
          alt="Balaji Interior Decor"
          width="340"
        />

        <div className="loading-status-wrap">
          <div className="loading-counter">{percent}%</div>
          <div className="loading-caption">Assembling Living Interior</div>
        </div>

        <div ref={lineRef} className="loading-line" />
      </div>
    </div>
  )
}

export default LoadingScreen