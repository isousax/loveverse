import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = data.toLocaleString('pt-BR', { month: 'long' })
  const ano = data.getFullYear()
  return `${dia} de ${mes} de ${ano}`
}

const phrases = [
  'Alguns encontros mudam nossas vidas para sempre...',
  'Cada momento ao seu lado é uma memória eterna...',
  'Nossa história é feita de pequenos instantes mágicos...',
  'Vamos reviver nossa jornada...',
]

export default function Intro({ onFinish, startDate }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < phrases.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1)
      }, 5000)
      return () => clearTimeout(timer)
    } else {
      const finishTimer = setTimeout(() => {
        if (onFinish) onFinish()
      }, 5000)
      return () => clearTimeout(finishTimer)
    }
  }, [index, onFinish])

  // Listener de duplo clique
  useEffect(() => {
    const handleDoubleClick = () => {
      if (onFinish) onFinish()
    }

    window.addEventListener('dblclick', handleDoubleClick)
    return () => window.removeEventListener('dblclick', handleDoubleClick)
  }, [onFinish])

  return (
    <div
      className="flex flex-col items-center justify-center h-screen px-6 text-center overflow-visible"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="w-full max-w-[90vw] px-4"
        >
          {index === 0 && (
            <p className="text-gray-300 text-lg md:text-2xl font-light mb-3 leading-relaxed font-comicRelief">
              {formatarData(startDate)}
            </p>
          )}
          <p
            className="text-transparent text-3xl md:text-6xl font-bold
              bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500
              bg-clip-text font-comicRelief
              whitespace-normal break-words leading-[1.4]"
            style={{ paddingBottom: '0.25em' }}
          >
            {phrases[index]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}