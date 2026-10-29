import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass,
  ArrowDownRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  Hammer,
} from 'lucide-react'

// ============================================================================
// ABOUT BALAJI INTERIOR DECOR - INTERACTIVE CRAFT DOSSIER
// ============================================================================

const HOTSPOTS = [
  {
    id: 'millwork',
    x: '28%',
    y: '58%',
    number: '01',
    title: 'Precision Millwork & Fluted Paneling',
    category: 'Structural Joinery',
    specs: ['BWP Grade Marine Ply', 'Calibrated 0.8mm Edge Banding', 'Concealed Soft-Close Hardware', 'Zero Formaldehyde'],
    summary:
      'Every entertainment wall, fluted partition, and modular cabinet is pre-engineered to 1mm tolerances in our Chennai workshop and assembled on site by our own master carpenters.',
    clientProof: '"Their fluted TV unit and concealed wiring is cleaner than any luxury model flat." — Vatsala M., Velachery',
    image: '/services/tv-units/1.webp',
  },
  {
    id: 'lighting',
    x: '62%',
    y: '22%',
    number: '02',
    title: 'Architectural Cove & Ambient Lighting',
    category: 'Atmospheric Mood',
    specs: ['3000K Warm Golden Ambience', 'Concealed Aluminum Heatsink Profiles', 'Diffused Dotless Silicon Strips', 'Fire-Rated Wiring'],
    summary:
      'We treat light as an architectural material. Indirect cove profiles along false ceilings softly frame each room without harsh glare, reducing eye fatigue and setting a serene evening mood.',
    clientProof: '"The false ceiling and lighting profiles transformed our whole hall." — Arul P., Client Review',
    image: '/services/false-ceiling/1.webp',
  },
  {
    id: 'marble',
    x: '48%',
    y: '82%',
    number: '03',
    title: 'Italian Marble Accents & Natural Stone',
    category: 'Surface Craft',
    specs: ['Book-Matched Veining', 'Diamond Gloss Crystallization', 'High-Abrasion Sealant', 'Stain-Resistant Nano Coat'],
    summary:
      'Whether book-matched Italian marble TV feature walls or durable quartz kitchen counters, our stonemasons align veins seamlessly and apply diamond-polish coats designed for everyday Indian cooking.',
    clientProof: '"The stone cladding and marble finish matches 1:1 with their 3D renders." — Subramanian G.',
    image: '/hero/hero-bg.png',
  },
  {
    id: 'commitment',
    x: '78%',
    y: '65%',
    number: '04',
    title: '35-Day Handover & 7-Year Warranty',
    category: 'Client Assurance',
    specs: ['Fixed Line-Item Pricing', 'Strict 30–35 Day Turnaround', 'Daily WhatsApp Site Log', '7-Year Flat Structural Warranty'],
    summary:
      'No subcontractor roulette. No surprise cost escalations halfway through your project. We commit to a calendar completion date and back every hinge, carcass, and laminate with a 7-year guarantee.',
    clientProof: '"Delivered 4 days ahead of schedule with spotless daily site cleanup." — Mouliswaran S.',
    image: '/services/modular-kitchen/1.webp',
  },
]

const MILESTONES = [
  { value: '10+', label: 'Years of Craft', detail: 'Serving Chennai since 2014' },
  { value: '120+', label: 'Completed Homes', detail: 'Across Velachery, OMR, Anna Nagar & ECR' },
  { value: '35', label: 'Days Handover', detail: 'Committed calendar turnaround' },
  { value: '7 Yrs', label: 'Flat Warranty', detail: 'Comprehensive structural peace of mind' },
]

function About({ scrollTo }) {
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[0])

  return (
    <section
      className="relative min-h-screen bg-[#1E130D] px-[5vw] pt-32 md:pt-36 pb-16 md:pb-20 text-ivory max-md:px-[6vw] flex flex-col justify-between overflow-hidden scroll-mt-16 md:scroll-mt-20"
      id="about"
      data-scroll-section
    >
      {/* Subtle ambient lighting glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-bronze/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-espresso-soft/20 blur-[140px]" />

      {/* Header bar with unified Playfair Display Serif font for both parts */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-ivory/10 pb-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-[.68rem] tracking-widest uppercase text-bronze-light">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-bronze animate-pulse" />
            <span>01 / ABOUT BALAJI INTERIOR DECOR</span>
            <span className="text-ivory/30">•</span>
            <span className="text-ivory/60">CHENNAI EST. 2014</span>
          </div>

          {/* Unified Italic Serif Font (Playfair Display Italic) across both phrases */}
          <h2 className="mt-2 text-2xl md:text-3xl lg:text-[2.6rem] font-serif italic font-normal tracking-tight leading-[1.15]">
            <span className="text-ivory">Craftsmanship without compromise.</span>{' '}
            <span className="text-bronze-light">Homes shaped for living.</span>
          </h2>
        </div>

        {/* Live Blueprint Status Badge */}
        <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 border border-ivory/15 backdrop-blur-md self-start md:self-auto">
          <Compass size={14} className="text-bronze animate-spin [animation-duration:8s]" />
          <span className="font-mono text-[.72rem] tracking-wider uppercase text-ivory/80">
            Interactive Craft Dossier
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
        </div>
      </div>

      {/* Main Content Stage: Interactive Craft Dossier */}
      <div className="relative z-10 my-auto py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Interactive Luxury Room Visual with Pulsing Pins */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-ivory/15 bg-black/60 shadow-2xl group">
              <img
                src="/hero/hero-bg.png"
                alt="Balaji Interior Decor Living Room Craftsmanship"
                className="h-full w-full object-cover object-center brightness-[0.88] contrast-[1.04] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Blueprint Coordinate Overlay Lines */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A110B]/80 via-transparent to-[#1A110B]/30" />

              {/* Interactive Hotspot Pins */}
              {HOTSPOTS.map((spot) => {
                const isSelected = activeHotspot.id === spot.id
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot)}
                    style={{ left: spot.x, top: spot.y }}
                    className="group/pin absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer focus:outline-none"
                    aria-label={`Inspect ${spot.title}`}
                  >
                    <span
                      className={`absolute -inset-3 rounded-full transition-all duration-500 ${isSelected
                          ? 'bg-bronze/35 animate-ping'
                          : 'bg-white/10 group-hover/pin:bg-bronze/25'
                        }`}
                    />
                    <span
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full font-mono text-[.72rem] font-bold shadow-xl transition-all duration-300 ${isSelected
                          ? 'bg-bronze text-[#1A110B] scale-125 ring-4 ring-bronze/30'
                          : 'bg-black/80 text-ivory border border-ivory/30 group-hover/pin:border-bronze group-hover/pin:text-bronze'
                        }`}
                    >
                      {spot.number}
                    </span>

                    {/* Floating Micro-badge for Pin */}
                    <span
                      className={`pointer-events-none absolute left-1/2 -top-8 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/85 px-2.5 py-1 font-mono text-[.6rem] uppercase tracking-wider text-ivory border border-ivory/15 shadow-md transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover/pin:opacity-100'
                        }`}
                    >
                      {spot.category}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Hotspot quick selector buttons */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot)}
                  className={`text-left rounded-lg p-2.5 transition-all duration-300 border cursor-pointer ${activeHotspot.id === spot.id
                      ? 'border-bronze bg-bronze/10 text-ivory shadow-sm'
                      : 'border-ivory/10 bg-black/20 text-ivory/60 hover:text-ivory hover:border-ivory/20'
                    }`}
                >
                  <div className="font-mono text-[.6rem] text-bronze uppercase">
                    {spot.number} / {spot.category}
                  </div>
                  <div className="truncate text-[.78rem] font-medium mt-0.5">
                    {spot.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Deep Architectural Dossier Card */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-ivory/15 bg-black/40 p-6 md:p-8 backdrop-blur-md shadow-xl"
              >
                <div className="flex items-center justify-between pb-4 border-b border-ivory/10">
                  <div className="font-mono text-[.68rem] tracking-widest uppercase text-bronze">
                    SPEC SHEET {activeHotspot.number} // {activeHotspot.category}
                  </div>
                  <span className="flex items-center gap-1.5 font-mono text-[.62rem] text-ivory/60 uppercase">
                    <CheckCircle2 size={12} className="text-bronze" /> In-House Standard
                  </span>
                </div>

                {/* Subtitle in matching elegant serif */}
                <h3 className="mt-4 text-xl md:text-2xl font-serif font-normal tracking-tight text-ivory">
                  {activeHotspot.title}
                </h3>

                <p className="mt-3 text-[.92rem] leading-relaxed text-ivory/80 font-sans">
                  {activeHotspot.summary}
                </p>

                {/* Material Spec Chips */}
                <div className="mt-6">
                  <div className="font-mono text-[.62rem] uppercase tracking-widest text-ivory/50 mb-2.5">
                    Verified Materials & Standards:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeHotspot.specs.map((spec) => (
                      <span
                        key={spec}
                        className="inline-flex items-center gap-1.5 rounded-full bg-ivory/5 px-3 py-1 font-mono text-[.7rem] text-ivory/90 border border-ivory/10"
                      >
                        <span className="h-1 w-1 rounded-full bg-bronze" />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Client Verification Quote */}
                <div className="mt-6 rounded-xl bg-bronze/10 border border-bronze/25 p-4">
                  <p className="font-serif italic text-[.88rem] text-ivory leading-relaxed">
                    {activeHotspot.clientProof}
                  </p>
                </div>

                {/* Quick Action Link */}
                <div className="mt-6 pt-4 border-t border-ivory/10 flex items-center justify-between">
                  <span className="text-[.78rem] text-ivory/60">Want this finish in your home?</span>
                  <button
                    onClick={() => scrollTo('estimate')}
                    className="inline-flex items-center gap-1.5 font-mono text-[.72rem] uppercase tracking-wider text-bronze hover:text-ivory transition-colors cursor-pointer"
                  >
                    Estimate costs <ArrowDownRight size={14} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Milestone Statistics Bar beneath the Dossier */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-ivory/10 pt-8">
          {MILESTONES.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-ivory/10 bg-black/25 p-4 backdrop-blur-sm"
            >
              <div className="font-mono text-2xl md:text-3xl font-bold text-bronze">
                {m.value}
              </div>
              <div className="mt-0.5 font-mono text-[.72rem] uppercase tracking-wider text-ivory font-medium">
                {m.label}
              </div>
              <div className="mt-0.5 text-[.74rem] text-ivory/60">
                {m.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
