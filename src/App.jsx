import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StarBackground from './components/StarBackground'
import SplashScreen from './components/SplashScreen'
import Intro from './components/Intro'
import Hero from './components/Hero'
import MusicSection from './components/MusicSection'
import SeasonSection from './components/SeasonSection'
import MoonSection from './components/MoonSection'
import Signo from './components/Signo'
import FinalSection from './components/FinalSection'
import PhotoSection from './components/PhotoSection'

import { useIsAppReady } from './hooks/useIsAppReady'
import { photoSections } from './data/photoSections'
import { musicData } from './data/musicData'
import { introPhraseData } from './data/introPhraseData'

function ScrollHintIndicator({ onClick }) {
  return (
    <motion.div
      key="scroll-hint"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 bottom-4 flex justify-center pointer-events-none z-50"
    >
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label="Ir para próxima seção"
        className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-md pointer-events-auto"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClick()
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>
    </motion.div>
  )
}

export default function App() {
  const isAppReady = useIsAppReady()
  const [showIntro, setShowIntro] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const sectionsRef = useRef([])

  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    if (isMobile && activeIndex >= 4 && activeIndex < sectionsRef.current.length - 1) {
      setShowScrollHint(false)
    } else {
      setShowScrollHint(true)
    }
  }, [activeIndex])

  useEffect(() => {
    if (showIntro) return

    const handleScroll = () => {
      const center = window.scrollY + window.innerHeight / 2
      let closestIndex = 0
      let minDistance = Infinity

      sectionsRef.current.forEach((el, i) => {
        const offsetTop = el.offsetTop
        const offsetCenter = offsetTop + el.clientHeight / 2
        const distance = Math.abs(center - offsetCenter)

        if (distance < minDistance) {
          minDistance = distance
          closestIndex = i
        }
      })

      setActiveIndex(closestIndex)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [showIntro])

  const goToSection = (index) => {
    sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollHintClick = () => {
    if (activeIndex === sectionsRef.current.length - 1) {
      goToSection(0)
    } else {
      goToSection(activeIndex + 1)
    }
  }

  const touchStartY = useRef(null)

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return
    const deltaY = e.changedTouches[0].clientY - touchStartY.current

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && activeIndex > 0) {
        goToSection(activeIndex - 1)
      } else if (deltaY < 0 && activeIndex < sectionsRef.current.length - 1) {
        goToSection(activeIndex + 1)
      }
    }

    touchStartY.current = null
  }

  const sections = [
    <Hero key="hero" />,
    <MusicSection key="music" music={musicData} />,
    <SeasonSection key="season" />,
    <MoonSection key="moon" />,
    <Signo key="signo" />,
    ...photoSections.map((section, i) => (
      <PhotoSection
        key={`photo-${i}`}
        chapter={section.chapter}
        title={section.title}
        description={section.description}
        image={section.image}
      />
    )),
    <FinalSection key="final" />,
  ]

  // Tela de carregamento real
  if (!isAppReady) return <SplashScreen />

  return (
    <>
      <StarBackground />

      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="h-screen flex items-center justify-center"
          >
            <Intro onFinish={() => setShowIntro(false)} introPhraseData={introPhraseData} />
          </motion.div>
        ) : (
          <>
            {/* Indicador lateral */}
            <div className="section-indicator fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
              {sections.map((_, i) => (
                <div
                  key={i}
                  className={`section-dot w-3 h-3 rounded-full transition-transform duration-300 cursor-pointer ${i === activeIndex ? 'bg-white scale-125' : 'bg-white/30 scale-100'}`}
                  onClick={() => goToSection(i)}
                  aria-label={`Ir para seção ${i + 1}`}
                ></div>
              ))}
            </div>

            {/* Seções com swipe e scroll */}
            <motion.div
              key="sections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="snap-y snap-mandatory scroll-smooth"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {sections.map((section, i) => (
                <section
                  key={i}
                  ref={(el) => (sectionsRef.current[i] = el)}
                  className="snap-start h-screen w-full"
                >
                  {section}
                </section>
              ))}
            </motion.div>

            {/* Botão scroll para próxima seção */}
            <AnimatePresence>
              {showScrollHint && (
                <ScrollHintIndicator onClick={handleScrollHintClick} />
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  )
}