import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, MessageCircle, Mail, X } from 'lucide-react'
import { useWhatsAppLink } from '../utils/whatsapp'

function Contact() {
  const [isFlipped, setIsFlipped] = useState(false)
  const containerRef = useRef(null)
  const { url: whatsappUrl, onClick: onWhatsAppClick } = useWhatsAppLink(
    '919500005400',
    "Hi Balaji Interior Decor, I'd like to discuss an interior project."
  )

  // Turn back to "Get in touch" when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFlipped(false)
      }
    }
    if (isFlipped) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFlipped])

  return (
    <section
      className="min-h-screen bg-section px-[5vw] py-20 md:py-28 flex flex-col justify-between text-body max-md:px-[6vw]"
      id="contact"
      data-scroll-section
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-widest uppercase">
          <span className="text-heading">07</span>
          <span className="text-accent">Have a good feeling?</span>
        </div>
        <span className="font-mono text-[.67rem] tracking-widest uppercase text-body">
          Let&apos;s make it real.
        </span>
      </div>

      <div className="mx-auto my-auto mb-12 mt-16 md:mt-28 flex w-full max-w-275 items-end justify-between max-md:block">
        <h2 className="text-[clamp(2.4rem,6.4vw,6.5rem)] font-medium leading-[1.02] tracking-[-.045em] text-heading">
          Let&apos;s Build Your
          <br />
          <em className="font-serif font-medium text-accent">Dream Home.</em>
        </h2>

        {/* Interactive 3D Turning Action Button */}
        <div
          ref={containerRef}
          className="relative max-md:mt-10 max-md:w-max min-h-[46px] flex items-center"
          style={{ perspective: 1000 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isFlipped ? (
              <motion.button
                key="get-in-touch"
                onClick={() => setIsFlipped(true)}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="group flex items-center gap-4 border-b border-accent px-[.2rem] pb-3 font-mono text-[.82rem] tracking-wider uppercase text-accent transition-colors duration-[250ms] hover:border-heading hover:text-heading cursor-pointer"
                aria-label="Get in touch - choose WhatsApp or Email"
              >
                <span>Get in touch</span>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.button>
            ) : (
              <motion.div
                key="contact-options"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="flex items-center gap-2 rounded-full border border-accent/35 bg-black/75 p-1.5 backdrop-blur-md shadow-2xl"
              >
                {/* WhatsApp Option */}
                <a
                  href={whatsappUrl}
                  onClick={onWhatsAppClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 font-mono text-[.74rem] font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#20bd5a] hover:scale-105 shadow-md cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>

                {/* Email Option */}
                <a
                  href="mailto:hello@atelier.studio"
                  className="flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 font-mono text-[.74rem] font-medium uppercase tracking-wider text-white transition-all duration-200 hover:scale-105 border border-white/15 shadow-md cursor-pointer"
                >
                  <Mail size={15} />
                  <span>Email</span>
                </a>

                {/* Flip back / Close icon */}
                <button
                  onClick={() => setIsFlipped(false)}
                  title="Close options"
                  aria-label="Back to Get in touch"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="h-4" aria-hidden="true" />
    </section>
  )
}

export default Contact
