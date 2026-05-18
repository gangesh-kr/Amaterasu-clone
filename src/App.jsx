import React, { useState, useEffect } from 'react'
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
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useSmoothScroll()
  const [showPreloader, setShowPreloader] = useState(true)

  // Recalculate ScrollTrigger offsets once the preloader fades and the DOM container expands from h-screen to full auto height
  useEffect(() => {
    if (!showPreloader) {
      // Trigger instant recalculation
      ScrollTrigger.refresh()

      // Trigger staggered recalculations during the 1000ms transition to ensure exact offsets are recorded
      const t1 = setTimeout(() => ScrollTrigger.refresh(), 100)
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 500)
      const t3 = setTimeout(() => ScrollTrigger.refresh(), 1050)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    }
  }, [showPreloader])

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
