import React, { useState } from 'react'
import Preloader from './components/Preloader.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import HeroSection from './components/HeroSection.jsx'
import VisionSection from './components/VisionSection.jsx'
import NatureSection from './components/NatureSection.jsx'
import MethodologySection from './components/MethodologySection.jsx'
import PrinciplesSection from './components/PrinciplesSection.jsx'
import PerspectivesSection from './components/PerspectivesSection.jsx'
import AlephSection from './components/AlephSection.jsx'
import Footer from './components/Footer.jsx'
import useSmoothScroll from './hooks/useSmoothScroll.js'
import HeroNav from './components/HeroNav.jsx'

export default function App() {
  useSmoothScroll()
  const [showPreloader, setShowPreloader] = useState(true)

  return (
    <div className="bg-[#00040A] relative min-h-screen w-full overflow-x-hidden">
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}
      
      {/* Main App Container */}
      <div className={`transition-opacity duration-1000 ${showPreloader ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <CustomCursor />
        <HeroNav />
        <HeroSection />
        <VisionSection />
        <NatureSection />
        <MethodologySection />
        <PrinciplesSection />
        <PerspectivesSection />
        <AlephSection />
        <Footer />
      </div>
    </div>
  )
}
