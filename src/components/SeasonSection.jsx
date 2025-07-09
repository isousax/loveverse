import { useMemo } from 'react'
import FallingEmojis from './FallingEmojis'
import { useAppContext } from '../context/AppContext'

const seasons = [
  { name: 'verão', emoji: '☀️' },
  { name: 'outono', emoji: '🍂' },
  { name: 'inverno', emoji: '❄️' },
  { name: 'primavera', emoji: '🌸' },
]

const gradientClasses = {
  verão: 'from-yellow-400 to-orange-500',
  outono: 'from-orange-500 to-red-600',
  inverno: 'from-blue-400 to-blue-700',
  primavera: 'from-pink-400 to-pink-600',
}

function getSeason(date) {
  const month = date.getMonth()
  // Hemisfério Sul:
  if ([11, 0, 1].includes(month)) return seasons[0] // verão
  if ([2, 3, 4].includes(month)) return seasons[1] // outono
  if ([5, 6, 7].includes(month)) return seasons[2] // inverno
  return seasons[3] // primavera
}

function getSeasonDescription(seasonName) {
  switch (seasonName) {
    case 'verão':
      return 'Sob o calor do sol e dias longos, nossa história começou em um momento perfeito.'
    case 'outono':
      return 'Entre folhas caídas e o vento suave, nossa história ganhou um tom aconchegante.'
    case 'inverno':
      return 'Com o frio no ar, nossa história aqueceu nossos corações na estação mais fria.'
    case 'primavera':
      return 'Floresceram nossos sentimentos na estação das flores e renovações.'
    default:
      return ''
  }
}

export default function SeasonSection() {
  const { startDate } = useAppContext()
  const season = useMemo(() => getSeason(startDate), [startDate])
  const description = useMemo(() => getSeasonDescription(season.name), [season.name])

  return (
    <section
      className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden snap-start snap-always bg-[rgb(18,18,18)] shadow-[inset_0_0_150px_rgba(0,0,0,0.7)]"
      aria-label="Estação do Ano em que o namoro começou"
    >
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            filter: brightness(1) drop-shadow(0 0 4px #fff);
          }
          50% {
            transform: translateY(-6px) rotate(5deg);
            filter: brightness(1.3) drop-shadow(0 0 8px #fff);
          }
        }
        .float-emoji {
          animation: float 4s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>

      <div className="container mx-auto px-4 flex items-center justify-center overflow-hidden">
        <div className="max-w-4xl text-center opacity-100 transform-none">
          <h2 className="mb-8 text-white text-4xl md:text-5xl font-bold">
            <span className="block mb-4 text-2xl md:text-3xl opacity-80">
              Nossa história começou no
            </span>
            <div className="flex items-center justify-center gap-4">
              <span
                className={`text-5xl md:text-7xl bg-gradient-to-r ${gradientClasses[season.name]} bg-clip-text text-transparent`}
              >
                {season.name}
              </span>
              <span
                className="float-emoji text-5xl md:text-7xl"
                aria-label={`${season.name} emoji`}
              >
                {season.emoji}
              </span>
            </div>
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-xl md:text-2xl text-white/80">
            {description}
          </p>
        </div>
      </div>

      {/* Emojis caindo */}
      {season.name === 'outono' && (
        <FallingEmojis
          emoji="🍂"
          colorClass="text-orange-500"
          maxMobile={7}
          maxDesktop={15}
          opacity="opacity-30"
          animationClass="animate-fall-slow"
        />
      )}
      {season.name === 'inverno' && (
        <FallingEmojis
          emoji="❄️"
          colorClass="text-blue-200"
          maxMobile={20}
          maxDesktop={40}
          opacity="opacity-50"
          animationClass="animate-fall-slow"
        />
      )}
      {season.name === 'primavera' && (
        <FallingEmojis
          emoji="🌸"
          colorClass="text-pink-400"
          maxMobile={10}
          maxDesktop={20}
          opacity="opacity-40"
          animationClass="animate-fall-slower"
        />
      )}
      {season.name === 'verão' && (
        <FallingEmojis
          emoji="☀️"
          colorClass="text-yellow-300"
          maxMobile={5}
          maxDesktop={12}
          opacity="opacity-40"
          animationClass="animate-fall-slower"
        />
      )}
    </section>
  )
}