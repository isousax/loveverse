import { useState, useEffect } from 'react'
import { Moon } from 'lunarphase-js'

export default function MoonSection({ startDate }) {
  const [phase, setPhase] = useState({ name: '', label: '', emoji: '', text: '' })

  useEffect(() => {
    const rawName = Moon.lunarPhase(startDate).toLowerCase()
    const emoji = Moon.lunarPhaseEmoji(startDate, { hemisphere: 'SOUTHERN' })

    const simplified = (() => {
      if (rawName.includes('new')) {
        return {
          name: 'Nova',
          label: 'lua nova',
          emoji: '🌑',
          text: 'A lua nova selava o início da nossa história com mistério e promessas.',
        }
      } else if (rawName.includes('waxing') || rawName === 'first quarter') {
        return {
          name: 'Crescente',
          label: 'lua crescente',
          emoji: '🌒',
          text: 'A lua crescente iluminava o início da nossa história.',
        }
      } else if (rawName.includes('full')) {
        return {
          name: 'Cheia',
          label: 'lua cheia',
          emoji: '🌕',
          text: 'A lua cheia encheu nossas noites de brilho e paixão.',
        }
      } else if (rawName.includes('waning') || rawName === 'last quarter') {
        return {
          name: 'Minguante',
          label: 'lua minguante',
          emoji: '🌘',
          text: 'A lua minguante trazia calma e reflexão para nós.',
        }
      } else {
        return {
          name: 'Desconhecida',
          label: rawName,
          emoji,
          text: 'A lua brilhava de forma única naquela noite especial.',
        }
      }
    })()

    setPhase(simplified)
  }, [startDate])

  return (
    <section
      className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden snap-start snap-always"
      style={{
        background: 'rgb(18, 18, 18)',
        boxShadow: 'rgba(0, 0, 0, 0.7) 0px 0px 150px inset',
      }}
    >
      {/* Brilhos adaptativos */}
      {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 35)].map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-yellow-300 opacity-80"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: 'twinkle 2s infinite',
            animationDelay: `${Math.random() * 4}s`,
            boxShadow: '0 0 4px 1px rgba(255, 234, 138, 0.6)',
          }}
        />
      ))}

      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-white">
          <span className="block text-xl md:text-3xl mb-2 md:mb-4 opacity-80">
            Naquela noite, a lua estava
          </span>
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <span className="text-4xl md:text-7xl bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              {phase.name}
            </span>
          </div>
        </h2>

        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 flex items-center justify-center">
          {/* Luz adaptativa atrás da lua */}
          <div
            className="absolute rounded-full z-0"
            style={{
              width: '170px',
              height: '170px',
              background: 'radial-gradient(circle, rgba(255,255,180,0.35) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'pulseGlow 5s ease-in-out infinite',
            }}
          />

          <span
            className="relative z-10 text-[120px] md:text-[160px]"
            style={{
              filter: 'grayscale(1) brightness(1.2)',
              textShadow: 'rgba(255, 255, 255, 0.3) 0px 0px 60px',
            }}
          >
            {phase.emoji}
          </span>
        </div>

        <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed px-2">
          {phase.text}
        </p>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.1); }
        }
      `}</style>
    </section>
  )
}