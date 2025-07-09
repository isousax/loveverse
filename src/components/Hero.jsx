import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { intervalToDuration, differenceInDays } from 'date-fns'
import Bolha from '../assets/bolha.svg'

function calcularTempo(startDate) {
  const agora = new Date()
  const duration = intervalToDuration({ start: startDate, end: agora })
  const dias = differenceInDays(agora, startDate)

  const segundos = agora.getSeconds()
  const minutos = agora.getMinutes()
  const horas = agora.getHours()
  const anos = duration.years || 0

  return { dias, horas, minutos, segundos, anos }
}

const bolhasDesktop = [
  { top: '9%', left: '15%', size: 440, delay: '0s' },
  { top: '30%', left: '70%', size: 800, delay: '2s' },
  { top: '55%', left: '10%', size: 420, delay: '4s' },
  { top: '75%', left: '80%', size: 380, delay: '6s' },
  { top: '20%', left: '50%', size: 820, delay: '1s' },
  { top: '20%', left: '85%', size: 440, delay: '3s' },
  { top: '5%', left: '5%', size: 360, delay: '1.5s' },
  { top: '85%', left: '15%', size: 780, delay: '3.5s' },
  { top: '8%', left: '90%', size: 370, delay: '5s' },
  { top: '65%', left: '60%', size: 410, delay: '6.5s' },
  { top: '19%', left: '22%', size: 630, delay: '2.5s' },
  { top: '-18%', left: '40%', size: 630, delay: '2.5s' },
  { top: '60%', left: '10%', size: 800, delay: '4.5s' },
  { top: '10%', left: '60%', size: 400, delay: '5.5s' },
]

const bolhasMobile = [
  { top: '1%', left: '2%', size: 300, delay: '0s' },
  { top: '25%', left: '75%', size: 180, delay: '2s' },
  { top: '40%', left: '-8%', size: 210, delay: '4s' },
  { top: '77%', left: '7%', size: 200, delay: '1s' },
  { top: '78%', left: '53%', size: 360, delay: '3s' },
  { top: '-1%', left: '-8%', size: 160, delay: '1.5s' },
  { top: '35%', left: '50%', size: 200, delay: '5s' },
  { top: '50%', left: '50%', size: 270, delay: '6.5s' },
  { top: '55%', left: '8%', size: 280, delay: '4.5s' },
  { top: '-1%', left: '55%', size: 130, delay: '5.5s' },
]

export default function Hero({ startDate }) {
  const [tempo, setTempo] = useState(calcularTempo(startDate))
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTempo(calcularTempo(startDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [startDate])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mediaQuery.matches)

    const handler = (e) => setIsMobile(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const bolhas = isMobile ? bolhasMobile : bolhasDesktop

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      className="hero-section flex items-center justify-center text-white text-center px-6 relative snap-start snap-always overflow-hidden pb-12 md:pb-0"
      style={{
        background:
          'linear-gradient(135deg, rgb(99, 102, 241), rgb(236, 72, 153))',
        height: '100dvh', // aqui a alteração principal para height
      }}
    >
      {bolhas.map((b, i) => (
        <img
          key={i}
          src={Bolha}
          alt="bolha decorativa"
          className="absolute opacity-30 animate-bolha-flutuante"
          style={{
            top: b.top,
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDelay: b.delay,
            zIndex: 0,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 max-w-4xl flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-8xl font-bold mb-8 tracking-tight"
          variants={itemVariants}
        >
          Nossa História
        </motion.h1>

        <motion.p
          className="hero-subtitle text-xl md:text-2xl text-white mb-12"
          variants={itemVariants}
        >
          Uma jornada de amor e momentos inesquecíveis
        </motion.p>

        <motion.div
          className="relative w-48 h-48 md:w-64 md:h-64 mb-10"
          variants={itemVariants}
        >
          <div
            className="absolute top-1/2 left-1/2 rounded-full bg-yellow-400"
            style={{
              width: '60px',
              height: '60px',
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9))',
              boxShadow:
                '0 0 25px 10px rgba(255, 223, 0, 0.7), inset 0 0 15px 5px rgba(255, 244, 174, 0.8)',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 rounded-full border border-white/25"
            style={{
              width: '192px',
              height: '192px',
              transform: 'translate(-50%, -50%)',
              animation: 'orbitRotate 25s linear infinite',
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: '30px',
                height: '30px',
                position: 'absolute',
                top: '50%',
                left: '100%',
                marginTop: '-15px',
                marginLeft: '-15px',
                background:
                  'radial-gradient(circle at 30% 30%, #3b82f6, #2563eb 70%)',
                boxShadow:
                  '0 0 10px 3px rgba(59, 130, 246, 0.7), inset 0 0 8px rgba(191, 219, 254, 0.9)',
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {['dias', 'horas', 'minutos', 'segundos'].map((label) => (
            <motion.div
              className="flex flex-col items-center"
              key={label}
              variants={itemVariants}
            >
              <span className="text-3xl md:text-5xl font-bold text-white">
                {tempo[label]}
              </span>
              <span className="text-sm md:text-lg text-purple-200 mt-1">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-purple-200 mt-6 italic w-full max-w-md h-16 text-base md:text-xl md:whitespace-nowrap"
          variants={itemVariants}
        >
          {tempo.anos === 0
            ? 'Ainda estamos no começo da nossa jornada juntos...'
            : `Já demos ${tempo.anos} volta${tempo.anos > 1 ? 's' : ''} ao redor do sol...`}
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes orbitRotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes bolhaFlutuante {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-40px);
          }
        }

        .animate-bolha-flutuante {
          animation: bolhaFlutuante 30s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}