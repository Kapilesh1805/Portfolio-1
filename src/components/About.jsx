import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Hammer,
  ShieldCheck,
  Clock,
  Sparkles,
  Layers,
  Compass,
  ArrowDownRight,
  CheckCircle2,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  FileText,
  Boxes,
} from 'lucide-react'

// ============================================================================
// ABOUT BALAJI INTERIOR DECOR - INTERACTIVE MULTI-VIEW EXPERIENCE
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

const PILLARS = [
  {
    id: 'artisan',
    number: '01',
    tag: 'Direct Ownership',
    title: 'No Outsourced Subcontractors. 100% In-House Craftsmen.',
    description:
      'Aggregator platforms take your money and auction your home to whatever third-party subcontractor bids lowest. Balaji Interior Decor is founded on the exact opposite model: our own salaried master carpenters, electricians, and interior artisans build your home.',
    highlight: 'Direct artisan accountability from day one to final key handover.',
    metric: '100%',
    metricLabel: 'In-House Crew',
    image: '/services/modular-kitchen/1.webp',
  },
  {
    id: 'precision',
    number: '02',
    tag: '1:1 Execution',
    title: 'What You Approve in 3D is What You Touch on Site.',
    description:
      'Too many homeowners suffer the gap between photorealistic 3D renders and sloppy site execution. At Balaji, our workshop cutting lists and CNC edge-banding match the architectural blueprint down to the millimeter. Handles, coves, and shadow lines align flawlessly.',
    highlight: 'Zero compromise on invisible details: concealed cabling, waterproof plinths, and termite-proof cores.',
    metric: '120+',
    metricLabel: 'Chennai Homes',
    image: '/services/tv-units/1.webp',
  },
  {
    id: 'peace',
    number: '03',
    tag: 'Ironclad Guarantee',
    title: 'Turnkey Handover in 35 Days. 7-Year Flat Warranty.',
    description:
      'Your move-in date should be celebrated, not delayed. Thanks to modular factory pre-assembly and scheduled on-site fitting, we deliver complete 2BHK and 3BHK interiors in 30 to 35 calendar days. Backed by a transparent fixed quotation with zero cost escalations.',
    highlight: 'A flat 7-year warranty covering structural cabinetry, hardware, and surface laminates.',
    metric: '7 Yrs',
    metricLabel: 'Flat Warranty',
    image: '/services/false-ceiling/1.webp',
  },
]

const MILESTONES = [
  { value: '10+', label: 'Years of Craft', detail: 'Serving Chennai homeowners since 2014' },
  { value: '120+', label: 'Completed Homes', detail: 'Across Velachery, OMR, Anna Nagar & ECR' },
  { value: '35', label: 'Days Handover', detail: 'Committed calendar turnaround' },
  { value: '7 Yrs', label: 'Flat Warranty', detail: 'Complete peace of mind on all millwork' },
]

function About({ scrollTo }) {
  const [activeTab, setActiveTab] = useState('dossier') // 'dossier' | 'pillars' | 'manifesto'
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[0])
  const [expandedPillar, setExpandedPillar] = useState('artisan')

  return (
    <section
      className="relative min-h-screen bg-[#1E130D] px-[5vw] pt-32 md:pt-36 pb-16 md:pb-20 text-ivory max-md:px-[6vw] flex flex-col justify-between overflow-hidden"
      id="about"
      data-scroll-section
    >
      {/* Subtle ambient lighting glows */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-bronze/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-espresso-soft/20 blur-[140px]" />

      {/* Header bar with section tag + interactive layout switcher */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-ivory/10 pb-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-[.68rem] tracking-widest uppercase text-bronze-light">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-bronze animate-pulse" />
            <span>01 / ABOUT BALAJI INTERIOR DECOR</span>
            <span className="text-ivory/30">•</span>
            <span className="text-ivory/60">CHENNAI EST. 2014</span>
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-medium tracking-tight text-ivory">
            Craftsmanship without compromise.{' '}
            <span className="font-serif italic text-bronze-light">Homes shaped for living.</span>
          </h2>
        </div>

        {/* View Switcher: Lets user compare all 3 creative presentations */}
        <div className="flex items-center gap-1.5 rounded-full bg-black/40 p-1.5 border border-ivory/15 backdrop-blur-md self-start md:self-auto">
          <button
            onClick={() => setActiveTab('dossier')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[.72rem] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'dossier'
                ? 'bg-bronze text-[#1A110B] font-semibold shadow-lg shadow-bronze/20'
                : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Compass size={13} className={activeTab === 'dossier' ? 'animate-spin' : ''} />
            <span>01 Craft Dossier</span>
          </button>

          <button
            onClick={() => setActiveTab('pillars')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[.72rem] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'pillars'
                ? 'bg-bronze text-[#1A110B] font-semibold shadow-lg shadow-bronze/20'
                : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
            }`}
          >
            <Boxes size={13} />
            <span>02 Three Pillars</span>
          </button>

          <button
            onClick={() => setActiveTab('manifesto')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[.72rem] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'manifesto'
                ? 'bg-bronze text-[#1A110B] font-semibold shadow-lg shadow-bronze/20'
                : 'text-ivory/70 hover:text-ivory hover:bg-white/5'
            }`}
          >
            <FileText size={13} />
            <span>03 Manifesto</span>
          </button>
        </div>
      </div>

      {/* Main Content Stage with Smooth View Animations */}
      <div className="relative z-10 my-auto py-8 md:py-12">
        <AnimatePresence mode="wait">
          {/* ================================================================ */}
          {/* VIEW 01: INTERACTIVE CRAFT DOSSIER (Hotspot Blueprint Experience) */}
          {/* ================================================================ */}
          {activeTab === 'dossier' && (
            <motion.div
              key="dossier"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            >
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
                  <div className="pointer-events-none absolute top-4 left-4 font-mono text-[.62rem] uppercase tracking-widest text-bronze-light/80 bg-black/50 px-3 py-1 rounded-full border border-ivory/10">
                    Live Blueprint Coordinates • Tap any pin to inspect
                  </div>

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
                          className={`absolute -inset-3 rounded-full transition-all duration-500 ${
                            isSelected
                              ? 'bg-bronze/35 animate-ping'
                              : 'bg-white/10 group-hover/pin:bg-bronze/25'
                          }`}
                        />
                        <span
                          className={`relative flex h-8 w-8 items-center justify-center rounded-full font-mono text-[.72rem] font-bold shadow-xl transition-all duration-300 ${
                            isSelected
                              ? 'bg-bronze text-[#1A110B] scale-125 ring-4 ring-bronze/30'
                              : 'bg-black/80 text-ivory border border-ivory/30 group-hover/pin:border-bronze group-hover/pin:text-bronze'
                          }`}
                        >
                          {spot.number}
                        </span>

                        {/* Floating Micro-badge for Pin */}
                        <span
                          className={`pointer-events-none absolute left-1/2 -top-8 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/85 px-2.5 py-1 font-mono text-[.6rem] uppercase tracking-wider text-ivory border border-ivory/15 shadow-md transition-opacity duration-300 ${
                            isSelected ? 'opacity-100' : 'opacity-0 group-hover/pin:opacity-100'
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
                      className={`text-left rounded-lg p-2.5 transition-all duration-300 border cursor-pointer ${
                        activeHotspot.id === spot.id
                          ? 'border-bronze bg-bronze/10 text-ivory'
                          : 'border-ivory/10 bg-black/20 text-ivory/60 hover:text-ivory hover:border-ivory/20'
                      }`}
                    >
                      <div className="font-mono text-[.6rem] text-bronze uppercase">{spot.number} / {spot.category}</div>
                      <div className="truncate text-[.78rem] font-medium mt-0.5">{spot.title}</div>
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

                    <h3 className="mt-4 text-xl md:text-2xl font-medium tracking-tight text-ivory">
                      {activeHotspot.title}
                    </h3>

                    <p className="mt-3 text-[.92rem] leading-relaxed text-ivory/80">
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
                      <p className="font-serif italic text-[.86rem] text-ivory leading-snug">
                        {activeHotspot.clientProof}
                      </p>
                    </div>

                    {/* Quick CTA */}
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
            </motion.div>
          )}

          {/* ================================================================ */}
          {/* VIEW 02: THREE PILLARS (Expanding Editorial Cards) */}
          {/* ================================================================ */}
          {activeTab === 'pillars' && (
            <motion.div
              key="pillars"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {PILLARS.map((pillar) => {
                const isExpanded = expandedPillar === pillar.id
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setExpandedPillar(pillar.id)}
                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                      isExpanded
                        ? 'border-bronze bg-[#2A1A12] ring-1 ring-bronze/50 shadow-2xl'
                        : 'border-ivory/15 bg-black/40 hover:border-ivory/30 hover:bg-black/60'
                    }`}
                  >
                    {/* Header Image Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E130D] via-[#1E130D]/40 to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="rounded-full bg-black/70 px-3 py-1 font-mono text-[.65rem] uppercase tracking-wider text-bronze border border-ivory/10">
                          {pillar.number} / {pillar.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-4 font-mono text-2xl font-bold text-bronze">
                        {pillar.metric}
                        <span className="block font-mono text-[.55rem] uppercase tracking-widest text-ivory/60 font-normal">
                          {pillar.metricLabel}
                        </span>
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-medium tracking-tight text-ivory group-hover:text-bronze-light transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="mt-3 text-[.88rem] leading-relaxed text-ivory/75">
                          {pillar.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-ivory/10">
                        <div className="flex items-center gap-2 text-[.78rem] text-bronze font-medium">
                          <Sparkles size={14} />
                          <span>{pillar.highlight}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}

          {/* ================================================================ */}
          {/* VIEW 03: STUDIO MANIFESTO (Editorial Scrollytelling Spread) */}
          {/* ================================================================ */}
          {activeTab === 'manifesto' && (
            <motion.div
              key="manifesto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            >
              {/* Left Column: Bold Editorial Quote & Core Journey */}
              <div className="lg:col-span-6 space-y-6">
                <span className="font-mono text-[.68rem] tracking-widest uppercase text-bronze">
                  THE CHENNAI MANIFESTO
                </span>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-.03em] leading-[1.1] text-ivory">
                  We don’t build showrooms.
                  <br />
                  <span className="font-serif italic font-normal text-bronze">We craft sanctuaries</span>
                  <br />
                  where life happens.
                </h3>

                <p className="text-[1.02rem] md:text-[1.1rem] leading-relaxed text-ivory/90">
                  Founded in Chennai in 2014, Balaji Interior Decor began with a quiet conviction: home interiors
                  should never be a stressful gamble of impersonal corporate aggregators, delayed handovers, or hidden cost escalations.
                </p>

                <p className="text-[.9rem] leading-relaxed text-ivory/70">
                  Over a decade and 120+ residential homes later, we remain proudly independent. When you sign with us,
                  you do not get handed off to anonymous subcontractors. Our own master carpenters, electricians,
                  and finishing artisans arrive on site each morning, treating your home with the care and reverence
                  it deserves.
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={() => scrollTo('contact')}
                    className="inline-flex items-center gap-3 rounded-full bg-bronze px-6 py-3 font-mono text-[.75rem] uppercase tracking-wider text-[#1A110B] font-semibold hover:bg-ivory transition-all cursor-pointer shadow-lg shadow-bronze/20"
                  >
                    <span>Talk to our master craftsmen</span>
                    <ArrowDownRight size={15} />
                  </button>
                  <button
                    onClick={() => scrollTo('reviews')}
                    className="inline-flex items-center gap-2 font-mono text-[.75rem] uppercase tracking-wider text-ivory/70 hover:text-ivory transition-colors cursor-pointer"
                  >
                    <span>Read client stories</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right Column: Live Milestone Metrics & Guarantees */}
              <div className="lg:col-span-6 space-y-6">
                {/* 4 Big Numbers */}
                <div className="grid grid-cols-2 gap-4">
                  {MILESTONES.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-ivory/15 bg-black/40 p-5 md:p-6 backdrop-blur-md"
                    >
                      <div className="font-mono text-3xl md:text-4xl font-bold text-bronze">
                        {m.value}
                      </div>
                      <div className="mt-1 font-mono text-[.75rem] uppercase tracking-wider text-ivory font-medium">
                        {m.label}
                      </div>
                      <div className="mt-1 text-[.76rem] text-ivory/60 leading-tight">
                        {m.detail}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Guarantees Box */}
                <div className="rounded-2xl border border-ivory/15 bg-black/50 p-6 backdrop-blur-md">
                  <div className="font-mono text-[.68rem] uppercase tracking-widest text-bronze-light mb-4">
                    The Balaji Promise to Every Homeowner:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[.84rem] text-ivory/80">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-bronze shrink-0" />
                      <span>Transparent line-item quotation</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-bronze shrink-0" />
                      <span>Strict 30–35 day turnkey handover</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-bronze shrink-0" />
                      <span>7-Year flat structural warranty</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-bronze shrink-0" />
                      <span>100% In-house respectful carpenters</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-bronze shrink-0" />
                      <span>Daily photo & WhatsApp progress logs</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-bronze shrink-0" />
                      <span>Zero unexpected price escalations</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Subtle Status Bar */}
      <div className="relative z-10 pt-4 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between text-[.72rem] font-mono uppercase tracking-widest text-ivory/50">
        <span>Selected Section / 01 About</span>
        <span>Velachery • OMR • Anna Nagar • ECR • Chennai</span>
      </div>
    </section>
  )
}

export default About
