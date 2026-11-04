import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass,
  ArrowDownRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Hammer,
  Target,
} from 'lucide-react'

// ============================================================================
// ABOUT BALAJI INTERIOR DECOR - INTERACTIVE CRAFT DOSSIER
// Divided into 4 distinct sections:
// 01 - The Story / At Balaji Interior Decor (Selaiyur, Tambaram)
// 02 - What We Do (Modular Kitchens, Wardrobes, Living/Bedrooms, Commercial)
// 03 - Why Chennai Chooses Us (Tailored Design, Workmanship, Management, Pricing)
// 04 - Our Mission (Creating Beautiful, Enduring Spaces)
// ============================================================================

const HOTSPOTS = [
  {
    id: 'story',
    x: '28%',
    y: '58%',
    number: '01',
    navTitle: 'About Us',
    title: 'Balaji Interior Decor',
    category: 'Who We Are',
    location: 'Selaiyur, Tambaram, Chennai',
    summary:
      'At Balaji Interior Decor, based in Selaiyur, Tambaram, we believe every home tells a story. We are a team of designers, craftsmen, and space planners dedicated to transforming ordinary spaces into extraordinary, elegant, and functional homes.',
    items: [
      {
        label: 'Based in Selaiyur, Tambaram',
        detail: 'Rooted in Chennai with experienced local teams & master carpenters.',
      },
      {
        label: 'Designers & Space Planners',
        detail: 'Dedicated space planning that maximizes room flow, lighting, and everyday utility.',
      },
      {
        label: 'Master Craftsmen',
        detail: 'Precision millwork, bespoke joinery, and meticulous attention to detail.',
      },
      {
        label: 'Homes Shaped for Living',
        detail: 'Transforming ordinary spaces into extraordinary, elegant, and functional living environments.',
      },
    ],
    quote: 'At Balaji Interior Decor, based in Selaiyur, Tambaram, we believe every home tells a story.',
    icon: Hammer,
  },
  {
    id: 'what-we-do',
    x: '62%',
    y: '22%',
    number: '02',
    navTitle: 'What We Do',
    title: 'What We Do',
    category: 'Our Core Services',
    location: 'Homes & Modern Workspaces',
    summary:
      'Whether it\'s a cozy home, a smart modular kitchen, or a modern office, we bring your vision to life with precision and quality.',
    items: [
      {
        label: 'Modular Kitchens',
        detail: 'Stylish, ergonomic, and built for modern living.',
      },
      {
        label: 'Wardrobes & Storage',
        detail: 'Smart, durable, and made for your space.',
      },
      {
        label: 'Living & Bedroom Interiors',
        detail: 'From TV units to false ceilings, complete home makeovers.',
      },
      {
        label: 'Commercial Spaces',
        detail: 'Offices and retail spaces that reflect your brand.',
      },
    ],
    quote: 'Whether it\'s a cozy home, a smart modular kitchen, or a modern office, we bring your vision to life with precision and quality.',
    icon: Sparkles,
  },
  {
    id: 'why-choose-us',
    x: '48%',
    y: '80%',
    number: '03',
    navTitle: 'Why Choose Us',
    title: 'Why Chennai Chooses Us',
    category: 'The Balaji Difference',
    location: 'Client Trust & Assurance',
    summary:
      'From custom design tailored to your budget to on-time handover, here is why homeowners and businesses across Chennai choose Balaji Interior Decor:',
    items: [
      {
        label: 'Tailored Design',
        detail: 'For your budget & lifestyle.',
      },
      {
        label: 'Quality Workmanship',
        detail: '& Premium Materials built to endure everyday living.',
      },
      {
        label: 'End-to-End Project Management',
        detail: 'Complete oversight from initial 3D design to site handover.',
      },
      {
        label: 'Transparent Pricing',
        detail: '& On-Time Delivery with zero hidden surprise escalations.',
      },
    ],
    quote: 'Craftsmanship without compromise. Homes shaped for living.',
    icon: ShieldCheck,
  },
  {
    id: 'our-mission',
    x: '78%',
    y: '60%',
    number: '04',
    navTitle: 'Our Mission',
    title: 'Our Mission',
    category: 'Purpose & Commitment',
    location: 'Enduring Spaces',
    summary:
      'To create beautiful, enduring spaces that enhance your comfort and lifestyle.',
    items: [
      {
        label: 'Enduring Beauty',
        detail: 'Spaces crafted to retain their aesthetic charm and structural integrity for years.',
      },
      {
        label: 'Enhanced Comfort',
        detail: 'Thoughtfully planned layouts tailored around your everyday routine and lifestyle.',
      },
      {
        label: 'Precision & Quality',
        detail: 'Delivering unmatched finish, calibrated joinery, and clean detailing.',
      },
      {
        label: 'Lasting Trust',
        detail: 'Transparent communication, dedicated supervision, and client satisfaction.',
      },
    ],
    quote: 'To create beautiful, enduring spaces that enhance your comfort and lifestyle.',
    icon: Target,
  },
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

      {/* Header bar with unified Playfair Display Serif font */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-ivory/10 pb-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 font-mono text-[.68rem] tracking-widest uppercase text-bronze-light">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-bronze animate-pulse" />
            <span>ABOUT BALAJI INTERIOR DECOR</span>
            <span className="text-ivory/30">•</span>
            <span className="text-ivory/60">SELAIYUR, TAMBARAM</span>
          </div>

          {/* Unified Italic Serif Headline */}
          <h2 className="mt-2 text-2xl md:text-3xl lg:text-[2.6rem] font-serif italic font-normal tracking-tight leading-[1.15]">
            <span className="text-ivory">Craftsmanship without compromise.</span>{' '}
            <span className="text-bronze-light">Homes shaped for living.</span>
          </h2>

          {/* Navigation prompt */}
          <p className="mt-3 text-[.88rem] md:text-[.95rem] text-ivory/70 font-sans leading-relaxed">
            Touch numbers <span className="font-mono text-bronze font-bold">01 to 04</span> on the blueprint to explore our story, what we do, why Chennai chooses us, and our mission.
          </p>
        </div>

        {/* Live Blueprint Status Badge */}
        <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 border border-ivory/15 backdrop-blur-md self-start lg:self-auto shrink-0">
          <Compass size={14} className="text-bronze animate-spin [animation-duration:8s]" />
          <span className="font-mono text-[.72rem] tracking-wider uppercase text-ivory/80">
            Interactive Dossier
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

              {/* Interactive Hotspot Pins (01 to 04) */}
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
                      {spot.number} / {spot.navTitle}
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
                    {spot.number} / {spot.navTitle}
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
                {/* Header Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-ivory/10">
                  <div className="font-mono text-[.68rem] tracking-widest uppercase text-bronze">
                    {activeHotspot.number} // {activeHotspot.category}
                  </div>
                  <span className="flex items-center gap-1.5 font-mono text-[.62rem] text-ivory/60 uppercase">
                    <CheckCircle2 size={12} className="text-bronze" /> Balaji Standard
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-xl md:text-2xl font-serif font-normal tracking-tight text-ivory">
                  {activeHotspot.title}
                </h3>

                {/* Location / Context Tag */}
                <div className="mt-1 font-mono text-[.68rem] uppercase tracking-wider text-bronze-light">
                  {activeHotspot.location}
                </div>

                {/* Summary / Core Paragraph */}
                <p className="mt-3 text-[.92rem] leading-relaxed text-ivory/80 font-sans">
                  {activeHotspot.summary}
                </p>

                {/* Section Items Breakdown */}
                <div className="mt-5 space-y-2">
                  <div className="font-mono text-[.62rem] uppercase tracking-widest text-ivory/50">
                    Key Highlights:
                  </div>
                  <div className="space-y-2">
                    {activeHotspot.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-ivory/5 border border-ivory/10 p-2.5 md:p-3 hover:border-bronze/30 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-bronze shrink-0 mt-1.5" />
                          <div>
                            <span className="font-mono text-[.74rem] font-bold text-ivory">
                              {item.label}
                            </span>
                            <span className="text-ivory/40 font-mono text-[.74rem]"> : </span>
                            <span className="text-[.74rem] text-ivory/70 leading-relaxed">
                              {item.detail}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Quote Box */}
                <div className="mt-5 rounded-xl bg-bronze/10 border border-bronze/25 p-3.5">
                  <p className="font-serif italic text-[.86rem] text-ivory leading-relaxed">
                    "{activeHotspot.quote}"
                  </p>
                </div>

                {/* Action Link */}
                <div className="mt-5 pt-4 border-t border-ivory/10 flex items-center justify-between">
                  <span className="text-[.78rem] text-ivory/60">Ready to plan your space?</span>
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

        {/* 4 Interactive Section Cards at the Bottom */}
        <div className="mt-12 border-t border-ivory/10 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 font-mono text-[.68rem] tracking-widest uppercase text-bronze">
              <Sparkles size={13} className="text-bronze" />
              <span>Explore The Dossier Sections</span>
            </div>
            <span className="font-mono text-[.65rem] text-ivory/50 uppercase">
              Click any section below or tap pins 01–04 above
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOTSPOTS.map((spot) => {
              const Icon = spot.icon
              const isSelected = activeHotspot.id === spot.id
              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot)}
                  className={`text-left rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-bronze bg-bronze/15 shadow-lg shadow-bronze/5 ring-1 ring-bronze/40'
                      : 'border-ivory/10 bg-black/25 hover:border-ivory/20 hover:bg-black/35'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-bold text-bronze">
                      {spot.number}
                    </span>
                    <Icon size={16} className={isSelected ? 'text-bronze' : 'text-ivory/40'} />
                  </div>
                  <div className="mt-2 font-mono text-[.78rem] uppercase tracking-wider text-ivory font-semibold">
                    {spot.title}
                  </div>
                  <div className="mt-1 text-[.74rem] text-ivory/60 leading-relaxed line-clamp-2">
                    {spot.summary}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
