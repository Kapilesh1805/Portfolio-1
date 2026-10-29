import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star, CheckCircle2, Camera, X, Maximize2 } from 'lucide-react'
import LogoLoop from './animations/LogoLoop'
import FoldText from './animations/FoldText'

// Real Google Reviews for Balaji Interior Decor with client photos
const googleReviews = [
  {
    name: 'Faritha Banu M',
    badge: 'Local Guide · 3 reviews · 26 photos',
    time: '2 years ago',
    rating: 5,
    tag: 'Villa TV Unit & Partition Wall',
    headline: 'Great choice for our villa — eye-catching TV unit, partition wall, and dependable touch-up support.',
    content:
      'Balaji Interior Decor was a great choice for our villa. They did a wonderful job with the design and color choices, especially the TV unit and partition wall, which are eye-catching. The woodworks used high-quality materials. The designer was cooperative, fabulous, and maintained professionalism throughout the project. He remains responsive and ready for any touch-up work.',
    photos: [
      {
        src: '/reviews/faritha/villa-tv-unit-shelving.jpg',
        caption: 'Custom Villa TV Entertainment Unit with Ambient Backlighting & Display Niches',
      },
      {
        src: '/reviews/faritha/villa-dining-living-partition.jpg',
        caption: 'Open-Concept Dining & Living Villa Interior with Bar Partition Unit',
      },
      {
        src: '/reviews/faritha/contemporary-kitchen-chimney.jpg',
        caption: 'Contemporary Modular Kitchen with Fluted Glass Cabinets & Stainless Chimney',
      },
      {
        src: '/reviews/faritha/bedroom-wardrobe-doorway-lofts.jpg',
        caption: 'Full-Wall Bedroom Wardrobe with Integrated Dressing Mirror & Overhead Lofts',
      },
      {
        src: '/reviews/faritha/modular-wardrobe-open-lofts.jpg',
        caption: 'Custom Walk-Through Modular Wardrobe with Accent Wallpaper & Top Lofts',
      },
      {
        src: '/reviews/faritha/bedroom-wardrobe-wallpaper.jpg',
        caption: 'Minimalist Dual-Tone Wardrobe Layout with Textured Botanical Accent Wall',
      },
    ],
  },
  {
    name: 'Vatsala Manohar',
    badge: '12 reviews · 7 photos',
    time: '1 year ago',
    rating: 5,
    tag: 'Cabinets & Custom Woodwork',
    headline: 'The craftsmanship is impeccable, every joint seamless, and the finish is flawless.',
    content:
      "The quality of Mr. Balaji's work is outstanding; he paid great attention to details and ensured that everything was perfectly aligned and done. All the interior works with cabinets look so beautiful, that it transformed my home with an aesthetic look. He also helped me choose materials that fit my budget while still achieving a high-end look.\n\nFrom our initial consultation, Mr. Balaji was very attentive and genuinely interested in bringing my vision to life, providing insightful suggestions that enhanced my original ideas. The team completed the project ahead of schedule and maintained a clean environment throughout the installation process. I highly recommend Mr. Balaji and team for high quality wood-works.",
    photos: [
      {
        src: '/reviews/vatsala/display-showcase-fluted-wood.jpg',
        caption: 'Illuminated Curio Showcase with Warm Backlighting & Fluted Wood Accents',
      },
      {
        src: '/reviews/vatsala/crockery-pantry-cabinet.jpg',
        caption: 'Crockery Unit & Dining Pantry with Vertical Fluted Wood & Marble Splash',
      },
      {
        src: '/reviews/vatsala/pooja-mandir-bells-jali.png',
        caption: 'Custom Pooja Mandir with Intricate CNC Jali & Traditional Brass Bells Motif',
      },
      {
        src: '/reviews/vatsala/modular-kitchen-chimney.jpg',
        caption: 'L-Shaped Modular Kitchen with High-Gloss Acrylic Cabinets & Chimney',
      },
      {
        src: '/reviews/vatsala/glossy-kitchen-drawers.png',
        caption: 'Sleek Base Cabinets with Louvre Ventilation & Soft-Close Tandem Drawers',
      },
    ],
  },
  {
    name: 'Mouliswaran S',
    badge: '1 review · 7 photos',
    time: '5 months ago',
    rating: 5,
    tag: 'Complete House Interiors',
    headline: 'Heartfully worth the money spent — quality and finishing exceeded my expectations.',
    content:
      'I recently got my house interiors done by Balaji, and I’m extremely happy with the outcome. His work is truly awesome and every detail was designed with great creativity and perfection. The entire process was smooth, professional, and completed with care and dedication. Most importantly, the work was heartfully worth the money spent. The quality, finishing, and overall design exceeded my expectations. I would highly recommend Balaji to anyone looking for beautiful and budget-worthy interior design work.',
    photos: [
      {
        src: 'https://lh3.googleusercontent.com/grass-cs/AABkmLce_c_m5PFFI2cBMk_FsguE_87OttKVpx32wQAhVEn5lYRkZM8iJlMbk77gNQ5xlCncixHVlNXdlZCE3PXta-J9v4IOj-MT0zfqoQAsssAiL3K0v24Ky7V_R7ek59LRtkqQzFcqUsaovWXs=s1600-rw',
        caption: 'Full-Height Master Bedroom Wardrobe & Top Lofts',
      },
      {
        src: '/reviews/mouliswaran/wardrobe-loft-1.png',
        caption: 'Black & White Textured Wardrobe with Full-Length Dressing Mirror',
      },
      {
        src: '/reviews/mouliswaran/wardrobe-loft-2.png',
        caption: 'Corner Wardrobe Architecture with Geometric Dual-Tone Panels',
      },
      {
        src: '/reviews/mouliswaran/bedroom-interior-3.png',
        caption: 'Bedroom Wall Storage & Finished Ceiling Detailing',
      },
      {
        src: '/reviews/mouliswaran/modular-kitchen-4.png',
        caption: 'Complete Modular Kitchen Layout with Upper & Lower Units',
      },
      {
        src: '/reviews/mouliswaran/kitchen-cabinets-5.png',
        caption: 'Customized Under-Counter Storage & Modular Hardware',
      },
    ],
  },
  {
    name: 'Balaji A.I.',
    badge: 'Verified Client · 3 photos',
    time: 'Google Review',
    rating: 5,
    tag: 'Innovative Custom Interiors',
    headline: 'Innovative, creative, and good finishing — they satisfied our dream on stipulated time at a reasonable price.',
    content:
      'Balaji interiors works so much innovative, creativity and good finishing. Especially they satisfy customers dream and finished work on stipulated time. Price was much reasonable compared to other interior decors. All works and owner are pleasing. Enclosed photos of their works for perusal.\n\nThank you sir.',
    photos: [
      {
        src: '/reviews/balaji-ai/full-wall-wardrobe-dresser.png',
        caption: 'Full-Wall 6-Door Wardrobe with Overhead Lofts & Integrated Dressing Mirror with Drawers',
      },
      {
        src: '/reviews/balaji-ai/grand-pooja-mandir-crockery.png',
        caption: 'Grand Living Room Wall Unit with Custom CNC Jali Pooja Mandir & Glass Crockery Cabinets',
      },
      {
        src: '/reviews/balaji-ai/calacatta-marble-tv-console.png',
        caption: 'Calacatta Marble Feature Wall Panel with Gold Metallic Inlays & Floating Black Marble Console',
      },
    ],
  },
  {
    name: 'Arul P',
    badge: 'Verified Client · 4 photos',
    time: 'Google Review',
    rating: 5,
    tag: 'TV Unit & False Ceiling',
    headline: 'Fully satisfied with the TV unit & false ceiling work — recommended to all my friends!',
    content:
      'I approached the work for TV Unit and false ceiling, I fully satisfied with the work. I was so happy to give the review for this work. I recommend to my friends also. Thank you to Balaji Interior Decor.',
    photos: [
      {
        src: '/reviews/arul/tv-unit-ambient-backlight.jpg',
        caption: 'Living Room TV Unit with Warm Ambient Backlighting & Floating White Console',
      },
      {
        src: '/reviews/arul/tv-wall-fluted-marble-panel.jpg',
        caption: 'TV Feature Wall with Warm Teak Laminate, Fluted Wood & Marble Detailing',
      },
      {
        src: '/reviews/arul/false-ceiling-blue-cove-full.png',
        caption: 'Dual Fan False Ceiling with Ambient Blue Cove Neon Glow & Peripheral Warm Troughs',
      },
      {
        src: '/reviews/arul/designer-false-ceiling-lighting.png',
        caption: 'Designer Geometric False Ceiling with Recessed Warm Spotlights',
      },
    ],
  },
  {
    name: 'Subramanian Ganesan',
    badge: 'Local Guide · 115 reviews · 248 photos',
    time: '2 years ago',
    rating: 5,
    tag: '15-Year Longstanding Client',
    headline: 'We know Balaji Interior for 15 years and the quality of their work is always amazing.',
    content:
      'We know Balaji Interior for 15 years and the quality of their work is always amazing. Always friendly with high quality materials they used to build the products they provided on time. He has the fantastic team and they work very hard to achieve the quality product. Many thanks to Balaji Sir and I strongly recommend him for any such type of interior works.',
    photos: [
      {
        src: '/reviews/subramanian/foyer-radha-krishna-swing.jpg',
        caption: 'Custom Foyer Wall Feature with Radha Krishna Swing Art & Warm Spotlight Paneling',
      },
      {
        src: '/reviews/subramanian/bedroom-wardrobe-dresser.jpg',
        caption: 'Horizontal Zebra-Grain Master Wardrobe with Integrated Full-Length Dresser & Ceiling Lofts',
      },
      {
        src: '/reviews/subramanian/washbasin-vanity-moroccan.jpg',
        caption: 'Washbasin Vanity Unit with Earth-Tone Marble Laminate & Moroccan Tile Backsplash',
      },
      {
        src: '/reviews/subramanian/dual-tone-wardrobe-lofts.jpg',
        caption: 'Textured Dual-Tone Bedroom Wardrobes with Deep Wood Overhead Lofts',
      },
      {
        src: '/reviews/subramanian/continuous-overhead-lofts.jpg',
        caption: 'Continuous Wrap-Around Deep Cherry Wood Ceiling Storage Units',
      },
      {
        src: '/reviews/subramanian/gloss-marble-wardrobe.jpg',
        caption: '3-Door High-Gloss Marble Textured Wardrobe with Chrome Handles',
      },
    ],
  },
]

const getPhotoSrc = (p) => (typeof p === 'string' ? p : p.src)
const getPhotoCaption = (p) => (typeof p === 'string' ? '' : p.caption || '')

function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activePhotoIdx, setActivePhotoIdx] = useState(null)
  const pointerStartPos = useRef({ x: 0, y: 0 })
  const dragDistanceRef = useRef(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const safeIndex = activeIndex < googleReviews.length ? activeIndex : 0
  const current = googleReviews[safeIndex] || googleReviews[0]

  const nextReview = () => {
    setActivePhotoIdx(null)
    setActiveIndex((prev) => (prev + 1) % googleReviews.length)
  }

  const prevReview = () => {
    setActivePhotoIdx(null)
    setActiveIndex((prev) => (prev - 1 + googleReviews.length) % googleReviews.length)
  }

  const handleReviewTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleReviewTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current
    // Dominant horizontal swipe (>40px)
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        nextReview()
      } else {
        prevReview()
      }
    }
  }

  const openLightbox = (pIdx) => setActivePhotoIdx(pIdx)
  const closeLightbox = () => setActivePhotoIdx(null)

  const nextPhoto = useCallback(() => {
    if (!current?.photos || current.photos.length === 0) return
    setActivePhotoIdx((prev) => (prev + 1) % current.photos.length)
  }, [current?.photos])

  const prevPhoto = useCallback(() => {
    if (!current?.photos || current.photos.length === 0) return
    setActivePhotoIdx((prev) => (prev - 1 + current.photos.length) % current.photos.length)
  }, [current?.photos])

  const photoLogos = useMemo(() => {
    if (!current?.photos) return []
    return current.photos.map((item, pIdx) => {
      const src = getPhotoSrc(item)
      const caption = getPhotoCaption(item)
      return {
        src,
        alt: caption || `${current.name} project photo ${pIdx + 1}`,
        title: caption || `${current.name} project photo ${pIdx + 1}`,
        onClick: () => openLightbox(pIdx),
      }
    })
  }, [current])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activePhotoIdx === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePhotoIdx, nextPhoto, prevPhoto])

  return (
    <section
      className="min-h-screen bg-espresso text-ivory px-[5vw] py-20 md:py-28 flex flex-col justify-between max-md:px-[6vw]"
      id="reviews"
      data-scroll-section
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-widest uppercase">
          <span className="text-ivory">05</span>
          <span className="text-bronze-light">Google Reviews</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-full bg-ivory/10 px-4 py-1.5 backdrop-blur-sm border border-ivory/15">
          <div className="flex text-amber-400" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" stroke="none" />
            ))}
          </div>
          <span className="font-mono text-[.72rem] tracking-wider text-ivory uppercase font-medium">
            4.8 / 5 on Google Reviews
          </span>
        </div>
      </div>

      {/* Main Review Spotlight & Selector */}
      <div className="mx-auto mt-10 md:mt-14 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* LEFT: Active Review Spotlight */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between">
            {/* Touch Swipeable Quote block - Swiping here flips review */}
            <div
              onTouchStart={handleReviewTouchStart}
              onTouchEnd={handleReviewTouchEnd}
              className="touch-pan-y"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded bg-accent/25 px-2.5 py-1 font-mono text-[.68rem] uppercase tracking-wider text-bronze-light font-medium">
                  {current.tag}
                </span>
                <span className="flex items-center gap-1 font-mono text-[.68rem] text-ivory/60">
                  <CheckCircle2 size={13} className="text-green-400" /> Verified Google Review
                </span>
                {current.photos && current.photos.length > 0 && (
                  <span className="flex items-center gap-1 font-mono text-[.68rem] text-accent/90 bg-accent/15 px-2 py-0.5 rounded">
                    <Camera size={12} /> {current.photos.length} Project Photos
                  </span>
                )}
              </div>

              <h3 className="font-serif text-[clamp(1.4rem,2.4vw,2.1rem)] font-normal leading-snug !text-ivory mb-5 min-h-[3.6rem]">
                <span className="text-accent/80 font-serif mr-1 select-none">&ldquo;</span>
                <FoldText
                  key={current.name + '-headline'}
                  text={current.headline}
                  foldStyle="paper"
                  splitBy="word"
                  hinge="top"
                  trigger="mount"
                  foldAngle={92}
                  duration={0.65}
                  stagger={0.035}
                  staggerFrom="start"
                  ease="power3.out"
                  hoverRefold={true}
                  refoldRadius={120}
                  refoldAngle={35}
                  perspective={700}
                  creaseShading={0.45}
                  fontSize="inherit"
                  fontWeight="inherit"
                  color="#FDF8F5"
                  className="font-serif leading-snug"
                />
                <span className="text-accent/80 font-serif ml-1 select-none">&rdquo;</span>
              </h3>

              <div className="text-[.95rem] md:text-[1.02rem] leading-[1.8] text-ivory/85 max-w-2xl min-h-[5rem]">
                <FoldText
                  key={current.name + '-comment'}
                  text={current.content}
                  foldStyle="paper"
                  splitBy="word"
                  hinge="top"
                  trigger="mount"
                  foldAngle={90}
                  duration={0.45}
                  delay={0.15}
                  stagger={0.012}
                  staggerFrom="start"
                  ease="power2.out"
                  hoverRefold={true}
                  refoldRadius={100}
                  refoldAngle={30}
                  perspective={700}
                  creaseShading={0.35}
                  fontSize="inherit"
                  fontWeight="300"
                  lineHeight="1.8"
                  letterSpacing="normal"
                  color="rgba(253, 248, 245, 0.85)"
                  className="font-sans leading-[1.8] block"
                />
              </div>
            </div>

            {/* Attached customer photos infinite loop - isolated from review swipe */}
            {current.photos && current.photos.length > 0 && (
              <div
                className="mt-7 pt-5 border-t border-ivory/15"
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
              >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <p className="font-mono text-[.7rem] uppercase tracking-wider text-bronze-light flex items-center gap-2 mb-0">
                      <Camera size={13} className="text-accent" />
                      <span>Finished Project Photos by {current.name}</span>
                      <span className="text-[.62rem] text-ivory/40 font-normal">({current.photos.length} photos)</span>
                    </p>
                    <span className="font-mono text-[.64rem] text-ivory/50 flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Tap photo to enlarge · Drag to scroll
                    </span>
                  </div>

                  {/* Clean LogoLoop merging directly with the section background */}
                  <div className="relative w-full overflow-hidden py-1">
                    <LogoLoop
                      key={current.name}
                      logos={photoLogos}
                      speed={36}
                      logoHeight={115}
                      gap={14}
                      pauseOnHover={true}
                      scaleOnHover={true}
                      fadeOut={true}
                      fadeOutWidth={0.08}
                      intro={false}
                      ariaLabel={`${current.name} project photos loop`}
                      renderItem={(item, key) => (
                        <div
                          key={key}
                          className="group/photo relative h-[115px] w-[170px] shrink-0 overflow-hidden rounded-xl border border-ivory/20 shadow-md transition-all duration-300 hover:border-accent hover:shadow-accent/25 cursor-pointer bg-dark/40"
                          onPointerDown={(e) => {
                            pointerStartPos.current = { x: e.clientX, y: e.clientY }
                            dragDistanceRef.current = 0
                          }}
                          onPointerMove={(e) => {
                            const dx = e.clientX - pointerStartPos.current.x
                            const dy = e.clientY - pointerStartPos.current.y
                            dragDistanceRef.current = Math.hypot(dx, dy)
                          }}
                          onClick={(e) => {
                            if (dragDistanceRef.current > 8) {
                              e.preventDefault()
                              e.stopPropagation()
                              return
                            }
                            item.onClick?.()
                          }}
                        >
                          <img
                            src={item.src}
                            alt={item.alt || ''}
                            className="logoloop__photo transition-transform duration-500 group-hover/photo:scale-108"
                            draggable={false}
                            loading="eager"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity p-2 flex flex-col justify-between pointer-events-none">
                            <span className="self-end rounded-full bg-black/70 p-1 text-ivory/90 backdrop-blur-sm shadow">
                              <Maximize2 size={12} />
                            </span>
                            <span className="font-mono text-[.62rem] text-ivory line-clamp-1 leading-tight font-medium">
                              {item.alt}
                            </span>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>
              )}

            <div className="mt-7 pt-5 border-t border-ivory/15 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-medium text-ivory text-[1.05rem] mb-0.5">{current.name}</p>
                <p className="text-bronze-light font-mono text-[.74rem] uppercase tracking-wider mb-0">
                  {current.badge} · {current.time}
                </p>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevReview}
                  aria-label="Previous review"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-all hover:bg-ivory hover:text-espresso cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="font-mono text-[.74rem] text-ivory/60">
                  {safeIndex + 1} / {googleReviews.length}
                </span>
                <button
                  onClick={nextReview}
                  aria-label="Next review"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-all hover:bg-ivory hover:text-espresso cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Clickable Reviewers Bar with Name & Context */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="font-mono text-[.72rem] uppercase tracking-widest text-bronze-light font-medium mb-0">
                Client Stories
              </p>
              <span className="font-mono text-[.66rem] text-ivory/50">
                Select to view ({googleReviews.length})
              </span>
            </div>

            <div className="space-y-2.5">
              {googleReviews.map((rev, idx) => {
                const isSelected = idx === safeIndex
                return (
                  <button
                    key={rev.name}
                    onClick={() => {
                      setActivePhotoIdx(null)
                      setActiveIndex(idx)
                    }}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl transition-all cursor-pointer border ${isSelected
                        ? 'bg-ivory/15 border-accent shadow-lg ring-1 ring-accent/40 border-l-4 border-l-accent'
                        : 'bg-ivory/5 border-ivory/10 hover:border-ivory/30 hover:bg-ivory/10 text-ivory/75 hover:text-ivory'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[.94rem] font-medium text-ivory mb-0">{rev.name}</p>
                      <div className="flex items-center gap-2">
                        {rev.photos && (
                          <span className="flex items-center gap-1 text-[.65rem] font-mono text-accent uppercase bg-accent/15 px-1.5 py-0.5 rounded">
                            <Camera size={10} /> {rev.photos.length}
                          </span>
                        )}
                        <div className="flex text-amber-400" aria-hidden="true">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} fill="currentColor" stroke="none" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[.76rem] text-bronze-light mb-1 font-mono uppercase tracking-wider font-medium">
                      {rev.tag}
                    </p>
                    <p className="text-[.8rem] text-ivory/65 mb-0 line-clamp-1 italic">
                      &ldquo;{rev.headline}&rdquo;
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Lightbox Modal for Customer Project Photos */}
      {activePhotoIdx !== null && current.photos && current.photos[activePhotoIdx] && (
        <div
          className="fixed inset-0 z-200 flex flex-col items-center justify-between bg-dark/95 p-4 md:p-8 backdrop-blur-md"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Top toolbar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between py-2 border-b border-ivory/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
                Photo {activePhotoIdx + 1} of {current.photos.length}
              </span>
              <span className="text-ivory/40">·</span>
              <span className="text-ivory text-sm font-medium">{current.name}&rsquo;s Home</span>
            </div>
            <button
              onClick={closeLightbox}
              aria-label="Close photo preview"
              className="flex items-center gap-1.5 text-ivory/90 hover:text-ivory font-mono text-xs uppercase cursor-pointer px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-ivory/20 hover:border-ivory/50 transition-colors bg-white/5 backdrop-blur-sm"
            >
              <X size={18} />
              <span className="hidden sm:inline">Close</span>
              <span className="hidden sm:inline text-ivory/40">(Esc)</span>
            </button>
          </div>

          {/* Central image stage with Prev / Next arrows */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {current.photos.length > 1 && (
              <button
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="absolute left-2 md:left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-ivory border border-ivory/30 hover:bg-black/90 hover:border-accent transition-all cursor-pointer backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <img
              key={getPhotoSrc(current.photos[activePhotoIdx])}
              src={getPhotoSrc(current.photos[activePhotoIdx])}
              alt={getPhotoCaption(current.photos[activePhotoIdx]) || `${current.name} project photo`}
              className="max-h-[72vh] max-w-full rounded-xl object-contain shadow-2xl border border-ivory/20 transition-all duration-300 filter contrast-[1.02] brightness-[1.01]"
              style={{ imageRendering: 'high-quality' }}
            />

            {current.photos.length > 1 && (
              <button
                onClick={nextPhoto}
                aria-label="Next photo"
                className="absolute right-2 md:right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-ivory border border-ivory/30 hover:bg-black/90 hover:border-accent transition-all cursor-pointer backdrop-blur-sm"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom caption & thumbnail strip */}
          <div
            className="w-full max-w-5xl flex flex-col items-center gap-3 pt-2 border-t border-ivory/15"
            onClick={(e) => e.stopPropagation()}
          >
            {getPhotoCaption(current.photos[activePhotoIdx]) && (
              <p className="text-sm md:text-base text-ivory/90 text-center font-serif italic mb-1">
                &ldquo;{getPhotoCaption(current.photos[activePhotoIdx])}&rdquo;
              </p>
            )}

            {current.photos.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
                {current.photos.map((item, pIdx) => {
                  const src = getPhotoSrc(item)
                  const isCurrent = pIdx === activePhotoIdx
                  return (
                    <button
                      key={pIdx}
                      onClick={() => setActivePhotoIdx(pIdx)}
                      className={`h-12 w-16 md:h-14 md:w-20 rounded-md overflow-hidden border transition-all cursor-pointer shrink-0 ${isCurrent
                        ? 'border-accent ring-2 ring-accent/60 scale-105'
                        : 'border-ivory/25 opacity-60 hover:opacity-100 hover:border-ivory/50'
                        }`}
                    >
                      <img src={src} alt={`thumbnail ${pIdx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="h-4" aria-hidden="true" />
    </section>
  )
}

export default Reviews
