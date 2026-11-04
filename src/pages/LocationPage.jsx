import React, { useLayoutEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Location from '../components/Location'
import Footer from '../components/Footer'

export default function LocationPage() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="min-h-screen bg-[#180E09] text-ivory flex flex-col justify-between">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-ivory/10 bg-[#180E09]/85 px-[5vw] py-4 backdrop-blur-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[.74rem] uppercase tracking-wider text-bronze hover:text-ivory transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div className="font-mono text-[.82rem] font-medium tracking-widest text-ivory">
          Balaji Interior Decor<span className="text-bronze">.</span>
        </div>
      </header>

      {/* Main Location Section */}
      <main className="flex-1">
        <Location />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

