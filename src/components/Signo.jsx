import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { SIGNOS } from '../utils/signos'

function descobrirSigno(date) {
  const dia = date.getDate()
  const mes = date.getMonth() + 1 // JS: Janeiro = 0

  return (
    SIGNOS.find((s) => {
      const [inicioMes, inicioDia] = s.inicio
      const [fimMes, fimDia] = s.fim

      if (inicioMes < fimMes || (inicioMes === fimMes && inicioDia <= fimDia)) {
        return (
          (mes === inicioMes && dia >= inicioDia) ||
          (mes === fimMes && dia <= fimDia) ||
          (mes > inicioMes && mes < fimMes)
        )
      } else {
        // Signos que atravessam o ano (ex: Capricórnio)
        return (
          (mes === inicioMes && dia >= inicioDia) ||
          (mes === fimMes && dia <= fimDia) ||
          (mes > inicioMes || mes < fimMes)
        )
      }
    }) || SIGNOS[0]
  )
}

export default function Signo({ startDate }) {
  const signo = useMemo(() => descobrirSigno(startDate), [startDate])
  const [cliques, setCliques] = useState(0)
  const [revelado, setRevelado] = useState(false)
  const [explodindo, setExplodindo] = useState(false)
  const [mostrarConteudoFinal, setMostrarConteudoFinal] = useState(false)
  const [isInflating, setIsInflating] = useState(false)

  const estrelas = useMemo(() => {
    return Array.from({ length: 60 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${1 + Math.random() * 3}px`,
      height: `${1 + Math.random() * 4}px`,
      opacity: Math.random().toFixed(2),
      duration: `${2 + Math.random() * 4}s`,
    }))
  }, [])

  const CLIQUES_NECESSARIOS = 5
  const handleClick = () => {
    if (revelado || explodindo) return

    setIsInflating(true)

    setTimeout(() => {
      setIsInflating(false)
    }, 300)

    const novoCliques = cliques + 1
    setCliques(novoCliques)

    if (novoCliques >= CLIQUES_NECESSARIOS) {
      setExplodindo(true)

      setTimeout(() => {
        setRevelado(true)
        setExplodindo(false)
        setMostrarConteudoFinal(true)
      }, 2800)
    }
  }

  return (
    <section className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden snap-start px-4 bg-[#121212] shadow-[inset_0_0_150px_rgba(0,0,0,0.7)] select-none pb-10 md:pb-0">
      {/* Fundo com estrelas */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
        {estrelas.map((star, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: star.width,
              height: star.height,
              opacity: star.opacity,
              animation: `twinkle ${star.duration} ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center w-full max-w-4xl px-4">
        {/* Etapa inicial */}
        {!revelado && !explodindo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-8 text-white/90"
          >
            {/* Elemento clicável com animação de inflar */}
            <motion.div
              onClick={handleClick}
              animate={{ scale: isInflating ? 1.2 : 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative flex items-center justify-center rounded-full cursor-pointer"
              style={{
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle at center, #a16ee8, #5c3ea1)',
                boxShadow: '0 0 30px 10px rgba(161,110,232,0.7), inset 0 0 20px 5px rgba(92,62,161,0.9)',
              }}
              role="button"
              aria-label="Clique para revelar o signo"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleClick()
              }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                style={{
                  fontSize: '96px',
                  fontWeight: '900',
                  color: '#cbbcff',
                  textShadow:
                    '0 0 10px #b492ff, 0 0 20px #a370ff, 0 0 30px #8f5de8, 0 0 40px #b492ff',
                  userSelect: 'none',
                }}
              >
                ?
              </motion.span>
            </motion.div>

            <span className="text-xl md:text-3xl font-semibold">
              Clique <strong>{CLIQUES_NECESSARIOS} vezes</strong> para revelar nosso signo
            </span>
          </motion.div>
        )}

        {/* Explosão radial */}
        {explodindo && (
          <>
            {/* Partículas dos emojis do signo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              {Array.from({ length: 30 }).map((_, i) => {
                const angle = (i / 30) * 2 * Math.PI
                const radius = 150 + Math.random() * 150
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                return (
                  <motion.span
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x, y, opacity: 0, scale: 1.5 }}
                    transition={{
                      duration: 2.5,
                      ease: 'easeOut',
                    }}
                    className="absolute text-[36px] md:text-[44px] text-purple-300"
                    style={{
                      textShadow:
                        '0 0 15px #c2a1ff, 0 0 40px #a370ff, 0 0 70px #7c48ff',
                    }}
                  >
                    {signo.emoji}
                  </motion.span>
                )
              })}
            </div>

            {/* Partículas pequenas de luz */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i / 60) * 2 * Math.PI
                const radius = 120 + Math.random() * 200
                const x = Math.cos(angle) * radius * (0.7 + Math.random() * 0.6)
                const y = Math.sin(angle) * radius * (0.7 + Math.random() * 0.6)
                const size = 4 + Math.random() * 4
                const opacity = 0.5 + Math.random() * 0.5

                return (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x, y, opacity: 0, scale: 1.3 }}
                    transition={{
                      duration: 2.5,
                      ease: 'easeOut',
                    }}
                    className="absolute rounded-full bg-purple-400"
                    style={{
                      width: size,
                      height: size,
                      filter: 'blur(3px)',
                      opacity,
                      boxShadow: '0 0 10px 5px #a577ff',
                    }}
                  />
                )
              })}
            </div>
          </>
        )}

        {/* Conteúdo do signo */}
        {mostrarConteudoFinal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <span className="text-[5vw] lg:text-[2vw] text-white/80 block mb-3">
              O nosso signo é
            </span>
            <div className="flex items-center justify-center gap-4 mb-8">
              <h2 className="text-[8vw] lg:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                {signo.nome}
              </h2>
              <span className="text-[8vw] lg:text-7xl text-white">{signo.emoji}</span>
            </div>

            <div className="relative w-48 h-48 md:w-64 md:h-64 my-4 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border border-white/10"></div>
              <div className="absolute inset-8 rounded-full border border-white/5"></div>
              <div
                className="absolute inset-0 flex items-center justify-center text-7xl md:text-8xl text-white"
                style={{ textShadow: '0 0 30px rgba(255,255,255,0.5)' }}
              >
                {signo.emoji}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Elemento</h3>
                <p className="text-white/80 text-sm md:text-base">{signo.elemento}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Regente</h3>
                <p className="text-white/80 text-sm md:text-base">{signo.regente}</p>
              </div>
            </div>

            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
              Nossa história nasceu sob o signo de {signo.nome}, {signo.frase}
            </p>
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2 }
          50% { opacity: 1 }
        }
        .animate-spin-slow {
          animation: spin 40s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}