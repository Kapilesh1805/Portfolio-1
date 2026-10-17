import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import { TiltProvider } from './components/animations/TiltTransition'
import LoadingScreen from './components/animations/LoadingScreen'

// We control scroll ourselves when coming back from a service page.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div className="overflow-x-clip">
        <TiltProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TiltProvider>
      </div>
    </>
  )
}

export default App