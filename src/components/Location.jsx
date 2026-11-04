import React from 'react'
import {
  MapPin,
  Navigation,
  ExternalLink,
  Phone,
  MessageCircle,
  Clock,
  Car,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { useWhatsAppLink } from '../utils/whatsapp'

const STUDIO_ADDRESS = {
  name: 'Balaji Interior Decor',
  line1: 'No 24, Agaram Main Road',
  line2: 'Sri Ranganatha Nagar, Selaiyur',
  city: 'Tambaram, Chennai - 600073',
  landmark: 'Near Bharath University / Camp Road',
  fullQuery:
    'Balaji Interior Decor, No 24, Agaram Main Road, Sri Ranganatha Nagar, Selaiyur, Tambaram, Chennai - 600073',
}

// Google Maps Embed URL with explicit query and pin marker
const GMAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  STUDIO_ADDRESS.fullQuery
)}&t=&z=17&ie=UTF8&iwloc=B&output=embed`

// Direct Google Maps Directions link enforcing exact Balaji Interior Decor destination
const GMAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  STUDIO_ADDRESS.fullQuery
)}`

// View exact pinned location in Google Maps
const GMAPS_VIEW_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  STUDIO_ADDRESS.fullQuery
)}`

export default function Location() {
  const { url: whatsappUrl, onClick: onWhatsAppClick } = useWhatsAppLink(
    '919500005400',
    "Hi Balaji Interior Decor, I'd like to visit your studio in Selaiyur, Tambaram."
  )

  return (
    <section
      className="relative min-h-screen bg-[#180E09] px-[5vw] py-20 md:py-28 text-ivory max-md:px-[6vw] flex flex-col justify-between overflow-hidden scroll-mt-16 md:scroll-mt-20 border-t border-ivory/10"
      id="location"
      data-scroll-section
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-bronze/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-espresso-soft/20 blur-[150px]" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-ivory/10 pb-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-[.68rem] tracking-widest uppercase text-bronze-light">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-bronze animate-pulse" />
            <span>06 / VISIT OUR EXPERIENCE STUDIO</span>
            <span className="text-ivory/30">•</span>
            <span className="text-ivory/60">SELAIYUR, TAMBARAM</span>
          </div>

          <h2 className="mt-2 text-2xl md:text-3xl lg:text-[2.6rem] font-serif italic font-normal tracking-tight leading-[1.15]">
            <span className="text-ivory">Touch the materials.</span>{' '}
            <span className="text-bronze-light">Experience the craft in person.</span>
          </h2>
        </div>

        {/* Live Studio Badge */}
        <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 border border-ivory/15 backdrop-blur-md self-start lg:self-auto shrink-0">
          <MapPin size={14} className="text-red-500 animate-bounce [animation-duration:2.5s]" />
          <span className="font-mono text-[.72rem] tracking-wider uppercase text-ivory/80">
            Studio Location Pinned
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
        </div>
      </div>

      {/* Main Grid: Details on Left, Interactive Map on Right */}
      <div className="relative z-10 my-auto py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Address Card & Direction Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Primary Address Card */}
            <div className="rounded-2xl border border-ivory/15 bg-black/40 p-6 md:p-8 backdrop-blur-md shadow-xl flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-ivory/10">
                  <span className="font-mono text-[.68rem] tracking-widest uppercase text-bronze">
                    STUDIO LOCATION
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[.62rem] text-ivory/60 uppercase">
                    <CheckCircle2 size={12} className="text-bronze" /> Parking Available
                  </span>
                </div>

                <div className="mt-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 shrink-0 mt-0.5">
                      <MapPin size={22} className="fill-red-500/20 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl text-ivory">
                        Balaji Interior Decor
                      </h3>
                      <div className="mt-2 font-sans text-sm md:text-base text-ivory/80 leading-relaxed">
                        <p className="font-semibold text-ivory">{STUDIO_ADDRESS.line1}</p>
                        <p>{STUDIO_ADDRESS.line2}</p>
                        <p className="text-bronze-light font-mono text-xs mt-1">
                          {STUDIO_ADDRESS.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Studio Highlights */}
                <div className="mt-6 pt-5 border-t border-ivory/10 space-y-3">
                  <div className="flex items-center gap-2.5 text-[.78rem] text-ivory/70">
                    <Clock size={15} className="text-bronze shrink-0" />
                    <span>
                      <strong className="text-ivory font-medium">Mon – Sat:</strong> 9:30 AM – 8:30 PM
                      <span className="text-ivory/40"> | </span>
                      <strong className="text-ivory font-medium">Sun:</strong> By Appt
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-[.78rem] text-ivory/70">
                    <Car size={15} className="text-bronze shrink-0" />
                    <span>Near Bharath University & Camp Road Junction, Selaiyur</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-[.78rem] text-ivory/70">
                    <Sparkles size={15} className="text-bronze shrink-0" />
                    <span>Full modular kitchen, wardrobe & false ceiling mockups on display</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-ivory/10 space-y-3">
                {/* 1. Primary Action: Get Directions in Google Maps */}
                <a
                  href={GMAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-bronze px-5 py-3.5 font-mono text-[.78rem] font-bold uppercase tracking-wider text-[#1A110B] transition-all duration-300 hover:bg-bronze-light hover:shadow-[0_4px_25px_rgba(201,142,122,0.35)] cursor-pointer"
                >
                  <Navigation size={16} className="transition-transform group-hover:rotate-45" />
                  <span>Get Directions in Google Maps</span>
                  <ExternalLink size={14} className="opacity-70" />
                </a>

                {/* 2. Secondary Quick Contacts Row */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="tel:+919500005400"
                    className="flex items-center justify-center gap-2 rounded-xl border border-ivory/15 bg-black/40 px-3 py-2.5 font-mono text-[.72rem] text-ivory/90 hover:text-white hover:border-bronze hover:bg-bronze/10 transition-all cursor-pointer"
                  >
                    <Phone size={14} className="text-bronze" />
                    <span>Call Studio</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    onClick={onWhatsAppClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-2.5 font-mono text-[.72rem] text-white hover:bg-[#25D366]/20 transition-all cursor-pointer"
                  >
                    <MessageCircle size={14} className="text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Window with Pin Marker */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-full min-h-[440px] md:min-h-[520px] overflow-hidden rounded-2xl border border-ivory/15 bg-black/70 shadow-2xl group">
              {/* Google Maps Interactive Iframe */}
              <iframe
                title="Balaji Interior Decor Google Maps Location"
                src={GMAPS_EMBED_URL}
                className="w-full h-full min-h-[440px] md:min-h-[520px] border-0"
                style={{ filter: 'contrast(1.05) brightness(0.92)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Map Header Overlay with Studio Pin info */}
              <div className="pointer-events-none absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20">
                <div className="flex items-center gap-2.5 rounded-full bg-black/90 px-4 py-2 border border-bronze/40 backdrop-blur-md shadow-xl pointer-events-auto">
                  <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute h-full w-full rounded-full bg-red-500 animate-ping" />
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                  </div>
                  <span className="font-mono text-[.7rem] uppercase tracking-wider text-ivory font-semibold">
                    Balaji Interior Decor Pin
                  </span>
                </div>

                {/* Direct Google Maps link button on the map */}
                <a
                  href={GMAPS_VIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/90 hover:bg-black px-4 py-2 border border-ivory/25 hover:border-bronze font-mono text-[.68rem] uppercase tracking-wider text-bronze hover:text-ivory transition-all shadow-xl cursor-pointer"
                >
                  <span>Open Full Map</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Center Map Pinpoint Beacon to visually mark the exact studio on the map */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <span className="absolute h-14 w-14 rounded-full bg-red-500/25 animate-ping" />
                  <span className="absolute h-8 w-8 rounded-full bg-red-500/40" />
                  <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl ring-2 ring-white">
                    <MapPin size={20} className="fill-white text-red-600" />
                  </div>
                </div>
                <div className="mt-2 rounded-lg bg-black/95 px-3 py-1 font-mono text-[.68rem] font-bold text-ivory shadow-2xl border border-bronze/40 flex items-center gap-1.5 backdrop-blur-md whitespace-nowrap">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                  <span>Balaji Interior Decor (No. 24)</span>
                </div>
              </div>

              {/* Bottom Subtle Overlay Reminder */}
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                <div className="rounded-lg bg-black/90 px-3.5 py-1.5 border border-ivory/15 backdrop-blur-md text-[.7rem] text-ivory/80 font-mono">
                  📍 No 24, Agaram Main Road, Selaiyur, Tambaram - 600073
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
