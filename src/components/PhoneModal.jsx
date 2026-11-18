import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X } from 'lucide-react'
import { business } from '../data/content'

export default function PhoneModal({ isOpen, onClose, title = 'Select Number to Call' }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[320px] sm:max-w-[340px] rounded-2xl border border-surface/30 bg-[#180E09]/95 p-5 text-white backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-accent">
                <Phone size={16} />
                <span className="font-mono text-[.74rem] font-bold uppercase tracking-wider text-surface">
                  {title}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>

            <p className="font-mono text-[.66rem] text-surface/70 uppercase tracking-wider mb-3">
              Tap any number below to call directly:
            </p>

            <div className="space-y-2.5">
              {business.phones.map((p) => (
                <a
                  key={p.display}
                  href={`tel:${p.tel}`}
                  onClick={onClose}
                  className="group flex items-center justify-between rounded-xl bg-white/5 hover:bg-accent hover:text-[#180E09] p-3 border border-white/10 hover:border-accent transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[.64rem] uppercase tracking-wider text-surface/80 group-hover:text-[#180E09]/80 font-medium">
                      {p.label}
                    </span>
                    <span className="font-mono text-[.88rem] font-bold text-white group-hover:text-[#180E09] tracking-tight">
                      {p.display}
                    </span>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 group-hover:bg-[#180E09]/20 text-accent group-hover:text-[#180E09] transition-colors">
                    <Phone size={14} />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

