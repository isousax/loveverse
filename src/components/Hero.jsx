import { motion } from 'framer-motion'
import FloatingBubbles from './FloatingBubbles'
import { useAppContext } from '../context/AppContext'
import useElapsedTime from '../hooks/useElapsedTime'

export default function Hero() {
  const { startDate } = useAppContext()
  const tempo = useElapsedTime(startDate)

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  return (
    <section
      className="relative flex flex-col items-center justify-center px-6 text-center text-white snap-start snap-always overflow-hidden pb-12 md:pb-0"
      style={{
        height: '100dvh',
        background: 'linear-gradient(135deg, rgb(99, 102, 241), rgb(236, 72, 153))',
      }}
    >
      <FloatingBubbles />

      <motion.div
        className="relative z-10 max-w-4xl flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="mb-8 text-4xl font-bold tracking-tight md:text-8xl" variants={itemVariants}>
          Nossa História
        </motion.h1>

        <motion.p className="mb-12 text-xl text-white md:text-2xl" variants={itemVariants}>
          Uma jornada de amor e momentos inesquecíveis
        </motion.p>

        <motion.div className="relative mb-10 w-48 h-48 md:w-64 md:h-64" variants={itemVariants}>
          <div
            className="absolute top-1/2 left-1/2 rounded-full bg-yellow-400"
            style={{
              width: 60,
              height: 60,
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 0 12px rgba(255, 223, 0, 0.9))',
              boxShadow: '0 0 25px 10px rgba(255, 223, 0, 0.7), inset 0 0 15px 5px rgba(255, 244, 174, 0.8)',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 rounded-full border border-white/25"
            style={{
              width: 192,
              height: 192,
              transform: 'translate(-50%, -50%)',
              animation: 'orbitRotate 25s linear infinite',
            }}
          >
            <div
              className="absolute rounded-full"
              style={{
                width: 30,
                height: 30,
                top: '50%',
                left: '100%',
                marginTop: -15,
                marginLeft: -15,
                background: 'radial-gradient(circle at 30% 30%, #3b82f6, #2563eb 70%)',
                boxShadow: '0 0 10px 3px rgba(59, 130, 246, 0.7), inset 0 0 8px rgba(191, 219, 254, 0.9)',
              }}
            />
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-4 gap-6" variants={containerVariants}>
          {['days', 'hours', 'minutes', 'seconds'].map((label) => (
            <motion.div className="flex flex-col items-center" key={label} variants={itemVariants}>
              <span className="text-3xl font-bold text-white md:text-5xl">
                {tempo[label] !== undefined ? tempo[label].toString().padStart(2, '0') : '00'}
              </span>
              <span className="mt-1 text-sm text-purple-200 md:text-lg">
                {label === 'days' ? 'dias' : label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-6 w-full max-w-md text-base italic text-purple-200 md:text-xl md:whitespace-nowrap"
          variants={itemVariants}
        >
          {tempo.years === 0
            ? 'Ainda estamos no começo da nossa jornada juntos...'
            : `Já demos ${tempo.years} volta${tempo.years > 1 ? 's' : ''} ao redor do sol...`}
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
      `}</style>
    </section>
  )
}