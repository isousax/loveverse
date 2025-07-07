import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StarBackground from './components/StarBackground'
import Intro from './components/Intro'
import Hero from './components/Hero'
import MusicSection from './components/MusicSection'
import SeasonSection from './components/SeasonSection'
import MoonSection from './components/MoonSection'

function ScrollHintIndicator({ onClick }) {
  return (
    <div className="fixed inset-x-0 bottom-6 flex justify-center pointer-events-none z-50">
      <motion.div
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label="Ir para próxima seção"
        className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-md pointer-events-auto"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick()
          }
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
      </motion.div>
    </div>
  )
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionsRef = useRef([])

  const startDate = new Date(2025, 6, 4)

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
    const nextIndex = (activeIndex + 1) % sectionsRef.current.length
    goToSection(nextIndex)
  }

  const sections = [
    <Hero key="hero" startDate={startDate}/>,
    <MusicSection key="music" />,
    <SeasonSection key="season" startDate={startDate} />,
    <MoonSection key="moon" startDate={startDate} />,
  ]

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
            <Intro onFinish={() => setShowIntro(false)} startDate={startDate} />
          </motion.div>
        ) : (
          <>
            {/* Indicador lateral de seções */}
            <div
              className="section-indicator fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50"
              aria-label="Navegação das seções"
            >
              {sections.map((_, i) => (
                <div
                  key={i}
                  className={`section-dot w-3 h-3 rounded-full transition-transform duration-300 cursor-pointer ${i === activeIndex ? 'bg-white scale-125' : 'bg-white/30 scale-100'}`}
                  onClick={() => goToSection(i)}
                  aria-label={`Ir para seção ${i + 1}`}
                ></div>
              ))}
            </div>

            {/* Seções scrolláveis */}
            <motion.div
              key="sections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="snap-y snap-mandatory scroll-smooth"
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

            {/* Botão central inferior com seta */}
            <ScrollHintIndicator onClick={handleScrollHintClick} />
          </>
        )}
      </AnimatePresence>
    </>
  )
}