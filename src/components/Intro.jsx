import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'

const formatDate = (date) => {
  if (!(date instanceof Date)) return ''
  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleString('pt-BR', { month: 'long' })
  const year = date.getFullYear()
  return `${day} de ${month} de ${year}`
}

export default function Intro({ onFinish, introPhraseData }) {
  const { startDate } = useAppContext()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < introPhraseData.length - 1) {
      const timer = setTimeout(() => setIndex((i) => i + 1), 5000)
      return () => clearTimeout(timer)
    } else {
      const finishTimer = setTimeout(() => onFinish?.(), 5000)
      return () => clearTimeout(finishTimer)
    }
  }, [index, onFinish, introPhraseData])

  useEffect(() => {
    const onDoubleClick = () => onFinish?.()
    window.addEventListener('dblclick', onDoubleClick)
    return () => window.removeEventListener('dblclick', onDoubleClick)
  }, [onFinish])

  return (
    <section
      aria-live="polite"
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="w-full max-w-[90vw] px-4"
        >
          {index === 0 && (
            <p
              className="mb-3 text-lg md:text-2xl font-light text-gray-300 font-comicRelief leading-relaxed"
              aria-label={`Data de início: ${formatDate(startDate)}`}
            >
              {formatDate(startDate)}
            </p>
          )}
          <p
            className="whitespace-normal break-words text-3xl font-bold leading-[1.4] md:text-6xl
            bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent font-comicRelief"
            style={{ paddingBottom: '0.25em' }}
          >
            {introPhraseData[index]}
          </p>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}