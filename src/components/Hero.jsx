import { motion } from 'framer-motion'
import { ArrowDown, Sparkles, ArrowRight } from 'lucide-react'

function Hero({ heroEntrance = true }) {
  return (
    <section
      className="relative min-h-screen px-[5vw] pt-28 md:pt-[clamp(7rem,11vw,9.5rem)] pb-10 flex flex-col justify-between max-md:px-[6vw] max-md:pt-24 max-md:pb-8 overflow-hidden text-ivory"
      id="home"
      data-scroll-section
    >
      {/* 1. Full-Bleed Living Room Photo Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/hero/hero-bg.png"
          alt="Balaji Interior Decor Luxury Living Space"
          className="w-full h-full object-cover object-[center_55%] md:object-[center_60%] transition-transform duration-1000 scale-[1.02]"
        />

        {/* Multi-tier gradient overlay: keeps photo warm and luminous while ensuring 100% text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#160D08]/80 via-[#160D08]/40 to-[#160D08]/85"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(22,13,8,0.55)_100%)]"
          aria-hidden="true"
        />
      </div>

      {/* 2. Top Header Metadata */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={heroEntrance ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2.5 font-mono text-[.7rem] md:text-[.74rem] tracking-[0.2em] uppercase text-bronze-light">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-medium text-ivory">Balaji Interior Decor</span>
          <span className="text-ivory/40">●</span>
          <span>Est. 2014</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded-full bg-ivory/10 px-3.5 py-1 backdrop-blur-md border border-ivory/15 font-mono text-[.68rem] tracking-wider text-ivory/85 uppercase">
          <Sparkles size={12} className="text-accent" />
          <span>Form Follows Feeling</span>
        </div>
      </motion.div>

      {/* 3. Central Hero Statement & Details */}
      <div className="relative z-10 my-auto py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 36, filter: 'blur(10px)', scale: 0.96 }}
          animate={
            heroEntrance
              ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
              : { opacity: 0, y: 36, filter: 'blur(10px)', scale: 0.96 }
          }
          transition={{ duration: 0.95, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <h1 className="font-serif text-[clamp(2.4rem,5.8vw,5.2rem)] font-light leading-[1.08] text-ivory tracking-[-0.025em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] text-balance">
            Your dream becomes <span className="italic font-normal text-accent-light">reality</span> here.
          </h1>
        </motion.div>

        {/* Lower Row: Supporting statement + Action CTAs aligned properly */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={
            heroEntrance
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 28, filter: 'blur(6px)' }
          }
          transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pt-6 md:pt-8 border-t border-ivory/20"
        >
          <div className="lg:col-span-7">
            <p className="text-[.94rem] md:text-[1.08rem] leading-[1.75] text-ivory/90 font-light max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Bespoke living spaces, precision modular cabinetry, and architectural woodwork engineered to
              endure with quiet luxury.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-3.5">
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent-light text-espresso font-mono text-[.74rem] uppercase tracking-wider px-5 py-3 font-semibold transition-all duration-300 hover:scale-105 shadow-xl shadow-black/40 cursor-pointer"
            >
              <span>Explore Works</span>
              <ArrowRight size={14} />
            </a>
            <a
              href="#estimate"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/30 hover:border-ivory text-ivory hover:text-white font-mono text-[.74rem] uppercase tracking-wider px-5 py-3 font-medium backdrop-blur-md bg-black/25 transition-all duration-300 hover:bg-ivory/15 cursor-pointer"
            >
              <span>Get Estimate</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* 4. Bottom Footer Bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={heroEntrance ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.75, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-between font-mono text-[.68rem] md:text-[.72rem] tracking-widest uppercase text-ivory/70 border-t border-ivory/15 pt-4"
      >
        <div className="flex items-center gap-2">
          <span className="text-accent font-medium">01</span>
          <span>Selected Villa Interior</span>
        </div>

        <a
          href="#about"
          className="flex items-center gap-2 text-ivory/70 hover:text-ivory transition-colors cursor-pointer group"
        >
          <span className="hidden sm:inline">Scroll to explore</span>
          <span className="group-hover:translate-y-0.5 transition-transform duration-300">
            <ArrowDown size={14} className="text-accent animate-bounce" />
          </span>
        </a>
      </motion.div>
    </section>
  )
}

export default Hero

