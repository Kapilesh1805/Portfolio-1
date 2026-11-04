import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import LocationPage from './pages/LocationPage'
import PageTransition from './components/animations/PageTransition'
import LoadingScreen from './components/animations/LoadingScreen'
import WhatsAppButton from './components/WhatsAppButton'

// We control scroll ourselves when coming back from a service page.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

function App() {
  const [loading, setLoading] = useState(true)
  const [heroEntrance, setHeroEntrance] = useState(false)

  return (
    <>
      {loading && (
        <LoadingScreen
          onStartTransition={() => setHeroEntrance(true)}
          onComplete={() => setLoading(false)}
        />
      )}

      <div className="overflow-x-clip">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home heroEntrance={!loading || heroEntrance} />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PageTransition>
      </div>

      {/* Floating WhatsApp Quick Action Button */}
      {!loading && <WhatsAppButton />}
    </>
  )
}

export default App