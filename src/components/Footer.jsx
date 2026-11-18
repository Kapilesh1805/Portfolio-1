import { useState } from 'react'
import { business } from '../data/content'
import PhoneModal from './PhoneModal'

function Footer() {
  const [showPhoneModal, setShowPhoneModal] = useState(false)

  return (
    <footer className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-8 border-t border-surface/20 bg-dark px-[5vw] py-10 text-white max-md:grid-cols-2 max-md:items-start max-md:px-[6vw]">
      <div className="font-mono text-[.82rem] font-medium tracking-widest text-white">
        {business.name}<span className="text-accent">.</span>
      </div>
      <p className="m-0 text-[.7rem] leading-[1.5] text-surface/80">
        Independent creative studio
        <br />
        for spaces &amp; stories.
      </p>
      <div className="flex items-start gap-[1.2rem] max-md:flex-col max-md:gap-[.7rem]">
        <a
          className="font-mono text-[.67rem] uppercase text-surface transition-colors hover:text-accent"
          href="#location"
        >
          Visit Us
        </a>
        <a
          className="font-mono text-[.67rem] uppercase text-surface transition-colors hover:text-accent"
          href={business.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <a
          className="font-mono text-[.67rem] uppercase text-surface transition-colors hover:text-accent"
          href={`mailto:${business.email}`}
        >
          Email
        </a>
        <a
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault()
            setShowPhoneModal(true)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setShowPhoneModal(true)
            }
          }}
          className="font-mono text-[.67rem] uppercase text-surface transition-colors hover:text-accent cursor-pointer"
          aria-label="Select phone number to call"
        >
          Phone
        </a>
        <a
          className="font-mono text-[.67rem] uppercase text-surface transition-colors hover:text-accent"
          href={business.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          className="font-mono text-[.67rem] uppercase text-surface transition-colors hover:text-accent"
          href={business.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
      <p className="font-mono text-[.67rem] tracking-widest uppercase text-surface/70 max-md:col-span-2 max-md:mt-8">
        © {new Date().getFullYear()} {business.name}
      </p>

      {/* 3 Studio Numbers Selection Modal */}
      <PhoneModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
      />
    </footer>
  )
}

export default Footer
