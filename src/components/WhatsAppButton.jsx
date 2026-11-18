import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Instagram, Facebook, Phone, X } from 'lucide-react'
import { useWhatsAppLink } from '../utils/whatsapp'
import { business } from '../data/content'

// Radial Arc Coordinates (Radius R = 105px from center of bottom-right button)
// 4 buttons split across a 90-degree quadrant (from 90deg straight up to 180deg left)
const ARC_ITEMS = [
  {
    id: 'phone',
    label: 'Call Us',
    angleDeg: 90, // Straight Up
    x: 0,
    y: -105,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    angleDeg: 120, // Up-Left
    x: -52,
    y: -91,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    angleDeg: 150, // Left-Up
    x: -91,
    y: -52,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    angleDeg: 180, // Straight Left
    x: -105,
    y: 0,
  },
]

export default function WhatsAppButton({
  phoneNumber = business.whatsapp,
  message = "Hi Balaji Interior Decor, I'd like to enquire about your interior design services.",
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const containerRef = useRef(null)

  const { url: waUrl, onClick: onWaClick } = useWhatsAppLink(phoneNumber, message)

  // Close arc menu & modal when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
        setShowPhoneModal(false)
      }
    }
    if (isOpen || showPhoneModal) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen, showPhoneModal])

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setShowPhoneModal(false)
      }
    }
    if (isOpen || showPhoneModal) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, showPhoneModal])

  const handlePhoneClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPhoneModal((prev) => !prev)
  }

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
      {/* 3 Phone Numbers Selection Modal / Popover */}
      <AnimatePresence>
        {showPhoneModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 right-0 w-[280px] sm:w-[300px] rounded-2xl border border-surface/30 bg-[#180E09]/95 p-4 text-white backdrop-blur-xl shadow-2xl z-50"
          >
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
              <div className="flex items-center gap-2 text-accent">
                <Phone size={15} />
                <span className="font-mono text-[.72rem] font-bold uppercase tracking-wider text-surface">
                  Select Number to Call
                </span>
              </div>
              <button
                onClick={() => setShowPhoneModal(false)}
                className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                aria-label="Close phone numbers"
              >
                <X size={14} />
              </button>
            </div>

            <p className="font-mono text-[.64rem] text-surface/70 uppercase tracking-wider mb-3">
              Tap any number below to call directly:
            </p>

            <div className="space-y-2">
              {business.phones.map((p) => (
                <a
                  key={p.display}
                  href={`tel:${p.tel}`}
                  onClick={() => {
                    setShowPhoneModal(false)
                    setIsOpen(false)
                  }}
                  className="group flex items-center justify-between rounded-xl bg-white/5 hover:bg-accent hover:text-[#180E09] p-2.5 border border-white/10 hover:border-accent transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[.62rem] uppercase tracking-wider text-surface/80 group-hover:text-[#180E09]/80 font-medium">
                      {p.label}
                    </span>
                    <span className="font-mono text-[.85rem] font-bold text-white group-hover:text-[#180E09] tracking-tight">
                      {p.display}
                    </span>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 group-hover:bg-[#180E09]/20 text-accent group-hover:text-[#180E09] transition-colors">
                    <Phone size={13} />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4 Semicircle / Radial Arc Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="pointer-events-none absolute inset-0">
            {ARC_ITEMS.map((item, index) => {
              const isHovered = hoveredItem === item.id

              // Determine icon, style, and click handler for each item
              let icon = null
              let bgClass = ''
              let href = ''
              let onClick = null
              let target = '_blank'

              if (item.id === 'phone') {
                icon = <Phone size={18} />
                bgClass = showPhoneModal
                  ? 'bg-accent text-[#180E09] ring-2 ring-accent'
                  : 'bg-[#C98E7A] text-[#180E09] hover:bg-[#d49e8b]'
                onClick = handlePhoneClick
              } else if (item.id === 'whatsapp') {
                icon = <MessageCircle size={19} />
                bgClass = 'bg-[#25D366] text-white hover:bg-[#20bd5a]'
                href = waUrl
                onClick = onWaClick
              } else if (item.id === 'instagram') {
                icon = <Instagram size={18} />
                bgClass = 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white'
                href = business.social.instagram
              } else if (item.id === 'facebook') {
                icon = <Facebook size={18} />
                bgClass = 'bg-[#1877F2] text-white hover:bg-[#166fe5]'
                href = business.social.facebook
              }

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    x: item.x,
                    y: item.y,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0,
                    transition: { duration: 0.18, delay: (ARC_ITEMS.length - 1 - index) * 0.02 },
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 24,
                    delay: index * 0.035,
                  }}
                  className="pointer-events-auto absolute top-1.5 left-1.5"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Floating tooltip label on hover/touch */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.85 }}
                        transition={{ duration: 0.12 }}
                        className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#180E09] px-2 py-0.5 font-mono text-[.64rem] font-semibold uppercase tracking-wider text-white border border-surface/30 shadow-xl"
                      >
                        {item.label}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {item.id === 'phone' ? (
                    <button
                      onClick={onClick}
                      aria-label="Call studio phone numbers"
                      className={`flex h-11 w-11 items-center justify-center rounded-full shadow-xl transition-transform duration-200 hover:scale-115 active:scale-95 cursor-pointer ${bgClass}`}
                    >
                      {icon}
                    </button>
                  ) : (
                    <a
                      href={href}
                      onClick={onClick}
                      target={target}
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className={`flex h-11 w-11 items-center justify-center rounded-full shadow-xl transition-transform duration-200 hover:scale-115 active:scale-95 cursor-pointer ${bgClass}`}
                    >
                      {icon}
                    </a>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Main Floating Circle Button (Bottom-Right) */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          setIsOpen((prev) => !prev)
          setShowPhoneModal(false)
        }}
        aria-label={isOpen ? 'Close contact menu' : 'Contact Balaji Interior Decor'}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 cursor-pointer ${
          isOpen
            ? 'bg-[#180E09] text-white border border-surface/40'
            : 'bg-[#25D366] text-white hover:bg-[#20bd5a] hover:shadow-[0_8px_32px_rgba(37,211,102,0.45)]'
        }`}
      >
        {/* Pulsing ambient radar wave when closed */}
        {!isOpen && (
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366] animate-ping opacity-25" />
        )}

        {/* Animated Icon: Message icon rotates to X */}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="flex items-center justify-center"
            >
              <MessageCircle size={26} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Contact" tag badge when closed */}
        {!isOpen && (
          <span className="absolute -top-2 -left-2 rounded-full bg-[#180E09] px-2.5 py-0.5 font-mono text-[.64rem] font-bold uppercase tracking-wider text-white border border-surface/30 shadow-md pointer-events-none">
            Contact
          </span>
        )}
      </motion.button>
    </div>
  )
}
